class OutputLine {
    constructor(string, colour, textSize, textAlign, bold, underline, underlineOpacity, msInterval) {
        this.typewritten = msInterval != 0;
        this.characterInterval = msInterval;

        HTML_ENTITIES.forEach((k, v) => {
            string = string.replace(k, v);
        });

        var pstr = (string == null ? "" : string);
        var pcolour = (colour == null ? "rgb(255, 255, 255)" : colour);
        var ptextSize = (textSize == null ? "1.2rem" : textSize);
        var pbold = (bold == null ? false : bold);
        var punderline = (underline == null ? false : underline);
        var punderlineOpacity = (underlineOpacity == null ? "0.0" : underlineOpacity);
        var ptextAlign = (textAlign == null ? "left" : textAlign);
        // revert all values to default if they're null

        this.element = generateElement((this.typewritten ? "" : pstr), pcolour, ptextSize, ptextAlign, pbold, punderline, punderlineOpacity);
        this.string = pstr;
    }

    show() {
        addLine(this.element);
    }

    typewrite(string, interval, element) {
        this.show();
        if(interval == 0) return;

        let index = 1;
        // let typewriteCarat = createCarat((screen.width / 2) + ((string.length / 2) * 13.7), 50);

        const intervalId = setInterval(function() {
            if(string.length + 1 == index) {
                // setCaratVisible(typewriteCarat, false);
                clearInterval(intervalId); // if finished
            }
            else {
                if(index == 1) {
                    lines++;
                } // add a line if its the first time the line is appearing

                updateLinesHeight();
                // update the height on each new character

                
                // update carat position
                // setCaratPosition(typewriteCarat, (screen.width / 2) + (Math.floor(index / 2 + 1) * 13.7), 80);

                element.innerHTML = string.substring(0, index); // otherwise update string
                index++;
            }
        }, interval);
    }
}

function generateElement(text, colour, textSize, textAlign, bold, underline, underlineOpacity) {
    var element = document.createElement("p");
    element.classList.add("t_text");
    element.innerHTML = text;
    element.style.color = colour;
    element.style.textShadow = "0 0 7px " + colour;
    element.style.fontSize = textSize;
    element.style.fontWeight = bold ? 900 : 400;
    element.style.textAlign = textAlign;

    // deal with padding issues with textAlign
    if(textAlign == "center") element.style.padding = "0px 0px 0px 0px";
    else if(textAlign == "right") element.style.padding = "0px 50px 0px 0px";

    if(underline) {
        element.style.textDecoration = "underline";
        element.style.textDecorationColor = "rgba(" + colour + ", " + underlineOpacity + ")";
    }

    return element;
}