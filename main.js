
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
      title: 'Apk installer', 
      message,
			timeout: 3, 
    }); 
}

// function backgroundProcess() {
//     var exec = require("child_process").execFile;
//     var item = '/Users/cesarferreira/Downloads/app-Development-debug.apk'


//       exec('adb', ['install','-r', item], (error, stdout) => {
//     if(error) {
//       log(JSON.stringify(error));
//       log(error);
//       dialog.showErrorBox('title', error)

//       return;
//     }
//     // log(stdout)
//     notification('Installed successfully');
// });

// };

app.dock.hide()

app.on('ready', () => {
  // backgroundProcess();

  var item = '/Users/cesarferreira/Downloads/app-Development-debug.apk'
  handleFileItem(item)
  log('creating tray')
  createTray();
  log('done creating tray')
});

const createTray = () => {
  tray = new Tray(path.join(assetsDirectory, 'briefcase.png'));

  tray.setToolTip('This is my application.');

  tray.on('drag-enter', () => {
    tray.setImage(path.join(assetsDirectory, 'briefcase-yellow.png'))
  });

  tray.on('drag-leave', () => {
    tray.setImage(path.join(assetsDirectory, 'briefcase.png'))
  });

  tray.on('drop-files', (event, files) => {
    log(files);

    tray.setImage(path.join(assetsDirectory, 'briefcase.png'))

    files.forEach(item => {
      handleFileItem(item);
    });    
  });
}

function handleFileItem(item) {
  if(!isAPK(item)) {
    log('not an apk')
    notification('This is not an APK')
    return;
  }

  log('Starting installation...');
  exec('adb', ['install', '-r', item], (error, stdout) => {
    log('finished adb')
    if(error) {
      log(error);
      notification('Something went wrong, please read the logs');
      log('finished with error')
      return;
    }
    notification('Installed successfully');
    log('finished successfully')
    log(stdout)
  });
}