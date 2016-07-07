/*:
 * @plugindesc v1.0
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Place <ItemLimit: x> with x as the limit as an item notetag.
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
Imported.DreamX_ItemLimit = true;

var DreamX = DreamX || {};
DreamX.ItemLimit = DreamX.ItemLimit || {};

(function () {
    DreamX.ItemLimit.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        if (item) {
            var limit = item.meta.ItemLimit;
            if (limit) {
                limit = parseInt(limit);
                var current = $gameParty.numItems(item);
                amount = Math.min(amount, limit - current);
            }
        }
        DreamX.ItemLimit.Game_Party_gainItem.call(this, item, amount, includeEquip);
    };
})();
