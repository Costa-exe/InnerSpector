const wantedCpuInfo = ["manufacturer", "brand", "vendor", "family", "model", "stepping", "speed", "cores", "physicalCores", "socket", "flags", "cache"];
const wantedGeneralMem = ["total", "free", "used", "available", "swaptotal", "swapused", "swapfree"];
const wantedGpuInfo = ["vendor", "model", "bus", "vram", "vramDynamic", "subDeviceId", "driverVersion", "pciBus"];

function bytesCalculator (o, p) {
    if (p >= 1000000000000) {
        o.innerHTML = (p/1000000000000).toFixed(2) + " Tb";
    } else if (p >= 1000000000) {
        o.innerHTML = (p/1000000000).toFixed(2) + " Gb";
    } else if (p >= 1000000) {
        o.innerHTML = (p/1000000).toFixed(2) + " Mb";
    } else if (p >= 1000) {
        o.innerHTML = (p/1000).toFixed(2) + " Kb";
    } else {
        o.innerHTML = p + " bytes";
    }
}

function objectFilter (a, b, c) {
    if (typeof b == "object") {
        for (let [key, value] of Object.entries(b)) {
            value = value.toString();
            let div3 = document.createElement("div");
            div3.setAttribute("class", "Infos");
            let div4 = document.createElement("div");
            div4.setAttribute("class", "infoTitle");
            div4.style.justifyContent = "right";
            div4.style.display = "flex";
            let div5 = document.createElement("div");
            div5.setAttribute("class", "infoContent");
            div5.style.justifyContent = "left";
            div5.style.display = "flex";
            let b2 = document.createElement("b");
            if (value == "") {
                b2.innerHTML = "-";
            } else {
                bytesCalculator(b2, value);
            }
            div4.innerHTML = a[0].toUpperCase() + a.slice(1).toLowerCase() + " - " + key.toUpperCase() + " : ";
            div5.appendChild(b2);
            div3.appendChild(div4);
            div3.appendChild(div5);
            c.appendChild(div3);
        }
    }
}

function contentManager() {
    const cpulogo = document.getElementById("cpu");
    const ramlogo = document.getElementById("ram");
    const cpuInfos = document.getElementById("cpuInfos");
    const ramInfos = document.getElementById("ramInfos");
    const gpuInfos = document.getElementById("gpuInfos");
    const gpulogo = document.getElementById("gpu");
    const syslogo = document.getElementById("sys");
    const sysInfos = document.getElementById("sysInfos");

    syslogo.onmouseover = () => {
        if (syslogo.dataset.active == "inactive") {
            syslogo.src = "./assets/systeminactiveoverlay.svg";
        }
    }
    syslogo.onmouseout = () => {
        if (syslogo.dataset.active == "inactive") {
            syslogo.src = "./assets/systeminactive.svg";
        }
    }
    syslogo.onclick = () => {
        if (syslogo.dataset.active == "inactive") {
            syslogo.src = "./assets/system.svg";
            syslogo.dataset.active = "active";
            sysInfos.style.display = "block";
            ramlogo.src = "./assets/raminactive.svg";
            ramlogo.dataset.active = "inactive";
            cpulogo.src = "./assets/cpuinactive.svg";
            cpulogo.dataset.active = "inactive";
            cpuInfos.style.display = "none";
            ramInfos.style.display = "none";
            gpuInfos.style.display = "none";
            gpulogo.src = "./assets/gpulogoinactive.svg";
            gpulogo.dataset.active = "inactive";
        }
    }
    ramlogo.onmouseover = () => {
        if (ramlogo.dataset.active == "inactive") {
            ramlogo.src = "./assets/raminactiveoverlay.svg";
        }
    }
    ramlogo.onmouseout = () => {
        if (ramlogo.dataset.active == "inactive") {
            ramlogo.src = "./assets/raminactive.svg";
        }
    }
    ramlogo.onclick = () => {
        if (ramlogo.dataset.active == "inactive") {
            syslogo.src = "./assets/systeminactive.svg";
            syslogo.dataset.active = "inactive";
            sysInfos.style.display = "none";
            ramlogo.src = "./assets/ramlogo.svg";
            ramlogo.dataset.active = "active";
            cpulogo.src = "./assets/cpuinactive.svg";
            cpulogo.dataset.active = "inactive";
            cpuInfos.style.display = "none";
            ramInfos.style.display = "block";
            gpuInfos.style.display = "none";
            gpulogo.src = "./assets/gpulogoinactive.svg";
            gpulogo.dataset.active = "inactive";
        }
    }
    gpulogo.onmouseover = () => {
        if (gpulogo.dataset.active == "inactive") {
            gpulogo.src = "./assets/gpulogoinactiveoverlay.svg";
        }
    }
    gpulogo.onmouseout = () => {
        if (gpulogo.dataset.active == "inactive") {
            gpulogo.src = "./assets/gpulogoinactive.svg";
        }
    }
    gpulogo.onclick = () => {
        if (gpulogo.dataset.active == "inactive") {
            syslogo.src = "./assets/systeminactive.svg";
            syslogo.dataset.active = "inactive";
            sysInfos.style.display = "none";
            ramlogo.src = "./assets/raminactive.svg";
            ramlogo.dataset.active = "inactive";
            cpulogo.src = "./assets/cpuinactive.svg";
            cpulogo.dataset.active = "inactive";
            cpuInfos.style.display = "none";
            ramInfos.style.display = "none";
            gpuInfos.style.display = "block";
            gpulogo.src = "./assets/gpulogo.svg";
            gpulogo.dataset.active = "active";
        }
    }
    cpulogo.onmouseover = () => {
        if (cpulogo.dataset.active == "inactive") {
            cpulogo.src = "./assets/cpuinactiveoverlay.svg";
        }
    }
    cpulogo.onmouseout = () => {
        if (cpulogo.dataset.active == "inactive") {
            cpulogo.src = "./assets/cpuinactive.svg";
        }
    }
    cpulogo.onclick = () => {
        if (cpulogo.dataset.active == "inactive") {
            syslogo.src = "./assets/systeminactive.svg";
            syslogo.dataset.active = "inactive";
            sysInfos.style.display = "none";
            ramlogo.src = "./assets/raminactive.svg";
            ramlogo.dataset.active = "inactive";
            cpulogo.src = "./assets/cpulogo.svg";
            cpulogo.dataset.active = "active";
            cpuInfos.style.display = "block";
            ramInfos.style.display = "none";
            gpuInfos.style.display = "none";
            gpulogo.src = "./assets/gpulogoinactive.svg";
            gpulogo.dataset.active = "inactive";
        }
    }
}

function retrivingCpu() {
    const req = new XMLHttpRequest();
    req.open("GET", '../../tmp/cpuInfo.json', true);
    req.send();
    req.onload = function () {
        const result = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let div2 = document.createElement("div");
            div2.setAttribute("class", "numberid");
            div2.innerHTML = "<b>CPU #" + (i + 1) + "</b>";
            div2.style.marginBottom = "10px";
            div2.style.marginLeft = "10px";
            div1.appendChild(div2);
            for (let [key, value] of Object.entries(result[i])) {
                for (let i = 0; i < wantedCpuInfo.length; i++) {
                    if (key == wantedCpuInfo[i]) {
                        if (key == "physicalCores") {
                            key = "Physical Cores";
                        } else {
                            key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                        }
                        if (key == "Speed") {
                            value = value + " GHz";
                        }
                        if (typeof value == "object") {
                            objectFilter(key, value, div1);
                        } else {
                            value = value.toString();
                            let div3 = document.createElement("div");
                            div3.setAttribute("class", "Infos");
                            let div4 = document.createElement("div");
                            div4.setAttribute("class", "infoTitle");
                            div4.style.justifyContent = "right";
                            div4.style.display = "flex";
                            let div5 = document.createElement("div");
                            div5.setAttribute("class", "infoContent");
                            div5.style.justifyContent = "left";
                            div5.style.display = "flex";
                            let b2 = document.createElement("b");
                            if (value == "") {
                                b2.innerHTML = "-";
                            } else {
                                b2.innerHTML = value;
                            }
                            div4.innerHTML = key + " : ";
                            div5.appendChild(b2);
                            div3.appendChild(div4);
                            div3.appendChild(div5);
                            div1.appendChild(div3);
                        }
                    }
                }
            }
            document.getElementById("cpuInfos").appendChild(div1);
        }
    }
}

function retrivingMemory() {
    const req = new XMLHttpRequest;
    const req2 = new XMLHttpRequest;
    req.open("GET", "../../tmp/generalMem.json", true);
    req2.open("GET", "../../tmp/memBanks.json", true);
    req.send();
    req2.send();
    req.onload = function () {
        const result = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>General Infos</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                for (let i = 0; i < wantedGeneralMem.length; i++) {
                    if (key == wantedGeneralMem[i]) {
                        if (key == "swaptotal") {
                            key = "Swap Total";
                        } else if (key == "swapused") {
                            key = "Swap Used";
                        } else if (key == "swapfree") {
                            key = "Swap Free";
                        } else {
                            key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                        }
                        value = value.toString();
                        let div3 = document.createElement("div");
                        div3.setAttribute("class", "Infos");
                        let div4 = document.createElement("div");
                        div4.setAttribute("class", "infoTitle");
                        div4.style.justifyContent = "right";
                        div4.style.display = "flex";
                        let div5 = document.createElement("div");
                        div5.setAttribute("class", "infoContent");
                        div5.style.justifyContent = "left";
                        div5.style.display = "flex";
                        let b2 = document.createElement("b");
                        if (value == "") {
                            b2.innerHTML = "-";
                        } else {
                            bytesCalculator(b2, value);
                        }
                        div4.innerHTML = key + " : ";
                        div5.appendChild(b2);
                        div3.appendChild(div4);
                        div3.appendChild(div5);
                        div1.appendChild(div3);
                    }
                }
            }
            document.getElementById("ramGen").appendChild(div1);
        }
    }
    req2.onload = function () {
        const result = JSON.parse(req2.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>" + result[i].bank + "</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                if (key != "bank") {
                    if (key == "clockSpeed") {
                        key = "Clock Speed";
                        value = value + " MHz";
                    } else if (key == "formFactor") {
                        key = "Form Factor";
                    } else if (key == "partNum") {
                        key = "Part Number";
                    } else if (key == "serialNum") {
                        key = "Serial Number";
                    } else if (key == "voltageConfigured") {
                        key = "Voltage Configured";
                        value = value + " V";
                    } else if (key == "voltageMin") {
                        key = "Voltage Min";
                        value = value + " V";
                    } else if (key == "voltageMax") {
                        key = "Voltage Max";
                        value = value + " V";
                    } else {
                        key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                    }
                    value = value.toString();
                    let div3 = document.createElement("div");
                    div3.setAttribute("class", "Infos");
                    let div4 = document.createElement("div");
                    div4.setAttribute("class", "infoTitle");
                    div4.style.justifyContent = "right";
                    div4.style.display = "flex";
                    let div5 = document.createElement("div");
                    div5.setAttribute("class", "infoContent");
                    div5.style.justifyContent = "left";
                    div5.style.display = "flex";
                    let b2 = document.createElement("b");
                    if (key == "Size") {
                        bytesCalculator(b2, value);
                    } else {
                        value = value.toString();
                        if (value == "") {
                            b2.innerHTML = "-";
                        } else {
                            b2.innerHTML = value;
                        }
                    }
                    div4.innerHTML = key + " : ";
                    div5.appendChild(b2);
                    div3.appendChild(div4);
                    div3.appendChild(div5);
                    div1.appendChild(div3);
                }
            }
            document.getElementById("ramBanks").appendChild(div1);
        }
    }
}

function retrivingGpu () {
    const req = new XMLHttpRequest;
    req.open("GET", "../../tmp/gpu.json", true);
    req.send();
    req.onload = function () {
        const result = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>" + "GPU #" + (i+1) + "</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                for (let i = 0; i < wantedGpuInfo.length; i++) {
                    if (key == wantedGpuInfo[i]) {
                        if (key == "vramDynamic") {
                            key = "Vram Dynamic";
                        } else if (key == "subDeviceId") {
                            key = "Sub Device Id";
                        } else if (key == "driverVersion") {
                            key = "Driver Version";
                        } else if (key == "pciBus") {
                            key = "Pci Bus";
                        } else {
                            key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                        }
                        if (key == "Vram") {
                            if (value >= 1000000) {
                                value = (value / 1000000).toFixed(2) + " Tb";
                            } else if (value >= 1000) {
                                value = (value / 1000).toFixed(2) + " Gb";
                            } else {
                                value = value + " Mb";
                            }
                        }
                        value = value.toString();
                        let div3 = document.createElement("div");
                        div3.setAttribute("class", "Infos");
                        let div4 = document.createElement("div");
                        div4.setAttribute("class", "infoTitle");
                        div4.style.justifyContent = "right";
                        div4.style.display = "flex";
                        let div5 = document.createElement("div");
                        div5.setAttribute("class", "infoContent");
                        div5.style.justifyContent = "left";
                        div5.style.display = "flex";
                        let b2 = document.createElement("b");
                        if (value == "") {
                            b2.innerHTML = "-";
                        } else {
                            b2.innerHTML = value;
                        }
                        div4.innerHTML = key + " : ";
                        div5.appendChild(b2);
                        div3.appendChild(div4);
                        div3.appendChild(div5);
                        div1.appendChild(div3);
                    }
                }
            }
            document.getElementById("gpuInfos").appendChild(div1);
        }
    }
}

function retrivingSystem () {
    const req = new XMLHttpRequest;
    const req2 = new XMLHttpRequest;
    const req3 = new XMLHttpRequest;
    req3.open("GET", "../../tmp/OS.json", true);
    req2.open("GET", "../../tmp/baseboard.json", true);
    req.open("GET", "../../tmp/bios.json", true);
    req.send();
    req3.send();
    req2.send();
    req.onload = function () {
        const result = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>" + "BIOS" + "</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                if (key == "releaseDate") {
                    key = "Release date";
                } else {
                    key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                }
                value = value.toString();
                let div3 = document.createElement("div");
                div3.setAttribute("class", "Infos");
                let div4 = document.createElement("div");
                div4.setAttribute("class", "infoTitle");
                div4.style.justifyContent = "right";
                div4.style.display = "flex";
                let div5 = document.createElement("div");
                div5.setAttribute("class", "infoContent");
                div5.style.justifyContent = "left";
                div5.style.display = "flex";
                let b2 = document.createElement("b");
                if (value == "") {
                    b2.innerHTML = "-";
                } else {
                    b2.innerHTML = value;
                }
                div4.innerHTML = key + " : ";
                div5.appendChild(b2);
                div3.appendChild(div4);
                div3.appendChild(div5);
                div1.appendChild(div3);
            }
            document.getElementById("sysInfos").appendChild(div1);
        }
    }
    req2.onload = function () {
        const result = JSON.parse(req2.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>" + "Baseboard" + "</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                if (key == "assetTag") {
                    key = "Asset Tag";
                } else if (key == "memMax") {
                    key = "Memory Max";
                } else if (key == "memSlots") {
                    key = "Memory Slots";
                } else {
                    key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                }
                value = value.toString();
                let div3 = document.createElement("div");
                div3.setAttribute("class", "Infos");
                let div4 = document.createElement("div");
                div4.setAttribute("class", "infoTitle");
                div4.style.justifyContent = "right";
                div4.style.display = "flex";
                let div5 = document.createElement("div");
                div5.setAttribute("class", "infoContent");
                div5.style.justifyContent = "left";
                div5.style.display = "flex";
                let b2 = document.createElement("b");
                if (value == "") {
                    b2.innerHTML = "-";
                } else {
                    if (key == "Memory Max") {
                        bytesCalculator(b2, value);
                    } else {
                        b2.innerHTML = value;
                    }
                }
                div4.innerHTML = key + " : ";
                div5.appendChild(b2);
                div3.appendChild(div4);
                div3.appendChild(div5);
                div1.appendChild(div3);
            }
            document.getElementById("sysInfos").appendChild(div1);
        }
    }
    req3.onload = function () {
        const result = JSON.parse(req3.responseText);
        for (let i = 0; i < result.length; i++) {
            let div1 = document.createElement("div");
            div1.setAttribute("class", "infosContainer");
            let p = document.createElement("div");
            p.innerHTML = "<b>" + "OS" + "</b>";
            p.setAttribute("class", "banks");
            div1.appendChild(p);
            for (let [key, value] of Object.entries(result[i])) {
                if (key == "remoteSession") {
                    key = "Remote Session";
                } else {
                    key = key[0].toUpperCase() + key.slice(1).toLowerCase();
                }
                value = value.toString();
                let div3 = document.createElement("div");
                div3.setAttribute("class", "Infos");
                let div4 = document.createElement("div");
                div4.setAttribute("class", "infoTitle");
                div4.style.justifyContent = "right";
                div4.style.display = "flex";
                let div5 = document.createElement("div");
                div5.setAttribute("class", "infoContent");
                div5.style.justifyContent = "left";
                div5.style.display = "flex";
                let b2 = document.createElement("b");
                if (value == "") {
                    b2.innerHTML = "-";
                } else {
                    b2.innerHTML = value;
                }
                div4.innerHTML = key + " : ";
                div5.appendChild(b2);
                div3.appendChild(div4);
                div3.appendChild(div5);
                div1.appendChild(div3);
            }
            document.getElementById("sysInfos").appendChild(div1);
        }
    }
}

function main() {
    retrivingCpu();
    contentManager();
    retrivingMemory();
    retrivingGpu();
    retrivingSystem();
}

window.onload = main;
