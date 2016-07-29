/*:
 * @plugindesc v1.0
 * @author DreamX
 * 
 * @param Popups Above Windows
 * @desc Whether to show popups above windows. Default: true
 * @default true
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * This is an extension for Victor Sant's Damage Popup plugin. It requires it 
 * and should be placed below it. It should also be placed under Yanfly's 
 * Battle Engine Core.
 * 
 * Do not change the filename for this plugin. It must be 
 * DreamX_Ext_VE_DamagePopup.js
 * 
 * This plugin will allow Victor Sant's plugin popups to appear when Yanfly's  
 * Battle Engine Core is used. It also has a parameter to display popups above 
 * windows.
 * ============================================================================
 * Tips
 * ============================================================================
 * Yanfly's Battle Status Window will allow you to display popups on the battle 
 * status window, when not using another plugin to change battle status window.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Victor Sant for the original plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Victor Sant and Yanfly for their plugins.
 */

var Imported = Imported || {};
Imported.DreamX_Ext_VE_DamagePopup = true;

var DreamX = DreamX || {};
DreamX.Ext_VE_DamagePopup = DreamX.Ext_VE_DamagePopup || {};

var parameters = PluginManager.parameters('DreamX_Ext_VE_DamagePopup');
var paramAboveWindows = String(parameters['Popups Above Windows']);

Game_Battler.prototype.isDamagePopupRequested = function () {
    if (!this._damagePopup)
        this.clearDamagePopup();
    return this._damagePopup || this._damagePopup.length > 0;
};

Game_Battler.prototype.shiftDamagePopup = function () {
    if (!this._damagePopup)
        this.clearDamagePopup();
    return this._damagePopup.shift() || this._damagePopup;
};

DreamX.Ext_VE_DamagePopup.Sprite_Battler_damagePopupSprite = Sprite_Battler.prototype.damagePopupSprite;
Sprite_Battler.prototype.damagePopupSprite = function (type, value) {
    DreamX.Ext_VE_DamagePopup.Sprite_Battler_damagePopupSprite.call(this, type,
            value);

    if (eval(paramAboveWindows)) {
        var thisSprite = this;
        this._damages.forEach(function (sprite) {
            thisSprite.parent.removeChild(sprite);

            SceneManager._scene.addChild(sprite);
        });
    }
};