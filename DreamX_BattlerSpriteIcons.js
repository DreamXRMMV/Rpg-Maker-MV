/*:
 * @plugindesc 1.2a
 * @author DreamX
 *
 * @param ---Battler Sprite Icon Window---
 * @default
 *
 * @param Maximum State/Buffs Per Line
 * @desc Maximum states/buffs to show per battler per line. Default: 4
 * @default 4
 *
 * @param Show Icons For Actor
 * @desc Whether to show icons for actors. Default: true
 * @default true
 *
 * @param Show Icons For Enemy
 * @desc Whether to show icons for enemies. Default: true
 * @default true
 *
 * @param Show Icons On Death
 * @desc Whether to keep showing icons when a battler is dead but their sprite is still visible. Default: true
 * @default true
 *
 * @param Show States
 * @desc Show state icons. Default: true
 * @default true
 *
 * @param Show Buffs/Debuffs
 * @desc Show buff and debuff icons. Default: true
 * @default true
 *
 * @param Debuffs Considered Bad
 * @desc Whether debuffs are considered bad. Default: true
 * @default true
 *
 * @param Space X Between Icons
 * @desc The spacing to have between icons in the same line.
 * @default 0
 *
 * @param Icon Width
 * @desc The width of the icons. Default: Window_Base._iconWidth
 * @default Window_Base._iconWidth
 *
 * @param Icon Height
 * @desc The height of the icons. Default: Window_Base._iconHeight
 * @default Window_Base._iconHeight
 *
 * @param Normal States Window Y
 * @desc The y coordinate for the transparent window carrying the normal state/buff icons. Default: this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight * 2) - (this.standardPadding() / 2)
 * @default this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight * 2) - (this.standardPadding() / 2)
 *
 * @param Bad States Window Y
 * @desc The y coordinate for the transparent window carrying the bad state/buff icons. Default: this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight) - (this.standardPadding() / 2)
 * @default this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight) - (this.standardPadding() / 2)
 *
 * @param Icon Window Refresh Rate
 * @desc The number of frames to wait for before refreshing the icon window. Default: 1
 * @default 1
 *
 * @param ---Tooltips---
 * @default
 *
 * @param Show Tooltips
 * @desc default: false
 * @default false
 * 
 * @param Tooltip Refresh Rate
 * @desc The number of frames to wait for before refreshing the tooltip window. Default: 60
 * @default 60
 * 
 * @param Buff Description
 * @desc Whether to show a buff/debuff tooltip description. Default: false
 * @default false
 * 
 * @param Default Buff Description State
 * @desc The state in the database to draw the default buff/debuff description from. 0: Use plugin default Default: 0
 * @default 0
 *
 * @param ---Turn Indicator---
 * @default
 *
 * @param Show Actor Turns
 * @desc Show turns remaining for buffs and states for actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Enemy Turns
 * @desc Show turns remaining for buffs and states for enemies?
 * NO - false     YES - true
 * @default true
 *
 * @param Font Size
 * @desc The default font size used for turn count.
 * Default: 16
 * @default 16
 *
 * @param Turn Alignment
 * @desc How do you want to align the turns?
 * left     center     right
 * @default right
 *
 * @param Turn Buffer X
 * @desc Buffer the x position of the turn by this much.
 * @default -3
 *
 * @param Turn Buffer Y
 * @desc Buffer the y position of the turn by this much.
 * @default -6
 *
 * @param State Color
 * @desc The default text color used for state turns.
 * @default 0
 *
 * @param Buff Color
 * @desc The default text color used for buffs.
 * @default 24
 *
 * @param Debuff Color
 * @desc The default text color used for debuffs.
 * @default 2
 *
 * @help
 * Requires Yanfly Battle Engine Core.
 * ---
 * State Notetags:
 *      <DXBSI TOOLTIP CODE>
 *      x
 *      </DXBSI TOOLTIP CODE>
 *      This is required if you want a tooltip description for a state. 
 *      Replace x  with javascript. Since it is javascript you can technically 
 *      put whatever you want there, but it's intended for putting things in the 
 *      tooltip window. I recommend using this.drawLine(text, y)
 *      
 *      Replace text with a variable containing the text you want to display, 
 *      and y with the height of the line. For y, I recommend using the highest 
 *      height of what you are displaying in the line, such as font size or 
 *      an icon. 
 *      
 *      Here is an example of this notetag set. This example was done with 
 *      Yanfly Message Core on, so that \\fs could be used to change font size.
 *      Notice that this example uses \\ instead of just \. You'll need to do 
 *      that here when using message codes.
 *      
 *      <DXBSI TOOLTIP CODE>
 *      var name = "\\fs[20]\\C[6]" + state.name;
 *      var defenseRate = state.traits[0].value * 100;
 *      var description = "\\fs[16]Increases defense by \\C[3]" + defenseRate 
 *          + "%\\C[0].";
 *      var turns = "\\fs[16]\\C[6]" + this.turns() + " turns remaining.";
 *      
 *      this.drawLine(name, 20);
 *      this.drawLine(description, 16);
 *      if (turns) {
 *      this.drawLine(turns, 16);
 *      }
 *      </DXBSI TOOLTIP CODE>
 *      
 *      If you require javascript assistance, I recommend either asking in the
 *      thread for this plugin or elsewhere.
 *      
 *      <DXBSIBadState:1>
 *      Designates state as a bad state. It will appear on its own line.
 *
 *      <DXBSIHideIcon:1>
 *      Prevent state's icon from showing next to sprite.
 *
 *      <DXBSIHideTurns: 1>
 *      Prevent state's turns from showing.
 *
 *      <DXBSITurnFontSize: x>
 *      Sets the font size used for this specific state to be x. This will
 *      override the default setting.
 *
 *      <DXBSITurnAlignment: x>
 *      This sets the text alignment for the turn count indicator. This will
 *      override the default setting. X can be left right or center.
 *
 *      <DXBSITurnBufferX: +x>
 *      <DXBSITurnBufferX: -x>
 *      <DXBSITurnBufferY: +x>
 *      <DXBSITurnBufferY: -x>
 *      Allows you to adjust the x/y position manually for the turn count for
 *      this particular state. This will override the default settings.
 *
 *      <DXBSITurnColor: x>
 *      This will set the turn count display color to text color x. This will
 *      override the default setting.
 *
 * Actor/Enemy Notetags:
 *      <DXBSIHideIcons:1>
 *      Prevent state/buffs icons from being shown for battler sprite.
 *
 *      <DXBSIHideTurns:1>
 *      Prevent turns from being shown for the battler sprite.
 * --
 * Here's an example of how to set a requirement for the state to appear next
 * to the sprite. You'll need to know some javascript.
 * <DXBSI SHOW REQUIREMENT>
 * $gameSwitches.value(1)
 * </DXBSI SHOW REQUIREMENT>
 * This will require that the switch 1 is on.
 * ===========================================================================
 * Terms Of Use
 * ===========================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ===========================================================================
 * Compatibility
 * ===========================================================================
 * Set under Yanfly plugins.
 * ===========================================================================
 * Credits
 * ===========================================================================
 * DreamX
 * Thanks to Yanfly for code/configuration style from Battle Engine Core and
 * Buffs States Core.
 */

var Imported = Imported || {};
Imported.DreamX_BattlerSpriteIcons = true;

var DreamX = DreamX || {};
DreamX.BattlerSpriteIcons = DreamX.BattlerSpriteIcons || {};

DreamX.Parameters = PluginManager.parameters('DreamX_BattlerSpriteIcons');
DreamX.Param = DreamX.Param || {};

DreamX.Param.BSIMaxStatesBuffsPerLine = eval(String(DreamX.Parameters['Maximum State/Buffs Per Line']) || 6);
DreamX.Param.BSISpaceX = eval(String(DreamX.Parameters['Space X Between Icons']) || 0);
DreamX.Param.BSINormalWindowY = String(DreamX.Parameters['Normal States Window Y']);
DreamX.Param.BSIBadWindowY = String(DreamX.Parameters['Bad States Window Y']);
DreamX.Param.BSIIconWidth = eval(String(DreamX.Parameters['Icon Width']) || Window_Base._iconWidth);
DreamX.Param.BSIIconHeight = eval(String(DreamX.Parameters['Icon Height']) || Window_Base._iconHeight);
DreamX.Param.BSIShowStates = eval(String(DreamX.Parameters['Show States']) || true);
DreamX.Param.BSIShowBuffsDebuffs = eval(String(DreamX.Parameters['Show Buffs/Debuffs']) || true);
DreamX.Param.BSIDebuffsBad = eval(String(DreamX.Parameters['Debuffs Considered Bad']) || true);
DreamX.Param.ToolTipRefreshRate = eval(String(DreamX.Parameters['Tooltip Refresh Rate']) || 60);
DreamX.Param.IconWindowRefreshRate = eval(String(DreamX.Parameters['Icon Window Refresh Rate']) || 60);
DreamX.Param.BSIShowActorIcons = eval(String(DreamX.Parameters['Show Icons For Actor']) || true);
DreamX.Param.BSIShowEnemyIcons = eval(String(DreamX.Parameters['Show Icons For Enemy']) || true);
DreamX.Param.BSIShowIconsOnDeath = eval(String(DreamX.Parameters['Show Icons On Death']) || true);
DreamX.Param.BSIShowDefaultBuffDesc = eval(String(DreamX.Parameters['Buff Description']) || true);
DreamX.Param.BSIDefaultBuffDesc = Number(DreamX.Parameters['Default Buff Description State']);


DreamX.Param.BSIShowTooltips = eval(String(DreamX.Parameters['Show Tooltips']));

DreamX.Param.BSIShowActorTurns = eval(String(DreamX.Parameters['Show Actor Turns']));
DreamX.Param.BSIShowEnemyTurns = eval(String(DreamX.Parameters['Show Enemy Turns']));
DreamX.Param.BSIFontSize = String(DreamX.Parameters['Font Size']);
DreamX.Param.BSITurnAlign = String(DreamX.Parameters['Turn Alignment']);
DreamX.Param.BSITurnBufferX = Number(DreamX.Parameters['Turn Buffer X']);
DreamX.Param.BSITurnBufferY = Number(DreamX.Parameters['Turn Buffer Y']);
DreamX.Param.BSITurnColor = Number(DreamX.Parameters['State Color']);
DreamX.Param.BSIBuffColor = Number(DreamX.Parameters['Buff Color']);
DreamX.Param.BSIDebuffColor = Number(DreamX.Parameters['Debuff Color']);

(function () {
    //==========================================================================
    // DataManager
    //==========================================================================
    DreamX.BattlerSpriteIcons.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.BattlerSpriteIcons.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX.BattlerSpriteIconsLoaded) {
            this.processDXBSIStateNotetags($dataStates);
            DreamX.BattlerSpriteIconsLoaded = true;
        }
        return true;
    };

    DataManager.processDXBSIStateNotetags = function (data) {
        var evalMode = 'none';

        for (var i = 0; i < data.length; i++) {
            var state = data[i];
            if (!state)
                continue;

            state.DXBSITooltipCode = '';
            var notedata = state.note.split(/[\r\n]+/);

            for (var j = 0; j < notedata.length && !evalMode.match('finish'); j++) {
                var line = notedata[j];
                if (line.match(/<(?:DXBSI TOOLTIP CODE)>/i)) {
                    evalMode = 'tooltipCode';
                } else if (line.match(/<\/(?:DXBSI TOOLTIP CODE)>/i)) {
                    evalMode = 'finish';
                } else if (evalMode === 'tooltipCode') {
                    state.DXBSITooltipCode += line + '\n';
                } else {
                    evalMode = 'none';
                }
            }

            evalMode = 'none';
        }
    };

    //=============================================================================
    // Scene_Battle
    //=============================================================================
    Scene_Battle.prototype.DXBSIIconWindowIndex = function () {
        var toolTipWindowIndex;
        var scene = SceneManager._scene;

        for (var i = 0; i < this.children.length && !toolTipWindowIndex; i++) {
            if (this.children[i] instanceof Window_StateToolTip) {
                toolTipWindowIndex = i;
            }
        }

        if (toolTipWindowIndex)
            return toolTipWindowIndex;

        return this.children.indexOf(scene._windowLayer);
    };

    //==========================================================================
    // Sprite_StateIcon
    //==========================================================================
    DreamX.BattlerSpriteIcons.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function () {
    };

    //==========================================================================
    // Sprite_Battler
    //==========================================================================
    DreamX.BattlerSpriteIcons.Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function () {
        DreamX.BattlerSpriteIcons.Sprite_Battler_update.call(this);
        this.addStateIconWindows();
    };

    Sprite_Battler.prototype.addStateIconWindows = function () {
        var battler = this._battler;
        if (!battler)
            return;
        if (this._DXBSI_addedStateIconWindows)
            return;
        if (!SceneManager._scene)
            return;
        var scene = SceneManager._scene;
        if (!scene._windowLayer)
            return;

        if (battler.isActor() && !$gameSystem.isSideView())
            return;
        if (battler.isActor() && !DreamX.Param.BSIShowActorIcons) {
            return;
        }
        if (battler.isEnemy() && !DreamX.Param.BSIShowEnemyIcons) {
            return;
        }

        this._DXBSI_NormalStateIconWindow = new Window_BattleNormalStateIcon(battler);
        this._DXBSI_BadStateIconWindow = new Window_BattleBadStateIcon(battler);

        scene.addChildAt(this._DXBSI_NormalStateIconWindow, scene.DXBSIIconWindowIndex());
        scene.addChildAt(this._DXBSI_BadStateIconWindow, scene.DXBSIIconWindowIndex());
        this._DXBSI_addedStateIconWindows = true;
    };

    //=============================================================================
    // Window_BattleStateIcon
    //=============================================================================

    function Window_BattleStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleStateIcon.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleStateIcon.prototype.constructor = Window_BattleStateIcon;


    Window_BattleStateIcon.prototype.initialize = function (battler) {
        this._battler = battler;
        Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
        this.opacity = 0;
        if (DreamX.Param.BSIShowTooltips === true) {
            this.createToolTipWindows();
        }
    };

    Window_BattleStateIcon.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        if (Graphics.frameCount % DreamX.Param.IconWindowRefreshRate !== 0) {
            return;
        }
        this.refresh();
    };

    Window_BattleStateIcon.prototype.refresh = function () {
        var battler = this._battler;

        if (this.contents) {
            this.contents.clear();
        }
        if (!battler)
            return;

        if (!battler.isAppeared())
            return;

        if ($gameTroop.isAllDead()) {
            return;
        }

        var dataBattler = battler.isActor() ? battler.actor() : battler.enemy();

        if (dataBattler.meta.DXBSIHideIcons) {
            return;
        }

        if (battler.isDead() && DreamX.Param.BSIShowIconsOnDeath === false) {
            return;
        }
        this.drawAllItems();
        this.updateWindowPosition();
        if (DreamX.Param.BSIShowTooltips === true) {
            this.updateToolTipWindows();
        }
    };

    Window_BattleStateIcon.prototype.createToolTipWindows = function () {
        if (this._DXBSI_addedTooltipWindows)
            return;
        var scene = SceneManager._scene;
        if (!scene._windowLayer)
            return;
        var childIndex = scene.children.indexOf(scene._windowLayer);
        this._tooltipWindows = [];
        for (var i = 0; i < this.maxItems(); i++) {
            var tooltipWindow = new Window_StateToolTip(this, i);
            this._tooltipWindows.push(tooltipWindow);
            scene.addChildAt(tooltipWindow, childIndex);
        }
        this._DXBSI_addedTooltipWindows = true;
    };

    Window_BattleStateIcon.prototype.hideAllToolTips = function () {
        for (var i = 0; i < this._tooltipWindows.length; i++) {
            this._tooltipWindows[i].hide();
        }
    };

    Window_BattleStateIcon.prototype.processTouch = function () {
        if (!this._tooltipWindows)
            return;
        var x = this.canvasToLocalX(TouchInput._mouseOverX);
        // TouchInput.x
        var y = this.canvasToLocalY(TouchInput._mouseOverY);
        // TouchInput.y
        var hitIndex = this.hitTest(x, y);
        this.hideAllToolTips();
        if (hitIndex >= 0 && hitIndex < this.iconsArray().length) {
            if (!this._tooltipWindows[hitIndex]) {
                return;
            }
            this._tooltipWindows[hitIndex].showAndMove(hitIndex);
        }
    };

    Window_BattleStateIcon.prototype.updateWindowPosition = function () {
        var x = this._battler.spritePosX() - this.standardPadding() - (DreamX.Param.BSIIconWidth / 2);

        x -= (this.highestLineIconCount() - 1) * DreamX.Param.BSIIconWidth / 2;

        if (x < 0) {
            x = 0;
        }

        this.x = x;
        this.y = this.windowMoveY();
    };

    Window_BattleStateIcon.prototype.windowHeight = function () {
        return DreamX.Param.BSIIconHeight + (this.standardPadding() * 2);
    };

    Window_BattleStateIcon.prototype.windowWidth = function () {
        return DreamX.Param.BSIMaxStatesBuffsPerLine
                * (DreamX.Param.BSIIconWidth + this.spacing())
                + (this.standardPadding() * 2);
    };

    // overwrite me
    Window_BattleStateIcon.prototype.windowMoveY = function () {
    };

    // overwrite me
    Window_BattleStateIcon.prototype.iconsArray = function () {
    };

    Window_BattleStateIcon.prototype.updateToolTipWindows = function () {
        for (var i = 0; i < this.iconsArray().length; i++) {
            var buffState = this.iconsArray()[i];
            if (!buffState)
                continue;
            this._tooltipWindows[i].setBuffState(buffState);
        }
    };

    Window_BattleStateIcon.prototype.itemWidth = function () {
        return DreamX.Param.BSIIconWidth;
    };

    Window_BattleStateIcon.prototype.itemHeight = function () {
        return DreamX.Param.BSIIconHeight;
    };

    Window_BattleStateIcon.prototype.spacing = function () {
        return DreamX.Param.BSISpaceX;
    };

    Window_BattleStateIcon.prototype.maxCols = function () {
        return DreamX.Param.BSIMaxStatesBuffsPerLine;
    };

    Window_BattleStateIcon.prototype.maxItems = function () {
        return DreamX.Param.BSIMaxStatesBuffsPerLine;
    };

    Window_BattleStateIcon.prototype.drawItem = function (index) {
        var rect = this.itemRect(index);
        var battler = this._battler;
        var dataBattler = battler.isActor() ? battler.actor() : battler.enemy();

        this.drawState(rect.x, rect.y, index, this.iconsArray(), dataBattler);
    };

    Window_BattleStateIcon.prototype.drawState = function (x, y, index, array, dataBattler) {
        var stateBuff = array[index];

        if (!stateBuff)
            return;

        var icon = stateBuff.icon;
        var turns = stateBuff.turns;

        this.drawIcon(icon, x, y);

        if (turns <= 0 || dataBattler.meta.DXBSIHideTurns) {
            return;
        }

        var textX = x + this.turnXOffset(stateBuff);
        var textY = y + this.turnYOffset(stateBuff);
        var fontSize = this.turnFontSize(stateBuff);
        var alignment = this.turnAlignment(stateBuff);
        var color = this.turnColor(stateBuff);

        this.changePaintOpacity(true);
        this.changeTextColor(this.textColor(color));
        this.contents.fontSize = fontSize;
        this.drawText(turns, textX, textY, DreamX.Param.BSIIconWidth, alignment);
        this.resetFontSettings();
        this.resetTextColor();
    };

    Window_BattleStateIcon.prototype.highestLineIconCount = function () {
        var battler = this._battler;
        var normalIconsCount = battler.DreamX_BSI_AllNormal().length;
        var badIconsCount = battler.DreamX_BSI_AllBad().length;
        var highestCount = 0;

        highestCount = Math.max(normalIconsCount, badIconsCount);

        if (highestCount > DreamX.Param.BSIMaxStatesBuffsPerLine) {
            highestCount = DreamX.Param.BSIMaxStatesBuffsPerLine;
        }

        return highestCount;
    };

    Window_BattleStateIcon.prototype.turnFontSize = function (stateBuff) {
        var isState = stateBuff.state ? true : false;

        if (isState) {
            var dataStateMeta = $dataStates[stateBuff.id].meta;
            var meta = dataStateMeta.DXBSITurnFontSize;
            if (meta) {
                return eval(meta);
            }
        }
        return DreamX.Param.BSIFontSize;
    };

    Window_BattleStateIcon.prototype.turnXOffset = function (stateBuff, isState) {
        var isState = stateBuff.state ? true : false;

        if (isState) {
            var dataStateMeta = $dataStates[stateBuff.id].meta;
            var meta = dataStateMeta.DXBSITurnBufferX;
            if (meta) {
                return eval(meta);
            }
        }
        return DreamX.Param.BSITurnBufferX;
    };

    Window_BattleStateIcon.prototype.turnYOffset = function (stateBuff, isState) {
        var isState = stateBuff.state ? true : false;

        if (isState) {
            var dataStateMeta = $dataStates[stateBuff.id].meta;
            var meta = dataStateMeta.DXBSITurnBufferY;
            if (meta) {
                return eval(meta);
            }
        }

        return DreamX.Param.BSITurnBufferY;
    };

    Window_BattleStateIcon.prototype.turnAlignment = function (stateBuff) {
        var isState = stateBuff.state ? true : false;

        if (isState) {
            var dataStateMeta = $dataStates[stateBuff.id].meta;
            var meta = dataStateMeta.DXBSITurnAlignment;
            if (meta) {
                return meta.trim().toLowerCase();
            }
        }
        return DreamX.Param.BSITurnAlign;
    };

    Window_BattleStateIcon.prototype.turnColor = function (stateBuff) {
        var isState = stateBuff.state ? true : false;

        if (isState) {
            var dataStateMeta = $dataStates[stateBuff.id].meta;
            var meta = dataStateMeta.DXBSITurnColor;
            if (meta) {
                return eval(meta);
            }
        } else {
            if (stateBuff.debuff) {
                return DreamX.Param.BSIDebuffColor;
            }
            return DreamX.Param.BSIBuffColor;
        }
        return DreamX.Param.BSITurnColor;
    };

    //=============================================================================
    // Window_BattleNormalStateIcon
    //=============================================================================

    function Window_BattleNormalStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleNormalStateIcon.prototype = Object.create(Window_BattleStateIcon.prototype);
    Window_BattleNormalStateIcon.prototype.constructor = Window_BattleNormalStateIcon;

    Window_BattleNormalStateIcon.prototype.windowMoveY = function () {
        var y = eval(DreamX.Param.BSINormalWindowY);
        if (y < 0) {
            y = 0;
        }

        return y;
    };

    Window_BattleNormalStateIcon.prototype.iconsArray = function () {
        var battler = this._battler;
        return battler.DreamX_BSI_AllNormal();
    };

    //=============================================================================
    // Window_BattleBadStateIcon
    //=============================================================================
    function Window_BattleBadStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleBadStateIcon.prototype = Object.create(Window_BattleStateIcon.prototype);
    Window_BattleBadStateIcon.prototype.constructor = Window_BattleBadStateIcon;

    Window_BattleBadStateIcon.prototype.windowMoveY = function () {
        var y = eval(DreamX.Param.BSIBadWindowY);
        if (y < 0) {
            y = 0;
        }

        return y;
    };

    Window_BattleBadStateIcon.prototype.iconsArray = function () {
        var battler = this._battler;
        return battler.DreamX_BSI_AllBad();
    };

//=============================================================================
// Window_StateToolTip
//=============================================================================
    function Window_StateToolTip() {
        this.initialize.apply(this, arguments);
    }

    Window_StateToolTip.prototype = Object.create(Window_Base.prototype);
    Window_StateToolTip.prototype.constructor = Window_StateToolTip;

    Window_StateToolTip.prototype.initialize = function (iconWindow, index) {
        Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        this._index = index;
        this._iconWindow = iconWindow;
        this._battler = iconWindow._battler;
        this._lineTextWidth = 0;
        this._lineTextHeight = 0;

        // whether a manual refresh is requested
        this._requestRefresh = false;


        // whether the window's contents have been cleared
        this._contentsCleared = false;

        this._isBuff = false;
    };

    Window_StateToolTip.prototype.setBuffState = function (buffState) {
        var stateChanged;

        if (!this._isBuff && this._buffState !== $dataStates[buffState.id]) {
            stateChanged = true;
        }

        this._buffState = buffState;

        if (buffState.state) {
            this._buffState = $dataStates[buffState.id];
        } else {
            this._isBuff = true;
        }

        // if the state changed, then request a refresh
        if (stateChanged) {
            this._requestRefresh = true;
        }
    };

    Window_StateToolTip.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        // if a manual refresh wasn't requested, then refresh every second
        // (60 frames) instead
        if (!this._requestRefresh) {
            return;
        }

        this.refresh();
    };

    Window_StateToolTip.prototype.defaultBuffDescription = function () {
        var buff = this._buffState;

        var name = TextManager.param(buff.id);
        var symbol = buff.value > 0 ? "+" : "-";
        var nameTextSize = this.contents.fontSize - 12;
        var nameLine = "\\\\}\\\\C[6]" + symbol + name;
        var nameCode = "this.drawLine(\"" + nameLine + "\", " + nameTextSize + ");";

        var turnLine = "\\\\}" + this.turns() + " turns remaining.";
        var turnCode = "this.drawLine(\"" + turnLine + "\", " + nameTextSize + ");";

        var code = nameCode + turnCode;

        return code;
    };

    Window_StateToolTip.prototype.refresh = function () {
        if (this.contents && !this._contentsCleared) {
            this.contents.clear();
            this._contentsCleared = true;
        }
        if (this._battler && this._buffState) {
            this._lineTextWidth = 0;
            this._lineTextHeight = 0;
            this.drawDescription();
            this.updateSize();
            this._requestRefresh = false;
            this._contentsCleared = false;
        }
    };

    Window_StateToolTip.prototype.drawLine = function (text, height) {
        if (!text) {
            return;
        }

        if (!height) {
            height = this.standardFontSize();
        }
        if (this.hasTextIcon(text)) {
            height += (DreamX.Param.BSIIconHeight - height) / 2;
        }
        height += 8;

        var width = this.drawTextEx(text, 0, this._lineTextHeight);

        if (width > this._lineTextWidth) {
            this._lineTextWidth = width;
        }

        this._lineTextHeight += height;
    };

    Window_StateToolTip.prototype.hasTextIcon = function (text) {
        return new RegExp("\\\\I").test(text);
    };

    Window_StateToolTip.prototype.updateSize = function () {
        this.width = this._lineTextWidth + this.standardPadding() * 2;
        this.height = this._lineTextHeight + this.standardPadding() * 2;
    };

    Window_StateToolTip.prototype.turns = function () {
        var buffState = this._buffState;
        var battler = this._battler;

        if (!buffState || !battler) {
            return;
        }

        if (this._isBuff) {
            return battler._buffTurns[buffState.id];
        }

        var stateTurns = battler._stateTurns[buffState.id];

        if (stateTurns)
            return stateTurns;

        return "";
    };

    Window_StateToolTip.prototype.buffDescriptionCode = function () {
        if (!DreamX.Param.BSIShowDefaultBuffDesc) {
            return "";
        }
        if (DreamX.Param.BSIDefaultBuffDesc) {
            return $dataStates[DreamX.Param.BSIDefaultBuffDesc].DXBSITooltipCode;
        }

        return this.defaultBuffDescription();
    };

    Window_StateToolTip.prototype.drawDescription = function () {
        var state = this._buffState;
        var buff = this._buffState;
        var description = this.descriptionCode();

        if (!description) {
            return;
        }
        eval(description);
    };

    Window_StateToolTip.prototype.stateDescriptionCode = function () {
        var buffState = this._buffState;
        if (buffState && !this._isBuff) {
            if (buffState.DXBSITooltipCode) {
                return buffState.DXBSITooltipCode;
            }
        }
        return "";
    };

    Window_StateToolTip.prototype.descriptionCode = function () {
        var buffState = this._buffState;
        if (buffState) {
            var description = this._isBuff ? this.buffDescriptionCode()
                    : this.stateDescriptionCode();
            if (description)
                return description;
        }
        return "";
    };

    Window_StateToolTip.prototype.showAndMove = function () {
        var iconWindow = this._iconWindow;
        var index = this._index;

        if (!this.descriptionCode()) {
            return;
        }

        var rect = iconWindow.itemRect(index);
        var x = iconWindow.x + rect.x + this.standardPadding();

        x = (x - this.width / 2) + DreamX.Param.BSIIconWidth / 2;

        var y = iconWindow.y + rect.y;
        y -= this.height;

        this._iconWindow = iconWindow;

        if (x < 0) {
            x = 0;
        }
        if (x + this.width >= Graphics.boxWidth) {
            x = Graphics.boxWidth - this.width;
        }

        if (y < 0) {
            y = 0;
        }
        if (y + this.height >= Graphics.boxHeight) {
            y = Graphics.boxWidth - this.width;
        }

        this.x = x;
        this.y = y;

        this.show();
    };

//=============================================================================
// Game_BattlerBase
//=============================================================================
    Game_BattlerBase.prototype.DreamX_BSI_AllNormal = function () {
        var stateIcons = [];
        if (DreamX.Param.BSIShowStates) {
            stateIcons = stateIcons.concat(this.DreamX_BSI_AllStatesNormal());
        }
        if (DreamX.Param.BSIShowBuffsDebuffs) {
            stateIcons = stateIcons.concat(this.DreamX_BSI_NormalBuffs());
        }

        return stateIcons;
    };

    Game_BattlerBase.prototype.DreamX_BSI_AllBad = function () {
        var bad = [];
        if (DreamX.Param.BSIShowStates) {
            bad = bad.concat(this.DreamX_BSI_AllStatesBad());
        }
        if (DreamX.Param.BSIShowBuffsDebuffs) {
            bad = bad.concat(this.DreamX_BSI_BadBuffs());
        }

        return bad;
    };

    Game_BattlerBase.prototype.DreamX_BSI_NormalBuffs = function () {
        var goodBuffs = [];
        for (var i = 0; i < this._buffs.length; i++) {
            var buffValue = this._buffs[i];
            var paramId = i;
            if (this._buffs[i] > 0 || DreamX.Param.BSIDebuffsBad === false) {
                goodBuffs.push(this.DreamX_BSI_BuffObject(buffValue, paramId));
            }
        }
        return goodBuffs;
    };

    Game_BattlerBase.prototype.DreamX_BSI_BadBuffs = function () {
        var badBuffs = [];
        for (var i = 0; i < this._buffs.length; i++) {
            var buffValue = this._buffs[i];
            var paramId = i;
            if (this._buffs[i] < 0 && DreamX.Param.BSIDebuffsBad === true) {
                badBuffs.push(this.DreamX_BSI_BuffObject(buffValue, paramId));
            }
        }
        return badBuffs;
    };

    Game_BattlerBase.prototype.DreamX_BSI_BuffObject = function (buffValue, paramId) {
        var icon = this.buffIconIndex(buffValue, paramId);
        var turns = this._buffTurns[paramId];
        var debuff = buffValue < 0;
        return {icon: icon, turns: turns, id: paramId, debuff: debuff};
    };

    Game_BattlerBase.prototype.DreamX_BSI_AllStatesBad = function () {
        var badStates = [];
        var validStates = this.DreamX_BSI_AllValidDataStates();
        for (var i = 0; i < validStates.length; i++) {
            var state = validStates[i];
            if (state.meta.DXBSIBadState) {
                badStates.push(this.DreamX_BSI_StateObject(state));
            }
        }

        return badStates;
    };

    Game_BattlerBase.prototype.DreamX_BSI_AllStatesNormal = function () {
        var normalStates = [];
        var validStates = this.DreamX_BSI_AllValidDataStates();

        for (var i = 0; i < validStates.length; i++) {
            var state = validStates[i];
            if (!state.meta.DXBSIBadState) {
                normalStates.push(this.DreamX_BSI_StateObject(state));
            }
        }

        return normalStates;
    };

    Game_BattlerBase.prototype.DreamX_BSI_StateObject = function (state) {
        // make a deep copy

        var stateTurns = this._stateTurns[state.id]
                ? JSON.parse(JSON.stringify(this._stateTurns[state.id])) : 0;
        if (state.autoRemovalTiming <= 0 || state.meta.DXBSIHideTurns)
            stateTurns = 0;
        return {icon: state.iconIndex, turns: stateTurns, id: state.id, state: true};
    };

    Game_BattlerBase.prototype.DreamX_BSI_AllValidDataStates = function () {
        var validDataStates = [];
        for (var i = 0; i < this.states().length; i++) {
            var state = this.states()[i];
            if (DreamX.BattlerSpriteIcons.isValidState(state)) {
                validDataStates.push(state);
            }
        }

        // sort by priority
        validDataStates.sort(function (a, b) {
            var p1 = $dataStates[a.id].priority;
            var p2 = $dataStates[b.id].priority;
            if (p1 !== p2) {
                return p2 - p1;
            }
            return a.id - b.id;
        });

        return validDataStates;
    };

    DreamX.BattlerSpriteIcons.isValidState = function (state) {
        var evalMode = 'none';
        var notedata = state.note.split(/[\r\n]+/);
        var jsScript = "";

        if (state.meta.DXBSIHideIcon) {
            return false;
        }

        if (state.iconIndex <= 0) {
            return false;
        }

        if (state.priority <= 0) {
            return false;
        }

        for (var i = 0; i < notedata.length; i++) {
            var line = notedata[i];
            if (line.match(/<(?:DXBSI SHOW REQUIREMENT)>/i)) {
                evalMode = 'requirement';
            } else if (line.match(/<\/(?:DXBSI SHOW REQUIREMENT)>/i)) {
                evalMode = 'none';
            } else if (evalMode === 'requirement') {
                jsScript = jsScript + line + '\n';
            }
        }
        // if there was no custom requirement, this returns true
        if (jsScript.length === 0) {
            return true;
        }

        return eval(jsScript);
    };



})();
