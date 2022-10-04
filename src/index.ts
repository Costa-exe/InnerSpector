import {app, BrowserWindow, Menu} from 'electron';
import * as si from 'systeminformation';
import { shell } from 'electron';
import * as fs from 'fs';
import { camelCaseTranslate } from './custom-modules';
import { objectKeys } from './custom-modules';

const menuItems : Array<Object> = [];
const menu = Menu.buildFromTemplate(menuItems);
Menu.setApplicationMenu(menu);

const wantedGpuInfo : Array<string> = ["vendor", "model", "bus", "vram", "vramDynamic", "subDeviceId", "driverVersion", "pciBus"];
const wantedCpuInfo : Array<string> = ["manufacturer", "brand", "vendor", "family", "model", "stepping", "speed", "cores", "physicalCores", "socket", "flags", "cache"];

const infoRetrive = (a : Object | Array<Object>, b : string, c? : Array<string>,) : void => {

    const objectFilter = (y : Object | string, z : string, w : Object) : void => {
        if (typeof y === 'object') {
            for (let [key, value] of Object.entries(y)) {
                let newKey1 = `${z} - ${camelCaseTranslate(key)}`;
                objectKeys(w, newKey1, value);
            }
        } else {
            objectKeys(w, z, y);
        }
    };

    const retriving = (x : Array<Object>) : void => {
        if (c) {
            let finalData: Array<Object> = [];
            for (let i = 0; i < x.length; i++) {
                let finalDataElement: Object = {};
                for (let [key, value] of Object.entries(x[i])) {
                    let newKey = camelCaseTranslate(key);
                    for (let j = 0; j < c.length; j++) {
                        if (key === c[j]) {
                            objectFilter(value, newKey, finalDataElement);
                        }
                    }
                }
                finalData.push(finalDataElement);
            }
            fs.writeFileSync(b, JSON.stringify(finalData));
        } else {
            let finalData: Array<Object> = [];
            for (let i = 0; i < x.length; i++) {
                let finalDataElement: Object = {};
                for (let [key, value] of Object.entries(x[i])) {
                    let newKey = camelCaseTranslate(key);
                    objectFilter(value, newKey, finalDataElement);
                }
                finalData.push(finalDataElement);
            }
            fs.writeFileSync(b, JSON.stringify(finalData));
        }
    };

    if (Array.isArray(a)) {
        let objects : Array<Object> = a;
        retriving(objects);
    } else {
        let objects : Array<Object> = [a];
        retriving(objects);
    }
}

const cpuInfo = si.cpu().then(data => {
    infoRetrive(data, './tmp/cpuInfo.json',wantedCpuInfo);
});

const ramInfo = si.mem().then(data => {
    const wantedGeneralMem : Array<string> = ["total", "free", "used", "available", "swaptotal", "swapused", "swapfree"];
    const GeneralMemNewKeys : Array<string> = ["Total", "Free", "Used", "Available", "Swap Total", "Swap Used", "Swap Free"];
    let finalData : Object = {};
    for (let [key, value] of Object.entries(data)) {
        for (let i = 0; i < wantedGeneralMem.length; i++) {
            if (key === wantedGeneralMem[i]) {
                key = GeneralMemNewKeys[i];
                objectKeys(finalData, key, value);
            }
        }
    }
    fs.writeFileSync('./tmp/generalMem.json', JSON.stringify([finalData]));
});

const ramInfoSpec = si.memLayout().then(data => {
    infoRetrive(data, './tmp/banks.json');
});

const gpuInfo = si.graphics().then(data => {
    infoRetrive(data.controllers, './tmp/gpuInfo.json', wantedGpuInfo);
});

const bios = si.bios().then(data => {
    infoRetrive(data, './tmp/bios.json');
});

const baseboard = si.baseboard().then(data => {
    infoRetrive(data, './tmp/board.json');
});

const osInfo = si.osInfo().then(data => {
    infoRetrive(data, './tmp/os.json');
});


const dirControl = (): void => {
    if (fs.existsSync('./tmp') == false) {
        fs.mkdirSync('./tmp');
    }
};

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
        minHeight: 600,
        resizable: false
    });

    win.loadFile('./render/index.html');

    win.webContents.setWindowOpenHandler(({ url }) => {
        shell.openExternal(url);
        return { action: 'deny' };
    });

};

app.whenReady().then( async () => {

    dirControl();

    const splashScreen = new BrowserWindow({
        width: 500,
        height: 300,
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        transparent: true
    });

    await splashScreen.loadFile('./render/splash.html');

    createWindow().then(() => {
        splashScreen.close();
    });

});



app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
    fs.rmSync('./tmp/os.json');
    fs.rmSync('./tmp/board.json');
    fs.rmSync('./tmp/bios.json');
    fs.rmSync('./tmp/gpuInfo.json');
    fs.rmSync('./tmp/banks.json');
    fs.rmSync('./tmp/generalMem.json');
    fs.rmSync('./tmp/cpuInfo.json');
});