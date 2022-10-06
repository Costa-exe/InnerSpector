function bytesConvert (n : number) :string {
    if (n >= 1000000000000) {
        return `${(n/1000000000000).toFixed(2)} Tb`;
    } else if (n >= 1000000000) {
        return `${(n/1000000000).toFixed(2)} Gb`;
    } else if (n >= 1000000) {
        return `${(n/1000000).toFixed(2)} Mb`;
    } else if (n >= 1000) {
        return `${(n/1000).toFixed(2)} Kb`;
    } else {
        return `${n}  bytes`;
    }
}

function retriveGeneral (a : Object, b: string, c : string) : void {
    const bytesControl : Array<string> = ["Mem Max", "Cache - L1d", "Cache - L1i", "Cache - L2", "Cache - L3", "Size", "Total", "Free", "Used", "Available", "Swap Total", "Swap Used", "Swap Free"];
    const content : HTMLDivElement= document.getElementById("general")! as HTMLDivElement;
    let divAll : HTMLDivElement = document.createElement("div");
    divAll.setAttribute("id", `${c}-info`);
    divAll.setAttribute("class", "contProp");
    for (let [key,value] of Object.entries(a)) {
        for (let i = 0; i < bytesControl.length; i++) {
            if (key == bytesControl[i]) {
                value = bytesConvert(value);
            }
        }
        if (key === "Vram") {
            if (value >= 1000000) {
                value = `${(value/1000000).toFixed(2)} Tb`;
            } else if (value >= 1000) {
                value = `${(value/1000).toFixed(2)} Gb`;
            } else {
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
        let div : HTMLDivElement = document.createElement("div");
        let subdiv1 : HTMLDivElement = document.createElement("div");
        let subdiv2 : HTMLDivElement = document.createElement("div");
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

function switchContent (this : any) : void {
    let options : HTMLCollectionOf<HTMLElement> = document.getElementsByClassName("toggle")! as HTMLCollectionOf<HTMLElement>
    let contents : HTMLCollectionOf<HTMLDivElement> = document.getElementsByClassName("contProp")! as HTMLCollectionOf<HTMLDivElement>;
    for (let i = 0; i < contents.length; i++) {
        if (contents[i].id === `${this.id}-info`) {
            contents[i].style.display = "block";
        } else {
            contents[i].style.display = "none";
        }
    }
    for (let i = 0; i < options.length; i++) {
        if (options[i].id === this.id) {
            this.dataset.active = "active";
        } else {
            options[i].dataset.active = "inactive";
        }
    }
}

function retriveBranding(z: string, a : string, b : HTMLDivElement, e : string, f : Function, c : string, d? : string) :void {
    const req = new XMLHttpRequest();
    req.open("GET", a, true);
    req.send();
    req.onload = () : void => {
        const result : Array<Object> = JSON.parse(req.responseText);
        for (let i = 0; i < result.length; i++) {
            let actual : Object = result[i];
            let id : string = `${e}-${i}`;
            let h4 : HTMLHeadingElement = document.createElement("h4");
            let h5 : HTMLHeadingElement = document.createElement("h5");
            h5.onclick = switchContent;
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
                } else {
                    h5.innerHTML = c;
                    h5.setAttribute("class", "toggle");
                    h5.setAttribute("id", `${id}`);
                    h5.setAttribute("title", c);
                    b.appendChild(h5);
                }
                if (h5.innerHTML === "OS") {
                    h5.dataset.active = "active";
                } else {
                    h5.dataset.active = "inactive";
                }
            }
            // general infos on main window
            f(actual, z, id);
        }
    };
}

function mainLoader () : void {
    const cpus : HTMLDivElement = document.getElementById("cpus")! as HTMLDivElement;
    const cpu : string = '../../../tmp/cpuInfo.json';
    const gpus : HTMLDivElement = document.getElementById("gpus")! as HTMLDivElement;
    const gpu : string = '../../../tmp/gpuInfo.json';
    const sys : HTMLDivElement = document.getElementById("sysInfo")! as HTMLDivElement;
    const os : string = '../../../tmp/os.json';
    const boardInfo : HTMLDivElement = document.getElementById("boardInfo")! as HTMLDivElement;
    const board : string = '../../../tmp/board.json';
    const biosInfo : HTMLDivElement = document.getElementById("biosInfo")! as HTMLDivElement;
    const bios : string = '../../../tmp/bios.json';
    const ramInfo : HTMLDivElement = document.getElementById("ram")! as HTMLDivElement;
    const ramInfoGen : HTMLDivElement = document.getElementById("genRam")! as HTMLDivElement;
    const ramGeneral : string = '../../../tmp/generalMem.json';
    const banks : string = '../../../tmp/banks.json';

    retriveBranding("none", cpu, cpus, "cpu", retriveGeneral , "Manufacturer", "Brand");
    retriveBranding("none", gpu, gpus, "gpu", retriveGeneral , "Vendor", "Model");
    retriveBranding("block", os, sys, "os", retriveGeneral, "OS");
    retriveBranding("none", board, boardInfo, "board", retriveGeneral, "Manufacturer", "Model");
    retriveBranding("none", bios, biosInfo, "bios", retriveGeneral, "Vendor", "Version");
    retriveBranding("none", ramGeneral, ramInfoGen, "ramGen", retriveGeneral, "General");
    retriveBranding("none", banks, ramInfo, "ramBank", retriveGeneral, "Bank", "Manufacturer");
    
}


window.onload = mainLoader;