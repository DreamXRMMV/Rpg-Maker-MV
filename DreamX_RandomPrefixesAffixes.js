/*:
 * @plugindesc v1.5 Random prefixes/affixes
 * @author DreamX
 * @help 
 * Add <prefix:x,y,z> and/or <affix:x,y,z> to a weapon/armor's note 
 * with the letters being weapon/armor ids. You can have as many ids
 * as you want. The ids must be the same type as the base item, 
 * ie. weapon ids for a weapon, etc.
 * When the party gains that equipment, it'll randomly choose a prefix
 * and/or affix and add the traits, params, price and meta to a new item, 
 * also changing the name. The new item is then added instead of the 
 * base item.
 *
 * Example: <prefix:2,4,8,12,26> <affix:7,2>
 * If the base item is named "Sword", the prefix item is named "Strong"
 * and the affix item is named "Of Fire"
 * You would get Strong Sword Of Fire. 
 *
 * If a prefix or affix item has <prefixAffixReplaceAnim:1> then its
 * anim will be used for the new item.
 *
 * If a prefix or affix item has <prefixAffixReplaceIcon:1> then its
 * icon will be used for the new item.
 *
 * The new item have the traits of both prefix and affix items and add their 
 * params. For example, if the prefix item has +10 ATK and the base item has 
 * +20 ATK, the new item wil have +30 ATK.
 * Meta will be a combination of the prefix and affix item meta, in other words,
 * the notetags.
 * Price will be the original plus the prices of the prefix and affix item.
 * Note will be the notes of the original, the prefix and the affix items 
 * except that the meta and prefix notetag portions will be removed.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_RandomPrefixAffix = true;

var DreamX = DreamX || {};
DreamX.RandomPrefixAffix = DreamX.RandomPrefixAffix || {};

(function () {
    DreamX.RandomPrefixAffix.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        DreamX.RandomPrefixAffix.Game_System_initialize.call(this);
        this.randomGenWeapons = [];
        this.randomGenArmors = [];
    };

    DreamX.RandomPrefixAffix.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DreamX.RandomPrefixAffix.DataManager_extractSaveContents.call(this, contents);
        for (var i = 0; i < $gameSystem.randomGenWeapons.length; i++) {
            $dataWeapons.push($gameSystem.randomGenWeapons[i]);
        }
        for (var i = 0; i < $gameSystem.randomGenArmors.length; i++) {
            $dataArmors.push($gameSystem.randomGenArmors[i]);
        }
    };

    DreamX.RandomPrefixAffix.makeItem = function (item) {
        var prefixChoices = [];
        var affixChoices = [];

        var prefixItem;
        var affixItem;

        var newTraits = [];
        var newParams = [];
        var newName = item.name;
        var newPrice = item.price;
        var newNote = item.note;
        var newMeta = {};
        var newAnimationId;
        var newIconIndex;

        if (item.meta.prefix) {
            prefixChoices = item.meta.prefix.trim().split(",");
            var prefixID = prefixChoices[Math.floor(Math.random() * prefixChoices.length)];
            if ($dataWeapons[prefixID] || $dataArmors[prefixID]) {
                prefixItem = item.wtypeId ? $dataWeapons[prefixID] : $dataArmors[prefixID];
            }

        }
        if (item.meta.affix) {
            affixChoices = item.meta.affix.trim().split(",");
            var affixID = affixChoices[Math.floor(Math.random() * affixChoices.length)];
            if ($dataWeapons[affixID] || $dataArmors[affixID]) {
                affixItem = item.wtypeId ? $dataWeapons[affixID] : $dataArmors[affixID];
            }
        }

        // if incorrect notetag configuration, just return original item
        if (!prefixItem && !affixItem) {
            return item;
        }

        // add base item's meta
        for (notetag in item.meta) {
            newMeta[notetag] = item.meta[notetag];
        }
        newTraits = item.traits;
        newParams = item.params;

        if (prefixItem) {
            newName = prefixItem.name + " " + newName;
            for (var i = 0; i < prefixItem.traits.length; i++) {
                newTraits.push(prefixItem.traits[i]);
            }
            for (var i = 0; i < prefixItem.params.length; i++) {
                newParams[i] += prefixItem.params[i];
            }
            newPrice += prefixItem.price;
            newNote += prefixItem.note;
            for (notetag in prefixItem.meta) {
                newMeta[notetag] = prefixItem.meta[notetag];
            }
            if (prefixItem.meta.prefixAffixReplaceAnim) {
                newAnimationId = prefixItem.animationId;
            }
            if (prefixItem.meta.prefixAffixReplaceIcon) {
                newIconIndex = prefixItem.iconIndex;
            }
        }
        if (affixItem) {
            newName = newName + " " + affixItem.name;
            for (var i = 0; i < affixItem.traits.length; i++) {
                newTraits.push(affixItem.traits[i]);
            }
            for (var i = 0; i < affixItem.params.length; i++) {
                newParams[i] += affixItem.params[i];
            }
            newPrice += affixItem.price;
            newNote += affixItem.note;
            for (notetag in affixItem.meta) {
                newMeta[notetag] = affixItem.meta[notetag];
            }
            if (affixItem.meta.prefixAffixReplaceAnim) {
                newAnimationId = affixItem.animationId;
            }
            if (affixItem.meta.prefixAffixReplaceIcon) {
                newIconIndex = affixItem.iconIndex;
            }
        }

        var newItem = item;
        newItem.name = newName;
        newItem.traits = newTraits;
        newItem.params = newParams;
        newItem.price = newPrice;
        newItem.note = newNote.replace(new RegExp("\<prefix:.+\>\\n?"), "")
                .replace(new RegExp("\<affix:.+\>\\n?"), "");
        newItem.meta = newMeta;
        if (item.wtypeId && newAnimationId) {
            newItem.animationId = newAnimationId;
        }
        if (newIconIndex) {
            newItem.iconIndex = newIconIndex;
        }

        // remove the affixes and prefixes from meta. we don't want repeats
        delete newItem.meta.prefix;
        delete newItem.meta.affix;

        newItem.id = item.wtypeId ? $dataWeapons.length : $dataArmors.length;
        if (item.wtypeId) {
            $dataWeapons.push(newItem);
            $gameSystem.randomGenWeapons.push(newItem);
        } else {
            $dataArmors.push(newItem);
            $gameSystem.randomGenArmors.push(newItem);
        }
        return newItem;
    };

    // since the new item names don't show up by default, must alias this and 
    // make the new items before hand
    DreamX.RandomPrefixAffix.BattleManager_displayDropItems = BattleManager.displayDropItems;
    BattleManager.displayDropItems = function () {
        for (var i = 0; i < this._rewards.items.length; i++) {
            var item = this._rewards.items[i];
            if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
                this._rewards.items[i] = DreamX.RandomPrefixAffix.makeItem(item);
            }
        }
        DreamX.RandomPrefixAffix.BattleManager_displayDropItems.call(this);
    };

    DreamX.RandomPrefixAffix.GainPrefixAffixItem = function (item, amount, includeEquip) {
        var itemArray = [];
        for (var i = 0; i < amount; i++) {
            // need a deep copy
            itemArray[i] = JSON.parse(JSON.stringify(item));
        }
        for (var i = 0; i < amount; i++) {
            $gameParty.gainItem(DreamX.RandomPrefixAffix.makeItem(itemArray[i]), 1, includeEquip);
        }
    }

    DreamX.RandomPrefixAffix.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
//        console.log(amount);
        // must have one of the meta tags and be a weapon/armor
        if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
            DreamX.RandomPrefixAffix.GainPrefixAffixItem(item, amount, includeEquip);
        } else {
            DreamX.RandomPrefixAffix.Game_Party_gainItem.call(this, item, amount, includeEquip);
        }
    };

    DreamX.RandomPrefixAffix.Game_Party_gainIndependentItem
            = Game_Party.prototype.gainIndependentItem;
    Game_Party.prototype.gainIndependentItem = function (item, amount, includeEquip) {
        if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
            DreamX.RandomPrefixAffix.GainPrefixAffixItem(item, amount, includeEquip);
        } else {
            DreamX.RandomPrefixAffix.Game_Party_gainIndependentItem.call(this, item, amount, includeEquip);
        }
    };

    if (Imported.YEP_VictoryAftermath) {
        DreamX.RandomPrefixAffix.Window_VictoryDrop_extractDrops = Window_VictoryDrop.prototype.extractDrops;
        Window_VictoryDrop.prototype.extractDrops = function () {
            for (var i = 0; i < BattleManager._rewards.items.length; i++) {
                var item = BattleManager._rewards.items[i];
                if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
                    BattleManager._rewards.items[i] = DreamX.RandomPrefixAffix.makeItem(item);
                }
            }
            DreamX.RandomPrefixAffix.Window_VictoryDrop_extractDrops.call(this);
        };
    }

})();
