/*:
 * @plugindesc v1.0 Can place a limit on the random battles on a map.
 * <DreamX Limited Random Battles>
 * @author DreamX
 *
 * @param Enable Pause Switch
 * @desc When the pause switch is on, random battles won't be limited. Default: False 
 * @default false
 *
 * @param Pause Switch
 * @desc This switch will pause limits on random battles when on. The parameter "Enable Pause Switch" 
 * must be set to true.
 * @default 
 *
 * @help
 * Put this notetag in your map <random_battle_variable:x> with x being the 
 * variable id you want to use for the remaining amount of random battles on 
 * the map. The value will be decremented each time you encounter a random 
 * battle and when the value reaches 0, random battles no longer occur nor are 
 * steps recorded towards the next encounter. See the paramters if you wish to 
 * pause this function. Since this is a variable you are free to manipulate the 
 * value as you wish. 
 * Maps without the notetag will function normally.
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
Imported.DreamX_LimitedRandomBattles = true;
var DreamX = DreamX || {};
DreamX.LimitedRandomBattles = DreamX.LimitedRandomBattles || {};

(function () {

    var parameters = $plugins.filter(function (p) {
        return p.description.contains('<DreamX Limited Random Battles>');
    })[0].parameters; //Thanks to Iavra

    var parameterEnablePauseSwitch = String(parameters['Enable Pause Switch'] || 'false');
    var parameterPauseSwitch = parseInt(parameters['Pause Switch'] || '-1');

    DreamX.LimitedRandomBattles.GetRandomBattleLimitVariable = function () {
        var variable = $dataMap.meta.random_battle_variable || -1;
        return variable;
    }

    DreamX.LimitedRandomBattles.GetRandomBattlesRemaining = function () {
        var variable = DreamX.LimitedRandomBattles.GetRandomBattleLimitVariable();
        if (variable < 1)
            return '';
        return $gameVariables.value(variable);
    };

    DreamX.LimitedRandomBattles.MapHasCorrectRandomBattleVariable = function () {
        if (DreamX.LimitedRandomBattles.GetRandomBattleLimitVariable() >= 1) {
            return true;
        }
        return false;
    };

    DreamX.LimitedRandomBattles.IsRandomBattleLimitPaused = function () {
        if (parameterPauseSwitch >= 1 && eval(parameterEnablePauseSwitch) && $gameSwitches.value(parameterPauseSwitch)) {
            return true;
        }
    };

    DreamX.LimitedRandomBattles.MayDecrementLimitBattleVariable = function () {
        // if pause
        if (DreamX.LimitedRandomBattles.IsRandomBattleLimitPaused())
            return false;
        // if map does not have correct random battle variable return false
        if (!DreamX.LimitedRandomBattles.MapHasCorrectRandomBattleVariable())
            return false;
        // if there are 1 or more battles remaining return true
        if (DreamX.LimitedRandomBattles.GetRandomBattlesRemaining() >= 1)
            return true;
        return false;
    };

    DreamX.LimitedRandomBattles.Game_Player_canEncounter = Game_Player.prototype.canEncounter;
    Game_Player.prototype.canEncounter = function () {
        // if pause
        if (DreamX.LimitedRandomBattles.IsRandomBattleLimitPaused()) {
            return DreamX.LimitedRandomBattles.Game_Player_canEncounter.call(this);
        }

        // if map doesn't have proper limit variable
        if (!DreamX.LimitedRandomBattles.MapHasCorrectRandomBattleVariable()) {
            return DreamX.LimitedRandomBattles.Game_Player_canEncounter.call(this);
        }

        // if can decrement variable
        if (DreamX.LimitedRandomBattles.MayDecrementLimitBattleVariable()) {
            return DreamX.LimitedRandomBattles.Game_Player_canEncounter.call(this);
        }
        return false;
    };

    DreamX.LimitedRandomBattles.BattleManager_onEncounter = BattleManager.onEncounter;
    BattleManager.onEncounter = function () {
        DreamX.LimitedRandomBattles.BattleManager_onEncounter.call(this);
        if (DreamX.LimitedRandomBattles.MayDecrementLimitBattleVariable()) {
            variable = DreamX.LimitedRandomBattles.GetRandomBattleLimitVariable();
            $gameVariables.setValue(variable, $gameVariables.value(variable) - 1);
        }
    };

})();
