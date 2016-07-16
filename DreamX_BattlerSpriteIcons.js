/*:
 * @plugindesc 1.6g
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
 * @param Tooltip Red Tone
 * @desc Red tone for tooltip window default: 0
 * @default 0
 * 
 * @param Tooltip Green Tone
 * @desc Green tone for tooltip window default: 0
 * @default 0
 * 
 * @param Tooltip Blue Tone
 * @desc Blue tone for tooltip window default: 0
 * @default 0
 * 
 * @param Default State/Buff Name Color
 * @desc Color for state/buff name in default tooltip. Default: 6
 * @default 6
 * 
 * @param Default State/Buff Name Font Size
 * @desc Font size for state/buff name in default tooltip. Default: 20
 * @default 20
 * 
 * @param Default State/Buff Desc Color
 * @desc Color for state/buff description in default tooltip. Default: 0
 * @default 0
 * 
 * @param Default State/Buff Name Desc Font Size
 * @desc Font size for state/buff description in default tooltip. Default: 16
 * @default 16
 * 
 * @param Default State/Buff Turn Color
 * @desc Color for state/buff turns in default tooltip. Default: 6
 * @default 6
 * 
 * @param Default State/Buff Name Turn Font Size
 * @desc Font size for state/buff turns in default tooltip. Default: 16
 * @default 16
 * 
 * @param Tooltip Frame Opacity
 * @desc default: 255
 * @default 255
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
 * ===========================================================================
 * Important
 * ===========================================================================
 * Showing turns, counters and buff rates requires YEP Buff States Core. How
 * they are displayed depends on the parameters you choose for that plugin. 
 * Make sure you check those parameters!
 * 
 * ===========================================================================
 * Notetags
 * ===========================================================================
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
 *      var turns = "\\fs[16]\\C[6]" + Math.ceil(this.turns()) + " turns remaining.";
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
DreamX.Param.BSITooltipFrameOpacity = parseInt(String(DreamX.Parameters['Tooltip Frame Opacity']));

DreamX.Param.BSITooltipNameColor = parseInt(String(DreamX.Parameters['Default State/Buff Name Color']));
DreamX.Param.BSITooltipDescColor = parseInt(String(DreamX.Parameters['Default State/Buff Desc Color']));
DreamX.Param.BSITooltipTurnColor = parseInt(String(DreamX.Parameters['Default State/Buff Turn Color']));

DreamX.Param.BSITooltipNameFS = parseInt(String(DreamX.Parameters['Default State/Buff Name Font Size']));
DreamX.Param.BSITooltipDescFS = parseInt(String(DreamX.Parameters['Default State/Buff Name Desc Font Size']));
DreamX.Param.BSITooltipTurnFS = parseInt(String(DreamX.Parameters['Default State/Buff Name Turn Font Size']));

DreamX.Param.BSIShowActorTurns = eval(String(DreamX.Parameters['Show Actor State Turns']));
DreamX.Param.BSIShowActorCounters = eval(String(DreamX.Parameters['Show Actor Counters']));
DreamX.Param.BSIShowActorBuffTurns = eval(String(DreamX.Parameters['Show Actor Buff Turns']));

DreamX.Param.BSITurnsRemainingTextSingular = String(DreamX.Parameters['Default Turns Remaining Text (Singular)']);
DreamX.Param.BSITurnsRemainingTextPlural = String(DreamX.Parameters['Default Turns Remaining Text (Plural)']);

DreamX.Param.BSITooltipGreen = parseInt(String(DreamX.Parameters['Tooltip Green Tone']));
DreamX.Param.BSITooltipRed = parseInt(String(DreamX.Parameters['Tooltip Red Tone']));
DreamX.Param.BSITooltipBlue = parseInt(String(DreamX.Parameters['Tooltip Blue Tone']));

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
            state.DXBSIIconRequirement = '';
            var notedata = state.note.split(/[\r\n]+/);

            for (var j = 0; j < notedata.length; j++) {
                var line = notedata[j];
                if (line.match(/<(?:DXBSI TOOLTIP CODE)>/i)) {
                    evalMode = 'tooltipCode';
                } else if (line.match(/<\/(?:DXBSI TOOLTIP CODE)>/i)) {
                    evalMode = 'none';
                } else if (line.match(/<(?:DXBSI SHOW REQUIREMENT)>/i)) {
                    evalMode = 'requirement';
                } else if (line.match(/<\/(?:DXBSI SHOW REQUIREMENT)>/i)) {
                    evalMode = 'none';
                } else if (evalMode === 'requirement') {
                    state.DXBSIIconRequirement += line + '\n';
                } else if (evalMode === 'tooltipCode') {
                    state.DXBSITooltipCode += line + '\n';
                } else {
                    evalMode = 'none';
                }
            }
            evalMode = 'none';
        }
    };

    DreamX.BattlerSpriteIcons.Scene_MenuBase_create = Scene_MenuBase.prototype.create;
    Scene_MenuBase.prototype.create = function () {
        DreamX.BattlerSpriteIcons.Scene_MenuBase_create.call(this);
        this.addToolTipWindow();
    };

    DreamX.BattlerSpriteIcons.Scene_Battle_createDisplayObjects = Scene_Battle.prototype.createDisplayObjects;
    Scene_Battle.prototype.createDisplayObjects = function () {
        DreamX.BattlerSpriteIcons.Scene_Battle_createDisplayObjects.call(this);
        this.addToolTipWindow();
    };

    Scene_Base.prototype.checkWindowVisibility = function (touchX, touchY, window) {
        var windowIndex = window.parent.children.indexOf(window);
        var valid = true;

        for (var j = windowIndex + 1; j < window.parent.children.length; j++) {
            var nextWindow = window.parent.children[j];
            if (!nextWindow.visible || nextWindow.opacity < 255
                    || nextWindow._openness <= 0) {
                continue;
            }
            if (touchX >= nextWindow.x && touchX <= (nextWindow.x + nextWindow.width)
                    && touchY >= nextWindow.y
                    && touchY <= nextWindow.y + nextWindow.height) {
                valid = false;
                break;
            }
        }
        return valid;
    };

    Scene_Base.prototype.checkIconTouch = function (touchX, touchY, iconX, iconY) {
        var valid = false;

        if (touchX >= iconX && touchX <= iconX + DreamX.Param.BSIIconWidth
                && touchY >= iconY
                && touchY <= iconY + DreamX.Param.BSIIconHeight) {
            valid = true;
        }
        return valid;
    };


    DreamX.BattlerSpriteIcons.Scene_Base_update = Scene_Base.prototype.update;
    Scene_Base.prototype.update = function () {
        DreamX.BattlerSpriteIcons.Scene_Base_update.call(this);
        if (!this._tooltipWindow || !this._tooltipHitObjs) {
            return;
        }

        var objs = this._tooltipHitObjs;
        var touchX = !Imported.TDDP_MouseSystemEx ? TouchInput._mouseOverX : TouchInput._x;
        var touchY = !Imported.TDDP_MouseSystemEx ? TouchInput._mouseOverY : TouchInput._y;

        var hover = false;

        for (var i = 0; i < objs.length; i++) {
            var obj = objs[i];
            var objWindow = obj.window;
            if (!objWindow.visible) {
                continue;
            }

            var iconX = objWindow.x + obj.xOffset
                    + Math.floor(DreamX.Param.BSIIconWidth / 2) + 2;
            var iconY = objWindow.y + obj.yOffset
                    + 4 + Math.floor(DreamX.Param.BSIIconHeight / 2);

            if (!this.checkIconTouch(touchX, touchY, iconX, iconY)) {
                continue;
            }

            if (!this.checkWindowVisibility(touchX, touchY, objWindow)) {
                continue;
            }

            if (this._lastTooltipObjHoveredOver !== obj) {
                this._tooltipWindow.refresh(iconX, iconY, obj, obj.battler);
            }
            this._tooltipWindow.show();
            this._lastTooltipObjHoveredOver = obj;
            hover = true;
        }

        if (!hover) {
            this._tooltipWindow.hide();
        }
    };

    Scene_Battle.prototype.DXBSIIconWindowSpritesetChildIndex = function () {
        var spritesetLayer = this._spriteset;

        return spritesetLayer.children.indexOf(spritesetLayer._pictureContainer);
    };

    Scene_Battle.prototype.addBattlerStateWindows = function () {
        this._stateIconWindows = [];
        this._stateIconLayer = new Sprite();
        this._spriteset.addChildAt(this._stateIconLayer,
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
    };

    Scene_Base.prototype.addToolTipWindow = function () {
        if (DreamX.Param.BSIShowTooltips) {
            this._tooltipHitObjs = [];
            this._lastTooltipObjHoveredOver = undefined;
            this._tooltipWindow = new Window_StateToolTip();

            this._stateToolTipLayer = new Sprite();
            this.addChild(this._stateToolTipLayer);

            this._stateToolTipLayer.addChild(this._tooltipWindow);
        }
    };

    DreamX.BattlerSpriteIcons.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function () {
    };

    DreamX.BattlerSpriteIcons.Window_BattleStatus_refresh = Window_BattleStatus.prototype.refresh;
    Window_BattleStatus.prototype.refresh = function () {
        var scene = SceneManager._scene;
        scene._tooltipHitObjs = [];
        DreamX.BattlerSpriteIcons.Window_BattleStatus_refresh.call(this);
        if (!(scene instanceof Scene_Battle)) {
            return;
        }
        if (!scene._stateIconWindows) {
            scene.addBattlerStateWindows();
        }
        var stateIconWindows = scene._stateIconWindows;
        for (var i = 0; i < stateIconWindows.length; i++) {
            var window = stateIconWindows[i];
            window.refresh();
        }
    };

    Scene_Base.prototype.addTooltipHitObj = function (battler, buffState,
            isState, window, xOffset, yOffset, replace) {
        var id = buffState.id ? buffState.id : buffState;
        var obj = {battler: battler, id: id, state: isState, window: window,
            xOffset: xOffset, yOffset: yOffset};
        if (replace) {
            var tObjs = this._tooltipHitObjs;
            tObjs.forEach(function (tObj) {
                if (tObj.battler === battler, tObj.xOffset === xOffset
                        && tObj.yOffset === yOffset) {
                    var index = tObjs.indexOf(tObj);
                    tObjs.splice(index, 1);
                }
            });
        }
        this._tooltipHitObjs.push(obj);
    };

    //==========================================================================
    // YEP_BuffsStatesCore
    //==========================================================================
    DreamX.BattlerSpriteIcons.Window_Base_drawStateCounter = Window_Base.prototype.drawStateCounter;
    Window_Base.prototype.drawStateCounter = function (actor, state, wx, wy) {
        var scene = SceneManager._scene;
        if (DreamX.Param.BSIShowTooltips) {
            scene.addTooltipHitObj(actor, state, true, this, wx, wy);
        }
        DreamX.BattlerSpriteIcons.Window_Base_drawStateCounter.call(this, actor, state, wx, wy);
    };

    DreamX.BattlerSpriteIcons.Window_Base_drawBuffTurns = Window_Base.prototype.drawBuffTurns;
    Window_Base.prototype.drawBuffTurns = function (actor, paramId, wx, wy) {
        var scene = SceneManager._scene;
        if (DreamX.Param.BSIShowTooltips) {
            scene.addTooltipHitObj(actor, paramId, false, this, wx, wy);
        }
        DreamX.BattlerSpriteIcons.Window_Base_drawBuffTurns.call(this, actor, paramId, wx, wy);
    };

    //==========================================================================
    // 
    //==========================================================================
    if (Imported.MOG_BattleHud) {
        Battle_Hud.prototype.refresh_states = function () {
            this._states_data[0] = 0;
            this._states_data[2] = 0;
            this._state_icon.visible = false;
            if (this._battler.states().length == 0) {
                this._states_data[1] = 0;
                return
            }
            ;
            if (this._battler.states()[this._states_data[1]]) {
                var state_id = this._battler.states()[this._states_data[1]].id;
                if ($dataStates[state_id].iconIndex == 0) {
                    for (var i = 0; i < this._battler.states().length; i++) {
                        this._states_data[1] += 1;
                        if (this._states_data[1] >= this._battler.states().length) {
                            this._states_data[1] = 0
                        }
                        ;
                        var state_id = this._battler.states()[this._states_data[1]].id;
                        if ($dataStates[state_id].iconIndex > 0) {
                            break
                        }
                        ;
                    }
                    ;
                }
                ;
                this._states_data[0] = $dataStates[state_id].iconIndex;

                var tX = this._pos_x + Moghunter.bhud_states_pos_x - Math.floor(DreamX.Param.BSIIconWidth / 2);
                var ty = this._pos_y + Moghunter.bhud_states_pos_y - Math.floor(DreamX.Param.BSIIconHeight / 2);
                SceneManager._scene.addTooltipHitObj(this._battler, state_id, true,
                        this, tX,
                        ty, true);

                this._state_icon.visible = true;
                var sx = this._states_data[0] % 16 * 32;
                var sy = Math.floor(this._states_data[0] / 16) * 32;
                this._state_icon.setFrame(sx, sy, 32, 32);
                this._battler.need_refresh_bhud_states = false;
            }
            ;
            this._states_old = this._battler.states();
            this._states_data[1] += 1;
            if (this._states_data[1] >= this._battler.states().length) {
                this._states_data[1] = 0
            }
            ;
        };
    }

    //=============================================================================
    // Window_BattleStateIcon
    //=============================================================================

    function Window_BattleStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleStateIcon.prototype = Object.create(Window_Selectable.prototype);
    Window_BattleStateIcon.prototype.constructor = Window_BattleStateIcon;


    Window_BattleStateIcon.prototype.initialize = function (battler) {
        Window_Selectable.prototype.initialize.call(this, 0, 0, this.windowWidth(), this.windowHeight());
        this.opacity = 0;
        this._battler = battler;
    };

    Window_BattleStateIcon.prototype.itemWidth = function () {
        return DreamX.Param.BSIIconWidth;
    };

    Window_BattleStateIcon.prototype.itemHeight = function () {
        return DreamX.Param.BSIIconHeight;
    };

    Window_BattleStateIcon.prototype.battler = function () {
        return this._battler;
    };

    Window_BattleStateIcon.prototype.update = function () {
        Window_Selectable.prototype.update.call(this);
        this.updateWindowPosition();
    };

    Window_BattleStateIcon.prototype.refresh = function () {
        var battler = this._battler;
        this._isReady = true;

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

    Window_BattleStateIcon.prototype.drawState = function (x, y, index, array) {
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
                if ($dataStates[stateBuff.id].autoRemovalTiming > 0) {

                    this.drawStateTurns(this._battler, $dataStates[stateBuff.id], x, y);
                }
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
        this.hide();
        this._lineTextWidth = 0;
        this._lineTextHeight = 0;
        this._windowFrameSprite.alpha = DreamX.Param.BSITooltipFrameOpacity;
    };

    Window_StateToolTip.prototype.updateTone = function () {
        this.setTone(DreamX.Param.BSITooltipRed,
                DreamX.Param.BSITooltipGreen,
                DreamX.Param.BSITooltipBlue);
    };

    Window_StateToolTip.prototype.refresh = function (iconX, iconY,
            buffState, battler) {
        this.contents.clear();
        this.drawAndMove(iconX, iconY, buffState, battler);
    };

    Window_StateToolTip.prototype.drawAndMove = function (iconX, iconY,
            buffState, battler) {
        var iconWindow = iconWindow;
        var scene = SceneManager._scene;
        var userMaxY;

        this._lineTextWidth = 0;
        this._lineTextHeight = 0;

        this.setBuffState(buffState);
        this._battler = battler;
        var x = iconX + this.standardPadding();

        this.drawDescription();

        x = (x - this.width / 2) + DreamX.Param.BSIIconWidth / 2;

        var y = iconY;
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
    };

    Window_StateToolTip.prototype.setBuffState = function (buffState) {
        this._buffState = buffState;

        if (buffState.state) {
            this._buffState = $dataStates[buffState.id];
            this._isBuff = false;
        } else {
            this._isBuff = true;
        }
    };

    Window_StateToolTip.prototype.drawDefaultDescription = function () {
        var buffState = this._buffState;
        var lineHeightAdd = 8;

        var nameFontSize = DreamX.Param.BSITooltipNameFS;
        var nameHeightSize = nameFontSize + lineHeightAdd;
        var name = "";
        var nameColor = DreamX.Param.BSITooltipNameColor;
        var nameLine = "\\fs[" + nameFontSize + "]\\C[" + nameColor + "]";
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
        var descriptionFontSize = DreamX.Param.BSITooltipDescFS;
        var descriptionFontColor = DreamX.Param.BSITooltipDescColor;
        var descriptionHeightSize = descriptionFontSize + lineHeightAdd;

        if (!this._isBuff && buffState.meta.DXBSI_Description) {
            description = buffState.meta.DXBSI_Description.trim();
        } else if (this._isBuff && Yanfly.Param.BSCShowBuffRate) {
            description = this._battler.paramBuffRate(buffState.id) * 100 + "% "
                    + TextManager.param(buffState.id);
        }

        descriptionLine = "\\fs[" + descriptionFontSize + "]\\C[" + descriptionFontColor + "]" + description;

        var turnFontSize = DreamX.Param.BSITooltipTurnFS;
        var turnFontColor = DreamX.Param.BSITooltipTurnColor;
        var turnHeightSize = turnFontSize + lineHeightAdd;
        var numTurns = Math.ceil(this.turns());
        var turns = "\\fs[" + turnFontSize + "]\\C[" + turnFontColor + "]" + numTurns + " ";

        this.drawLine(nameLine, nameHeightSize, nameFontSize, nameColor);
        if (description) {
            this.drawLine(descriptionLine, descriptionHeightSize, descriptionFontSize, descriptionFontColor);
        }
        if (numTurns) {
            if (numTurns === 1) {
                turns += DreamX.Param.BSITurnsRemainingTextSingular;
            } else {
                turns += DreamX.Param.BSITurnsRemainingTextPlural;
            }
            this.drawLine(turns, turnHeightSize, turnFontSize, turnFontColor);
        }
    };

    Window_StateToolTip.prototype.drawLine = function (text, height,
            forcedTextSize, forcedTextColor) {
        if (!text) {
            return;
        }

        var lines = text.split(/[\r\n]+/);
        for (var i = 0; i < lines.length; i++) {
            var line = lines[i];
            if (forcedTextSize) {
                line = "\\fs[" + forcedTextSize + "]" + line;
            }
            if (forcedTextColor) {
                line = "\\C[" + forcedTextColor + "]" + line;
            }

            this.drawLine2(line, height);
        }
    };


    Window_StateToolTip.prototype.drawLine2 = function (text, height) {
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

        if ($dataStates[buffState.id].autoRemovalTiming <= 0) {
            return "";
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
            if (!state.meta.DXBSIBadState && state.iconIndex > 0 && state.priority > 0) {
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
            if (state.meta.DXBSIHideIcon) {
                continue;
            }
            if (!state.DXBSIIconRequirement || eval(state.DXBSIIconRequirement)) {
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

})();
