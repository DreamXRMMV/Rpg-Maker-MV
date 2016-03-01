/*:
 * @plugindesc Encounter rate option
 *
 * @author DreamX
 * @help
 */
//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_JochoOptions = true;

var DreamX = DreamX || {};
DreamX.JochoOptions = DreamX.JochoOptions || {};

(function () {
    ConfigManager.encounterRateOption = 100;
    ConfigManager.difficulty = "Normal";

    DreamX.JochoOptions.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        DreamX.JochoOptions.Window_Options_makeCommandList.call(this);
        this.addEncounterOption();
    };

    Window_Options.prototype.isEncounterRateSymbol = function (symbol) {
        return symbol === "encounterRateOption";
    };

    Window_Options.prototype.encounterRateText = function (value) {
        var text = "";
        switch (value) {
            case 0:
                text = "None";
                break;
            case 50:
                text = "1/2";
                break;
            case 100:
                text = "Normal";
                break;
            case 200:
                text = "2x";
                break;
        }
        return text;
    };

    DreamX.JochoOptions.Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);
        if (this.isEncounterRateSymbol(symbol)) {
            return this.encounterRateText(value);
        } else {
            return DreamX.JochoOptions.Window_Options_statusText.call(this, index);
        }
    };

    Window_Options.prototype.addEncounterOption = function () {
        this.addCommand('Encounter Rate', 'encounterRateOption');
    };

    /*
     Window_Options.prototype.encounterRateOffset = function () {
     return 50;
     };
     */

    DreamX.JochoOptions.Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        var value = this.getConfigValue(symbol);

        if (this.isEncounterRateSymbol(symbol)) {
            switch (value) {
                case 0:
                    value = 50;
                    break;
                case 50:
                    value = 100;
                    break;
                case 100:
                    value = 200;
                    break;
                case 200:
                    value = 0;
                    break;
            }
            this.changeValue(symbol, value);
        } else {
            // if not call original function
            DreamX.JochoOptions.Window_Options_processOk.call(this);
        }
    };

    Game_Player.prototype.makeEncounterCount = function () {
        var n = $gameMap.encounterStep();
        this._encounterCount = n;
    };

    DreamX.JochoOptions.Game_Player_updateEncounterCount = Game_Player.prototype.updateEncounterCount;
    Game_Player.prototype.updateEncounterCount = function () {
		if (ConfigManager['encounterRateOption'] === 0) return;
		
		// record previous count
		var previousCount = this._encounterCount;
		
		// call original method
		DreamX.JochoOptions.Game_Player_updateEncounterCount.call(this);
		
		if (ConfigManager['encounterRateOption'] === 100) return;
		
		// record difference between previous and new count
		var difference = previousCount - this._encounterCount;
		
		// multiply the difference by the encounter rate in options
		difference *= (1 - (ConfigManager['encounterRateOption'] / 100));
		
		// add 
		this._encounterCount += difference;
    };

    Game_Player.prototype.encounterRateOptionMultiplier = function () {
        return 1 * ConfigManager['encounterRateOption'];
    };

})();
