/*:
 * @plugindesc v1.1 Adds permadeath.
 * @author DreamX
 * 
 * @param Permadeath Switch
 * @desc Id of switch that activates permadeath when on.
 * @default 
 * 
 * @param Disable Leader Permadeath
 * @desc Default: false
 * @default false
 * 
 * @help
 * ============================================================================
 * Actor Notetags
 * ============================================================================
 * Use <NoPermadeath> to prevent an actor from being removed at the end of 
 * battle after dying.
 * 
 * Use <NoPermadeathSwitch: x> with x as the switch id to specify a switch 
 * that when on, disables permadeath for the actor.
 * 
 * Use <NoPermadeathVariable: x> with x as the variable id to specify a 
 * variable that when greater than 0, disables permadeath for the actor. 
 * This variable decrements each time the battler dies unless permadeath is 
 * disabled for them otherwise.
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
Imported.DreamX_Permadeath = true;

var DreamX = DreamX || {};
DreamX.Permadeath = DreamX.Permadeath || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Permadeath');
    var paramPermadeathSwitchId = parseInt(parameters['Permadeath Switch']);
    var paramDisableLeaderPermadeath = eval(parameters['Disable Leader Permadeath']);

    BattleManager.checkPermadeath = function () {
        if (this._canLose || !paramPermadeathSwitchId
                || paramPermadeathSwitchId <= 0) {
            return;
        }
        if (!$gameSwitches.value(paramPermadeathSwitchId)) {
            return;
        }

        var leader = $gameParty.leader();
        for (var i = 0; i < $gameParty.battleMembers().length; i++) {
            var battler = $gameParty.battleMembers()[i];

            // ignore non-dead battlers
            if (!battler.isDead()) {
                continue;
            }

            var dataBattler = battler.actor();
            var noPermadeathSwitch = dataBattler.meta.NoPermadeathSwitch;
            var noPermadeathVariable = dataBattler.meta.NoPermadeathVariable;

            if (dataBattler.meta.NoPermadeath) {
                continue;
            }
            if (paramDisableLeaderPermadeath && battler === leader) {
                continue;
            }

            if (noPermadeathSwitch
                    && $gameSwitches.value(parseInt(noPermadeathSwitch))) {
                continue;
            }

            if (noPermadeathVariable) {
                var variableId = parseInt(noPermadeathVariable);
                var currentValue = $gameVariables.value(variableId);
                var newValue = currentValue - 1;
                $gameVariables.setValue(variableId, newValue);
                if (newValue >= 0) {
                    continue;
                }
            }

            var id = battler.actorId();
            $gameParty.removeActor(id);
        }
    };

    DreamX.Permadeath.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        DreamX.Permadeath.BattleManager_updateBattleEnd.call(this);
        this.checkPermadeath();
    };

})();
