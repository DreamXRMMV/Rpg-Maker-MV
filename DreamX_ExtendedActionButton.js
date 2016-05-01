/*:
 * @plugindesc v1.0 Extended Action Button
 * @author DreamX
 * @help
 * This script allows, essentially, for a different "action button" type 
 * process where events can be activated from a greater distance. 
 * You will use this script call:
 * 
 * $gamePlayer.DXEAB(x, y, "z");
 * 
 * x is the reach in the direction the player is facing. For example, if it is 
 * three and you are facing left, the reach is 3 spaces to the left. If the 
 * reach is 5 and you are facing up, the reach is 3 spaces up.
 * 
 * y is the spread. This is the amount of spaces on the side of the "x" reach.
 * For example, if you wanted to be able to activate events ahead in a 3x3 
 * square, you would use 3 as the x value and 1 as the y value.
 * 
 * z is a tag. You can use this to activate specific pages of an event. 
 * For example, if an event has a page with a comment "Explode" (without quotes) 
 * and the script call uses "Explode" (with quotes) as the tag, that page will 
 * be activated. If you omit the tag from the script call 
 * (ie. $gamePlayer.DXEAB(3, 1);) then the script call will activate events in 
 * a normal way - whatever page with a condition that is satisfied will be 
 * activated.
 * 
 */

var Imported = Imported || {};
Imported.DreamX_ExtendedActionButton = true;

var DreamX = DreamX || {};
DreamX.ExtendedActionButton = DreamX.ExtendedActionButton || {};

(function () {
    Game_Player.prototype.DXEABStartEvent = function (x, y, tag) {
        $gameMap.eventsXy(x, y).forEach(function (event) {
            event.DXEABStart(tag);
        });
    };

    Game_Event.prototype.DXEABStart = function (tag) {
        if (tag === undefined) {
            this.start();
            return;
        }
        
        var pageIndex = -1;
        for (var i = 0; i < this.event().pages.length && pageIndex === -1; i++) {
            var list = this.event().pages[i].list;
            for (var j = 0; j < list.length && pageIndex === -1; j++) {
                var command = list[j];
                if (command.code === 108) {
                    var comment = command.parameters[0];
                    if (comment === tag) {
                        pageIndex = i;
                    }
                }
            }
        }
          
        if (pageIndex === -1) {
            return;
        }

        this._pageIndex = pageIndex;
        this.start();
    };

    Game_Player.prototype.DXEAB = function (tilesSameDirection, tilesSide, tag) {
        tilesSameDirection = tilesSameDirection || 3;
        if (tilesSide === undefined) {
            tilesSide = 0;
        }

        var playerX = this.x;
        var playerY = this.y;
        var direction = this.direction();

        for (var sameDirAdd = 1; sameDirAdd < tilesSameDirection + 1; sameDirAdd++) {
            var eventX = playerX;
            var eventY = playerY;

            switch (direction) {
                // looking down
                case 2:
                    eventY += sameDirAdd;
                    break;
                    // looking up
                case 8:
                    eventY -= sameDirAdd;
                    break;
                    // looking right
                case 6:
                    eventX += sameDirAdd;
                    break;
                    // looking left
                case 4:
                    eventX -= sameDirAdd;
                    break;
            }

            if (tilesSide === 0) {
                this.DXEABStartEvent(eventX, eventY);
                continue;
            }

            for (var sideAdd = 0; sideAdd < tilesSide + 2; sideAdd++) {
                switch (direction) {
                    case 2:
                    case 8:
                        // looking up or down
                        eventX = playerX;
                        eventX = eventX - tilesSide + sideAdd;
                        break;
                    case 4:
                    case 6:
                        // looking left or right
                        eventY = playerY;
                        eventY = eventY - tilesSide + sideAdd;
                        break;
                }

                // if out of bounds
                if (eventX < 0 || eventY < 0 || eventX > $dataMap.width - 1
                        || eventY > $dataMap.height - 1) {
                    continue;
                }

                this.DXEABStartEvent(eventX, eventY, tag);
            }
        }
    };

})();
