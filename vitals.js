const VitalType = {
    OXYGEN: "Oxygen",
    POWER: "Power",
    TEMPERATURE: "Temperature"
};

// https://stackoverflow.com/questions/62213511/make-function-not-global-in-script-tag

// Storing things in classes now so functions aren't globally scoped
class Vitals {
    constructor() {
        this.oxygen = 100.0;
        this.energy = 100.0;
    }

    getOxygen() {
        return this.oxygen;
    }

    setOxygen(value) {
        this.oxygen = value;
        this.updateBarFluid(VitalType.OXYGEN, value);
    }

    getEnergy() {
        return this.energy;
    }

    setEnergy(value) {
        this.energy = value;
        this.updateBarFluid(VitalType.POWER, value);
    }






    updateBarFluid(type, value) {
        let newValueNumber = Math.round(value);
    
        let elemList = document.getElementsByClassName(type);
        if(elemList.length == 2) {
            let fluidElemIndex = (elemList[0].classList.contains("vitals-bar-fluid") ? 0 : 1);
    
            let fluidElem = elemList[fluidElemIndex];
            fluidElem.style.width = (newValueNumber) + "%";
    
                     // whatever the opposite is
            elemList[fluidElemIndex == 0 ? 1 : 0].textContent = type + " (" + newValueNumber + "%)";
        }
    }
}
let vitalsInstance = new Vitals();






function getVitals() {
    return vitalsInstance;
}