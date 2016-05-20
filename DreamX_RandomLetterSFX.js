/*:
 * @plugindesc v1.00 Random letter sfx
 * @author DreamX
 * @help
 * Place under both Yanfly Message Core and Yanfly Yanfly Extended Message 
 * Pack 1
 * 
 * When you use \lsn<filename> in a message, it will do this:
 * Add filename to the list of possible sound effects.
 * Add filename0...x to the possible list of sound effects.
 * For example, if you filename, filename0, filename1, filename2, filename3
 * it will add it to the possible list.
 * It will keep adding until if finds an iteration that doesn't exist (ie. 
 * if filename7 doesn't exist)
 * 
 * Then, it will choose randomly from this list to play.
 * You can also start with 1 instead of 0, like: filename, filename1, filename2
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
Imported.DreamX_RandomLetterSFX = true;

var DreamX = DreamX || {};
DreamX.RandomLetterSFX = DreamX.RandomLetterSFX || {};

(function () {

    DreamX.RandomLetterSFX.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.RandomLetterSFX.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_MessageCore || !Imported.YEP_X_ExtMesPack1) {
            throw new Error("DreamX_RandomLetterSFX requires Yanfly Message " +
                    "Core and Yanfly Extended Message Pack 1");
        }
    };

    DreamX.RandomLetterSFX.SEDirectoryPath = function () {
        var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/audio/se/');
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    };

    DreamX.RandomLetterSFX.chooseLetterSoundName = function (name) {
        var fs = require('fs');
        var extension = Utils.isMobileDevice() ? ".m4a" : ".ogg";
        var validNames = [];
        var end = false;
        var baseName = name.split(new RegExp("\\d"))[0];

        var index = -1;

        while (!end) {
            var filePath = this.SEDirectoryPath();
            var fileName = baseName;
            if (index !== -1) {
                fileName += index;
            }
            filePath += fileName;
            filePath += extension;

            if (fs.existsSync(filePath)) {
                validNames.push(fileName);
            } else if (index >= 2) {
                end = true;
            }
            index++;
        }

        if (validNames.length === 0) {
            return "";
        }

        var selection = Math.floor(Math.random() * validNames.length);

        return validNames[selection];
    };

    DreamX.RandomLetterSFX.Game_System_getMessageSound = Game_System.prototype.getMessageSound;
    Game_System.prototype.getMessageSound = function () {
        if (this._msgSoundName) {
            this._msgSoundName = DreamX.RandomLetterSFX.chooseLetterSoundName(this._msgSoundName);
        }
        return DreamX.RandomLetterSFX.Game_System_getMessageSound.call(this);

    };
})();
