const DIALOG_ELEMENT = document.getElementsByClassName("dialog-options-container")[0];
const INPUT_CARAT = document.getElementsByClassName("input-selector")[0];



export class InputHandler {
    constructor() {
        this.waitingForEnter = false;
        this.selectedIndex = 0;
        this.options = undefined;

        this.registerListener();
    }

    registerListener() {
        addEventListener("keydown", (event) => {
            if(event.key == "ArrowUp") {
                if(this.waitingForEnter) this.#moveTextSelector(-1);
            } else if(event.key == "ArrowDown") {
                if(this.waitingForEnter) this.#moveTextSelector(1);
            }
        });
    }

    async getInput(optionsArray) {
        // clear previous option elements
        while(DIALOG_ELEMENT.firstChild) {
            DIALOG_ELEMENT.removeChild(DIALOG_ELEMENT.firstChild);
        }

        // var init
        this.options = optionsArray;
        this.#genOptionTexts(optionsArray);
        this.selectedIndex = 0;

        this.#updateHoverComponents();


        await this.waitForEnter();
        await this.playSelectAnimation();

        return this.selectedIndex; 
    }

    async waitForEnter() {
        this.waitingForEnter = true;
        INPUT_CARAT.classList.remove("selector-hidden");
    
        return new Promise((resolve) => {
            function onKey(event) {
                if(event.key == "Enter" || event.key == "ArrowRight") {
                    document.removeEventListener("keydown", onKey);
                    this.waitingForEnter = false;
                    INPUT_CARAT.classList.add("selector-hidden");
    
                    resolve();
                }
            }
            document.addEventListener("keydown", onKey);
        });
    }

    async playSelectAnimation() {
        let activeElement;
        for(let i = 0; i < DIALOG_ELEMENT.children.length; i++) {
            if(i == this.selectedIndex) {
                activeElement = DIALOG_ELEMENT.children[i];
                activeElement.classList.add("input-selected-disappear");
            } else {
                DIALOG_ELEMENT.children[i].classList.add("input-unselected-disappear");
            }
        }
    
        setTimeout(() => {
            activeElement.classList.add("input-selected-disappear-2");
        }, 1000);
    
        return new Promise(resolve => setTimeout(resolve, "2200"));
    }

    #genOptionTexts(options) {
        for(var i = 0; i < options.length; i++) {
            this.#appendLine(options[i], i == 0); // make the first option true
        }
    }

    #appendLine(text, active) {
        let ele = document.createElement("p");
        ele.appendChild(document.createTextNode(text));
        ele.classList.add("input-option");
        if(active) ele.classList.add("option-active");
    
        ele.classList.add("input-hidden");
        setTimeout(() => {
            ele.classList.remove("input-hidden");
        }, 30);
    
        DIALOG_ELEMENT.appendChild(ele);
    }
    
    #moveTextSelector(intBy) {
        this.selectedIndex += intBy;
    
        this.selectedIndex = Math.max(0, this.selectedIndex); // keep it at or above 0
        this.selectedIndex = Math.min(this.selectedIndex, this.options.length - 1); // keep it below the max list size
    
        
    
        this.#updateHoverComponents();
    }
    
    #updateHoverComponents() {
        for(let i = 0; i < DIALOG_ELEMENT.children.length; i++) {
            if(i == this.selectedIndex) {
                DIALOG_ELEMENT.children[i].classList.add("option-active");
            } else {
                DIALOG_ELEMENT.children[i].classList.remove("option-active");
            }
        }
    
        INPUT_CARAT.style.marginTop = (28 * this.selectedIndex + 2) + "px";
    }


    static i() {
        return instance;
    }
}

const instance = new InputHandler();







