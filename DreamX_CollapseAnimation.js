/*:
 * @plugindesc v1.0
 * @author DreamX
 * 
 * @param Default Collapse Animation
 * @desc The default animation id to play when enemies are defeated. Use 0 to disable. Default: 0
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

    var defaultCollapseAnimId = parseInt(parameters['Default Collapse Animation']
            || 0);
    //var defaultEscapeCollapse = String(parameters['Escape Collapse Type']);

    Game_Enemy.prototype.collapseAnimationId = function () {
        var doNotPlay = this._isEscapingDoNotPlayCustomCollapseAnim;
        if (doNotPlay && doNotPlay === true) {
            this._isEscapingDoNotPlayCustomCollapseAnim = false;
            return 0;
        }
        if (this.enemy().meta.CollapseAnimation) {
            return this.enemy().meta.CollapseAnimation;
        }
        return defaultCollapseAnimId;
    };

    DreamX.CollapseAnimation.Sprite_Enemy_startCollapse = Sprite_Enemy.prototype.startCollapse;
    Sprite_Enemy.prototype.startCollapse = function () {
        var animId = this._enemy.collapseAnimationId();

        if (!animId || animId <= 0) {
            return DreamX.CollapseAnimation.Sprite_Enemy_startCollapse.call(this);
        }
        var anim = $dataAnimations[animId];
        this._appeared = false;
        this._minimumCollapseAnimationWait = anim.frames.length;
        this._enemy.startAnimation(animId);
    };

    DreamX.CollapseAnimation.Sprite_Enemy_updateEffect = Sprite_Enemy.prototype.updateEffect;
    Sprite_Enemy.prototype.updateEffect = function () {
        DreamX.CollapseAnimation.Sprite_Enemy_updateEffect.call(this);
        if (this._minimumCollapseAnimationWait && this._minimumCollapseAnimationWait > 0) {
            this._minimumCollapseAnimationWait--;
        }
        if (this._minimumCollapseAnimationWait !== undefined
                && this._minimumCollapseAnimationWait === 0
                && !this.isAnimationPlaying()) {
            this._minimumCollapseAnimationWait = undefined;
            this.opacity = 0;
        }
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
