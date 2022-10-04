"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const si = __importStar(require("systeminformation"));
const electron_2 = require("electron");
const fs = __importStar(require("fs"));
const custom_modules_1 = require("./custom-modules");
const custom_modules_2 = require("./custom-modules");
const menuItems = [];
const menu = electron_1.Menu.buildFromTemplate(menuItems);
electron_1.Menu.setApplicationMenu(menu);
const wantedGpuInfo = ["vendor", "model", "bus", "vram", "vramDynamic", "subDeviceId", "driverVersion", "pciBus"];
const wantedCpuInfo = ["manufacturer", "brand", "vendor", "family", "model", "stepping", "speed", "cores", "physicalCores", "socket", "flags", "cache"];
const infoRetrive = (a, b, c) => {
    const objectFilter = (y, z, w) => {
        if (typeof y === 'object') {
            for (let [key, value] of Object.entries(y)) {
                let newKey1 = `${z} - ${(0, custom_modules_1.camelCaseTranslate)(key)}`;
                (0, custom_modules_2.objectKeys)(w, newKey1, value);
            }
        }
        else {
            (0, custom_modules_2.objectKeys)(w, z, y);
        }
    };
    const retriving = (x) => {
        if (c) {
            let finalData = [];
            for (let i = 0; i < x.length; i++) {
                let finalDataElement = {};
                for (let [key, value] of Object.entries(x[i])) {
                    let newKey = (0, custom_modules_1.camelCaseTranslate)(key);
                    for (let j = 0; j < c.length; j++) {
                        if (key === c[j]) {
                            objectFilter(value, newKey, finalDataElement);
                        }
                    }
                }
                finalData.push(finalDataElement);
            }
            fs.writeFileSync(b, JSON.stringify(finalData));
        }
        else {
            let finalData = [];
            for (let i = 0; i < x.length; i++) {
                let finalDataElement = {};
                for (let [key, value] of Object.entries(x[i])) {
                    let newKey = (0, custom_modules_1.camelCaseTranslate)(key);
                    objectFilter(value, newKey, finalDataElement);
                }
                finalData.push(finalDataElement);
            }
            fs.writeFileSync(b, JSON.stringify(finalData));
        }
    };
    if (Array.isArray(a)) {
        let objects = a;
        retriving(objects);
    }
    else {
        let objects = [a];
        retriving(objects);
    }
};
const cpuInfo = si.cpu().then(data => {
    infoRetrive(data, './tmp/cpuInfo.json', wantedCpuInfo);
});
const ramInfo = si.mem().then(data => {
    const wantedGeneralMem = ["total", "free", "used", "available", "swaptotal", "swapused", "swapfree"];
    const GeneralMemNewKeys = ["Total", "Free", "Used", "Available", "Swap Total", "Swap Used", "Swap Free"];
    let finalData = {};
    for (let [key, value] of Object.entries(data)) {
        for (let i = 0; i < wantedGeneralMem.length; i++) {
            if (key === wantedGeneralMem[i]) {
                key = GeneralMemNewKeys[i];
                (0, custom_modules_2.objectKeys)(finalData, key, value);
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
const dirControl = () => {
    if (fs.existsSync('./tmp') == false) {
        fs.mkdirSync('./tmp');
    }
};
const createWindow = () => __awaiter(void 0, void 0, void 0, function* () {
    yield cpuInfo;
    yield ramInfo;
    yield ramInfoSpec;
    yield gpuInfo;
    yield bios;
    yield baseboard;
    yield osInfo;
    const win = new electron_1.BrowserWindow({
        minWidth: 800,
        minHeight: 600,
        resizable: false
    });
    win.loadFile('./render/index.html');
    win.webContents.setWindowOpenHandler(({ url }) => {
        electron_2.shell.openExternal(url);
        return { action: 'deny' };
    });
});
electron_1.app.whenReady().then(() => __awaiter(void 0, void 0, void 0, function* () {
    dirControl();
    const splashScreen = new electron_1.BrowserWindow({
        width: 500,
        height: 300,
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        transparent: true
    });
    yield splashScreen.loadFile('./render/splash.html');
    createWindow().then(() => {
        splashScreen.close();
    });
}));
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
    fs.rmSync('./tmp/os.json');
    fs.rmSync('./tmp/board.json');
    fs.rmSync('./tmp/bios.json');
    fs.rmSync('./tmp/gpuInfo.json');
    fs.rmSync('./tmp/banks.json');
    fs.rmSync('./tmp/generalMem.json');
    fs.rmSync('./tmp/cpuInfo.json');
});
