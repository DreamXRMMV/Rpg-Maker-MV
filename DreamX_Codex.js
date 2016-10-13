/*:
 * @plugindesc v1.1
 * @author DreamX
 * 
 * @param --Json Options--
 *  
 * @param Json Filename
 * @desc The filename for the json file. Do not include file type. Default: DreamX_Codex
 * @default DreamX_Codex
 * 
 * @param Json Folder
 * @desc The folder where the json is. Leave blank for root folder. Default: data/
 * @default data/
 * 
 * @param --Menu Options--
 * 
 * @param Add Codex Command To Menu
 * @desc Eval. Whether to command that opens the codex to the menu. Default: true
 * @default true
 * 
 * @param Codex Command Text
 * @desc Text of codex command in menu. Default: Codex
 * @default Codex
 * 
 * @param Codex Command Enabled Eval
 * @desc Eval. Condition evaluated to decide whether Codex Command is enabled. Default: true
 * @default true
 * 
 * @param --Window Options--
 * 
 * @param -Category Window-
 *   
 * @param X Of Category Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Y Of Category Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Width Of Category Window
 * @desc Eval. Default: 200
 * @default 200
 * 
 * @param Height Of Category Window
 * @desc Eval. Default: Graphics.boxHeight
 * @default Graphics.boxHeight
 * 
 * @param Max Rows Of Category Window
 * @desc Eval. Number of visible rows. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * 
 * @param Visible Rows Of Category Window
 * @desc Eval. Number of visible rows. Default: Math.ceil(this.maxItems() / this.maxCols())
 * @default Math.ceil(this.maxItems() / this.maxCols())
 * 
 * @param Columns Of Category Window
 * @desc Eval. Max number of visible columns. Default: 1
 * @default 1
 * 
 * @param Text Alignment Of Category Window
 * @desc left center right Default: left
 * @default left
 * 
 * @param Background Opacity of Category Window
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Frame Alpha of Category Window
 * @desc Eval. Default: 1
 * @default 1
 * 
 * @param -Entry Window-
 * 
 * @param Show Entry  Window
 * @desc Eval. Default: true
 * @default true
 * 
 * @param X Of Entry Window
 * @desc Eval. Default: 200
 * @default 200
 * 
 * @param Y Of Entry Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Width Of Entry Window
 * @desc Eval. Default: 200
 * @default 200
 * 
 * @param Height Of Entry Window
 * @desc Eval. Default: Graphics.boxHeight
 * @default Graphics.boxHeight
 * 
 * @param Max Rows Of Entry Window
 * @desc Eval. Number of visible rows. Default: Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * @default Math.max(Math.ceil(this.maxItems() / this.maxCols()), 1)
 * 
 * @param Visible Rows Of Entry Window
 * @desc Eval. Number of visible rows. Default: Math.ceil(this.maxItems() / this.maxCols())
 * @default Math.ceil(this.maxItems() / this.maxCols())
 * 
 * @param Columns Of Entry Window
 * @desc Eval. Max number of visible columns. Default: 1
 * @default 1
 * 
 * @param Text Alignment Of Entry Window
 * @desc left center right Default: left
 * @default left
 * 
 * @param Background Opacity of Entry Window
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Frame Alpha of Entry Window
 * @desc Eval. Default: 1
 * @default 1
 *  
 * @param -Primary Info Window-
 * 
 * @param X Of Primary Info Window
 * @desc Eval. Default: 400
 * @default 400
 * 
 * @param Y Of Primary Info Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Width Of Primary Info Window
 * @desc Eval. Default: Graphics.boxWidth - 400
 * @default Graphics.boxWidth - 400
 * 
 * @param Height Of Primary Info Window
 * @desc Eval. Default: Graphics.boxHeight
 * @default Graphics.boxHeight
 * 
 * @param Background Opacity of Primary Info Window
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Frame Alpha of Primary Info Window
 * @desc Eval. Default: 1
 * @default 1
 * 
 * @param Default Contents Width Of Primary Info Window
 * @desc Eval. Default: this.width - this.standardPadding() * 2
 * @default this.width - this.standardPadding() * 2
 * 
 * @param Default Contents Height Of Primary Info Window
 * @desc Eval. The higher, the more text can be displayed. Try not to exceed 16000. Default: 9999
 * @default 9999
 * 
 * @param Default Text X Of Primary Info Window
 * @desc Eval. Default: this.textPadding()
 * @default this.textPadding()
 * 
 * @param Default Text Y Of Primary Info Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Scroll Rate
 * @desc Eval. Default: this.lineHeight()
 * @default this.lineHeight()
 * 
 * @param -Secondary Info Window-
 * 
 * @param Show Secondary Info Window
 * @desc Eval. Default: false
 * @default false
 * 
 * @param X Of Secondary Info Window
 * @desc Eval. Default: 400
 * @default 400
 * 
 * @param Y Of Secondary Info Window
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Width Of Secondary Info Window
 * @desc Eval. Default: 200
 * @default Graphics.boxWidth - 400
 * 
 * @param Height Of Secondary Info Window
 * @desc Eval. Default: 400
 * @default 400
 * 
 * @param Background Opacity of Secondary Info Window
 * @desc Eval. Default: 255
 * @default 255
 * 
 * @param Frame Alpha of Secondary Info Window
 * @desc Eval. Default: 1
 * @default 1
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * To start the Codex scene, use this script call:
 * SceneManager.push(Scene_Codex);
 * 
 * To use with YEP Main Menu Manager, you can use the main bind:
 * this.commandDXCodex.bind(this)
 * 
 * See example json file.
 * 
 * IDs (for example, BeastiaryCategory and SlimeEntry are IDs) must be unique.
 * Names from the name field are required, but don't need to be unique.
 * 
 * Every entry must have a category field which refers to the unique id 
 * of the category it is under.
 * 
 * In json files, every item in a list must end in a comma, except when it is 
 * the last item in the list. When it is last, it must not end with a comma. 
 * See the example json file.
 * 
 * I recommend using YEP Message Core and the <WordWrap> tag in the text 
 * so you don't need to manually add line breaks where the line would otherwise 
 * exceed the window width.
 * 
 * Text can be scrolled with the mouse wheel.
 * ============================================================================
 * Tips
 * ============================================================================
 * Getting an image to display at the upper left:
 *  "pictureX": "0",
 *  "pictureY": "0",
 *  "pictureAnchorX": "0",
 *  "pictureAnchorY": "0"
 *  
 * Getting an image to display at the upper right:
 *  "pictureX": "this.width",
 *  "pictureY": "0",
 *  "pictureAnchorX": "1",
 *  "pictureAnchorY": "0"
 *  
 * Getting an image to display at the lower left:
 *  "pictureX": "0",
 *  "pictureY": "this.height",
 *  "pictureAnchorX": "0",
 *  "pictureAnchorY": "1"
 *  
 * Getting an image to display at the lower right:
 *  "pictureX": "this.width",
 *  "pictureY": "this.height",
 *  "pictureAnchorX": "1",
 *  "pictureAnchorY": "1"
 *  
 *  Don't forget to fix the commas if necessary!
 *  
 *  Preventing an image from overlaying on top of the window frame:
 *  What can help to do this is to add or subtract the standard padding of the 
 *  window.
 *  Let's say you want an image to appear on the lower right, but don't want 
 *  it to be appear on top of the window frame. 
 *  
 *  "pictureX": "this.width - this.standardPadding()",
 *  "pictureY": "this.height - this.standardPadding()",
 *  "pictureAnchorX": "1",
 *  "pictureAnchorY": "1"
 *  
 *  Let's say you want an image to appear on the upper left, but don't want 
 *  it to be appear on top of the window frame. 
 *  
 *  "pictureX": "this.standardPadding()",
 *  "pictureY": "this.standardPadding()",
 *  "pictureAnchorX": "0",
 *  "pictureAnchorY": "0"
 *  
 *  This way, the picture won't appear out of bounds of the typical contents 
 *  rectangle inside of a window.
 * ============================================================================
 * Category/Entry Attributes
 * ============================================================================
 * name: Name displayed in the category/entry list. Doesn't need to be unique.
 * Required.
 * 
 * nameEval: Set this to true to have the name text evaluated as js.
 * 
 * text: Text displayed in the primary info window when selected.
 * 
 * textEval: Set this to true to have the primary info text be evaluated as js.
 * 
 * textSecondary: Text displayed in the secondary info window when selected.
 * 
 * textSecondaryEval: Set this to true to have the primary info text be 
 * evaluated as js.
 * 
 * condition: Evaluated as js. If evaluated as false, the category/entry is 
 * not displayed.
 * 
 * pictureName: The name of the picture from the img/pictures folder to display.
 * 
 * pictureNameEval: Set this to true to have the picture name evaluated as js.
 * 
 * pictureX: Evaluated as js. The x value of the picture.
 * 
 * pictureY: Evaluated as js. The y value of the picture.
 * 
 * pictureScaleX: Evaluated as js. The scale horizontally of the picture. 
 * 1 = 100%.
 * 
 * pictureScaleY: Evaluated as js. The scale vertically of the picture. 
 * 1 = 100%.
 * 
 * pictureAnchorX: Evaluated as js. Anchor x of picture. From 0 to 1.
 * 
 * pictureAnchorY: Evaluated as js. Anchor x of picture. From 0 to 1.
 * 
 * pictureUnderContents: Set this to true to have the picture appear below text 
 * and other contents.
 * 
 * contentsWidthEval: Evaluated as js. Set this to change the contents width 
 * (where the text is drawn). Useful if you're displaying a picture and 
 * don't want text drawn over it.
 * 
 * script: Evaluated as js. Script to evaluate when category/entry is selected.
 * 
 * ============================================================================
 * Entry Attributes
 * ============================================================================
 * category: The category the entry will be listed under. Must use the unique 
 * id of the category. Required.
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
Imported.DreamX_Codex = true;

var DreamX = DreamX || {};
DreamX.Codex = DreamX.Codex || {};

DreamX.Parameters = PluginManager.parameters('DreamX_Codex');
DreamX.Param = DreamX.Param || {};

DreamX.Param.CodexFileFolder = String(DreamX.Parameters['Json Folder']);
DreamX.Param.CodexFileName = String(DreamX.Parameters['Json Filename']);
DreamX.Param.CodexCommandInMenu = String(DreamX.Parameters['Add Codex Command To Menu']);
DreamX.Param.CodexCommandName = String(DreamX.Parameters['Codex Command Text']);
DreamX.Param.CodexCommandEnableEval = String(DreamX.Parameters['Codex Command Enabled Eval']);

// 

DreamX.Param.CodexPrimWindowContentsWidth = String(DreamX.Parameters['Default Contents Width Of Primary Info Window']);
DreamX.Param.CodexPrimWindowContentsHeight = String(DreamX.Parameters['Default Contents Height Of Primary Info Window']);
DreamX.Param.CodexPrimWindowTextX = String(DreamX.Parameters['Default Text X Of Primary Info Window']);
DreamX.Param.CodexPrimWindowTextY = String(DreamX.Parameters['Default Text Y Of Primary Info Window']);
DreamX.Param.CodexPrimWindowOpacity = String(DreamX.Parameters['Background Opacity of Primary Info Window']);
DreamX.Param.CodexPrimWindowFrameAlpha = String(DreamX.Parameters['Frame Alpha of Primary Info Window']);
DreamX.Param.CodexScrollRate = String(DreamX.Parameters['Scroll Rate']);
DreamX.Param.CodexPrimWindowX = String(DreamX.Parameters['X Of Primary Info Window']);
DreamX.Param.CodexPrimWindowY = String(DreamX.Parameters['Y Of Primary Info Window']);
DreamX.Param.CodexPrimWindowW = String(DreamX.Parameters['Width Of Primary Info Window']);
DreamX.Param.CodexPrimWindowH = String(DreamX.Parameters['Height Of Primary Info Window']);

DreamX.Param.CodexCatWindowOpacity = String(DreamX.Parameters['Background Opacity of Category Window']);
DreamX.Param.CodexCatWindowFrameAlpha = String(DreamX.Parameters['Frame Alpha of Category Window']);
DreamX.Param.CodexCatWindowX = String(DreamX.Parameters['X Of Category Window']);
DreamX.Param.CodexCatWindowY = String(DreamX.Parameters['Y Of Category Window']);
DreamX.Param.CodexCatWindowW = String(DreamX.Parameters['Width Of Category Window']);
DreamX.Param.CodexCatWindowH = String(DreamX.Parameters['Height Of Category Window']);
DreamX.Param.CodexCatWindowMaxRows = String(DreamX.Parameters['Max Rows Of Category Window']);
DreamX.Param.CodexCatWindowVisibleRows = String(DreamX.Parameters['Visible Rows Of Category Window']);
DreamX.Param.CodexCatWindowCols = String(DreamX.Parameters['Columns Of Category Window']);
DreamX.Param.CodexCatTextAlign = String(DreamX.Parameters['Text Alignment Of Category Window']);

DreamX.Param.CodexEntryWindowOpacity = String(DreamX.Parameters['Background Opacity of Entry Window']);
DreamX.Param.CodexEntryWindowFrameAlpha = String(DreamX.Parameters['Frame Alpha of Entry Window']);
DreamX.Param.CodexEntryWindowX = String(DreamX.Parameters['X Of Entry Window']);
DreamX.Param.CodexEntryWindowY = String(DreamX.Parameters['Y Of Entry Window']);
DreamX.Param.CodexEntryWindowW = String(DreamX.Parameters['Width Of Entry Window']);
DreamX.Param.CodexEntryWindowH = String(DreamX.Parameters['Height Of Entry Window']);
DreamX.Param.CodexEntryWindowShow = String(DreamX.Parameters['Show Entry  Window']);
DreamX.Param.CodexEntryWindowMaxRows = String(DreamX.Parameters['Max Rows Of Entry Window']);
DreamX.Param.CodexEntryWindowVisibleRows = String(DreamX.Parameters['Visible Rows Of Entry Window']);
DreamX.Param.CodexEntryWindowCols = String(DreamX.Parameters['Columns Of Entry Window']);
DreamX.Param.CodexEntryTextAlign = String(DreamX.Parameters['Text Alignment Of Entry Window']);

DreamX.Param.CodexSecondWindowOpacity = String(DreamX.Parameters['Background Opacity of Secondary Info Window']);
DreamX.Param.CodexSecondWindowFrameAlpha = String(DreamX.Parameters['Frame Alpha of Secondary Info Window']);
DreamX.Param.CodexSecondWindowX = String(DreamX.Parameters['X Of Secondary Info Window']);
DreamX.Param.CodexSecondWindowY = String(DreamX.Parameters['Y Of Secondary Info Window']);
DreamX.Param.CodexSecondWindowW = String(DreamX.Parameters['Width Of Secondary Info Window']);
DreamX.Param.CodexSecondWindowH = String(DreamX.Parameters['Height Of Secondary Info Window']);
DreamX.Param.CodexSecondWindowShow = String(DreamX.Parameters['Show Secondary Info Window']);

//DreamX.Param.BackCommand = true;
//DreamX.Param.BackCommandName = 'Back';

//=============================================================================
// Scene_Boot
//=============================================================================
DreamX.Codex.Scene_Boot_isReady = Scene_Boot.prototype.isReady;
Scene_Boot.prototype.isReady = function () {
    if (!DreamX.Codex.loaded) {
        return false;
    }
    return DreamX.Codex.Scene_Boot_isReady.call(this);
};

DreamX.Codex.dataFileName = function () {
    return DreamX.Param.CodexFileFolder + DreamX.Param.CodexFileName + ".json";
};

DreamX.Codex.callback = function (data) {
    DreamX.Codex.loaded = true;
    DreamX.Codex.Categories = {};

    var dataCategories = data.categories;
    var dataEntries = data.entries;
    for (var key in dataCategories) {
        DreamX.Codex.Categories[key] = dataCategories[key];
        DreamX.Codex.Categories[key].entries = {};
    }

    for (var key in dataEntries) {
        var entry = dataEntries[key];
        var category = DreamX.Codex.Categories[entry.category];
        if (category) {
            category.entries[key] = entry;
        }

    }
};

// thanks to Iavra
DreamX.Codex.loadData = function (url, callback) {
    var request = new XMLHttpRequest();
    request.open('GET', url);
    request.onload = function () {
        callback(JSON.parse(request.response));
    };
    request.onerror = function () {
        throw new Error("There was an error loading the file '" + url + "'.");
        //DreamX.Codex.loaded = true;
    };
    request.send();
};

DreamX.Codex.Scene_Boot_create = Scene_Boot.prototype.create;
Scene_Boot.prototype.create = function () {
    DreamX.Codex.Scene_Boot_create.call(this);
    DreamX.Codex.loaded = false;
    DreamX.Codex.loadData(DreamX.Codex.dataFileName(),
            DreamX.Codex.callback);
};

//-----------------------------------------------------------------------------
// Scene_Codex
//
// The scene class of the 

function Scene_Codex() {
    this.initialize.apply(this, arguments);
}

Scene_Codex.prototype = Object.create(Scene_MenuBase.prototype);
Scene_Codex.prototype.constructor = Scene_Codex;

Scene_Codex.prototype.initialize = function () {
    Scene_MenuBase.prototype.initialize.call(this);
};

Scene_Codex.prototype.create = function () {
    Scene_MenuBase.prototype.create.call(this);
    this.createSelectionWindow();
};

Scene_Codex.prototype.activateCategoryWindow = function () {
    this._entryListWindow.deactivate();
    this._entryListWindow.deselect();
    this._categoryWindow.activate();
};

Scene_Codex.prototype.createSelectionWindow = function () {
    this._categoryWindow = new Window_CodexCategory();
    this._categoryWindow.setHandler('cancel', this.popScene.bind(this));

    this._entryListWindow = new Window_CodexEntryList();
    this._entryListWindow.setHandler('cancel', this.activateCategoryWindow.bind(this));
    this._entryListWindow.deactivate();
    this._entryListWindow.deselect();

    this._categoryWindow.setEntryListWindow(this._entryListWindow);

    this._helpWindow = new Window_CodexHelp();
    this._secondaryHelpWindow = new Window_CodexSecondaryHelp();


    this._categoryWindow.setHelpWindow(this._helpWindow);
    this._entryListWindow.setHelpWindow(this._helpWindow);


    this._categoryWindow._secondaryHelpWindow = this._secondaryHelpWindow;
    this._entryListWindow._secondaryHelpWindow = this._secondaryHelpWindow;

    this.addWindow(this._categoryWindow);
    this.addWindow(this._entryListWindow);
    this.addWindow(this._helpWindow);
    this.addWindow(this._secondaryHelpWindow);
};

//=============================================================================
// Scene_Menu
//=============================================================================
DreamX.Codex.Scene_Menu_createCommandWindow = Scene_Menu.prototype.createCommandWindow;
Scene_Menu.prototype.createCommandWindow = function () {
    DreamX.Codex.Scene_Menu_createCommandWindow.call(this);
    if (eval(DreamX.Param.CodexCommandInMenu)) {
        this._commandWindow.setHandler('codex', this.commandDXCodex.bind(this));
    }
};

Scene_Menu.prototype.commandDXCodex = function () {
    SceneManager.push(Scene_Codex);
};

//=============================================================================
// Window_MenuCommand
//=============================================================================
DreamX.Codex.Window_MenuCommand_makeCommandList = Window_MenuCommand.prototype.makeCommandList;
Window_MenuCommand.prototype.makeCommandList = function () {
    DreamX.Codex.Window_MenuCommand_makeCommandList.call(this);
    if (eval(DreamX.Param.CodexCommandInMenu)) {
        this.addCommand(DreamX.Param.CodexCommandName, 'codex', eval(DreamX.Param.CodexCommandEnableEval));
    }
};

//-----------------------------------------------------------------------------
// Window_CodexCommandBase
//
// The window for 

function Window_CodexCommandBase() {
    this.initialize.apply(this, arguments);
}

Window_CodexCommandBase.prototype = Object.create(Window_Command.prototype);
Window_CodexCommandBase.prototype.constructor = Window_CodexCommandBase;

Window_CodexCommandBase.prototype.data = function () {
    return {};
};

Window_CodexCommandBase.prototype.updateHelp = function () {
    if (this._list.length === 0) {
        return;
    }
    this._helpWindow.setText(this.data());

    if (this._secondaryHelpWindow) {
        this._secondaryHelpWindow.setText(this.data());
        this._secondaryHelpWindow.refresh();
    }

};

//-----------------------------------------------------------------------------
// Window_CodexCategory
//
// The window for 

function Window_CodexCategory() {
    this.initialize.apply(this, arguments);
}

Window_CodexCategory.prototype = Object.create(Window_CodexCommandBase.prototype);
Window_CodexCategory.prototype.constructor = Window_CodexCategory;

Window_CodexCategory.prototype.initialize = function () {
    var x = eval(DreamX.Param.CodexCatWindowX);
    var y = eval(DreamX.Param.CodexCatWindowY);
    Window_Command.prototype.initialize.call(this, x, y);
};

Window_CodexCategory.prototype.windowWidth = function () {
    return eval(DreamX.Param.CodexCatWindowW);
};

Window_CodexCategory.prototype.windowHeight = function () {
    return eval(DreamX.Param.CodexCatWindowH);
};

Window_CodexCategory.prototype.maxRows = function () {
    return eval(DreamX.Param.CodexCatWindowMaxRows);
};

Window_CodexCategory.prototype.numVisibleRows = function () {
    return eval(DreamX.Param.CodexCatWindowRows);
};

Window_CodexCategory.prototype.maxCols = function () {
    return eval(DreamX.Param.CodexCatWindowCols);
};

Window_CodexCategory.prototype.itemTextAlign = function () {
    return DreamX.Param.CodexCatTextAlign;
};

Window_CodexCategory.prototype.makeCommandList = function () {
    var categories = DreamX.Codex.Categories;

    if (this._subcategory) {
        categories = categories[this._subcategory];
    }

    for (var key in categories) {
        var symbol = key;
        var obj = categories[key];

        if (obj.condition && !eval(obj.condition)) {
            continue;
        }

        var name = obj.name || obj;

        if (eval(obj.nameEval)) {
            name = eval(name);
        }

        this.addCommand(name, symbol);
    }
};

Window_CodexCategory.prototype.setEntryListWindow = function (window) {
    this._listWindow = window;
};

Window_CodexCategory.prototype.entryListWindow = function () {
    return this._listWindow;
};

Window_CodexCategory.prototype.updateHelp = function () {
    Window_CodexCommandBase.prototype.updateHelp.call(this);
    if (this._list.length === 0) {
        return;
    }
    var symbol = this.commandSymbol(this.index());

    if (this.entryListWindow()) {
        this.entryListWindow().setCategory(symbol);
        this.entryListWindow().refresh();
    }
};

Window_CodexCategory.prototype.callOkHandler = function () {
    if (this._listWindow._list.length === 0 || !this._listWindow.visible) {
        this.activate();
        return;
    }
    this.deactivate();
    this._listWindow.select(0);
    this._listWindow.activate();
};

Window_CodexCategory.prototype.data = function () {
    var symbol = this.commandSymbol(this.index());
    return DreamX.Codex.Categories[symbol];
};


//-----------------------------------------------------------------------------
// Window_CodexEntryList
//
// The window for 

function Window_CodexEntryList() {
    this.initialize.apply(this, arguments);
}

Window_CodexEntryList.prototype = Object.create(Window_CodexCommandBase.prototype);
Window_CodexEntryList.prototype.constructor = Window_CodexEntryList;

Window_CodexEntryList.prototype.initialize = function () {
    var x = eval(DreamX.Param.CodexEntryWindowX);
    var y = eval(DreamX.Param.CodexEntryWindowY);
    Window_Command.prototype.initialize.call(this, x, y);
    if (!eval(DreamX.Param.CodexEntryWindowShow)) {
        this.hide();
    }
    this._category = '';
};

Window_CodexEntryList.prototype.windowWidth = function () {
    return eval(DreamX.Param.CodexEntryWindowW);
};

Window_CodexEntryList.prototype.windowHeight = function () {
    return eval(DreamX.Param.CodexEntryWindowH);
};

Window_CodexEntryList.prototype.maxRows = function () {
    return eval(DreamX.Param.CodexEntryWindowMaxRows);
};

Window_CodexEntryList.prototype.numVisibleRows = function () {
    return eval(DreamX.Param.CodexEntryWindowVisibleRows);
};

Window_CodexEntryList.prototype.maxCols = function () {
    return eval(DreamX.Param.CodexEntryWindowCols);
};

Window_CodexEntryList.prototype.itemTextAlign = function () {
    return DreamX.Param.CodexEntryTextAlign;
};
Window_CodexEntryList.prototype.category = function () {
    return this._category;
};

Window_CodexEntryList.prototype.makeCommandList = function () {
    var category = this.category();
    if (!category) {
        return;
    }
    var entries = DreamX.Codex.Categories[category].entries;

    for (var key in entries) {
        var symbol = key;
        var obj = entries[key];

        if (obj.condition && !eval(obj.condition)) {
            continue;
        }

        var name = obj.name || obj;

        if (eval(obj.nameEval)) {
            name = eval(name);
        }

        this.addCommand(name, symbol);
    }
};

Window_CodexEntryList.prototype.setCategory = function (symbol) {
    this._category = symbol;
};

Window_CodexEntryList.prototype.data = function () {
    var symbol = this.commandSymbol(this.index());
    return DreamX.Codex.Categories[this.category()].entries[symbol];
};

//-----------------------------------------------------------------------------
// Window_CodexHelp
//
// The window for 

function Window_CodexHelp() {
    this.initialize.apply(this, arguments);
}

Window_CodexHelp.prototype = Object.create(Window_Help.prototype);
Window_CodexHelp.prototype.constructor = Window_CodexHelp;

Window_CodexHelp.prototype.initialize = function () {
    var x = eval(DreamX.Param.CodexPrimWindowX);
    var y = eval(DreamX.Param.CodexPrimWindowY);
    var w = eval(DreamX.Param.CodexPrimWindowW);
    var h = eval(DreamX.Param.CodexPrimWindowH);

    this._text = '';
    this._numLines = 1;
    this._script = '';

    Window_Base.prototype.initialize.call(this, x, y, w, h);

    var normalContentsHeight = this._height - this._padding * 2;
    this._maxLinesForContentsHeight = Math.floor(normalContentsHeight / this.lineHeight());

    this.opacity = eval(DreamX.Param.CodexPrimWindowOpacity);
    this._windowFrameSprite.alpha = eval(DreamX.Param.CodexPrimWindowFrameAlpha);

    this._picture = new Sprite();
    this.addChild(this._picture);
};

Window_CodexHelp.prototype.contentsWidth = function () {
    return eval(DreamX.Param.CodexPrimWindowContentsWidth);
};

Window_CodexHelp.prototype.contentsHeight = function () {
    return eval(DreamX.Param.CodexPrimWindowContentsHeight);
};

Window_CodexHelp.prototype.update = function () {
    this._windowContentsSprite.worldTransform.ty = this.y + this.standardPadding();
    Window_Help.prototype.update.call(this);

    if (!this._text) {
        return;
    }

    var newOriginY = this.origin.y;
    var scrollRate = eval(DreamX.Param.CodexScrollRate);

    // 100
    var threshold = 20;
    if (TouchInput.wheelY >= threshold) {
        newOriginY += scrollRate;
    }
    if (TouchInput.wheelY <= -threshold) {
        newOriginY -= scrollRate;
    }

    var numLines = this._numLines + Math.ceil(eval(DreamX.Param.CodexPrimWindowTextY) / this.lineHeight());
    var highestCompletedLineForNewOriginY = Math.floor(newOriginY / this.lineHeight());

    if (highestCompletedLineForNewOriginY + this._maxLinesForContentsHeight <= numLines) {
        this.origin.y = Math.max(0, newOriginY);
    }
};

Window_CodexHelp.prototype.setText = function (data) {
    var text = data.text || '';
    var pictureName = data.pictureName || '';
    var pictureX = eval(data.pictureX || 0);
    var pictureY = eval(data.pictureY || 0);
    var pictureScaleX = eval(data.pictureScaleX || 1);
    var pictureScaleY = eval(data.pictureScaleY || 1);
    var pictureAnchorX = eval(data.pictureAnchorX || 0);
    var pictureAnchorY = eval(data.pictureAnchorY || 0);
    var contentsWidthEval = eval(data.contentsWidth || DreamX.Param.CodexPrimWindowContentsWidth);

    eval(data.script);

    this.contents = new Bitmap(contentsWidthEval, this.contentsHeight());

    if (eval(data.pictureNameEval)) {
        pictureName = eval(pictureName);
    }
    if (eval(data.textEval)) {
        text = eval(text);
    }

    if (eval(data.pictureUnderContents)) {
        var picIndex = this.children.indexOf(this._picture);
        var contentsIndex = this.children.indexOf(this._windowContentsSprite);
        if (picIndex > contentsIndex) {
            this.addChildAt(this._picture, this.children.indexOf(this._windowContentsSprite));
        }
    } else {
        this.addChild(this._picture);
    }

    this._picture.bitmap = ImageManager.loadPicture(pictureName);
    this._picture.scale.x = pictureScaleX;
    this._picture.scale.y = pictureScaleY;
    this._picture.anchor.x = pictureAnchorX;
    this._picture.anchor.y = pictureAnchorY;
    this._picture.x = pictureX;
    this._picture.y = pictureY;

    this._text = text;
    this.refresh();
};

Window_CodexHelp.prototype.refresh = function () {
    this.contents.clear();
    this._numLines = 1;
    this.origin.y = 0;
    this.drawTextEx(this._text, eval(DreamX.Param.CodexPrimWindowTextX), eval(DreamX.Param.CodexPrimWindowTextY));
    this._highestTextY = this._textY;
};

Window_CodexHelp.prototype.processNewLine = function (textState) {
    Window_Base.prototype.processNewLine.call(this, textState);
    this._numLines++;
};

//-----------------------------------------------------------------------------
// Window_CodexSecondaryHelp
//
// The window for 

function Window_CodexSecondaryHelp() {
    this.initialize.apply(this, arguments);
}

Window_CodexSecondaryHelp.prototype = Object.create(Window_Help.prototype);
Window_CodexSecondaryHelp.prototype.constructor = Window_CodexSecondaryHelp;

Window_CodexSecondaryHelp.prototype.initialize = function () {
    var x = eval(DreamX.Param.CodexSecondWindowX);
    var y = eval(DreamX.Param.CodexSecondWindowY);
    var w = eval(DreamX.Param.CodexSecondWindowW);
    var h = eval(DreamX.Param.CodexSecondWindowH);

    Window_Base.prototype.initialize.call(this, x, y, w, h);
    this._text = '';

    if (!eval(DreamX.Param.CodexSecondWindowShow)) {
        this.hide();
    }
};

Window_Help.prototype.setText = function (data) {
    var text = data.textSecondary || '';

    if (eval(data.textSecondaryEval)) {
        text = eval(text);
    }
    this._text = text;
    this.refresh();
};