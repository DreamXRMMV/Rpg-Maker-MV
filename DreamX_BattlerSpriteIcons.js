/*:
 * @plugindesc 1.4b
 * @author DreamX
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
 * @param Max Y Value (Battle)
 * @desc The maximum y value for the tooltip window in battle. Default: scene._statusWindow.y - this.height
 * @default scene._statusWindow.y - this.height
 *
 * @param Default Turns Remaining Text (Singular)
 * @desc Text to display for default turns remaining text in tooltip. For one turn only.
 * @default turn remaining.
 *
 * @param Default Turns Remaining Text (Plural)
 * @desc Text to display for default turns remaining text in tooltip. For multiple turns only.
 * @default turns remaining.
 *
 * @param ---Turns---
 * @default
 *
 * @param Show Actor State Turns
 * @desc Show turns remaining for states for actors?
 * NO - false     YES - true
 * @default true
 *
 * @param Show Actor Buff Turns
 * @desc Show turns remaining for buffs/debuffs for actors?
 * NO - false     YES - true
 * @default true
 *
 * @param ---Counters---
 *
 * @param Show Actor Counters
 * @desc Show counters for states for actors?
 * NO - false     YES - true
 * @default true
 * @help
 * Requires Yanfly Battle Engine Core.
 *
 * Showing turns, counters and buff rates requires YEP Buff States Core. How
 * they are displayed depends on the parameters you choose for that plugin.
 *
 * ---
 * State Notetags:
 *      <DXBSI_Description: x>
 *      Replace x with the description of the state. This will appear in the
 *      tooltip if tooltips are turned on.
 
 *      <DXBSIBadState>
 *      Designates state as a bad state. It will appear on its own line.
 *
 *      <DXBSIHideIcon>
 *      Prevent state's icon from showing next to sprite.
 * ---
 * Actor/Enemy Notetags:
 *      <DXBSIHideIcons>
 *      Prevent state/buffs icons from being shown for battler sprite.
 * ---
 * Special State Tooltip Code
 *      You should use this only if you know some javascript.
 *      <DXBSI TOOLTIP CODE>
 *      x
 *      </DXBSI TOOLTIP CODE>
 *      This will determine a custom tooltip for the state.
 *      Replace x  with javascript. Using this.drawLine(text, y) is
 *      required to show text properly.
 *
 *      Replace text with a variable containing the text you want to display,
 *      and y with the height of the line. For y, I recommend using the highest
 *      height of what you are displaying in the line, such as font size or
 *      an icon, plus 8.
 *
 *      Here is an example of this notetag set. This example was done with
 *      Yanfly Message Core on, so that \\fs could be used to change font size.
 *      Notice that this example uses \\ instead of just \. You'll need to do
 *      that here when using message codes.
 *
 *      Use this._buffState to reference the state.
 *
 *      <DXBSI TOOLTIP CODE>
 *      var name = "\\fs[20]\\C[6]" + this._buffState.name;
 *      var defenseRate = this._buffState.traits[0].value * 100;
 *      var description = "\\fs[16]Increases defense by \\C[3]" + defenseRate + "%\\C[0].";
 *      var turns = "\\fs[16]\\C[6]" + this.turns() + " turns remaining.";
 *      this.drawLine(name, 28);
 *      this.drawLine(description, 24);
 *      if (this.turns()) {
 *      this.drawLine(turns, 24);
 *      }
 *      </DXBSI TOOLTIP CODE>
 *
 *      Here's an example of how to set a requirement for the state to appear
 *      next to the sprite. You'll need to know some javascript.
 *      <DXBSI SHOW REQUIREMENT>
 *      $gameSwitches.value(1)
 *      </DXBSI SHOW REQUIREMENT>
 *      This will require that the switch 1 is on.
 * --
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
DreamX.Param.IconWindowRefreshRate = eval(String(DreamX.Parameters['Icon Window Refresh Rate']) || 60);
DreamX.Param.BSIShowActorIcons = eval(String(DreamX.Parameters['Show Icons For Actor']) || true);
DreamX.Param.BSIShowEnemyIcons = eval(String(DreamX.Parameters['Show Icons For Enemy']) || true);
DreamX.Param.BSIShowIconsOnDeath = eval(String(DreamX.Parameters['Show Icons On Death']) || true);
DreamX.Param.BSIShowDefaultBuffDesc = eval(String(DreamX.Parameters['Buff Description']) || true);
DreamX.Param.BSIDefaultBuffDesc = Number(DreamX.Parameters['Default Buff Description State']);

DreamX.Param.BSITooltipMaxYBattle = String(DreamX.Parameters['Max Y Value (Battle)']);
DreamX.Param.BSIShowTooltips = eval(String(DreamX.Parameters['Show Tooltips']));

DreamX.Param.BSIShowActorTurns = eval(String(DreamX.Parameters['Show Actor State Turns']));
DreamX.Param.BSIShowActorCounters = eval(String(DreamX.Parameters['Show Actor Counters']));
DreamX.Param.BSIShowActorBuffTurns = eval(String(DreamX.Parameters['Show Actor Buff Turns']));

DreamX.Param.BSITurnsRemainingTextSingular = String(DreamX.Parameters['Default Turns Remaining Text (Singular)']);
DreamX.Param.BSITurnsRemainingTextPlural = String(DreamX.Parameters['Default Turns Remaining Text (Plural)']);


(function () {
    //==========================================================================
    // DataManager
    //==========================================================================
    DreamX.BattlerSpriteIcons.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.BattlerSpriteIcons.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_BattleEngineCore) {
            throw new Error('DreamX_BattlerSpriteIcons requires YEP_BattleEngineCore');
        }
        if (!Imported.YEP_BuffsStatesCore) {
            throw new Error('DreamX_BattlerSpriteIcons requires YEP_BuffsStatesCore');
        }
        if (!Imported.YEP_MessageCore) {
            throw new Error('DreamX_BattlerSpriteIcons requires YEP_MessageCore');
        }
    };

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

    DreamX.BattlerSpriteIcons.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function () {
        DreamX.BattlerSpriteIcons.Scene_Battle_createDisplayObjects.call(this);
        this.addBattlerStateWindows();
    };

    DreamX.BattlerSpriteIcons.Scene_Battle_update = Scene_Battle.prototype.update;
    Scene_Battle.prototype.update = function () {
        DreamX.BattlerSpriteIcons.Scene_Battle_update.call(this);
        if (!this._tooltipWindow) {
            return;
        }

        var hover = false;
        var windows = this._stateIconWindows.concat(this._hudIconWindows);

        for (var i = 0; i < windows.length; i++) {
            var window = windows[i];
            var windowHitIndex = window.hitIndex();
            if (windowHitIndex !== -1) {
                this._currentTooltipHitIndex = windowHitIndex;
                hover = true;
                this._currentTooltipHitWindow = window;
                break;
            }
        }

        if (!hover) {
            this._tooltipWindow.clear();
            this._tooltipWindow.hide();
        } else {
            if (this._previousTooltipHitIndex
                    !== this._currentTooltipHitWindow
                    || this._previousTooltipHitIndex
                    !== this._currentTooltipHitIndex) {
                this._tooltipWindow.clear();
            }
            this._previousTooltipHitWindow = this._currentTooltipHitWindow;
            this._previousTooltipHitIndex = this._currentTooltipHitIndex;


            var buffState;
            var battler;
            if (!this._currentTooltipHitWindow.isDummyWindow()) {
                buffState = this._currentTooltipHitWindow.
                        iconsArray()[this._currentTooltipHitIndex];
            } else {
                buffState = this._currentTooltipHitWindow.buffState();
            }

            if (!buffState || !buffState.id) {
                return;
            }

            var battler = this._currentTooltipHitWindow.battler();

            this._tooltipWindow.showAndMove(this._currentTooltipHitWindow,
                    this._currentTooltipHitIndex, buffState, battler);
        }
    };

    Scene_Battle.prototype.DXBSIIconWindowSpritesetChildIndex = function () {
        var spritesetLayer = this._spriteset;

        return spritesetLayer.children.indexOf(spritesetLayer._pictureContainer);
    };

    Scene_Battle.prototype.DXBSITooltipWindowSpritesetChildIndex = function () {
        return this.children.indexOf(this._windowLayer);
    };

    Scene_Battle.prototype.addBattlerStateWindows = function () {
        this._stateIconWindows = [];
        this._currentTooltipHitIndex = -1;
        this._previousTooltipHitIndex = -1;
        this._currentTooltipHitWindow = undefined;
        this._previousTooltipHitWindow = undefined;

        var spriteset = this._spriteset;
        this._stateIconLayer = new Sprite();
        spriteset.addChildAt(this._stateIconLayer,
                this.DXBSIIconWindowSpritesetChildIndex());

        var battlers = BattleManager.allBattleMembers();
        for (var i = 0; i < battlers.length; i++) {
            var battler = battlers[i];
            var dataBattler = battler.isActor() ? battler.actor()
                    : battler.enemy();

            if (dataBattler.meta.DXBSIHideIcons) {
                continue;
            }
            if (battler.isActor() && !$gameSystem.isSideView())
                continue;
            if (battler.isActor() && !DreamX.Param.BSIShowActorIcons) {
                continue;
            }
            if (battler.isEnemy() && !DreamX.Param.BSIShowEnemyIcons) {
                continue;
            }

            var normalWindow = new Window_BattleNormalStateIcon(battler);
            var badWindow = new Window_BattleBadStateIcon(battler);

            this._stateIconLayer.addChild(normalWindow);
            this._stateIconLayer.addChild(badWindow);

            this._stateIconWindows.push(normalWindow);
            this._stateIconWindows.push(badWindow);
        }

        if (DreamX.Param.BSIShowTooltips) {
            this._tooltipWindow = new Window_StateToolTip();
            this._hudIconWindows = [];

            this._stateToolTipLayer = new Sprite();
            this.addChild(this._stateToolTipLayer);

            this._stateToolTipLayer.addChild(this._tooltipWindow);
        }
    };

    DreamX.BattlerSpriteIcons.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function () {
    };

    Scene_Battle.prototype.addUpdateDummyWindow = function (buffState, battler, isState, bindingWindow, x, y) {
        var windows = this._stateIconWindows;
        var shouldAdd = true;

        for (var i = 0; i < windows.length; i++) {
            var window = windows[i];
            if (!window.isDummyWindow()) {
                continue;
            }
            if (!window.shouldAdd(bindingWindow, x, y)) {
                window.updateVariables(buffState, battler);
                shouldAdd = false;
                break;
            }
        }

        if (shouldAdd) {
            var newDummyWindow = new Window_DXHoverableDummy(buffState, battler, isState, bindingWindow, x, y);
            this._stateIconLayer.addChild(newDummyWindow);
            this._hudIconWindows.push(newDummyWindow);
        }
    };

    DreamX.BattlerSpriteIcons.BattleManager_refreshStatus = BattleManager.refreshStatus;
    BattleManager.refreshStatus = function () {
        DreamX.BattlerSpriteIcons.BattleManager_refreshStatus.call(this);
        SceneManager._scene._hudIconWindows = [];
    };

    //==========================================================================
    // YEP_BuffsStatesCore
    //==========================================================================
    DreamX.BattlerSpriteIcons.Window_Base_drawStateCounter = Window_Base.prototype.drawStateCounter;
    Window_Base.prototype.drawStateCounter = function (actor, state, wx, wy) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Battle && !(this instanceof Window_BattleStateIcon)) {
            scene.addUpdateDummyWindow(state, actor, true, this, wx, wy);
        }
        DreamX.BattlerSpriteIcons.Window_Base_drawStateCounter.call(this, actor, state, wx, wy);
    };

    DreamX.BattlerSpriteIcons.Window_Base_drawBuffTurns = Window_Base.prototype.drawBuffTurns;
    Window_Base.prototype.drawBuffTurns = function (actor, paramId, wx, wy) {
        var scene = SceneManager._scene;
        if (scene instanceof Scene_Battle && !(this instanceof Window_BattleStateIcon)) {
            scene.addUpdateDummyWindow(paramId, actor, false, this, wx, wy);
        }
        DreamX.BattlerSpriteIcons.Window_Base_drawBuffTurns.call(this, actor, paramId, wx, wy);
    };

    //==========================================================================
    // Window_DXHoverable
    //==========================================================================
    function Window_BSIHoverable() {
        this.initialize.apply(this, arguments);
    }

    Window_BSIHoverable.prototype = Object.create(Window_Selectable.prototype);
    Window_BSIHoverable.prototype.constructor = Window_BSIHoverable;

    Window_BSIHoverable.prototype.initialize = function () {
        Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
        this.opacity = 0;
        this._hitIndex = -1;
        this._battler = undefined;
    };

    Window_BSIHoverable.prototype.hitIndex = function () {
        return this._hitIndex;
    };

    Window_BSIHoverable.prototype.isDummyWindow = function () {
        return false;
    };

    Window_BSIHoverable.prototype.processTouch = function () {
        var x = this.canvasToLocalX(TouchInput._mouseOverX);
        // TouchInput.x
        var y = this.canvasToLocalY(TouchInput._mouseOverY);
        // TouchInput.y
        var hitIndex = this.hitTest(x, y);

        if (hitIndex >= 0 && this.isHitIndexValid(hitIndex)) {
            this._hitIndex = hitIndex;
        } else {
            this._hitIndex = -1;
        }
    };


    Window_BSIHoverable.prototype.itemWidth = function () {
        return DreamX.Param.BSIIconWidth;
    };

    Window_BSIHoverable.prototype.itemHeight = function () {
        return DreamX.Param.BSIIconHeight;
    };

    Window_BSIHoverable.prototype.maxItems = function () {
        return 1;
    };

    Window_BSIHoverable.prototype.battler = function () {
        return this._battler;
    };

    //==========================================================================
    // Window_DXHoverableDummy
    //==========================================================================
    function Window_DXHoverableDummy() {
        this.initialize.apply(this, arguments);
    }

    Window_DXHoverableDummy.prototype = Object.create(Window_BSIHoverable.prototype);
    Window_DXHoverableDummy.prototype.constructor = Window_DXHoverableDummy;


    Window_DXHoverableDummy.prototype.initialize = function (buffState, battler, isState, bindingWindow, x, y) {
        Window_BSIHoverable.prototype.initialize.call(this);
        this._buffState = buffState;
        this._battler = battler;
        this._isState = isState;
        this._xOffset = x;
        this._yOffset = y;
        this._bindingWindow = bindingWindow;
    };

    Window_DXHoverableDummy.prototype.shouldAdd = function (otherWindow, xOffset, yOffset) {
        return this._bindingWindow !== otherWindow
                || this._xOffset !== xOffset
                || this._yOffset !== yOffset;
    };

    Window_DXHoverableDummy.prototype.isHitIndexValid = function (hitIndex) {
        return hitIndex === 0;
    };

    Window_DXHoverableDummy.prototype.updatePosition = function () {
        this.x = this._xOffset + this._bindingWindow.x;
        this.y = this._yOffset + this._bindingWindow.y;
    };

    Window_DXHoverableDummy.prototype.update = function () {
        Window_BSIHoverable.prototype.update.call(this);
        this.updatePosition();
    };

    Window_DXHoverableDummy.prototype.windowHeight = function () {
        return DreamX.Param.BSIIconHeight + (this.standardPadding() * 2);
    };

    Window_DXHoverableDummy.prototype.windowWidth = function () {
        return DreamX.Param.BSIIconWidth + (this.standardPadding() * 2);
    };

    Window_DXHoverableDummy.prototype.isDummyWindow = function () {
        return true;
    };

    Window_DXHoverableDummy.prototype.buffState = function () {
        //        return {icon: icon, id: paramId, debuff: debuff};
        var buffState;
        var buffValue;
        var icon;
        var debuff;

        if (this._isState) {
            buffState = this._buffState.id;
        } else {
            buffState = this._buffState;
            buffValue = this._battler._buffs[this._buffState];
            icon = this._battler.buffIconIndex(buffValue, buffState);
            debuff = buffValue < 0;
        }

        return {icon: icon, id: buffState, debuff: debuff, state: this._isState};
    };

    Window_DXHoverableDummy.prototype.updateVariables = function (buffState, battler) {
        this._buffState = buffState;
        this._battler = battler;
    };

    //=============================================================================
    // Window_BattleStateIcon
    //=============================================================================

    function Window_BattleStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleStateIcon.prototype = Object.create(Window_BSIHoverable.prototype);
    Window_BattleStateIcon.prototype.constructor = Window_BattleStateIcon;


    Window_BattleStateIcon.prototype.initialize = function (battler) {
        Window_BSIHoverable.prototype.initialize.call(this);
        this._battler = battler;
    };

    Window_BattleStateIcon.prototype.isHitIndexValid = function (hitIndex) {
        return hitIndex < this.iconsArray().length
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

        this.contents.clear();

        if (!battler.isAppeared())
            return;

        if ($gameTroop.isAllDead()) {
            return;
        }

        if (battler.isDead() && DreamX.Param.BSIShowIconsOnDeath === false) {
            return;
        }
        this.drawAllItems();
        this.updateWindowPosition();
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

        this.drawIcon(icon, x, y);

        if (stateBuff.state) {
            if (Yanfly.Param.BSCShowTurns
                    && (DreamX.Param.BSIShowActorTurns
                            && this._battler.isActor())
                    || (Yanfly.Param.BSCEnemyTurn
                            && this._battler.isEnemy())) {
                this.drawStateTurns(this._battler, $dataStates[stateBuff.id], x, y);
            }

            if ((DreamX.Param.BSIShowActorCounters
                    && this._battler.isActor())
                    || (Yanfly.Param.BSCEnemyCounter
                            && this._battler.isEnemy())) {
                this.drawStateCounter(this._battler, $dataStates[stateBuff.id], x, y);
            }

        } else {
            if ((DreamX.Param.BSIShowActorBuffTurns
                    && this._battler.isActor())
                    || (Yanfly.Param.BSCEnemyBTurn
                            && this._battler.isEnemy())) {
                this.drawBuffTurns(this._battler, stateBuff.id, x, y);
            }

            if (Yanfly.Param.BSCShowBuffRate) {
                this.drawBuffRate(this._battler, stateBuff.id, x, y);
            }
        }
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

    Window_StateToolTip.prototype.initialize = function () {
        Window_Base.prototype.initialize.call(this, 0, 0, Graphics.boxWidth, Graphics.boxHeight);
        //this.hide();
        this._lineTextWidth = 0;
        this._lineTextHeight = 0;
    };

    Window_StateToolTip.prototype.clear = function () {
        this.contents.clear();
    };

    Window_StateToolTip.prototype.showAndMove = function (iconWindow, index,
            buffState, battler) {
        var iconWindow = iconWindow;
        var scene = SceneManager._scene;
        var userMaxY;

        this._lineTextWidth = 0;
        this._lineTextHeight = 0;

        this.setBuffState(buffState);
        this._battler = battler;

        var rect = iconWindow.itemRect(index);

        var x = iconWindow.x + rect.x + this.standardPadding();

        this.drawDescription();

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
        if (scene instanceof Scene_Battle) {
            userMaxY = eval(DreamX.Param.BSITooltipMaxYBattle);
        }

        if (userMaxY && y > userMaxY) {
            y = userMaxY;
        }

        this.x = x;
        this.y = y;

        this.show();
    };

    Window_StateToolTip.prototype.setBuffState = function (buffState) {
        this._buffState = buffState;

        if (buffState.state) {
            this._isBuff = false;
            this._buffState = $dataStates[buffState.id];
        } else {
            this._isBuff = true;
        }
    };

    Window_StateToolTip.prototype.drawDefaultDescription = function () {
        var buffState = this._buffState;
        var lineHeightAdd = 8;

        var nameFontSize = 20;
        var nameHeightSize = nameFontSize + lineHeightAdd;
        var name = "";
        var nameLine = "\\fs[" + nameFontSize + "]\\C[6]";
        var buffValue = "";
        var symbol = "";

        if (this._isBuff) {
            name = TextManager.param(buffState.id);
            buffValue = this._battler.buff(buffState.id);
            symbol = buffValue > 0 ? "+" : "-";
            name = symbol + name;
        } else {
            name = buffState.name;
        }
        nameLine += name;

        var description = "";
        var descriptionLine = "";
        var descriptionFontSize = 16;
        var descriptionHeightSize = descriptionFontSize + lineHeightAdd;

        if (!this._isBuff && buffState.meta.DXBSI_Description) {
            description = buffState.meta.DXBSI_Description.trim();
        } else if (this._isBuff && Yanfly.Param.BSCShowBuffRate) {
            description = this._battler.paramBuffRate(buffState.id) * 100 + "% "
                    + TextManager.param(buffState.id);
        }

        descriptionLine = "\\fs[" + descriptionFontSize + "]" + description;

        var turnFontSize = 16;
        var turnHeightSize = turnFontSize + lineHeightAdd;
        var numTurns = this.turns();
        var turns = "\\fs[" + turnFontSize + "]\\C[6]" + numTurns + " ";

        this.drawLine(nameLine, nameHeightSize);
        if (description) {
            this.drawLine(descriptionLine, descriptionHeightSize);
        }
        if (numTurns) {
            if (numTurns === 1) {
                turns += DreamX.Param.BSITurnsRemainingTextSingular;
            } else {
                turns += DreamX.Param.BSITurnsRemainingTextPlural;
            }
            this.drawLine(turns, turnHeightSize);
        }
    };

    Window_StateToolTip.prototype.drawLine = function (text, height) {
        if (!text) {
            return;
        }

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
        this.height = this._lineTextHeight + this.standardPadding() * 2 + 4;
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
        if (DreamX.Param.BSIDefaultBuffDesc) {
            return $dataStates[DreamX.Param.BSIDefaultBuffDesc].DXBSITooltipCode;
        }

        return false;
    };

    Window_StateToolTip.prototype.stateDescriptionCode = function () {
        var buffState = this._buffState;
        if (buffState.DXBSITooltipCode) {
            return buffState.DXBSITooltipCode;
        }
        return false;
    };

    Window_StateToolTip.prototype.drawDescription = function () {
        var descriptionCode = this.descriptionCode();

        if (descriptionCode) {
            eval(descriptionCode);
        } else {
            this.drawDefaultDescription();
        }

        this.updateSize();
    };

    Window_StateToolTip.prototype.descriptionCode = function () {
        var description = this._isBuff ? this.buffDescriptionCode()
                : this.stateDescriptionCode();
        return description;
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
        var debuff = buffValue < 0;
        return {icon: icon, id: paramId, debuff: debuff};
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
        var obj = {icon: state.iconIndex, id: state.id,
            state: true};
        var counters = this.getStateCounter(state.id);
        obj.counters = counters;

        return obj;
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
