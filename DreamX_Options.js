/*:
 * @plugindesc v1.0 Options for the option menu
 * @author DreamX
 * 
 * @param Switches
 * @desc Ids of switches to have in the menu. Keep blank for none.
 * @default 
 * 
 * @param ON Text
 * @desc Test to display for options that are set to ON. Default: ON
 * @default ON
 * 
 * @param OFF Text
 * @desc Test to display for options that are set to OFF. Default: OFF
 * @default OFF
 * 
 * @param Window X
 * @desc X for the window. Processed as eval. Default: (Graphics.boxWidth - this.width) / 2
 * @default (Graphics.boxWidth - this.width) / 2
 * 
 * @param Window Y
 * @desc Y for the window. Processed as eval. Default: (Graphics.boxHeight - this.height) / 2
 * @default (Graphics.boxHeight - this.height) / 2
 * 
 * @param Window Width
 * @desc Width for the window. Default: 400
 * @default 400
 * 
 * @param Window Height
 * @desc Height for the window. Processed as eval. Default: this.fittingHeight(Math.min(this.numVisibleRows(), 12));
 * @default this.fittingHeight(Math.min(this.numVisibleRows(), 12));
 * 
 * @param Status Width
 * @desc Width for the status (ON/OFF, etc). Processed as eval. Default: 120
 * @default 120
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Enter switch ids for the parameter Switches. You can include ranges.
 * Example:
 * 1-4 9 11-13 
 * Will include the numbers 1, 2, 3, 4, 9, 11, 12, 13
 * 
 * In the options menu, the name you use for these switches will appear.
 * ============================================================================
 * Tips & Tricks
 * ============================================================================
 * To make a window the size of game window, use:
 *  Graphics.boxWidth for width
 *  Graphics.boxHeight for height
 *  You can also use those for calculations.
 *  
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
Imported.DreamX_Options = true;

var DreamX = DreamX || {};
DreamX.Options = DreamX.Options || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Options');
    var paramSwitches = String(parameters['Switches']);
    var paramOnText = String(parameters['ON Text']);
    var paramOffText = String(parameters['OFF Text']);

    var paramWindowWidth = String(parameters['Window Width']);
    var paramWindowHeight = String(parameters['Window Height']);

    var paramWindowX = String(parameters['Window X']);
    var paramWindowY = String(parameters['Window Y']);

    var paramStatusWidth = String(parameters['Status Width']);

    DreamX.Options.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        DreamX.Options.Window_Options_makeCommandList.call(this);
        this.addSwitchOptions();
    };

    Window_Options.prototype.updatePlacement = function () {
        this.x = eval(paramWindowX);
        this.y = eval(paramWindowY);
    };

    Window_Options.prototype.windowWidth = function () {
        return eval(paramWindowWidth);
    };

    Window_Options.prototype.windowHeight = function () {
        return eval(paramWindowHeight);
    };

    Window_Options.prototype.statusWidth = function () {
        return eval(paramStatusWidth);
    };

    Window_Options.prototype.addSwitchOptions = function () {
        var ids = DreamX.parseNumberRanges(paramSwitches);
        for (var i = 0; i < ids.length; i++) {
            var id = ids[i];
            if (id <= 0) {
                continue;
            }
            var name = $dataSystem.switches[id];
            var symbol = 'switch_' + id;

            this.addCommand(name, symbol);
        }
    };

    DreamX.Options.Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function (symbol, value) {
        var switchId = this.getSwitchId(symbol);
        if (switchId === -1) {
            return DreamX.Options.Window_Options_changeValue.call(this, symbol, value);
        }
        var lastValue = $gameSwitches.value(switchId);
        if (lastValue !== value) {
            $gameSwitches.setValue(switchId, value);
            this.redrawItem(this.findSymbol(symbol));
            SoundManager.playCursor();
        }
    };

    Window_Options.prototype.getSwitchId = function (symbol) {
        if (symbol.indexOf("switch_") === -1) {
            return -1;
        }
        return symbol.split("switch_")[1];
    }

    DreamX.Options.Window_Options_statusText = Window_Options.prototype.statusText;
    Window_Options.prototype.statusText = function (index) {
        var symbol = this.commandSymbol(index);
        var switchId = this.getSwitchId(symbol);
        if (switchId === -1) {
            return DreamX.Options.Window_Options_statusText.call(this, index);
        }

        var value = $gameSwitches.value(switchId);
        return this.booleanStatusText(value);
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

    Window_Options.prototype.booleanStatusText = function (value) {
        return value ? paramOnText : paramOffText;
    };

})();
