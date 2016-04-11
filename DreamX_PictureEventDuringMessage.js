/*:
 * @plugindesc v1.1 You can now click on picture events during a message.
 * @author DreamX
 * @help
 * Requires Yanfly Picture Common Events.
 * Make sure the parameter "Hide Message" in Yanfly Picture Common Events is 
 * false.
 * You can now click on picture events during a message.
 * When you click on a picture event during a message, the game will save the 
 * last event it was on, and which part it was on. 
 * 
 * You can put a comment in the common event with "DisableLastEventReplace" 
 * (without quotes and by itself) to prevent the common event from replacing 
 * last event save with itself if you click the same button again. 
 * This is useful to prevent the button from erasing what the real last event 
 * was. 
 * 
 * In the common event the picture is associated with, you can call the 
 * following plugin commands to return to the last event:
 * 
 * JumpToLastEventLabel x - x is the label of the last event you would like to 
 * return to.
 * 
 * JumpToLastEventIndex - This plugin command returns you to the same part of 
 * the event before the picture comment event was activated.
 * 
 * This plugin only affects clicks on a picture event when the message window 
 * is active.
 * 
 * If the common event calling that does not change the currently displaying 
 * message, you can put a comment in the common event with 
 * "DisableMessageProgress"  (without quotes and by itself) to prevent the 
 * message from reinitializing  when you return to the previous event. This may 
 * also be useful when opening the menu from a common event.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly for the script this is an extension of (Yanfly Picture Common 
 * Events)
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 * Yanfly
 */

var Imported = Imported || {};
Imported.DreamX_PictureEventDuringMessage = true;

var DreamX = DreamX || {};
DreamX.PictureEventDuringMessage = DreamX.PictureEventDuringMessage || {};

(function () {
    DreamX.PictureEventDuringMessage.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.PictureEventDuringMessage.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_PictureCommonEvents || Yanfly.Param.PCEHideMsg === true) {
            throw new Error("DreamX_PictureEventDuringMessage requires Yanfly Picture Common Events, with parameter Hide Message false");
        }
    };

    DreamX.PictureEventDuringMessage.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.PictureEventDuringMessage.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'JumpToLastEventLabel':
                if (args[0]) {
                    DreamX.PictureEventDuringMessage.JumpToLastEventLabel(args[0]);
                }
                break;
            case 'JumpToLastEventIndex':
                DreamX.PictureEventDuringMessage.JumpToLastEventIndex();
                break;
        }
    };

    DreamX.PictureEventDuringMessage.JumpToLastEventLabel = function (labelName) {
        var lastList = $gameMap._interpreter._DXLastList;
        if (!lastList)
            return;
        if (!SceneManager._scene._messageWindow)
            return;

        for (var i = 0; i < lastList.length; i++) {
            var command = lastList[i];
            if (command.code === 118 && command.parameters[0] === labelName) {
                $gameMap._interpreter._list = lastList;
                $gameMap._interpreter.jumpTo(i);
                $gameMap._interpreter._DXLastList = undefined;
                $gameMap._interpreter._DXLastListIndex = undefined;
            }
        }
    };

    DreamX.PictureEventDuringMessage.JumpToLastEventIndex = function () {
        var lastList = $gameMap._interpreter._DXLastList;
        var lastIndex = $gameMap._interpreter._DXLastListIndex;
        
        if (!lastList || lastIndex === undefined)
            return;

        if (!SceneManager._scene._messageWindow)
            return;

        $gameMap._interpreter._list = lastList;
        $gameMap._interpreter.jumpTo(lastIndex);

        $gameMap._interpreter._DXLastList = undefined;
        $gameMap._interpreter._DXLastListIndex = undefined;
    };

    DreamX.PictureEventDuringMessage.Window_Message_isTriggered = Window_Message.prototype.isTriggered;
    Window_Message.prototype.isTriggered = function () {
        if (SceneManager._scene instanceof Scene_Map) {
            SceneManager._scene.updatePictureEvents();        
        }

        if ($gameTemp._disableMessageProgress) {
            $gameTemp._disableMessageProgress = false;
            return false;
        }
        return DreamX.PictureEventDuringMessage.Window_Message_isTriggered.call(this);
    };


    DreamX.PictureEventDuringMessage.Window_Selectable_processTouch = Window_Selectable.prototype.processTouch;
    Window_Selectable.prototype.processTouch = function () {
        if (this instanceof Window_ChoiceList && SceneManager._scene instanceof Scene_Map) {
            if (this.isOpenAndActive()) {
                if (TouchInput.isTriggered()) {
                    SceneManager._scene.updatePictureEvents();
                }
            }
        }
        DreamX.PictureEventDuringMessage.Window_Selectable_processTouch.call(this);
    };

    DreamX.PictureEventDuringMessage.checkAndSetDisableMessageProgress = function (list) {
        for (var i = 0; i < list.length; i++) {
            var command = list[i];

            if (command.code === 108 && command.parameters[0] === "DisableMessageProgress") {
                $gameTemp._disableMessageProgress = true;
            }
        }
    };

    DreamX.PictureEventDuringMessage.checkAndSetLastEvent = function (list) {
        var registerLastEvent = true;

        for (var i = 0; i < list.length; i++) {
            var command = list[i];

            if ($gameMap._interpreter._DXLastList && command.code === 108
                    && command.parameters[0] === "DisableLastEventReplace") {
                registerLastEvent = false;
            }
        }

        if (!registerLastEvent)
            return;

        var index = $gameMap._interpreter._index;
        var list = $gameMap._interpreter._list;
        if (!list || !list[index])
            return;
        if (list[index].code === 402) {

            SceneManager._scene._messageWindow._choiceWindow.hide();
            SceneManager._scene._messageWindow._choiceWindow.deactivate();
            SceneManager._scene._messageWindow.terminateMessage();

            index--;
        }
        index -= 3;

        if (index < 0) {
            index = 0;
        }

        $gameMap._interpreter._DXLastList = list;
        $gameMap._interpreter._DXLastListIndex = index;
    };

    DreamX.PictureEventDuringMessage.Scene_Map_updatePictureEventCheck = Scene_Map.prototype.updatePictureEventCheck;
    Scene_Map.prototype.updatePictureEventCheck = function (check) {
        if (SceneManager.isSceneChanging())
            return;
        if (SceneManager._scene._messageWindow) {
            var picture = this.getTriggeredPictureCommonEvent(check);
            if (!picture)
                return;

            var newList = $dataCommonEvents[check[picture.pictureId()]].list;
            DreamX.PictureEventDuringMessage.checkAndSetLastEvent(newList);
            DreamX.PictureEventDuringMessage.checkAndSetDisableMessageProgress(newList);

            $gameMap._interpreter.setup(newList);
            return;
        }
        DreamX.PictureEventDuringMessage.Scene_Map_updatePictureEventCheck.call(this);
    };

})();
