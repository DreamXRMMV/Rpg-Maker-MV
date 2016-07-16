/*:
 * @plugindesc v1.0
 * @author DreamX
 * @help
 * This plugin will allow you to randomly add traits and other attributes to 
 * enemies by combining enemies together.
 * ============================================================================
 * How combination works
 * ============================================================================
 * By default, a base enemy will be combined with a suffix/prefix enemy like
 * this:
 *
 * -A prefix enemy will add their name to the beginning of the new enemy name.
 * -A suffix enemy will add their name to the end of the new enemy name.
 * -The suffix/prefix enemy's action patterns will be added to the base enemy's
 * patterns.
 * -The suffix/prefix enemy's drops will be added to the base enemy's drops.
 * -The suffix/prefix enemy's params will be added to the base enemy's params.
 * -The suffix/prefix enemy's exp will be added to the base enemy's exp.
 * -The suffix/prefix enemy's gold will be added to the base enemy's gold.
 * -The suffix/prefix enemy's traits will be added to the base enemy's traits.
 * -The suffix/prefix enemy's notes will be added to the base enemy's notes.
 * -The suffix/prefix enemy's meta will be added to the base enemy's meta.
 *
 * However, there are notetags you can use to change how some of this works.
 * Check the next help sections.
 *
 * ============================================================================
 * Base Enemy Notetag
 * ============================================================================
 * You can have unlimited amounts of prefix and suffix combinations.
 * Each set of choices should begin on its own line.
 * You can enter ranges to select randomly for a set of numbers.
 * After a number or set of numbers, you will enter the chance.
 * If the chances do not add up to 100%, there is a chance none will be chosen.
 * It's up to you use percentages that add up to less than or equal to 100%.
 *
 * Here's an example with suffixes.
 * <Suffixes>
 * 5-8 50% 10 50%
 * 7 100%
 * </Suffixes>
 * In this example, one id from 5-8 has a 50% chance of being chosen, and id 10 has a
 * 50% of being chosen.
 * Then, 7 has a 100% chance of being chosen.
 *
 * Here's another example with prefixes this time.
 * <Prefixes>
 * 12-15 25%
 * </Prefixes>
 * In this example, one id from 12-15 has a 25% of being chosen. So, there is a
 * 75% of none being chosen.
 *
 * Prefix enemies will add their name to the beginning of the new randomized
 * enemy's name. Suffix enemies will add their name to the end instead.
 *
 * <OverlayImage> will mean that this enemy's image will be overlayed. 
 * Not compatible with Animatd SV Enemies from YEP Animated SV Enemies yet.
 * <OverlayPriority> will decides the order of overlaying for images. The
 * highest value gets put on top, lowest on bottom, etc.
 * ============================================================================
 * Prefix/Suffix Enemy Notetags
 * ============================================================================
 * <ReplaceRed:x> will cause the new enemy's red tone to be x.
 * <AddRed:x> will add x to the new enemy's red tone.
 * <ReplaceGreen:x> will cause the new enemy's green tone to be x.
 * <AddGreen:x> will add x to the new enemy's green tone.
 * <ReplaceBlue:x> will cause the new enemy's blue tone to be x.
 * <AddBlue:x> will add x to the new enemy's blue tone.
 *
 * <prefixSuffixName:x> will use x instead of the database name when combining
 * names for the new enemy.
 *
 * <ReplaceHue> will mean that this new enemy's hue will be replaced by
 * enemy's hue.
 * <CombineHue> will mean that the new enemy's hue will be the average of the
 * prefix/suffix enemy hue and the base enemy hue.
 *
 * <ReplaceActionPatterns> will mean that the new enemy's actions patterns will
 * be replaced by the this enemy's action patterns.
 *
 * <ReplaceDrops> will mean the new enemy's drops will be replaced by this
 * enemy's drops.
 *
 * <ReplaceEXP> will mean the new enemy's exp will be replaced by this
 * enemy's exp.
 *
 * <ReplaceTraits> will mean the new enemy's traits will be replaced by this
 * enemy's traits.
 *
 * <ReplaceParams> will mean the new enemy's params will be replaced by this
 * enemy's params.
 *
 * <ReplaceImage> will mean the new enemy's image will be replaced by this
 * enemy's image.
 *
 * <OverlayImage> will mean that this enemy's image will be overlayed.
 * Not compatible with Animatd SV Enemies from YEP Animated SV Enemies yet.
 * <OverlayPriority> will decides the order of overlaying for images. The
 * highest value gets put on top, lowest on bottom, etc.
 * ============================================================================
 * Tips
 * ============================================================================
 * To further reduce time making enemy variations, I suggest using
 * YEP Enemy Levels and Himeworks Enemy Classes MV. This way, you have
 * both variation from this plugin and also have enemies level up with you.
 * Making differently strengthened enemies will become less necessary.
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
Imported.DreamX_RandomEnemyTraits = true;

var DreamX = DreamX || {};
DreamX.RandomEnemyTraits = DreamX.RandomEnemyTraits || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_RandomEnemyTraits');

    DreamX.RandomEnemyTraits.evaluateChoices = function (enemy) {
        var evalMode = 'none';
        var notedata = enemy.note.split(/[\r\n]+/);
        enemy.affixChoicesNotes = [];
        enemy.affixChoices = [];

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];

            if (line.match(/<(?:Suffixes)>/i)) {
                evalMode = 'suffix';
            } else if (line.match(/<\/(?:Suffixes)>/i)) {
                evalMode = 'none';
            } else if (line.match(/<(?:Prefixes)>/i)) {
                evalMode = 'prefix';
            } else if (line.match(/<\/(?:Prefixes)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'suffix' || evalMode === 'prefix') {
                enemy.affixChoicesNotes.push({affixType: evalMode, line: line});
            }
        }

        for (var i = 0; i < enemy.affixChoicesNotes.length; i++) {
            var lineObj = enemy.affixChoicesNotes[i];
            var id = DreamX.RandomEnemyTraits.choose(lineObj.line);
            if (id && id !== -1) {
                enemy.affixChoices.push({affixType: lineObj.affixType, id: id});
            }
        }
    };

    DreamX.RandomEnemyTraits.choose = function (line) {
        var diceRoll = Math.floor(Math.random() * 100) + 1;
        var split = line.split(" ");
        var chosenId = -1;
        var choices = [];

        for (var i = 0; i < split.length; i++) {
            var numbers = split[i];
            i++;
            var chance = split[i];
            if (!chance) {
                continue;
            }
            chance = parseInt(chance.toString().replace("%", ""));

            choices.push({chance: chance, numbers: numbers});
        }

        choices.sort(function (a, b) {
            if (a.chance === b.chance) {
                // randomly select between the two if they have the same chance
                return Math.randomInt(2) === 0;
            } else {
                return a.chance - b.chance;
            }

        });

        for (var i = 0; i < choices.length; i++) {
            var chance = choices[i].chance;
            var numbers = choices[i].numbers;
            if (diceRoll <= chance) {
                chosenId = DreamX.parseNumberRanges(numbers);
                break;
            } else {
                diceRoll -= chance;
            }
        }

        chosenId = DreamX.randomArrayElement(chosenId);

        return chosenId;
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

    DreamX.RandomEnemyTraits.combineHue = function (hue1, hue2) {
        return Math.floor((hue1 + hue2) / 2);
    };

    DreamX.RandomEnemyTraits.combineWithBaseEnemy = function (affixEnemy, newEnemy, affixType) {
        var affixName = affixEnemy.meta.prefixSuffixName
                ? affixEnemy.meta.prefixSuffixName : affixEnemy.name;


        newEnemy.tones = {};

        if (affixEnemy.meta.ReplaceRed) {
            newEnemy.tones.red = parseInt(affixEnemy.meta.ReplaceRed);
            newEnemy.changedTones = true;
        } else if (affixEnemy.meta.AddRed) {
            newEnemy.tones.red = parseInt(newEnemy.tones.red) || 0;
            newEnemy.tones.red += parseInt(affixEnemy.meta.AddRed);
            newEnemy.changedTones = true;
        }

        if (affixEnemy.meta.ReplaceBlue) {
            newEnemy.tones.blue = parseInt(affixEnemy.meta.ReplaceBlue);
            newEnemy.changedTones = true;
        } else if (affixEnemy.meta.AddBlue) {
            newEnemy.tones.blue = parseInt(newEnemy.tones.blue) || 0;
            newEnemy.tones.blue += parseInt(affixEnemy.meta.AddBlue);
            newEnemy.changedTones = true;
        }

        if (affixEnemy.meta.ReplaceGreen) {
            newEnemy.tones.green = parseInt(affixEnemy.meta.ReplaceGreen);
        } else if (affixEnemy.meta.AddGreen) {
            newEnemy.tones.green = parseInt(newEnemy.tones.green) || 0;
            newEnemy.tones.green += parseInt(affixEnemy.meta.AddGreen);
            newEnemy.changedTones = true;
        }

        if (affixType === "prefix") {
            newEnemy.name = affixName + " " + newEnemy.name;
        } else if (affixType === "suffix") {
            newEnemy.name = newEnemy.name + " " + affixName;
        }

        if (!affixEnemy.meta.OverlayImage) {
            if (affixEnemy.meta.ReplaceHue) {
                newEnemy.battlerHue = affixEnemy.battlerHue;
            } else if (affixEnemy.meta.CombineHue) {
                newEnemy.battlerHue = DreamX.RandomEnemyTraits.combineHue(newEnemy.battlerHue, affixEnemy.battlerHue);
            }
        }

        if (affixEnemy.meta.ReplaceActionPatterns) {
            newEnemy.actions = affixEnemy.actions;
        } else {
            newEnemy.actions = newEnemy.actions.concat(affixEnemy.actions);
        }

        if (affixEnemy.meta.ReplaceDrops) {
            newEnemy.dropItems = affixEnemy.dropItems;
        } else {
            newEnemy.dropItems = newEnemy.dropItems.concat(affixEnemy.dropItems);
        }

        if (affixEnemy.meta.ReplaceEXP) {
            newEnemy.exp = affixEnemy.exp;
        } else {
            newEnemy.exp += affixEnemy.exp;
        }

        if (affixEnemy.meta.ReplaceTraits) {
            newEnemy.traits = affixEnemy.traits;
        } else {
            newEnemy.traits = newEnemy.traits.concat(affixEnemy.traits);
        }

        if (affixEnemy.meta.ReplaceParams) {
            newEnemy.params = affixEnemy.params;
        } else {
            for (var i = 0; i < newEnemy.params.length; i++) {
                newEnemy.params[i] += affixEnemy.params[i];
            }
        }

        if (affixEnemy.meta.ReplaceGold) {
            newEnemy.gold = affixEnemy.gold;
        } else {
            newEnemy.gold += affixEnemy.gold;
        }

        if (affixEnemy.meta.ReplaceImage) {
            if (Imported.YEP_X_AnimatedSVEnemies && affixEnemy.sideviewBattler.length > 0) {
                newEnemy.sideviewBattler = affixEnemy.sideviewBattler;
            } else {
                newEnemy.battlerName = affixEnemy.battlerName;
            }

        } else if (affixEnemy.meta.OverlayImage) {
            if (!newEnemy.overlayImages) {
                newEnemy.overlayImages = [];
            }
            var overlayPriority = affixEnemy.meta.OverlayImageOrder || 0;

            var overlayHue = affixEnemy.meta.CombineHue
                    ? DreamX.RandomEnemyTraits.combineHue(newEnemy.battlerHue,
                            affixEnemy.battlerHue) : affixEnemy.battlerHue;

            overlayPriority = parseInt(overlayPriority);
            newEnemy.overlayImages.push({name: affixEnemy.battlerName,
                order: overlayPriority, hue: overlayHue});
        }

        for (var key in affixEnemy.meta) {
            switch (key) {
                case "OverlayImageOrder":
                    break;
                default:
                    newEnemy.meta[key] = affixEnemy.meta[key];
            }
        }

        var newNote = "";
        var oldNoteSplit = newEnemy.note.split(/[\r\n]+/);

        for (var i = 0; i < oldNoteSplit.length; i++) {
            var line = oldNoteSplit[i];
            if (line.indexOf("<Sideview Battler:") !== -1) {
                continue;
            }
            newNote += line + "\n";
        }
        newEnemy.note = newNote;

        newEnemy.note += "\n" + affixEnemy.note + "\n";

    };

    DreamX.RandomEnemyTraits.Sprite_Enemy_updateBitmap = Sprite_Enemy.prototype.updateBitmap;
    Sprite_Enemy.prototype.updateBitmap = function () {
        DreamX.RandomEnemyTraits.Sprite_Enemy_updateBitmap.call(this);
        var dataEnemy = this._enemy.enemy();
        if (dataEnemy.changedTones && !this._changedTone) {
            var r = dataEnemy.tones.red || 0;
            var g = dataEnemy.tones.green || 0;
            var b = dataEnemy.tones.blue || 0;
            var url = this.bitmap._url;

            if (this._svBattlerEnabled) {
                url = this._mainSprite.bitmap._url;
            }

            var toneBitmap = Bitmap.load(url);
            toneBitmap.addLoadListener(function () {
                toneBitmap.adjustTone(r, g, b);
                toneBitmap.rotateHue(dataEnemy.hue);
            });

            if (!this._svBattlerEnabled) {
                this.bitmap = toneBitmap;
            } else {
                this._mainSprite.bitmap = toneBitmap;
            }

            this._changedTone = true;
        }

    };

    DreamX.RandomEnemyTraits.Sprite_Enemy_loadBitmap = Sprite_Enemy.prototype.loadBitmap;
    Sprite_Enemy.prototype.loadBitmap = function (name, hue) {
        DreamX.RandomEnemyTraits.Sprite_Enemy_loadBitmap.call(this, name, hue);
        this.bitmap.adjustTone(255, 255, 255);
        var overlayImages = this._enemy.enemy().overlayImages;
        if (!overlayImages || !overlayImages[1]) {
            return;
        }

        for (var i = 1; i < overlayImages.length; i++) {
            var overlay = overlayImages[i];
            var overlayName = overlay.name;
            var overlayHue = overlay.hue;
            var overlayBitmap;

            if ($gameSystem.isSideView()) {
                overlayBitmap = ImageManager.loadSvEnemy(overlayName, overlayHue);
            } else {
                overlayBitmap = ImageManager.loadEnemy(overlayName, overlayHue);
            }
            var overlaySprite;
            overlaySprite = new Sprite(overlayBitmap);

            overlaySprite.anchor.x = 0.5;
            overlaySprite.anchor.y = 1;

            this.addChild(overlaySprite);
        }
    };

    DreamX.RandomEnemyTraits.processYanflyNotetagData = function (newEnemy) {
        var processArray = ["", newEnemy];

        if (Imported.YEP_AbsorptionBarrier) {
            DataManager.processABRNotetags2(processArray);
        }
        if (Imported.YEP_AutoPassiveStates) {
            DataManager.processAPSNotetags1(processArray, Yanfly.Param.APSEnemyPas);
        }
        if (Imported.YEP_BaseParamControl) {
            DataManager.processBPCNotetags1(processArray);
        }
        if (Imported.YEP_BattleAICore) {
            DataManager.processCoreAINotetags1(processArray);
        }
        if (Imported.YEP_BattleEngineCore) {
            DataManager.processBECNotetags3(processArray);
            DataManager.processBECNotetags4(processArray);
        }
        if (Imported.YEP_BattleSelectCursor) {
            DataManager.processBattleCursorNotetags1(processArray, false);
        }
        if (Imported.YEP_BuffsStatesCore) {
            DataManager.processBSCNotetags2(processArray);
            DataManager.processBSCNotetags4(processArray);
        }
        if (Imported.YEP_CoreEngine) {
            DataManager.processCORENotetags2(processArray);
        }
        if (Imported.YEP_DamageCore) {

            DataManager.processDMGNotetags2(processArray);
        }
        if (Imported.YEP_ElementAbsorb) {
            DataManager.processEleAbsNotetags1(processArray);
        }
        if (Imported.YEP_ElementCore) {
            DataManager.processElementNotetags2(processArray);
        }
        if (Imported.YEP_ElementReflect) {
            DataManager.processEleRefNotetags1(processArray);
        }
        if (Imported.YEP_EnemyLevels) {
            DataManager.processELVNotetags1(processArray);
        }
        if (Imported.YEP_EnhancedTP) {
            DataManager.processETPNotetags1(processArray);
        }
        if (Imported.YEP_ExtraEnemyDrops) {
            DataManager.processEEDNotetags1(processArray);
        }
        if (Imported.YEP_ExtraParamFormula) {
            DataManager.processXParamNotetags(processArray);
        }
        if (Imported.YEP_InstantCast) {
            DataManager.processInstantNotetags2(processArray);
        }
        if (Imported.YEP_JobPoints) {
            DataManager.processJPNotetags3(processArray);
        }
        if (Imported.YEP_LifeSteal) {
            DataManager.processLSNotetags1(processArray);
        }
        if (Imported.YEP_RowFormation) {
            DataManager.processRowNotetags1(processArray);
            DataManager.processRowNotetags3(processArray);
        }
        if (Imported.YEP_SkillCore) {
            DataManager.processGSCNotetags1(processArray);
        }
        if (Imported.YEP_SpecialParamFormula) {
            DataManager.processSParamNotetags(processArray);
        }
        if (Imported.YEP_StealSnatch) {
            DataManager.processStealNotetags1(processArray);
        }
        if (Imported.YEP_SwapEnemies) {
            DataManager.processSwENotetagsE(processArray);
            DataManager.processSwENotetags1(processArray);
        }
        if (Imported.YEP_Taunt) {
            DataManager.processTauntNotetags1(processArray);
            DataManager.processTauntNotetags2(processArray);
        }
        if (Imported.YEP_WeaponAnimation) {
            DataManager.processWANotetags1(processArray);
        }
        if (Imported.YEP_WeaponUnleash) {
            DataManager.processWULNotetags1(processArray);
        }
        if (Imported.YEP_X_AnimatedSVEnemies) {
            DataManager.processSVENotetags1(processArray);
        }
        if (Imported.YEP_X_AreaOfEffect) {
            DataManager.processAOENotetags2(processArray);
        }
        if (Imported.YEP_X_ArmorScaling) {
            DataManager.processARSNotetags2(processArray);
        }
        if (Imported.YEP_X_BattleSysATB) {
            DataManager.processATBNotetags2(processArray);
        }
        if (Imported.YEP_X_BattleSysCTB) {
            DataManager.processCTBNotetags2(processArray);
            DataManager.processCTBNotetags3(processArray, false);
        }
        if (Imported.YEP_X_CounterControl) {
            DataManager.processCounterNotetags1(processArray);
            DataManager.processCounterNotetags2(processArray);
        }
        if (Imported.YEP_X_CriticalControl) {
            DataManager.processCritNotetags2(processArray);
        }
        if (Imported.YEP_X_LimitedSkillUses) {
            DataManager.processLSUNotetags3(processArray);
        }
        if (Imported.YEP_X_PartyLimitGauge) {
            DataManager.processPLGNotetags1(processArray, false);
            DataManager.processPLGNotetags2(processArray);
        }
        if (Imported.YEP_X_SelectionControl) {
            DataManager.processSelectNotetags2(processArray);
            DataManager.processSelectNotetags3(processArray);
        }
        if (Imported.YEP_X_SkillCooldowns) {
            DataManager.processSCDNotetags2(processArray);
            DataManager.processSCDNotetags3(processArray);
        }
        if (Imported.YEP_X_SkillCostItems) {
            DataManager.processSCINotetags2(processArray);
        }
        if (Imported.YEP_X_VisualATBGauge) {
            DataManager.processVATBNotetags1(processArray);
        }
        if (Imported.YEP_X_VisualHpGauge) {
            DataManager.processVHGNotetags(processArray);
        }
    };

    DreamX.RandomEnemyTraits.Game_Enemy_setup = Game_Enemy.prototype.setup;
    Game_Enemy.prototype.setup = function (enemyId, x, y) {
        var newEnemy = JSON.parse(JSON.stringify($dataEnemies[enemyId]));

        enemyId = $dataEnemies.length;
        newEnemy.id = enemyId;

        DreamX.RandomEnemyTraits.evaluateChoices(newEnemy);

        for (var i = 0; i < newEnemy.affixChoices.length; i++) {
            var choice = newEnemy.affixChoices[i];

            var affixEnemy = JSON.parse(JSON.stringify($dataEnemies[choice.id]));
            DreamX.RandomEnemyTraits.combineWithBaseEnemy(affixEnemy, newEnemy, choice.affixType);
        }

        if (newEnemy.overlayImages) {
            var overlayOrder = newEnemy.meta.OverlayImageOrder || 0;

            newEnemy.overlayImages.push({name: newEnemy.battlerName,
                hue: newEnemy.battlerHue, order: overlayOrder});
            newEnemy.overlayImages.sort(function (a, b) {
                return a.order - b.order;
            });
            newEnemy.battlerName = newEnemy.overlayImages[0].name;
            newEnemy.battlerHue = newEnemy.overlayImages[0].hue;
        }

        DreamX.RandomEnemyTraits.processYanflyNotetagData(newEnemy);
        $dataEnemies.push(newEnemy);

        if (Imported.YEP_EnemyLevels) {
            this._enemyId = enemyId;
            this.setupEnemyLevel();
        }
        DreamX.RandomEnemyTraits.Game_Enemy_setup.call(this, enemyId, x, y);
    };

})();
