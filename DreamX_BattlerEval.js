/*:
 * @plugindesc v1.0
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Use this notetag set in the notebox of an actor or enemy:
 * <SET HP EVAL>
 * code
 * code
 * </SET HP EVAL>
 * 
 * Replacing code with javascript. 
 * Variables:
 * user - battler whose hp is being set
 * this - same as user
 * 
 * Example:
<SET HP EVAL>
var skillId;

if (hp <= this.mhp/2) {
    // set 50% health skill 
    skillId = 3;
}

if (hp <= 0) {
    // set skill before death
    skillId = 15;
}

// default is -1 for random
var targetIndex = -1;

BattleManager.queueForceAction(this, skillId, targetIndex);
</SET HP EVAL>
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
    element.setHPEval = "";

    for (var i = 0; i < notedata.length; i++) {
        var line = notedata[i];
        if (line.match(/<(?:SET HP EVAL)>/i)) {
            evalMode = 'before death eval';
        } else if (line.match(/<\/(?:SET HP EVAL)>/i)) {
            evalMode = 'none';
        } else if (evalMode === 'before death eval') {
            element.setHPEval += line + '\n';
        }
    }
};

DreamX.BattlerDeathEval.Game_BattlerBase_setHp = Game_BattlerBase.prototype.setHp;
Game_BattlerBase.prototype.setHp = function (hp) {
    var user = this;
    var dataBattler = this.isActor() ? this.actor() : this.enemy();
    if ($gameParty.inBattle() && dataBattler.setHPEval) {
        eval(dataBattler.setHPEval);
    }
    DreamX.BattlerDeathEval.Game_BattlerBase_setHp.call(this, hp);
};

//DreamX.BattlerDeathEval.Game_Action_executeHpDamage = Game_Action.prototype.executeHpDamage;
//Game_Action.prototype.executeHpDamage = function (target, value) {
//    if (target.hp < value) {
//        var dataBattler = target.isActor() ? target.actor() : target.enemy();
//        if (dataBattler.beforeDeathEval) {
//            eval(dataBattler.beforeDeathEval);
//        }
//    }
//    DreamX.BattlerDeathEval.Game_Action_executeHpDamage.call(this, target, value);
//
//};

// make sure battler can pay skill cost 
// before forcing

