/*:
 * @plugindesc
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * 
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_ForthRightJPLevels = true;

var DreamX = DreamX || {};
DreamX.ForthRightJPLevels = DreamX.ForthRightJPLevels || {};

DreamX.Parameters = PluginManager.parameters('DreamX_ForthRightJPLevels');
DreamX.Param = DreamX.Param || {};

Window_Base.prototype.drawActorClass = function (actor, x, y, width) {
    width = width || 168;
    this.resetTextColor();

    var className = actor.currentClass().name;
    this.drawText(actor.currentClass().name, x, y, width);
    this.changeTextColor(this.systemColor());
    
    var textWidth = this.textWidth(className);
    var levelText = " Lv ";
    
    // change x addition
    this.drawText(levelText, x + textWidth + this.textPadding(), y, width);
    
    textWidth += this.textWidth(levelText);
    
    // change x addition
    this.resetTextColor();
    this.drawText(actor.jpLevel(actor.currentClass().id), x + textWidth + this.textPadding(), y, width);
};