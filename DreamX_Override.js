/*:
 * @plugindesc v0.1
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Create an override folder in the project directory. After, the folder 
 * structure is the same. For example, if you want to override character file, 
 * you could make a directory like override\img\characters\Actor1.png
 * 
 * If the override file exists, the game will use it instead. If it doesn't 
 * exist, the game will use the normal one.
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
 */

var Imported = Imported || {};
Imported.DreamX_Override = true;

var DreamX = DreamX || {};
DreamX.Override = DreamX.Override || {};

(function () {
    DreamX.Override.overrideDirectory = function () {
        var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/override/');
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    };

    DreamX.Override.setPath = function (path) {
        var overridePath = DreamX.Override.overrideDirectory() + path;
        if (require('fs').existsSync(overridePath)) {
            path = overridePath;
        }
        return path;
    };

    DreamX.Override.ImageManager_loadNormalBitmap = ImageManager.loadNormalBitmap;
    ImageManager.loadNormalBitmap = function (path, hue) {
        path = DreamX.Override.setPath(path);
        return DreamX.Override.ImageManager_loadNormalBitmap.call(this, path, hue);
    };

    DreamX.Override.WebAudio_initialize = WebAudio.prototype.initialize;
    WebAudio.prototype.initialize = function (url) {
        url = DreamX.Override.setPath(url);
        DreamX.Override.WebAudio_initialize.call(this, url);
    };
   
})();
