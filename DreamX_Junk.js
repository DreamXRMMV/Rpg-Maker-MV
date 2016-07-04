/*:
 * @plugindesc Mark items as junk and sell them all at once.
 * @author DreamX
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
 * @param --Strings--
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
 * @desc String to display for marking an item as junk.
 * @default Mark As Junk
 *
 * @param Unmark As Junk String
 * @desc String to display for unmarking an item as junk.
 * @default Unmark As Junk
 *
 * @help
 * ============================================================================
 * Important
 * ============================================================================
 * This plugin requires YEP Item Core and YEP Shop Menu Core. This plugin
 * must be put underneath them in the plugin list.
 *
 * In order to sell all junk items at the shop, the command Custom
 * must be somewhere in the command order parameter for YEP Shop Menu Core.
 * By default, it is in, so if you haven't removed it then you don't need to do
 * anything.
 *
 * If you want the sell all junk command to appear somewhere else in the list,
 * just place Custom in a different place in the command order parameter in
 * YEP Shop Menu Core.
 * 
 * Equipment that is not independent cannot be marked as junk. 
 * For this reason, I recommend making equipment independent in Item Core.
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

    DreamX.Junk.Scene_Item_createActionWindow = Scene_Item.prototype.createActionWindow;
    Scene_Item.prototype.createActionWindow = function () {
        DreamX.Junk.Scene_Item_createActionWindow.call(this);
        this._itemActionWindow.setHandler('markJunk', this.onActionMarkJunk.bind(this));
        this._itemActionWindow.setHandler('unmarkJunk', this.onActionUnmarkJunk.bind(this));
    };

    DreamX.Junk.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        DreamX.Junk.Game_System_initialize.call(this);
        this._junkItems = [];
    }

    DreamX.Junk.Window_ItemActionCommand_addCustomCommandsF = Window_ItemActionCommand.prototype.addCustomCommandsF;
    Window_ItemActionCommand.prototype.addCustomCommandsF = function () {
        DreamX.Junk.Window_ItemActionCommand_addCustomCommandsF.call(this);
        if (!this._item)
            return;
        this.addJunkCommand();
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

    Window_ItemActionCommand.prototype.addJunkCommand = function () {
        var item = this._item;
        var markEnabled = DreamX.Junk.canMarkJunk(item);
        var unmarkEnabled = DreamX.Junk.canUnmarkJunk(item);

        if (unmarkEnabled) {
            this.addCommand(paramUnmarkJunkString, 'unmarkJunk');
        } else if (markEnabled) {
            this.addCommand(paramMarkJunkString, 'markJunk');
        }
    };

    Game_Party.prototype.DXUnequipItemParty = function (item) {
        this.allMembers().forEach(function (member) {
            member.unequipItem(item);
        });
    };

    Scene_Item.prototype.onActionMarkJunk = function () {
        var item = this.item();
        $gameSystem._junkItems.push(item);
        if (paramUnequipMarkJunk) {
            $gameParty.DXUnequipItemParty(item);
        }

        this.DXJunkOperation();
    };

    Scene_Item.prototype.DXJunkOperation = function () {
        this._itemActionWindow.hide();
        this._itemActionWindow.deactivate();
        this.activateItemWindow();
    };

    Scene_Item.prototype.onActionUnmarkJunk = function () {
        var item = this.item();
        var index = $gameSystem._junkItems.indexOf(item);
        $gameSystem._junkItems.splice(index, 1);
        this.DXJunkOperation();
    };

    DreamX.Junk.Window_ItemCategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
    Window_ItemCategory.prototype.makeCommandList = function () {
        DreamX.Junk.Window_ItemCategory_makeCommandList.call(this);
        this.addCommand(paramJunkCatString, 'junk');
    };

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

    DreamX.Junk.Scene_Shop_setCommandWindowHandlers = Scene_Shop.prototype.setCommandWindowHandlers;
    Scene_Shop.prototype.setCommandWindowHandlers = function () {
        DreamX.Junk.Scene_Shop_setCommandWindowHandlers.call(this);
        this._commandWindow.setHandler('sellJunk', this.commandSellJunk.bind(this));
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

    DreamX.Junk.Window_ShopCommand_addCustomCommands = Window_ShopCommand.prototype.addCustomCommands;
    Window_ShopCommand.prototype.addCustomCommands = function () {
        DreamX.Junk.Window_ShopCommand_addCustomCommands.call(this);
        this.addCommand(paramSellAllJunkString, 'sellJunk');
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

    Scene_Shop.prototype.createDummyWindow = function () {
        var wy = this._commandWindow.y + this._commandWindow.height;
        var wh = Graphics.boxHeight - wy;
        var ww = Math.ceil(eval(Yanfly.Param.ShopListWidth));
        this._dummyWindow = new Window_ShopSell(0, wy, ww, wh);
        this.addWindow(this._dummyWindow);
    };

})();
