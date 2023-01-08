// var bootupTime = printScript(BOOTUP_SCRIPT);
async function main() {
    let choice = await getInput(["Enter the room", "Enter the second room", "Turn back", "Go through the hidden passage"]);
    
    
}

main();







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

