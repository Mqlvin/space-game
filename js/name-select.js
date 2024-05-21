import { Utils } from "./util/utils.js";

let nameContainerElement = document.getElementById("name-container");

let index = 1;
let name = "";

export async function requestName() {
    let div = document.getElementById("nameselect");
    await Utils.asyncDelay(1000);
    div.style.opacity = 1.0;

    addEventListener("keydown", async (event) => {
        
        if(event.key == "ArrowLeft") {
            let div = document.getElementById("left-name");
            div.classList.add("left-arrow-anim");

            index--;
            index = Utils.clampI(index, 0, 2);
            updateSelectedName(index);

            await Utils.asyncDelay(180);
            div.classList.remove("left-arrow-anim");
        } else if(event.key == "ArrowRight") {
            let div = document.getElementById("right-name");
            div.classList.add("right-arrow-anim");

            index++;
            index = Utils.clampI(index, 0, 2);
            updateSelectedName(index);

            await Utils.asyncDelay(180);
            div.classList.remove("right-arrow-anim");
        } else if(event.key == "Enter") {
            document.getElementsByClassName("submit-name")[0].style.opacity = 0.0;

            let names = document.getElementById("name-container").children;
            for(let i = 0; i < names.length; i++) {
                if(names[i].classList.contains("name-inactive")) {
                    names[i].style.opacity = 0.0;
                } else {
                    names[i].classList.add("name-glow");
                }
            }

            let arrows = document.getElementsByClassName("wheel-arrow");
            for(let i = 0; i < arrows.length; i++) {
                arrows[i].style.opacity = "0.0";
            }

            
            await Utils.asyncDelay(1000);

            name = nameContainerElement.children[index].textContent;
        }
    });

    while(name == "") {
        await new Promise(res => setTimeout(res, 200));
    }

    return name;
}

export async function hideNameSelect() {
    let div = document.getElementById("nameselect-window");
    div.style.opacity = 0.0;
    await Utils.asyncDelay(1500);
}

export async function showWelcomeBack(name) {
    let message = "Welcome back to the ISS computer,";

    let div = document.getElementById("nameselect");
    div.textContent = "";
    let newWelcomeBackElement = document.createElement("span");
    newWelcomeBackElement.classList.add("welcome-back-text");
    div.append(newWelcomeBackElement);

    for(let i = 0; i <= message.length; i++) {
        newWelcomeBackElement.textContent = message.substring(0, i);

        await Utils.asyncDelay(30);
    }

    await Utils.asyncDelay(300);


    message = "Captain " + name;
    newWelcomeBackElement = document.createElement("span");
    newWelcomeBackElement.classList.add("welcome-back-text");
    newWelcomeBackElement.style.fontWeight = "900";
    div.append(newWelcomeBackElement);

    for(let i = 0; i <= message.length; i++) {
        newWelcomeBackElement.textContent = message.substring(0, i);

        await Utils.asyncDelay(30);
    }
}

export async function hideWelcomeBack() {
    let div = document.getElementById("nameselect");
    div.style.opacity = 0.0;
}

export function removeNameSelectDiv() {
    document.getElementById("nameselect").remove();
}

export function prepareMainDiv() {
    let div = document.getElementsByClassName("i-box");
    
    for(let i = 0; i < div.length; i++) {
        div[i].style.opacity = 0.0;
    }
}

export async function showMainDiv() {
    let div = document.getElementsByClassName("i-box");
    
    for(let i = 0; i < div.length; i++) {
        div[i].style.opacity = 1.0;
    }
}

function updateSelectedName(index) {
    for(let i = 0; i < nameContainerElement.children.length; i++) {
        nameContainerElement.children[i].classList.remove("name-center");
        nameContainerElement.children[i].classList.add("name-inactive");
    }

    nameContainerElement.children[index].classList.add("name-center");
    nameContainerElement.children[index].classList.remove("name-inactive");
}