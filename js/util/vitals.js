import { Utils } from "./utils.js";

const VitalType = {
    OXYGEN: "Oxygen",
    POWER: "Power",
    TEMPERATURE: "Temperature"
};

const uptimeElement = document.getElementById("uptime");
const txElement = document.getElementById("nw-out");
const rxElement = document.getElementById("nw-in");
const inPower = document.getElementById("power-in");
const outPower = document.getElementById("power-out");
const netPower = document.getElementById("power-net");




export class Vitals {
    constructor() {
        this.oxygen = 100.0;
        this.energy = 100.0;
        this.temperature = 20.0;

        this.delayLength = 2400;

        this.speakerLocal = false;
        this.speakerRemote = false;
        this.totalSeconds = 0;
        this.nonExistantMachineOn = false; // used for a non-existant machine to make the power consumption more realistic

        this.rx = 0;
        this.tx = 0;
    }

    getOxygen() {
        return this.oxygen;
    }

    async setOxygen(value, doDelay) {
        let oldValue = this.oxygen;
        this.oxygen = value;
        this.#updateBarFluid(VitalType.OXYGEN, value, oldValue);

        if(doDelay) await Utils.asyncDelay(this.delayLength);
    }

    getEnergy() {
        return this.energy;
    }

    async setEnergy(value, doDelay) {
        let oldValue = this.energy;
        this.energy = value;
        this.#updateBarFluid(VitalType.POWER, value, oldValue);

        if(doDelay) await Utils.asyncDelay(this.delayLength);
    }

    getTemperature() {
        return this.temperature;
    }

    async setTemperature(value, doDelay) {
        let oldValue = this.temperature;
        this.temperature = value;
        this.#updateBarFluid(VitalType.TEMPERATURE, value, oldValue);


        if(doDelay) await Utils.asyncDelay(this.delayLength);
    }



    setSpeaker(isLocal, isEarth) {
        this.speakerLocal = isLocal;
        this.speakerRemote = isEarth;
    }

    

    updateSysInfo() {
        this.updateUptime();
        this.totalSeconds++;

        this.updateNetwork();
        this.updateEnergy();
    }

    updateUptime() {
        let date = new Date(0);
        date.setSeconds(this.totalSeconds);
        uptimeElement.textContent = date.toISOString().substring(11, 19);
    }

    updateNetwork() {
        this.tx = this.getRealisticNetworkNumber(txElement.textContent, this.speakerLocal);
        txElement.textContent = this.tx;

        this.rx = this.getRealisticNetworkNumber(rxElement.textContent, this.speakerRemote);
        rxElement.textContent = this.rx;
    }

    getRealisticNetworkNumber(last, isOn) {
        if(isOn) {
            if(last < 5) {
                return Math.floor(Math.random() * 20) + 10; // somewhere between 10-30
            } else if(last <= 30) {
                return Math.floor(Math.random() * 30) + 30; // somewhere between 30-60
            } else {
                return Math.floor(Math.random() * 39) + 60; // somewhere between 60-99
            }
        } else {
            if(last > 54) {
                return Math.floor(Math.random() * 15) + 15; // somewhere between 15-30
            } else if(last > 30) {
                return Math.floor(Math.random() * 7) + 5; // somewhere between 5-12
            }

            if(last == 2 && Math.random() > 0.5) return 1;
            else if(Math.random() < 0.13) return 1;
            else if(Math.random() < 0.3 && last == 1) return 2;
            return 0;
        }
    }

    updateEnergy() {
        if(Math.random() < 0.03) this.nonExistantMachineOn = !this.nonExistantMachineOn;

        let powerInValue = Math.floor(Math.random() * 14) + (this.nonExistantMachineOn ? 3400 : 3400);
        let powerOutValue = Math.floor(Math.random() * 10) + (this.nonExistantMachineOn ? 3270 : 3180);
        let powerNetValue = powerInValue - powerOutValue;


        inPower.textContent = powerInValue + "kW";
        outPower.textContent = powerOutValue + "kW";
        if(powerNetValue > 0) {
            netPower.textContent = "+" + powerNetValue + "kW";
        } else {
            netPower.textContent = "" + powerNetValue + "kW";
        }
    }
    

    async #updateBarFluid(type, value, lastVal) {
        let newValue = 0.0;
        let newWidthPercentage = 0.0;
        let newSuffix = "";


        if(type == VitalType.TEMPERATURE) {
            newValue = value.toFixed(1);
            newWidthPercentage = Math.max(Math.min(value, 40), 0) * 100/40;
            newSuffix = "°C";
        } else {
            newValue = Math.round(value);
            newWidthPercentage = newValue;
            newSuffix = "%";
        }
    
        let elemList = document.getElementsByClassName(type);
        if(elemList.length == 2) {
            let fluidElemIndex = (elemList[0].classList.contains("vitals-bar-fluid") ? 0 : 1);

            let fluidElem = elemList[fluidElemIndex];
            fluidElem.style.width = newWidthPercentage + "%";
    
            let steps = 30;
            let values = Utils.interpolateValues(steps, lastVal, newValue);
            for(let i = 0; i <= steps; i++) {
                let delayTime = (Math.sin(Math.PI / (2 * (Math.abs(i - steps / 2) + 1))))

                await Utils.asyncDelay(50 * (1 - delayTime));
                elemList[fluidElemIndex == 0 ? 1 : 0].textContent =
                    type + " (" + (type == VitalType.TEMPERATURE ? (values[i]).toFixed(1) : Math.round(values[i])) + newSuffix + ")";
            }
        }
    }

    static getInstance() {
        return classInstance;
    }
}

const classInstance = new Vitals();