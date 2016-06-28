/*:
 * @plugindesc v1.0 Play unique sound effects when using items.
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Use these notetags in the notebox for items.
 * 
 * <UseSE: x> with x as the sound effect name.
 * 
 * <UseSEVol: x> with x as the volume. Optional, it will use the default item 
 * use volume if not specified.
 * <UseSEPan: x> with x as the pan. Optional, it will use the default item use 
 * pan if not specified.
 * <UseSEPitch: x> with x as the pitch. Optional, it will use the default item 
 * use pitch if not specified.
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
Imported.DreamX_ItemUseSE = true;

var DreamX = DreamX || {};
DreamX.ItemUseSE = DreamX.ItemUseSE  || {};

(function() {

DreamX.ItemUseSE.Scene_Item_playSeForItem = Scene_Item.prototype.playSeForItem;
Scene_Item.prototype.playSeForItem = function() {
    var item = this.item();
    var se = item.meta.UseSE;
    if (se !== undefined) {
        se = se.trim();
        
        var vol = item.meta.UseSEVol || $dataSystem.sounds[22].volume;
        vol = parseInt(vol);
        var pan = item.meta.UseSEPan || $dataSystem.sounds[22].pan;
        pan = parseInt(pan);
        var pitch = item.meta.UseSEPitch || $dataSystem.sounds[22].pitch;
        pitch = parseInt(pitch);
        
        var seObj = {name: se, pan: pan, pitch: pitch, volume: vol};
        AudioManager.playSe(seObj);
        return;
    }
    DreamX.ItemUseSE.Scene_Item_playSeForItem.call(this);
};

})();
