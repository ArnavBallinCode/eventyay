import sys

with open("app/eventyay/webapp/video/src/views/admin/rooms/EditForm.vue", "r") as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    new_lines.append(line)
    if "this.error = error.message || error" in line:
        new_lines.append("\t\t},\n")
        new_lines.append("\t\tasync syncServices() {\n")
        new_lines.append("\t\t\tthis.syncError = null\n")
        new_lines.append("\t\t\tthis.syncing = true\n")
        new_lines.append("\t\t\ttry {\n")
        new_lines.append("\t\t\t\tawait syncInterpretationServices(this.$store, this.config.id)\n")
        new_lines.append("\t\t\t} catch (error) {\n")
        new_lines.append("\t\t\t\tthis.syncError = error.message || error\n")
        new_lines.append("\t\t\t}\n")
        new_lines.append("\t\t\tthis.syncing = false\n")

# Remove the original \t\t}, that followed
with open("app/eventyay/webapp/video/src/views/admin/rooms/EditForm.vue", "w") as f:
    skip = False
    for i in range(len(new_lines) - 1):
        if "this.syncing = false\n" in new_lines[i] and "\t\t},\n" in new_lines[i+1]:
            f.write(new_lines[i])
            f.write(new_lines[i+1])
        else:
            f.write(new_lines[i])
    f.write(new_lines[-1])

