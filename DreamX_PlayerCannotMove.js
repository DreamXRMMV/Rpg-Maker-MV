/*:
 * @plugindesc v1.0 Don't allow player movement by input if a certain switch is 
 * on
 * @author DreamX
 * 
 * @param Move Switch
 * @desc Switch ID if on disables movement by input. Default: 0
 * @default 0
 * 
 * @param Move & Action Button Switch
 * @desc Switch ID if on disables movement by input and event action button activation. Default: 0
 * @default 0
 * 
 * @help
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
Imported.DreamX_PlayerCannotMove = true;

var DreamX = DreamX || {};
DreamX.PlayerCannotMove = DreamX.PlayerCannotMove || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_PlayerCannotMove');
    var paramSwitchMove = parseInt(parameters['Move Switch'] || 0);
    var paramSwitchMoveInteract = parseInt(parameters['Move & Action Button Switch'] || 0);

    DreamX.PlayerCannotMove.Game_Player_canMove = Game_Player.prototype.canMove;
    Game_Player.prototype.canMove = function () {
        if (paramSwitchMoveInteract >= 1 && $gameSwitches.value(paramSwitchMoveInteract) === true) {
            return false;
        }
        return DreamX.PlayerCannotMove.Game_Player_canMove.call(this);
    };

    DreamX.PlayerCannotMove.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function () {
        if (paramSwitchMove >= 1 && $gameSwitches.value(paramSwitchMove)) {
            return;
        }
        DreamX.PlayerCannotMove.Game_Player_moveByInput.call(this);
    };

})();
