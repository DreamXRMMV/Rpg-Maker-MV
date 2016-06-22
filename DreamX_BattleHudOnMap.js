/*:
 * @plugindesc v.03
 * @author DreamX
 * 
 * @param Show Variable
 * @desc If on, show the battle status window. If off, don't.
 * @default 
 * 
 * @param Refresh Rate
 * @desc Number of frames before refreshing. Default: 60
 * @default 60
 * 
 * @param X
 * @desc Default: Graphics.boxWidth - Window_BattleStatus.prototype.windowWidth()
 * @default Graphics.boxWidth - Window_BattleStatus.prototype.windowWidth()
 * 
 * @param Y
 * @desc Default: Graphics.boxHeight - Window_BattleStatus.prototype.windowHeight()
 * @default Graphics.boxHeight - Window_BattleStatus.prototype.windowHeight()
 * 
 * @param Window Skin Opacity
 * @desc Opacity of window skin. Default: 255
 * @default 255
 * 
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
Imported.DreamX_BattleHudOnMap = true;

var DreamX = DreamX || {};
DreamX.BattleHudOnMap = DreamX.BattleHudOnMap || {};

DreamX.Parameters = PluginManager.parameters('DreamX_BattleHudOnMap');
DreamX.Param = DreamX.Param || {};

DreamX.Param.RefreshRate = parseInt(DreamX.Parameters['Refresh Rate']
        || 60);
DreamX.Param.ShowSwitch = parseInt(DreamX.Parameters['Show Variable']);

DreamX.Param.X = String(DreamX.Parameters['X']
        || 'Graphics.boxWidth - Window_BattleStatus.prototype.windowWidth()');
DreamX.Param.Y = String(DreamX.Parameters['Y']
        || 'Graphics.boxHeight - Window_BattleStatus.prototype.windowHeight()');

DreamX.Param.WindowSkinOpacity = parseInt(DreamX.Parameters['Window Skin Opacity'] || 255);
//DreamX.Param.WindowContentsOpacity = parseInt(DreamX.Parameters['Window Contents Opacity'] || 255);

(function () {

    DreamX.BattleHudOnMap.Scene_Map_createAllWindows = Scene_Map.prototype.createAllWindows;
    Scene_Map.prototype.createAllWindows = function () {
        DreamX.BattleHudOnMap.Scene_Map_createAllWindows.call(this);
        this.createBattleStatusWindow();
    };

    Scene_Map.prototype.createBattleStatusWindow = function () {
        this._battleStatusWindow = new Window_BattleStatus();
        this._battleStatusWindow.x = eval(DreamX.Param.X);
        this._battleStatusWindow.y = eval(DreamX.Param.Y);
        this._battleStatusWindow.opacity = DreamX.Param.WindowSkinOpacity;
        //this._battleStatusWindow.contents.opacity = DreamX.Param.WindowContentsOpacity;

        this.addChild(this._battleStatusWindow);
    };

    DreamX.BattleHudOnMap.Scene_Map_update = Scene_Map.prototype.update;
    Scene_Map.prototype.update = function () {
        DreamX.BattleHudOnMap.Scene_Map_update.call(this);
        var window = this._battleStatusWindow;

        if (!DreamX.Param.ShowSwitch) {
            return;
        }

        if ($gameSwitches.value(DreamX.Param.ShowSwitch)
                && !$gameMessage.isBusy() && !window.isOpening()
                && !window.isOpen()) {
            window.open();
        }
        if ((!$gameSwitches.value(DreamX.Param.ShowSwitch)
                || $gameMessage.isBusy()) && !window.isClosed()
                && !window.isClosing()) {
            window.close();
        }

        if (Graphics.frameCount % DreamX.Param.RefreshRate !== 0) {
            return;
        }
        window.refresh();
    };

    DreamX.BattleHudOnMap.SceneManager_goto = SceneManager.goto;
    SceneManager.goto = function (sceneClass) {
        var scene = this._scene;
        if (scene instanceof Scene_Map && sceneClass !== Scene_Map) {
            scene._battleStatusWindow.hide();
        }
        DreamX.BattleHudOnMap.SceneManager_goto.call(this, sceneClass);
    }

    if (Imported.YEP_BattleStatusWindow) {
        DreamX.BattleHudOnMap.Window_Base_drawActorActionIcon = Window_Base.prototype.drawActorActionIcon;
        Window_Base.prototype.drawActorActionIcon = function (actor, wx, wy) {
            var scene = SceneManager._scene;
            if (scene instanceof Scene_Map) {
                return;
            }
            DreamX.BattleHudOnMap.Window_Base_drawActorActionIcon.call(this, actor, wx, wy);
        };
    }

})();
