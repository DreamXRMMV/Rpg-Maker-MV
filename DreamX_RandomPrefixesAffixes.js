/*:
 * @plugindesc v1.0 Random prefixes/affixes
 * @author DreamX
 * @help The new item will be identical to the base item except for name, 
 * traits, params, note and meta.
 * The new item have the traits of both prefix and affix items and add their 
 * params. For example, if the prefix item has +10 ATK and the base item has 
 * +20 ATK, the new item wil have +30 ATK.
 * Meta will be the same except that the prefix and affix notetags will be 
 * removed.
 * 
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

        newTraits = item.traits;
        newParams = item.params;

        if (prefixItem) {
            newName = prefixItem.name + " " + newName;
            newTraits.concat(prefixItem.traits);
            for (var i = 0; i < prefixItem.params.length; i++) {
                newParams[i] += prefixItem.params[i];
            }
        }
        if (affixItem) {
            newName = newName + " " + affixItem.name;
            newTraits.concat(affixItem.traits);
            for (var i = 0; i < affixItem.params.length; i++) {
                newParams[i] += affixItem.params[i];
            }
        }

        var newItem = item;
        newItem.name = newName;
        newItem.traits = newTraits;
        newItem.params = newParams;

        // remove the affixes and prefixes from meta. we don't want repeats
        delete newItem.meta.prefix;
        delete newItem.meta.affix;

        newItem.id = item.wtypeId ? $dataWeapons.length : $dataArmors.length;
        if (item.wtypeId) {
            $dataWeapons.push(newItem);
            $gameSystem.randomGenWeapons.push(newItem);
        }
        else {
            $dataArmors.push(newItem);
            $gameSystem.randomGenArmors.push(newItem);
        }

        return newItem;
    };

    DreamX.RandomPrefixAffix.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        // must have one of the meta tags and be a weapon/armor
        if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
            item = DreamX.RandomPrefixAffix.makeItem(item);
        }
        DreamX.RandomPrefixAffix.Game_Party_gainItem.call(this, item, amount, includeEquip);

    };

})();
