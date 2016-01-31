/*:
 * @plugindesc Save target id to a variable
 *
 * <DreamX Save Target>
 * @author DreamX
 *
 * @param Default Actor Target Variable
 * @desc The default variable to store the id of an actor when they're targeted. Use -1 to disable. Default: -1
 * @default -1
 * 
 * @param Default Enemy Target Variable
 * @desc The default variable to store the id of an enemy when they're targeted. Use -1 to disable. Default: -1
 * @default -1
 *
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * How To Use
 * ============================================================================
 Put <saveTarget:1> in the notetag for a skill or item. If you want to use a 
 variable other than what was set in the plugin parameters, use <actorVariable:x>
 or <enemyVariable:x> for actor or enemy targets respectively, with x being the
 variable id. If the skill or item is successful then the id of the target will
 be stored in their respective variable.
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
    var parameterActorVariable = parseInt(parameters['Default Actor Target Variable']
            || '-1');
    var parameterEnemyVariable = parseInt(parameters['Default Enemy Target Variable']
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
        var actorVariable = item.meta.actorVariable || parameterActorVariable;
        var enemyVariable = item.meta.enemyVariable || parameterEnemyVariable;
        
        // check if in the database the item has the notetag saveTarget
        if (item.meta.saveTarget) {
            // check if the target is an enemy and enemy variable id is valid
            if (target.isEnemy() && enemyVariable >= 1) {
                // set the variable to the enemy's id
                $gameVariables.setValue(enemyVariable, target.enemyId());
            }
            // if the target isn't an enemy, it's an actor. but we still need to
            // check if the variable id is correct
            else if (actorVariable >= 1) {
                // store actor id to variable
                $gameVariables.setValue(actorVariable, target.actorId());
            }
        }
    };

})();
