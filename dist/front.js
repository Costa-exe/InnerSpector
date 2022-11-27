"use strict";
function bytesConvert(n) {
    if (n >= 1000000000000) {
        return `${(n / 1000000000000).toFixed(2)} Tb`;
    }
    else if (n >= 1000000000) {
        return `${(n / 1000000000).toFixed(2)} Gb`;
    }
    else if (n >= 1000000) {
        return `${(n / 1000000).toFixed(2)} Mb`;
    }
    else if (n >= 1000) {
        return `${(n / 1000).toFixed(2)} Kb`;
    }
    else {
        return `${n}  bytes`;
    }
}
function retriveGeneral(a, b, c) {
    const bytesControl = ["Mem Max", "Cache - L1d", "Cache - L1i", "Cache - L2", "Cache - L3", "Size", "Total", "Free", "Used", "Available", "Swap Total", "Swap Used", "Swap Free"];
    const content = document.getElementById("general");
    let divAll = document.createElement("div");
    divAll.setAttribute("id", `${c}-info`);
    divAll.setAttribute("class", "contProp");
    for (let [key, value] of Object.entries(a)) {
        for (let i = 0; i < bytesControl.length; i++) {
            if (key == bytesControl[i]) {
                value = bytesConvert(value);
            }
        }
        if (key === "Vram") {
            if (value >= 1000000) {
                value = `${(value / 1000000).toFixed(2)} Tb`;
            }
            else if (value >= 1000) {
                value = `${(value / 1000).toFixed(2)} Gb`;
            }
            else {
                value = `${value} Mb`;
            }
        }
        if (key == "Clock Speed") {
            value = `${value} MHz`;
        }
        if (key == "Speed") {
            value = `${value} GHz`;
        }
        value = value.toString();
        if (value == "") {
            value = "-";
        }
        let div = document.createElement("div");
        let subdiv1 = document.createElement("div");
        let subdiv2 = document.createElement("div");
        div.setAttribute("class", "prop");
        subdiv1.setAttribute("class", "key");
        subdiv2.setAttribute("class", "value");
        subdiv1.innerHTML = `${key.toString()} :`;
        subdiv2.innerHTML = value;
        div.append(subdiv1, subdiv2);
        divAll.appendChild(div);
    }
    divAll.style.display = b;
    content.appendChild(divAll);
}
function switchContent() {
    let options = document.getElementsByClassName("toggle");
    let contents = document.getElementsByClassName("contProp");
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id === `${this.id}-info`) {
            contents[i].style.display = "block";
        }
        else {
            contents[i].style.display = "none";
        }
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i].id === this.id) {
            this.dataset.active = "active";
        }
        else {
            options[i].dataset.active = "inactive";
        }
    }
    overlayOff();
}
function overlayOn() {
    const infoTitleDisplay = document.getElementById("infoTitleDisplay");
    const infoTitleDiv = document.getElementById("infoTitleDiv");
    const infoTitle = document.getElementById("infoTitle");
    if (this.dataset.active == "inactive") {
        infoTitleDisplay.style.display = "block";
        infoTitleDiv.style.display = "block";
        infoTitle.innerHTML = this.innerHTML;
    }
}
function overlayOff() {
    const infoTitleDisplay = document.getElementById("infoTitleDisplay");
    const infoTitleDiv = document.getElementById("infoTitleDiv");
    const infoTitle = document.getElementById("infoTitle");
    infoTitleDisplay.style.display = "none";
    infoTitleDiv.style.display = "none";
    infoTitle.innerHTML = "";
}
function retriveBranding(z, a, b, e, f, c, d) {
    const req = new XMLHttpRequest();
    req.open("GET", a, true);
    req.send();
    req.onload = () => {
        const result = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let actual = result[i];
            let id = `${e}-${i}`;
            let h4 = document.createElement("h4");
            let h5 = document.createElement("h5");
            h5.onclick = switchContent;
            h5.onmouseover = overlayOn;
            h5.onmouseout = overlayOff;
            for (let [key, value] of Object.entries(actual)) {
                //navbar
                if (d) {
                    if (key === c) {
                        if (!(document.getElementById(value.toString()))) {
                            h4.innerHTML = value.toString();
                            b.appendChild(h4);
                        }
                    }
                    if (key === d) {
                        h5.innerHTML = value.toString();
                        h5.setAttribute("class", "toggle");
                        h5.setAttribute("id", `${id}`);
                        h5.setAttribute("title", value.toString());
                        b.appendChild(h5);
                    }
                }
                else {
                    h5.innerHTML = c;
                    h5.setAttribute("class", "toggle");
                    h5.setAttribute("id", `${id}`);
                    h5.setAttribute("title", c);
                    b.appendChild(h5);
                }
                if (h5.innerHTML === "OS") {
                    h5.dataset.active = "active";
                }
                else {
                    h5.dataset.active = "inactive";
                }
            }
            // general infos on main window
            f(actual, z, id);
        }
    };
}
function mainLoader() {
    const cpus = document.getElementById("cpus");
    const cpu = '../tmp/cpuInfo.json';
    const gpus = document.getElementById("gpus");
    const gpu = '../tmp/gpuInfo.json';
    const sys = document.getElementById("sysInfo");
    const os = '../tmp/os.json';
    const boardInfo = document.getElementById("boardInfo");
    const board = '../tmp/board.json';
    const biosInfo = document.getElementById("biosInfo");
    const bios = '../tmp/bios.json';
    const ramInfo = document.getElementById("ram");
    const ramInfoGen = document.getElementById("genRam");
    const ramGeneral = '../tmp/generalMem.json';
    const banks = '../tmp/banks.json';
    retriveBranding("none", cpu, cpus, "cpu", retriveGeneral, "Manufacturer", "Brand");
    retriveBranding("none", gpu, gpus, "gpu", retriveGeneral, "Vendor", "Model");
    retriveBranding("block", os, sys, "os", retriveGeneral, "OS");
    retriveBranding("none", board, boardInfo, "board", retriveGeneral, "Manufacturer", "Model");
    retriveBranding("none", bios, biosInfo, "bios", retriveGeneral, "Vendor", "Version");
    retriveBranding("none", ramGeneral, ramInfoGen, "ramGen", retriveGeneral, "General");
    retriveBranding("none", banks, ramInfo, "ramBank", retriveGeneral, "Bank", "Manufacturer");
}
window.onload = mainLoader;
