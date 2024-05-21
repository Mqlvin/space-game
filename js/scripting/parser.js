/*
    Formatting:
    ^ - formatting
    {
        n:underline,
        l:bold
        c:italic
    }

    § - colours
    {
        ...see map below...
    }

    speed is defined elesewhere in the json

    a text can have multiple formats, but only one colour
    each format must have a separate ^ definition
    example string for a bold, italic, green text

    "^l^c§a This is green, bolded and italic text!"

    if present, the first space of the actual content will always be removed
    this is just for readability in the script
*/


const colourMap = {
    "4":"AA0000",
    "c":"FF5555",
    "6":"FFAA00",
    "e":"FFFF55",
    "2":"00AA00",
    "a":"55FF55",
    "b":"55FFFF",
    "3":"00AAAA",
    "1":"0000AA",
    "9":"5555FF",
    "d":"FF55FF",
    "5":"AA00AA",
    "f":"FFFFFF",
    "7":"AAAAAA",
    "8":"555555",
    "0":"000000"
}

const scriptEntries = {

};

export class ScriptParser {
    static parseScript(object) {
        let scriptIds = Object.keys(object);

        for(let i = 0; i < scriptIds; i++) {
            let entryId = scriptIds[i];
            let scriptObject = object[entryId]["script"];
            
        }
    }

    static parseText(string) {
        let modifiers = [];
        let lastCharModifier = "";
        let rawText = "";

        for(let i = 0; i < string.length; i++) {
            let char = string.charAt(i);
            if(char == "^" || char == "§") {
                lastCharModifier = char;
            }

            else if(lastCharModifier != "") {
                modifiers.push(lastCharModifier + char);
                lastCharModifier = "";
                
            }
            
            else {
                rawText += char;
            }
        }

        if(rawText.length != 0 && rawText.charAt(0) == " ") {
            rawText = rawText.substring(1);
        }

        let isUnderlined = modifiers.includes("^n");
        let isBold = modifiers.includes("^l");
        let isItalic = modifiers.includes("^c");
        
        let colourFilter = modifiers.filter(s => s.charAt(0) == "§");
        let hexValue = "FFFFFF";
        if(colourFilter.length != 0) {
            hexValue = colourMap[colourFilter[0].charAt(1)];
        }

        return new ScriptText(rawText, "#" + hexValue, isUnderlined, isBold, isItalic);
    }
}

export class ScriptText {
    static getSpeedAsMS(speed) {
        // could use a switch but they're annoying with all the breaks n stuff
        if(speed == 0) return 0;
        if(speed == 1) return 20;
        if(speed == 2) return 50;
        if(speed == 3) return 100;
        if(speed == 4) return 250;
    }

    constructor(rawText, hex, underline, bold, italic, speed) {
        this.rawText = rawText;
        this.hex = hex;
        this.underline = underline;
        this.bold = bold;
        this.italic = italic;

        this.speed = speed;
    }
}