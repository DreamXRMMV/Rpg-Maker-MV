/*:
 * @plugindesc v1.0
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
                member.escape();
            }

        }
    };

})();
