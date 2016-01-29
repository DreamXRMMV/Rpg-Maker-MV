/*:
 * @plugindesc v1.00 Enemies set to "appear halfway" will appear sequentially 
 * when all enemies are dead.
 * @author DreamX
 * @help
 */

(function () {
    alias_BattleManager_checkBattleEnd = BattleManager.checkBattleEnd;
    BattleManager.checkBattleEnd = function () {
        var hasExtra = false;
        var hasExtraEnemy = false;
        if ($gameParty.isAllDead()) {
            var i = 0;            // check if there are any reserve party members that aren't dead
            while (hasExtra === false && i < $gameParty.allMembers().length) {
                if (!$gameParty.allMembers()[i].isDead()) {
                    hasExtra = true;
                }
                i++;
            }
            if (hasExtra) {
                SceneManager.push(Scene_Party);
                return false;
            }
        } else if ($gameTroop.isAllDead()) {
            var i = 0;
            while (i < $gameTroop.members().length && !hasExtraEnemy) {
                if ($gameTroop.members()[i].isHidden()) {
                    hasExtraEnemy = true;
                } else {
                    i++;
                }
            }
            if (hasExtraEnemy) {
                $gameTroop.members()[i].appear();
                $gameTroop.makeUniqueNames();
                return false;
            }
        }
        return alias_BattleManager_checkBattleEnd.call(this);
    };
})();
