/*:
 * @plugindesc v1.1 Specify skill motion.
 * @author DreamX
 * @help
 You can use one of the following notetags on a skill:
 <OverrideMotion:x> with x as the motion to use for the skill. Does not include 
 weapon sprites.
 
 <WeaponMotion:1> to use the default attack motion, which is based on your 
 equipped weapon.

 <SpecificWeaponMotion:x> with x as the weapon type id (from the Types tab in 
 the database). It will use the weapon sprite and motion you specified for that 
 weapon type. You can check/set the motion and sprite in the System tab in the 
 database.
 
 Here is a list of the default motions:
 walk
 wait
 chant
 guard
 damage
 evade
 thrust
 swing
 missile
 skill
 spell
 item
 escape
 victory
 dying
 abnormal
 sleep
 dead
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_SkillMotion = true;

var DreamX = DreamX || {};
DreamX.SkillMotion = DreamX.SkillMotion || {};

(function () {
    DreamX.SkillMotion.Game_Actor_performAction = Game_Actor.prototype.performAction;
    Game_Actor.prototype.performAction = function (action) {
        if (action && action.item()) {
            var meta = action.item().meta;
            if (meta.OverrideMotion || meta.WeaponMotion || meta.SpecificWeaponMotion) {
                Game_Battler.prototype.performAction.call(this, action);
                if (meta.OverrideMotion) {
                    this.requestMotion(meta.OverrideMotion);
                } else if (meta.WeaponMotion) {
                    this.performAttack();
                } else if (meta.SpecificWeaponMotion) {
                    var attackMotion = $dataSystem.attackMotions[meta.SpecificWeaponMotion];
                    if (attackMotion) {
                        if (attackMotion.type === 0) {
                            this.requestMotion('thrust');
                        } else if (attackMotion.type === 1) {
                            this.requestMotion('swing');
                        } else if (attackMotion.type === 2) {
                            this.requestMotion('missile');
                        }
                        this.startWeaponAnimation(attackMotion.weaponImageId);
                    }
                }
                return;
            }
        }
        DreamX.SkillMotion.Game_Actor_performAction.call(this, action);
    };

})();
