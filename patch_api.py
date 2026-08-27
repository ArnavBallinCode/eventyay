--- app/.venv/lib/python3.12/site-packages/interpretation/api.py
+++ app/.venv/lib/python3.12/site-packages/interpretation/api.py
@@ -10,6 +10,8 @@
 from .models import RoomInterpretation
 from .room_control import (
     plugin_enabled,
+    get_backend,
+    get_interpretation,
     serialize_room_interpretation,
     start_room_session,
     stop_room_session,
@@ -52,6 +54,23 @@
             raise ValidationError({"detail": str(exc)}) from exc
         return Response(serialize_room_interpretation(room, self.event, interpretation))
 
+    @action(detail=False, methods=["post"], url_path="sync")
+    def sync(self, request, room_pk=None, **kwargs):
+        room = self._ensure_room()
+        interpretation = get_interpretation(room)
+        if not interpretation or interpretation.interpreter != RoomInterpretation.INTERPRETER_VOXBENTO:
+            return Response({"detail": "Room is not configured for VoxBento."}, status=400)
+        
+        backend = get_backend(interpretation.interpreter)
+        from .backends.voxbento import VoxbentoTemporarilyUnavailable
+        try:
+            backend.sync_booths(self.event, interpretation)
+        except VoxbentoTemporarilyUnavailable:
+            return Response({"detail": "VoxBento is temporarily unavailable."}, status=503)
+        except Exception as e:
+            return Response({"detail": str(e)}, status=500)
+        return Response({"status": "synced"})
+
     @action(detail=False, methods=["post"], url_path="start")
     def start(self, request, room_pk=None, **kwargs):
         room = self._ensure_room()
