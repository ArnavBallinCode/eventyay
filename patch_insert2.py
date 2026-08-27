import sys

with open("app/eventyay/webapp/video/src/views/admin/rooms/EditForm.vue", "r") as f:
    lines = f.readlines()

for i, line in enumerate(lines):
    if "async syncServices()" in line:
        # It's already there, remove the extra `}`.
        pass

# Actually I will just reset the file and apply the patch manually.
