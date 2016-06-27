/*:
 * @plugindesc v1.0 Disable new game if all save files are in use.
 * @author DreamX
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
Imported.DreamX_DisableNewGameMaxSaves = true;

var DreamX = DreamX || {};
DreamX.DisableNewGameMaxSaves = DreamX.DisableNewGameMaxSaves || {};

(function () {

    DreamX.DisableNewGameMaxSaves.Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function (name, symbol, enabled, ext) {
        if (symbol === 'newGame') {
            enabled = Window_TitleCommand.prototype.isNewGameEnabled();
        }
        DreamX.DisableNewGameMaxSaves.Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    Window_TitleCommand.prototype.isNewGameEnabled = function () {
        var globalInfo = DataManager.loadGlobalInfo();

        if (!globalInfo) {
            return true;
        }

        var savesUsed = globalInfo.filter(function (save) {
            return save !== null && save !== undefined;
        }).length;
        
        if (savesUsed >= DataManager.maxSavefiles()) {
            return false;
        }
    };

})();
