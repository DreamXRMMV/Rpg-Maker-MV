/*:
 * @plugindesc
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
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
Imported.DreamX_REPLACEME = true;

var DreamX = DreamX || {};
DreamX.REPLACEME = DreamX.REPLACEME || {};

(function () {

    alias_Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        alias_Scene_Map_createAllWindows.call(this);
        this.createNotificationWindow();
    };

    Scene_Map.prototype.createNotificationWindow = function () {
        this._battleStatusWindow = new Window_BattleStatus();
        this.addChild(this._battleStatusWindow);
        this._battleStatusWindow.open();
    };

    Window_Message.prototype.battleStatusWindow = function () {
        var scene = SceneManager._scene;

        // don't do anything if scene isn't map
        if (!(scene instanceof Scene_Map)) {
            return;
        }

        var window = scene._battleStatusWindow;

        return window;
    };

    alias_Window_Message_startMessage = Window_Message.prototype.startMessage;
    Window_Message.prototype.startMessage = function () {
        alias_Window_Message_startMessage.call(this);

        var window = this.battleStatusWindow();

        if (window) {
            window.close();
        }
    };

    alias_Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        alias_Window_Message_terminateMessage.call(this);
        var window = this.battleStatusWindow();

        if (window) {
            window.open();
        }
    };

})();
