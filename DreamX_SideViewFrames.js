/*:
 * @plugindesc v1.0 Configure the number of frames and frame speed for SV.
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
Imported.DreamX_ActorSideviewFrames = true;

var DreamX = DreamX || {};
DreamX.ActorSideviewFrames = DreamX.ActorSideviewFrames || {};

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

    Sprite_Actor.prototype.updateFrame = function () {
        Sprite_Battler.prototype.updateFrame.call(this);
        // change: check for notetag or param
        var actorFrames = $dataActors[this._battler.actorId()].meta.SVFrames 
            ? parseInt($dataActors[this._battler.actorId()].meta.SVFrames) 
            : paramActorFrames;
            
        var bitmap = this._mainSprite.bitmap;
        if (bitmap) {
            var motionIndex = this._motion ? this._motion.index : 0;
            // change 3 to actorFrames
            var pattern = this._pattern < actorFrames ? this._pattern : 1;
            // change 9 to (actorFrames * 3)
            var cw = bitmap.width / (actorFrames * 3);
            var ch = bitmap.height / 6;
            // change 3 to actorFrames
            var cx = Math.floor(motionIndex / 6) * actorFrames + pattern;
            var cy = motionIndex % 6;
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch);
        }
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
            Sprite_Battler.prototype.updateFrame.call(this);
            // change: added check for param or notetag
            var enemyFrames = $dataEnemies[this._battler.enemyId()].meta.SVFrames
            ? parseInt($dataEnemies[this._battler.enemyId()].meta.SVFrames ) 
            : paramEnemyFrames;  
            
            var bitmap = this._mainSprite.bitmap;
            if (bitmap.width <= 0)
                return;
            this._effectTarget = this._mainSprite;
            var motionIndex = this._motion ? this._motion.index : 0;
            // change 3 to enemyFrames
            var pattern = this._pattern < enemyFrames ? this._pattern : 1;
            // change 9 to (enemyFrames * 3)
            var cw = bitmap.width / (enemyFrames * 3);
            var ch = bitmap.height / 6;
            // change 3 to enemyFrames
            var cx = Math.floor(motionIndex / 6) * enemyFrames + pattern;
            var cy = motionIndex % 6;
            var cdh = 0;
            if (this._effectType === 'bossCollapse') {
                cdh = ch - this._effectDuration;
            }
            this.setFrame(cx * cw, cy * ch, cw, ch);
            this._mainSprite.setFrame(cx * cw, cy * ch, cw, ch - cdh);
            this.adjustMainBitmapSettings(bitmap);
            this.adjustSVShadowSettings();
        };
    }



})();
