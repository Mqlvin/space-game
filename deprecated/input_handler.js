const history = new Array();
let historyIndex = 0;

inputBoxElement.value = "";

let currentCommandSave = "";
let scrollAmount = 0;

const typerCarat = createCarat(50, 30);

addEventListener("keydown", (event) => {
    // console.log(event.key)
    
    if(event.key.length == 1 && currentCommandSave.length <= 74) {
        inputBoxElement.value = inputBoxElement.value + event.key;
    }



    else if(event.key == "Backspace") {
        inputBoxElement.value = inputBoxElement.value.substring(0, inputBoxElement.value.length - 1);
    }



    else if(event.key == "Enter") {
        if(inputBoxElement.value.length == 0) return;

        var split = inputBoxElement.value.split(" ");

        if(split.length == 1) execute(split[0], new Array());
        else {
            var argsBuilder = new Array();
            for(var i = 1; i < split.length; i++) {
                argsBuilder.push(split[i]);
            }
            execute(split[0], argsBuilder);
        }

        if(inputBoxElement.value != history[history.length - 1]) history.push(inputBoxElement.value);
        inputBoxElement.value = "";

        historyIndex = history.length;
        
        scrollAmount = updateLinesHeight(); // call function from terminal.js
    }



    else if(event.key == "Escape") {
        inputBoxElement.value = "";
    }



    else if(event.key == "ArrowUp") {
        if(historyIndex == 0) return;
        historyIndex--;
        inputBoxElement.value = history[historyIndex];

        setCaratPosition(typerCarat, 53 + (13.7 * inputBoxElement.value.length), 30);

        return;
    }



    else if(event.key == "ArrowDown") {
        if(historyIndex == history.length) return;
        historyIndex++;
        if(historyIndex == history.length) {
            inputBoxElement.value = currentCommandSave;
        } else {
            inputBoxElement.value = history[historyIndex];
        }

        setCaratPosition(typerCarat, 53 + (13.7 * inputBoxElement.value.length), 30);

        return;
    }



    if(historyIndex == history.length) currentCommandSave = inputBoxElement.value;
    setCaratPosition(typerCarat, 53 + (13.7 * currentCommandSave.length), 30);
});





addEventListener("wheel", (event) => {
    if(scrollUp(event)) {
        scrollAmount += 30;
        // make `textAreaElement` go down
    } else {
        scrollAmount -= 30;
        // make `textAreaElement` go up
    }

    // console.log("Changing scrollAmount:" + scrollAmount + " -> " + Math.min(-770, scrollAmount));

    // scrollAmount = Math.max(-750, scrollAmount);
    // scrollAmount = Math.min(-(lines * LINE_HEIGHT), scrollAmount);

    // console.log(scrollAmount)

    applyTranslation(scrollAmount);
});

function scrollUp(event) {
    if (event.wheelDelta) {
        return event.wheelDelta > 0;
    }
    return event.deltaY < 0;
}

function applyTranslation() {
    // console.log("aplying translation")
    textAreaElement.style.transform = "translateY(" + (scrollAmount) + "px)";
    // console.log("done translation " + textAreaElement.style.transform)
}





















// https://www.webtips.dev/webtips/javascript/how-to-clamp-numbers-in-javascript
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

// https://stackoverflow.com/a/28222246/14770791
function getOffset(el) {
    const rect = el.getBoundingClientRect();
    return {
      left: rect.left + window.scrollX,
      bottom: rect.bottom + window.scrollY
    };
  }