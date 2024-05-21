/*
    The textComponents array contains a list of TextComponents.

    By setting new text in the TextBlock, you compile the previous data into the TextComponent and it gets pushed to the array.
    Then, all values are reset and a new TextBlock can be generated.

*/

import { Utils } from "./utils.js";
import { Vitals } from "./vitals.js";





export class DialogEntry {
    constructor(name) {
        this.textComponents = []; // each piece of text (e.g. the two you saw) os a textCompeontn
        this.activeTextComponent = undefined;

        this.name = name;

        this.dialogContainerElement = undefined;
    }

    /* "packs" the current and starts a new text block */
    append(text) {
        this.activeTextComponent = new TextComponent();
        this.activeTextComponent.text = Utils.translateStringToHTML(text);

        return this;
    }

    delay(msDelay) {
        this.activeTextComponent.typeSpeed = msDelay;
        this.activeTextComponent.isOnlyDelay = true;

        return this;
    }

    pack() {
        if(this.activeTextComponent != undefined) {
            this.textComponents.push(this.activeTextComponent);
        }

        return this;
    }



    async display() {
        // if no text has been displayed yet, make a dialog container

        if(this.dialogContainerElement == undefined) {
            this.dialogContainerElement = createDialogContainer(this.name);
        }
        
        // add text into new text element, then append the text element to the `this.dialogContainerElement`

        let newTextElement = createDialogText(); // create new text element
        let textComponent = this.textComponents[0]; // the textComponent to display
        this.textComponents.shift(); // removed the textComponent being displayed - shift removes the first entry

        // if the text only represents a delay, just wait the specified period of time
        if(textComponent.isOnlyDelay) {
            if(textComponent.typeSpeed == 0) {
                return new Promise(resolve => resolve());
            } else {           
                return new Promise(resolve => setTimeout(resolve, textComponent.typeSpeed));
            }
        }



        // handle special cases
        if(textComponent.text == "") {
            return;
        }



        // add stylings        
        if(textComponent.bold) newTextElement.classList.add("dialog-bold");
        if(textComponent.italic) newTextElement.classList.add("dialog-italic");
        if(textComponent.underline) newTextElement.classList.add("dialog-underline");

        newTextElement.style.color = textComponent.textColor;
        newTextElement.style.fontSize = textComponent.textSize;


        // add it now to main container now, as text will be displayed
        this.dialogContainerElement.appendChild(newTextElement);


        // display text instantly, if ms between character time is 0
        if(textComponent.typeSpeed == 0) {

            newTextElement.innerHTML = textComponent.text.replace("\n", "<br>");

            return new Promise(resolve => resolve());


        } else { // otherwise create the schedules for displaying the other characters

            let i = 0;

            setInterval(() => { // this could probably be optimized
                newTextElement.innerHTML = textComponent.text.substring(0, i).replace("\n", "<br>");
                i++;
            }, textComponent.typeSpeed);


            return new Promise(resolve => setTimeout(resolve, textComponent.typeSpeed * (textComponent.text.length + 1)));
        }
    }

    async displayAll() {
        let length = this.textComponents.length; // each line is a text component - i just would like to be able to simply write code in the game.js
        let isLocal = this.name.toLowerCase() == "you";
        let doNetwork = this.name.toLowerCase() != "computer";
        
        if(!doNetwork) {
            for(let i = 0; i < length; i++) {
                await this.display(); // it handles that itself
            }
            return;    
        }

        Vitals.getInstance().setSpeaker(isLocal == true, isLocal == false);
        for(let i = 0; i < length; i++) {
            await this.display(); // it handles that itself
        }
        Vitals.getInstance().setSpeaker(false, false);
    }



    setBold(flag) {
        this.activeTextComponent.bold = flag;
        return this;
    }

    setItalic(flag) {
        this.activeTextComponent.italic = flag;
        return this;
    }

    setUnderline(flag) {
        this.activeTextComponent.underline = flag;
        return this;
    }



    setTextColour(colour) {
        this.activeTextComponent.textColor = colour;
        return this;
    }

    setTextSize(size) {
        this.activeTextComponent.textSize = size;
        return this;
    }

    setCharacterInterval(ms) {
        this.activeTextComponent.typeSpeed = ms;
        return this;
    }
}







class TextComponent {
    constructor() {
        this.text = "";

        this.bold = false;
        this.italic = false;
        this.underline = false;

        this.textColor = "rgb(255, 255, 255)";
        this.textSize = "17px";
        this.typeSpeed = 0;

        this.actsAsDelay = false;
        // if this var is true, the TextComponent simply acts as a display and shows no characters - it'll wait out for the duration of the typeSpeed.
        // once this value is true, it can no longer be set to false
    }
}


// dialog util
function createDialogContainer(name) {
    let dialogContainerElement = document.getElementById("dialog-line-container");

    let newDialogEntryContainerElement = document.createElement("div"); // create new container
    newDialogEntryContainerElement.classList.add("dialog-entry-container");

    let newDialogPrefix = document.createElement("p"); // create playername <p>
    newDialogPrefix.classList.add("dialog-prefix");

    newDialogPrefix.innerHTML = getIcon(name) + " " + name; // add icon + text
    if(name.toLowerCase() == "you" || name.toLowerCase() == "computer") newDialogPrefix.classList.add("prefix-you"); // make the you text bold if needed

    newDialogEntryContainerElement.appendChild(newDialogPrefix); // add playername to container

    // finally append the container to the visible dialog-container container
    // newDialogEntryContainerElement.classList.remove("dialog-hidden-anim");
    dialogContainerElement.appendChild(newDialogEntryContainerElement);

    newDialogEntryContainerElement.classList.add("dialog-hidden-anim");

    // play the show animation
    setTimeout(() => {
        newDialogEntryContainerElement.classList.remove("dialog-hidden-anim");
    }, 10);
    
    return newDialogEntryContainerElement;
}

function createDialogText() {
    let newDialogText = document.createElement("span");

    newDialogText.classList.add("dialog-text-container");

    return newDialogText;
}







function getIcon(name) {
    if(name.toLowerCase() == "you") {
        return "👨‍🚀";
    } else if(name.toLowerCase() == "computer") {
        return "💻";
    } else {
        return "📻";
    }
}