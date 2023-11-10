import subprocess

def delete_local_branches(force=False):
    # Define the Windows Command Prompt command as a string
    cmd = 'git branch'

    # List all local branches except the currently checked-out branch
    result = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    branches = result.stdout.strip().split("\n")
    current_branch = result.stderr.strip()

    # Ask the user for the deletion type (force or normal)
    deletion_type = "-D" if force else "-d"

    if current_branch in branches:
        branches.remove(current_branch)

    if branches:
        print("List of branches to delete:")
        for branch in branches:
            print(branch)

        confirmation = input("Do you want to delete these branches? (y/n): ").strip()
        if confirmation.lower() == "y":
            for branch in branches:
                cmd = f'git branch {deletion_type} {branch}'
                subprocess.run(cmd, shell=True)
                print(f"Deleted branch: {branch}")
    else:
        print("No branches to delete.")

# Prompt the user for the deletion type
force_deletion = input("Force delete branches? (y/n): ").strip().lower() == "y"

# Call the function to delete branches
delete_local_branches(force=force_deletion)
input("Press Enter to exit...")