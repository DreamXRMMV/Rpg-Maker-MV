/*:
 * @plugindesc 0.3 Display help text for choices.
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
 Insert comments right after the "when" part in a show choices event command.
 
 Insert a comment beginning with ChoiceHelp to set the help text for the 
 choice.
 Example: ChoiceHelp Choosing this choice will make you lose 200 gold.
 
 Insert a comment beginning with ChoiceMessage to set the message text for 
 the choice. You must have an active message window at the time of the choice
 to use this. An empty message window will suffice.
 Example: ChoiceMessage I'll never succumb to darkness! 
 
 Insert a comment beginning with ChoiceFace to set the face for the choice. 
 It should be in this format: FaceFileName FaceIndex
 Example: ChoiceFace Actor1 2
 OR you can just specify the index, and it'll just use the face file name 
 from the active message window.
 You must have an active message window with a face at the time of the choice 
 to use this. An empty message window will suffice, as long as it has a face.
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
        this._choiceWindow.hasChoiceMessage = false;
        this.initMembers();
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
        if (help) {
            this._helpWindow.setText(help);
            this._helpWindow.visible = true;
        } else {
            this._helpWindow.setText("");
            if (paramCloseHelpOnEmpty === true) {
                this._helpWindow.visible = false;
            }
        }

        var message = $gameMessage._choiceMessages[this.index()];
        var face = $gameMessage._choiceFaces[this.index()];
        var faceName = $gameMessage._originalFaceName;
        var faceIndex = $gameMessage._originalFaceIndex;
        var messageWindow = SceneManager._scene._messageWindow;

        if (message && message.length >= 1) {
            this.hasChoiceMessage = true;
        }

        if (this.hasChoiceMessage === true) {
            messageWindow.contents.clear();

            if ((face) && (face.index || face.name)) {
                if (face.index) {
                    faceIndex = face.index;
                }
                if (face.name) {

                    faceName = face.name;
                }
            }

            if (faceIndex !== $gameMessage.faceIndex() || faceName !== $gameMessage.faceName()) {
                $gameMessage.setFaceImage(faceName, faceIndex);
            }

            messageWindow.drawMessageFace();

            if (message) {
                messageWindow._textState = {};
                messageWindow._textState.index = 0;
                messageWindow._textState.text = messageWindow.convertEscapeCharacters(message);

                messageWindow._textState.x = messageWindow.newLineX();
                messageWindow._textState.y = 0;
                messageWindow._textState.left = messageWindow.newLineX();
                messageWindow._textState.height = messageWindow.calcTextHeight(messageWindow._textState, false);

                while (!messageWindow.isEndOfText(messageWindow._textState)) {
                    if (messageWindow.needsNewPage(messageWindow._textState)) {
                        messageWindow.newPage(messageWindow._textState);
                    }
                    messageWindow.updateShowFast();
                    messageWindow.processCharacter(messageWindow._textState);
                }
            }
        }
    };

    DreamX.ChoiceHelp.Game_Interpreter_setupChoices = Game_Interpreter.prototype.setupChoices;
    Game_Interpreter.prototype.setupChoices = function (params) {
        DreamX.ChoiceHelp.Game_Interpreter_setupChoices.call(this, params);

        var choicesDetected = 0;

        var choiceHelps = [];
        var choiceMessages = [];
        var choiceFaces = [];
        var name;
        var index;
        var helpRegExp = new RegExp("^ChoiceHelp ");
        var msgRegExp = new RegExp("^ChoiceMessage ");
        var faceRegExp = new RegExp("^ChoiceFace ");

        for (var i = 0; i < params[0].length; i++) {
            choiceHelps.push("");
            choiceMessages.push("");
            choiceFaces.push("");
        }

        for (var i = 0; choicesDetected !== params[0].length; i++) {
            var command = this._list[this._index + i];
            if (command && command.code === 402) {
                choicesDetected++;

                var nextCommand = this._list[this._index + i + 1];

                for (var j = 0; nextCommand && nextCommand.code !== 402; j++) {
                    var nextCommand = this._list[this._index + i + 1 + j];

                    if (nextCommand && nextCommand.code === 108) {

                        var param = nextCommand.parameters[0];

                        if (helpRegExp.test(param)) {
                            var splitParam = param.split(helpRegExp);
                            choiceHelps[choicesDetected - 1] = splitParam[1];
                        }

                        if (msgRegExp.test(param)) {
                            var splitParam = param.split(msgRegExp);
                            choiceMessages[choicesDetected - 1] = splitParam[1];
                        }
                        if (faceRegExp.test(param)) {
                            var splitParam = param.split(faceRegExp)[1].split(" ");
                            if (splitParam.length === 2) {
                                name = splitParam[0];
                                ImageManager.loadFace(name);
                                index = splitParam[1];
                            } else if (splitParam.length === 1) {
                                index = splitParam[0];
                            }
                            choiceFaces[choicesDetected - 1] = {name: name, index: index};
                        }
                    }
                }
                name = undefined;
                index = undefined;
            }
        }

        $gameMessage.setChoiceHelps(choiceHelps);
        $gameMessage.setChoiceMessages(choiceMessages);
        $gameMessage.setChoiceFaces(choiceFaces);
    };

    Game_Message.prototype.setChoiceHelps = function (choiceHelps) {
        this._choiceHelps = choiceHelps;
    };

    Game_Message.prototype.setChoiceMessages = function (choiceMessages) {
        this._choiceMessages = choiceMessages;
    };

    Game_Message.prototype.setChoiceFaces = function (choiceFaces) {
        this._choiceFaces = choiceFaces;
    };

    DreamX.ChoiceHelp.Game_Message_setFaceImage = Game_Message.prototype.setFaceImage;
    Game_Message.prototype.setFaceImage = function (faceName, faceIndex) {
        if (!this._faceName) {
            this._originalFaceName = faceName;
            this._originalFaceIndex = faceIndex;
        }
        DreamX.ChoiceHelp.Game_Message_setFaceImage.call(this, faceName, faceIndex);
    };

})();
