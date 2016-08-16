/*:
 * @plugindesc v1.2 Manage undesired items
 * @author DreamX
 *
 * @param --Junk--
 * @param Add Junk Commands
 * @desc Whether to add Mark Junk & Unmark Junk commands. Default: true
 * @default true
 * 
 * @param Junk In Junk Category Only
 * @desc true: Show junk in junk category only. false: Show junk in other categories too.
 * @default false
 *
 * @param Remove 0 Value Junk
 * @desc Whether you can remove junk of 0 value from the inventory by using Sell All Junk in a shop. Default: false
 * @default false
 * 
 * @param Can Mark Equipped Items As Junk
 * @desc Whether you can mark equipped items as junk. Default: false
 * @default false
 *
 * @param Unequip Marked Junk Items
 * @desc Unequip items that were marked junk. Default: true
 * @default true
 * 
 * @param Play Shop Sound
 * @desc Whether to play Shop sound effect when selling all junk. Default: true
 * @default true
 * 
 * @param Junk Category Name
 * @desc String to display for junk item category.
 * @default Junk
 *
 * @param Sell All Junk String
 * @desc String to selling all junk in the shop.
 * @default Sell All Junk
 *
 * @param Mark As Junk String
 * @desc String to display for marking an item as junk. Default: Mark %1%2 As Junk x%3
 * @default Mark %1%2 As Junk x%3
 *
 * @param Unmark As Junk String
 * @desc String to display for unmarking an item as junk. Default: Unmark %1%2 As Junk x%3
 * @default Unmark %1%2 As Junk x%3
 * 
 * @param --Dispose--
 *  
 * @param Add Dispose Command
 * @desc Whether to add Dispose command. It removes 1 item. Default: true
 * @default true
 * 
 * @param Add Dispose All Command
 * @desc Whether to add Dispose All command. It removes all of the same item. Default: true
 * @default true
 * 
 * @param Cancel Dipose Command First
 * @desc Whether the cancel command appears first when confirming disposal. Default: true
 * @default true
 * 
 * @param Can Dispose Equipped Items
 * @desc Whether you can dispose of equipped items. Default: true
 * @default true
 * 
 * @param Dispose SE Name
 * @desc Name of sound effect to play when disposing items. Leave blank for none.
 * @default 
 * 
 * @param Dispose SE Volume
 * @desc Volume of dispose SE. Default: 50
 * @default 50
 * 
 * @param Dispose SE Pan
 * @desc Pan of dispose SE. Default: 0
 * @default 0
 * 
 * @param Dispose SE Pitch
 * @desc Pitch of dispose SE. Default: 100
 * @default 100
 * 
 * @param Dispose String
 * @desc String to display for dispose command. Default: Dispose %1%2
 * @default Dispose %1%2
 * 
 * @param Dispose All String
 * @desc String to display for dispose all command. Default: Dispose %1%2 x%3
 * @default Dispose %1%2 x%3
 * 
 * @param Confirm Dispose String
 * @desc String to display for dispose confirm command. Default: Dispose %1%2
 * @default Dispose %1%2
 * 
 * @param Cancel Dispose String
 * @desc String to display for canceling dispose command.
 * @default Cancel
 * 
 * @help
 * ============================================================================
 * Important
 * ============================================================================
 * This plugin requires YEP Item Core and YEP Shop Menu Core. This plugin
 * must be put underneath them in the plugin list.
 * 
 * Equipped items that are not independent cannot be marked as junk or disposed.
 * For this reason, I recommend making equipment independent in Item Core.
 *
 * In order to sell all junk items at the shop, the command Custom
 * must be somewhere in the command order parameter for YEP Shop Menu Core.
 * By default, it is in, so if you haven't removed it then you don't need to do
 * anything.
 *
 * If you want the sell all junk command to appear somewhere else in the list,
 * just place Custom in a different place in the command order parameter in
 * YEP Shop Menu Core.
 * ============================================================================
 * How To Use
 * ============================================================================
 * In the item menu, you can set items to be marked as junk. After, you can
 * unmark them as junk if you want. Junk items appear in the junk category.
 * 
 * In the shop, you can select the Sell All Junk command to sell all junk
 * in your inventory.
 *
 * ============================================================================
 * Item/Weapon/Armor Notetags
 * ============================================================================
 * <Junk> will automatically designate an item as junk. It can't be unmarked
 * as junk.
 *
 * <CantMarkJunk> will disallow an item from being marked as junk. Good for
 * important items.
 * 
 * <CantDispose> will disallow an item from being disposed with the dispose 
 * command.
 * ============================================================================
 * Command Name Text Codes
 * ============================================================================
 * Text codes can be used to configure the names of commands.
 * 
 * %1 - Icon of item
 * %2 - Name of item
 * %3 - Number of item in inventory
 * 
 * This does not apply to the Sell All Junk command.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for Item Core and Shop Core plugins.
 */



var Imported = Imported || {};
Imported.DreamX_Junk = true;

var DreamX = DreamX || {};
DreamX.Junk = DreamX.Junk || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Junk');
    var paramJunkCatOnly = eval(parameters['Junk In Junk Category Only']);
    var paramMarkJunkString = String(parameters['Mark As Junk String']);
    var paramUnmarkJunkString = String(parameters['Unmark As Junk String']);
    var paramJunkCatString = String(parameters['Junk Category Name']);
    var paramSellAllJunkString = String(parameters['Sell All Junk String']);
    var paramRemoveValueless = eval(parameters['Remove 0 Value Junk']);
    var paramPlayShop = eval(parameters['Play Shop Sound']);
    var paramMarkJunkEquipped = eval(parameters['Can Mark Equipped Items As Junk']);
    var paramUnequipMarkJunk = eval(parameters['Unequip Marked Junk Items']);
    var paramAddJunkCommand = String(parameters['Add Junk Commands']);

    var paramCanDisposeEquipped = String(parameters['Can Dispose Equipped Items']);
    var paramDisposeString = String(parameters['Dispose String']);
    var paramDisposeAllString = String(parameters['Dispose All String']);
    var paramConfirmDisposeString = String(parameters['Confirm Dispose String']);
    var paramCancelDisposeString = String(parameters['Cancel Dispose String']);
    var paramCancelDisposeFirst = eval(parameters['Cancel Dipose Command First']);

    var paramAddDisposeCommand = String(parameters['Add Dispose Command']);
    var paramAddDisposeAllCommand = String(parameters['Add Dispose All Command']);
    var paramDisposeSEName = String(parameters['Dispose SE Name']);
    var paramDisposeSEVol = String(parameters['Dispose SE Volume']);
    var paramDisposeSEPan = String(parameters['Dispose SE Pan']);
    var paramDisposeSEPitch = String(parameters['Dispose SE Pitch']);

    DreamX.Junk.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.Junk.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_ItemCore) {
            throw new Error('DreamX_Junk requires YEP Item Core');
        }
        if (!Imported.YEP_ShopMenuCore) {
            throw new Error('DreamX_Junk requires YEP Shop Menu Core');
        }
        var sellJunkInShopCommand
                = Yanfly.Param.ShopCommandOrder.split(" ").some(function (command) {
            return command.toUpperCase() === "CUSTOM";
        });
        if (!sellJunkInShopCommand) {
            throw new Error('DreamX_Junk requires the command Custom to be in the command order for YEP Shop Menu Core');
        }
    };

    //==========================================================================
    // DreamX.Junk
    //==========================================================================
    DreamX.Junk.isJunk = function (item) {
        if (!item) {
            return false;
        }
        if (this.blockEquipJunk(item)) {
            return false;
        }
        if (item.meta.Junk) {
            return true;
        }
        if ($gameSystem._junkItems.indexOf(item) === -1) {
            return false;
        }

        return true;
    };

    DreamX.Junk.canMarkJunk = function (item) {
        if (DreamX.Junk.isJunk(item)) {
            return false;
        }
        if (item.meta.CantMarkJunk) {
            return false;
        }
        if (this.blockEquipJunk(item)) {
            return false;
        }

        return true;
    };

    DreamX.Junk.canUnmarkJunk = function (item) {
        if (item.meta.Junk) {
            return false;
        }
        if (!DreamX.Junk.isJunk(item)) {
            return false;
        }
        return true;
    };

    DreamX.Junk.blockEquipJunk = function (item) {
        if ((DataManager.isWeapon(item)
                || DataManager.isArmor(item))
                && !DataManager.isIndependent(item)) {
            return true;
        }
        if (!paramMarkJunkEquipped && $gameParty.isAnyMemberEquipped(item)) {
            return true;
        }
        return false;
    };

    DreamX.Junk.canDispose = function (item) {
        if ($gameParty.isAnyMemberEquipped(item) && !eval(paramCanDisposeEquipped)) {
            return false;
        }
        return !item.meta.CantDispose;
    };

    //==========================================================================
    // Scene_Item
    //==========================================================================
    DreamX.Junk.Scene_Item_createActionWindow = Scene_Item.prototype.createActionWindow;
    Scene_Item.prototype.createActionWindow = function () {
        DreamX.Junk.Scene_Item_createActionWindow.call(this);
        this._itemActionWindow.setHandler('markJunk', this.onActionMarkJunk.bind(this));
        this._itemActionWindow.setHandler('unmarkJunk', this.onActionUnmarkJunk.bind(this));
        this._itemActionWindow.setHandler('dispose', this.onActionDispose.bind(this));
        this._itemActionWindow.setHandler('disposeAll', this.onActionDisposeAll.bind(this));

        var wy = this._itemWindow.y;
        this._disposeConfirmWindow = new Window_DisposeConfirm(0, wy);
        this._disposeConfirmWindow.setHandler('dispose', this.onActionDisposeConfirm.bind(this));
        this._disposeConfirmWindow.setHandler('cancel', this.onActionCancelDispose.bind(this));
        this.addWindow(this._disposeConfirmWindow);
    };

    DreamX.Junk.Scene_Item_onItemOk = Scene_Item.prototype.onItemOk;
    Scene_Item.prototype.onItemOk = function () {
        DreamX.Junk.Scene_Item_onItemOk.call(this);
        var item = this.item();
        this._disposeConfirmWindow.setItem(item);
    };

    Scene_Item.prototype.onActionCancelDispose = function () {
        this._disposeConfirmWindow.hide();
        this._disposeConfirmWindow.deactivate();

        this._itemActionWindow.refresh();
        this._itemActionWindow.show();
        this._itemActionWindow.activate();
        this._itemActionWindow.select(0);
    };

    Scene_Item.prototype.onActionDisposeConfirm = function () {
        var item = this.item();
        if (this._disposeAll) {
            this.disposeItem(item, $gameParty.numItems(item));
        } else {
            this.disposeItem(item, 1);
        }
        this._disposeConfirmWindow.hide();
        this._disposeConfirmWindow.deactivate();
        this._itemWindow.activate();
    };

    Scene_Item.prototype.onActionDispose = function () {
        this._disposeAll = false;
        this.setupDisposeWindow();
    };

    Scene_Item.prototype.onActionDisposeAll = function () {
        this._disposeAll = true;
        this.setupDisposeWindow();
    };


    Scene_Item.prototype.setupDisposeWindow = function () {
        this._itemActionWindow.hide();
        this._itemActionWindow.deactivate();

        this._disposeConfirmWindow.refresh();
        this._disposeConfirmWindow.show();
        this._disposeConfirmWindow.activate();
        this._disposeConfirmWindow.select(0);
    };

    Scene_Item.prototype.disposeItem = function (item, quantity) {
        $gameParty.DXUnequipItemParty(item);
        $gameParty.loseItem(item, quantity);
        this.DXDisposeOperation(item);
    };


    Scene_Item.prototype.DXDisposeOperation = function (item) {
        if (paramDisposeSEName) {
            var se = {};
            se.name = paramDisposeSEName;
            se.volume = paramDisposeSEVol;
            se.pan = paramDisposeSEPan;
            se.pitch = paramDisposeSEPitch;
            AudioManager.playStaticSe(se);
        }

        this.DXJunkOperation();
    };

    Scene_Item.prototype.DXJunkOperation = function () {
        this._itemActionWindow.hide();
        this._itemActionWindow.deactivate();
        this.activateItemWindow();
    };

    Scene_Item.prototype.onActionMarkJunk = function () {
        var item = this.item();
        $gameSystem._junkItems.push(item);
        if (paramUnequipMarkJunk) {
            $gameParty.DXUnequipItemParty(item);
        }

        this.DXJunkOperation();
    };

    Scene_Item.prototype.onActionUnmarkJunk = function () {
        var item = this.item();
        var index = $gameSystem._junkItems.indexOf(item);
        $gameSystem._junkItems.splice(index, 1);
        this.DXJunkOperation();
    };

    //==========================================================================
    // Window_DisposeConfirm
    //==========================================================================
    function Window_DisposeConfirm() {
        this.initialize.apply(this, arguments);
    }

    Window_DisposeConfirm.prototype = Object.create(Window_Command.prototype);
    Window_DisposeConfirm.prototype.constructor = Window_DisposeConfirm;

    Window_DisposeConfirm.prototype.initialize = function (x, y) {
        this._windowHeight = Graphics.boxHeight - y;
        Window_Command.prototype.initialize.call(this, x, y);
        this._item = null;
        this.hide();
        this.deactivate();
    };

    Window_DisposeConfirm.prototype.windowWidth = function () {
        return Graphics.boxWidth / 2;
    };

    Window_DisposeConfirm.prototype.setItem = function (item) {
        this._item = item;
    };

    Window_DisposeConfirm.prototype.windowHeight = function () {
        return this._windowHeight;
    };

    Window_DisposeConfirm.prototype.makeCommandList = function () {
        if (!this._item)
            return;
        var item = this._item;
        var itemIcon = "\\I[" + item.iconIndex + "]";
        var itemName = item.name;
        var itemNum = $gameParty.numItems(item);

        var confirmString = paramConfirmDisposeString.format(itemIcon, itemName, itemNum);
        var cancelString = paramCancelDisposeString.format(itemIcon, itemName, itemNum);

        if (paramCancelDisposeFirst) {
            this.addCommand(cancelString, 'cancel');
            this.addCommand(confirmString, 'dispose');
        } else {
            this.addCommand(confirmString, 'dispose');
            this.addCommand(cancelString, 'cancel');
        }

    };

    Window_DisposeConfirm.prototype.drawItem = function (index) {
        if (!this._item)
            return;
        var rect = this.itemRectForText(index);
        this.resetTextColor();
        this.drawTextEx(this.commandName(index), rect.x, rect.y);
    };

    //==========================================================================
    // Game_System
    //==========================================================================
    DreamX.Junk.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        DreamX.Junk.Game_System_initialize.call(this);
        this._junkItems = [];
    };

    //==========================================================================
    // Window_ItemActionCommand
    //==========================================================================
    DreamX.Junk.Window_ItemActionCommand_addCustomCommandsF = Window_ItemActionCommand.prototype.addCustomCommandsF;
    Window_ItemActionCommand.prototype.addCustomCommandsF = function () {
        DreamX.Junk.Window_ItemActionCommand_addCustomCommandsF.call(this);
        if (!this._item)
            return;
        this.addJunkCommand();
        this.addDisposeCommand();
    };

    Window_ItemActionCommand.prototype.addJunkCommand = function () {
        if (!eval(paramAddJunkCommand)) {
            return;
        }

        var item = this._item;
        var itemIcon = "\\I[" + item.iconIndex + "]";
        var itemName = item.name;
        var itemNum = $gameParty.numItems(item);

        var unmarkString = paramUnmarkJunkString.format(itemIcon, itemName, itemNum);
        var markString = paramMarkJunkString.format(itemIcon, itemName, itemNum);

        var markEnabled = DreamX.Junk.canMarkJunk(item);
        var unmarkEnabled = DreamX.Junk.canUnmarkJunk(item);

        if (unmarkEnabled) {
            this.addCommand(unmarkString, 'unmarkJunk');
        } else if (markEnabled) {
            this.addCommand(markString, 'markJunk');
        }
    };

    Window_ItemActionCommand.prototype.addDisposeCommand = function () {
        var item = this._item;

        var disposeEnabled = DreamX.Junk.canDispose(item);

        if (!disposeEnabled) {
            return;
        }

        var itemIcon = "\\I[" + item.iconIndex + "]";
        var itemName = item.name;
        var itemNum = $gameParty.numItems(item);

        var disposeSingleString = paramDisposeString.format(itemIcon, itemName, itemNum);
        var disposeAllString = paramDisposeAllString.format(itemIcon, itemName, itemNum);

        if (eval(paramAddDisposeCommand)) {
            this.addCommand(disposeSingleString, 'dispose');
        }
        if (eval(paramAddDisposeAllCommand) && $gameParty.numItems(item) > 1) {
            this.addCommand(disposeAllString, 'disposeAll');
        }
    };

    //==========================================================================
    // Game_Party
    //==========================================================================
    Game_Party.prototype.DXUnequipItemParty = function (item) {
        this.allMembers().forEach(function (member) {
            member.unequipItem(item);
        });
    };

    Game_Party.prototype.equippedJunkItems = function () {
        var results = [];
        for (var a = 0; a < $gameParty.members().length; ++a) {
            var actor = $gameParty.members()[a];
            if (!actor)
                continue;
            for (var i = 0; i < actor.equips().length; ++i) {
                var equip = actor.equips()[i];
                if (!equip)
                    continue;
                if (!DreamX.Junk.isJunk(equip)) {
                    continue;
                }
                results.push(equip);
            }
        }
        return results;
    };

    Game_Party.prototype.junkItems = function () {
        var junkItems = [];
        var junkNonEquipItems = this.allItems().filter(function (item) {
            return DreamX.Junk.isJunk(item);
        });

        junkItems = junkNonEquipItems.concat(this.equippedJunkItems());

        return junkItems;
    };

    //==========================================================================
    // Window_ItemCategory
    //==========================================================================
    DreamX.Junk.Window_ItemCategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
    Window_ItemCategory.prototype.makeCommandList = function () {
        DreamX.Junk.Window_ItemCategory_makeCommandList.call(this);
        if (eval(paramAddJunkCommand)) {
            this.addCommand(paramJunkCatString, 'junk');
        }
    };

    //==========================================================================
    // Window_ItemList
    //==========================================================================
    DreamX.Junk.Window_ItemList_makeItemList = Window_ItemList.prototype.makeItemList;
    Window_ItemList.prototype.makeItemList = function () {
        DreamX.Junk.Window_ItemList_makeItemList.call(this);
        if (SceneManager._scene instanceof Scene_Shop && this._category === 'junk') {
            this._data = this._data.concat($gameParty.equippedJunkItems());
        }
    };

    DreamX.Junk.Window_ItemList_includes = Window_ItemList.prototype.includes;
    Window_ItemList.prototype.includes = function (item) {
        var isJunk = DreamX.Junk.isJunk(item);
        if (this._category === 'junk') {
            return isJunk;
        }
        if (isJunk && paramJunkCatOnly) {
            return false;
        }
        return DreamX.Junk.Window_ItemList_includes.call(this, item);
    };

    //==========================================================================
    // Window_ShopCommand
    //==========================================================================
    DreamX.Junk.Window_ShopCommand_addCustomCommands = Window_ShopCommand.prototype.addCustomCommands;
    Window_ShopCommand.prototype.addCustomCommands = function () {
        DreamX.Junk.Window_ShopCommand_addCustomCommands.call(this);
        if (eval(paramAddJunkCommand)) {
            this.addCommand(paramSellAllJunkString, 'sellJunk');
        }
    };

    DreamX.Junk.Window_ShopCommand_select = Window_ShopCommand.prototype.select;
    Window_ShopCommand.prototype.select = function (index) {
        DreamX.Junk.Window_ShopCommand_select.call(this, index);
        var scene = SceneManager._scene;
        if (!scene._dummyWindow) {
            return;
        }

        if (this.commandSymbol(index) === 'sellJunk') {
            scene._dummyWindow.setCategory('junk');
        } else {
            scene._dummyWindow.setCategory('none');
        }
    };

    //==========================================================================
    // Scene_Shop
    //==========================================================================
    DreamX.Junk.Scene_Shop_setCommandWindowHandlers = Scene_Shop.prototype.setCommandWindowHandlers;
    Scene_Shop.prototype.setCommandWindowHandlers = function () {
        DreamX.Junk.Scene_Shop_setCommandWindowHandlers.call(this);
        this._commandWindow.setHandler('sellJunk', this.commandSellJunk.bind(this));
    };

    Scene_Shop.prototype.commandSellJunk = function () {
        var junkItems = $gameParty.junkItems();
        var soldSomething = false;
        var removedSomething = false;

        for (var i = 0; i < junkItems.length; i++) {
            var item = junkItems[i];

            var sellPrice = Math.floor(item.price / 2);
            if (sellPrice === 0 && !paramRemoveValueless) {
                continue;
            }
            $gameParty.DXUnequipItemParty(item);

            var number = $gameParty.numItems(item);
            if (sellPrice > 0) {
                soldSomething = true;
                $gameParty.gainGold(number * sellPrice);
            }

            $gameParty.loseItem(item, number);
            removedSomething = true;
        }

        if ((soldSomething || removedSomething) && paramPlayShop) {
            SoundManager.playShop();
        }

        if (soldSomething) {
            this._goldWindow.refresh();
        }
        if (removedSomething) {
            this._dummyWindow.refresh();
        }
        this._commandWindow.activate();
    };

    Scene_Shop.prototype.createDummyWindow = function () {
        var wy = this._commandWindow.y + this._commandWindow.height;
        var wh = Graphics.boxHeight - wy;
        var ww = Math.ceil(eval(Yanfly.Param.ShopListWidth));
        this._dummyWindow = new Window_ShopSell(0, wy, ww, wh);
        this.addWindow(this._dummyWindow);
    };

})();
