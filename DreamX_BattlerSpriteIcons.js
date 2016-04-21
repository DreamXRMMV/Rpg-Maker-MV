/*:
 * @plugindesc 1.0
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
 * @param Window Y
 * @desc The y coordinate for the transparent window carrying the icons. Default: this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight * 2) - (this.standardPadding() / 2)
 * @default this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight * 2) - (this.standardPadding() / 2)
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
DreamX.Param.BSIWindowY = String(DreamX.Parameters['Window Y'] || this._battler.spritePosY() - this._battler.spriteHeight() - this.standardPadding() - (DreamX.Param.BSIIconHeight * 2) - (this.standardPadding() / 2));
DreamX.Param.BSIIconWidth = eval(String(DreamX.Parameters['Icon Width']) || Window_Base._iconWidth);
DreamX.Param.BSIIconHeight = eval(String(DreamX.Parameters['Icon Height']) || Window_Base._iconHeight);
DreamX.Param.BSIShowStates = eval(String(DreamX.Parameters['Show States']) || true);
DreamX.Param.BSIShowBuffsDebuffs = eval(String(DreamX.Parameters['Show Buffs/Debuffs']) || true);
DreamX.Param.BSIDebuffsBad = eval(String(DreamX.Parameters['Debuffs Considered Bad']) || true);

DreamX.Param.BSIShowActorIcons = eval(String(DreamX.Parameters['Show Icons For Actor']) || true);
DreamX.Param.BSIShowEnemyIcons = eval(String(DreamX.Parameters['Show Icons For Enemy']) || true);
DreamX.Param.BSIShowIconsOnDeath = eval(String(DreamX.Parameters['Show Icons On Death']) || true);

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
    var MaxTotalRows = 2;

    DreamX.BattlerSpriteIcons.Sprite_StateIcon_update = Sprite_StateIcon.prototype.update;
    Sprite_StateIcon.prototype.update = function () {
    };

    DreamX.BattlerSpriteIcons.Sprite_Battler_preSpriteInitialize = Sprite_Battler.prototype.preSpriteInitialize;
    Sprite_Battler.prototype.preSpriteInitialize = function (battler) {
        DreamX.BattlerSpriteIcons.Sprite_Battler_preSpriteInitialize.call(this, battler);
        this.createStateIconWindow();
    };

    Sprite_Battler.prototype.createStateIconWindow = function () {
        this._stateIconWindow = new Window_BattleStateIcon();
    };

    DreamX.BattlerSpriteIcons.Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function () {
        DreamX.BattlerSpriteIcons.Sprite_Battler_update.call(this);
        this.addStateIconWindow();
    };

    Sprite_Battler.prototype.addStateIconWindow = function () {
        if (this._addedStateIconWindow)
            return;
        if (!SceneManager._scene)
            return;
        var scene = SceneManager._scene;
        if (!scene._windowLayer)
            return;
        this._addedStateIconWindow = true;
        scene.addChild(this._stateIconWindow);
    };

    DreamX.BattlerSpriteIcons.Sprite_Battler_setBattler = Sprite_Battler.prototype.setBattler;
    Sprite_Battler.prototype.setBattler = function (battler) {
        DreamX.BattlerSpriteIcons.Sprite_Battler_setBattler.call(this, battler);
        if (!battler)
            return;
        if (battler.isActor() && !DreamX.Param.BSIShowActorIcons) {
            return;
        }
        if (battler.isEnemy() && !DreamX.Param.BSIShowEnemyIcons) {
            return;
        }
        this._stateIconWindow.setBattler(battler);
    };

    //=============================================================================
    // Window_BattleStateIcon
    //=============================================================================

    function Window_BattleStateIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_BattleStateIcon.prototype = Object.create(Window_Base.prototype);
    Window_BattleStateIcon.prototype.constructor = Window_BattleStateIcon;

    Window_BattleStateIcon.prototype.initialize = function () {
        var width = DreamX.Param.BSIMaxStatesBuffsPerLine
                * (DreamX.Param.BSIIconWidth + DreamX.Param.BSISpaceX)
                + (this.standardPadding() * 2);
        var height = DreamX.Param.BSIIconHeight * MaxTotalRows + (this.standardPadding() * 2);
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this._battler = null;
        this._requestRefresh = false;
        this.opacity = 0;
    };

    Window_BattleStateIcon.prototype.setBattler = function (battler) {
        this._battler = battler;
    };

    Window_BattleStateIcon.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        if (!this._battler) {
            this.opacity = 0;
            return;
        }
        this.updateWindowAspects();
    };

    Window_BattleStateIcon.prototype.updateWindowAspects = function () {
        this.refresh();

        if (!this._battler || (this._battler.isDead() && DreamX.Param.BSIShowIconsOnDeath === false)) {
            return;
        }
        this.updateWindowPosition();
        this.updateStates();
    };

    Window_BattleStateIcon.prototype.refresh = function () {
        this.contents.clear();
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

    Window_BattleStateIcon.prototype.updateWindowPosition = function () {
        var x = this._battler.spritePosX() - this.standardPadding() - (DreamX.Param.BSIIconWidth / 2);
        x -= (this.highestLineIconCount() - 1) * DreamX.Param.BSIIconWidth / 2;

        if (x < 0) {
            x = 0;
        }

        this.x = x;

        var y = eval(DreamX.Param.BSIWindowY);
        if (y < 0) {
            y = 0;
        }
        this.y = y;
    };



    Window_BattleStateIcon.prototype.updateStates = function () {
        var battler = this._battler;
        var dataBattler = battler.isActor() ? battler.actor() : battler.enemy();

        if (dataBattler.meta.DXBSIHideIcons) {
            return;
        }

        this.drawStates(0, battler.DreamX_BSI_AllNormal(), dataBattler);
        this.drawStates(DreamX.Param.BSIIconHeight, battler.DreamX_BSI_AllBad(), dataBattler);
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
        }
        else {
            if (stateBuff.debuff) {
                return DreamX.Param.BSIDebuffColor;
            }
            return DreamX.Param.BSIBuffColor;
        }
        return DreamX.Param.BSITurnColor;
    };


    Window_BattleStateIcon.prototype.drawStates = function (y, array, dataBattler) {
        for (var i = 0; i < array.length; i++) {
            var x = i * (DreamX.Param.BSIIconWidth + DreamX.Param.BSISpaceX);
            var stateBuff = array[i];

            var icon = stateBuff.icon;
            var turns = stateBuff.turns;

            this.drawIcon(icon, i * (DreamX.Param.BSIIconWidth + DreamX.Param.BSISpaceX), y);

            if (turns <= 0 || dataBattler.meta.DXBSIHideTurns) {
                continue;
            }

            var textX = x + this.turnXOffset(stateBuff);
            var textY = y + this.turnYOffset(stateBuff);
            var fontSize = this.turnFontSize(stateBuff);
            var alignment = this.turnAlignment(stateBuff);
            var color = this.turnColor(stateBuff);

            this.changePaintOpacity(true);
            this.changeTextColor(this.textColor(color));
            this.contents.fontSize = fontSize;
            this.drawText(turns, textX, textY, Window_Base._iconWidth, alignment);
            this.resetFontSettings();
            this.resetTextColor();
        }
    };

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
        var stateTurns = JSON.parse(JSON.stringify(this._stateTurns[state.id]));
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
