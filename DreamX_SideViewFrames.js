/*:
 * @plugindesc v1.3 Configure the number of frames and frame speed for SV.
 *
 * <DreamX Actor Sideview Frames>
 * @author DreamX
 * 
 * @param Frame Number
 * @desc Number of frames for each motion for actors. Default: 3
 * @default 3
 *
 * @param Frame Speed
 * @desc Speed of motions for actors. Default: 12
 * @default 12
 *
 * @param ---Compatibility---
 * @default
 * 
 * @param Yanfly Enemy SV Frame Number
 * @desc Number of frames for each motion. Default: 3
 * @default 3
 * 
 * @help
 * Use <SVFrames:x> with x as the number for frames to override the parameter 
 * for an enemy or actor.
 * Use <SVFrameSpeed:x> with x as the number of frame speed to override the 
 * parameter for an actor.
 * Use <holders:1> to configure the enemy or actor to use holder style 
 * spritesheets(4 frames, 14 motions vertically).
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Compatibility
 * ============================================================================
 * Place this plugin under Yanfly's Animated Sideview Enemies if you want to
 * configure enemy SV frame number.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_SideviewFrames = true;

var DreamX = DreamX || {};
DreamX.SideviewFrames = DreamX.SideviewFrames || {};

(function () {
//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX Actor Sideview Frames>');
    })[0].parameters; //Thanks to Iavra

    var paramActorFrames = parseInt(parameters['Frame Number'] || '3');
    var paramActorFrameSpeed = parseInt(parameters['Frame Speed'] || '12');
    var paramEnemyFrames = parseInt(parameters['Yanfly Enemy SV Frame Number'] || '3');
    var holdersFrameCount = 4;
    var holdersMotionCount = 14;

    Sprite_Actor.MOTIONS_HOLDERS = {
        walk: {index: 0, loop: true},
        wait: {index: 0, loop: true},
        chant: {index: 0, loop: true},
        guard: {index: 1, loop: true},
        damage: {index: 3, loop: false},
        evade: {index: 9, loop: false},
        thrust: {index: 4, loop: false},
        swing: {index: 4, loop: false},
        missile: {index: 4, loop: false},
        skill: {index: 6, loop: false},
        spell: {index: 7, loop: false},
        item: {index: 5, loop: false},
        escape: {index: 9, loop: true},
        victory: {index: 10, loop: true},
        dying: {index: 2, loop: true},
        abnormal: {index: 2, loop: true},
        sleep: {index: 12, loop: true},
        dead: {index: 12, loop: true}
    };

    DreamX.SideviewFrames.Sprite_Battler_initMembers
            = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        DreamX.SideviewFrames.Sprite_Battler_initMembers.call(this);
        this._reverseFrame = false;
    };

    Sprite_Battler.prototype.DXBattlerMeta = function () {
        return this._battler.isActor()
                ? $dataActors[this._battler.actorId()].meta
                : $dataEnemies[this._battler.enemyId()].meta;
    }

    Sprite_Battler.prototype.DXisHolders = function () {
        return this.DXBattlerMeta().holders ? true : false;
    };

    Sprite_Battler.prototype.motions = function () {
        if (this.DXisHolders() === true) {
            return Sprite_Actor.MOTIONS_HOLDERS;
        } else {
            return Sprite_Actor.MOTIONS;
        }
    };

    Sprite_Battler.prototype.DXStartMotion = function (motionType) {
        var newMotion = this.motions()[motionType];
        if (this._motion !== newMotion) {
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        }
    };
    // override
    Sprite_Actor.prototype.startMotion = function (motionType) {
        this.DXStartMotion(motionType);
    };

    Sprite_Battler.prototype.DXNumFrames = function () {
        if (this.DXisHolders())
            return 4;
        if (this.DXBattlerMeta().SVFrames) {
            battlerFrames = parseInt(this.DXBattlerMeta().SVFrames);
        } else {
            battlerFrames = this._battler.isActor() ? paramActorFrames
                    : paramEnemyFrames;
        }

        return battlerFrames;
    }

// override
    Sprite_Battler.prototype.DXUpdateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            var cw = this.DXisHolders() === false
                    ? bitmap.width / (this.DXNumFrames() * 3)
                    : bitmap.width / this.DXNumFrames();
            var ch = this.DXisHolders() === false ? bitmap.height / 6
                    : bitmap.height / holdersMotionCount;
            var cx = this.DXisHolders() === false
                    ? Math.floor(motionIndex / 6) * this.DXNumFrames()
                    + this._pattern
                    : this._pattern;
            var cy = this.DXisHolders() === false ? motionIndex % 6
                    : motionIndex;
            //console.log(cy * ch);

            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_Actor.prototype.updateFrame = function () {
        this.DXUpdateFrame();
    };

    Sprite_Battler.prototype.DXupdateMotionCount = function () {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                if (this._reverseFrame === false) {
                    this._pattern++;
                } else if (this._pattern >= 1) {
                    this._pattern--;
                }

                if (this.DXNumFrames() - 1 === this._pattern) {
                    this._reverseFrame = true;
                } else if (this._pattern === 0) {
                    this._reverseFrame = false;
                }
            } else if (this._pattern < this.DXNumFrames() - 1) {
                this._pattern++;
            } else {
                this.refreshMotion();
            }
            this._motionCount = 0;
        }
    };

    // override
    Sprite_Actor.prototype.updateMotionCount = function () {
        this.DXupdateMotionCount();
    };

    Sprite_Actor.prototype.motionSpeed = function () {
        // change: check for notetag or param
        var frameSpeed = this.DXBattlerMeta().SVFrameSpeed
                ? this.DXBattlerMeta().SVFrameSpeed : paramActorFrameSpeed;
        return frameSpeed;
    };

    Sprite_Battler.prototype.DXrefreshMotion = function () {
        var battler = this._battler;
        var motionGuard = this.motions()['guard'];
        if (battler) {
            if (this._motion === motionGuard && !BattleManager.isInputting()) {
                return;
            }
            var stateMotion = battler.stateMotionIndex();
            if (battler.isInputting() || battler.isActing()) {
                this.startMotion('walk');
            } else if (stateMotion === 3) {
                this.startMotion('dead');
            } else if (stateMotion === 2) {
                this.startMotion('sleep');
            } else if (battler.isChanting()) {
                this.startMotion('chant');
            } else if (battler.isGuard() || battler.isGuardWaiting()) {
                this.startMotion('guard');
            } else if (stateMotion === 1) {
                this.startMotion('abnormal');
            } else if (battler.isDying()) {
                this.startMotion('dying');
            } else if (battler.isUndecided()) {
                this.startMotion('walk');
            } else {
                this.startMotion('wait');
            }
        }
    };
    //override
    Sprite_Actor.prototype.refreshMotion = function () {
        this.DXrefreshMotion();
    };

    if (Imported.YEP_BattleEngineCore) {
        Sprite_Actor.prototype.forceMotion = function (motionType) {
            var newMotion = this.motions()[motionType];
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
        };
        Sprite_Battler.prototype.DXrefreshMotion = function () {
            var battler = this._battler;
            if (!battler)
                return;
            var motionGuard = this.motions()['guard'];
            if (this._motion === motionGuard && !BattleManager.isInputting())
                return;
            var stateMotion = battler.stateMotionIndex();
            if (battler.isInputting() || battler.isActing()) {
                this.startMotion(battler.idleMotion());
            } else if (stateMotion === 3) {
                this.startMotion(battler.deadMotion());
            } else if (stateMotion === 2) {
                this.startMotion(battler.sleepMotion());
            } else if (battler.isChanting()) {
                this.startMotion(battler.chantMotion());
            } else if (battler.isGuard() || battler.isGuardWaiting()) {
                this.startMotion(battler.guardMotion());
            } else if (stateMotion === 1) {
                this.startMotion(battler.abnormalMotion());
            } else if (battler.isDying()) {
                this.startMotion(battler.dyingMotion());
            } else if (battler.isUndecided()) {
                this.startMotion(battler.idleMotion());
            } else {
                this.startMotion(battler.waitMotion());
            }
        };
    }

    if (Imported.YEP_X_AnimatedSVEnemies) {
        // override
        Sprite_Enemy.prototype.updateSVFrame = function () {
            this.DXUpdateFrame();
            var bitmap = this._mainSprite.bitmap;
            if (bitmap) {
                this.adjustMainBitmapSettings(bitmap);
                this.adjustSVShadowSettings();
            }
        };
        // override
        Sprite_Enemy.prototype.updateMotionCount = function () {
            if (!this._svBattlerEnabled)
                return;
            this.DXupdateMotionCount();
        };
        // override
        Sprite_Enemy.prototype.startMotion = function (motionType) {
            if (!this._svBattlerEnabled)
                return;
            this.DXStartMotion(motionType);
        };
        //override
        Sprite_Enemy.prototype.refreshMotion = function () {
            if (!this._svBattlerEnabled)
                return;
            this.DXrefreshMotion();
        }
        var max = 55;
        var count = 0;

        DreamX.SideviewFrames.Game_Battler_spriteWidth = Game_Battler.prototype.spriteWidth;
        Game_Battler.prototype.spriteWidth = function () {
            if (this.battler() && this.battler()._svBattlerEnabled === true) {


                if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
                    return this.battler()._mainSprite.width;
                } else if (this.battler()) {
                    return this.battler()._mainSprite.width;
                } else {
                    return 1;
                }
            }
            return DreamX.SideviewFrames.Game_Battler_spriteWidth.call(this);
        };

        DreamX.SideviewFrames.Game_Battler_spriteHeight = Game_Battler.prototype.spriteHeight;
        Game_Battler.prototype.spriteHeight = function () {
            if (this.battler() && this.battler()._svBattlerEnabled === true) {
                if ($gameSystem.isSideView() && this.battler() && this.battler().bitmap) {
                    return this.battler()._mainSprite.height;
                } else if (this.battler()) {
                    return this.battler()._mainSprite.height;
                } else {
                    return 1;
                }
            }
            return DreamX.SideviewFrames.Game_Battler_spriteHeight.call(this);
        };


    }

})();
