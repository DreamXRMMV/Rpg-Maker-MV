/*:
 * @plugindesc v1.0 you can set whether the face image in messages appear on 
 * the left or right side, and whether are flipped horizontally.
 * 
 * @param Flip Left Side
 * @desc Whether to use the flip version of the face image when shown on the left side. Default: false
 * @default false
 * 
 * @param Flip Right Side
 * @desc Whether to use the flip version of the face image when shown on the left side. Default: false
 * @default false
 * 
 * @author DreamX
 * @help
 * ===========================================================================
 * How To Use
 * ===========================================================================
With this plugin you can set whether the face image in messages appear on the 
left or right side, and whether are flipped horizontally.

With parameters you can set whether to flip the image on the left or right 
side or both.
In order for this to work, you must have an image with the same name as the 
original in the same folder, but with _Flip
For example, if you were using the Actor1.png image for the faces, the flip 
version would be Actor1_Flip.png

Plugin Commands:
FacePos Left = The next message faces will be positioned on the left.
FacePos Right = The next message faces will be positioned on the right.

These last until: the save game is exited, the program is exited or it's 
changed with a plugin command.
So keep in mind that face position is not put into the save data, so everytime
the player exits their save game one way or another it is reset. Therefore it 
is a good idea to reinitialize face position whenever after the player could 
have exited.

If you are using the option to put the face on the right hand position, it's 
a good idea to either to make sure that the text is within the margins in the 
Show Text event command, or use Yanfly's word wrap from their Message Core 
plugin.
 * ===========================================================================
 * Terms Of Use
 * ===========================================================================
 Free to use and modify for commercial and noncommercial games, with credit.
 * ===========================================================================
 * Compatibility
 * ===========================================================================
This program overrides a method from Yanfly's Message Core, so that word 
wrapping will work when the face image is on the right side.
 * ===========================================================================
 * Credits
 * ===========================================================================
 DreamX
 */

var Imported = Imported || {};
Imported.DreamX_MessageFacePosition = true;

var DreamX = DreamX || {};
DreamX.MessageFacePosition = DreamX.MessageFacePosition || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    DreamX.Parameters = PluginManager.parameters('DreamX_FacePosition');

    var paramFlipLeftSide = eval(DreamX.Parameters['Flip Left Side']
            || false);
    var paramFlipRightSide = eval(DreamX.Parameters['Flip Right Side']
            || false);

    // alias
    DreamX.MessageFacePosition.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.MessageFacePosition.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'FacePos':
                if (args[0]) {
                    DreamX.MessageFacePosition.SetFacePos(args[0].toUpperCase());
                }
                break;
        }
    };

    // new
    DreamX.MessageFacePosition.SetFacePos = function (direction) {
        if (direction.match("LEFT")) {
            $gameTemp._facePos = "LEFT";
        } else if (direction.match("RIGHT")) {
            $gameTemp._facePos = "RIGHT";
        }
    };

    // new
    Game_Message.prototype.isFaceSet = function () {
        return $gameTemp._facePos;
    }

    // new
    Game_Message.prototype.isFaceSetToRight = function () {
        return this.isFaceSet() && $gameTemp._facePos.match("RIGHT");
    }

    // new
    Game_Message.prototype.isFaceSetToLeft = function () {
        return !this.isFaceSet() || $gameTemp._facePos.match("LEFT");
    }

    // new
    Game_Message.prototype.shouldUseFlip = function () {
        if (this.isFaceSetToLeft() && paramFlipLeftSide === true) {
            return true;
        }
        if (this.isFaceSetToRight() && paramFlipRightSide === true) {
            return true;
        }
        return false;
    }

    // new
    Game_Message.prototype.faceX = function () {
        if (this.isFaceSetToRight()) {
            return Window_Message.prototype.windowWidth() - Window_Base._faceWidth
                    - Window_Message.prototype.standardPadding() * 2;
        }
        return 0;
    };

    // override
    Game_Message.prototype.faceName = function () {
        var faceName = this._faceName;
        if (this.shouldUseFlip() === true) {
            faceName += "_Flip";
        }
        return faceName;
    };

    // override
    Game_Message.prototype.faceIndex = function () {
        if (this.shouldUseFlip()) {
            return Math.abs(3 - this._faceIndex);
        } else {
            return this._faceIndex;
        }
    };

    // override
    Window_Message.prototype.drawMessageFace = function () {
        this.drawFace($gameMessage.faceName(), $gameMessage.faceIndex(), $gameMessage.faceX(), 0);
    };

    // alias
    DreamX.MessageFacePosition.Window_Message_newLineX = Window_Message.prototype.newLineX;
    Window_Message.prototype.newLineX = function () {
        if ($gameMessage.isFaceSetToRight() && $gameMessage.faceName() !== '') {
            return 0;
        }
        return DreamX.MessageFacePosition.Window_Message_newLineX.call(this);
    };

    // new
    Window_Message.prototype.textAreaWidth = function () {
        if ($gameTemp._facePos && $gameTemp._facePos.match("RIGHT")) {
            return this.windowWidth() - (Window_Base._faceWidth) - (this.standardPadding() * 2);
        } else {
            return this.contentsWidth();
        }
    };

    // override (yanfly message core)
    Window_Base.prototype.checkWordWrap = function (textState) {
        if (!textState)
            return false;
        if (!this._wordWrap)
            return false;
        if (textState.text[textState.index] === ' ') {
            var nextSpace = textState.text.indexOf(' ', textState.index + 1);
            var nextBreak = textState.text.indexOf('\n', textState.index + 1);
            if (nextSpace < 0)
                nextSpace = textState.text.length + 1;
            if (nextBreak > 0)
                nextSpace = Math.min(nextSpace, nextBreak);
            var word = textState.text.substring(textState.index, nextSpace);
            var size = this.textWidthExCheck(word);
        }
        return (size + textState.x > this.textAreaWidth());
    };

})();
