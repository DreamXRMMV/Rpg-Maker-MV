/*:
 * @plugindesc v1.01 Auto equip an item on unequip.
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 Notetags go into an actor's notes.

 Put <unequipWeapon:x> with x being the weapon id to equip when unequipping a
 weapon.
 Put <UnequipArmor: x y> with x being the armor slot ID (see Equipment Types
 under Types in the database) and y being the id of the armor to equip when that
 armor slot ID is unequipped. You can put more than one of these in the notes for
 an actor, but be sure to do only one per line.
 
 The player cannot gain duplicates of the auto equipment by
 equipping/unequipping.
 
 You will still need to choose an actor's initial equipment, this plugin only
 affects when they manually unequip/equip something.
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
Imported.DreamX_AutoEquipOnEmpty = true;

var DreamX = DreamX || {};
DreamX.AutoEquipOnEmpty = DreamX.AutoEquipOnEmpty || {};

(function () {

    DreamX.AutoEquipOnEmpty.getAutoEquipArmorID = function (dataActor, slotID) {
        var correctTags = dataActor.note.split("\n").filter(function (note) {
            return note.match("\<unequipArmor: [0-9]{1,} [0-9]{1,}\>");
        });

        var map = {};

        for (i = 0; i < correctTags.length; i++) {
            var typeId = correctTags[i].split(" ")[1];
            var equipId = correctTags[i].split(" ")[2].replace(">", "");
            map[typeId] = equipId;
        }

        return map[slotID] ? map[slotID] : 0;
    };

    DreamX.AutoEquipOnEmpty.checkIfTagsExist = function (dataActor) {
        if (dataActor.meta.unequipWeapon || dataActor.meta.unequipArmor) {
            return true;
        }
        return false;
    };

    DreamX.AutoEquipOnEmpty.Game_Actor_changeEquip = Game_Actor.prototype.changeEquip;
    Game_Actor.prototype.changeEquip = function (slotId, item) {
        // actor in database
        var dataActor = $dataActors[this.actorId()];
        // previously equipped item
        var oldItem = this.equips()[slotId];
        // 
        var equipID;
        var newItem;

        // call original function
        DreamX.AutoEquipOnEmpty.Game_Actor_changeEquip.call(this, slotId, item);

        // if there are no correct notetags present, return
        if (!DreamX.AutoEquipOnEmpty.checkIfTagsExist(dataActor))
            return;

        // if actor didn't unequip something, return
        if (!oldItem) return;

        if (oldItem.wtypeId) {
            equipID = dataActor.meta.unequipWeapon ? dataActor.meta.unequipWeapon.trim() : 0;
        }
        else {
			// get equip ID. Add 1 to slotId since everything starts at 0 in the array, 
			// but starts at 1 in the database
			equipID = DreamX.AutoEquipOnEmpty.getAutoEquipArmorID(dataActor, slotId + 1);
        }

        newItem = oldItem.wtypeId ? $dataWeapons[equipID] : $dataArmors[equipID];

        // if new item not valid, return
        if (!newItem)
            return;

        // if slot empty
        if (!(this.equips()[slotId])) {
			// if actor tried to unequip (not switch) auto equip item, don't give them
			// another one
            if (oldItem != newItem) {
                $gameParty.gainItem(newItem, 1);
            }
			this.changeEquip(slotId, newItem);
        }
        else {
            // if not empty remove the auto equip item
            $gameParty.gainItem(newItem, -1);
        }
    };

})();
