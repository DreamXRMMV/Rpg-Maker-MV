/*:
 * @plugindesc 
 * @author
 * @help
 *
 */
(function () {

    Game_Event.prototype.canSeePlayer = function () {
        var foundSightBlock = false;
        var testX = 0;
        var testY = 0;

        if (!this._seePlayer)
            return false;
        var sx = this.deltaXFrom($gamePlayer.x);
        var sy = this.deltaYFrom($gamePlayer.y);
        if (Math.abs(sx) > Math.abs(sy)) {
            var direction = (sx > 0) ? 4 : 6;
        } else {
            var direction = (sy > 0) ? 8 : 2;
        }

        // test if player to the immediate right or left of the event
        // and the event is facing up or down
        if (this.direction() === 2 || this.direction() === 8) {
            if (this.y === $gamePlayer.y && Math.abs(this.x - $gamePlayer.x) <= 1) {
                this._alertLock = this._sightLock;
                return true;
            }
        }
        // test if player is the immediate top or bottom of event and event
        // is facing left or right
        else if (this.direction() === 6 || this.direction() === 4) {
            if (this.x === $gamePlayer.x && Math.abs(this.y - $gamePlayer.y) <= 1) {
                this._alertLock = this._sightLock;
                return true;
            }
        }

        // if the event isn't facing in the direction of the player and failed
        //  the above tests
        if (direction !== this.direction()) {
            return false;
        }

        if (this.x === $gamePlayer.x) {
            for (var i = 1; i < Math.abs(this.y - $gamePlayer.y); i++) {
                testY = this.direction() === 8 ? this.y - i : this.y + i;
                if (!$gameMap.isPassable(this.x, testY, this.direction())) {
                    foundSightBlock = true;
                }
            }
        }
        else if (this.y === $gamePlayer.y) {
            for (var i = 1; i < Math.abs(this.x - $gamePlayer.x); i++) {
                testX = this.direction() === 4 ? this.x - i : this.x + i;
                if (!$gameMap.isPassable(testX, this.y, this.direction())) {
                    foundSightBlock = true;
                }
            }
        }
        else {
            return false;
        }

        if (!foundSightBlock) {
            this._alertLock = this._sightLock;
            return true;
        }
        return false;
    };

})();
//=============================================================================
// End of File
//=============================================================================
