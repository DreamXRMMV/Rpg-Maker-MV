/*:
 * @plugindesc v1.26 Random prefixes/suffixes
 * @author DreamX
 *
 * @param Bonus Parameter Text
 * @desc Text to add when an item got bonus parameter values. Default: %1%2
 * @default %1%2
 *
 * @param Bonus Parameter Price Multiplier
 * @desc Multiply each bonus paramater point by this amount to add to the price. Default: 10
 * @default 10
 *
 * @param Icon Combination Starting Index
 * @desc Use a number higher than the number of normal icons you have in the icon sheet. Default: 6000
 * @default 6000
 * 
 * @param -Old Notetags-
 * 
 * @param Default Chance
 * @desc If using chances for the prefix/suffix, this is the default chance.
 * @default 10
 *
 * @param Always Choose Prefix/Suffix
 * @desc Even if the chances for a prefix/suffix item are under 100%, add one. default: true
 * @default true
 * 
 * @param Edit Database For Old Notetags
 * @desc Edits the database to convert old notetags to new notetags. Default: false
 * @default false
 *
 * @help
 * This plugin must be named DreamX_RandomPrefixesSuffixes in order for
 * parameters to work properly.
 *
 * Requires Yanfly Item Core.
 * Items may only be randomized if there item type is independent (check Item
 * Core parameters. By default weapons and armors are independent, but regular
 * items are not. You'll need to change the parameters from the default for
 * regular items).
 * 
 * Do not use prefix/suffix notetags with starting items. If you want an actor 
 * to start with an randomized item, add the item to the party and then equip 
 * them with it.
 * 
 * ============================================================================
 * How Items Are Combined
 * ============================================================================
 * If the base item is named "Sword", the prefix item is named "Strong"
 * and the suffix item is named "Of Fire"
 * You would get Strong Sword Of Fire.
 *
 * The new item have the traits of both prefix and suffix items and add their
 * params. For example, if the prefix item has +10 ATK and the base item has
 * +20 ATK, the new item wil have +30 ATK.
 * Meta will be a combination of the prefix and suffix item meta, in other words,
 * the notetags.
 * Price will be the original plus the prices of the prefix and suffix item.
 * Note will be the notes of the original, the prefix and the suffix items
 * except that the meta and prefix notetag portions will be removed.
 * 
 * ============================================================================
 * Affix Choices
 * ============================================================================
 * You can have unlimited amounts of prefix and suffix combinations.
 * Each set of choices should begin on its own line.
 * You can enter ranges to select randomly for a set of numbers (ids).
 * After a number or set of numbers, you will enter the chance.
 * If the chances do not add up to 100%, there is a chance none will be chosen.
 * It's up to you use percentages that add up to less than or equal to 100%.
 * Not doing so many result in undesired results.
 *
 * Here's an example with suffixes.
 * <Suffixes>
 * 5-8 11 50% 10 50%
 * 7 100%
 * </Suffixes>
 * In this example, one id from 5-8, and 11 has a 50% chance of being chosen, 
 * and id 10 has a 50% of being chosen.
 * Then, 7 has a 100% chance of being chosen.
 *
 * Here's another example with prefixes this time.
 * <Prefixes>
 * 12-15 20 22 25%
 * </Prefixes>
 * In this example, one id from 12-15, 20 or 22  has a 25% of being chosen. 
 * So, there is a 75% of none being chosen.
 * 
 * ============================================================================
 * Augment Choices
 * ============================================================================
 * Augment choices work much the same way as affix choices, except you will 
 * also be what type of augment the augment is. The augment ids should be for 
 * the item part of the database only, not weapon/armor. The augments will be 
 * applied when the new item is created.
 * 
 * <Prefix Suffix Augments>
 * Glyph 17-19 50% 20-23 26 50%
 * </Prefix Suffix Augments>
 * 
 * In this example, the augment type is Glyph. There is a 50% chance to use 17, 
 * 18 or 19 as the augment, and a 50% chance to use 20, 21, 22, 23 or 26 
 * instead.
 * 
 * You can use multiple lines. Here's another example.
 * <Prefix Suffix Augments>
 * Glyph 17-19 50% 20-23 26 50%
 * Orb 50-56 25% 7 50%
 * </Prefix Suffix Augments>
 * ============================================================================
 * Affix Choices (Old Notetags)
 * ============================================================================
 * Add <prefix:x,y,z> and/or <suffix:x,y,z> to a weapon/armor's note
 * with the letters being weapon/armor ids. You can have as many ids
 * as you want. The ids must be the same type as the base item,
 * ie. weapon ids for a weapon, etc.
 * When the party gains that equipment, it'll randomly choose a prefix
 * and/or suffix and add the traits, params, price and meta to a new item,
 * also changing the name. The new item is then added instead of the
 * base item.
 *
 * Example: <prefix: 2, 4, 5-10, 12, 26> <suffix:7,2>
 *
 * As you can see, you can add item id ranges. In addition to the single ids,
 * item ids 5, 6, 7, 8, 9 and 10 will be added to the pool in this example.
 * ============================================================================
 * Notetags For Prefix and Suffix Items:
 * ============================================================================
 * <prefixSuffixDontAddName> Won't add the prefix/suffix name
 * 
 * <prefixSuffixNoNameSpace>
 * There will be no added space when adding the prefix/suffix name for this 
 * item.
 * 
 * <prefixSuffixCapitalizeFirstLetter> Will capitalize the first letter of the 
 * new item's name and lower case every other letter
 * 
 * <prefixSuffixReplaceAnim>
 * The new item will have the animation of this prefix/suffix item.
 * ---
 * <prefixSuffixReplaceIcon>
 * The new item will have the icon of the prefix/suffix item.
 * ---
 * <prefixSuffixName:x>
 * The prefix/suffix item name when added to the new item will be x.
 * This is useful if you want to have a different name in the database.
 * ---
 * <prefixSuffixReplaceWeaponType>
 * The new item will have the weapon type of the prefix/suffix item.
 * Weapons only.
 * ---
 * <prefixSuffixReplaceArmorType>
 * The new item will have the armor type of the prefix/suffix item.
 * Armor only.
 * ---
 * <prefixSuffixUseWeaponDatabase>
 * The new item uses prefix/suffix items from the weapon database instead of
 * the armor database.
 * Armor only.
 * ---
 * <prefixSuffixUseArmorDatabase>
 * The new item uses prefix/suffix items from the armor database instead of
 * the weapon database.
 * Weapon only.
 * ---
 * <prefixSuffixCombineSuccess>
 * The new item's success rate will be combined with that of the prefix/suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixCombineVariance>
 * The new item's damage variance will be combined with that of the prefix/suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixCombineDamageFormula>
 * The new item's damage formula will be combined with that of the prefix/suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceConsumable>
 * The new item's consumable type (yes or no) will be replaced by that of the
 * prefix-suffix item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceHitType>
 * The new item's hit type will be replaced by that of the prefix-suffix item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceOccasion>
 * The new item's occasion type will be replaced by that of the prefix-suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceItemType>
 * The new item's item type will be replaced by that of the prefix-suffix item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceScope>
 * The new item's scope will be replaced by that of the prefix-suffix item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceCriticalHits>
 * The new item's critical hit type (yes or no) will be replaced by that of the
 * prefix-suffix item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceDamageType>
 * The new item's damage type will be replaced by that of the prefix-suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <prefixSuffixReplaceDamageElement>
 * The new item's damage element will be replaced by that of the prefix-suffix
 * item.
 * Regular (non-weapon, non-armor) items only.
 * ---
 * <OverlayIcon>
 * This will allow the new item derived from this item to have its icon
 * overlay or by overlayed with another item. It must exist on at least two of
 * the following items when the new item is being made: the base item, prefix
 * item or suffix item.
 * --
 * <OverlayIconOrder: x> with x as the order. This will determine the order
 * in which the icons are overlayed. Lower values are placed first, with
 * higher values overlayed on top of those.
 * ============================================================================
 * Affix Parameters
 * ============================================================================
 * <prefixSuffixParameters: ATK 5|10 DEF -10|20>
 * Here is an example of how to add random bonus parameter values. Put this in
 * a prefix or suffix item.
 *
 * We put the name of the parameter first, then the range of possible values.
 * The first number (5 for ATK or -10 for DEF in this example) must be equal to
 * or less than the second number (10 for ATK or 20 for DEF in this example).
 * Here are the parameter names: MHP, MMP, ATK, DEF, MAT, MDF, AGI, LUK
 *
 * If you want to guarantee a certain value, it is better to just use the
 * database.
 *
 * For the plugin parameter "Bonus Parameter Text", here are the text codes:
 * %1 - The + sign if the bonus is positive.
 * %2 - The highest value of the random parameter bonuses applied on the item.
 * Can be negative.
 * ============================================================================
 * Affix/Augment Requirements
 * ============================================================================
 * <Prefix Suffix Requirement>
 * x
 * </Prefix Suffix Requirement>
 * Replace x with code. This is a requirement for prefix/suffix or augment item.
 *
 * Example:
 * <Prefix Suffix Requirement>
 * $gameSwitches.value(1);
 * </Prefix Suffix Requirement>
 * In this example, it requires that switch 1 is on.
 * ============================================================================
 * Affix Effects
 * ============================================================================
 * <Prefix Suffix Effect>
 * var atkBonus = Math.floor((Math.random() * 100) + 50);
 * newItem.params[2] += atkBonus;
 * newItem.name += " +" + atkBonus;
 * newItem.price += atkBonus;
 * </Prefix Suffix Effect>
 *
 * Here's an example of how to add a custom effect to the new item from the
 * prefix/suffix item. You'll need to know some javascript.
 *
 * In this example, we are applying a random ATK bonus between 50 and 150 to
 * the new item and also adding that bonus to the name of the new item. In
 * additon, we also add to the price the ATK bonus.
 *
 * Here are the variables provided to you by plugin for these effects:
 * item - the prefix/suffix item the effect is taken from.
 * baseItem - the baseItem.
 * newItem = the new item to be created.
 * ============================================================================
 * Affix Chance Type For Old Notetags
 * ============================================================================
 * This section is for use for the <suffix: x> and <suffix: x> notetags only. 
 * 
 * <prefixSuffixChance:x>
 * Replace x with the percent chance of getting that prefix or suffix.
 * Example: <prefixSuffixChance:25> for a 25% chance.
 *
 * Every prefix/suffix with the same percentage gets added to the same percentage
 * pool.
 * A random number between 1 and 100 will be generated and the lowest
 * percentage pool that the random number is less than or equal to will be
 * chosen.
 *
 * For example, if the pools are 10%, 20% and 30% and the random number was 15,
 * you get a prefix/suffix from the pool with percentage 20%.
 *
 * If you get over the highest percentage, you will get one of the
 * prefixes/suffixes from the highest percentage pool. Having a combined
 * percentage (total of all chances for all prefix/suffix choices for a base
 * item) of 100 is recommended but not required.
 *
 * If none of the prefix or suffix items for the base item have a chance notetag,
 * then the item will be randomly chosen as normal with each prefix or suffix
 * having an equal probability.
 *
 * If at least one but not all of the prefix/suffix items for the base item has
 * a chance notetag, then the prefix/suffixes that don't have a percent notetag
 * will be assigned the default chance specified in the parameter for this
 * plugin.
 * ============================================================================
 * Function Calls provided by this plugin
 * ============================================================================
 * For use in custom requirements:
 *
 * this.averagePartyLevel()
 * Returns the average level of the party.
 *
 * this.averagePartyBattleMemberLevel()
 * Returns the average level of party battle members.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly. This script uses code from their Item Core plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly for Item Core plugin.
 */

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_RandomPrefixSuffix = true;

var DreamX = DreamX || {};
DreamX.RandomPrefixSuffix = DreamX.RandomPrefixSuffix || {};

(function () {
    //==========================================================================
    // Parameter Variables
    //==========================================================================
    var parameters = PluginManager.parameters('DreamX_RandomPrefixesSuffixes');

    var paramDefaultChance = parseInt(parameters['Default Chance'] || 10);
    var paramBonusParamText = String(parameters['Bonus Parameter Text']);
    var paramMultiplier = parseInt(parameters['Bonus Parameter Price Multiplier'] || 10);
    var paramEditOld = eval(parameters['Edit Database For Old Notetags'] || false);
    var paramAlwaysChoose = eval(parameters['Always Choose Prefix/Suffix'] || true);
    var paramCombIconStarting = parseInt(parameters['Icon Combination Starting Index'] || 6000);


    DreamX.RandomPrefixSuffix.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.RandomPrefixSuffix.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_ItemCore) {
            throw new Error('DreamX_RandomPrefixesSuffixes requires Yanfly Item Core');
        }
        var independentItemCount = Yanfly.Param.ItemMaxItems
                + Yanfly.Param.ItemMaxWeapons + Yanfly.Param.ItemMaxArmors;
        if (independentItemCount <= 0) {
            throw new Error("DreamX_RandomPrefixesSuffixes requires Yanfly "
                    + "Item Core to have independent items enabled.");

        }
    };

    DreamX.RandomPrefixSuffix.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.RandomPrefixSuffix.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX.RandomPrefixSuffixLoaded) {
            if (paramEditOld) {
                this.editRandomPrefixSuffixMetaNotes($dataArmors);
                this.editRandomPrefixSuffixMetaNotes($dataWeapons);
            }
            this.processDXRPSNotetags($dataWeapons);
            this.processDXRPSNotetags($dataArmors);
            this.processDXRPSNotetags($dataItems);
            DreamX.RandomPrefixSuffixLoaded = true;
        }
        return true;
    };

    // just go through the array
    DataManager.processDXRPSNotetags = function (dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            var element = dataArray[i];
            if (!element)
                continue;
            this.processDXRPSNotetagsChoices(element);
            this.processDXRPSNotetagRequirements(element);
            this.processDXRPSNotetagEffects(element);
            this.processDXRPSNotetagsAugmentChoices(element);
        }
    };


    DataManager.processDXRPSNotetagRequirements = function (item) {
        var evalMode = 'none';
        var notedata = item.note.split(/[\r\n]+/);
        var jsScript = "";

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:PREFIX SUFFIX REQUIREMENT)>/i)) {
                evalMode = 'custom requirement';
            } else if (line.match(/<\/(?:PREFIX SUFFIX REQUIREMENT)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'custom requirement') {
                jsScript = jsScript + line + '\n';
            }
        }

        if (jsScript.length === 0) {
            item.DXRPSRequirement = true;
        } else {
            item.DXRPSRequirement = jsScript;
        }
    };

    DataManager.processDXRPSNotetagEffects = function (item) {
        var evalMode = 'none';
        var notedata = item.note.split(/[\r\n]+/);
        var jsScript = "";

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:PREFIX SUFFIX EFFECT)>/i)) {
                evalMode = 'custom effect';
            } else if (line.match(/<\/(?:PREFIX SUFFIX EFFECT)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'custom effect') {
                jsScript = jsScript + line + '\n';
            }
        }

        if (jsScript.length > 0) {
            item.DXRPSEffect = jsScript;
        }
    };

    DataManager.processDXRPSNotetagsAugmentChoices = function (element) {
        var evalMode = 'none';
        var notedata = element.note.split(/[\r\n]+/);
        var augmentChoiceLines = [];

        element.DXRPSAugmentChoices = [];

        if (!Imported.YEP_X_AttachAugments) {
            return;
        }

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];

            if (line.match(/<(?:PREFIX SUFFIX AUGMENTS)>/i)) {
                evalMode = 'augments';
            } else if (line.match(/<\/(?:PREFIX SUFFIX AUGMENTS)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'augments') {
                augmentChoiceLines.push(line);
            }
        }

        for (var i = 0; i < augmentChoiceLines.length; i++) {
            var line = augmentChoiceLines[i];
            var lineSplit = line.trim().replace(/,/g, " ").split(new RegExp("\\s{1,}"));

            // choose 0 or 1 (probably better to use 1 and change augment type 
            // to 2) If I decide to allow datatype choosing
            //var dataType = lineSplit[0];

            var augmentType = lineSplit[0];

            // use 2 instead of 1 if I decide to allow data type choosing
            lineSplit.splice(0, 1);

            var choiceSplit = lineSplit.toString().replace(/,/g, " ").split(new RegExp("\\s{1,}"));

            var numberLine = "";
            var lineChoices = [];

            for (var j = 0; j < choiceSplit.length; j++) {
                var split = choiceSplit[j];
                if (split.indexOf("%") !== -1) {
                    var chance = parseInt(split.replace("%", ""));
                    lineChoices.push({chance: chance, line: numberLine.trim()});
                    numberLine = "";
                } else {
                    numberLine += split + " ";
                }
            }

//            element.DXRPSAugmentChoices.push({lineChoices: lineChoices,
//                augmentType: augmentType, dataType: dataType});

            element.DXRPSAugmentChoices.push({lineChoices: lineChoices,
                augmentType: augmentType});
            lineChoices = [];
        }
    };

    DataManager.processDXRPSNotetagsChoices = function (element) {
        var evalMode = 'none';
        var notedata = element.note.split(/[\r\n]+/);
        var choiceNoteLines = [];

        element.DXRPSAffixChoices = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];

            if (line.match(/<(?:SUFFIXES)>/i)) {
                evalMode = 'suffix';
            } else if (line.match(/<\/(?:SUFFIXES)>/i)) {
                evalMode = 'none';
            } else if (line.match(/<(?:PREFIXES)>/i)) {
                evalMode = 'prefix';
            } else if (line.match(/<\/(?:PREFIXES)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'suffix' || evalMode === 'prefix') {
                choiceNoteLines.push({affixType: evalMode, line: line});
            }
        }

        for (var i = 0; i < choiceNoteLines.length; i++) {
            var line = choiceNoteLines[i].line;
            var affixType = choiceNoteLines[i].affixType;
            var lineSplit = line.trim().replace(/,/g, " ").split(new RegExp("\\s{1,}"));
            var numberLine = "";
            var lineChoices = [];

            for (var j = 0; j < lineSplit.length; j++) {
                var split = lineSplit[j];
                if (split.indexOf("%") !== -1) {
                    var chance = parseInt(split.replace("%", ""));
                    lineChoices.push({chance: chance, line: numberLine.trim()});
                    numberLine = "";
                } else {
                    numberLine += split + " ";
                }
            }

            element.DXRPSAffixChoices.push({lineChoices: lineChoices,
                affixType: affixType});
            lineChoices = [];
        }
    };

    DreamX.randomArrayElement = function (array) {
        var diceRoll = Math.floor(Math.random() * array.length);
        var selected = array[diceRoll];
        return selected;
    };

    DreamX.parseNumberRanges = function (string) {
        var nums = [];
        var stringSplit = string.trim().replace(/,/g, " ").split(new RegExp("\\s{1,}"));

        for (var i = 0; i < stringSplit.length; i++) {
            var split = stringSplit[i].split("-");
            var min = parseInt(split[0]);

            var max = split[1] ? parseInt(split[1]) : min;

            if (!min || min > max) {
                continue;
            }

            for (var j = min; j <= max; j++) {
                nums.push(j);
            }
        }
        return nums;
    };

    DataManager.editRandomPrefixSuffixMetaNotes = function (dataArray) {
        for (var i = 0; i < dataArray.length; i++) {
            var element = dataArray[i];
            if (!element)
                continue;
            var elementMeta = element.meta;
            var value;
            if (elementMeta.affix) {
                value = elementMeta.affix;
                delete elementMeta.affix;
                elementMeta.suffix = value;
            }
            if (elementMeta.prefixAffixReplaceAnim) {
                value = elementMeta.prefixAffixReplaceAnim;
                delete elementMeta.prefixAffixReplaceAnim;
                elementMeta.prefixSuffixReplaceAnim = value;
            }
            if (elementMeta.prefixAffixReplaceIcon) {
                value = elementMeta.prefixAffixReplaceIcon;
                delete elementMeta.prefixAffixReplaceIcon;
                elementMeta.prefixSuffixReplaceIcon = value;
            }
            if (elementMeta.prefixAffixName) {
                value = elementMeta.prefixAffixName;
                delete elementMeta.prefixAffixName;
                elementMeta.prefixSuffixName = value;
            }
            if (elementMeta.prefixAffixParameters) {
                value = elementMeta.prefixAffixParameters;
                delete elementMeta.prefixAffixParameters;
                elementMeta.prefixSuffixParameters = value;
            }
            if (elementMeta.prefixAffixChance) {
                value = elementMeta.prefixAffixChance;
                delete elementMeta.prefixAffixChance;
                elementMeta.prefixSuffixChance = value;
            }
            element.note.replace("Prefix Affix", "Prefix Suffix");
            element.note.replace("DreamX.RandomPrefixAffix", "DreamX.RandomPrefixSuffix");
        }
    };


    DreamX.RandomPrefixSuffix.evaluateCustomEffect = function (item, bItem, nItem) {
        var baseItem = bItem;
        var newItem = nItem;
        var affixItem = item;

        if (affixItem.DXRPSEffect) {
            eval(affixItem.DXRPSEffect);
        }
    };

    DreamX.RandomPrefixSuffix.isValidItem = function (item) {
        if (!item) {
            return false;
        }
        if (!eval(item.DXRPSRequirement)) {
            return false;
        }

        return true;
    };

    DreamX.RandomPrefixSuffix.averagePartyLevel = function () {
        return this.DXAverageLevelUtility($gameParty.allMembers());
    };

    DreamX.RandomPrefixSuffix.averagePartyBattleMemberLevel = function () {
        return this.DXAverageLevelUtility($gameParty.battleMembers());
    };

    DreamX.RandomPrefixSuffix.DXAverageLevelUtility = function (memberArray) {
        if (memberArray.length <= 0) {
            return 0;
        }
        var sum = 0;

        memberArray.forEach(function (member) {
            sum += member.level;
        });

        return sum / memberArray.length;
    };


    DreamX.RandomPrefixSuffix.makeChoices = function (arrayOfIDs, dataType) {
        var mapArray = [];
        var percentMap = new Map();
        var diceRoll;
        var choseIDPool = false;
        var poolIndex = -1;

        // get rid of bad ids
        for (var i = 0; i < arrayOfIDs.length; i++) {
            var testItem = dataType[ arrayOfIDs[i] ];
            if (!this.isValidItem(testItem)) {
                arrayOfIDs.splice(i, 1);
                i--;
            }
        }

        // first test if there are any percents among the ids
        var hasPercent = arrayOfIDs.some(function (id) {
            return dataType[id].meta.prefixSuffixChance;
        });

        // if no percents, just return the array
        if (hasPercent === false) {
            return arrayOfIDs;
        }

        for (var i = 0; i < arrayOfIDs.length; i++) {
            var percent = dataType[ arrayOfIDs[i] ].meta.prefixSuffixChance
                    ? dataType[ arrayOfIDs[i] ].meta.prefixSuffixChance : paramDefaultChance;
            if (percentMap.has(percent)) {
                // push into array
                percentMap.get(percent).push(arrayOfIDs[i]);
            } else {
                // put in an array
                percentMap.set(percent, [arrayOfIDs[i]]);
            }
        }

        // get everything from the map
        percentMap.forEach(function (value, key, map) {
            // push an object with the percent and ids
            mapArray.push({percent: key, ids: value});
        });

        // sort the array from lowest percent to highest
        mapArray.sort(function (a, b) {
            return a.percent - b.percent;
        });

        //roll the dice
        diceRoll = Math.floor((Math.random() * 100) + 1);

        if (diceRoll <= mapArray[mapArray.length - 1].percent) {
            for (i = 0; i < mapArray.length && !choseIDPool; i++) {
                if (mapArray[i].percent >= diceRoll) {
                    poolIndex = i;
                    choseIDPool = true;
                }
            }
        } else if (paramAlwaysChoose === true) {
            poolIndex = mapArray.length - 1;
        }

        if (poolIndex === -1) {
            return undefined;
        }

        return mapArray[poolIndex].ids;
    };

    DreamX.RandomPrefixSuffix.combineWithArmorWeapon = function (prefixSuffixItem, newItem) {
        newItem.traits = newItem.traits.concat(prefixSuffixItem.traits);
        for (var i = 0; i < prefixSuffixItem.params.length; i++) {
            newItem.params[i] += prefixSuffixItem.params[i];
        }
        if (prefixSuffixItem.meta.prefixSuffixParameters) {
            this.randomizeBonusParameters(prefixSuffixItem.meta.prefixSuffixParameters, newItem);
        }

        if (newItem.wtypeId) {
            if (prefixSuffixItem.meta.prefixSuffixReplaceWeaponType) {
                newItem.wtypeId = prefixSuffixItem.wtypeId;
            }
        } else {
            if (prefixSuffixItem.meta.prefixSuffixReplaceArmorType) {
                newItem.atypeId = prefixSuffixItem.atypeId;
            }
        }
    };

    DreamX.RandomPrefixSuffix.combineWithRegularItem = function (prefixSuffixItem, newItem) {
        // combinations
        newItem.effects = newItem.effects.concat(prefixSuffixItem.effects);
        // combine speed
        newItem.speed += prefixSuffixItem.speed;
        if (newItem.meta.prefixSuffixCombineSuccess) {
            // combine successRate
            newItem.successRate += prefixSuffixItem.successRate;
        }
        if (newItem.meta.prefixSuffixCombineVariance) {
            // combine variance
            newItem.damage.variance += prefixSuffixItem.damage.variance;
        }
        if (newItem.meta.prefixSuffixCombineDamageFormula) {
            // combine variance
            newItem.damage.formula += prefixSuffixItem.damage.formula;
        }

        //-----------

        // replaces
        if (newItem.meta.prefixSuffixReplaceConsumable) {
            // replace consumable boolean
            newItem.consumable = prefixSuffixItem.consumable;
        }
        if (newItem.meta.prefixSuffixReplaceHitType) {
            // replace hit type
            newItem.hitType = prefixSuffixItem.hitType;
        }
        if (newItem.meta.prefixSuffixReplaceOccasion) {
            // replace occasion
            newItem.occasion = prefixSuffixItem.occasion;
        }
        if (newItem.meta.prefixSuffixReplaceItemType) {
            // replace item type
            newItem.itypeId = prefixSuffixItem.itypeId;
        }
        if (newItem.meta.prefixSuffixReplaceScope) {
            // replace item type
            newItem.scope = prefixSuffixItem.scope;
        }
        if (newItem.meta.prefixSuffixReplaceCriticalHits) {
            // replace critical hit boolean
            newItem.damage.critical = prefixSuffixItem.damage.critical;
        }
        if (newItem.meta.prefixSuffixReplaceDamageType) {
            // replace item type
            newItem.damage.type = prefixSuffixItem.damage.type;
        }
        if (newItem.meta.prefixSuffixReplaceDamageElement) {
            // replace item type
            newItem.damage.elementId = prefixSuffixItem.damage.elementId;
        }

        // combine repeats. since repeats defaults to 1 we'll add anything
        // above 1.
        newItem.repeats += prefixSuffixItem.repeats - 1;

        // combine tp gain
        newItem.tpGain += prefixSuffixItem.tpGain;
    };



    DreamX.RandomPrefixSuffix.randomizeBonusParameters = function (notetag, newItem) {
        var parameterSplit = notetag.trim().split(new RegExp("\\s"));
        var i = 0;
        while (i < parameterSplit.length) {
            var parameterID = DreamX.RandomPrefixSuffix.interpretParamNote(parameterSplit[i]);
            i++;
            var min = parseInt(parameterSplit[i].split("|")[0]) || 0;
            var max = parseInt(parameterSplit[i].split("|")[1]) || 0;
            if (parameterID !== undefined) {
                var paramRoll = Math.floor((Math.random() * (max - min + 1)) + min);
                if (parameterID >= 0 && parameterID < newItem.params.length) {
                    newItem.params[parameterID] += paramRoll;
                    newItem.price += paramRoll * paramMultiplier;
                    if (!newItem._DXHighestParamBonus
                            || (newItem._DXHighestParamBonus
                                    && newItem._DXHighestParamBonus < paramRoll)) {
                        newItem._DXHighestParamBonus = paramRoll;
                        newItem._DXHighestParamID = parameterID;
                    }
                }
            }
            i++;
        }
    };

    DreamX.RandomPrefixSuffix.paramStringIDArray = function () {
        return ["MHP", "MMP", "ATK", "DEF", "MAT", "MDF", "AGI", "LUK"];
    };

    DreamX.RandomPrefixSuffix.interpretParamNote = function (string) {
        var paramID = parseInt(string);
        if (paramID)
            return paramID;
        paramID = this.paramStringIDArray().indexOf(string);
        return paramID;
    };

    DreamX.RandomPrefixSuffix.ChoosePrefixSuffixItem = function (itemMeta, dataType) {
        var itemArray = [];

        var itemSplit = itemMeta.trim().replace(/,/g, " ").split(new RegExp("\\s{1,}"));

        for (var i = 0; i < itemSplit.length; i++) {
            var word = itemSplit[i];
            if (word.indexOf("-") !== -1) {
                var start = word.split("-")[0];
                var end = word.split("-")[1];

                start = parseInt(start);
                end = parseInt(end);
                for (var j = start; j <= end; j++) {
                    itemArray.push(j);
                }
            } else {
                itemArray.push(word);
            }
        }

        var choices = this.makeChoices(itemArray, dataType);

        if (choices && choices.length >= 1) {
            var itemID = choices[Math.floor(Math.random() * choices.length)];
            return dataType[itemID];
        }

        return undefined;
    };


    DataManager.processYanflyWeaponArmorTags = function (processArray) {
        var item = processArray[1];

        if (Imported.YEP_AbsorptionBarrier) {
            this.processABRNotetags2(processArray);
        }
        if (Imported.YEP_AutoPassiveStates) {
            this.processAPSNotetags1(processArray);
        }
        if (Imported.YEP_BaseParamControl) {
            this.processBPCNotetags1(processArray);
        }
        if (Imported.YEP_BattleEngineCore) {
            this.processBECNotetags4(processArray);
            this.processBECNotetags5(processArray);
        }
        if (Imported.YEP_BuffsStatesCore) {
            this.processBSCNotetags2(processArray);
        }
        if (Imported.YEP_DamageCore) {
            this.processDMGNotetags2(processArray);
        }
        if (Imported.YEP_DashToggle) {
            this.processDashNotetags1(processArray);
        }
        if (Imported.YEP_ElementAbsorb) {
            this.processEleAbsNotetags1(processArray);
        }
        if (Imported.YEP_ElementReflect) {
            this.processEleRefNotetags1(processArray);
        }
        if (Imported.YEP_EquipBattleSkills) {
            this.processEBSNotetags3(processArray);
        }
        if (Imported.YEP_EquipCore) {
            this.processEquipNotetags2(processArray);
        }
        if (Imported.YEP_ExtraParamFormula) {
            this.processXParamNotetags(processArray);
        }
        if (Imported.YEP_InstantCast) {
            this.processInstantNotetags2(processArray);
        }
        if (Imported.YEP_JobPoints) {
            this.processJPNotetags4(processArray);
        }
        if (Imported.YEP_LifeSteal) {
            this.processLSNotetags1(processArray);
        }
        if (Imported.YEP_RowFormation) {
            this.processRowNotetags3(processArray);
        }
        if (Imported.YEP_SkillCore) {
            this.processGSCNotetags2(processArray);
        }
        if (Imported.YEP_SpecialParamFormula) {
            this.processSParamNotetags(processArray);
        }
        if (Imported.YEP_Taunt) {
            this.processTauntNotetags1(processArray);
        }
        if (Imported.YEP_WeaponAnimation) {
            this.processWANotetags1(processArray);
        }
        if (Imported.YEP_WeaponUnleash) {
            this.processWULNotetags1(processArray);
        }
        if (Imported.YEP_X_ArmorScaling) {
            this.processARSNotetags2(processArray);
        }
        if (Imported.YEP_X_BattleSysATB) {
            this.processATBNotetags2(processArray);
        }
        if (Imported.YEP_X_BattleSysCTB) {
            this.processCTBNotetags2(processArray);
        }
        if (Imported.YEP_X_ChangeBattleEquip) {
            this.processCBENotetags(processArray);
        }
        if (Imported.YEP_X_CriticalControl) {
            this.processCritNotetags2(processArray);
        }
        if (Imported.YEP_X_EquipRequirements) {
            this.processEqReqNotetags1(processArray);
        }
        if (Imported.YEP_X_EquipSkillTiers) {
            this.processESTierNotetags2(processArray);
        }
        if (Imported.YEP_X_ItemDurability) {
            this.processIDurNotetags1(processArray);
        }
        if (Imported.YEP_X_LimitedSkillUses) {
            this.processLSUNotetags3(processArray);
        }
        if (Imported.YEP_X_PartyLimitGauge) {
            this.processPLGNotetags2(processArray);
        }
        if (Imported.YEP_X_SelectionControl) {
            this.processSelectNotetags2(processArray);
        }
        if (Imported.YEP_X_SkillCostItems) {
            this.processSCINotetags2(processArray);
        }
        if (Imported.YEP_X_SkillCooldowns) {
            this.processSCDNotetags3(processArray);
        }

        if (Imported.YEP_StealSnatch) {
            this.processStealNotetags4(processArray);
        }
        if (Imported.YEP_X_CounterControl) {
            this.processCounterNotetags2(processArray);
        }
    };

    DataManager.processYanflyRegularItemTags = function (processArray) {
        if (Imported.YEP_AbsorptionBarrier) {
            this.processABRNotetags1(processArray);
        }
        if (Imported.YEP_BattleEngineCore) {
            this.processMELODYNotetags(processArray);
            this.processBECNotetags2(processArray);
        }
        if (Imported.YEP_BuffsStatesCore) {
            this.processBSCNotetags3(processArray);
        }
        if (Imported.YEP_DamageCore) {
            this.processDMGNotetags1(processArray);
        }
        if (Imported.YEP_EnemyLevels) {
            this.processELVNotetags2(processArray);
        }
        if (Imported.YEP_EnhancedTP) {
            this.processETPNotetags2(processArray);
        }
        if (Imported.YEP_ExtraEnemyDrops) {
            this.processEEDNotetagsI(processArray);
        }
        if (Imported.YEP_InstantCast) {
            this.processInstantNotetags1(processArray);
        }
        if (Imported.YEP_ItemSynthesis) {
            this.processISNotetagsI(processArray);
            this.processISNotetags1(processArray, 0);
        }
        if (Imported.YEP_JobPoints) {
            this.processJPNotetags2(processArray);
        }
        if (Imported.YEP_LifeSteal) {
            this.processLSNotetags2(processArray);
        }
        if (Imported.YEP_RowFormation) {
            this.processRowNotetags2(processArray);
        }
        if (Imported.YEP_SkillCore) {
            this.processObjectNotetags(processArray);
        }
        if (Imported.YEP_SkillLearnSystem) {
            this.processSLSNotetagsI(processArray);
        }
        if (Imported.YEP_StealSnatch) {
            this.processStealNotetagsI(processArray);
            this.processStealNotetags2(processArray);
        }
        if (Imported.YEP_TargetCore) {
            this.processTargetNotetags1(processArray);
        }
        if (Imported.YEP_X_ArmorScaling) {
            this.processARSNotetags1(processArray);
        }
        if (Imported.YEP_X_BattleSysATB) {
            this.processATBNotetags1(processArray);
        }

        if (Imported.YEP_X_BattleSysCTB) {
            this.processCTBNotetags1(processArray);
        }
        if (Imported.YEP_X_CounterControl) {
            this.processCounterNotetagsI(processArray);
            this.processCounterNotetags4(processArray);
        }
        if (Imported.YEP_X_CriticalControl) {
            this.processCritNotetags1(processArray);
        }
        if (Imported.YEP_X_ItemUpgrades) {
            this.processUpgradeNotetags2(processArray);
        }
        if (Imported.YEP_X_LimitedSkillUses) {
            this.processLSUNotetags2(processArray);
        }
        if (Imported.YEP_X_MoreCurrencies) {
            this.processMCNotetagsI(processArray);
        }
        if (Imported.YEP_X_PartyLimitGauge) {
            this.processPLGNotetags3(processArray);
        }
        if (Imported.YEP_X_SelectionControl) {
            this.processSelectNotetagsI(processArray);
            this.processSelectNotetags1(processArray, false);
        }
        if (Imported.YEP_X_SkillCostItems) {
            this.processSCINotetagsI(processArray);
        }
        if (Imported.YEP_X_StateCategories) {
            this.processStCNotetags2(processArray);
        }
        if (Imported.YEP_X_Subclass) {
            this.processSubclassNotetags3(processArray);
        }
    };

    DataManager.processYanflyAllItemTags = function (processArray) {
        // item core notetags are always processed as this plugin requires
        // item core
        this.processItemCoreNotetags(processArray);

        if (Imported.YEP_CoreEngine) {
            this.processCORENotetags1(processArray);
        }
        if (Imported.YEP_ShopMenuCore) {
            this.processShopNotetags(processArray);
        }
        if (Imported.YEP_StealSnatch) {
            this.processStealNotetags3(processArray);
        }
        if (Imported.YEP_X_AttachAugments) {
            this.processAugmentNotetags2(processArray);
        }
        if (Imported.YEP_X_ItemDurability) {
            this.processIDurNotetags2(processArray);
        }
        if (Imported.YEP_X_ItemUpgrades) {
            this.processUpgradeNotetags1(processArray);
        }
        if (Imported.YEP_X_SkillCooldowns) {
            this.processSCDNotetags2(processArray);
        }
        if (Imported.YEP_X_SkillCostItems) {
            this.processSCINotetags3(processArray);
        }
    };

    DataManager.processYanflyArmorTags = function (processArray) {
        if (Imported.YEP_ExtraEnemyDrops) {
            this.processEEDNotetagsA(processArray);
        }
        if (Imported.YEP_ItemSynthesis) {
            this.processISNotetagsA(processArray);
            this.processISNotetags1(processArray, 2);
        }
        if (Imported.YEP_SkillLearnSystem) {
            this.processSLSNotetagsA(processArray);
        }
        if (Imported.YEP_StealSnatch) {
            this.processStealNotetagsA(processArray);
        }
        if (Imported.YEP_X_AttachAugments) {
            this.processAugmentNotetags1(processArray, false);
        }
        if (Imported.YEP_X_CounterControl) {
            this.processCounterNotetagsA(processArray);
        }

        if (Imported.YEP_X_MoreCurrencies) {
            this.processMCNotetags1(processArray, 2);
        }
    };

    DataManager.processYanflyWeaponTags = function (processArray) {
        if (Imported.YEP_ExtraEnemyDrops) {
            this.processEEDNotetagsW(processArray);
        }
        if (Imported.YEP_ExtraEnemyDrops) {
            this.processEEDNotetagsW(processArray);
        }
        if (Imported.YEP_ItemSynthesis) {
            this.processISNotetagsW(processArray);
        }
        if (Imported.YEP_SkillLearnSystem) {
            this.processSLSNotetagsW(processArray);
        }
        if (Imported.YEP_StealSnatch) {
            this.processStealNotetagsW(processArray);
        }
        if (Imported.YEP_X_AttachAugments) {
            this.processAugmentNotetags1(processArray, true);
        }
        if (Imported.YEP_X_CounterControl) {
            this.processCounterNotetagsW(processArray);
        }
        if (Imported.YEP_X_MoreCurrencies) {
            this.processMCNotetags1(processArray, 1);
        }
    };

    DataManager.processYanflyTags = function (item) {
        var processArray = ["", item];

        this.processYanflyAllItemTags(processArray);

        if (item.wtypeId || item.atypeId) {
            this.processYanflyWeaponArmorTags(processArray);
        }

        if (item.wtypeId) {
            this.processYanflyWeaponTags(processArray);
        } else if (item.atypeId) {
            this.processYanflyArmorTags(processArray);
        } else {
            this.processYanflyRegularItemTags(processArray);
        }
    };

    DreamX.RandomPrefixSuffix.deletePrefixSuffixNotes = function (item) {
        // remove prefix and suffix notetags from note
        item.note = item.note.replace(new RegExp("\<prefix:.+\>\\n?"), "")
                .replace(new RegExp("\<suffix:.+\>\\n?"), "");


        // remove the prefixes and suffixes from meta. we don't want repeats
        delete item.meta.prefix;
        delete item.meta.suffix;
        delete item.DXRPSAffixChoices;
    };

    DreamX.RandomPrefixSuffix.combineWithBaseItem = function (prefixSuffixItem, newItem, itemType) {
        var prefixSuffixName = prefixSuffixItem.meta.prefixSuffixName
                ? prefixSuffixItem.meta.prefixSuffixName : prefixSuffixItem.name;

        var newNameAdd = prefixSuffixName;

        if (!prefixSuffixItem.meta.prefixSuffixDontAddName) {
            if (itemType === "prefix") {
                if (!prefixSuffixItem.meta.prefixSuffixNoNameSpace) {
                    newNameAdd += " ";
                }
                newItem.name = newNameAdd + newItem.name;
            } else if (itemType === "suffix") {
                if (!prefixSuffixItem.meta.prefixSuffixNoNameSpace) {
                    newNameAdd = " " + newNameAdd;
                }
                newItem.name += newNameAdd;
            }
        }

        newItem.name = newItem.name.trim();


        if (prefixSuffixItem.meta.prefixSuffixCapitalizeFirstLetter) {
            newItem.name = newItem.name.toLowerCase();
            newItem.name = newItem.name[0].toUpperCase() + newItem.name.slice(1);
        }

        // combine augment choices
        newItem.DXRPSAugmentChoices
                = newItem.DXRPSAugmentChoices.concat(prefixSuffixItem.DXRPSAugmentChoices);

        // combine prices
        newItem.price += prefixSuffixItem.price;
        // combine descriptions
        newItem.description += prefixSuffixItem.description;
        // combine notes
        newItem.note += prefixSuffixItem.note + "\n";

        // change meta
        for (var notetag in prefixSuffixItem.meta) {
            newItem.meta[notetag] = prefixSuffixItem.meta[notetag];
        }

        if (prefixSuffixItem.meta.prefixSuffixReplaceAnim) {
            newItem.animationId = prefixSuffixItem.animationId;
        }

        if (prefixSuffixItem.meta.prefixSuffixReplaceIcon) {
            newItem.iconIndex = prefixSuffixItem.iconIndex;
        } else if (prefixSuffixItem.meta.OverlayIcon && newItem.meta.OverlayIcon) {
            this.addIconOverlay(prefixSuffixItem, newItem);
        }

        // if weapon or armor
        if (newItem.wtypeId || newItem.atypeId) {
            this.combineWithArmorWeapon(prefixSuffixItem, newItem);
        } else {
            // if regular item
            this.combineWithRegularItem(prefixSuffixItem, newItem);
        }
    };

    DreamX.RandomPrefixSuffix.addIconOverlay = function (source, dest) {
        var overlayIconOrder = source.meta.OverlayIconOrder || 0;
        overlayIconOrder = parseInt(overlayIconOrder);

        if (!dest.overlayIcons) {
            dest.overlayIcons = [];
        }
        dest.overlayIcons.push({index: source.iconIndex,
            order: overlayIconOrder});
    };

    DreamX.RandomPrefixSuffix.choose = function (choiceObj, dataType) {
        var diceRoll = Math.floor(Math.random() * 100) + 1;
        var lineChoices = choiceObj.lineChoices;
        var validChoices = [];

        for (var i = 0; i < lineChoices.length; i++) {
            var lineChoice = lineChoices[i];
            var numbers = DreamX.parseNumberRanges(lineChoice.line);
            var validNumbers = [];

            numbers.forEach(function (number) {
                var item = dataType[number];
                if (DreamX.RandomPrefixSuffix.isValidItem(item)) {
                    validNumbers.push(number);
                }
            });

            if (validNumbers.length <= 0) {
                continue;
            }

            validChoices.push({chance: lineChoice.chance,
                numbers: validNumbers});
        }

        validChoices.sort(function (a, b) {
            if (a.chance === b.chance) {
                // randomly select between the two if they have the same chance
                return Math.randomInt(2) === 0;
            } else {
                return a.chance - b.chance;
            }
        });

        for (var i = 0; i < validChoices.length; i++) {
            var chance = validChoices[i].chance;
            var numbers = validChoices[i].numbers;
            if (diceRoll <= chance) {
                return DreamX.randomArrayElement(numbers);
                break;
            } else {
                diceRoll -= chance;
            }
        }
    };

    DreamX.RandomPrefixSuffix.makeItem = function (baseItem) {
        // make a deep copy of the original item
        var newItem = JSON.parse(JSON.stringify(baseItem));
        var dataType;

        newItem.note += "\n";

        // item type
        if (newItem.wtypeId) {
            dataType = $dataWeapons;
        } else if (newItem.atypeId) {
            dataType = $dataArmors;
        } else {
            dataType = $dataItems;
        }

        if (newItem.meta.prefixSuffixUseArmorDatabase) {
            dataType = $dataArmors;
        } else if (newItem.meta.prefixSuffixUseWeaponDatabase) {
            dataType = $dataWeapons;
        }

        // add icon of original icon index if overlay
        if (baseItem.meta.OverlayIcon) {
            this.addIconOverlay(baseItem, newItem);
        }

        if (newItem.meta.prefix) {
            var prefixItem = this.ChoosePrefixSuffixItem(newItem.meta.prefix, dataType);
            this.combineWithBaseItem(prefixItem, newItem, "prefix");
            this.evaluateCustomEffect(prefixItem, baseItem, newItem);
        }
        if (newItem.meta.suffix) {
            var suffixItem = this.ChoosePrefixSuffixItem(newItem.meta.suffix, dataType);
            this.combineWithBaseItem(suffixItem, newItem, "suffix");
            this.evaluateCustomEffect(suffixItem, baseItem, newItem);
        }

        for (var i = 0; i < newItem.DXRPSAffixChoices.length; i++) {
            var line = newItem.DXRPSAffixChoices[i];
            var affixType = line.affixType;
            var id = DreamX.RandomPrefixSuffix.choose(line, dataType);
            if (!id) {
                continue;
            }
            var affixItem = dataType[id];
            this.combineWithBaseItem(affixItem, newItem, affixType);
            this.evaluateCustomEffect(affixItem, baseItem, newItem);

            if (affixItem.meta.OverlayIcon) {
                this.addIconOverlay(affixItem, newItem);
            }
        }

        this.deletePrefixSuffixNotes(newItem);

        newItem.DXRPSItem = true;
        newItem.DXRPSNewItem = true;

        if (newItem._DXHighestParamBonus && newItem._DXHighestParamBonus !== 0) {
            var sign = newItem._DXHighestParamBonus > 0 ? "+" : "";
            var bonusParamText = paramBonusParamText.format(sign, newItem._DXHighestParamBonus);
            newItem.name = newItem.name + " " + bonusParamText;
            delete newItem._DXHighestParamBonus;
            delete newItem._DXHighestParamID;
        }

        if (newItem.overlayIcons) {
            if (!$gameSystem.overlayIcons) {
                $gameSystem.overlayIcons = [];
            }
            var newCombIconId = paramCombIconStarting
                    + $gameSystem.overlayIcons.length;
            newItem.overlayIcons.sort(function (a, b) {
                return a.order - b.order;
            });
            $gameSystem.overlayIcons.push(newItem.overlayIcons);
            newItem.iconIndex = newCombIconId;
        }

        newItem.nonIndependent = false;
        newItem.originalBaseItemId = baseItem.id;
        newItem.DXRPS124V = true;
        DataManager.processYanflyTags(newItem);
        DataManager.registerNewItem(newItem);

        newItem = JSON.parse(JSON.stringify($gameTemp.lastDXRPSItemCreated));
        newItem.DXRPSNewItem = true;

        return newItem;
    };


    DreamX.RandomPrefixSuffix.GainPrefixSuffixItem = function (item, amount, includeEquip) {
        for (var i = 0; i < amount; i++) {
            $gameParty.gainItem(DreamX.RandomPrefixSuffix.makeItem(item), 1, includeEquip);
        }
    }

    DreamX.RandomPrefixSuffix.Game_Party_gainItem = Game_Party.prototype.gainItem;
    Game_Party.prototype.gainItem = function (item, amount, includeEquip) {
        if (!item || item.DXRPSDummyItem) {
            return;
        }

        // must have one of the meta tags and be a weapon/armor
        if (amount > 0 && DreamX.RandomPrefixSuffix.isConfiguredForPrefixSuffix(item)) {
            DreamX.RandomPrefixSuffix.GainPrefixSuffixItem(item, amount, includeEquip);
        } else {
            DreamX.RandomPrefixSuffix.Game_Party_gainItem.call(this, item, amount, includeEquip);
        }
    };

    Game_Party.prototype.getMatchingBaseItem = function (baseItem, equipped) {
        if (!baseItem)
            return null;
        if (DataManager.isItem(baseItem))
            var group = this.items();
        if (DataManager.isWeapon(baseItem))
            var group = this.weapons();
        if (DataManager.isArmor(baseItem))
            var group = this.armors();
        if (equipped) {
            for (var a = 0; a < this.members().length; ++a) {
                var actor = this.members()[a];
                if (!actor)
                    continue;
                if (DataManager.isWeapon(baseItem)) {
                    group = group.concat(actor.weapons());
                } else if (DataManager.isArmor(baseItem)) {
                    group = group.concat(actor.armors());
                }
            }
        }
        var baseItemId = baseItem.id;
        for (var i = 0; i < group.length; ++i) {
            var item = group[i];
            if (!item)
                continue;
            if (!item.baseItemId)
                continue;
            if (item.baseItemId !== baseItemId && item.originalBaseItemId !== baseItemId) {
                continue;
            }

            return item;
        }
        return null;
    };

//    DreamX.RandomPrefixSuffix.Game_Actor_changeEquipById = Game_Actor.prototype.changeEquipById;
//    Game_Actor.prototype.changeEquipById = function (etypeId, itemId) {
//        if (itemId > 0) {
//            var slotId = etypeId - 1;
//            if (this.equipSlots()[slotId] === 1) {
//                var baseItem = $dataWeapons[itemId];
//            } else {
//                var baseItem = $dataArmors[itemId];
//            }
//            if (baseItem && DreamX.RandomPrefixSuffix.isConfiguredForPrefixSuffix(baseItem)) {
//                $gameParty.gainItem(baseItem, 1);
//                this.changeEquip(slotId, $gameTemp.lastDXRPSItemCreated);
//                return;
//            }
//        }
//        DreamX.RandomPrefixSuffix.Game_Actor_changeEquipById.call(this, etypeId, itemId)
//    };

    DreamX.RandomPrefixSuffix.isConfiguredForPrefixSuffix = function (item) {
        if (!item || item.DXRPSItem)
            return false;

        if (!item.meta.suffix && !item.meta.prefix && item.DXRPSAffixChoices.length <= 0)
            return false;

        if (item.wtypeId) {
            return Yanfly.Param.ItemMaxWeapons > 0;
        } else if (item.atypeId) {
            return Yanfly.Param.ItemMaxArmors > 0;
        } else {
            return Yanfly.Param.ItemMaxItems > 0;
        }
    };

    //==========================================================================
    // Item Core Stuff
    //==========================================================================
    // returns true if it was marked as one
    DataManager.isDXRPSItem = function (item) {
        if (item && item.DXRPSItem && item.DXRPSItem === true) {
            return true;
        }
        return false;
    };

    // returns true if it was marked as one
    DataManager.isDXRPSNewItem = function (item) {
        if (item && item.DXRPSNewItem) {
            return true;
        }
        return false;
    };

    // its valid if its an item made by this plugin
    DreamX.RandomPrefixSuffix.DataManager_isNewItemValid = DataManager.isNewItemValid;
    DataManager.isNewItemValid = function (item) {
        if (this.isDXRPSNewItem(item)) {
            return true;
        }
        return DreamX.RandomPrefixSuffix.DataManager_isNewItemValid.call(this, item);
    };

    // it is a weapon if its an dxrpgs item and has a weapon type id
    DreamX.RandomPrefixSuffix.DataManager_isWeapon = DataManager.isWeapon;
    DataManager.isWeapon = function (item) {
        if (!item) {
            return false;
        }
        if (item.wtypeId) {
            return true;
        }
        return DreamX.RandomPrefixSuffix.DataManager_isWeapon.call(this, item);
    };

    // it is an item if its an dxrpgs item and has a item type id
    DreamX.RandomPrefixSuffix.DataManager_isItem = DataManager.isItem;
    DataManager.isItem = function (item) {
        if (!item) {
            return false;
        }
        if (item.itypeId) {
            return true;
        }
        return DreamX.RandomPrefixSuffix.DataManager_isItem.call(this, item);
    };

    // it is armor if its an dxrpgs item and has a armor type id
    DreamX.RandomPrefixSuffix.DataManager_isArmor = DataManager.isArmor;
    DataManager.isArmor = function (item) {
        if (!item) {
            return false;
        }
        if (item.atypeId) {
            return true;
        }
        return DreamX.RandomPrefixSuffix.DataManager_isArmor.call(this, item);
    };

    Game_Party.prototype.numIndependentItems = function (baseItem) {
        var value = 0;
        if (!DataManager.isIndependent(baseItem))
            return this.numItems(baseItem);
        var id = baseItem.id;
        var dataType;
        if (DataManager.isItem(baseItem)) {
            var group = this.items();
            dataType = $dataItems;
        }

        if (DataManager.isWeapon(baseItem)) {
            var group = this.weapons();
            dataType = $dataWeapons;
        }

        if (DataManager.isArmor(baseItem)) {
            var group = this.armors();
            dataType = $dataArmors;
        }

        for (var i = 0; i < group.length; ++i) {
            var item = group[i];
            if (!item)
                continue;
            var dxrpsBaseItem;
            if (item.DXRPSItem) {
                dxrpsBaseItem = dataType[item.baseItemId];
            }
            if ((item.baseItemId && item.baseItemId === id)
                    || (dxrpsBaseItem && dxrpsBaseItem.baseItemId === id))
                value += 1;
        }
        return value;
    };

    DreamX.RandomPrefixSuffix.applyAugments = function (newItem) {
        if (!newItem.DXRPSChosenAugments || newItem.id === newItem.baseItemId) {
            return;
        }

        for (var i = 0; i < newItem.DXRPSChosenAugments.length; i++) {
            var obj = newItem.DXRPSChosenAugments[i];
            var augmentType = obj.augmentType;
            //var dataType = obj.dataType;
            var dataType = $dataItems;

            var id = obj.id;

            ItemManager.checkAugmentSlots(newItem);
            for (var j = 0; j < newItem.augmentSlots.length; j++) {
                var slot = newItem.augmentSlots[j];
                if (slot !== augmentType || newItem.augmentSlotItems[j] !== 'none') {
                    continue;
                }
                ItemManager.applyAugmentEffects(newItem, dataType[id], j, 1);
                break;
            }
        }

        delete newItem.DXRPSChosenAugments;
        delete newItem.DXRPSChosenAugments;
    };

    DreamX.RandomPrefixSuffix.chooseAugments = function (newItem) {
        if (newItem.id !== newItem.baseItemId || newItem.DXRPSChosenAugments
                || newItem.DXRPSAugmentChoices.length <= 0) {
            return;
        }

        newItem.DXRPSChosenAugments = [];

        for (var i = 0; i < newItem.DXRPSAugmentChoices.length; i++) {
            var line = newItem.DXRPSAugmentChoices[i];
            var augmentType = line.augmentType;

            //var dataType = line.dataType;
            var dataType = $dataItems;

            var id = DreamX.RandomPrefixSuffix.choose(line, dataType);

            dataType = 'item';

            if (!id) {
                continue;
            }

            newItem.DXRPSChosenAugments.push({id: id, dataType: dataType, augmentType: augmentType});
        }
    };

    DreamX.RandomPrefixSuffix.DataManager_addNewIndependentItem = DataManager.addNewIndependentItem;
    DataManager.addNewIndependentItem = function (baseItem, newItem) {
        var originalNote = newItem.note;
        DreamX.RandomPrefixSuffix.DataManager_addNewIndependentItem.call(this, baseItem, newItem);
        if (!this.isDXRPSItem(newItem))
            return;

        DreamX.RandomPrefixSuffix.chooseAugments(newItem);
        DreamX.RandomPrefixSuffix.applyAugments(newItem);

        newItem.DXRPSNewItem = false;
        newItem.note = originalNote;
        newItem.nonIndependent = false;

        $gameTemp.lastDXRPSItemCreated = newItem;
    };

    DreamX.RandomPrefixSuffix.Window_ItemStatus_drawLargeIcon = Window_ItemStatus.prototype.drawLargeIcon;
    Window_ItemStatus.prototype.drawLargeIcon = function () {
        var iconIndex = this._item.iconIndex;
        if (iconIndex < paramCombIconStarting) {
            return DreamX.RandomPrefixSuffix.Window_ItemStatus_drawLargeIcon.call(this);
        }
        this.DXDrawLargeIcon();
    };

    Window_Base.prototype.DXDrawLargeIcon = function () {
        var iconIndex = this._item.iconIndex;
        var overlayArrayIndex = iconIndex - paramCombIconStarting;
        var overlayIcons = $gameSystem.overlayIcons[overlayArrayIndex];
        for (var i = 0; i < overlayIcons.length; i++) {
            var iconId = overlayIcons[i].index;
            this.DXDrawLargeIconOverlay(iconId);
        }
    };

    Window_Base.prototype.DXDrawLargeIconOverlay = function (iconIndex) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var dw = Yanfly.Param.ItemIconSize;
        var dh = Yanfly.Param.ItemIconSize;
        var dx = (Window_Base._faceWidth - dw) / 2;
        var dy = (Window_Base._faceHeight - dh) / 2;
        this.contents._context.imageSmoothingEnabled = false;
        this.contents.blt(bitmap, sx, sy, pw, ph, dx, dy, dw, dh);
        this.contents._context.imageSmoothingEnabled = true;
    };

    //==========================================================================
    // Window_Base
    //==========================================================================
    DreamX.RandomPrefixSuffix.Window_Base_drawIcon = Window_Base.prototype.drawIcon;
    Window_Base.prototype.drawIcon = function (iconIndex, x, y) {
        if (iconIndex >= paramCombIconStarting) {
            var overlayArrayIndex = iconIndex - paramCombIconStarting;
            var overlayIcons = $gameSystem.overlayIcons[overlayArrayIndex];
            for (var i = 0; i < overlayIcons.length; i++) {
                var iconId = overlayIcons[i].index;
                DreamX.RandomPrefixSuffix.Window_Base_drawIcon.call(this, iconId, x, y);
            }
            return;
        }
        DreamX.RandomPrefixSuffix.Window_Base_drawIcon.call(this, iconIndex, x, y);
    };

    //==========================================================================
    // Compatibility
    //==========================================================================
    // since the new item names don't show up by default, must alias this and
    // make the new items before hand
    if (Imported.YEP_VictoryAftermath) {
        DreamX.RandomPrefixSuffix.BattleManager_gainDropItems = BattleManager.gainDropItems;
        BattleManager.gainDropItems = function () {
            this.convertPrefixSuffix();
            DreamX.RandomPrefixSuffix.BattleManager_gainDropItems.call(this);
        };
    } else {
        DreamX.RandomPrefixSuffix.BattleManager_displayDropItems = BattleManager.displayDropItems;
        BattleManager.displayDropItems = function () {
            this.convertPrefixSuffix();
            DreamX.RandomPrefixSuffix.BattleManager_displayDropItems.call(this);
        };
    }

    BattleManager.convertPrefixSuffix = function () {
        for (var i = 0; i < this._rewards.items.length; i++) {
            var item = this._rewards.items[i];
            if (DreamX.RandomPrefixSuffix.isConfiguredForPrefixSuffix(item)) {
                $gameParty.gainItem(item, 1);

                var dummy = JSON.parse(JSON.stringify($gameTemp.lastDXRPSItemCreated));
                dummy.DXRPSDummyItem = true;

                $gameTemp.lastDXRPSItemCreated = undefined;

                this._rewards.items[i] = dummy;
            }
        }
    };

    if (Imported.YEP_ShopMenuCore) {
        DreamX.RandomPrefixSuffix.Scene_Shop_doBuyItem = Scene_Shop.prototype.doBuyItem;
        Scene_Shop.prototype.doBuyItem = function (number) {
            var item = this._item;
            if (!item || !item.DXRPSDummyShopItem) {
                return DreamX.RandomPrefixSuffix.Scene_Shop_doBuyItem.call(this, number);
            }
            var dataType;
            if (item.wtypeId) {
                dataType = $dataWeapons;
            } else if (item.atypeId) {
                dataType = $dataArmors;
            } else {
                dataType = $dataItems;
            }

            var actualItem = dataType[item.baseItemId];
            actualItem = JSON.parse(JSON.stringify(actualItem));
            actualItem.DXRPSNewItem = true;

            $gameParty.gainItem(actualItem, number);
        };

        DreamX.RandomPrefixSuffix.Window_ShopInfo_drawLargeIcon = Window_ShopInfo.prototype.drawLargeIcon;
        Window_ShopInfo.prototype.drawLargeIcon = function () {
            var iconIndex = this._item.iconIndex;
            if (iconIndex < paramCombIconStarting) {
                return DreamX.RandomPrefixSuffix.Window_ShopInfo_drawLargeIcon.call(this);
            }
            this.DXDrawLargeIcon();
        };
    } else {
        DreamX.RandomPrefixSuffix.Scene_Shop_doBuy = Scene_Shop.prototype.doBuy;
        Scene_Shop.prototype.doBuy = function (number) {
            var item = this._item;

            if (!item || !item.DXRPSDummyShopItem) {
                return DreamX.RandomPrefixSuffix.Scene_Shop_doBuy.call(this, number);
            }

            var dataType;
            if (item.wtypeId) {
                dataType = $dataWeapons;
            } else if (item.atypeId) {
                dataType = $dataArmors;
            } else {
                dataType = $dataItems;
            }

            var actualItem = dataType[item.baseItemId];
            actualItem = JSON.parse(JSON.stringify(actualItem));
            actualItem.DXRPSNewItem = true;

            $gameParty.loseGold(number * this.buyingPrice());
            $gameParty.gainItem(actualItem, number);
        };
    }

    if (Imported.YEP_X_ItemDurability) {
        DreamX.RandomPrefixSuffix.ItemManager_makeDurability = ItemManager.makeDurability;
        ItemManager.makeDurability = function (item, variance) {
            if (!item || (item.DXRPSItem && item.id === item.baseItemId)) {
                return;
            }
            DreamX.RandomPrefixSuffix.ItemManager_makeDurability.call(this, item, variance);
        };
    }

    if (Imported.ShopManager) {
        /* Setup shop goods, if needed */
        DreamX.RandomPrefixSuffix.Game_Shop_setupGoods = Game_Shop.prototype.setupGoods;
        Game_Shop.prototype.setupGoods = function (goods) {
            if (this._needsSetup) {
                for (var i = 0; i < goods.length; i++) {
                    var data = goods[i];
                    var type = data[0];
                    var id = data[1];
                    var dataType;
                    switch (type) {
                        case 0:
                            dataType = $dataItems;
                            break;
                        case 1:
                            dataType = $dataWeapons;
                            break;
                        case 2:
                            dataType = $dataArmors;
                            break;
                    }

                    var item = dataType[id];

                    if (DreamX.RandomPrefixSuffix.isConfiguredForPrefixSuffix(item)) {
                        var newItem = DreamX.RandomPrefixSuffix.makeItem(item);
                        DataManager.registerNewItem(newItem);

                        var dummy = $gameTemp.lastDXRPSItemCreated;
                        dummy.DXRPSDummyShopItem = true;
                        data[1] = dummy.id;
                    }
                }
            }
            DreamX.RandomPrefixSuffix.Game_Shop_setupGoods.call(this, goods);
        };
    }
})();
