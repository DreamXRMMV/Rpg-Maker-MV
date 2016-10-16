/*:
 * @plugindesc v1.4
 * @author DreamX
 * 
 * @param Default Cost
 * @desc Default cost for events that don't have a custom cost. 
 * @default 1000
 * 
 * @param Default Icon
 * @desc Default icon for events that don't have a custom icon. 
 * @default 193
 * 
 * @help
 * ============================================================================
 * Important
 * ============================================================================
 * This is a port of Yanfly's Common Event Shop from VX Ace to MV.
 * It requires YEP Shop Core.
 * Please remember to credit Yanfly for the original script this is a port of 
 * and their Shop Menu Core plugin.
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * SetupCESHop x y z
 * Use this to decide the common event ids for the next common event shop 
 * scene. The setup is erased after you exit the shop, so make sure to setup 
 * each time you bring up the common event shop.
 * Replace x y z with any amount of numbers, separated by a space.
 * 
 * OpenCEShop
 * This will bring up the Common Event Shop.
 * ============================================================================
 * Common Event Notetags - These notetags go in a common event's comments.
 * ============================================================================
 * <cost: x>
 * Sets the gold cost of the common event to x gold. If this notetag is not used
 * the default gold cost will be whatever Default Cost is in the parameters.
 * 
 * <cost eval>
 * string
 * cost = x;
 * </cost eval>
 * Advanced users can change the cost through code with this notetag. Replace 
 * string with lines of code to assign a value to the cost variable. 
 * If multiple lines are used, they are considered to be a part of the same 
 * line.
 * 
 * <exit shop>
 * When this event is bought, the player will automatically exit the shop before
 * the common event will take place. If this tag is not used, the common event's
 * contents will take place inside of the common event shop.
 * 
 * <icon: x>
 * Changes the icon used for the common event to x icon index. If this notetag
 * is not used, the icon used for the common event will be whatever Default Icon
 * is in the parameters.
 * 
 * <image: string>
 * Changes the image used for the common event to filename "string" found in
 * the Graphics\Pictures\ folder. If this tag is not used, the image displayed 
 * will be the common event's expanded icon. Image should be 144x144 size or 
 * smaller.
 * 
 * <help description>
 * string
 * </help description>
 * Sets the text used for the help window in the shop scene. Multiple lines in
 * the notebox will be strung together. Text codes may be used inside of the 
 * help description.
 * 
 * <shop data>
 * string
 * </shop data>
 * Sets the string as the text shown inside the data window the shop. Text 
 * codes may be used inside of the shop data text.
 * 
 * <shop variables: x>
 * <shop variables: x, x>
 * This sets the variable x displayed in the status window in the lower right
 * corner of the screen. Insert multiples of this notetag to display more
 * variables inside of the status window.
 * 
 * <shop enable switch: x>
 * <shop enable switch: x, x>
 * This notetag will cause the common event item to require switch x to be ON
 * before the common event can be bought. Insert multiples of these notetags to
 * require more switches to be ON before the common event item can be gouth.
 * 
 * <shop enable eval>
 * string
 * string
 * </shop enable eval>
 * Advanced users can enable and disable common events from being bought through
 * this notetag. Replace string with lines of code to check for whether or not
 * the common event can be sold. If multiple lines are used, they are considered
 * to be a part of the same line.
 * 
 * <shop show switch: x>
 * <shop show switch: x, x>
 * This notetag will cause the common event item to be hidden unless switch x is
 * ON. Insert multiple of these notetags to require more switches to be ON
 * before the common event item will be shown in the shop.
 * 
 * <shop show eval>
 * string
 * string
 * </shop show eval>
 * Advanced users can show and hide common events from being listed in the buy
 * list through this notetag. Replace string with lines of code to check for
 * whether or not the common event will be shown. If multiple lines are used,
 * they are considered to be a part of the same line.
 *
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly for their VXACE Script Common Event Shop and Shop Menu Core 
 * plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly - Original script/plugin.
 */

var Imported = Imported || {};
Imported.DreamX_CommonEventShop = true;

var DreamX = DreamX || {};
DreamX.CommonEventShop = DreamX.CommonEventShop || {};

DreamX.Parameters = PluginManager.parameters('DreamX_CommonEventShop');
DreamX.Param = DreamX.Param || {};

DreamX.Param.DXCESDefaultPrice = parseInt(DreamX.Parameters['Default Cost']);
DreamX.Param.DXCESDefaultIcon = parseInt(DreamX.Parameters['Default Icon']);

DreamX.CommonEventShop.Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    DreamX.CommonEventShop.Game_Interpreter_pluginCommand.call(this, command, args);
    switch (command) {
        case 'SetupCESHop':
            DreamX.CommonEventShop.setupCESHop(args);
            break;
        case 'OpenCEShop':
            SceneManager.push(Scene_CommonEventShop);
            break;
    }
};

DreamX.CommonEventShop.setupCESHop = function (args) {
    var string = "";
    for (var i = 0; i < args.length; i++) {
        string += " " + args[i];
    }
    $gameTemp._commonEventShopIds = DreamX.parseNumberRanges(string);
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

DreamX.CommonEventShop.DataManager_loadDatabase = DataManager.loadDatabase;
DataManager.loadDatabase = function () {
    DreamX.CommonEventShop.DataManager_loadDatabase.call(this);
    if (!Imported.YEP_ShopMenuCore) {
        throw new Error('DreamX_RandomPrefixesSuffixes requires YEP Shop Menu Core');
    }
};

DreamX.CommonEventShop.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
DataManager.isDatabaseLoaded = function () {
    if (!DreamX.CommonEventShop.DataManager_isDatabaseLoaded.call(this))
        return false;
    if (!DreamX.CommonEventShopLoaded) {
        this.processDXCESNotetags($dataCommonEvents);
        DreamX.CommonEventShopLoaded = true;
    }
    return true;
};

// go through common events
DataManager.processDXCESNotetags = function (group) {
    for (var i = 0; i < group.length; i++) {
        var event = group[i];
        if (!event) {
            continue;
        }
        this.processDXCESNotetags2(event);
    }
};

// go through common event's list
DataManager.processDXCESNotetags2 = function (event) {
    var evalMode = 'none';
    event.description = "";
    event.shopData = "";
    event.eventType = "instore";
    event.shopVariables = "";
    event.shopEnableSwitch = "";
    event.shopShowSwitch = "";
    event.shopEnableEval = "";
    event.shopShowEval = "";
    event.costEval = "";
    event.cost = DreamX.Param.DXCESDefaultPrice;
    event.iconIndex = DreamX.Param.DXCESDefaultIcon;
    event.image = "";

    for (var i = 0; i < event.list.length; i++) {
        var cmd = event.list[i];
        if (cmd.code !== 108 && cmd.code !== 408) {
            continue;
        }
        var line = cmd.parameters[0];
        if (line.match(/<(?:COST|shop cost):[ ](\d+)>/i)) {
            event.cost = parseInt(RegExp.$1);
        } else if (line.match(/<(?:ICON|icon index):[ ](\d+)>/i)) {
            event.iconIndex = parseInt(RegExp.$1);
        } else if (line.match(/<(?:IMAGE|image):[ ](.*)>/i)) {
            event.image = String(RegExp.$1);
        } else if (line.match(/<(?:EXIT_SHOP|exit shop)>/i)) {
            event.eventType = 'exit';
        } else if (line.match(/<(?:SHOP_VARIABLES|shop variables):[ ](.*)>/i)) {
            event.shopVariables = String(RegExp.$1);
        } else if (line.match(/<(?:SHOP_ENABLE_SWITCH|shop enable switch):[ ](.*)>/i)) {
            event.shopEnableSwitch = String(RegExp.$1);
        } else if (line.match(/<(?:SHOP_SHOW_SWITCH|shop show switch):[ ](.*)>/i)) {
            event.shopShowSwitch = String(RegExp.$1);
        } else if (line.match(/<(?:HELP_DESCRIPTION|help description)>/i)) {
            evalMode = 'help';
        } else if (line.match(/<\/(?:HELP_DESCRIPTION|help description)>/i)) {
            evalMode = 'none';
        } else if (line.match(/<(?:SHOP_DATA|shop data)>/i)) {
            evalMode = 'shopData';
        } else if (line.match(/<\/(?:SHOP_DATA|shop data)>/i)) {
            evalMode = 'none';
        } else if (line.match(/<(?:SHOP_ENABLE_EVAL|shop enable eval)>/i)) {
            evalMode = 'shopEnableEval';
        } else if (line.match(/<\/(?:SHOP_ENABLE_EVAL|shop enable eval)>/i)) {
            evalMode = 'none';
        } else if (line.match(/<(?:SHOP_SHOW_EVAL|shop show eval)>/i)) {
            evalMode = 'shopShowEval';
        } else if (line.match(/<\/(?:SHOP_SHOW_EVAL|shop show eval)>/i)) {
            evalMode = 'none';
        } else if (line.match(/<(?:COST_EVAL|cost eval)>/i)) {
            evalMode = 'costEval';
        } else if (line.match(/<\/(?:COST_EVAL|cost eval)>/i)) {
            evalMode = 'none';
        } else if (evalMode === 'help') {
            event.description += line + '\n';
        } else if (evalMode === 'shopData') {
            event.shopData += line + '\n';
        } else if (evalMode === 'shopEnableEval') {
            event.shopEnableEval += line + '\n';
        } else if (evalMode === 'shopShowEval') {
            event.shopShowEval += line + '\n';
        } else if (evalMode === 'costEval') {
            event.costEval += line + '\n';
        }
    }

    event.shopVariables = DreamX.parseNumberRanges(event.shopVariables);
    event.shopEnableSwitch = DreamX.parseNumberRanges(event.shopEnableSwitch);
    event.shopShowSwitch = DreamX.parseNumberRanges(event.shopShowSwitch);
};

function Scene_CommonEventShop() {
    this.initialize.apply(this, arguments);
}

Scene_CommonEventShop.prototype = Object.create(Scene_Shop.prototype);
Scene_CommonEventShop.prototype.constructor = Scene_CommonEventShop;

Scene_CommonEventShop.prototype.initialize = function () {
    Scene_Shop.prototype.initialize.call(this);

};

Scene_CommonEventShop.prototype.create = function () {
    Scene_Shop.prototype.create.call(this);
    this.setupInterpreter();
};

Scene_CommonEventShop.prototype.setupInterpreter = function () {
    this._interpreter = new CommontEventShopInterpreter();
    this._messageWindow = new Window_Message();
    this.addChild(this._messageWindow);
};

Scene_CommonEventShop.prototype.prepare = function (goods) {
    this._goods = $gameTemp._commonEventShopIds;
    this._purchaseOnly = true;
    this._item = null;
};

Scene_CommonEventShop.prototype.createStatusWindow = function () {
    var wx = this._dummyWindow.width;
    var wy = this._dummyWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._dummyWindow.height - this._goldWindow.height;
    this._statusWindow = new Window_CommonEventShopStatus(wx, wy, ww, wh);
    this.addWindow(this._statusWindow);
    this._buyWindow.setStatusWindow(this._statusWindow);
    this._sellWindow.setStatusWindow(this._statusWindow);
};

Scene_CommonEventShop.prototype.createInfoWindow = function () {
    var wx = this._commandWindow.width;
    var wy = this._commandWindow.y;
    var ww = Graphics.boxWidth - wx;
    var wh = this._commandWindow.height;
    this._infoWindow = new Window_CommonEventShopInfo(wx, wy, ww, wh);
    this.addWindow(this._infoWindow);
};

Scene_CommonEventShop.prototype.createBuyWindow = function () {
    var wy = this._dummyWindow.y;
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._buyWindow = new Window_CommonEventShopBuy(0, wy, wh, this._goods);
    this._buyWindow.setHelpWindow(this._helpWindow);
    this._buyWindow.setInfoWindow(this._infoWindow);
    this._buyWindow.hide();
    this._buyWindow.setHandler('ok', this.onBuyOk.bind(this));
    this._buyWindow.setHandler('cancel', this.onBuyCancel.bind(this));
    this.addWindow(this._buyWindow);
};

Scene_CommonEventShop.prototype.createCommandWindow = function () {
    this._commandWindow = new Window_CommonEventShopCommand(0, this._purchaseOnly);
    this._commandWindow.y = this._helpWindow.height;
    this.addWindow(this._commandWindow);
    this.setCommandWindowHandlers();
};

Scene_CommonEventShop.prototype.createNumberWindow = function () {
    var wy = this._dummyWindow.y;
    var wh = this._dummyWindow.height;
    this._numberWindow = new Window_CommonEventShopNumber(0, wy, wh);
    this._numberWindow.hide();
    this._numberWindow.setHandler('ok', this.onNumberOk.bind(this));
    this._numberWindow.setHandler('cancel', this.onNumberCancel.bind(this));
    this.addWindow(this._numberWindow);
};

DreamX.CommonEventShop.Scene_CommonEventShop_onNumberOk = Scene_CommonEventShop.prototype.onNumberOk;
Scene_CommonEventShop.prototype.onNumberOk = function () {
    DreamX.CommonEventShop.Scene_CommonEventShop_onNumberOk.call(this);
    this.instoreEvent();
    this.exitEvent();
};

Scene_CommonEventShop.prototype.doBuy = function (number) {
    $gameParty.loseGold(number * this.buyingPrice());
};

Scene_CommonEventShop.prototype.instoreEvent = function () {
    var event = this._item;

    $gameTemp.reserveCommonEvent(event.id);

    if (event.eventType !== "instore") {
        return;
    }
    this._interpreter.setupReservedCommonEvent();
};

Scene_CommonEventShop.prototype.exitEvent = function () {
    var event = this._item;
    if (event.eventType !== "exit") {
        return;
    }
    this.popScene();
};

Scene_CommonEventShop.prototype.update = function () {
    Scene_Shop.prototype.update.call(this);
    this._interpreter.update();
};

Scene_CommonEventShop.prototype.commonEventRefreshWindows = function () {
    this._goldWindow.refresh();
    this._buyWindow.refresh();
    this._infoWindow.refresh();
    this._statusWindow.refresh();
};

Scene_CommonEventShop.prototype.terminate = function () {
    Scene_Shop.prototype.terminate.call(this);
    $gameTemp._commonEventShopIds = [];
};

Scene_CommonEventShop.prototype.maxBuy = function() {
    return 1;
};

//-----------------------------------------------------------------------------
// CommontEventShopInterpreter
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.
function CommontEventShopInterpreter() {
    this.initialize.apply(this, arguments);
}

CommontEventShopInterpreter.prototype = Object.create(Game_Interpreter.prototype);
CommontEventShopInterpreter.prototype.constructor = CommontEventShopInterpreter;

CommontEventShopInterpreter.prototype.update = function () {
    while (this.isRunning()) {
        if (this.updateChild() || this.updateWait()) {
            break;
        }
        SceneManager._scene.commonEventRefreshWindows();
        if (SceneManager.isSceneChanging()) {
            break;
        }
        if (!this.executeCommand()) {
            break;
        }
        if (this.checkFreeze()) {
            break;
        }
    }
};
//-----------------------------------------------------------------------------
// Window_CommonEventShopBuy
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.
function Window_CommonEventShopBuy() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventShopBuy.prototype = Object.create(Window_ShopBuy.prototype);
Window_CommonEventShopBuy.prototype.constructor = Window_CommonEventShopBuy;

Window_CommonEventShopBuy.prototype.makeItemList = function () {
    this._data = [];
    this._price = [];

    if (!this._shopGoods) {
        return;
    }

    for (var i = 0; i < this._shopGoods.length; i++) {
        var eventId = this._shopGoods[i];
        var item = $dataCommonEvents[eventId];
        if (!item) {
            continue;
        }

        if (!this.includes(item)) {
            continue;
        }

        this._data.push(item);

        var cost = item.cost;
        if (item.costEval) {
            eval(item.costEval);
        }
        this._price.push(cost);
    }
};

Window_CommonEventShopBuy.prototype.includes = function (item) {
    if (!this.shopShowSwitch(item)) {
        return false;
    }
    if (!this.shopShowEval(item)) {
        return false;
    }
    return true;
};

Window_CommonEventShopBuy.prototype.shopShowSwitch = function (item) {
    var switches = item.shopShowSwitch;
    for (var i = 0; i < switches.length; i++) {
        var switchId = switches[i];
        if (!$gameSwitches.value(switchId)) {
            return false;
        }
    }

    return true;
};

Window_CommonEventShopBuy.prototype.shopShowEval = function (item) {
    if (!item.shopShowEval) {
        return true;
    }
    return eval(item.shopShowEval);
};

Window_CommonEventShopBuy.prototype.isEnabled = function (item) {
    if (!this.shopEnableSwitch(item)) {
        return false;
    }
    if (!this.shopEnableEval(item)) {
        return false;
    }
    return item && this.price(item) <= this._money;
};

Window_CommonEventShopBuy.prototype.shopEnableSwitch = function (item) {
    var switches = item.shopEnableSwitch;
    for (var i = 0; i < switches.length; i++) {
        var switchId = switches[i];
        if (!$gameSwitches.value(switchId)) {
            return false;
        }
    }

    return true;
};

Window_CommonEventShopBuy.prototype.shopEnableEval = function (item) {
    if (!item.shopEnableEval) {
        return true;
    }
    return eval(item.shopEnableEval);
};

Window_CommonEventShopBuy.prototype.drawItemName = function (item, x, y, width) {
    if (!item) {
        return;
    }
    var iconBoxWidth = Window_Base._iconWidth + 4;
    this.drawIcon(item.iconIndex, x + 2, y + 2);
    this.drawTextEx(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
};

function Window_CommonEventShopCommand() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventShopCommand.prototype = Object.create(Window_ShopCommand.prototype);
Window_CommonEventShopCommand.prototype.constructor = Window_CommonEventShopCommand;

Window_CommonEventShopCommand.prototype.makeCommandList = function () {
    this.addCommand(TextManager.buy, 'buy');
    this.addCommand(TextManager.cancel, 'cancel');
};

//-----------------------------------------------------------------------------
// Window_CommonEventShopStatus
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

function Window_CommonEventShopStatus() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventShopStatus.prototype = Object.create(Window_ShopStatus.prototype);
Window_CommonEventShopStatus.prototype.constructor = Window_CommonEventShopStatus;

Window_CommonEventShopStatus.prototype.refresh = function () {
    this.contents.clear();
    if (!this._item)
        return;
    this.resetTextColor();
    this.resetFontSettings();
    this.drawShopVariables();
};

Window_CommonEventShopStatus.prototype.drawShopVariables = function () {
    var dy = 0;
    var eventVariables = this._item.shopVariables;
    for (var i = 0; i < eventVariables.length; i++) {
        var variableId = eventVariables[i];

        this.drawVariableInfo(variableId, dy);
        dy += this.lineHeight();
        if (dy + this.lineHeight() > this.contents.height) {
            return;
        }
    }

};

Window_CommonEventShopStatus.prototype.drawVariableInfo = function (variableId, dy) {
    this.changeTextColor(this.systemColor());
    var name = $dataSystem.variables[variableId];
    var value = $gameVariables.value(variableId);

    this.drawText(name, 4, dy, this.contents.width - 8, this.lineHeight());
    this.changeTextColor(this.systemColor());
    this.resetTextColor();
    this.drawText(value, 4, dy, this.contents.width - 8, 'right');
};


//-----------------------------------------------------------------------------
// Window_CommonEventShopNumber
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

function Window_CommonEventShopNumber() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventShopNumber.prototype = Object.create(Window_ShopNumber.prototype);
Window_CommonEventShopNumber.prototype.constructor = Window_CommonEventShopNumber;

Window_CommonEventShopNumber.prototype.refresh = function() {
    this.contents.clear();
    this.drawItemName(this._item, 0, this.itemY());
//    this.drawMultiplicationSign();
//    this.drawNumber();
    this.drawTotalPrice();
};

Window_CommonEventShopNumber.prototype.cursorWidth = function() {
    return 0;
};

Window_CommonEventShopNumber.prototype.createButtons = function () {
    var bitmap = ImageManager.loadSystem('ButtonSet');
    var buttonWidth = 48;
    var buttonHeight = 48;
    this._buttons = [];
    for (var i = 4; i < 5; i++) {
        var button = new Sprite_Button();
        var x = buttonWidth * i;
        var w = buttonWidth * (i === 4 ? 2 : 1);
        button.bitmap = bitmap;
        button.setColdFrame(x, 0, w, buttonHeight);
        button.setHotFrame(x, buttonHeight, w, buttonHeight);
        button.visible = false;
        this._buttons.push(button);
        this.addChild(button);
    }
    this._buttons[0].setClickHandler(this.onButtonOk.bind(this));
};

Window_CommonEventShopNumber.prototype.drawItemName = function (item, x, y, width) {
    width = width || 312;
    if (item) {
        var iconBoxWidth = Window_Base._iconWidth + 4;
        this.resetTextColor();
        this.drawIcon(item.iconIndex, x + 2, y + 2);
        this.drawTextEx(item.name, x + iconBoxWidth, y, width - iconBoxWidth);
    }
};

Window_CommonEventShopNumber.prototype.processNumberChange = function () {
};

//-----------------------------------------------------------------------------
// Window_CommonEventShopInfo
//
// The window for inputting quantity of items to buy or sell on the shop
// screen.

function Window_CommonEventShopInfo() {
    this.initialize.apply(this, arguments);
}

Window_CommonEventShopInfo.prototype = Object.create(Window_ShopInfo.prototype);
Window_CommonEventShopInfo.prototype.constructor = Window_CommonEventShopInfo;

Window_CommonEventShopInfo.prototype.drawItemEntry = function () {
    var item = this._item;
    if (eval(Yanfly.Param.ItemShowIcon))
        this.drawItemIcon(item);

    var x = 0;
    if (eval(Yanfly.Param.ItemShowIcon)) {
        x = Window_Base._faceWidth;
    }

    x += this.textPadding();

    this.drawTextEx(item.shopData, x, 0);
};

Window_CommonEventShopInfo.prototype.getRectPosition = function (rect, i) {
    if (eval(Yanfly.Param.ItemShowIcon)) {
        rect.x = Window_Base._faceWidth;
    } else {
        rect.x = 0;
    }
    rect.width = this.contents.width;
    rect.y = i * this.lineHeight();
    return rect;
};

DreamX.CommonEventShop.Window_CommonEventShopInfo_drawLargeIcon = Window_CommonEventShopInfo.prototype.drawLargeIcon;
Window_CommonEventShopInfo.prototype.drawLargeIcon = function () {
    if (!this._item.image) {
        DreamX.CommonEventShop.Window_CommonEventShopInfo_drawLargeIcon.call(this);
    }
    var picture = ImageManager.loadPicture(this._item.image);
    var window = this;
    picture.addLoadListener(function () {
        window.contents.blt(picture, 0, 0, picture.width, picture.height,
                0, 0);
    });



};