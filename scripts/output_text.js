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

const PLAYER_ICONS = ["👨‍🚀", "📻"];




class DialogEntry {
    constructor(name) {
        this.textComponents = [];
        this.activeTextComponent = undefined;

        this.name = name;
        this.you = name.toLowerCase() == "you";

        this.dialogElement = undefined;
    }

    /* "packs" the current and starts a new text block */
    append(text) {
        if(this.activeTextComponent != undefined) {
            this.textComponents.push(this.activeTextComponent);
        }

        this.activeTextComponent = new TextComponent();
        this.activeTextComponent.text = translateStringToHTML(text);

        return this
    }

    delay(msDelay) {
        this.activeTextComponent.typeSpeed = msDelay;
        this.activeTextComponent.isOnlyDelay = true;
        return this;
    }

    async display() {
        // if no text has been displayed yet, make a dialog container

        console.log("made it here")

        if(this.dialogElement == undefined) { // new field for class declaration
            this.dialogElement = createDialogContainer(this.you, this.name);
            console.log("created container")
        }
        
        // append the text to the dialog container
        

        // TODO
    }

    async displayAll() {
        for(let i = 0; i < this.textComponents.length; i++) {
            await this.display();
        }
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

    wait(ms) {
        this.activeTextComponent.typeSpeed = ms;
        this.activeTextComponent.actsAsDelay = true;
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
        this.typeSpeed = "0";

        this.actsAsDelay = false;
        // if this var is true, the TextComponent simply acts as a display and shows no characters - it'll wait out for the duration of the typeSpeed.
        // once this value is true, it can no longer be set to false
    }
}


// dialog util
function createDialogContainer(you, name) {
    let dialogContainerElement = document.getElementsByClassName("dialog-container")[0];

    let newDialogEntryContainerElement = document.createElement("div"); // create new container
    newDialogEntryContainerElement.classList.add("dialog-entry-container");

    console.log(newDialogEntryContainerElement.classList)

    let newDialogPrefix = document.createElement("p"); // create playername <p>
    newDialogPrefix.classList.add("dialog-prefix");
    newDialogPrefix.innerHTML = PLAYER_ICONS[(you ? 0 : 1)] + " " + name; // add icon + text
    if(you) newDialogPrefix.classList.add("prefix-you"); // make the you text bold if needed

    newDialogEntryContainerElement.appendChild(newDialogPrefix); // add playername to container

    // finally append the container to the visible dialog-container container
    // newDialogEntryContainerElement.classList.remove("dialog-hidden-anim");
    dialogContainerElement.insertBefore(newDialogEntryContainerElement, dialogContainerElement.firstChild);

    newDialogEntryContainerElement.classList.add("dialog-hidden-anim");

    // play the show animation
    setTimeout(() => {
        console.log("showing element")
        newDialogEntryContainerElement.classList.remove("dialog-hidden-anim");
    }, 10);
    
    

    console.log(newDialogEntryContainerElement.classList)

    return newDialogEntryContainerElement;
}








// misc util

function translateStringToHTML(string) {
    let preprocessed = string;


    // add line breaks (must be done before special character replace considering <> html entities)
    preprocessed = preprocessed.replace("\n", "<br>");

    // convert special characters
    HTML_ENTITIES.forEach((k, v) => {
        preprocessed = preprocessed.replace(k, v);
    });


    return string;
}