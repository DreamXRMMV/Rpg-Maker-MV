/*:
 * @plugindesc
 * @author DreamX
 * 
 * @param Frame Opacity
 * @desc Opacity of the window frames. Default: 255
 * @default 255
 * 
 * @help
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
Imported.DreamX_VisualNovelMenu = true;

var DreamX = DreamX || {};
DreamX.VisualNovelMenu = DreamX.VisualNovelMenu || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_VisualNovelMenu');
    var parameterFrameOpacity = parseInt(parameters['Frame Opacity'] || 255);

    DreamX.VisualNovelMenu.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.VisualNovelMenu.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_ItemCore) {
            throw new Error('DreamX_VisualNovelMenu requires Yanfly Item Core');
        }
        if (!(eval(Yanfly.Param.ItemSceneItem))) {
            throw new Error("DreamX_VisualNovelMenu requires Yanfly "
                    + "Item Core to have the parameter Updated Scene Item on.");

        }
    };

    Window_MenuStatus.prototype.windowWidth = function () {
        return Graphics.boxWidth - Window_MenuCommand.prototype.windowWidth();
    };

    Window_MenuStatus.prototype.windowHeight = function () {
        var clientHeight = Graphics.boxHeight - this.standardPadding() * 2;
        return Math.floor(clientHeight / 4 + (this.standardPadding() * 2));
        //return Math.floor(Graphics.boxHeight * .30);
    };

    Window_MenuStatus.prototype.itemHeight = function () {
        var clientHeight = Graphics.boxHeight - this.standardPadding() * 2;
        return Math.floor(clientHeight / 4);
    };


    Window_MenuStatus.prototype.maxItems = function () {
        return 1;
    };

    Window_MenuStatus.prototype.drawItemImage = function (index) {
        var actor = $gameParty.members()[index];
        var rect = this.itemRect(index);
        this.changePaintOpacity(actor.isBattleMember());
        this.drawActorFace(actor, rect.x + 1, rect.y + 1);
        this.changePaintOpacity(true);
    };


    Window_MenuStatus.prototype.drawActorSimpleStatus = function (actor, x, y, width) {
        var lineHeight = this.lineHeight();
        this.drawActorName(actor, x, y);
    };

    DreamX.VisualNovelMenu.Scene_Menu_create = Scene_Menu.prototype.create;
    Scene_Menu.prototype.create = function () {
        DreamX.VisualNovelMenu.Scene_Menu_create.call(this);
        this._commandWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this._statusWindow._windowFrameSprite.alpha = parameterFrameOpacity;

        this._helpWindow = new Window_Help();
        this._helpWindow.x = this._commandWindow.width;
        this._helpWindow.y = this._statusWindow.height;
        this._helpWindow.width = this._statusWindow.width;
        this._helpWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this.addWindow(this._helpWindow);

        this._itemWindow = new Window_ItemList();
        this._itemWindow.x = this._helpWindow.x;
        this._itemWindow.y = this._helpWindow.y + this._helpWindow.height;
        this._itemWindow.width = this._helpWindow.width;
        this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y;
        this._itemWindow.setCategory('item');
        this._itemWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this.addWindow(this._itemWindow);

        this._goldWindow._windowFrameSprite.alpha = parameterFrameOpacity;
    };

    DreamX.VisualNovelMenu.Scene_Item_create = Scene_Item.prototype.create;
    Scene_Item.prototype.create = function () {
        DreamX.VisualNovelMenu.Scene_Item_create.call(this);
        this._categoryWindow.hide();

        this._menuWindow = new Window_MenuCommand(0, 0);
        this.addWindow(this._menuWindow);
        this._menuWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this._menuWindow.deactivate();

        this._actorWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this._actorWindow.x = this._menuWindow.width;
        this._actorWindow.show();

        this._helpWindow.x = this._menuWindow.width;
        this._helpWindow.y = this._actorWindow.height;
        this._helpWindow.width = this._actorWindow.width;

        this._itemWindow.x = this._helpWindow.x;
        this._itemWindow.y = this._helpWindow.y + this._helpWindow.height;
        this._itemWindow.width = this._helpWindow.width;
        this._itemWindow.height = Graphics.boxHeight - this._itemWindow.y;
        this._itemWindow.setHandler('cancel', this.popScene.bind(this));

        if (Imported.YEP_ItemCore) {
            this._infoWindow.hide();
            this._statusWindow.hide();

            this._itemActionWindow.x = this._itemWindow.x;
            this._itemActionWindow.y = this._itemWindow.y;
            this._itemActionWindow.width = this._itemWindow.width;
            this._itemActionWindow.height = this._itemWindow.height;

            this._itemActionWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        }

        this._helpWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        
        this._itemWindow._windowFrameSprite.alpha = parameterFrameOpacity;
        this._itemWindow.setCategory('item');
        this._itemWindow.refresh()
        
        this._categoryWindow.deactivate();

        this.onCategoryOk();
    };

    DreamX.VisualNovelMenu.Window_ItemList_maxCols = Window_ItemList.prototype.maxCols;
    Window_ItemList.prototype.maxCols = function () {
        if (SceneManager._scene instanceof Scene_Menu) {
            return 1;
        }

        return DreamX.VisualNovelMenu.Window_ItemList_maxCols.call(this);
    };


    DreamX.VisualNovelMenu.Scene_Item_createItemWindow = Scene_Item.prototype.createItemWindow;
    Scene_Item.prototype.createItemWindow = function () {
        DreamX.VisualNovelMenu.Scene_Item_createItemWindow.call(this);

    };

    Scene_Item.prototype.onItemCancel = function () {
        this._itemWindow.deselect();
        //this._categoryWindow.activate();
    };

    Scene_ItemBase.prototype.hideSubWindow = function (window) {
//        window.hide();
        window.deselect();
        window.deactivate();
        this.activateItemWindow();
    };

})();
