# InnerSpector

## Table of Contents

* [About](#about-the-project)
* [Technologies](#technologies)
* [How To Launch](#how-to-launch)

## About The Project

InnerSpector is a Windows app, realized with Electron, that can be used to retrive informations about the system's hardware and software (CPU, GPU, RAM, BIOS, Baseboard and OS).
The application is tested on Windows 10+ systems and is meant to work only on 64 bit architectures.

## Technologies

* HTML;
* [SASS](https://sass-lang.com/);
* [TypeScript](https://www.typescriptlang.org/);
* [Node.js](https://nodejs.org/);
* [systeminformation](https://systeminformation.io/);
* [Electron](https://www.electronjs.org/);
* [Electron-Forge](https://www.electronforge.io/).
* Inno Setup Compiler.

## How To Launch

As now, the software is unsigned so during the download and the execution of the setup you will probably be warned by your system. (In theese cases, your Browser will identify the app as possibly malicious and will ask for your permissions to store it; Windows Defender SmartScreen will identify the software as untrusted and will ask for your permission to execute the file anyway).

Download the setup for the latest version and execute it.

After the installation execute "InnerSpector.exe" as administrator (Executing the app as administrator is not actually required, but during testing, for some reason, it didn't boot at all on some systems if not executed as administrator. I suggest to check the run as administartor option in properties > compatibility section of the "InnerSpector.exe" file).
