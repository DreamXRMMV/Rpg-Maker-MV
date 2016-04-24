/*:
 * @plugindesc v1.2
 * @author DreamX
 *
 * @param Default Collapse Animation
 * @desc The default animation id to play when enemies are defeated. Use 0 to disable. Default: 0
 * @default 0
 *
 * @param Capture Collapse Animation
 * @desc Defeat animation to play when an enemy was captured. Default: 0
 * @default 0
 *
 * @help
 * Use <CollapseAnimation:x> with x as the animation id to define a collapse
 * animation for an enemy. The enemy will automatically disappear at the end
 * of the animation.
 *
 */

var Imported = Imported || {};
Imported.DreamX_CollapseAnimation = true;

var DreamX = DreamX || {};
DreamX.CollapseAnimation = DreamX.CollapseAnimation || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_CollapseAnimation');

    var paramDefaultCollapseAnimId = parseInt(parameters['Default Collapse Animation']
            || 0);
    var paramCaptureCollapseAnimId = parseInt(parameters['Capture Collapse Animation']
            || 0);
    
    Game_Enemy.prototype.collapseAnimationId = function () {
        var doNotPlay = this._isEscapingDoNotPlayCustomCollapseAnim;
        if (doNotPlay && doNotPlay === true) {
            this._isEscapingDoNotPlayCustomCollapseAnim = false;
            return 0;
        }
        if (this._wasCaptured === true
                || this._wasLevelUpCaptured === true) {
            return paramCaptureCollapseAnimId;
        }
        if (this.enemy().meta.CollapseAnimation) {
            return this.enemy().meta.CollapseAnimation;
        }
        return paramDefaultCollapseAnimId;
    };

    DreamX.CollapseAnimation.Game_Enemy_performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function () {
        if (this._isEscapingDoNotPlayCustomCollapseAnim === true 
                || this.collapseAnimationId() <= 0) {
            return DreamX.CollapseAnimation.Game_Enemy_performCollapse.call(this);
        }
        switch (this.collapseType()) {
            case 0:
                this.requestEffect('collapse');
                break;
            case 1:
                this.requestEffect('bossCollapse');
                break;
            case 2:
                this.requestEffect('instantCollapse');
                break;
        }
    };

    DreamX.CollapseAnimation.Sprite_Enemy_startCollapse = Sprite_Enemy.prototype.startCollapse;
    Sprite_Enemy.prototype.startCollapse = function () {
        var animId = this._enemy.collapseAnimationId();

        if (!animId || animId <= 0) {
            return DreamX.CollapseAnimation.Sprite_Enemy_startCollapse.call(this);
        }
        var anim = $dataAnimations[animId];
        this._appeared = false;
        this._effectDuration = anim.frames.length;
        this._effectType = null;
        this._minimumCollapseAnimationWait = anim.frames.length;
        this._enemy.startAnimation(animId);
    };

    DreamX.CollapseAnimation.Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
    Sprite_Enemy.prototype.updateEffect = function () {
        if (this._minimumCollapseAnimationWait !== undefined && this._minimumCollapseAnimationWait > 0) {
            this._minimumCollapseAnimationWait--;
            return;
        }
        if (this._minimumCollapseAnimationWait !== undefined
                && this._minimumCollapseAnimationWait === 0
                && !this.isAnimationPlaying()) {
            this._minimumCollapseAnimationWait = undefined;
            this.opacity = 0;
            return;
        }
        DreamX.CollapseAnimation.Sprite_Enemy_updateEffect.call(this);
    };

    DreamX.CollapseAnimation.Game_Battler_escape = Game_Battler.prototype.escape;
    Game_Battler.prototype.escape = function () {
        if (this.isEnemy() && $gameParty.inBattle()) {
            this._isEscapingDoNotPlayCustomCollapseAnim = true;
            this.hide();
            this.performCollapse();
            this.clearActions();
            this.clearStates();
            return;
        }
        DreamX.CollapseAnimation.Game_Battler_escape.call(this);
    };

})();
