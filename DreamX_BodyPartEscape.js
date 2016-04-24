/*:
 * @plugindesc v1.1
 * @author DreamX
 * @help
 * Use <EscapeEnemiesOnDeath:x y z> as an enemy notetag. When the enemy dies, 
 * enemies with the ids in the notetag will escape.
 * Replace x y z with one or more numbers.
 * Example: 
 * <EscapeEnemiesOnDeath:5 2 1>
 * Each number is separated by one space.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_BodyPartEscape = true;

var DreamX = DreamX || {};
DreamX.BodyPartEscape = DreamX.BodyPartEscape || {};

(function () {

    DreamX.BodyPartEscape.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function () {
        DreamX.BodyPartEscape.Game_BattlerBase_die.call(this);
        var dataBattler = this.isActor() ? this.actor() : this.enemy();
        
        var thisX = this.spritePosX();
        var thisY = this.spritePosY();
        
        var map = new Map();

        if (!dataBattler.meta.EscapeEnemiesOnDeath) {
            return;
        }
        var enemiesToKill = dataBattler.meta.EscapeEnemiesOnDeath.split(" ");
        for (var i = 0; i < $gameTroop.members().length; i++) {
            var member = $gameTroop.members()[i];
            var id = member.enemyId();
            if (enemiesToKill.some(function (arrayId) {
                return parseInt(arrayId) === id;
            })) {
                if (!map.has(id)) {
                    map.set(id, []);
                }
                map.get(id).push(member);
            }
        }

        map.forEach(function (value, key) {
            map.get(key).sort(function (a, b) {
                var aDistance = Math.abs(a.spritePosX() - thisX)
                        + Math.abs(a.spritePosY() - thisY);
                var bDistance = Math.abs(b.spritePosX() - thisX)
                        + Math.abs(b.spritePosY() - thisY);
                return aDistance - bDistance;
            });
            map.get(key)[0].escape();
        }, map);

    };


//                var matchedEnemies = enemiesToEscape.map(function (metaId) {
//                return parseInt(metaId) === id;
//            });
//
//            if (matchedEnemies.length <= 0) {
//                continue;
//            }
//

//            
//            matchedEnemies[0].escape();

})();
