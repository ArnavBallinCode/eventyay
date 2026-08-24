import logging
import os

from django.core.management.base import BaseCommand
from django.db import transaction

from eventyay.base.models import Event, Product, Room, Submission, User
from eventyay.common.image import process_image

logger = logging.getLogger(__name__)


class Command(BaseCommand):
    help = "Optimizes all existing images across the platform using the centralized compression pipeline."

    def add_arguments(self, parser):
        parser.add_argument(
            '--dry-run',
            action='store_true',
            help='List images that would be processed without actually modifying them.',
        )
        parser.add_argument(
            '--models',
            nargs='+',
            type=str,
            help='Limit to specific models (e.g., Event User Product).',
        )

        parser.add_argument(
            '--backup-dir',
            type=str,
            help='Directory outside public media to copy originals before compression (Required unless --dry-run).',
        )

    def handle(self, *args, **options):
        dry_run = options['dry_run']
        models_filter = options.get('models')
        backup_dir = options.get('backup_dir')
        
        if not dry_run and not backup_dir:
            from django.core.management.base import CommandError
            raise CommandError("You must provide --backup-dir to store original images safely when running without --dry-run.")

        # List of (ModelClass, list_of_fields, generate_thumbnails)
        image_models = [
            (Event, ['logo', 'header_image'], False),
            (User, ['avatar'], True),
            (Product, ['picture'], False),
            (Submission, ['image'], False),
            (Room, ['picture'], False),
        ]

        total_processed = 0
        total_failed = 0
        total_skipped = 0

        from django_scopes import scopes_disabled

        with scopes_disabled():
            for model_cls, fields, generate_thumbnail in image_models:
                model_name = model_cls.__name__

                if models_filter and model_name not in models_filter:
                    continue

                self.stdout.write(self.style.MIGRATE_HEADING(f"Processing {model_name}"))

                for field_name in fields:
                    # Get all instances where the field is not empty
                    qs = model_cls.objects.exclude(**{field_name: ''}).exclude(**{field_name: None})
                    
                    self.stdout.write(f"Found {qs.count()} non-empty {field_name} fields in {model_name}")

                    for instance in qs.iterator():
                        image_field = getattr(instance, field_name)
                        if not image_field or not image_field.name:
                            continue

                        # Don't try to process remote/external URLs directly in this command.
                        # That is handled by import_external_images.
                        if image_field.name.startswith(('http://', 'https://')):
                            total_skipped += 1
                            continue

                        try:
                            if not image_field.storage.exists(image_field.name):
                                self.stderr.write(self.style.WARNING(f"File not found in storage: {image_field.name}"))
                                total_skipped += 1
                                continue
                            # Ensure local path is supported (since process_image relies on it)
                            _ = image_field.path
                        except NotImplementedError:
                            self.stderr.write(self.style.WARNING(f"Storage does not support local path for: {image_field.name}"))
                            total_skipped += 1
                            continue
                        except Exception as e:
                            self.stderr.write(self.style.ERROR(f"Error accessing storage for {model_name} ID {instance.pk}: {e}"))
                            total_failed += 1
                            continue

                        if dry_run:
                            self.stdout.write(self.style.SUCCESS(f"[DRY-RUN] Would process {model_name}.{field_name} for instance ID {instance.pk}: {image_field.name}"))
                            continue

                        try:
                            # Create backup directory
                            import shutil
                            os.makedirs(backup_dir, exist_ok=True)
                            
                            # Backup original
                            backup_filename = f"{model_name}_{instance.pk}_{os.path.basename(image_field.name)}"
                            backup_path = os.path.join(backup_dir, backup_filename)
                            
                            try:
                                # This will work for local VPS storage
                                shutil.copy2(image_field.path, backup_path)
                                self.stdout.write(f"Backed up original to: {backup_path}")
                            except NotImplementedError:
                                # For remote storages, we can read from storage and write locally
                                with image_field.storage.open(image_field.name, 'rb') as remote_file:
                                    with open(backup_path, 'wb') as local_backup:
                                        shutil.copyfileobj(remote_file, local_backup)
                                self.stdout.write(f"Backed up remote original to: {backup_path}")

                            with transaction.atomic():
                                success = process_image(image=image_field, generate_thumbnail=generate_thumbnail)
                                if success:
                                    self.stdout.write(self.style.SUCCESS(f"Optimized {image_field.name}"))
                                    total_processed += 1
                                else:
                                    self.stderr.write(self.style.ERROR(f"Failed to process {image_field.name}"))
                                    total_failed += 1
                        except Exception as e:
                            self.stderr.write(self.style.ERROR(f"Error processing {model_name} ID {instance.pk}: {e}"))
                            total_failed += 1

        if dry_run:
            self.stdout.write(self.style.SUCCESS("\nDry run completed."))
        else:
            self.stdout.write(self.style.SUCCESS(
                f"\nOptimization complete! Processed: {total_processed}, Skipped: {total_skipped}, Failed: {total_failed}"
            ))
