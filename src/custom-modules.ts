export const camelCaseTranslate = (message: string): string => {
    let a: string = "";
    for (let i = 0; i < message.length; i++) {
        if ((message[i] + message[i + 1]).match(/[a-z][A-Z]/g)) {
            a = a + message[i] + " ";
        } else {
            a += message[i];
        }
    }
    let b: Array<string> = a.split(" ");
    for (let i = 0; i < b.length; i++) {
        b[i] = b[i][0].toUpperCase() + (b[i].slice(1));
    }
    let c: string = b.join(" ");

    return c;
}

export const objectKeys = (a : Object, b : any, c : any) : void => {
    type objkey = keyof typeof a;
    let d : objkey = b;
    a[d] = c;
}