/*:
 * @plugindesc
 * @author DreamX
 *
 * @param Show ATB Bar For Actor SV Sprites
 * @desc Eval. Default: true
 * @default true
 *
 * @help
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly for ATB plugin
 */

var Imported = Imported || {};
Imported.DreamX_Ext_YEP_ATB = true;

var DreamX = DreamX || {};
DreamX.Ext_YEP_ATB = DreamX.Ext_YEP_ATB || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Ext_YEP_ATB');
    var paramShowActorAtb = String(parameters['Show ATB Bar For Actor SV Sprites']);



    if (Imported.YEP_X_VisualATBGauge) {
        DreamX.Ext_YEP_ATB.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
        DataManager.isDatabaseLoaded = function () {
            if (!DreamX.Ext_YEP_ATB.DataManager_isDatabaseLoaded.call(this))
                return false;
            if (!DreamX._loaded_YEP_X_VisualATBGauge) {
                this.processVATBNotetags1($dataActors);
                DreamX._loaded_YEP_X_VisualATBGauge = true;
            }
            return true;
        };

        Game_Actor.prototype.atbGaugeWidth = function () {
            if (this.actor().hpGaugeWidth > 0) {
                var width = this.actor().hpGaugeWidth;
            } else {
                var width = this.spriteWidth();
            }
            width = Math.max(width, Yanfly.Param.VATBMinWidth);
            return (width & 1) ? width + 1 : width;
        };

        Game_Actor.prototype.showATBGauge = function () {
            return this.actor().showATBGauge;
        };


        DreamX.Ext_YEP_ATB.Sprite_Actor_update = Sprite_Actor.prototype.update;
        Sprite_Actor.prototype.update = function () {
            DreamX.Ext_YEP_ATB.Sprite_Actor_update.call(this);
            if (eval(paramShowActorAtb)) {
                this.addVisualATBWindow();
            }
        };

        DreamX.Ext_YEP_ATB.Sprite_Actor_preSpriteInitialize = Sprite_Actor.prototype.preSpriteInitialize;
        Sprite_Actor.prototype.preSpriteInitialize = function (battler) {
            DreamX.Ext_YEP_ATB.Sprite_Actor_preSpriteInitialize.call(this, battler);
            if (eval(paramShowActorAtb)) {
                this.createVisualATBWindow();
            }

        };

        Sprite_Actor.prototype.addVisualATBWindow = function () {
            Sprite_Enemy.prototype.addVisualATBWindow.call(this);
        };

        Sprite_Actor.prototype.createVisualATBWindow = function () {
            Sprite_Enemy.prototype.createVisualATBWindow.call(this);
        };

        DreamX.Ext_YEP_ATB.Sprite_Enemy_setBattler = Sprite_Actor.prototype.setBattler;
        Sprite_Actor.prototype.setBattler = function (battler) {
            DreamX.Ext_YEP_ATB.Sprite_Enemy_setBattler.call(this, battler);
            if (this._visualATBWindow)
                this._visualATBWindow.setBattler(battler);
        };
    }


})();
