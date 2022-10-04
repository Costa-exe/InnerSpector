"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectKeys = exports.camelCaseTranslate = void 0;
const camelCaseTranslate = (message) => {
    let a = "";
    for (let i = 0; i < message.length; i++) {
        if ((message[i] + message[i + 1]).match(/[a-z][A-Z]/g)) {
            a = a + message[i] + " ";
        }
        else {
            a += message[i];
        }
    }
    let b = a.split(" ");
    for (let i = 0; i < b.length; i++) {
        b[i] = b[i][0].toUpperCase() + (b[i].slice(1));
    }
    let c = b.join(" ");
    return c;
};
exports.camelCaseTranslate = camelCaseTranslate;
const objectKeys = (a, b, c) => {
    let d = b;
    a[d] = c;
};
exports.objectKeys = objectKeys;
