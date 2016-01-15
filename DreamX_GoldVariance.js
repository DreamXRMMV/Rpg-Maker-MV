/*:
 * @plugindesc v1.0 Adds gold variance.
 * @author DreamX
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
 
 In this example, the second notetag will be ignored. In other words, 
 do not exceed 100% in sum with your notetag percents. 
 
 It is fine, however, not to reach 100% in percent sums. If the sum 
 of the percents is not 100%, there is a chance that the player may 
 not receive any gold. The chance of not receiving gold would be 
 100% minus the sum of the percents.
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

(function () {

    DreamX.GoldVariance.Game_Enemy_gold = Game_Enemy.prototype.gold;
    Game_Enemy.prototype.gold = function () {
        var variantGoldReward = DreamX.GoldVariance.getGold(this.enemy())
        if (variantGoldReward !== -1) {
            return variantGoldReward;
        }
        else {
            return DreamX.GoldVariance.Game_Enemy_gold.call(this);
        }
    };

    DreamX.GoldVariance.getGold = function (enemy) {
        var correctGoldTags = enemy.note.split("\n").filter(function (note) {
            return note.match("\<Gold: [0-9]{1,}% [0-9]{1,}-[0-9]{1,}\>");
        });

        if (correctGoldTags.length <= 0) {
            return -1;
        }

        var goldSlots = [];
        var totalPercentage = 0;
        correctGoldTags.forEach(function (tag) {
            var percentage = parseInt(tag.split(" ")[1].split("%")[0]);
            addPercentage = totalPercentage;
            if (addPercentage + percentage <= 100) {
                totalPercentage += percentage;
                percentage += addPercentage;
                var low = tag.split(" ")[2].split("-")[0];
                var high = tag.split(" ")[2].split("-")[1].split("\>")[0];
                if (parseInt(high) >= parseInt(low)) {
                    goldSlots.push({percentage: percentage, low: low, high: high});
                }

            }
        });

        if (goldSlots.length <= 0) {
            return -1;
        }

        var diceRoll = Math.floor((Math.random() * 100) + 1);
        var gotGoldPrize = false;
        var prizeIndex;

        if (diceRoll <= goldSlots[goldSlots.length - 1].percentage) {
            for (i = 0; i < goldSlots.length && !gotGoldPrize; i++) {
                if (goldSlots[i].percentage >= diceRoll) {
                    prizeIndex = i;
                    gotGoldPrize = true;
                }
            }
        }

        if (!gotGoldPrize) {
            return 0;
        }
        if (goldSlots[prizeIndex].high === goldSlots[prizeIndex].low)
            return goldSlots[prizeIndex].low;
        return Math.floor((Math.random() * goldSlots[prizeIndex].high)
                + goldSlots[prizeIndex].low);
    };

})();
