/*:
 * @plugindesc v0.1
 * @author DreamX
 * @help
 * ============================================================================
 * Opening Dev Console
 * ============================================================================
 * To open the dev console, you can use the script call DreamX.Modding.openConsole()
 * I suggest using YEP Button Common Events to bind a common event to a key. 
 * The common event can of course have a conditional branch to make conditions 
 * before the player can use the console.
 * ============================================================================
 * Modding Files
 * ============================================================================
 * Create an override folder in the project directory. After, the folder 
 * structure is the same. For example, if you want to override character file, 
 * you could make a directory like override\img\characters\Actor1.png
 * 
 * If the override file exists, the game will use it instead. If it doesn't 
 * exist, the game will use the normal one.
 * 
 * When deployed, the override folder should be in www folder. By default, it 
 * will be if you had it in your project directory and deployed.
 * 
 * Works only with images and audio for now.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for console opening script from YEP Core Engine.
 */

var Imported = Imported || {};
Imported.DreamX_Modding = true;

var DreamX = DreamX || {};
DreamX.Modding = DreamX.Modding || {};

(function () {
    DreamX.Modding.openConsole = function () {
        if (Utils.isNwjs()) {
            var _debugWindow = require('nw.gui').Window.get().showDevTools();
            _debugWindow.moveTo(0, 0);
            window.focus();
        }
    };

    DreamX.Modding.overrideDirectory = function () {
        var path = '';
        var baseFolder = window.location.pathname;
        var overrideFolder = '/override/';

        if (Utils.isOptionValid('test')) {
            path = baseFolder.replace(/(\/www|)\/[^\/]*$/, overrideFolder);
        } else {
            path = baseFolder.replace(/(\/www|)\/[^\/]*$/, '/www/' + overrideFolder);
        }
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    };

    DreamX.Modding.setPath = function (path) {
        var overridePath = DreamX.Modding.overrideDirectory() + path;
        if (require('fs').existsSync(overridePath)) {
            path = overridePath;
        }
        return path;
    };

    DreamX.Modding.ImageManager_loadNormalBitmap = ImageManager.loadNormalBitmap;
    ImageManager.loadNormalBitmap = function (path, hue) {
        path = DreamX.Modding.setPath(path);
        return DreamX.Modding.ImageManager_loadNormalBitmap.call(this, path, hue);
    };

    DreamX.Modding.WebAudio_initialize = WebAudio.prototype.initialize;
    WebAudio.prototype.initialize = function (url) {
        url = DreamX.Modding.setPath(url);
        DreamX.Modding.WebAudio_initialize.call(this, url);
    };

})();
