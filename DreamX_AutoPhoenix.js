/*:
 * @plugindesc v0.2
 * @author DreamX
 * @help
 * Put <AutoPhoenix> on an actor, class, weapon, armor or state to allow for 
 * Auto-Phoenix. An actor will revive a defeated ally if a revival item is 
 * available.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 * This plugin uses modified code snippets from Yanfly's Dash Toggle plugin. 
 * Please remember to credit them as well.
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

    Game_Party.prototype.autoPhoenixItem = function () {
        var singleAllyRevive = [];
        var multiAllyRevive = [];
        for (var i = 0; i < this.items().length; i++) {
            var item = this.items()[i];
            var itemEffects = item.effects;

            for (var j = 0; j < itemEffects.length; j++) {
                var itemEffect = itemEffects[j];
                if (itemEffect.code === 22 && itemEffect.dataId === 1) {
                    if (this.deadBattleMembers().length > 1 && item.meta.MultiPhoenix) {
                        multiAllyRevive.push(item);
                    }
                    singleAllyRevive.push(item);
                }
            }
        }
        if (multiAllyRevive.length >= 1) {
            return multiAllyRevive[0];
        }
        return singleAllyRevive[0];
    };

    Game_Party.prototype.hasReviveItem = function () {
        return this.reviveItems().length > 0;
    };

    Game_Party.prototype.deadBattleMembers = function () {
        var deadBMembers = [];
        for (var i = 0; i < this.battleMembers().length; i++) {
            var actor = this.battleMembers()[i];
            if (actor.hp <= 0 || !actor.isAlive() || actor.isDead()) {
                deadBMembers.push(i);
            }
        }
        return deadBMembers;
    };

    Game_Party.prototype.randomDeadBattleMember = function () {
        return Math.floor(Math.random() * this.deadBattleMembers().length);
    };

    Game_Party.prototype.autoPhoenixActors = function () {
        var actorPool = [];
        for (var i = 0; i < $gameParty.battleMembers().length; i++) {
            var actor = $gameParty.battleMembers()[i];
            if (actor.isAlive() && actor.canMove() && actor.hp > 0
                    && actor.isAutoPhoenixEnabled()) {
                actorPool.push(actor);
            }
        }
        if (actorPool.length >= 1) {
            return actorPool;
        }
        return undefined;
    };

    DreamX.AutoPhoenix.BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function () {
        DreamX.AutoPhoenix.BattleManager_endAction.call(this);
        var deadMembers = $gameParty.deadBattleMembers();

        if (deadMembers.length >= 1 && $gameParty.hasReviveItem()) {
            var actor = $gameParty.autoPhoenixActors()[0];

            var action = new Game_Action(actor, true);
            action.setItemObject($gameParty.autoPhoenixItem());

            action.setTarget($gameParty.randomDeadBattleMember());
            actor._actions.push(action);
            BattleManager.forceAction(actor);
            $gameTroop._interpreter.setWaitMode('action');
        }
    };

    // modified from yanfly's dash toggle plugin
    DreamX.AutoPhoenix.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.AutoPhoenix.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX._loaded_DreamX_AutoPhoenix) {
            this.processAutoPhoenixNotetags1($dataActors);
            this.processAutoPhoenixNotetags1($dataClasses);
            this.processAutoPhoenixNotetags1($dataWeapons);
            this.processAutoPhoenixNotetags1($dataArmors);
            this.processAutoPhoenixNotetags1($dataStates);
            DreamX._loaded_DreamX_AutoPhoenix = true;
        }
        return true;
    };

    // modified from yanfly's dash toggle plugin
    DataManager.processAutoPhoenixNotetags1 = function (group) {
        for (var n = 1; n < group.length; n++) {
            var obj = group[n];
            var notedata = obj.note.split(/[\r\n]+/);

            obj.enableAutoPhoenix = false;

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:AutoPhoenix)>/i)) {
                    obj.enableAutoPhoenix = true;
                }
            }
        }
    };

    // modified from yanfly's dash toggle plugin
    DreamX.AutoPhoenix.Game_Actor_refresh = Game_Actor.prototype.refresh;
    Game_Actor.prototype.refresh = function () {
        this._enableAutoPhoenix = undefined;
        DreamX.AutoPhoenix.Game_Actor_refresh.call(this);
    };

    // modified from yanfly's dash toggle plugin
    Game_Actor.prototype.isAutoPhoenixEnabled = function () {
        // if variable is not undefined
        if (this._enableAutoPhoenix !== undefined)
            return this._enableAutoPhoenix;
        if (this.actor().enableAutoPhoenix) {
            this._enableAutoPhoenix = true;
            return this._enableAutoPhoenix;
        }
        if (this.currentClass().enableAutoPhoenix) {
            this._enableAutoPhoenix = true;
            return this._enableAutoPhoenix;
        }
        var length = this.equips().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.equips()[i];
            if (obj && obj.enableAutoPhoenix) {
                this._enableAutoPhoenix = true;
                return this._enableAutoPhoenix;
            }
        }
        var length = this.states().length;
        for (var i = 0; i < length; ++i) {
            var obj = this.states()[i];
            if (obj && obj.enableAutoPhoenix) {
                this._enableAutoPhoenix = true;
                return this._enableAutoPhoenix;
            }
        }
        this._enableAutoPhoenix = false;
        return this._enableAutoPhoenix;
    };

})();
