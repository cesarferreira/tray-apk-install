# Tray APK installer
> Fastest way to install APKs

<p align="center">
<img src="extras/ss3.png" width="100%" />
</p>

[![Build Status](https://travis-ci.org/cesarferreira/tray-apk-install.svg?branch=master)](https://travis-ci.org/cesarferreira/tray-apk-install)
[![npm](https://img.shields.io/npm/dt/tray-apk-install.svg)](https://www.npmjs.com/package/tray-apk-install)
[![npm](https://img.shields.io/npm/v/tray-apk-install.svg)](https://www.npmjs.com/package/tray-apk-install)

## Install

```bash
git clone https://github.com/cesarferreira/tray-apk-install && cd tray-apk-install && yarn
```

## Run
```bash
npm start
```

## Usage

Drag any `apk` file to the icon in the tray.

<p align="center">
<img src="extras/usage.gif" width="100%" />
</p>

## Works on
`macOS`, `windows` & `linux`

## Caveats
I can't package it as an Application because there's an issue while loading `node-notifier`, read more [here](https://www.npmjs.com/package/node-notifier#within-electron-packaging)

## Created by
[Cesar Ferreira](https://cesarferreira.com)

## License
YOLO © [Cesar Ferreira](https://cesarferreira.com)