/*:
 * @plugindesc
 * @author DreamX
 *
 * @param Show ATB Bar For Actor SV Sprites
 * @desc Eval. Default: true
 * @default true
 * 
 * @param Charge ATB Per Tick
 * @desc Eval. Default: user.agi
 * @default user.agi
 *
 * @help
 * ============================================================================
 * Skill Notetags
 * ============================================================================
 * Use <ChargeState: x> with x as the state id to set a state applied to the 
 * battler while they are charging the skill.
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
    var paramChargeATBPerTick = String(parameters['Charge ATB Per Tick']);



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

    Game_Battler.prototype.updateATB = function () {
        if (this.isDead())
            return this.resetAllATB();

        // charge state
        var chargeStateId = this._chargeStateId;
        if (chargeStateId) {
            if (this.isATBCharging()) {
                if (!this.isStateAffected(chargeStateId)) {
                    this.addState(chargeStateId);
                }
            } else {
                this.removeState(chargeStateId);
            }
        }

        if (!this.canMove()) {
            this.updateATBStates();
            return;
        }
        if (this.isATBCharging()) {
            if (!this.currentAction())
                this.resetAllATB();
            if (this.currentAction() && this.currentAction().item() === null) {
                this.resetAllATB();
            }
        }

        if (this.isATBCharging()) {
            var value = this.atbCharge() + this.chargeAtbSpeedTick();
            this.setATBCharge(value);
        } else if (this.atbRate() < 1) {
            this.removeState
            var value = this.atbSpeed() + this.atbSpeedTick();
            this.setATBSpeed(value);
        }
    };

    Game_Battler.prototype.chargeAtbSpeedTick = function () {
        var value = this.ChargeAtbTickValue();
        if (BattleManager.atbRubberband()) {
            var min = BattleManager.atbMinimumSpeed();
            var max = BattleManager.atbMaximumSpeed();
            value = value.clamp(min, max);
        }
        return value * BattleManager.tickRate();
    };

    Game_Battler.prototype.ChargeAtbTickValue = function () {
        if (this._chargeAtbTickValue !== undefined)
            return this._chargeAtbTickValue;
        var a = this;
        var user = this;
        var subject = this;
        this._chargeAtbTickValue = eval(paramChargeATBPerTick);
        return this._chargeAtbTickValue;
    };

    DreamX.Ext_YEP_ATB.Game_BattlerBase_refresh = Game_BattlerBase.prototype.refresh;
    Game_BattlerBase.prototype.refresh = function () {
        DreamX.Ext_YEP_ATB.Game_BattlerBase_refresh.call(this);
        this._chargeAtbTickValue = undefined;
    };

    DreamX.Ext_YEP_ATB.Game_Battler_setupATBCharge = Game_Battler.prototype.setupATBCharge;
    Game_Battler.prototype.setupATBCharge = function () {
        DreamX.Ext_YEP_ATB.Game_Battler_setupATBCharge.call(this);
        if (this.currentAction() && this.currentAction().item()) {
            var chargeState = this.currentAction().item().meta.ChargeState;
            if (chargeState) {
                console.log("hi");
                this._chargeStateId = parseInt(chargeState.trim());
                return;
            }
        }
        this._chargeStateId = undefined;
    };

    DreamX.Ext_YEP_ATB.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        DreamX.Ext_YEP_ATB.Game_Action_apply.call(this, target);
        var item = this.item();
        var chargeState = item.meta.ChargeState;
        if (chargeState) {
            this.subject()._chargeStateId = parseInt(chargeState.trim());
        } else {
            this.subject()._chargeStateId = undefined;
        }
    };


})();
