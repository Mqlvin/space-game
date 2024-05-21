import { main as launchScript } from "./game.js";
import { hideNameSelect, hideWelcomeBack, prepareMainDiv, removeNameSelectDiv, requestName, showMainDiv, showWelcomeBack } from "./name-select.js";
import { ScriptParser } from "./scripting/parser.js";
import { GraphManager } from "./util/graphs.js";
import { Utils } from "./util/utils.js";
import { Vitals } from "./util/vitals.js";

(async () => {
    // console.log(ScriptParser.parseText("^l^c§a This is green, bolded and italic text!"))

    eval("alert(\"works\")")

    let name = await requestName();
    await Utils.asyncDelay(1000);
    await hideNameSelect();
    await showWelcomeBack(name);
    await Utils.asyncDelay(2500);
    await hideWelcomeBack();
    await Utils.asyncDelay(2500);
    await prepareMainDiv();
    await Utils.asyncDelay(500);
    await removeNameSelectDiv();


    Vitals.getInstance().updateSysInfo();
    GraphManager.instance().pushValues(Vitals.getInstance().rx, Vitals.getInstance().tx);
    GraphManager.instance().renderGraphs();
    setInterval(() => {
        Vitals.getInstance().updateSysInfo();
        GraphManager.instance().pushValues(Vitals.getInstance().rx, Vitals.getInstance().tx);
        GraphManager.instance().renderGraphs();
    }, 1000);



    await showMainDiv();

    launchScript();
})();