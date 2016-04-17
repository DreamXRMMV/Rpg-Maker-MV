/*:
 * @plugindesc v1.0
 * @author DreamX
 * @help
 * 
 * @param Damage TP Limit
 * @desc Maximum TP gained from being attacked. Default: 5
 * @default 5
 * 
 * ===========================================================================
 * Terms Of Use
 * ===========================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ===========================================================================
 * Credits
 * ===========================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_DamageTPLimit = true;

var DreamX = DreamX || {};
DreamX.DamageTPLimit = DreamX.DamageTPLimit || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_DamageTPLimit');
    var maxDamageTP = parseInt(parameters['Damage TP Limit']
            || 0);

    var DXSRDTPParameters = PluginManager.parameters('SRD_TPUpgrade');
    var SRDActive = Object.keys(DXSRDTPParameters).length > 1 ? true : false;
    if (SRDActive === true) {
        Game_Actor.prototype.chargeTpByDamage = function (damageRate) {
            var value = Math.floor(50 * damageRate * this.tcr);

            if (value > maxDamageTP) {
                value = maxDamageTP;
            }
            if (TPGainfromDamage && !this.hasRestrictTPGainDamage())
            {
                this.gainSilentTp(value);
            }
        };
    } else {
        Game_Battler.prototype.chargeTpByDamage = function (damageRate) {
            var value = Math.floor(50 * damageRate * this.tcr);

            if (value > maxDamageTP) {
                value = maxDamageTP;
            }
            this.gainSilentTp(value);
        };
    }


})();
