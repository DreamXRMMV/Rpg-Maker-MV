/*:
 * @plugindesc 0.1 Display help text for choices.
 * @author DreamX
 * 
 * @param Hide On Empty
 * @desc When one or more but not all choices have help text, hide window for ones that don't. Default: false
 * @default false
 * 
 * @param Number Of Rows
 * @desc Number of rows in help window. Larger values increase the height. Default: 2
 * @default 2
 * 
 * @help
 * ===========================================================================
 * How To Use
 * ===========================================================================
 Insert a comment right after the "when" part in a show choices event command.
 This will set the choice's help text. When a choice does not have a comment 
 to set its help text, it will default to an empty string.
 * ===========================================================================
 * Terms Of Use
 * ===========================================================================
 Free to use and modify for commercial and noncommercial games, with credit.
 * ===========================================================================
 * Compatibility
 * ===========================================================================
 Set under Yanfly plugins.
 * ===========================================================================
 * Credits
 * ===========================================================================
 DreamX
 */
var Imported = Imported || {};
Imported.DreamX_ChoiceHelp = true;

var DreamX = DreamX || {};
DreamX.ChoiceHelp = DreamX.ChoiceHelp || {};

(function () {
//=============================================================================
// Parameters
//=============================================================================
    DreamX.Parameters = PluginManager.parameters('DreamX_ChoiceHelp');

    var paramNumRows = eval(DreamX.Parameters['Number Of Rows']
            || false);
    var paramCloseHelpOnEmpty = eval(DreamX.Parameters['Hide On Empty']
            || 2);


    DreamX.ChoiceHelp.Window_Message_createSubWindows = Window_Message.prototype.createSubWindows;
    Window_Message.prototype.createSubWindows = function () {
        DreamX.ChoiceHelp.Window_Message_createSubWindows.call(this);
        this._helpWindow = new Window_Help(paramNumRows);
        this._helpWindow.visible = false;
        this._choiceWindow.setHelpWindow(this._helpWindow);
    };

    DreamX.ChoiceHelp.Window_Message_terminateMessage = Window_Message.prototype.terminateMessage;
    Window_Message.prototype.terminateMessage = function () {
        DreamX.ChoiceHelp.Window_Message_terminateMessage.call(this);
        this._helpWindow.visible = false;
        this._helpWindow.close();
    };

    Window_Message.prototype.helpWindow = function () {
        return this._helpWindow;
    };

    DreamX.ChoiceHelp.Scene_Map_createMessageWindow = Scene_Map.prototype.createMessageWindow;
    Scene_Map.prototype.createMessageWindow = function () {
        DreamX.ChoiceHelp.Scene_Map_createMessageWindow.call(this);
        this.addWindow(this._messageWindow.helpWindow());
    };

    Window_ChoiceList.prototype.updateHelp = function () {
        var help = $gameMessage._choiceHelps[this.index()];
        this._helpWindow.setText(help);
        if (help.length >= 1) {
            this._helpWindow.visible = true;
        } else if (paramCloseHelpOnEmpty === true) {
            this._helpWindow.visible = false;
        }
    };

    DreamX.ChoiceHelp.Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function (params) {
        DreamX.ChoiceHelp.Game_Interpreter_setupChoices.call(this, params);

        var choicesDetected = 0;
        var choiceHelps = [];
        for (var i = 0; choicesDetected !== params[0].length; i++) {
            var command = this._list[this._index + i];
            if (command && command.code === 402) {
                choicesDetected++;
                var nextCommand = this._list[this._index + i + 1];
                if (nextCommand && nextCommand.code === 108) {
                    choiceHelps.push(nextCommand.parameters[0]);
                } else {
                    choiceHelps.push("");
                }
            }
        }

        $gameMessage.setChoiceHelps(choiceHelps);
    };

    Game_Message.prototype.setChoiceHelps = function (choiceHelps) {
        this._choiceHelps = choiceHelps;
    };

})();
