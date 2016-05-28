/*:
 * @plugindesc v1.02
 * @author DreamX
 *
 * @param Command Name
 * @desc The name of the command in the status window.
 * @default Passives
 *
 * @param Max Columns
 * @desc The maximum amount of columns to display.
 * @default 2
 *
 * @help
 * This plugin requires Yanfly Status Menu Core. Place this plugin under it.
 * Use <stateDescription:x> with x as the description as a notetag for a state.
 * Use <stateDescriptionHide:1> to prevent the state and it description from 
 * appearing.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_StateDescriptions = true;

var DreamX = DreamX || {};
DreamX.StateDescriptions = DreamX.StateDescriptions || {};

(function () {

    DreamX.Parameters = PluginManager.parameters('DreamX_StateDescriptions');
    DreamX.Param = DreamX.Param || {};

    DreamX.Param.stateDescriptionsCmdName = String(DreamX.Parameters['Command Name'] || "Passives");
    DreamX.Param.stateDescriptionsMaxCols = parseInt(DreamX.Parameters['Max Columns'] || 2);

    DreamX.StateDescriptions.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.StateDescriptions.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_StatusMenuCore)
            throw "DreamX State Descriptions requires Yanfly Status Menu Core.";
    };

    DreamX.StateDescriptions.Window_StatusCommand_addCustomCommands = Window_StatusCommand.prototype.addCustomCommands;
    Window_StatusCommand.prototype.addCustomCommands = function () {
        DreamX.StateDescriptions.Window_StatusCommand_addCustomCommands.call(this);
        if (this.findSymbol('passives') > -1)
            return;
        var text = DreamX.Param.stateDescriptionsCmdName;
        this.addCommand(text, 'passives', true);
    };


//=============================================================================
// Window_StatusInfo
//=============================================================================
    DreamX.StateDescriptions.Window_StatusInfo_drawInfoContents =
            Window_StatusInfo.prototype.drawInfoContents;
    Window_StatusInfo.prototype.drawInfoContents = function (symbol) {
        if (symbol === 'passives') {
            this.drawAllItems();
        } else {
            DreamX.StateDescriptions.Window_StatusInfo_drawInfoContents.call(this, symbol);
        }
    };

    DreamX.StateDescriptions.Window_StatusInfo_maxItems = Window_StatusInfo.prototype.maxItems;
    Window_StatusInfo.prototype.maxItems = function () {
        if (this._symbol === 'passives') {
            return this._actor.statusMenuDescriptionStates().length;
        }
        return DreamX.StateDescriptions.Window_StatusInfo_maxItems.call(this);
    };

    DreamX.StateDescriptions.Window_StatusInfo_drawItem = Window_StatusInfo.prototype.drawItem;
    Window_StatusInfo.prototype.drawItem = function (index) {
        DreamX.StateDescriptions.Window_StatusInfo_drawItem.call(this);
        if (this._symbol === 'passives') {
            var state = this._actor.statusMenuDescriptionStates()[index];

            var iconBoxWidth = Window_Base._iconWidth + 4;

            var text = state.name;
            var rect = this.itemRectForText(index);

            this.drawIcon(state.iconIndex, rect.x + 2, rect.y + 2);

            this.drawTextEx(text, rect.x + iconBoxWidth, rect.y);
        }
    };

    DreamX.StateDescriptions.Window_StatusInfo_select = Window_StatusInfo.prototype.select;
    Window_StatusInfo.prototype.select = function (index) {
        DreamX.StateDescriptions.Window_StatusInfo_select.call(this, index);
        if (index < 0 || this._symbol !== 'passives') {
            return;
        }
        var state = this._actor.statusMenuDescriptionStates()[index];
        if (state) {
            var meta = state.meta;
            var text = meta.stateDescription ? meta.stateDescription : "";
            SceneManager._scene._helpWindow.setText(text);
        }
    };

    DreamX.StateDescriptions.Window_StatusInfo_maxCols = Window_StatusInfo.prototype.maxCols;
    Window_StatusInfo.prototype.maxCols = function () {
        if (this._symbol === 'passives') {
            return DreamX.Param.stateDescriptionsMaxCols;
        }
        return DreamX.StateDescriptions.Window_StatusInfo_maxCols.call(this);
    };

//=============================================================================
// Scene_Status
//=============================================================================

    DreamX.StateDescriptions.Scene_Status_setCommandWindowHandlers =
            Scene_Status.prototype.setCommandWindowHandlers;
    Scene_Status.prototype.setCommandWindowHandlers = function () {
        DreamX.StateDescriptions.Scene_Status_setCommandWindowHandlers.call(this);
        // when you click on the passives command, it calls the commandPassives
        // function
        this._commandWindow.setHandler('passives', this.commandPassives.bind(this));
    };

    Scene_Status.prototype.commandPassives = function () {
        // active info window and select the first state
        this._infoWindow.activate();
        this._infoWindow.select(0);
    };

    DreamX.StateDescriptions.Scene_Status_onInfoCancel = Scene_Status.prototype.onInfoCancel;
    Scene_Status.prototype.onInfoCancel = function () {
        DreamX.StateDescriptions.Scene_Status_onInfoCancel.call(this);
        var actor = this.actor();
        this._helpWindow.setText(actor.profile());
    };

//=============================================================================
// Game_Actor
//=============================================================================
    Game_Actor.prototype.statusMenuDescriptionStates = function () {
        return this.states().filter(function (state) {
            return !state.meta.stateDescriptionHide;
        });
    };

})();
