// html element constants
const terminalElement = document.getElementsByClassName("terminal")[0]; // div containing the entire screen
const textAreaElement = document.getElementsByClassName("t_terminal-history")[0]; // div containing <p> text lines
const inputBoxElement = document.getElementsByClassName("t_terminal-input")[0]; // <input> element



// numeric constants
const LINE_HEIGHT = 32; // height of lines in the terminal history



// misc constants
const HTML_ENTITIES = new Map([
    [" ","&nbsp;"],
    ["<","&lt;"],
    [">","&gt;"],
    ["&","&amp;"],
    ["\"","&quot;"],
    ["'","&apos;"],
    ["¢","&cent;"],
    ["£","&pound;"],
    ["¥","&yen;"],
    ["€","&euro;"],
    ["©","&copy;"],
    ["®","&reg"]
]);

const VITAL_PROCESSES = [
    "Satalite System",
    "Steering System",
    "Heating System",
    "Oxygen Recycler",
    "Internal Pressure",
    "Solar Power System",
    "Energy Reserve",
    "Fire",
    "Radar System"
];


// colour constants
const WHITE_FONT_COLOUR = "rgb(255, 255, 255)";
const GREY_FONT_COLOUR = "rgb(180, 180, 180)";
const RED_FONT_COLOUR = "rgb(221, 51, 51)";
const GREEN_FONT_COLOUR = "rgb(51, 221, 51)";
const INVISIBLE_FONT_COLOUR = "rgba(0, 0, 0, 0)";



// scripts
const BOOTUP_SCRIPT = [
    new OutputLine("Welcome to the International Space Station C&C computer.", WHITE_FONT_COLOUR, null, "center", true, null, null, 50),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 2000),
    new OutputLine("This machine and all related resources are", GREY_FONT_COLOUR, "1.0rem", "center", null, null, null, 30),
    new OutputLine("property of the US Government, in accordance", GREY_FONT_COLOUR, "1.0rem", "center", null, null, null, 30),
    new OutputLine("to the USA District Court Law under the authority", GREY_FONT_COLOUR, "1.0rem", "center", null, null, null, 30),
    new OutputLine("of 18 U.S.C. §§ 931, 932 coordinated law enforcement.", GREY_FONT_COLOUR, "1.0rem", "center", null, null, null, 30),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 2000),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 0),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 0),
    new OutputLine("Logging in...", GREY_FONT_COLOUR, null, "center", "1.0rem", null, null, 50),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", "1.0rem", null, null, 2000),
    new OutputLine("Welcome back Captain Sum Ting Wong", GREEN_FONT_COLOUR, null, "center", true, null, null, 50),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 6000),
    new OutputLine("a", INVISIBLE_FONT_COLOUR, null, "center", null, null, null, 0),
    new OutputLine("Performing vital system checks...", GREY_FONT_COLOUR, null, "left", true, null, null, 0),
];