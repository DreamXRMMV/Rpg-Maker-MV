/*:
 * @plugindesc v1.0 Don't allow player movement by input if a certain switch is 
 * on
 * @author DreamX
 * 
 * @param Switch
 * @desc The switch ID that, if on, disables player movement by input. Default: 0
 * @default 0
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
    var paramSwitch = parseInt(parameters['Switch'] || 0);

    DreamX.PlayerCannotMove.Game_Player_moveByInput = Game_Player.prototype.moveByInput;
    Game_Player.prototype.moveByInput = function () {
        if (paramSwitch >= 1 && $gameSwitches.value(paramSwitch)) {
            return;
        }
        DreamX.PlayerCannotMove.Game_Player_moveByInput.call(this);
    };

})();
