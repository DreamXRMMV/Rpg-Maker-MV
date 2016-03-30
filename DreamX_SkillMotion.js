/*:
 * @plugindesc v1.0 Specify skill motion.
 * @author DreamX
 * @help
 Put <OverrideMotion:x> with x as the motion to use for the skill. Or, use 
<WeaponMotion:1> to use the default weapon skill motion, like swing when you 
use a sword.

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
            if (action.item().meta.OverrideMotion || action.item().meta.WeaponMotion) {
                Game_Battler.prototype.performAction.call(this, action);
                if (action.item().meta.OverrideMotion) {
                    this.requestMotion(action.item().meta.OverrideMotion);
                }
                else if (action.item().meta.WeaponMotion) {
                    this.performAttack();
                }
                return;
            }
        }
        DreamX.SkillMotion.Game_Actor_performAction.call(this, action);
    };

})();
