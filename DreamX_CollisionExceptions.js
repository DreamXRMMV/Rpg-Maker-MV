/*: * @plugindesc v1.00 Events labeled with the same collision exceptions 
 * will not collide with each other. 
 * 
 * @author DreamX 
 * @help This plugin does not provide plugin commands. 
 * ===========================================================================
 * How To Use 
 * ============================================================================ 
 * Put this in the notetag section of an event <collisionException:#> with 
 * # being the number you want. You can use any number of numbers, for example 
 * <collisionException:2 4 6> or <collisionException:1>. Numbers must be 
 * separated with a space. Events that have the same collision exception number 
 * will not 
 * collide with each other and instead will go through the other. 
 * ============================================================================ 
 * Terms Of Use 
 * ============================================================================ 
 * Free to use and modify for commercial and noncommercial games, with credit. */
var Imported = Imported || {};
Imported.DreamX_CollisionExceptions = true;
var DreamX = DreamX || {};
DreamX.CollisionExceptions = DreamX.CollisionExceptions || {};

(function () {
    DreamX.CollisionExceptions.Game_Event_initialize = Game_Event.prototype.initialize;
    Game_Event.prototype.initialize = function (mapId, eventId) {
        DreamX.CollisionExceptions.Game_Event_initialize.call(this, mapId, eventId);
        this._collisionException = [];
        if ($dataMap.events[eventId].meta.collisionException) {
            this._collisionException = $dataMap.events[eventId].meta.collisionException.split(" ");
        }
    };
    DreamX.CollisionExceptions.Game_Event_isCollidedWithEvents = Game_Event.prototype.isCollidedWithEvents;
    Game_Event.prototype.isCollidedWithEvents = function (x, y) {
        var sameException;
        if (this._collisionException.length > 0) {
            var events = $gameMap.eventsXyNt(x, y);
            for (i = 0; i < events.length; i++) {
                for (j = 0; j < events[i]._collisionException.length; j++) {
                    for (k = 0; k < this._collisionException.length; k++) {
                        if (this._collisionException[k] === events[i]._collisionException[j]) {
                            return false;
                        }
                    }
                }
            }
        }
        return DreamX.CollisionExceptions.Game_Event_isCollidedWithEvents.call(this, x, y);
    };
})();