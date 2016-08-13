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

    var text = actor.currentClass().name;

    this.drawText(text, x, y, width);

    this.changeTextColor(this.systemColor());

    text = text.replace(/./gi, " ");
    text += " Lv ";

    this.drawText(text, x, y, width);
    this.resetTextColor();

    text = text.replace(/./gi, " ");
    text += actor.jpLevel(actor.currentClass().id);
    this.drawText(text, x, y, width);
};