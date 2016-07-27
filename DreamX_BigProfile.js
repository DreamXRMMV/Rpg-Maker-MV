/*:
 * @plugindesc
 * @author DreamX
 * 
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
Imported.DreamX_REPLACEME = true;

var DreamX = DreamX || {};
DreamX.REPLACEME = DreamX.REPLACEME || {};

var parameters = PluginManager.parameters('DreamX_REPLACEME');

Window_Status.prototype.refresh = function () {
    this.contents.clear();
    if (!this._actor) {
        return;
    }
    var lineHeight = this.lineHeight();
    this.drawBlock1(lineHeight * 0);
    this.drawHorzLine(lineHeight * 1);
    this.drawBlock4(lineHeight * 2);
};

Window_Status.prototype.drawProfile = function(x, y) {
    var newText = this._actor.profile().replace(/\\n/g, "\n");
    this.drawTextEx(newText, x, y);
};