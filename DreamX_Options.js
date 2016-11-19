/*:
 * @plugindesc v1.9 Options for the option menu
 * @author DreamX
 * 
 * @param --General Options--
 * 
 * @param Switches
 * @desc Ids of switches to have in the menu. Keep blank for none.
 * @default 
 * 
 * @param Persistent Switches
 * @desc Ids of switches that are persistent. Keep blank for none.
 * @default 
 *  
 * @param Persistent Variables
 * @desc Ids of variables that are persistent. Keep blank for none.
 * @default 
 * 
 * @param Common Event
 * @desc Common event to run after options menu is exited and player returns to map. 0 for none. Default: 0
 * @default 0
 * 
 * @param ON Text
 * @desc Test to display for options that are set to ON. Default: ON
 * @default ON
 * 
 * @param OFF Text
 * @desc Test to display for options that are set to OFF. Default: OFF
 * @default OFF
 * 
 * @param --Window Options--
 * @param Recommended Window Settings
 * @desc This will ignore other window options in this section and configure the windows how the plugin author recommends.  Default: false
 * @default false
 * 
 * @param Window X
 * @desc X for the options window. Processed as eval. Default: (Graphics.boxWidth - this.width) / 2
 * @default (Graphics.boxWidth - this.width) / 2
 * 
 * @param Window Y
 * @desc Y for the options window. Processed as eval. Default: (Graphics.boxHeight - this.height) / 2
 * @default (Graphics.boxHeight - this.height) / 2
 * 
 * @param Window Width
 * @desc Width for the options window. Default: 400
 * @default 400
 * 
 * @param Window Height
 * @desc Height for the options window. Processed as eval. Default: this.fittingHeight(Math.min(this.numVisibleRows(), 12));
 * @default this.fittingHeight(Math.min(this.numVisibleRows(), 12));
 * 
 * @param Status Width
 * @desc Width for the status (ON/OFF, etc). Processed as eval. Default: 120
 * @default 120
 * 
 * @param Show Help Text
 * @desc Whether to show a help window. Default: false
 * @default false
 * 
 * @param Help X
 * @desc X for the help window. Processed as eval.
 * @default 0
 * 
 * @param Help Y
 * @desc Y for the help window. Processed as eval.
 * @default 0
 * 
 * @param Help Width
 * @desc Width for the help window.
 * @default 200
 * 
 * @param Help Height
 * @desc Height for the help window. Processed as eval. Leave blank to let lines define height.
 * @default 
 * 
 * @param Help Lines
 * @desc This will determine the number of lines if Help Height is blank. Default: 2
 * @default 2
 * 
 * @param --Json Options--
 *  
 * @param Json Filename
 * @desc The filename for the json file. Do not include file type. Default: DreamX_Options
 * @default DreamX_Options
 * 
 * @param Json Folder
 * @desc The folder where the json is. Leave blank for root folder. Default: data/
 * @default data/
 * 
 * @param --Video Options--
 * 
 * @param Resolution Option
 * @desc Whether to add a resolution option. Default: false
 * @default false
 * 
 * @param Resolution Option Text
 * @desc Text to display for resolution.
 * @default Resolution
 * 
 * @param Fullscreen Option
 * @desc Whether to add a fullscreen option. Default: false
 * @default false
 * 
 * @param Fullscreen Option Text
 * @desc Text for fullscreen option.
 * @default Fullscreen
 * 
 * @param Resize Everything
 * @desc WIP, currently does not work. default: false
 * @default false
 * 
 * @param --Default Options--
 * 
 * @param Default Options First
 * @desc Show default options first Default: true
 * @default true
 * 
 * @param Show Always Dash
 * @desc Whether to show always dash option. Default: true
 * @default true
 * 
 * @param Show Command Remember
 * @desc Whether to show command remember option. Default: true
 * @default true
 * 
 * @param Show BGM Volume
 * @desc Whether to show bgm volume option. Default: true
 * @default true
 * 
 * @param Show BGS Volume
 * @desc Whether to show bgs volume option. Default: true
 * @default true
 * 
 * @param Show ME Volume
 * @desc Whether to show me volume option. Default: true
 * @default true
 * 
 * @param Show SE Volume
 * @desc Whether to show se volume option. Default: true
 * @default true
 * 
 * @help
 * ============================================================================
 * Json Help - General
 * ============================================================================
 * The json file is used to customize extra things for this plugin. 
 * You can take a look at the sample provided by me to find out how to 
 * structure it. Take a close look at the names, values and commas. The commas 
 * are especially important because they can make a json file unusable if 
 * placed improperly. A comma needs to placed for every entry in a list 
 * aside from the last one. The last one must not have a comma.
 * 
 * ============================================================================
 * Json Help - Variables
 * ============================================================================
 * A "step" for the variable is the interval that is increased or decreased 
 * when changing the value.
 * 
 * If a variable option's value is less than the mininimum, greater than the 
 * maximum or not a multiple of the step value, then it will get reinitialized 
 * to the minimum.
 * ============================================================================
 * Json Help - Locks
 * ============================================================================
 * You can use the json file to lock options. See the example json file.
 * 
 * You will use the symbol (for example, "commandRemember" in the example 
 * json file). User-defined switches and variables use the same symbol style as 
 * in the HELP_TEXT section of the example json file.
 * 
 * The "condition" attribute decides whether to lock the option or not. 
 * You will enter javascript there. If you need to use more than one line, 
 * I suggest putting a function call in there. 
 * If the condition evaluates as true, the option will be locked.
 * 
 * "reset" decides whether to change the value of the option after resetting. 
 * You will enter javascript there. A simple true or false will probably 
 * suffice.
 * 
 * "resetValue" only applies if the option is set to reset upon locking, so 
 * don't worry about this if you're not resetting the value. This attribute 
 * is what the value of the option is changed to upon resetting. In most cases,
 * a number, true, or false will suffice.
 * 
 * If you need to use quotes, make sure to escape them. For example, if you 
 * want to reset the resolution to 816 x 624, you would use 
 * "\"816 624\""
 * as the reset value.
 * ============================================================================
 * Json Help - Help Text
 * ============================================================================
 * Use the symbol for the option in the help text section, to set help text.
 * Switches will be switch_x with x as the id, variables will be variable_x 
 * with x as the id.
 * You can do this with options from other plugins, too.
 * 
 * For other plugins that add options, you should first ask the plugin author 
 * what the symbols for the options are. If this is convenient for you, you can 
 * search for "this.addCommand" (without quotes) In the plugin file. The one(s) 
 * you are looking for will probably be within the Window_Options class. 
 * 
 * For example, if I do that in Yanfly's Keyboard Config file, I'll find this 
 * in a function in the Window_Options class: 
 * 
 * this.addCommand(Yanfly.Param.KeyConfigName, 'keyConfig', true);
 * 
 * So, the symbol is 'keyConfig'
 * I will add an entry under HELP_TEXT in the json file using this symbol.
 * For example, I would add this: 
 *  
 * "keyConfig": "This will allow you to configure the keys",
 *  
 * You're going to do it the same way as the other help text examples, so make 
 * sure that if its the last entry, it does NOT have a comma at the end, 
 * otherwise it should. 
 * ============================================================================
 * Switches Parameter Help
 * ============================================================================
 * Enter switch ids for the parameter Switches. You can include ranges.
 * Example:
 * 1-4 9 11-13 
 * Will include the numbers 1, 2, 3, 4, 9, 11, 12, 13
 * 
 * In the options menu, the name you use for these switches will appear.
 * ============================================================================
 * Persistency Help
 * ============================================================================
 * Switches and variables made persistent will be the same for every 
 * playthrough of your game. If whenever a persistent switch/variable is 
 * changed in one playthrough, it will also be changed in another playthrough, 
 * including when loading saves.
 * 
 * To reset this and the game options, delete config.rpgsave from the 
 * save folder. When sending your game to your players, don't send them this 
 * file, so they don't have your playthrough data and option choices 
 * affecting their playthrough.
 * ============================================================================
 * Tips & Tricks
 * ============================================================================
 * Resolution and fullscreen options require YEP Core Engine.
 * 
 * Any option change meant to persist between all saves (like the always dash 
 * option) is only saved when you close out of the options menu, which is how 
 * the default program and most other games in general work. 
 * 
 * Make sure that your game's default resolution (whatever the resolution is 
 * when you haven't set any in-game options is put into the json file somewhere, 
 * before enabling the resolution option. The sample json are provide already 
 * includes the default 816 x 624 resolution that occurs in RPG Maker MV 
 * without any plugins.
 *
 * If you made a mistake with your options, you can delete the config.rpgsave 
 * file in the save folder to reset them.
 * 
 * When choosing resolutions, you should generally use a width and height that 
 * is a multiple of the tile size you are using. Not doing so will result in 
 * black borders on the sides of the screen while on the map.
 * 
 * If you find that your game is too blurry looking when changing resolution or 
 * becoming fullscreen, you can try adding
 * <style type="text/css"> CANVAS{image-rendering: pixelated;}</style>
 * within the html tags of index.html of your project.
 * 
 * Note that depending on which resolution you chose and/or the sizes of the  
 * sprites, this make the game look quite pixelated. Experiment to choose 
 * what is best for your game.
 * 
 * When writing help text, you can use \n to do a line break.
 * 
 * To make a window the size of game window, use:
 *  Graphics.boxWidth for width
 *  Graphics.boxHeight for height
 *  You can also use those for calculations.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for resolution changing snippet from YEP Core Engine.
 */



var Imported = Imported || {};
Imported.DreamX_Options = true;

var DreamX = DreamX || {};
DreamX.Options = DreamX.Options || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Options');
    var paramSwitches = String(parameters['Switches']);
    var paramPersistentSwitches = String(parameters['Persistent Switches']);
    var paramPersistentVariables = String(parameters['Persistent Variables']);

    var paramOnText = String(parameters['ON Text']);
    var paramOffText = String(parameters['OFF Text']);
    var paramWindowWidth = String(parameters['Window Width']);
    var paramWindowHeight = String(parameters['Window Height']);
    var paramWindowX = String(parameters['Window X']);
    var paramWindowY = String(parameters['Window Y']);
    var paramStatusWidth = String(parameters['Status Width']);

    var paramResolutionOption = eval(parameters['Resolution Option']);
    var paramResolutionText = String(parameters['Resolution Option Text']);

    var paramFullscreenOption = eval(parameters['Fullscreen Option']);
    var paramFullscreenText = String(parameters['Fullscreen Option Text']);
    var paramFileFolder = String(parameters['Json Folder']);
    var paramFileName = String(parameters['Json Filename']);

    var paramShowHelp = eval(parameters['Show Help Text']);

    var paramHelpWidth = String(parameters['Help Width']);
    var paramHelpHeight = String(parameters['Help Height']);
    var paramHelpX = String(parameters['Help X']);
    var paramHelpY = String(parameters['Help Y']);
    var paramHelpLines = String(parameters['Help Lines']);

    var paramRecommended = eval(parameters['Recommended Window Settings']);
    var paramShowAlwaysDash = eval(parameters['Show Always Dash']);
    var paramShowCommandRemember = eval(parameters['Show Command Remember']);
    var paramShowBgmVolume = eval(parameters['Show BGM Volume']);
    var paramShowBgsVolume = eval(parameters['Show BGS Volume']);
    var paramShowMeVolume = eval(parameters['Show ME Volume']);
    var paramShowSeVolume = eval(parameters['Show SE Volume']);

    var paramCommonEvent = String(parameters['Common Event']);
    //var paramResizeAll = eval(parameters['Resize Everything']);
    var paramResizeAll = false;

    var paramDefOptionsFirst = eval(parameters['Default Options First']);

    DreamX.Options.Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function () {
        if (!DreamX.Options.loaded) {
            return false;
        }
        return DreamX.Options.Scene_Boot_isReady.call(this);
    };

    DreamX.Options.dataFileName = function () {
        return paramFileFolder + paramFileName + ".json";
    };

    DreamX.Options.callback = function (data) {
        DreamX.Options.loaded = true;
        DreamX.Options.helpText = data.HELP_TEXT;
        DreamX.Options.variables = data.VARIABLES;
        DreamX.Options.locks = data.LOCKS;

        DreamX.Options.videoSettingsSizes = [];
        DreamX.Options.videoSettingNames = [];
        var videoSettings = data.VIDEO;
        for (var key in videoSettings) {
            var settings = videoSettings[key];
            var string = settings.w + " " + settings.h;
            DreamX.Options.videoSettingNames.push(key);
            DreamX.Options.videoSettingsSizes.push(string);
        }
    };

    // thanks to Iavra
    DreamX.Options.loadData = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            callback(JSON.parse(request.response));
        };
        request.onerror = function () {
            //throw new Error("There was an error loading the file '" + url + "'.");
            DreamX.Options.loaded = true;
        };
        request.send();
    };

    DreamX.Options.Scene_Boot_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        DreamX.Options.Scene_Boot_create.call(this);
        DreamX.Options.loaded = false;
        DreamX.Options.loadData(DreamX.Options.dataFileName(),
                DreamX.Options.callback);
    };

    DreamX.Options.Scene_Options_createOptionsWindow = Scene_Options.prototype.createOptionsWindow;
    Scene_Options.prototype.createOptionsWindow = function () {
        if (paramRecommended) {
            var tempHelpWindowHeight = new Window_Help(3).height;
            paramWindowWidth = Graphics.boxWidth;
            paramWindowHeight = Graphics.boxHeight - tempHelpWindowHeight;
            paramWindowX = 0;
            paramWindowY = tempHelpWindowHeight;
            paramHelpWidth = Graphics.boxWidth;
            paramHelpHeight = false;
            paramHelpX = 0;
            paramHelpY = 0;
            paramHelpLines = 3;
            paramShowHelp = true;
        }

        DreamX.Options.Scene_Options_createOptionsWindow.call(this);
        if (paramShowHelp) {
            var helpHeight = eval(paramHelpHeight);
            var lines = helpHeight ? undefined : eval(paramHelpLines);

            this._helpWindow = new Window_Help(lines);
            this._helpWindow.x = eval(paramHelpX);
            this._helpWindow.y = eval(paramHelpY);
            this._helpWindow.width = eval(paramHelpWidth);

            if (helpHeight) {
                this._helpWindow.height = eval(helpHeight);
            }

            this._optionsWindow.setHelpWindow(this._helpWindow);
            this.addWindow(this._helpWindow);
            this._optionsWindow.setHelpText(0);
        }
    };

    DreamX.Options.Scene_Options_terminate = Scene_Options.prototype.terminate;
    Scene_Options.prototype.terminate = function () {
        DreamX.Options.Scene_Options_terminate.call(this);
        if (paramCommonEvent) {
            $gameTemp.reserveCommonEvent(paramCommonEvent);
        }

    };

    DreamX.Options.Window_Options_select = Window_Options.prototype.select;
    Window_Options.prototype.select = function (index) {
        DreamX.Options.Window_Options_select.call(this, index);
        if (!paramShowHelp) {
            return;
        }

        if (index >= 0) {
            this.setHelpText(index);
        }
    };

    Window_Options.prototype.setHelpText = function (index) {
        var helpWindow = SceneManager._scene._helpWindow;
        if (!helpWindow) {
            return;
        }
        var symbol = this.commandSymbol(index);
        var helpTextData = DreamX.Options.helpText;
        if (!helpTextData) {
            return;
        }
        var helpText = helpTextData[symbol];
        if (!helpText) {
            return;
        }
        var variableId = this.getVariableId(symbol);
        if (helpText === Object(helpText)) {
            if (variableId !== -1) {
                var currentValue = $gameVariables.value(variableId);
                if (helpText[currentValue]) {
                    helpText = helpText[currentValue];
                } else {
                    return;
                }
            } else {
                return;
            }
        }

        helpWindow.setText(helpText);
    };

    Window_Options.prototype.removeDefaultOptions = function () {
        var cmdsToRemove = [];
        if (!paramShowAlwaysDash) {
            cmdsToRemove.push('alwaysDash');
        }
        if (!paramShowCommandRemember) {
            cmdsToRemove.push('commandRemember');
        }
        if (!paramShowBgmVolume) {
            cmdsToRemove.push('bgmVolume');
        }
        if (!paramShowBgsVolume) {
            cmdsToRemove.push('bgsVolume');
        }
        if (!paramShowMeVolume) {
            cmdsToRemove.push('meVolume');
        }
        if (!paramShowSeVolume) {
            cmdsToRemove.push('seVolume');
        }

        for (var i = 0; i < cmdsToRemove.length; i++) {
            var symbol = cmdsToRemove[i];
            var cmd = this._list.filter(function (c) {
                return c.symbol === symbol;
            })[0];
            var index = this._list.indexOf(cmd);

            this._list.splice(index, 1);
        }
    };

    DreamX.Options.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        if (!paramDefOptionsFirst) {
            this.addCustomOptions();
        }
        DreamX.Options.Window_Options_makeCommandList.call(this);
        this.removeDefaultOptions();

        if (paramDefOptionsFirst) {
            this.addCustomOptions();
        }

        this.updateLocks();
    };

    Window_Options.prototype.addCustomOptions = function () {
        if (Imported.YEP_CoreEngine) {
            this.addVideoOptions();
        }

        this.addSwitchOptions();
        this.addVariableOptions();
    };

    Window_Options.prototype.updateLocks = function () {
        this._lockedSymbols = [];

        var locks = DreamX.Options.locks;
        if (!locks) {
            return;
        }

        var list = this._list;

        if (list.length <= 0) {
            return;
        }
        for (var key in locks) {
            var cmd = list.filter(function (listCmd) {
                return listCmd.symbol === key;
            })[0];

            if (!cmd) {
                continue;
            }

            var symbol = cmd.symbol;

            var lock = locks[key];

            var disabled = eval(lock.condition);

            if (disabled) {
                cmd.enabled = false;

                if (eval(lock.reset)) {
                    //currentValue
                    var newValue = eval(lock.resetValue);

                    if (newValue !== this.currentValue(symbol)) {
                        this.changeValue(symbol, newValue);
                    }
                }

                this._lockedSymbols.push(symbol);
            } else {
                cmd.enabled = true;
            }

            if (this.visible) {
                this.redrawItem(this.findSymbol(symbol));
            }
        }
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

    Window_Options.prototype.currentValue = function (symbol) {
        if (symbol === 'resolution') {
            return this.currentResString();
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            return $gameSwitches.value(switchId);
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            return $gameVariables.value(variableId);
        }

        return this.getConfigValue(symbol);
    };

    Window_Options.prototype.addVariableOptions = function () {
        var vars = DreamX.Options.variables;
        for (var key in vars) {
            var data = vars[key];
            var min = parseInt(data.min);
            var max = parseInt(data.max);

            if (min >= max) {
                continue;
            }

            var step = data.step;

            if (!step) {
                continue;
            }

            var id = parseInt(key);
            var symbol = 'variable_' + id;
            var name = $dataSystem.variables[id];
            var curr = $gameVariables.value(id);

            if (curr > max || curr < min || curr % step !== 0) {
                $gameVariables.setValue(id, min);
            }

            this.addCommand(name, symbol);
        }
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

    Window_Options.prototype.getVariableId = function (symbol) {
        if (symbol.indexOf("variable_") === -1) {
            return -1;
        }
        return symbol.split("variable_")[1];
    }

    DreamX.Options.Window_Options_changeValue = Window_Options.prototype.changeValue;
    Window_Options.prototype.changeValue = function (symbol, value) {
        // cant change value of locked cmds
        if (this._lockedSymbols.indexOf(symbol) !== -1) {
            return;
        }

        if (symbol === 'resolution') {
            this.changeResolutionValue(symbol, value);
            this.updateLocks();
            return;
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            this.changeSwitchValue(symbol, value, switchId);
            this.updateLocks();
            return;
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            this.changeVariableValue(symbol, value, variableId);
            this.updateLocks();
            return;
        }

        if (symbol === 'fullscreen') {
            if (value) {
                Graphics._requestFullScreen();
            } else {
                Graphics._cancelFullScreen();
            }
        }
        DreamX.Options.Window_Options_changeValue.call(this, symbol, value);
        this.updateLocks();
    };

    Window_Options.prototype.changeVariableValue = function (symbol,
            value, variableId) {
        var lastValue = $gameVariables.value(variableId);
        if (lastValue !== value) {
            $gameVariables.setValue(variableId, value);
            this.redrawAndPlayCursor(symbol);
            this.setHelpText(this.index());
        }
    };

    Window_Options.prototype.changeSwitchValue = function (symbol,
            value, switchId) {
        var lastValue = $gameSwitches.value(switchId);
        if (lastValue !== value) {
            $gameSwitches.setValue(switchId, value);
            this.redrawAndPlayCursor(symbol);
        }
    };

    Window_Options.prototype.redrawAndPlayCursor = function (symbol) {
        this.redrawItem(this.findSymbol(symbol));
        SoundManager.playCursor();
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

        if (symbol === 'resolution') {
            return this.resStatusText();
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            return this.switchStatusText(switchId);
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            return this.variableStatusText(variableId);
        }

        return DreamX.Options.Window_Options_statusText.call(this, index);
    };

    Window_Options.prototype.variableStatusText = function (variableId) {
        var string = $gameVariables.value(variableId);
        var data = DreamX.Options.variables[variableId.toString()];
        if (data.percent && eval(data.percent)) {
            string += '%';
        }
        if (data.value_text && data.value_text[string]) {
            string = data.value_text[string];
        }
        return string;
    };

    Window_Options.prototype.switchStatusText = function (switchId) {
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

    DreamX.Options.Window_Options_processOk = Window_Options.prototype.processOk;
    Window_Options.prototype.processOk = function () {
        var index = this.index();
        var symbol = this.commandSymbol(index);

        if (symbol === 'resolution') {
            this.resolutionChange(symbol, true, 'forward');
            return;
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            var value = $gameSwitches.value(switchId);
            this.changeValue(symbol, !value);
            return;
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            this.variableChange(symbol, true, 'forward', variableId);
            return;
        }

        DreamX.Options.Window_Options_processOk.call(this);
    };


    Window_Options.prototype.variableChange = function (symbol, wrap, type, variableId) {
        var data = DreamX.Options.variables[variableId];
        var step = parseInt(data.step);
        var min = parseInt(data.min);
        var max = parseInt(data.max);
        var curr = $gameVariables.value(variableId);

        var next = type === 'forward' ? curr + step : curr - step;

        if (next > max) {
            next = min;
        } else if (next < min) {
            next = max;
        }

        this.changeValue(symbol, next);
    };

    DreamX.Options.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function (wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);

        if (symbol === 'resolution') {
            this.resolutionChange(symbol, false, 'forward');
            return;
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            this.variableChange(symbol, true, 'forward', variableId);
            return;
        }

        DreamX.Options.Window_Options_cursorRight.call(this, wrap);
    };

    DreamX.Options.Window_Options_cursorLeft = Window_Options.prototype.cursorLeft;
    Window_Options.prototype.cursorLeft = function (wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);

        if (symbol === 'resolution') {
            this.resolutionChange(symbol, false, 'backward');
            return;
        }

        var variableId = this.getVariableId(symbol);
        if (variableId !== -1) {
            this.variableChange(symbol, true, 'backward', variableId);
            return;
        }

        DreamX.Options.Window_Options_cursorLeft.call(this, wrap);
    };

//=============================================================================
// Resolution Options
//=============================================================================
    ConfigManager.fullscreen = false;

    DreamX.Options.Graphics_requestFullScreen = Graphics._requestFullScreen;
    Graphics._requestFullScreen = function () {
        DreamX.Options.Graphics_requestFullScreen.call(this);
        this._syncFullScreenOption(true);
    };

    DreamX.Options.Graphics_cancelFullScreen = Graphics._cancelFullScreen;
    Graphics._cancelFullScreen = function () {
        DreamX.Options.Graphics_cancelFullScreen.call(this);
        this._syncFullScreenOption(false);
    };

    Graphics._syncFullScreenOption = function (value) {
        ConfigManager.fullscreen = value;
        ConfigManager.save();

        var scene = SceneManager._scene;
        if (scene instanceof Scene_Options && paramFullscreenOption) {
            var window = scene._optionsWindow;
            window.redrawItem(window.findSymbol('fullscreen'));
        }
    };

    Window_Options.prototype.addVideoOptions = function () {
        var sizes = DreamX.Options.videoSettingsSizes;
        if (sizes && sizes.length >= 1 && paramResolutionOption) {
            this.addCommand(paramResolutionText, 'resolution');
        }
        if (paramFullscreenOption) {
            this.addCommand(paramFullscreenText, 'fullscreen');
        }
    };

    if (Imported.YEP_CoreEngine) {
        DreamX.Options.SceneManager_run = SceneManager.run;
        SceneManager.run = function (sceneClass) {
            ConfigManager.loadResolution();
            this.setSceneWidthHeight();
            DreamX.Options.SceneManager_run.call(this, sceneClass);
            if (ConfigManager.fullscreen) {
                Graphics._requestFullScreen();
            }
        };
    }

    DreamX.Options.Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function () {
        DreamX.Options.Scene_Boot_start.call(this);
        this.resizeAll();
    };

    Scene_Boot.prototype.resizeAll = function () {
        if (!ConfigManager.resolution) {
            return;
        }
        if (!paramResizeAll) {
            return;
        }

        var split = ConfigManager.resolution.split(" ");
        var w = parseInt(split[0]);
        var h = parseInt(split[1]);


        window.resizeTo(w + (window.outerWidth - window.innerWidth), h + (window.outerHeight - window.innerHeight));
        setTimeout(function () {
            Graphics._canvas.style.width = w + "px";
            Graphics._canvas.style.height = h + "px";
        }, 500);

    };
    SceneManager.setSceneWidthHeight = function () {
        if (!ConfigManager.resolution) {
            return;
        }
        if (paramResizeAll) {
            return;
        }
        var split = ConfigManager.resolution.split(" ");
        var w = parseInt(split[0]);
        var h = parseInt(split[1]);

        SceneManager._screenWidth = w;
        SceneManager._boxWidth = w;
        Yanfly.Param.ScreenWidth = w;

        SceneManager._screenHeight = h;
        SceneManager._boxHeight = h;
        Yanfly.Param.ScreenHeight = h;
    };

    ConfigManager.loadResolution = function () {
        var json;
        var config = {};
        try {
            json = StorageManager.load(-1);
        } catch (e) {
            console.error(e);
        }
        if (json) {
            config = JSON.parse(json);
        }
        this.resolution = config.resolution;
        this.fullscreen = config.fullscreen;
    };

    DreamX.Options.ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        var config = DreamX.Options.ConfigManager_makeData.call(this);
        config.resolution = this.resolution;
        config.fullscreen = this.fullscreen;
        config.switches = this.switches;
        config.variables = this.variables;
        return config;
    };

    DreamX.Options.ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        DreamX.Options.ConfigManager_applyData.call(this, config);
        this.resolution = config.resolution;
        this.fullscreen = config.fullscreen;
        this.switches = config.switches;
        this.variables = config.variables;
    };

    Window_Options.prototype.currentResString = function () {
        if (ConfigManager.resolution) {
            return ConfigManager.resolution;
        }
        return Graphics.boxWidth + " " + Graphics.boxHeight;
    };

    DreamX.Options.Scene_Title_start = Scene_Title.prototype.start;
    Scene_Title.prototype.start = function () {
        if ($gameTemp._resetOnTitle && Utils.isNwjs()) {
            location.reload();
        }
        DreamX.Options.Scene_Title_start.call(this);
    };

    Window_Options.prototype.changeResolutionValue = function (symbol, value) {
        if (ConfigManager.resolution !== value) {
            ConfigManager.resolution = value;
            this.redrawAndPlayCursor(symbol);
            $gameTemp._resetOnTitle = true;
        }
    };

    Window_Options.prototype.resStatusText = function () {
        var names = DreamX.Options.videoSettingNames;
        var sizes = DreamX.Options.videoSettingsSizes;
        var index = sizes.indexOf(this.currentResString());
        return names[index];
    };

    Window_Options.prototype.resolutionChange = function (symbol, wrap, type) {
        var sizes = DreamX.Options.videoSettingsSizes;
        var currentIndex = sizes.indexOf(this.currentResString());
        var newIndex = type === 'forward' ? currentIndex + 1 : currentIndex - 1;
        var next = sizes[newIndex];

        if (!next && wrap) {
            // wrap around
            next = type === 'forward' ? sizes[0] : sizes[sizes.length - 1];
        }

        if (next) {
            this.changeValue(symbol, next);
        }
    };

    DreamX.Options.DataManager_createGameObjects = DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        DreamX.Options.DataManager_createGameObjects.call(this);
        $gameSwitches.setPersistence();
        $gameVariables.setPersistence();
    };

    DreamX.Options.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DreamX.Options.DataManager_extractSaveContents.call(this, contents);
        $gameSwitches.setPersistence();
        $gameVariables.setPersistence();
    };

    Game_Variables.prototype.setPersistence = function () {
        if (!paramPersistentVariables) {
            return;
        }

        if (!ConfigManager.variables) {
            ConfigManager.variables = {};
        }

        var variables = DreamX.parseNumberRanges(paramPersistentVariables);
        for (var i = 0; i < variables.length; i++) {
            var variableId = variables[i];
            if (ConfigManager.variables[variableId] !== undefined) {
                this.setValue(variables, ConfigManager.variables[variableId]);
            }
        }
    };

    Game_Switches.prototype.setPersistence = function () {
        if (!paramPersistentSwitches) {
            return;
        }

        if (!ConfigManager.switches) {
            ConfigManager.switches = {};
        }

        var switches = DreamX.parseNumberRanges(paramPersistentSwitches);
        for (var i = 0; i < switches.length; i++) {
            var switchId = switches[i];
            if (ConfigManager.switches[switchId] !== undefined) {
                this.setValue(switchId, ConfigManager.switches[switchId]);
            }
        }
    };

    DreamX.Options.Game_Variables_setValue = Game_Variables.prototype.setValue;
    Game_Variables.prototype.setValue = function (variableId, value) {
        DreamX.Options.Game_Variables_setValue.call(this, variableId, value);
        var variables = DreamX.parseNumberRanges(paramPersistentVariables);
        if (variables.indexOf(parseInt(variableId)) !== -1) {
            ConfigManager.variables[variableId] = value;
            ConfigManager.save();
        }
    };

    DreamX.Options.Game_Switches_setValue = Game_Switches.prototype.setValue;
    Game_Switches.prototype.setValue = function (switchId, value) {
        DreamX.Options.Game_Switches_setValue.call(this, switchId, value);
        var switches = DreamX.parseNumberRanges(paramPersistentSwitches);
        if (switches.indexOf(parseInt(switchId)) !== -1) {
            ConfigManager.switches[switchId] = !!value;
            ConfigManager.save();
        }
    };

})();
