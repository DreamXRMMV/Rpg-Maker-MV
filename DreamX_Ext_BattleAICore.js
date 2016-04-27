/*:
 * @plugindesc v1.00 Allows for target conditions in eval code for Yanfly's AI Core.
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Use AIManager.targetCondition("x") when using an eval condition.
 * Examples: 
 * AIManager.targetCondition("target.name() === \"Harold\"")
 * AIManager.targetCondition("target.actorId() === 2")
 * 
 * If you're using quotes in your condition, you need to escape them with \ 
 * like I did for Harold (\"Harold\")
 * 
 * Example of a whole ai pattern:
 * <AI Priority>
 * Eval user.name() === 'Bat' && AIManager.targetCondition("target.name() === \"Harold\""): Skill 25, Highest HP%
 * </AI Priority>
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Please remember credit Yanfly as this is an extension of their Ai Core plugin.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for the plugin this is an extension of.
 */

var Imported = Imported || {};
Imported.DreamX_Ext_BattleAICore = true;

var DreamX = DreamX || {};
DreamX.Ext_BattleAICore = DreamX.Ext_BattleAICore || {};

(function () {

    AIManager.conditionEval = function (condition) {
        var action = this.action();
        var item = action.item();
        var user = this.battler();
        var s = $gameSwitches._data;
        var v = $gameVariables._data;
        var group = this.getActionGroup();
        this.setProperTarget(group);
        if (!eval(condition)) {
            return false;
        }

        return true;
    };

    AIManager.targetCondition = function (condition) {
        var group = this.getActionGroup();
        var validTargets = [];
        for (var i = 0; i < group.length; ++i) {
            var target = group[i];
            if (!target)
                continue;
            if (eval(condition)) {
                validTargets.push(target);
            }
        }
        if (validTargets.length <= 0) {
            return false;
        }
        this.setProperTarget(validTargets);
        return true;
    };


})();
