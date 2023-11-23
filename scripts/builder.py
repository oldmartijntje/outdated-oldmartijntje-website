exitMessage = "Press Enter key to exit..."

try:
    import json
    import os
    import subprocess
    import shutil
    from pathlib import Path
    from datetime import datetime

    JsonVersion = 3
    BuilderVersion = 10

    defaultData = {
        "BuildNumber": 0,
        "JSONVersion": 3,
        "AngularProjectFolder": "PlayTimeClient",
        "BuildDataPath": "src/app/Models/buildData.ts",
        "AngularDistName": "play-time",
        "HostToUrl": "https://oldmartijntje.nl",
        "BuilderMakeBranch": True,
        "MainBranch": "main",
        "GitRepo": "https://github.com/oldmartijntje/playtime/"
    }

    current_datetime = datetime.now()

    # Format the date and time as day/month/year: hour:minute:seconds in 24-hour format
    formatted_datetime = current_datetime.strftime("%d/%m/%Y: %H:%M:%S")

    res = subprocess.run(["git", "config", "user.name"], stdout=subprocess.PIPE)
    git_username = res.stdout.strip().decode()

    def create_or_read_builder_data():
        filename = "scripts/BuilderData.json"

        if os.path.isfile(filename):
            # If the file exists, read the JSON data from it
            with open(filename, 'r') as file:
                builder_data = json.load(file)
                # Increment the 'buildNumber' field by 1
                builder_data["BuildNumber"] += 1
        else:
            # If the file doesn't exist, initialize it with default data
            builder_data = defaultData

        with open(filename, 'w') as file:
            json.dump(builder_data, file, indent=4)

        return builder_data
    
    def get_last_commit_id():
        try:
            # Run the 'git rev-parse HEAD' command to get the last commit ID
            result = subprocess.check_output(["git", "rev-parse", "HEAD"], universal_newlines=True)
            commit_id = result.strip()  # Remove any leading/trailing whitespace
            return commit_id
        except subprocess.CalledProcessError as e:
            # Handle any errors, such as Git not being installed or not being in a Git repository
            print("Error:", e)
            return None

    def update_build_data_file(buildNumber, jsonVersion, buildedCorrectly = True, error = None):
        # Define the content to be written to the TypeScript file
        if (error != None):
            errorMsg = f'\n    "errorMessage": "{error}",'
        else:
            errorMsg = ""
        content = f'''export const BuildData: any = {{
        "BuildNumber": {buildNumber},
        "Branch": "{branchName}",
        "BuildedCorrectly": {f"{buildedCorrectly}".lower()},
        "BuilderVersion": {BuilderVersion},
        "JsonVersion": {jsonVersion},
        "Builder": "{git_username}",{errorMsg}
        "BuildDate": "{formatted_datetime}",
        "LastCommitId": "{get_last_commit_id()}",
        "LastCommitURL": "{defaultData['GitRepo']}/commit/{get_last_commit_id()}"
    }};
        '''

        # Specify the path to the TypeScript file
        file_path = f"{defaultData['AngularProjectFolder']}/{defaultData['BuildDataPath']}"

        try:
            # Open the TypeScript file in write mode
            with open(file_path, 'w') as file:
                # Write the updated content to the file
                file.write(content)

        except Exception as e:
            print(f'An error occurred while updating {defaultData["BuildDataPath"]}: {e}')

    def get_active_branch_name():
        try:
            head_dir = Path(".") / ".git" / "HEAD"
            with head_dir.open("r") as f: content = f.read().splitlines()

            for line in content:
                if line[0:4] == "ref:":
                    return line.partition("refs/heads/")[2]
        except Exception as e:
            print(f'An error occurred while getting the active branch name: {e}')
            return "Unknown"


    current_working_directory = os.getcwd()

    splitted = current_working_directory.split('\\')


    while os.path.isdir(defaultData['AngularProjectFolder']) == False and len(splitted) > 2:
        os.chdir("..")
        current_working_directory = os.getcwd()

        splitted = current_working_directory.split('\\')

    if (len(splitted) == 2 and splitted[1] == ''):
        print(f"ERROR: {defaultData['AngularProjectFolder']} folder not found")
        input(exitMessage)
        exit()

    branchName = get_active_branch_name()
    builder_data = create_or_read_builder_data()




    try:


        # Define the branch names
        new_branch_name = f"Build/BuildId_{builder_data['BuildNumber']}_DateTime_{current_datetime.strftime("D%d-%m-%YT%H-%M-%S")}"
        dev_branch_name = defaultData['MainBranch']

        # Stage all changes
        subprocess.run(["git", "add", "."])
        # Commit the staged changes
        # Replace "Your commit message" with your actual commit message
        subprocess.run(["git", "commit", "-m", f"{formatted_datetime}. Build: {builder_data['BuildNumber']}"])

        # Push the new branch to the remote repository (replace "origin" with your remote name)
        subprocess.run(["git", "push", "-u", "origin", dev_branch_name])

        # Create a new branch
        if builder_data['BuilderMakeBranch'] == True:
            subprocess.run(["git", "checkout", "-b", new_branch_name])

        update_build_data_file(builder_data["BuildNumber"], builder_data["JSONVersion"])

        # Change the current working directory to the PlayTimeClient folder
        os.chdir(builder_data['AngularProjectFolder'])

        npm_build_command = 'npm install'
        subprocess.run(npm_build_command, shell=True, check=True)

        # Build the Angular project
        ng_build_command = f'''ng build --configuration "production" --base-href "{builder_data['AngularProjectFolder']}"'''
        subprocess.run(ng_build_command, shell=True, check=True)

        source_index_html = f'''dist/{builder_data['AngularDistName']}/index.html'''
        destination_404_html = f'''dist/{builder_data['AngularDistName']}/404.html'''
        shutil.copyfile(source_index_html, destination_404_html)

        gh_pages_command = f"npx angular-cli-ghpages --dir=dist/{builder_data['AngularDistName']}"
        subprocess.run(gh_pages_command, shell=True, check=True)

        # Stage your changes (you can add your changes here)
        # For example, you can use 'git add' to stage your changes:
        # subprocess.run(["git", "add", "your_file_or_directory"])
        
        # Stage all changes
        subprocess.run(["git", "add", "."])
        # Commit the staged changes
        # Replace "Your commit message" with your actual commit message
        subprocess.run(["git", "commit", "-m", f"{formatted_datetime}. Build: {builder_data['BuildNumber']}"])


        if builder_data['BuilderMakeBranch'] == True:
            # Push the new branch to the remote repository (replace "origin" with your remote name)
            subprocess.run(["git", "push", "-u", "origin", new_branch_name])

            # Switch back to the dev branch
            subprocess.run(["git", "checkout", dev_branch_name])
        else:
            # Push the changes to the remote repository (replace "origin" with your remote name)
            subprocess.run(["git", "push", "-u", "origin", dev_branch_name])

    except Exception as e:
        print(f'An error occurred while building the project: {e}')
        update_build_data_file(builder_data["BuildNumber"], builder_data["JSONVersion"], False, e)
        input(exitMessage)
        exit()
    input(exitMessage)
    exit()
except Exception as ae:
    print(f'An error occurred while building the project: {ae}')
    input(exitMessage)
    exit()