
const path = require('path');
const assetsDirectory = path.join(__dirname, 'assets');
const { app, Tray, Menu, dialog} = require('electron');
const log = console.log;
const spawn = require('child_process').spawn;
const notifier = require('node-notifier');
const exec = require("child_process").execFile;

let tray = undefined

function isAPK(file) {
  return path.extname(file) === '.apk';
}

function notification(message) {
  log('im opening a notification')
  notifier.notify({
      title: 'APK installer', 
      message,
			timeout: 3, 
    }); 
}

app.dock.hide()

app.on('ready', () => {
  createTray();
});

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'briefcase.png'));

  tray.setToolTip('Drag APK to install');

  tray.on('drag-enter', () => {
    tray.setImage(path.join(assetsDirectory, 'briefcase-yellow.png'))
  });

  tray.on('drag-leave', () => {
    tray.setImage(path.join(assetsDirectory, 'briefcase.png'))
  });

	tray.on('click', () => {
    notification('Cesar loves you ❤');
  });

  tray.on('drop-files', (event, files) => {

    tray.setImage(path.join(assetsDirectory, 'briefcase.png'))

    files.forEach(item => {
      handleFileItem(item);
    });    
  });
}

function handleFileItem(item) {
  if(!isAPK(item)) {
    notification('This is not an APK')
    return;
  }

  log('Starting installation...');
  exec('adb', ['install', '-r', item], (error, stdout) => {
    if(error) {
      log(error);
      notification('Something went wrong, please read the logs');
      return;
    }
    notification('Installed successfully');
  });
}