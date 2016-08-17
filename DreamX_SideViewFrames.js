/*:
 * @plugindesc v1.7 Configure the number of frames and frame speed for SV.
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
 * @param Straight Loop
 * @desc If frames go 1-2-3-1-2-3 instead of 1-2-3-2-1. Default: false
 * @default false
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
 * Use <vertical> to configure the enemy or act to use vertical spritesheets.
 * Use <holders> to configure the enemy or actor to use holder style
 * spritesheets(4 frames, 14 motions vertically).
 *
 * Use <SVStraightLoop:true> on an actor or enemy to have a battler's frames
 * loop from 1-2-3-1-2-3 instead of 1-2-3-2-1, if the parameter Straight Loop
 * is false. This will override the parameter setting for that battler.
 * Use <SVStraightLoop:false> on an actor or enemy to have a battler's frames
 * loop from 1-2-3-2-1,if the parameter Straight Loop is true. This will
 * override the parameter setting for battler.
 *
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
    var paramStraightLoop = eval(parameters['Straight Loop'] || false);

    var holdersFrameCount = 4;
    var holdersMotionCount = 14;

    DreamX.SideviewFrames.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.SideviewFrames.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX.SideviewFramesLoaded) {
            this.processDXSVFBattlerNotetags($dataActors);
            this.processDXSVFBattlerNotetags($dataEnemies);
            DreamX.SideviewFramesLoaded = true;
        }
        return true;
    };

    DataManager.processDXSVFBattlerNotetags = function (data) {
        var evalMode = 'none';
        for (var i = 0; i < data.length; i++) {
            var battler = data[i];
            if (!battler)
                continue;
            battler.motionConfiguration = {};
            var notedata = battler.note.split(/[\r\n]+/);
            for (var j = 0; j < notedata.length; j++) {
                var line = notedata[j];

                if (line.match(/<(?:MOTION CONFIGURATION):(.*)>/i)) {
                    var motionType = String(RegExp.$1).trim().toLowerCase();
                    battler.motionConfiguration[motionType] = {};
                    evalMode = 'motion configuration';
                } else if (line.match(/<\/(?:MOTION CONFIGURATION)>/i)) {
                    evalMode = 'none';
                } else if (evalMode === 'motion configuration') {
                    this.processDXSVFBattlerLine(motionType, line, battler);
                }
            }

        }
    };

    DataManager.processDXSVFBattlerLine = function (motionType, line, battler) {
        var split = line.split(" ");
        var configType = split[0];
        var arg = split[1].toLowerCase();
        switch (configType) {
            case "speed":
                if (!battler.motionConfiguration[motionType].speed) {
                    battler.motionConfiguration[motionType].speed = [];
                }
                battler.motionConfiguration[motionType].speed.push(arg);
                break;
            case "is_loop":
                battler.motionConfiguration[motionType].isLoop = arg;
                break;
            case "loop_limit":
                battler.motionConfiguration[motionType].loopLimit = parseInt(arg);
                break;
        }
    };

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

    Game_Battler.prototype.DXNumFrames = function () {
        if (this.DXIsHolders()) {
            return 4;
        }
        if (this.isActor()) {
            return this.actor().meta.SVFrames ? this.actor().meta.SVFrames : paramEnemyFrames;
        }
        return this.enemy().meta.SVFrames ? this.enemy().meta.SVFrames : paramEnemyFrames;
    };

    Game_Battler.prototype.DXIsHolders = function () {
        var dataBattler = this.isActor() ? this.actor() : this.enemy();
        return dataBattler.meta.holders;
    };

    Sprite_Battler.prototype.DXIsHolders = function () {
        return this.DXBattlerMeta().holders ? true : false;
    };

    Sprite_Battler.prototype.DXIsVertical = function () {
        return this.DXBattlerMeta().vertical || this.DXIsHolders();
    };

    Sprite_Battler.prototype.DXIsStraightLoop = function () {
        if (this.DXBattlerMeta().straightLoop) {
            if (this.DXBattlerMeta().straightLoop.trim().match("true")) {
                return true;
            } else if (this.DXBattlerMeta().straightLoop.trim().match("false")) {
                return false;
            }
        }
        return paramStraightLoop;
    };

    Sprite_Battler.prototype.motions = function () {
        if (this.DXIsHolders() === true) {
            return Sprite_Actor.MOTIONS_HOLDERS;
        } else {
            return Sprite_Actor.MOTIONS;
        }
    };

    Sprite_Battler.prototype.configureMotion = function (motion) {
        var dataBattler = this._battler.isActor() ? this._battler.actor() : this._battler.enemy();
        var config = dataBattler.motionConfiguration[this._motionType];
        if (!config) {
            return;
        }
        var loopLimit = config.loopLimit;
        if (loopLimit) {
            this._loopLimit = loopLimit;
        }
        var isLoop = config.isLoop;
        if (isLoop) {
            this._isLoopMotion = eval(isLoop);
        }
    };



    Sprite_Battler.prototype.DXStartMotion = function (motionType) {
        var newMotion = this.motions()[motionType];


        if (this._motion !== newMotion) {
            this._motionType = motionType;
            this._motion = newMotion;
            this._motionCount = 0;
            this._pattern = 0;
            this._timesLooped = 0;
            this._loopLimit = false;
            this._isLoopMotion = undefined;

            this.configureMotion(this._motion);


            if (motionType === 'walk' && this.DXBattlerMeta().RandomStart) {
                this._pattern = Math.floor(Math.random() * this.DXNumFrames());
            }
        }
    };
    // override
    Sprite_Actor.prototype.startMotion = function (motionType) {
        this.DXStartMotion(motionType);
    };

    Sprite_Battler.prototype.DXNumFrames = function () {
        return this._battler.DXNumFrames();
    }

// override
    Sprite_Battler.prototype.DXUpdateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            var cw = this.DXIsVertical() === false
                    ? bitmap.width / (this.DXNumFrames() * 3)
                    : bitmap.width / this.DXNumFrames();
            var ch = this.DXIsVertical() === false ? bitmap.height / 6
                    : bitmap.height / holdersMotionCount;
            var cx = this.DXIsVertical() === false
                    ? Math.floor(motionIndex / 6) * this.DXNumFrames()
                    + this._pattern
                    : this._pattern;
            var cy = this.DXIsVertical() === false ? motionIndex % 6
                    : motionIndex;

            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_Actor.prototype.updateFrame = function () {
        this.DXUpdateFrame();
    };

    Sprite_Battler.prototype.specificMotionSpeed = function () {
        var dataBattler = this._battler.isActor() ? this._battler.actor() : this._battler.enemy();
        if (!dataBattler.motionConfiguration[this._motionType]) {
            return -1;
        }
        if (!dataBattler.motionConfiguration[this._motionType].speed) {
            return -1;
        }
        if (!dataBattler.motionConfiguration[this._motionType].speed[this._pattern]) {
            return -1;
        }

        var seconds = dataBattler.motionConfiguration[this._motionType].speed[this._pattern];
        return seconds * 60;
    };

    Sprite_Actor.prototype.motionSpeed = function () {
        var specificMotionSpeed = this.specificMotionSpeed();
        if (specificMotionSpeed !== -1) {
            return specificMotionSpeed;
        }
        var frameSpeed = this.DXBattlerMeta().SVFrameSpeed
                ? this.DXBattlerMeta().SVFrameSpeed : paramActorFrameSpeed;
        return frameSpeed;
    };

    DreamX.SideviewFrames.Sprite_Enemy_motionSpeed = Sprite_Enemy.prototype.motionSpeed;
    Sprite_Enemy.prototype.motionSpeed = function () {
        var specificMotionSpeed = this.specificMotionSpeed();
        if (specificMotionSpeed !== -1) {
            return specificMotionSpeed;
        }
        return DreamX.SideviewFrames.Sprite_Enemy_motionSpeed.call(this);
    };

    Sprite_Battler.prototype.isLoopMotion = function () {
        if (this._isLoopMotion !== undefined) {
            return this._isLoopMotion;
        }
        return this._motion.loop;
    };

    Sprite_Battler.prototype.DXupdateMotionCount = function () {
        var isLoop = this.isLoopMotion();
        if (this._motion && ++this._motionCount >= this.motionSpeed()
                && (!this._loopLimit
                        || this._timesLooped < this._loopLimit)) {
            if (isLoop && this.DXNumFrames() >= 2) {
                if (this.DXIsStraightLoop() === false) {
                    if (this._reverseFrame === false) {
                        this._pattern++;
                    } else if (this._pattern >= 1) {
                        this._pattern--;
                    }

                    if (this.DXNumFrames() - 1 === this._pattern) {
                        this._reverseFrame = true;
                        this._timesLooped++;
                    } else if (this._pattern === 0) {
                        this._reverseFrame = false;

                    }
                } else {
                    if (this._pattern === this.DXNumFrames() - 1) {
                        this._timesLooped++;
                        this._pattern = 0;
                    } else {
                        this._pattern++;
                    }
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
            } else if (!battler.isEnemy() && battler.isChanting()) {
                this.startMotion('chant');
            } else if (battler.isGuard() || battler.isGuardWaiting()) {
                this.startMotion('guard');
            } else if (stateMotion === 1) {
                this.startMotion('abnormal');
            } else if (battler.isDying()) {
                this.startMotion('dying');
            } else if (battler.isUndecided()) {
                this.startMotion('walk');
            } else if (battler.isActor()) {
                this.startMotion('wait');
            } else {
                this.startMotion(battler.idleMotion());
            }
        }
    };
    //override
    Sprite_Actor.prototype.refreshMotion = function () {
        this.DXrefreshMotion();
    };

    if (Imported.YEP_BattleEngineCore) {
        DreamX.SideviewFrames.Sprite_Actor_stepFlinch = Sprite_Actor.prototype.stepFlinch;
        Sprite_Actor.prototype.stepFlinch = function () {
            DreamX.SideviewFrames.Sprite_Actor_stepFlinch.call(this);
            var battler = this._battler;
            var frames = battler.DXNumFrames();
            var frameSpeed = this.motionSpeed();
            var waitTime = (frames * frameSpeed);
            BattleManager._logWindow._waitCount += waitTime;

        };


        BattleManager.actionMotionWait = function (actionArgs) {
            var targets = this.makeActionTargets(actionArgs[0]);
            if ((targets[0].isActor() && targets[0].isSpriteVisible())
                    || (Imported.YEP_X_AnimatedSVEnemies && targets[0].hasSVBattler())) {
                var battler = targets[0];
                var frames = battler.DXNumFrames();
                var frameSpeed = battler().motionSpeed();
                var waitTime = frames * frameSpeed;

                if (waitTime > 0) {
                    this._logWindow._waitCount += waitTime;
                }

                return false;
            }
            return true;
        };

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
            } else if (!battler.isEnemy() && battler.isChanting()) {
                this.startMotion(battler.chantMotion());
            } else if (battler.isGuard() || battler.isGuardWaiting()) {
                this.startMotion(battler.guardMotion());
            } else if (stateMotion === 1) {
                this.startMotion(battler.abnormalMotion());
            } else if (battler.isDying()) {
                this.startMotion(battler.dyingMotion());
            } else if (battler.isUndecided()) {
                this.startMotion(battler.idleMotion());
            } else if (battler.isActor()) {
                this.startMotion('wait');
            } else {
                this.startMotion(battler.idleMotion());
            }
        };
    }

    if (Imported.YEP_X_AnimatedSVEnemies) {
        Yanfly.SVE.Game_Enemy_performDamage = Game_Enemy.prototype.performDamage;
        Game_Enemy.prototype.performDamage = function () {
            if (!this.hasSVBattler()) {
                return Yanfly.SVE.Game_Enemy_performDamage.call(this);
            }
            Game_Battler.prototype.performDamage.call(this);
            if (this.isSpriteVisible()) {
                this.requestMotion(this.damageMotion());

                // new
                var frames = this.DXNumFrames();
                var frameSpeed = this.battler().motionSpeed();
                var waitTime = (frames * frameSpeed) - 12;
                if (waitTime > 0) {
                    BattleManager._logWindow._waitCount += waitTime;
                }

            } else {
                $gameScreen.startShake(5, 5, 10);
            }
            SoundManager.playEnemyDamage();
        };

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
