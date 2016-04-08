/*:
 * @plugindesc
 * @author
 * @help
 */

var Imported = Imported || {};
Imported.DreamX_MenuActorListSize = true;

var DreamX = DreamX || {};
DreamX.MenuActorListSize = DreamX.MenuActorListSize || {};

(function () {

    Window_MenuStatus.prototype.maxItems = function () {
        var size = $gameParty.size();
        if (size > 3) {
            size = 3;
        }
        return size;
    };

})();
