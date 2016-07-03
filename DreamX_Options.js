/*:
 * @plugindesc v1.1 Options for the option menu
 * @author DreamX
 * 
 * @param --General Options--
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
 * @help
 * ============================================================================
 * Json Help
 * ============================================================================
 * The json file is used to customize extra things for this plugin. 
 * You can take a look at the sample provided by me to find out how to 
 * structure it. Take a close look at the names, values and commas. The commas 
 * are especially important because they can make a json file unusable if 
 * placed improperly. A comma needs to placed for every entry in a list 
 * aside from the last one. The last one must not have a comma.
 * 
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
 * Tips & Tricks
 * ============================================================================
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
        }

    };

    DreamX.Options.Window_Options_select = Window_Options.prototype.select;
    Window_Options.prototype.select = function (index) {
        DreamX.Options.Window_Options_select.call(this, index);
        if (!paramShowHelp) {
            return;
        }

        var helpWindow = SceneManager._scene._helpWindow;
        if (helpWindow && index >= 0) {
            var symbol = this.commandSymbol(index);
            var helpText = DreamX.Options.helpText[symbol];
            if (helpText) {
                helpWindow.setText(helpText);
            }
        }
    };

    DreamX.Options.Window_Options_makeCommandList = Window_Options.prototype.makeCommandList;
    Window_Options.prototype.makeCommandList = function () {
        DreamX.Options.Window_Options_makeCommandList.call(this);
        if (Imported.YEP_CoreEngine) {
            this.addVideoOptions();
        }

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
        if (symbol === 'resolution') {
            this.changeResolutionValue(symbol, value);
            return;
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            this.changeSwitchValue(symbol, value, switchId);
            return;
        }

        if (symbol === 'fullscreen') {
            Graphics._switchFullScreen();
        }
        DreamX.Options.Window_Options_changeValue.call(this, symbol, value);
    };

    Window_Options.prototype.redrawAndPlayCursor = function (symbol) {
        this.redrawItem(this.findSymbol(symbol));
        SoundManager.playCursor();
    };

    Window_Options.prototype.changeSwitchValue = function (symbol,
            value, switchId) {
        var lastValue = $gameSwitches.value(switchId);
        if (lastValue !== value) {
            $gameSwitches.setValue(switchId, value);
            this.redrawAndPlayCursor(symbol);
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

        if (symbol === 'resolution') {
            return this.resStatusText();
        }

        var switchId = this.getSwitchId(symbol);
        if (switchId !== -1) {
            return this.switchStatusText(switchId);
        }
        return DreamX.Options.Window_Options_statusText.call(this, index);
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

        DreamX.Options.Window_Options_processOk.call(this);
    };

//=============================================================================
// Resolution Options
//=============================================================================
    ConfigManager.fullscreen = false;

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
            ConfigManager.load();
            if (!ConfigManager.resolution || !Utils.isNwjs()) {
                DreamX.Options.SceneManager_run.call(this, sceneClass);
            } else {
                this.changeResolution();
            }
            Yanfly.Core.SceneManager_run.call(this, sceneClass);
            if (ConfigManager.fullscreen) {
                Graphics._requestFullScreen();
            }

        };
    }

    DreamX.Options.ConfigManager_makeData = ConfigManager.makeData;
    ConfigManager.makeData = function () {
        var config = DreamX.Options.ConfigManager_makeData.call(this);
        config.resolution = this.resolution;
        config.fullscreen = this.fullscreen;
        return config;
    };

    DreamX.Options.ConfigManager_applyData = ConfigManager.applyData;
    ConfigManager.applyData = function (config) {
        DreamX.Options.ConfigManager_applyData.call(this, config);
        this.resolution = config.resolution;
        this.fullscreen = config.fullscreen;
    };

    Window_Options.prototype.currentResString = function () {
        if (ConfigManager.resolution) {
            return ConfigManager.resolution;
        }
        return Graphics.boxWidth + " " + Graphics.boxHeight;
    };

    SceneManager.changeResolution = function () {
        var split = ConfigManager.resolution.split(" ");
        var w = parseInt(split[0]);
        var h = parseInt(split[1]);

        Graphics.boxWidth = w;
        Graphics.boxHeight = h;
        SceneManager._screenWidth = w;
        SceneManager._screenHeight = h;
        SceneManager._boxWidth = w;
        SceneManager._boxHeight = h;

        var resizeWidth = Graphics.boxWidth - window.innerWidth;
        var resizeHeight = Graphics.boxHeight - window.innerHeight;
        window.moveBy(-1 * resizeWidth / 2, -1 * resizeHeight / 2);

        window.resizeBy(resizeWidth, resizeHeight);

        if (eval(Yanfly.Param.OpenConsole))
            this.openConsole();
    };



    Window_Options.prototype.changeResolutionValue = function (symbol, value) {
        if (ConfigManager.resolution !== value) {
            ConfigManager.resolution = value;
            this.redrawAndPlayCursor(symbol);
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

    DreamX.Options.Window_Options_cursorRight = Window_Options.prototype.cursorRight;
    Window_Options.prototype.cursorRight = function (wrap) {
        var index = this.index();
        var symbol = this.commandSymbol(index);
        if (symbol === 'resolution') {
            this.resolutionChange(symbol, false, 'forward');
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
        DreamX.Options.Window_Options_cursorLeft.call(this, wrap);
    };

})();
