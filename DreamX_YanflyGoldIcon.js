/*:
 * @plugindesc v1.0 Replace gold icon based on eval.
 * @author DreamX
 * 
 * @param Icon
 * @desc Processed as eval. Default: 313
 * @default 313
 * 
 * @help
 * 
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * This is an extension plugin for Yanfly's Core Engine. You must credit them 
 * as well.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly
 */

var Imported = Imported || {};
Imported.DreamX_YanflyGoldIcon = true;

var DreamX = DreamX || {};
DreamX.YanflyGoldIcon = DreamX.YanflyGoldIcon || {};

Yanfly.Icon = Yanfly.Icon || {};

(function () {
    DreamX.Parameters = PluginManager.parameters('DreamX_YanflyGoldIcon');

    DreamX.YanflyGoldIcon.Window_Base_drawCurrencyValue = Window_Base.prototype.drawCurrencyValue;
    Window_Base.prototype.drawCurrencyValue = function (value, unit, wx, wy, ww) {
        Yanfly.Icon.Gold = eval(DreamX.Parameters['Icon']) || 0;
        DreamX.YanflyGoldIcon.Window_Base_drawCurrencyValue.call(this, value, unit, wx, wy, ww);
    };

})();
