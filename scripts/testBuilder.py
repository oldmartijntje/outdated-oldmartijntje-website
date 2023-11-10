import os
import subprocess

exitMessage = "Press Enter key to exit..."
current_working_directory = os.getcwd()

splitted = current_working_directory.split('\\')


while os.path.isdir("PlayTimeClient") == False and len(splitted) > 2:
    os.chdir("..")
    current_working_directory = os.getcwd()

    splitted = current_working_directory.split('\\')

if (len(splitted) == 2 and splitted[1] == ''):
    print("ERROR: PlayTimeClient folder not found")
    input(exitMessage)
    exit()

try:

    # Change the current working directory to the PlayTimeClient folder
    os.chdir('PlayTimeClient')

    npm_build_command = 'npm install'
    subprocess.run(npm_build_command, shell=True, check=True)

    # Build the Angular project
    ng_build_command = 'ng build --configuration "production" --base-href "https://oldmartijntje.github.io/playtime/"'
    subprocess.run(ng_build_command, shell=True, check=True)

    gh_pages_command = "npx angular-cli-ghpages --dir=dist/play-time"
    subprocess.run(gh_pages_command, shell=True, check=True)

except Exception as e:
    print(f'An error occurred while building the project: {e}')
    input(exitMessage)
    exit()
input(exitMessage)
exit()