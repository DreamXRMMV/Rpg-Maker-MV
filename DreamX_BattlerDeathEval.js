/*:
 * @plugindesc v1.0
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Use this notetag set in the notebox of an actor or enemy:
 * <BEFORE DEATH EVAL>
 * code
 * code
 * </BEFORE DEATH EVAL>
 * 
 * Replacing code with javascript. 
 * Variables:
 * target - battler about to die
 * this - the action that killed the battler
 * 
 * Example:
 * <BEFORE DEATH EVAL>
 * // make sure battler can pay skill cost 
 * // before forcing
 * 
 * // skill used just before death
 * var skillId = 3;
 * // default is -1 for random
 * var targetIndex = -1;
 * 
 * target.forceAction(skillId, targetIndex);
 * BattleManager.forceAction(target);
 * $gameTroop._interpreter.setWaitMode('action');
 * </BEFORE DEATH EVAL>
 * 
 * In this example, we force the battler about to die to use skill 3 with a 
 * -1 target index, which means it target randomly within its scope.
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
Imported.DreamX_REPLACEME = true;

var DreamX = DreamX || {};
DreamX.BattlerDeathEval = DreamX.BattlerDeathEval || {};

DreamX.Parameters = PluginManager.parameters('DreamX_EnemyDeathReaction');
DreamX.Param = DreamX.Param || {};

//DreamX.Param.DXCESDefaultPrice = parseInt(DreamX.Parameters['Default Cost']);

DreamX.BattlerDeathEval.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!DreamX.BattlerDeathEval.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!DreamX.BattlerDeathEvalLoaded) {
        this.processDXEDRNotetags($dataEnemies);
        this.processDXEDRNotetags($dataActors);
        DreamX.BattlerDeathEvalLoaded = true;
    }
    return true;
};

// just go through the array
DataManager.processDXEDRNotetags = function (dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
        var element = dataArray[i];
        if (!element)
            continue;
        this.processDXEDRNotetagsElement(element);
    }
};

DataManager.processDXEDRNotetagsElement = function (element) {
    var evalMode = 'none';
    var notedata = element.note.split(/[\r\n]+/);
    element.beforeDeathEval = "";

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:BEFORE DEATH EVAL)>/i)) {
            evalMode = 'before death eval';
        } else if (line.match(/<\/(?:BEFORE DEATH EVAL)>/i)) {
            evalMode = 'none';
        } else if (evalMode === 'before death eval') {
            element.beforeDeathEval += line + '\n';
        }
    }
};

DreamX.BattlerDeathEval.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
Game_Action.prototype.executeHpDamage = function (target, value) {
    if (target.hp < value) {
        var dataBattler = target.isActor() ? target.actor() : target.enemy();
        if (dataBattler.beforeDeathEval) {
            eval(dataBattler.beforeDeathEval);
        }
    }
    DreamX.BattlerDeathEval.Game_Action_executeHpDamage.call(this, target, value);

};

