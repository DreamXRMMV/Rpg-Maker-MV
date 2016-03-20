/*:
 * @plugindesc v0.1
 * @author DreamX
 * @help
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
                    if (actor.isAlive() && actor.canMove() && actor.hp > 0 && actor.isAutoPhoenixEnabled()) {
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

    // modified from yanfly's dash toggle plugin
    DreamX.AutoPhoenix.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.AutoPhoenix.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX._loaded_DreamX_AutoPhoenix) {
            this.processDashNotetags1($dataActors);
            this.processDashNotetags1($dataClasses);
            this.processDashNotetags1($dataWeapons);
            this.processDashNotetags1($dataArmors);
            this.processDashNotetags1($dataStates);
            DreamX._loaded_DreamX_AutoPhoenix = true;
        }
        return true;
    };
    
    // modified from yanfly's dash toggle plugin
    DataManager.processDashNotetags1 = function (group) {
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
