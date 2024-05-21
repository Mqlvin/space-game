// var bootupTime = printScript(BOOTUP_SCRIPT);

import { InputHandler } from "./input.js";
import { DialogEntry } from "./util/output_text.js";
import { Vitals } from "./util/vitals.js";

new InputHandler();

let testTextBlock = new DialogEntry("Computer")
        .append("This is my example text\nwith a breakline").setBold(false).setCharacterInterval(100).setUnderline(true).pack()
        .append("...").setBold(false).setCharacterInterval(100).pack()
        .append("This font is bolded").setCharacterInterval(100).pack(); // so they shold be displaying one after another

let textBlockOne = new DialogEntry("Commander Adam")
        .append("I'm trying to reestablish a connection with the ISS, but it's failing. \nThe connection is likely interrupted from debris blocking the antenna.\n").setCharacterInterval(50).pack()
        .append("\nIs it safe for Pilot Allen to clear the antenna?").setItalic(true).setCharacterInterval(50).pack();

let textBlockResposneOne = new DialogEntry("You")
        .append("Yes, I believe it's safe. I'll ask Allen to clear it now, seeing as he's out there already!\n").setCharacterInterval(50).pack()
        .append("...\n").setCharacterInterval(30).pack()
        .append("It's been cleared.").setItalic(true).setCharacterInterval(50).pack();

let computerResponseOne = new DialogEntry("Computer")
        .append("Antenna successfully cleaned. Connection establishing...\n").setTextColour("#a5e8ad").setBold(true).setCharacterInterval(2).pack()
        .delay(1000).pack()
        .append("Connection established to:").setTextColour("#a5e8ad").setBold(true).setCharacterInterval(20).pack()
        .append("\n    IP:159.178.157.108").setTextColour("#a5e8ad").setBold(true).setCharacterInterval(20).pack()
        .append("\n    PORT:2023").setTextColour("#a5e8ad").setBold(true).setCharacterInterval(20).pack();

let textBlockTwo = new DialogEntry("Commander Adam")
        .append("Perfect!").setBold(true).setCharacterInterval(50).pack()
        .append(" I've made the connection. I should be able to look further into the problem now.\n ").setCharacterInterval(5).pack()
        .append("Where should I look first?").setItalic(true).setCharacterInterval(5).pack();

let textBlockThree = new DialogEntry("Computer")
        .append("Alert!").setBold(true).setCharacterInterval(20).pack()
        .append(" Oxygen levels significantly low. ").setCharacterInterval(20).pack();


export async function main() {
    // defaults
    {
        Vitals.getInstance().setOxygen(100, false);
        Vitals.getInstance().setEnergy(100, false);
        Vitals.getInstance().setTemperature(24.0, false);
    }

    await textBlockOne.displayAll();

    if((await InputHandler.i().getInput(["Yes", "No"])) == 0) {
        await textBlockResposneOne.displayAll();
    }

    await computerResponseOne.displayAll();

    await textBlockTwo.displayAll();

    if((await InputHandler.i().getInput(["Oxygen recycler", "Energy generator", "Internal Pressure"])) == 0) {
        await Vitals.getInstance().setOxygen(90, true);
    }

    await textBlockThree.displayAll();
}







function util_performVitalSystemChecks() {
    var brokenProcesses = [Math.floor(Math.random() * VITAL_PROCESSES.length), Math.floor(Math.random() * VITAL_PROCESSES.length)];
    var delay = 0;

    var messageMap = new Map();
    for(var i = 0; i < VITAL_PROCESSES.length; i++) {
        if(i == brokenProcesses[0] || i == brokenProcesses[1]) {
            messageMap.set("[!] " + VITAL_PROCESSES[i] + " checks failed", true);
        } else {
            messageMap.set("[+] " + VITAL_PROCESSES[i] + " checks succeed", false);
        }
    }


    messageMap.forEach((v, k) => {

        if(v) {
            setTimeout(() => {
                printLine(k, RED_FONT_COLOUR, null, "left", true, null, null);
            }, delay);
        } else {
            setTimeout(() => {
                printLine(k, GREEN_FONT_COLOUR, null, "left", false, null, null);
            }, delay);
        }



        delay += Math.floor(Math.random() * 500 + 500);
    });

    setTimeout(() => {
        typewrite("a", INVISIBLE_FONT_COLOUR, null, "left", null, null, null, 1000);
     }, delay + 500);
    setTimeout(() => {
       printLine("System checks completed. Found " + brokenProcesses.length + " problem(s).", GREY_FONT_COLOUR, null, "left", null, null, null);
       printLine("Attention required.", RED_FONT_COLOUR, null, "center", true, true, 0.5);
    }, delay + 500);
}




































/*
      ___   ___   __  __  __  __  ___  _  _  ___   ___ 
     / __| / _ \ |  \/  ||  \/  |/   \| \| ||   \ / __|
    | (__ | (_) || |\/| || |\/| || - || .  || |) |\__ \
     \___| \___/ |_|  |_||_|  |_||_|_||_|\_||___/ |___/

*/

function execute(command, args) {
    // typewrite("Executed command: \"" + command + "\"\nArgs: " + args, 5)

    if(command.toLowerCase() == "echo") c_echo(args);
    else if(command.toLowerCase() == "test");
    else s_noCommandFound();
}

function s_noCommandFound() {
    typewrite("Unknown command. Try \"useful\" for help.", RED_FONT_COLOUR, null, "left", null, null, null, 50);
}

function c_echo(args) {
    var textBuilder = "";
    for(var i = 0; i < args.length; i++) {
        textBuilder += args[i] + " ";
    }

    textBuilder = textBuilder.substring(0, textBuilder.length - 1);

    let functions = [];

    functions.push(new OutputLine(textBuilder, WHITE_FONT_COLOUR, null, "center", null, null, null, 150));
    // functions.push(new OutputLine("Welcome to the ISS admin computer.", null, null, "center", true, null, null, 100));

    printScript(functions);
}

