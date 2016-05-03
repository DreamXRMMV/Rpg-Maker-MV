/*:
 * @plugindesc v1.00 Draws state overlays on enemy sprites in battle.
 * @author DreamX
 * @help
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

(function () {
    Sprite_Enemy.prototype.createStateSprite = function ()
    {
        this._stateSprite = new Sprite_StateOverlay();
        this.addChild(this._stateSprite);
    };

    Sprite_Enemy_prototype_setBattler = Sprite_Enemy.prototype.setBattler;
    Sprite_Enemy.prototype.setBattler = function (battler) {
        Sprite_Enemy_prototype_setBattler.call(this, battler);
        this._stateSprite.setup(battler);
    };

    if (!Imported.YEP_X_AnimatedSVEnemies) {
        Sprite_Enemy_prototype_initMembers = Sprite_Enemy.prototype.initMembers;
        Sprite_Enemy.prototype.initMembers = function () {
            Sprite_Enemy_prototype_initMembers.call(this);
            this.createStateSprite();
        };
    } else {
        Yanfly_SVE_Sprite_Enemy_setBattler = Yanfly.SVE.Sprite_Enemy_setBattler;
        Yanfly.SVE.Sprite_Enemy_setBattler = function (battler) {
            Yanfly_SVE_Sprite_Enemy_setBattler.call(this, battler);
            this.createStateSprite();
        };
    }
})();