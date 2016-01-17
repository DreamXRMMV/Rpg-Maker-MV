/*:
 * @plugindesc v1.1 Swap states and/or buffs on skill.
 * @author DreamX
 * @help Use <swapStates:1> as a skill notetag to swap states,
 * use <swapBuffs:1> as a skill notetag to swap buffs and debuffs
 * ============================================================================
 * Patch Notes
 * ============================================================================
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

    Game_BattlerBase.prototype.DreamXSwapStateTurns = function (swapStateTurns) {
        this._stateTurns = swapStateTurns;
    };
	
	Game_BattlerBase.prototype.DreamXSwapBuffs = function (buffs, buffTurns) {
        this._buffs = buffs;
		console.log(buffTurns);
		this._buffTurns = buffTurns;
		console.log(this._buffTurns);
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
        var subjectStates = subject.states();
        var subjectStateTurns = subject.DreamXGetStateTurns();
        var targetStates = target.states();
        var targetStateTurns = target.DreamXGetStateTurns();
        subject.clearStates();
        target.clearStates();

        subjectStates.forEach(function (state) {
            target.addState(state.id);
        });
        target.DreamXSwapStateTurns(subjectStateTurns);

        targetStates.forEach(function (state) {
            subject.addState(state.id);
        });
        subject.DreamXSwapStateTurns(targetStateTurns);
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
