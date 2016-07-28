/*:
 * @plugindesc
 * @author DreamX
 * 
 * @param Item ID
 * @desc 
 * @default 
 * 
 * 
 * @help
 * 
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
Imported.DreamX_ThroughItem = true;

var DreamX = DreamX || {};
DreamX.ThroughItem = DreamX.ThroughItem || {};

var parameters = PluginManager.parameters('DreamX_ThroughItem');

var paramItemId = parseInt(parameters['Item ID'] || 0);

DreamX.ThroughItem.Game_Player_isThrough = Game_Player.prototype.isThrough;
Game_Player.prototype.isThrough = function () {
    if ($gameParty.hasItem($dataItems[paramItemId])) {
        return true;
    }
    return DreamX.ThroughItem.Game_Player_isThrough.call(this);
};