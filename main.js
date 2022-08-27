const { app, BrowserWindow, Menu } = require('electron');
const si = require('systeminformation');
const fs = require('fs');
const shell = require('electron').shell;

const menuItems = [
  {
    label: "About",
    click : () => shell.openExternal('https://github.com/Costa-exe/InnerSpector')
  }
];
const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const cpuInfo = si.cpu().then(data => {
  fs.writeFileSync('./tmp/cpuInfo.json', JSON.stringify([data]));
});

const ramInfo = si.mem().then(data => {
  fs.writeFileSync('./tmp/generalMem.json', JSON.stringify([data]));
});

const ramInfoSpec = si.memLayout().then(data => {
  fs.writeFileSync('./tmp/memBanks.json', JSON.stringify(data));
});

const gpuInfo = si.graphics().then(data => {
  fs.writeFileSync('./tmp/gpu.json', JSON.stringify(data.controllers));
});

const bios = si.bios().then(data => {
  fs.writeFileSync('./tmp/bios.json', JSON.stringify([data]));
});

const baseboard = si.baseboard().then(data => {
  fs.writeFileSync('./tmp/baseboard.json', JSON.stringify([data]));
});

const osInfo = si.osInfo().then(data => {
  fs.writeFileSync('./tmp/OS.json', JSON.stringify([data]));
});

function dirControl() {
  if (fs.existsSync('./tmp') == false) {
    fs.mkdirSync('./tmp');
  }
}

const createWindow = async () => {
  await cpuInfo;
  await ramInfo;
  await ramInfoSpec;
  await gpuInfo;
  await bios;
  await baseboard;
  await osInfo;
  const win = new BrowserWindow({
    minWidth: 800,
    minHeight: 600
  })
  win.loadFile('index.html');
};

app.whenReady().then(() => {
  dirControl();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
  fs.rmSync('./tmp/OS.json');
  fs.rmSync('./tmp/baseboard.json');
  fs.rmSync('./tmp/bios.json');
  fs.rmSync('./tmp/gpu.json');
  fs.rmSync('./tmp/memBanks.json');
  fs.rmSync('./tmp/generalMem.json');
  fs.rmSync('./tmp/cpuInfo.json');
});
