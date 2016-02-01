/*:
 * @plugindesc v1.1 Save target id to a variable
 *
 * <DreamX Save Target>
 * @author DreamX
 *
 * @param Default Actor ID Target Variable
 * @desc The default variable to store the id of an actor when they're targeted. Use -1 to disable. Default: -1
 * @default -1
 * 
 * @param Default Enemy ID Target Variable
 * @desc The default variable to store the id of an enemy when they're targeted. Use -1 to disable. Default: -1
 * @default -1
 
 * @param Default Enemy Slot Target Variable
 * @desc The default variable to store the battle slot of an enemy when they're targeted. Use -1 to disable. Default: -1
 * @default -1
 *
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * How To Use
 * ============================================================================
 Put <saveTarget:1> in the notetag for a skill or item. If you want to use a 
 variable other than what was set in the plugin parameters, use <actorIDVariable:x>
 or <enemyIDVariable:x> for actor or enemy targets respectively, with x being the
 variable id. Put <enemySlotVariable:x> to save the enemy slot. If the skill or 
 item is successful then the id/slot of the target will be stored in their 
 respective variable. 
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

//=============================================================================
// Import
//=============================================================================
// Set up import so other plugins can extend this one.
var Imported = Imported || {};
Imported.DreamX_SaveTarget = true;
var DreamX = DreamX || {};
DreamX.SaveTarget = DreamX.SaveTarget || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    // Get the parameter list by going through the plugins and checking if the
    // description has the specified text (which is in this case) 
    // <DreamX Save Target>
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX Save Target>');
    })[0].parameters; //Thanks to Iavra

    // store the parameter data in variables. The defaults are -1
    var parameterActorIDVariable = parseInt(parameters['Default Actor ID Target Variable']
            || '-1');
    var parameterEnemyIDVariable = parseInt(parameters['Default Enemy ID Target Variable']
            || '-1');
    var parameterEnemySlotVariable = parseInt(parameters['Default Enemy Slot Target Variable']
            || '-1');
    
    // Alias the Game_Action.prototype.applyItemUserEffect function
    DreamX.SaveTarget.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function (target) {
        // Call the original function.
        DreamX.SaveTarget.Game_Action_applyItemUserEffect.call(this, target);
        // After we called the original function, the rest of this alias 
        // function will occur

        // save the item (skill or item used) to variable
        var item = this.item();
        // store the variable id to save enemy/actor id to a variable. If the 
        // notetag is not present, it uses the plugin parameter
        var actorIDVariable = item.meta.actorIDVariable || parameterActorIDVariable;
        var enemyIDVariable = item.meta.enemyIDVariable || parameterEnemyIDVariable;
        var enemySlotVariable = item.meta.enemySlotVariable || parameterEnemySlotVariable;
        
        // check if in the database the item has the notetag saveTarget
        if (item.meta.saveTarget) {
            // check if the target is an enemy and enemy variable id is valid
            if (target.isEnemy()) {
				// set the variable to the enemy's id
				if (enemyIDVariable >= 1) $gameVariables.setValue(enemyIDVariable, target.enemyId());
				
				// set the variable to the enemy's id
				if (enemySlotVariable >= 1) $gameVariables.setValue(enemySlotVariable, $gameTroop.allMembers().indexOf(target));
            }
            // if the target isn't an enemy, it's an actor. but we still need to
            // check if the variable id is correct
            else if (actorIDVariable >= 1) {
                // store actor id to variable
                $gameVariables.setValue(actorIDVariable, target.actorId());
            }
        }
    };

})();
