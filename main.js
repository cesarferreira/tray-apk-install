
const path = require('path');
const assetsDirectory = path.join(__dirname, 'assets');
const { app, Tray, Menu, dialog} = require('electron');
const log = console.log;
const spawn = require('child_process').spawn;
const notifier = require('node-notifier');
const exec = require('child_process').execFile;

let tray = undefined

app.dock.hide()

app.on('ready', () => {
	createTray();
});

const createTray = () => {
	tray = new Tray(path.join(assetsDirectory, 'briefcase.png'));
	tray.setToolTip('Drag APK to install');

	var contextMenu = Menu.buildFromTemplate([
		{
			label: 'quit', click: () => {
				app.isQuiting = true;
				app.quit();
			}
	}]);

	tray.setContextMenu(contextMenu);

	tray.on('drag-enter', () => {
		tray.setImage(path.join(assetsDirectory, 'briefcase-yellow.png'));
	});

	tray.on('drag-leave', () => {
		tray.setImage(path.join(assetsDirectory, 'briefcase.png'));
	});

	tray.on('right-click', () => {
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
	const options = { timeout: 4000 };

  exec('adb', ['install', '-r', item], options, (err, stdout) => {
    if(err) {
      var errorMessage = 'Something went wrong while installing';
			const sanitizedError = String(`${err}`)
			log(sanitizedError)
			if(sanitizedError.indexOf('no devices/emulators found') > -1) {
				errorMessage = 'No devices/emulators found'
			}

      notification(errorMessage);
      return;
    }
    notification(`${path.basename(item)} - Installed successfully`);
  });
}

function isAPK(file) {
  return path.extname(file) === '.apk';
}

function notification(message) {
  notifier.notify({
      title: 'APK installer', 
      message,
			timeout: 3, 
    }); 
}
