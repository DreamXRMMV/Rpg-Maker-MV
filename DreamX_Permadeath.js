/*:
 * @plugindesc v1.0 Adds permadeath.
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

    DreamX.Permadeath.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        DreamX.Permadeath.BattleManager_updateBattleEnd.call(this);
        if (!paramPermadeathSwitchId || paramPermadeathSwitchId <= 0) {
            return;
        }
        if (!$gameSwitches.value(paramPermadeathSwitchId)) {
            return;
        }
        
        var leader = $gameParty.leader();
        for (var i = 0; i < $gameParty.battleMembers().length; i++) {
            var battler = $gameParty.battleMembers()[i];
            var dataBattler = battler.actor();
            var noPermadeathSwitch = dataBattler.meta.NoPermadeathSwitch;
            
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
            
            var id = battler.actorId();
            if (battler.isDead()) {
                $gameParty.removeActor(id);
            }
        }
    };

})();
