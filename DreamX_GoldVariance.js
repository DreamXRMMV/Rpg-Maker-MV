/*:
 * @plugindesc v1.1 Adds gold variance.
 * @author DreamX
 * 
 * @param Add Base Gold
 * @desc Add base (database) gold to randomly chosen value. Default: false
 * @default false
 * 
 * @help
 
 If the enemy does not have any correct gold notetags, the
 default way will be used instead.
 Notetags must be in this exact same format, including spaces:
 <Gold: X% Y-Z>
 X is the percentage chance. Y is the minimum. Z is the maximum. 
 The minimum must be equal to or less than the maximum or the 
 notetag will be ignored.
 Some examples of correct notetags are:
 <Gold: 5% 9999-9999>
 <Gold: 30% 1000-1500>
 <Gold: 65% 1-5000>
 
 The algorithm that decides gold rewards adds notetags sequentially 
 from top to bottom. Any notetag with a percent that exceeds the 
 current ratio will be ignored. 
 
 For example:
 <Gold: 50% 1000-1000>
 <Gold: 51% 2000-2000>
 
 It is up to make sure that the percents, when added up, are equal to or less 
 than 100%.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * 
 */

var Imported = Imported || {};
Imported.DreamX_GoldVariance = true;
var DreamX = DreamX || {};

DreamX.GoldVariance = DreamX.GoldVariance || {};

DreamX.Parameters = PluginManager.parameters('DreamX_GoldVariance');
DreamX.Param = DreamX.Param || {};

DreamX.Param.GoldVarAddBase = eval(DreamX.Parameters['Add Base Gold']);

DreamX.GoldVariance.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!DreamX.GoldVariance.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!DreamX._loaded_GoldVariance) {
        this.processDatasetGoldVarianceTags($dataEnemies);
        Yanfly._loaded_GoldVariance = true;
    }
    return true;
};

DataManager.processElementGoldVarianceTags = function (enemy) {
    for (var i = 0; i < enemy.goldVarianceChoiceLines.length; i++) {
        var line = enemy.goldVarianceChoiceLines[i];
        var lineSplit = line.split(" ");

        var percent = parseInt(lineSplit[0].split("%")[0]);
        var min = parseInt(lineSplit[1].split("-")[0]);
        var max = parseInt(lineSplit[1].split("-")[1]);

        enemy.goldVarianceChoices.push({min: min, max: max, percent: percent});
    }

    enemy.goldVarianceChoices.sort(function (a, b) {
        // lowest to highest
        if (a.percent === b.percent) {
            return Math.randomInt(2) === 0;
        }
        return a.percent - b.percent;
    });
};

DataManager.processDatasetGoldVarianceTags = function (data) {
    for (var i = 0; i < data.length; i++) {
        var enemy = data[i];
        if (!enemy)
            continue;
        enemy.goldVarianceChoiceLines = [];
        enemy.goldVarianceChoices = [];

        var notedata = enemy.note.split(/[\r\n]+/);
        for (var j = 0; j < notedata.length; j++) {
            var line = notedata[j];

            if (line.match(/<(?:Gold):(.*)>/i)) {
                var goldData = String(RegExp.$1).trim().toLowerCase();
                enemy.goldVarianceChoiceLines.push(goldData);
            }
        }

        this.processElementGoldVarianceTags(enemy);
    }
};


DreamX.GoldVariance.Game_Enemy_gold = Game_Enemy.prototype.gold;
Game_Enemy.prototype.gold = function () {
    var dataEnemy = this.enemy();
    var gold = DreamX.Param.GoldVarAddBase ? dataEnemy.gold : 0;

    var diceRoll = Math.randomInt(100) + 1;

    for (var i = 0; i < dataEnemy.goldVarianceChoices.length; i++) {
        var choice = dataEnemy.goldVarianceChoices[i];

        if (choice.percent >= diceRoll) {
            var goldChoice = choice.min + Math.randomInt(choice.max - choice.min + 1);
            gold += goldChoice;
            break;
        } else {
            diceRoll -= choice.percent;
        }
    }

    return gold;
};