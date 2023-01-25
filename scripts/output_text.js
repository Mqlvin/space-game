/*
    The textComponents array contains a list of TextComponents.

    By setting new text in the TextBlock, you compile the previous data into the TextComponent and it gets pushed to the array.
    Then, all values are reset and a new TextBlock can be generated.

*/


// technically not immutable (i just like the constants naming convention)
const HTML_ENTITIES = new Map([
    [" ","&nbsp;"],
    ["<","&lt;"],
    [">","&gt;"],
    ["&","&amp;"],
    ["\"","&quot;"],
    ["'","&apos;"],
    ["¢","&cent;"],
    ["£","&pound;"],
    ["¥","&yen;"],
    ["€","&euro;"],
    ["©","&copy;"],
    ["®","&reg"]
]);

const PLAYER_ICON_MAP = {
    "you":"👨‍🚀",
    "computer":"💻",
    "other":"📻"
};




class DialogEntry {
    constructor(name) {
        this.textComponents = []; // each piece of text (e.g. the two you saw) os a textCompeontn
        this.activeTextComponent = undefined;

        this.name = name;

        this.dialogContainerElement = undefined;
    }

    /* "packs" the current and starts a new text block */
    append(text) {
        this.activeTextComponent = new TextComponent();
        this.activeTextComponent.text = translateStringToHTML(text);

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
            console.log("created container")
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
            return new Promise(resolve => resolve()); // i thought returning the promise would say the async function is done and it would continue
                                                        // so by that logic if i return nothing the statment would never complete idk THIS IS WHAT im confused aobut
        }



        // add stylings        
        if(textComponent.bold) newTextElement.classList.add("dialog-bold");
        if(textComponent.italic) newTextElement.classList.add("dialog-italic");
        if(textComponent.underline) newTextElement.classList.add("dialog-underline");


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

        for(let i = 0; i < length; i++) {


            console.log("displayng: " + this.textComponents[0]);


            await this.display(); // it handles that itself

        }

        console.log("here")
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
        this.textSize = "14px";
        this.typeSpeed = 0;

        this.actsAsDelay = false;
        // if this var is true, the TextComponent simply acts as a display and shows no characters - it'll wait out for the duration of the typeSpeed.
        // once this value is true, it can no longer be set to false
    }
}


// dialog util
function createDialogContainer(name) {
    let dialogContainerElement = document.getElementsByClassName("dialog-container")[0];

    let newDialogEntryContainerElement = document.createElement("div"); // create new container
    newDialogEntryContainerElement.classList.add("dialog-entry-container");

    let newDialogPrefix = document.createElement("p"); // create playername <p>
    newDialogPrefix.classList.add("dialog-prefix");
    newDialogPrefix.innerHTML = PLAYER_ICON_MAP[Object.keys(PLAYER_ICON_MAP).includes(name.toLowerCase()) ? name.toLowerCase() : PLAYER_ICON_MAP.length] + " " + name; // add icon + text
    if(name.toLowerCase() == "player" || name.toLowerCase() == "computer") newDialogPrefix.classList.add("prefix-you"); // make the you text bold if needed

    newDialogEntryContainerElement.appendChild(newDialogPrefix); // add playername to container

    // finally append the container to the visible dialog-container container
    // newDialogEntryContainerElement.classList.remove("dialog-hidden-anim");
    dialogContainerElement.insertBefore(newDialogEntryContainerElement, dialogContainerElement.firstChild);

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






// misc util

function translateStringToHTML(string) {
    let preprocessed = string;

    // line breaks will be handled when the text is being appened/typed out on screen

    // convert special characters
    HTML_ENTITIES.forEach((k, v) => {
        preprocessed = preprocessed.replace(k, v);
    });


    return string;
}