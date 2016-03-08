/*:
 * @plugindesc v1.2 Configure the number of frames and frame speed for SV.
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

    DreamX.SideviewFrames.Sprite_Battler_initMembers
            = Sprite_Battler.prototype.initMembers;
    Sprite_Battler.prototype.initMembers = function () {
        DreamX.SideviewFrames.Sprite_Battler_initMembers.call(this);
        this._reverseFrame = false;
    };

    Sprite_Battler.prototype.DXNumFrames = function () {
        var dataBattlerMeta = this._battler.isActor()
                ? $dataActors[this._battler.actorId()].meta
                : $dataEnemies[this._battler.enemyId()].meta;

        if (dataBattlerMeta.SVFrames) {
            battlerFrames = parseInt(dataBattlerMeta.SVFrames);
        } else {
            battlerFrames = this._battler.isActor() ? paramActorFrames
                    : paramEnemyFrames;
        }

        return battlerFrames;
    }


    Sprite_Battler.prototype.DXUpdateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);

        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            var cw = bitmap.width / (this.DXNumFrames() * 3);
            var ch = bitmap.height / 6;
            var cx = Math.floor(motionIndex / 6) * this.DXNumFrames() + this._pattern;
            var cy = motionIndex % 6;
            console.log(motionIndex);
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
    };

    Sprite_Battler.prototype.DXupdateMotionCount = function () {
        if (this._motion && ++this._motionCount >= this.motionSpeed()) {
            if (this._motion.loop) {
                if (this._reverseFrame === false) {
                    this._pattern++;
                } else {
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

    Sprite_Actor.prototype.updateMotionCount = function () {
        this.DXupdateMotionCount();
    };

    Sprite_Actor.prototype.updateFrame = function () {
        this.DXUpdateFrame();
    };

    Sprite_Actor.prototype.motionSpeed = function () {
        // change: check for notetag or param
        var frameSpeed = $dataActors[this._battler.actorId()].meta.SVFrameSpeed
                ? parseInt($dataActors[this._battler.actorId()].meta.SVFrameSpeed)
                : paramActorFrameSpeed;
        return frameSpeed;
    };

    if (Imported.YEP_X_AnimatedSVEnemies) {
        Sprite_Enemy.prototype.updateSVFrame = function () {
            this.DXUpdateFrame();
            var bitmap = this._mainSprite.bitmap;
            if (bitmap) {
                this.adjustMainBitmapSettings(bitmap);
                this.adjustSVShadowSettings();
            }
        };

        Sprite_Enemy.prototype.updateMotionCount = function () {
            if (!this._svBattlerEnabled)
                return;
            this.DXupdateMotionCount();
        };
    }

})();
