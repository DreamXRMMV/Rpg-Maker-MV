/*:
 * @plugindesc v1.2 Swap states and/or buffs on skill.
 * @author DreamX
 * @help Use <swapStates:1> as a skill notetag to swap states,
 * use <swapBuffs:1> as a skill notetag to swap buffs and debuffs
 * use <noSwap:1> to prevent a state from being swapped.
 * ============================================================================
 * Patch Notes
 * ============================================================================
 * 1.2 - Added option to exclude states from swapping.
 * 1.1 - Fixed buff bug.
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
Imported.DreamX_SwapStates = true;
var DreamX = DreamX || {};
DreamX.SwapStates = DreamX.SwapStates || {};

(function () {

    Game_BattlerBase.prototype.DreamXGetStateTurns = function () {
        return this._stateTurns;
    };

    Game_BattlerBase.prototype.DreamXSwapStates = function (states, stateTurns) {
        var battler = this;
        this.clearStates();
        states.forEach(function (id) {
            battler._stateTurns[id] = stateTurns;
            battler.addState(id);
        });
    };

    Game_BattlerBase.prototype.DreamXSwapBuffs = function (buffs, buffTurns) {
        this._buffs = buffs;
        this._buffTurns = buffTurns;
    };

    Game_BattlerBase.prototype.DreamXGetBuffs = function (swapStateTurns) {
        return this._buffs;
    };

    Game_BattlerBase.prototype.DreamXGetBuffTurns = function (swapStateTurns) {
        return this._buffTurns;
    };

    DreamX.SwapStates.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        DreamX.SwapStates.Game_Action_apply.call(this, target);
        var item = this.item();
        if (item.meta.swapStates) {
            DreamX.SwapStates.SwapStates(this.subject(), target);
        }
        if (item.meta.swapBuffs) {
            DreamX.SwapStates.SwapBuffsDebuffs(this.subject(), target);
        }
    };

    DreamX.SwapStates.SwapStates = function (subject, target) {
        var statesForSubject = [];
        var statesForTarget = [];
        var stateTurnsForSubject = target.DreamXGetStateTurns();
        var stateTurnsForTarget = subject.DreamXGetStateTurns();

        subject.states().forEach(function (state) {
            if (!state.meta.noSwap) {
                statesForTarget.push(state.id);
            }
            else {
                statesForSubject.push(state.id);
            }
        });
        target.states().forEach(function (state) {
            if (!state.meta.noSwap) {
                statesForSubject.push(state.id);
            }
            else {
                statesForTarget.push(state.id);
            }
        });
        subject.DreamXSwapStates(statesForSubject, stateTurnsForSubject);
        target.DreamXSwapStates(statesForTarget, stateTurnsForTarget);
    };

    DreamX.SwapStates.SwapBuffsDebuffs = function (subject, target) {
        var subjectBuffs = subject.DreamXGetBuffs();
        var subjectBuffTurns = subject.DreamXGetBuffTurns();
        var targetBuffs = target.DreamXGetBuffs();
        var targetBuffTurns = target.DreamXGetBuffTurns();
        subject.clearBuffs();
        target.clearBuffs();

        subject.DreamXSwapBuffs(targetBuffs, targetBuffTurns);
        target.DreamXSwapBuffs(subjectBuffs, subjectBuffTurns);
    };

})();
