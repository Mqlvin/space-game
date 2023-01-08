function createCarat(x, y) {
    var newCarat = generateCaratElement();
    newCarat.style.bottom = (y + 2) +"px";
    newCarat.style.left = (x) + "px";
    terminalElement.insertBefore(newCarat, terminalElement.firstChild);

    return newCarat;
}

function setCaratPosition(carat, x, y) {
    carat.style.bottom = (y + 2) +"px";
    carat.style.left = (x) + "px";
}

function setCaratVisible(carat, visible) {
    carat.style.width = (visible ? 14 : 0);
}

function generateCaratElement() {
    var element = document.createElement("div");
    element.classList.add("carat");

    return element;
}