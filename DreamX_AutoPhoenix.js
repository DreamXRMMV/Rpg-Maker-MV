/*:
 * @plugindesc v0.1
 * @author DreamX
 * @help
 */

var Imported = Imported || {};
Imported.DreamX_AutoPhoenix = true;

var DreamX = DreamX || {};
DreamX.AutoPhoenix = DreamX.AutoPhoenix || {};

(function () {

    Game_Party.prototype.reviveItems = function () {
        var array = [];
        for (var i = 0; i < this.items().length; i++) {
            var itemEffects = this.items()[i].effects;
            for (var j = 0; j < itemEffects.length; j++) {
                var itemEffect = itemEffects[j];
                if (itemEffect.code === 22 && itemEffect.dataId === 1) {
                    array.push(this.items()[i]);
                }
            }
        }
        return array;
    };

    Game_Party.prototype.hasReviveItem = function () {
        return this.reviveItems().length > 0;
    };

    DreamX.AutoPhoenix.Game_BattlerBase_die = Game_BattlerBase.prototype.die;
    Game_BattlerBase.prototype.die = function () {
        DreamX.AutoPhoenix.Game_BattlerBase_die.call(this);
        $gameParty.requestMotionRefresh();
        if ($gameParty.inBattle() && this.isActor()) {
            if ($gameParty.hasReviveItem()) {
                for (var i = 0; i < $gameParty.battleMembers().length; i++) {
                    var actor = $gameParty.battleMembers()[i];
                    if (actor.isAlive() && actor.canMove() && actor.hp > 0) {
                        this.clearActions();
                        var action = new Game_Action(actor, true);
                        action.setItemObject($gameParty.reviveItems()[0]);
                        action.setTarget($gameParty.battleMembers().indexOf(this));
                        actor._actions.push(action);
                        BattleManager.forceAction(actor);
                        $gameTroop._interpreter.setWaitMode('action');
                    }
                }
            }
        }
    };

})();
