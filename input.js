const DIALOG_ELEMENT = document.getElementsByClassName("dialog_options_container")[0];
const INPUT_CARAT = document.getElementsByClassName("input_selector")[0];

addEventListener("keydown", (event) => {
    if(event.key == "ArrowUp") {
        if(waitingForEnter) moveTextSelector(-1);
    } else if(event.key == "ArrowDown") {
        if(waitingForEnter) moveTextSelector(1);
    }
});

let waitingForEnter = false;
let selectedIndex = 0;
let options;

async function getInput(textOptions) {
    // var init
    options = textOptions;
    genOptionTexts();
    selectedIndex = 0;


    await waitForEnter();

    await playSelectAnimation();

    return selectedIndex;
}

async function waitForEnter() {
    waitingForEnter = true;
    INPUT_CARAT.classList.remove("selector_hidden");

    return new Promise((resolve) => {
        document.addEventListener("keydown", onKey);
        function onKey(event) {
            if(event.key == "Enter" || event.key == "ArrowRight") {
                document.removeEventListener("keydown", onKey);
                waitingForEnter = false;
                INPUT_CARAT.classList.add("selector_hidden");

                resolve();
            }
        }
    });
}

async function playSelectAnimation() {
    let activeElement;
    for(let i = 0; i < DIALOG_ELEMENT.children.length; i++) {
        if(i == selectedIndex) {
            activeElement = DIALOG_ELEMENT.children[i];
            activeElement.classList.add("input_selected_disappear");
        } else {
            DIALOG_ELEMENT.children[i].classList.add("input_unselected_disappear");
        }
    }

    setTimeout(() => {
        activeElement.classList.add("input_selected_disappear_2");
    }, 800);

    return new Promise(resolve => setTimeout(resolve, "2000"));
}




function genOptionTexts() {
    for(var i = 0; i < options.length; i++) {
        appendLine(options[i], i == 0); // make the first option true
    }
}

function appendLine(text, active) {
    let ele = document.createElement("p");
    ele.appendChild(document.createTextNode(text));
    ele.classList.add("input_option");
    if(active) ele.classList.add("option_active");

    DIALOG_ELEMENT.appendChild(ele);
}

function moveTextSelector(intBy) {
    selectedIndex += intBy;

    selectedIndex = Math.max(0, selectedIndex); // keep it at or above 0
    selectedIndex = Math.min(selectedIndex, options.length - 1); // keep it below the max list size

    

    updateHoverComponents();
}

function updateHoverComponents() {
    for(let i = 0; i < DIALOG_ELEMENT.children.length; i++) {
        if(i == selectedIndex) {
            DIALOG_ELEMENT.children[i].classList.add("option_active");
        } else {
            DIALOG_ELEMENT.children[i].classList.remove("option_active");
        }
    }

    INPUT_CARAT.style.marginTop = (28 * selectedIndex + 2) + "px";
}