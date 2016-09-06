/*:
 * @plugindesc
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Requires YEP Battle Engine Core
 * Use this notetag to define the code that is evaluated when the actor is 
 * clicked:
 * 
 * <CLICK EVAL>
 * code
 * </CLICK EVAL>
 * Replacing code with javascript code.
 * 
 * Example:
 * <CLICK EVAL>
 * console.log("my name is " + actor.name());
 * </CLICK EVAL>
 * 
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_ClickBattlerFunction = true;

var DreamX = DreamX || {};
DreamX.ClickBattlerFunction = DreamX.ClickBattlerFunction || {};

DreamX.Parameters = PluginManager.parameters('DreamX_REPLACEME');
DreamX.Param = DreamX.Param || {};

//DreamX.Param.DXCESDefaultPrice = parseInt(DreamX.Parameters['Default Cost']);

DreamX.ClickBattlerFunction.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!DreamX.ClickBattlerFunction.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!DreamX.ClickBattlerFunctionLoaded) {
        this.processDXCBFNotetags($dataActors);
        DreamX.ClickBattlerFunctionLoaded = true;
    }
    return true;
};

// just go through the array
DataManager.processDXCBFNotetags = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
        var element = dataArray[i];
        if (!element)
            continue;
        this.processDXCBFNotetag(element);
    }
};

DataManager.processDXCBFNotetag = function (element) {
    var evalMode = 'none';
    var notedata = element.note.split(/[\r\n]+/);
    element.ClickEval = "";

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:CLICK EVAL)>/i)) {
            evalMode = 'click eval';
        } else if (line.match(/<\/(?:CLICK EVAL)>/i)) {
            evalMode = 'none';
        } else if (evalMode === 'click eval') {
            element.ClickEval += line + '\n';
        }
    }
    //console.log(element.ClickEval);
};

DreamX.ClickBattlerFunction.Window_BattleActor_processTouch = Window_BattleActor.prototype.processTouch;
Window_BattleActor.prototype.processTouch = function () {
    DreamX.ClickBattlerFunction.Window_BattleActor_processTouch.call(this);
    if (TouchInput.isTriggered()) {
        for (var i = 0; i < $gameParty.battleMembers().length; ++i) {
            var actor = $gameParty.battleMembers().reverse()[i];
            if (!actor)
                continue;
            var dataActor = actor.actor();
            if (!dataActor.ClickEval) {
                continue;
            }
            if (this.isClickedActor(actor)) {
                eval(dataActor.ClickEval);
            }
        }
    }
}