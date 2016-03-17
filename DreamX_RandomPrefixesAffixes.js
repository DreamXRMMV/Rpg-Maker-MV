/*:
 * @plugindesc v1.9 Random prefixes/affixes
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
        // the new item
        var newItem;

        // arrays of choices of prefix/affix items
        var prefixChoices = [];
        var affixChoices = [];

        // the prefix/affix item
        var prefixItem;
        var affixItem;

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

        // make a deep copy
        newItem = JSON.parse(JSON.stringify(item));
        newItem.note += "\n";

        if (prefixItem) {
            newItem.name = prefixItem.name + " " + newItem.name;
            newItem.traits = newItem.traits.concat(prefixItem.traits);
            for (var i = 0; i < prefixItem.params.length; i++) {
                newItem.params[i] += prefixItem.params[i];
            }
            newItem.price += prefixItem.price;
            newItem.description += prefixItem.description;
            newItem.note += prefixItem.note + "\n";
            for (notetag in prefixItem.meta) {
                newItem.meta[notetag] = prefixItem.meta[notetag];
            }
            if (prefixItem.meta.prefixAffixReplaceAnim) {
                newItem.animationId = prefixItem.animationId;
            }
            if (prefixItem.meta.prefixAffixReplaceIcon) {
                newItem.iconIndex = prefixItem.iconIndex;
            }
        }
        if (affixItem) {
            newItem.name = newItem.name + " " + affixItem.name;
            newItem.traits = newItem.traits.concat(affixItem.traits);
            for (var i = 0; i < affixItem.params.length; i++) {
                newItem.params[i] += affixItem.params[i];
            }
            newItem.price += affixItem.price;
            newItem.description += affixItem.description;
            newItem.note += affixItem.note + "\n";
            for (notetag in affixItem.meta) {
                newItem.meta[notetag] = affixItem.meta[notetag];
            }
            if (affixItem.meta.affixAffixReplaceAnim) {
                newItem.animationId = affixItem.animationId;
            }
            if (affixItem.meta.affixAffixReplaceIcon) {
                newItem.iconIndex = affixItem.iconIndex;
            }
        }

        // remove prefix and affix notetags from note
        newItem.note = newItem.note.replace(new RegExp("\<prefix:.+\>\\n?"), "")
                .replace(new RegExp("\<affix:.+\>\\n?"), "");

        // remove the affixes and prefixes from meta. we don't want repeats
        delete newItem.meta.prefix;
        delete newItem.meta.affix;
        
        //console.log(newItem.description);

        if (Imported.YEP_ItemCore) {
            DreamX.RandomPrefixAffix.RescanItemCoreNote(newItem);
        }
        if (Imported.YEP_AutoPassiveStates) {
            DreamX.RandomPrefixAffix.RescanAutoPassiveStatesNote(newItem);
        }
        if (Imported.YEP_BuffsStatesCore) {
            DreamX.RandomPrefixAffix.RescanBuffsStatesCoreNote(newItem);
        }

        newItem.id = item.wtypeId ? $dataWeapons.length : $dataArmors.length;
        if (item.wtypeId) {
            $dataWeapons.push(newItem);
            $gameSystem.randomGenWeapons.push(newItem);
        } else {
            $dataArmors.push(newItem);
            $gameSystem.randomGenArmors.push(newItem);
        }
        console.log(newItem);
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
        for (var i = 0; i < amount; i++) {
            $gameParty.gainItem(DreamX.RandomPrefixAffix.makeItem(JSON.parse(JSON.stringify(item))), 1, includeEquip);
        }
    }

    DreamX.RandomPrefixAffix.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        // must have one of the meta tags and be a weapon/armor
        if (DreamX.RandomPrefixAffix.isConfiguredForPrefixAffix(item)) {
            DreamX.RandomPrefixAffix.GainPrefixAffixItem(item, amount, includeEquip);
        } else {
            DreamX.RandomPrefixAffix.Game_Party_gainItem.call(this, item, amount, includeEquip);
        }
    };

    DreamX.RandomPrefixAffix.isConfiguredForPrefixAffix = function (item) {
        if (item && (item.meta.prefix || item.meta.affix) && (item.wtypeId || item.atypeId)) {
            return true;
        }
        return false;
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

    if (Imported.YEP_ItemCore) {
        DreamX.RandomPrefixAffix.DataManager_isIndependent = DataManager.isIndependent;
        DataManager.isIndependent = function (item) {
            if (DreamX.RandomPrefixAffix.isConfiguredForPrefixAffix(item)) {
                return false;
            }
            return DreamX.RandomPrefixAffix.DataManager_isIndependent.call(this, item);
        };

        DreamX.RandomPrefixAffix.RescanItemCoreNote = function (item) {
            var note1 = /<(?:RANDOM VARIANCE):[ ](\d+)>/i;
            var note2 = /<(?:NONINDEPENDENT ITEM|not independent item)>/i;
            var note3 = /<(?:PRIORITY NAME)>/i;

            var obj = item;
            var notedata = obj.note.split(/[\r\n]+/);

            obj.randomVariance = Yanfly.Param.ItemRandomVariance;
            obj.textColor = 0;
            if (Imported.YEP_CoreEngine)
                obj.textColor = Yanfly.Param.ColorNormal;
            obj.nonIndepdent = false;
            obj.setPriorityName = false;
            obj.infoEval = '';
            obj.infoTextTop = '';
            obj.infoTextBottom = '';
            var evalMode = 'none';

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    obj.randomVariance = parseInt(RegExp.$1);
                } else if (line.match(note2)) {
                    obj.nonIndepdent = true;
                } else if (line.match(note3)) {
                    obj.setPriorityName = true;
                } else if (line.match(/<(?:INFO EVAL)>/i)) {
                    evalMode = 'info eval';
                } else if (line.match(/<\/(?:INFO EVAL)>/i)) {
                    evalMode = 'none';
                } else if (line.match(/<(?:INFO TEXT TOP)>/i)) {
                    evalMode = 'info text top';
                } else if (line.match(/<\/(?:INFO TEXT TOP)>/i)) {
                    evalMode = 'none';
                } else if (line.match(/<(?:INFO TEXT BOTTOM)>/i)) {
                    evalMode = 'info text bottom';
                } else if (line.match(/<\/(?:INFO TEXT BOTTOM)>/i)) {
                    evalMode = 'none';
                } else if (evalMode === 'info eval') {
                    obj.infoEval = obj.infoEval + line + '\n';
                } else if (evalMode === 'info text top') {
                    if (obj.infoTextTop !== '')
                        obj.infoTextTop += '\n';
                    obj.infoTextTop = obj.infoTextTop + line;
                } else if (evalMode === 'info text bottom') {
                    if (obj.infoTextBottom !== '')
                        obj.infoTextBottom += '\n';
                    obj.infoTextBottom = obj.infoTextBottom + line;
                } else if (line.match(/<(?:TEXT COLOR):[ ](\d+)>/i)) {
                    obj.textColor = parseInt(RegExp.$1);
                }
            }
        };
    }

    if (Imported.YEP_AutoPassiveStates) {
        DreamX.RandomPrefixAffix.RescanAutoPassiveStatesNote = function (item) {
            var note1 = /<(?:PASSIVE STATE):[ ]*(\d+(?:\s*,\s*\d+)*)>/i;
            var note2 = /<(?:PASSIVE STATE):[ ](\d+)[ ](?:THROUGH|to)[ ](\d+)>/i;
            var obj = item;
            var notedata = obj.note.split(/[\r\n]+/);

            obj.passiveStates = [];

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(note1)) {
                    var array = JSON.parse('[' + RegExp.$1.match(/\d+/g) + ']');
                    obj.passiveStates = obj.passiveStates.concat(array);
                } else if (line.match(note2)) {
                    var range = Yanfly.Util.getRange(parseInt(RegExp.$1),
                            parseInt(RegExp.$2));
                    obj.passiveStates = obj.passiveStates.concat(range);
                }
            }
        };
    }

    if (Imported.YEP_BuffsStatesCore) {
        DreamX.RandomPrefixAffix.RescanBuffsStatesCoreNote = function (item) {
            var obj = item;
            var notedata = obj.note.split(/[\r\n]+/);

            obj.maxBuff = [0, 0, 0, 0, 0, 0, 0, 0];
            obj.maxDebuff = [0, 0, 0, 0, 0, 0, 0, 0];

            for (var i = 0; i < notedata.length; i++) {
                var line = notedata[i];
                if (line.match(/<(?:MAX)[ ](.*)[ ](?:BUFF):[ ]([\+\-]\d+)>/i)) {
                    var paramId = 8;
                    var stat = String(RegExp.$1).toUpperCase();
                    var limit = parseInt(RegExp.$2);
                    if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(stat)) {
                        paramId = 0;
                    } else if (['MAXMP', 'MAX MP', 'MMP', 'MP'].contains(stat)) {
                        paramId = 1;
                    } else if (['ATK', 'STR'].contains(stat)) {
                        paramId = 2;
                    } else if (['DEF'].contains(stat)) {
                        paramId = 3;
                    } else if (['MAT', 'INT'].contains(stat)) {
                        paramId = 4;
                    } else if (['MDF', 'RES'].contains(stat)) {
                        paramId = 5;
                    } else if (['AGI', 'SPD'].contains(stat)) {
                        paramId = 6;
                    } else if (['LUK'].contains(stat)) {
                        paramId = 7;
                    }
                    obj.maxBuff[paramId] = limit;
                } else if (line.match(/<(?:MAX)[ ](.*)[ ](?:DEBUFF):[ ]([\+\-]\d+)>/i)) {
                    var paramId = 8;
                    var stat = String(RegExp.$1).toUpperCase();
                    var limit = parseInt(RegExp.$2);
                    if (['MAXHP', 'MAX HP', 'MHP', 'HP'].contains(stat)) {
                        paramId = 0;
                    } else if (['MAXMP', 'MAX MP', 'MMP', 'MP'].contains(stat)) {
                        paramId = 1;
                    } else if (['ATK', 'STR'].contains(stat)) {
                        paramId = 2;
                    } else if (['DEF'].contains(stat)) {
                        paramId = 3;
                    } else if (['MAT', 'INT'].contains(stat)) {
                        paramId = 4;
                    } else if (['MDF', 'RES'].contains(stat)) {
                        paramId = 5;
                    } else if (['AGI', 'SPD'].contains(stat)) {
                        paramId = 6;
                    } else if (['LUK'].contains(stat)) {
                        paramId = 7;
                    }
                    obj.maxDebuff[paramId] = limit;
                }
            }
        };
    }
    
})();
