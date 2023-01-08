let total = 1;
let lines = 0;

function scrollArtifactLines() {
    setInterval(() => {
        total = (total == 0) ? 1 : 0;
        document.documentElement.style.setProperty('--scroll', (total + 1) + 'px'); 
        document.documentElement.style.setProperty('--scroll-second', (total + 2) + 'px'); 
    }, 100);
}

function printLine(text, colour, textSize, textAlign, bold, underline, underlineOpacity) {
    forAllLines(text, (string) => {
        new OutputLine(string, colour, textSize, textAlign, bold, underline, underlineOpacity, 0).show();
    });
}

function typewrite(text, colour, textSize, textAlign, bold, underline, underlineOpacity, msInterval) {
    forAllLines(text, (string) => {
        var k = new OutputLine(string, colour, textSize, textAlign, bold, underline, underlineOpacity, msInterval);
        k.typewrite(k.string, k.msInterval, k.element);
    });
}

function printScript(outputs) {
    // schedule all the outputs
    var timeBuilder = 0;
    outputs.forEach((k) => {
        setTimeout(() => {
            k.typewrite(k.string, k.characterInterval, k.element);
        }, timeBuilder);

        timeBuilder += k.characterInterval * k.string.length;
    });

    return timeBuilder;
}



function addLine(element) {
    textAreaElement.appendChild(element);
}

function forAllLines(string, func) {
    console.log(string)
    var splitString = string.split("\n");
    for(var i = 0; i < splitString.length; i++) {
        func(splitString[i]);
        lines++;

        updateLinesHeight();
    }
}

function updateLinesHeight() {
    scrollAmount = 0; // reset scroll in case of typewriting function

    var num = (lines * LINE_HEIGHT);
    textAreaElement.style.transform = "translateY(-" + (num) + "px)";

    return num;
}