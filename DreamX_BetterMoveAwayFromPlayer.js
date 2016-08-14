/*:
 * @plugindesc v1.00 Events will be better at avoiding the player and get stuck less often.
 * @author DreamX
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * How To Use
 * ============================================================================
 * Plug and play.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 */
var Imported = Imported || {};
Imported.DreamX_BetterMoveAwayFromPlayer = true;

var DreamX = DreamX || {};
DreamX.BetterMoveAwayFromPlayer = DreamX.BetterMoveAwayFromPlayer || {};

(function () {

    Game_Character.prototype.moveAwayFromCharacter = function (character) {
        var greatestDistance = 0;
        var greatestDistanceDirection;
        var distance = 0;
        var currentDistance = Math.abs(this.x - character.x) + Math.abs(character.y - this.y);

        // test character going up
        if (this.y - 1 >= 0 && $gameMap.isPassable(this.x, this.y - 1, 2)) {
            distance = Math.abs(this.x - character.x) + Math.abs(character.y - (this.y - 1));
            if (distance > greatestDistance) {
                greatestDistance = distance;
                greatestDistanceDirection = 8;
            }
        }

        // test character going down
        if ($gameMap.isPassable(this.x, this.y + 1, 8)) {
            distance = Math.abs(this.x - character.x) + Math.abs(character.y - (this.y + 1));
            if (distance > greatestDistance) {
                greatestDistance = distance;
                greatestDistanceDirection = 2;
            }
        }

        // test character going left
        if ($gameMap.isPassable(this.x - 1, this.y, 6)) {
            distance = Math.abs(character.x - (this.x - 1)) + Math.abs(this.y - character.y);
            if (distance > greatestDistance) {
                greatestDistance = distance;
                greatestDistanceDirection = 4;
            }
        }

        // test character going right
        if ($gameMap.isPassable(this.x + 1, this.y, 4)) {
            distance = Math.abs(character.x - (this.x + 1)) + Math.abs(this.y - character.y);
            if (distance > greatestDistance) {
                greatestDistance = distance;
                greatestDistanceDirection = 6;
            }
        }
        if (currentDistance < greatestDistance) {
            this.moveStraight(greatestDistanceDirection);
        }
    };

})();
