/*:
 * @plugindesc v1.0b - Utility plugin for plugins that need to have action 
 * results available earlier. 
 * @author DreamX
 * @help
 * Requires Yanfly Battle Engine Core, and must be placed below it.
 * ============================================================================
 * Compatibility
 * ============================================================================
 * This plugin overwites the Game_Action.prototype.apply function. It may be  
 * be incompatible with some plugins that do the same or alias this function. 
 * Post in the thread if you spot an incompability and would like a patch 
 * update for it.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_CalcResultBeforeAnim = true;

var DreamX = DreamX || {};
DreamX.CalcResultBeforeAnim = DreamX.CalcResultBeforeAnim || {};

(function () {
    DreamX.CalcResultBeforeAnim.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.CalcResultBeforeAnim.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_BattleEngineCore) {
            throw new Error("DreamX Predetermine Results requires Yanfly "
                    + "Battle Engine Core");
        }
    };

    DreamX.CalcResultBeforeAnim.Window_BattleLog_startAction = Window_BattleLog.prototype.startAction;
    Window_BattleLog.prototype.startAction = function (subject, action, targets) {
        DreamX.CalcResultBeforeAnim.Window_BattleLog_startAction.call(this, subject, action, targets);
        targets.forEach(function (target) {
            target._preCalculatedResult = new Game_ActionResult();
            var result = target._preCalculatedResult;
            result.used = action.testApply(target);
            result.missed = (result.used && Math.random() >= action.itemHit(target));
            result.evaded = (!result.missed && Math.random() < action.itemEva(target));
            result.physical = action.isPhysical();
            result.drain = action.isDrain();
            result.critical = (Math.random() < action.itemCri(target));
            result.predeterminedDamage = action.makeDamageValue(target, result.critical);
            if (result.predeterminedDamage === 0) {
                result.critical = false;
            }
            result.weak = action.calcElementRate(target) > 1;
            result.resist = action.calcElementRate(target) < 1;
        });
    };

    Game_Action.prototype.apply = function (target) {
        this.subject()._result = null;
        this.subject()._result = new Game_ActionResult();

        var result = target._preCalculatedResult;
       
        if (result.isHit()) {
            if (this.item().damage.type > 0) {
                this.executeDamage(target, result.predeterminedDamage);
            }
            this.item().effects.forEach(function (effect) {
                this.applyItemEffect(target, effect);
            }, this);
            this.applyItemUserEffect(target);
        }

        if ($gameParty.inBattle()) {
            target.startDamagePopup();
            target.performResultEffects();
            if (target !== this.subject())
                this.subject().startDamagePopup();
        }
        target._preCalculatedResult = undefined;

    };

})();
