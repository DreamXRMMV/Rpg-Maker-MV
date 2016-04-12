/*:
 * @plugindesc 1.0 Add price to weapons/armor based on bonus parameters.
 * @author DreamX
 * 
 * @param Multiplier
 * @desc Multiply each paramater point by this amount to add to the price. Default: 10
 * @default 10
 * 
 * @help
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
Imported.DreamX_PriceParam = true;

var DreamX = DreamX || {};
DreamX.PriceParam = DreamX.PriceParam || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_PriceParam');
    var paramMultiplier = parseInt(parameters['Multiplier'] || 10);

    DreamX.PriceParam.Scene_Boot_isReady = Scene_Boot.prototype.isReady
    Scene_Boot.prototype.isReady = function () {
        if (!DreamX.PriceParam.Scene_Boot_isReady.call(this))
            return false;
        if (!DreamX.PriceParam.loaded) {
            DreamX.PriceParam.addPrice($dataWeapons);
            DreamX.PriceParam.addPrice($dataArmors);
            DreamX.PriceParam.loaded = true;
        }

        return true;
    };

    DreamX.PriceParam.addPrice = function (dataType) {
        for (var i = 0; i < dataType.length; i++) {
            var item = dataType[i];
            if (!item)
                continue;
            var bonusStatCount = 0;
            for (var j = 0; j < item.params.length; j++) {
                bonusStatCount += item.params[j];
            }

            item.price += bonusStatCount * paramMultiplier;
        }
    };

})();
