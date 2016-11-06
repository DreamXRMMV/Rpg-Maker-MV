/*:
 * @plugindesc v1.0
 * @author DreamX
 * 
 * @param Json Filename
 * @desc The filename for the json file. Do not include file type. Default: DreamX_MultipleEquipTypeSlot
 * @default DreamX_MultipleEquipTypeSlot
 * 
 * @param Json Folder
 * @desc The folder where the json is. Leave blank for root folder. Default: data/
 * @default data/
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * See example Json. The number corresponds to equipment type. Set 
 * AllowWeapons in the entry to true.
 * 
 * This will allow you to equip weapons in slots normally reserved for armor.
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
Imported.DreamX_MultipleEquipTypeSlot = true;

var DreamX = DreamX || {};
DreamX.MultipleEquipTypeSlot = DreamX.MultipleEquipTypeSlot || {};

DreamX.Parameters = PluginManager.parameters('DreamX_MultipleEquipTypeSlot');
DreamX.Param = DreamX.Param || {};

DreamX.Param.MultiEquipTypeSlotJsonFolder = String(DreamX.Parameters['Json Folder']);
DreamX.Param.MultiEquipTypeSlotJsonFilename = String(DreamX.Parameters['Json Filename']);

DreamX.MultipleEquipTypeSlot.Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function () {
    if (!DreamX.MultipleEquipTypeSlot.loaded) {
        return false;
    }
    return DreamX.MultipleEquipTypeSlot.Scene_Boot_isReady.call(this);
};

DreamX.MultipleEquipTypeSlot.dataFileName = function () {
    return DreamX.Param.MultiEquipTypeSlotJsonFolder + DreamX.Param.MultiEquipTypeSlotJsonFilename + ".json";
};

// thanks to Iavra
DreamX.MultipleEquipTypeSlot.loadData = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
        callback(JSON.parse(request.response));
    };
    request.onerror = function () {
        throw new Error("There was an error loading the file '" + url + "'.");
        DreamX.MultipleEquipTypeSlot.loaded = true;
    };
    request.send();
};

DreamX.MultipleEquipTypeSlot.callback = function (data) {
    DreamX.MultipleEquipTypeSlot.loaded = true;

    DreamX.MultipleEquipTypeSlot.Data = data;
};

DreamX.MultipleEquipTypeSlot.Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
    DreamX.MultipleEquipTypeSlot.Elements = {};
    DreamX.MultipleEquipTypeSlot.Scene_Boot_create.call(this);
    DreamX.MultipleEquipTypeSlot.loaded = false;
    DreamX.MultipleEquipTypeSlot.loadData(DreamX.MultipleEquipTypeSlot.dataFileName(),
            DreamX.MultipleEquipTypeSlot.callback);
};

Game_Actor.prototype.DXMultipleEquipTypeSlotCanEquipType = function (slotId, item) {
    var slot = this.equipSlots()[slotId];
    var jsonData = DreamX.MultipleEquipTypeSlot.Data[slot];
    if (jsonData) {
        var allowWeapons = jsonData.AllowWeapons;
        if (allowWeapons && eval(allowWeapons) && DataManager.isWeapon(item)) {
            return true;
        }
        if (jsonData.ExtraAllowedArmorTypes) {

        }
    }
    return slot === item.etypeId;
};

Window_EquipItem.prototype.includes = function (item) {
    if (item === null) {
        return true;
    }
    var actor = this._actor;
    if (!actor) {
        return false;
    }
    if (this._slotId < 0 || !actor.DXMultipleEquipTypeSlotCanEquipType(this._slotId, item)) {
        return false;
    }
    return this._actor.canEquip(item);
};



Game_Actor.prototype.changeEquip = function (slotId, item) {
    if (this.tradeItemWithParty(item, this.equips()[slotId]) &&
            (!item || this.DXMultipleEquipTypeSlotCanEquipType(slotId, item))) {
        this._equips[slotId].setObject(item);
        this.refresh();
    }
};

Game_Actor.prototype.releaseUnequippableItems = function (forcing) {
    for (; ; ) {
        var slots = this.equipSlots();
        var equips = this.equips();
        var changed = false;
        for (var i = 0; i < equips.length; i++) {
            var item = equips[i];
            if (item && (!this.canEquip(item) || !this.DXMultipleEquipTypeSlotCanEquipType(i, item))) {
                if (!forcing) {
                    this.tradeItemWithParty(null, item);
                }
                this._equips[i].setObject(null);
                changed = true;
            }
        }
        if (!changed) {
            break;
        }
    }
};