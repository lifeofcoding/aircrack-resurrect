# Aircrack Resurrect
> Linux & NodeJS script that helps continue a John The Ripper + Aircrack-ng wpa2 cracking session

This script was created to help myself continue a wpa2 cracking session. First I started to use John The Ripper, which has a nice restore functionality with it, but found myself forgetting to run the command when I eventually restarted my laptop. This was made so I could add it my startup scripts. It checks for, and runs any "restore" files. Which are the John + AirCrack restore command with a particular filename schema. In this repo you will see my real world example of the restore file which you will need to edit, and create one for each cracking session you would like for it to continue with. The file is called "TrumpSession-Restore.cmd"


## Requirements
* [Linux based machine](https://www.kali.org/downloads/)
* [Aircrack-ng](https://github.com/aircrack-ng/aircrack-ng) (duh!)
* [John The Ripper](https://github.com/magnumripper/JohnTheRipper)

## Installing: The restore file

Filename:

My crack session made with the `--session` flag in my john command is named `TrumpSession`
which created a file in the working directory called `TrumpSession.rec`.

Create a new file based on this naming schema, called `TrumpSession-Restore.cmd`.
In this file paste the restore command:

```
john --restore=<Full path to crack session .rec file> | aircrack-ng -a 2 -b <Wifi BSSID> <Full path to capture .cap file> -w -
```

The restore file needs to be in the same location as the john ".rec" session files. Then in our `zombie.js` script
edit `line 6` and add your absolute full path to the directory with the .rec and restore files are located:

```
const RestoreDir = '/media/removable/STORAGE/Handshakes';
```

## Installing: Adding to system startup - Linux / (Kali or Ubuntu Recommended)
Just simple paste this command in your terminal, and don't forget to set your machines user & path to the `zombie.js` script on your machine!

```
curl https://raw.githubusercontent.com/lifeofcoding/ubuntu-demon-creator/master/create-demon.sh | sudo name="AircrackResurrect" username="<user>" command="node </path/to/zombie>.js" bash
```

## Meta

Jimmy Rousseau – [LinkedIn](https://LinkedIn.com/in/lifeofcoding) – LifeOfCoding@Gmail.com

[https://github.com/lifeofcoding/aircrack-resurrect](https://github.com/lifeofcoding/aircrack-resurrect)