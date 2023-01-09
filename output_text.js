/*
    The textComponents array contains a list of TextComponents.

    By setting new text in the TextBlock, you compile the previous data into the TextComponent and it gets pushed to the array.
    Then, all values are reset and a new TextBlock can be generated.

*/

class TextBlock {
    constructor() {
        this.textComponents = [];

        this.activeTextComponent = undefined;
    }

    append(text) {
        if(this.activeTextComponent != undefined) {
            this.textComponents.push(this.activeTextComponent());
        }

        this.activeTextComponent = new TextComponent();
        this.activeTextComponent.text = text;
    }

    delay(msDelay) {
        this.activeTextComponent.typeSpeed = msDelay;
        this.activeTextComponent.isOnlyDelay = true;
    } 



    setBold(flag) {
        this.activeTextComponent.bold = flag;
    }

    setItalic(flag) {
        this.activeTextComponent.italic = flag;
    }

    setUnderline(flag) {
        this.activeTextComponent.underline = flag;
    }



    setTextColour(colour) {
        this.activeTextComponent.textColor = colour;
    }

    setTextSize(size) {
        this.activeTextComponent.textSize = size;
    }

    setCharacterInterval(ms) {
        this.activeTextComponent.typeSpeed = ms;
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

        this.isOnlyDelay = false;
        // if this var is true, the TextComponent simply acts as a display and shows no characters - it'll wait out for the duration of the typeSpeed.
        // once this value is true, it can no longer be set to false
    }
}