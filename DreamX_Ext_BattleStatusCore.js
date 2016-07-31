/*:
 * @plugindesc v1.3
 * @author DreamX
 * 
 * @param --Battle Status Window--
 *  
 * @param Battle Status Frame Opacity
 * @desc From 0 to 1 Default: 1
 * @default 1
 * 
 * @param Battle Status Window Opacity
 * @desc Includes frame. Default: 255
 * @default 255
 * 
 * @param Battle Status Width
 * @desc Eval. Default: Graphics.boxWidth - 192
 * @default Graphics.boxWidth - 192
 * 
 * @param Battle Status Height
 * @desc Eval. Default: this.fittingHeight(this.numVisibleRows())
 * @default this.fittingHeight(this.numVisibleRows())
 *
 * @param Battle Status Input X
 * @desc Eval. Default: this._partyCommandWindow.width
 * @default this._partyCommandWindow.width
 * 
 * @param Battle Status Action X
 * @desc Eval. Default: this._partyCommandWindow.width / 2
 * @default this._partyCommandWindow.width / 2
 * 
 * @param Battle Status Y
 * @desc Eval. Default: Graphics.boxHeight - this.windowHeight()
 * @default Graphics.boxHeight - this.windowHeight()
 * 
 * @param Battle Status Rows
 * @desc Eval. Default: 1
 * @default 1
 * 
 * @param Battle Status Item Width
 * @desc Eval. Default: this.contents.width / this.maxCols()
 * @default this.contents.width / this.maxCols()
 * 
 * @param Battle Status Item Height
 * @desc Eval. Default: this.lineHeight() * this.numVisibleRows()
 * @default this.lineHeight() * this.numVisibleRows()
 * 
 * @param Battle Status Columns
 * @desc Eval. Default: $gameParty.maxBattleMembers()
 * @default $gameParty.maxBattleMembers()
 * 
 * @param Battle Status Max Visible Rows
 * @desc Eval. Default: Yanfly.Param.BECCommandRows || 4
 * @default Yanfly.Param.BECCommandRows || 4
 * 
 * @param --Actor Command Window--
 * 
 * @param Actor Command X
 * @desc Eval. Default: 0
 * @default 0
 * 
 * @param Actor Command Y
 * @desc Eval. Default: Graphics.boxHeight - this.windowHeight()
 * @default Graphics.boxHeight - this.windowHeight()
 * 
 * @param --Faces--
 *  
 * @param Draw Face
 * @desc Eval. Default: true
 * @default true
 * 
 * @param Draw Face Width
 * @desc Eval. Default: Math.min(rect.width - 8, Window_Base._faceWidth)
 * @default Math.min(rect.width - 8, Window_Base._faceWidth)
 * 
 * @param Draw Face Height
 * @desc Eval. Default: Math.min(rect.height - 8, Window_Base._faceHeight)
 * @default Math.min(rect.height - 8, Window_Base._faceHeight)
 * 
 * @param Face X
 * @desc Eval. rect.x + rect.width - ww - 6
 * @default rect.x + rect.width - ww - 6
 * 
 * @param Face Y
 * @desc Eval. rect.y + 4
 * @default rect.y + 4
 * 
 * @param --Gauges--
 * 
 * @param Draw HP Gauge
 * @desc Eval. Default: true
 * @default true
 * 
 * @param HP Gauge X
 * @desc Eval. Default: gaugeRect.x
 * @default gaugeRect.x
 * 
 * @param HP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight() - (Math.max(16, (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6))
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight() - (Math.max(16, (Imported.YEP_CoreEngine) ? Yanfly.Param.GaugeHeight : 6))
 * 
 * @param HP Gauge Width
 * @desc Eval. Default: gaugeRect.width
 * @default gaugeRect.width
 * 
 * @param Draw MP Gauge
 * @desc Eval. Default: true
 * @default true
 * 
 * @param MP Gauge X
 * @desc Eval. Default: gaugeRect.x
 * @default gaugeRect.x
 * 
 * @param MP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight()
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight()
 * 
 * @param MP Gauge Width
 * @desc Eval. Default: this.getGaugesDrawn(actor) ? gaugeRect.width : gaugeRect.width / 2
 * @default this.getGaugesDrawn(actor) ? gaugeRect.width : gaugeRect.width / 2
 * 
 * @param Draw TP Gauge
 * @desc Eval. Default: $dataSystem.optDisplayTp
 * @default $dataSystem.optDisplayTp
 * 
 * @param TP Gauge X
 * @desc Eval. Default: gaugeRect.x + (gaugeRect.width / 2)
 * @default gaugeRect.x + (gaugeRect.width / 2)
 * 
 * @param TP Gauge Y
 * @desc Eval. Default: gaugeRect.y + gaugeRect.height - this.lineHeight()
 * @default gaugeRect.y + gaugeRect.height - this.lineHeight()
 * 
 * @param TP Gauge Width
 * @desc Eval. Default: gaugeRect.width / 2
 * @default gaugeRect.width / 2
 * 
 * @param ATB Gauge X
 * @desc Eval. Default: gaugeRect.x - 2
 * @default gaugeRect.x - 2
 * 
 * @param ATB Gauge Y
 * @desc Eval. Default: gaugeRect.y
 * @default gaugeRect.y
 * 
 * @param ATB Gauge Width
 * @desc Eval. Default: gaugeRect.width + 2
 * @default gaugeRect.width + 2
 * 
 * @param --Action Icons--
 * 
 * @param Draw Action Icon
 * @desc Eval. Default: true
 * @default true
 * 
 * @param Action Icon X
 * @desc Eval. Default: basicAreaRect.x
 * @default basicAreaRect.x
 * 
 * @param Action Icon Y
 * @desc Eval. Default: basicAreaRect.y
 * @default basicAreaRect.y
 * 
 * @param --Names--
 * 
 * @param Draw Name
 * @desc Eval. Default: true
 * @default true
 * 
 * @param Name X
 * @desc Eval. Default: basicAreaRect.x + Window_Base._iconWidth + 4
 * @default basicAreaRect.x + Window_Base._iconWidth + 4
 * 
 * @param Name Y
 * @desc Eval. Default: basicAreaRect.y
 * @default basicAreaRect.y
 * 
 * @param Name Width
 * @desc Eval. Default: basicAreaRect.width
 * @default basicAreaRect.width
 * 
 * @param Name Alignment
 * @desc Eval. Default: left
 * @default left
 * 
 * @param --Icons--
 * 
 * @param Draw Icons
 * @desc Eval. Default: true
 * @default true
 * 
 * @param Icons X
 * @desc Eval. Default: basicAreaRect.x + 2
 * @default basicAreaRect.x + 2
 * 
 * @param Icons Y
 * @desc Eval. Default: basicAreaRect.y + this.lineHeight()
 * @default basicAreaRect.y + this.lineHeight()
 * 
 * @param Icons Width
 * @desc Eval. Default: basicAreaRect.width
 * @default basicAreaRect.width
 * 
 * @param Icons Height
 * @desc Eval. Default: Window_Base._iconHeight
 * @default Window_Base._iconHeight
 *  
 * @param --Misc--
 * 
 * @param Frontview Animations On Top
 * @desc Eval. Animations on actors in frontview appear above battle hud instead of below. Default: false
 * @default false
 * 
 * @param Center Animations and Popups On Face
 * @desc Eval. Whether to center animations and popups on face when using frontview. Default: false
 * @default false
 * 
 * @param --Quick Settings--
 * 
 * @param DreamX Setup Suggestion
 * @desc Overrides several parameters Default: false
 * @default false
 * 
 * @help
 * ============================================================================
 * Actor Notetags
 * ============================================================================
 * <HideBattleStatusHp> will hide the hp gauge from the battle status window 
 * for the actor.
 * 
 * <HideBattleStatusMp> will hide the mp gauge from the battle status window 
 * for the actor.
 * 
 * <HideBattleStatusTp> will hide the tp gauge from the battle status window 
 * for the actor.
 * 
 * <HideBattleStatusAtb> will hide the tp gauge from the battle status window 
 * for the actor.
 * ============================================================================
 * Tips
 * ============================================================================
 * Other Yanfly plugins like Core Engine, Buffs State Core and of course 
 * Battle Status will change how the battle hud looks like. Also look at those 
 * parameters to customize your hud.
 * 
 * The rect variable refers to the entire rectangle. It's best to use this 
 * instead of basicAreaRect, gaugeRect etc if you want to change positioning.
 * ============================================================================
 * DreamX Setup Suggestion Parameter Info
 * ============================================================================
 * This parameter sets up the hud similar to my example screenshot. 
 * It overrides parameters for these things:
 * 
 * Face X, Width, Height
 * Gauge/Name X, Width
 * 
 * Name Y
 * HP Gauge Y
 * MP Gauge Y
 * 
 * Icons X, Y
 * 
 * Name Alignment
 * 
 * Adjust Columns set to true in YEP Battle Status Window
 * 
 * Therefore, you can still use the other parameters to your liking to 
 * customize further.
 * 
 * You can also of course individually use the functions provided by this 
 * plugin.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly for YEP Battle Status Window
 */


// * 


// * @param --Actor Picture--
// *  
// * @param Actor Picture X
// * @desc Eval. Default: rect.x
// * @default rect.x
// * 
// * @param Actor Picture Y
// * @desc Eval. Default: rect.y
// * @default rect.y

// * ============================================================================
// * Actor Picture Parameters
// * ============================================================================
// * These parameters allow you to draw a picture in the battle hud for 
// * each actor. It is drawn underneath just about everything else.
// * 
// * Use <BattleHudPicture: x> with x as the name of the picture as an actor 
// * notetag.

var Imported = Imported || {};
Imported.DreamX_Ext_BattleStatusCore = true;

var DreamX = DreamX || {};
DreamX.Ext_BattleStatusCore = DreamX.Ext_BattleStatusCore || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Ext_BattleStatusCore');

    var paramDrawFace = String(parameters['Draw Face']);
    var paramDrawFaceWidth = String(parameters['Draw Face Width']);
    var paramDrawFaceHeight = String(parameters['Draw Face Height']);
    var paramDrawFaceX = String(parameters['Face X']);
    var paramDrawFaceY = String(parameters['Face Y']);
    var paramHpGauge = String(parameters['Draw HP Gauge']);
    var paramHpGaugeWidth = String(parameters['HP Gauge Width']);
    var paramHpGaugeX = String(parameters['HP Gauge X']);
    var paramHpGaugeY = String(parameters['HP Gauge Y']);

    var paramMpGauge = String(parameters['Draw MP Gauge']);
    var paramMpGaugeX = String(parameters['MP Gauge X']);
    var paramMpGaugeY = String(parameters['MP Gauge Y']);
    var paramMpGaugeWidth = String(parameters['MP Gauge Width']);

    var paramTpGauge = String(parameters['Draw TP Gauge']);
    var paramTpGaugeX = String(parameters['TP Gauge X']);
    var paramTpGaugeY = String(parameters['TP Gauge Y']);
    var paramTpGaugeWidth = String(parameters['TP Gauge Width']);

    var paramDrawActionIcon = String(parameters['Draw Action Icon']);
    var paramActionIconX = String(parameters['Action Icon X']);
    var paramActionIconY = String(parameters['Action Icon Y']);

    var paramAtbGaugeX = String(parameters['ATB Gauge X']);
    var paramAtbGaugeY = String(parameters['ATB Gauge Y']);
    var paramAtbGaugeWidth = String(parameters['ATB Gauge Width']);

    var paramDrawName = String(parameters['Draw Name']);
    var paramNameX = String(parameters['Name X']);
    var paramNameY = String(parameters['Name Y']);
    var paramNameWidth = String(parameters['Name Width']);
    var paramNameAlign = String(parameters['Name Alignment']);


    var paramDrawIcons = String(parameters['Draw Icons']);
    var paramIconsX = String(parameters['Icons X']);
    var paramIconsY = String(parameters['Icons Y']);
    var paramIconsWidth = String(parameters['Icons Width']);
    var paramIconsHeight = String(parameters['Icons Height']);
    

    var paramFrameOpacity = parseInt(String(parameters['Battle Status Frame Opacity']));
    var paramWindowOpacity = parseInt(String(parameters['Battle Status Window Opacity']));

    var paramDXStyle = eval(String(parameters['DreamX Setup Suggestion']));

    var paramActorPictureX = String(parameters['Actor Picture X']);
    var paramActorPictureY = String(parameters['Actor Picture Y']);

    var paramActorCommandX = String(parameters['Actor Command X']);
    var paramActorCommandY = String(parameters['Actor Command Y']);

    var paramStatusWidth = String(parameters['Battle Status Width']);
    var paramStatusHeight = String(parameters['Battle Status Height']);
    var paramStatusInputX = String(parameters['Battle Status Input X']);
    var paramStatusActionX = String(parameters['Battle Status Action X']);
    var paramStatusY = String(parameters['Battle Status Y']);
    var paramStatusRows = String(parameters['Battle Status Rows']);
    var paramStatusCols = String(parameters['Battle Status Columns']);
    var paramStatusVisRows = String(parameters['Battle Status Max Visible Rows']);
    var paramStatusItemWidth = String(parameters['Battle Status Item Width']);
    var paramStatusItemHeight = String(parameters['Battle Status Item Height']);


    //Battle Status Item Width

    var paramTopAnimations = String(parameters['Frontview Animations On Top']);
    var paramCenterFrontViewSprites = String(parameters['Center Animations and Popups On Face']);

    if (paramDXStyle) {
        paramDrawFaceX = "rect.x";
        paramDrawFaceWidth = "144";
        paramDrawFaceHeight = "144";

        paramHpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramMpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramTpGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramAtbGaugeX = "this.DXGaugeNameX(actor, rect)";
        paramNameX = "this.DXGaugeNameX(actor, rect)";

        paramHpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramMpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramTpGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramAtbGaugeWidth = "this.DXGaugeNameWidth(actor, rect)";
        paramNameWidth = "this.DXGaugeNameWidth(actor, rect)";

        paramHpGaugeY = "rect.y + this.lineHeight()";
        paramMpGaugeY = "rect.y + this.lineHeight() * 2";
        paramNameY = "rect.y";
        paramIconsX = "this.DXIconX(actor, rect)";
        paramIconsY = "rect.y + rect.height - Window_Base._iconHeight - this.textPadding()";
        Yanfly.Param.BSWAdjustCol = "true";

        paramNameAlign = "center";
    }

    DreamX.Ext_BattleStatusCore.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.Ext_BattleStatusCore.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_BattleEngineCore) {
            throw new Error('DreamX_Ext_BattleStatusCore requires YEP_BattleEngineCore');
        }
        if (!Imported.YEP_BattleStatusWindow) {
            throw new Error('DreamX_Ext_BattleStatusCore requires YEP_BattleStatusWindow');
        }
    };

    DreamX.Ext_BattleStatusCore.Window_ActorCommand_initialize = Window_ActorCommand.prototype.initialize;
    Window_ActorCommand.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_ActorCommand_initialize.call(this);
        this.x = eval(paramActorCommandX);
        this.y = eval(paramActorCommandY);
    };

    Window_BattleStatus.prototype.itemWidth = function () {
        return eval(paramStatusItemWidth);
    };

    Window_BattleStatus.prototype.itemHeight = function () {
        return eval(paramStatusItemHeight);
    };

    DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize.call(this);
        this._windowFrameSprite.alpha = paramFrameOpacity;
        this.opacity = paramWindowOpacity;
        this.y = eval(paramStatusY);
    };

    Window_BattleStatus.prototype.windowWidth = function () {
        return eval(paramStatusWidth);
    };

    Window_BattleStatus.prototype.windowHeight = function () {
        return eval(paramStatusHeight);
    };

    Window_BattleStatus.prototype.maxRows = function () {
        return eval(paramStatusRows);
    };

    Window_BattleStatus.prototype.maxCols = function () {
        return eval(paramStatusCols);
    };

    Window_BattleStatus.prototype.numVisibleRows = function () {
        return eval(paramStatusVisRows);
    };

    DreamX.Ext_BattleStatusCore.Spriteset_Battle_updateActors = Spriteset_Battle.prototype.updateActors;
    Spriteset_Battle.prototype.updateActors = function () {
        DreamX.Ext_BattleStatusCore.Spriteset_Battle_updateActors.call(this);
        if ($gameSystem.isSideView() || !eval(paramCenterFrontViewSprites)) {
            return;
        }
        for (var i = 0; i < this._actorSprites.length; i++) {
            this._actorSprites[i].setActorHomeFrontViewCenter();
        }
    };

    Sprite_Actor.prototype.setActorHomeFrontViewCenter = function () {

        var obj = this._faceActorPositionObj;
        if (obj) {
            var window = SceneManager._scene._statusWindow;

            var x = (window.x + window.standardPadding() + obj.xOffset)
                    - this._offsetX;
            var y = (window.y + window.height) - (window.standardPadding()
                    + obj.yOffset);

            if (!Imported['VE - Damge Popup']) {
                x -= this.damageOffsetX();
                y -= this.damageOffsetY();
                y += 32;
            }

            this.setHome(x, y);
            this.moveToStartPosition();
        }
    };
    Window_BattleStatus.prototype.drawStatusFace = function (index) {
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRect(index);
        var ww = eval(paramDrawFaceWidth);
        var wh = eval(paramDrawFaceHeight);
        var wx = eval(paramDrawFaceX);
        var wy = eval(paramDrawFaceY);

        if (!eval(paramDrawFace)) {
            return;
        }
        this.drawActorFace(actor, wx, wy, ww, wh);

        if ($gameSystem.isSideView() || !eval(paramCenterFrontViewSprites) || !actor) {
            return;
        }

        var battler = actor.battler();
        battler._faceActorPositionObj = {xOffset: wx + Math.floor(ww / 2),
            yOffset: wy + Math.floor(wh / 2)};
    };

    Window_BattleStatus.prototype.drawItem = function (index) {
        var actor = $gameParty.battleMembers()[index];
        //this.drawActorPicture(actor, index);
        this.drawBasicArea(this.basicAreaRect(index), actor, index);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor, index);
    };

    Window_BattleStatus.prototype.drawActorPicture = function (actor, index) {
        var pictureName = actor.actor().meta.BattleHudPicture;
        var rect = this.itemRect(index);

        if (!pictureName) {
            return;
        }
        pictureName = pictureName.trim();

        var picture = ImageManager.loadPicture(pictureName);

        this.contents.blt(picture, 0, 0, picture.width, picture.height,
                eval(paramActorPictureX), eval(paramActorPictureY));
    };

    Window_BattleStatus.prototype.drawGaugeArea = function (gaugeRect, actor, index) {
        var rect = this.itemRect(index);
        this.contents.fontSize = Yanfly.Param.BSWParamFontSize;
        this._enableYBuffer = true;

        var hpGaugeX = eval(paramHpGaugeX);
        var hpGaugeY = eval(paramHpGaugeY);
        var hpGaugeWidth = eval(paramHpGaugeWidth);

        var mpGaugeX = eval(paramMpGaugeX);
        var mpGaugeY = eval(paramMpGaugeY);
        var mpGaugeWidth = eval(paramMpGaugeWidth);

        var tpGaugeX = eval(paramTpGaugeX);
        var tpGaugeY = eval(paramTpGaugeY);
        var tpGaugeWidth = eval(paramTpGaugeWidth);

        if (eval(paramHpGauge) && !actor.actor().meta.HideBattleStatusHp) {
            this.drawActorHp(actor, hpGaugeX, hpGaugeY, hpGaugeWidth);
        }

        if (eval(paramMpGauge) && !actor.actor().meta.HideBattleStatusMp) {
            this.drawActorMp(actor, mpGaugeX, mpGaugeY, mpGaugeWidth);
        }

        if (eval(paramTpGauge) && !actor.actor().meta.HideBattleStatusTp) {
            this.drawActorTp(actor, tpGaugeX, tpGaugeY, tpGaugeWidth);
        }

        this._enableYBuffer = false;
    };

    Window_BattleStatus.prototype.drawActorName = function (actor, x, y, width,
            alignment) {
        width = width || 168;
        this.changeTextColor(this.hpColor(actor));
        this.drawText(actor.name(), x, y, width, alignment);
    };

    Window_BattleStatus.prototype.drawBasicArea = function (basicAreaRect, actor, index) {
        var rect = this.itemRect(index);

        var actionIconX = eval(paramActionIconX);
        var actionIconY = eval(paramActionIconY);

        var nameX = eval(paramNameX);
        var nameY = eval(paramNameY);
        var nameWidth = eval(paramNameWidth);

        var iconsX = eval(paramIconsX);
        var iconsY = eval(paramIconsY);
        var iconsWidth = eval(paramIconsWidth);


        if (eval(paramDrawActionIcon)) {
            this.drawActorActionIcon(actor, actionIconX, actionIconY);
        }

        this.resetFontSettings();
        this.contents.fontSize = Yanfly.Param.BSWNameFontSize;

        if (eval(paramDrawName)) {
            this.drawActorName(actor, nameX, nameY, nameWidth, paramNameAlign);
        }

        if (eval(paramDrawIcons)) {
            this.drawActorIcons(actor, iconsX, iconsY, iconsWidth, eval(paramIconsHeight));
        }

        if (Imported.YEP_X_BattleSysATB && Yanfly.Param.ATBGaugeStyle
                && !actor.actor().meta.HideBattleStatusAtb) {
            if (BattleManager.isATB()) {
                this.drawActorAtbGauge(actor, eval(paramAtbGaugeX),
                        eval(paramAtbGaugeY), eval(paramAtbGaugeWidth));
            }
        }
    };


    //==========================================================================
    // Scene_Battle
    //==========================================================================
    Scene_Battle.prototype.updateWindowPositions = function () {
        var statusX = 0;
        if (BattleManager.isInputting()) {
            statusX = eval(paramStatusInputX);
        } else {
            statusX = eval(paramStatusActionX);
        }
        if (this._statusWindow.x < statusX) {
            this._statusWindow.x += 16;
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x = statusX;
            }
        }
        if (this._statusWindow.x > statusX) {
            this._statusWindow.x -= 16;
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x = statusX;
            }
        }
    };

    //==========================================================================
    // DreamX Setup
    //==========================================================================
    Window_BattleStatus.prototype.DXIconX = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        var x2 = rect.x + rect.width;
        if (availableSpace < actor.allIcons().length * Window_Base._iconWidth) {
            return x2 - (actor.allIcons().length * Window_Base._iconWidth) - this.textPadding();
        } else {
            return rect.x + Window_Base._faceWidth;
        }
    };

    Window_BattleStatus.prototype.DXIconW = function (actor, rect) {
        var x2 = rect.x + rect.width;

        if (this.DXRectFreeSpace(rect) + Window_Base._iconWidth
                < actor.allIcons() * Window_Base._iconWidth) {
            return x2 - (x2 - (actor.allIcons() * Window_Base._iconWidth));
        } else {
            return this.DXRectFreeSpace(rect) + Window_Base._iconWidth;
        }
    };

    Window_BattleStatus.prototype.DXThreshold = function () {
        return 64;
    };

    Window_BattleStatus.prototype.DXGaugeNameX = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        if (availableSpace > this.DXThreshold()) {
            return rect.x + rect.width - (this.DXRectFreeSpace(rect));
        } else {
            return rect.x + rect.width - (this.DXRectFreeSpace(rect)
                    + Window_Base._iconWidth);
        }
    };

    Window_BattleStatus.prototype.DXGaugeNameWidth = function (actor, rect) {
        var availableSpace = this.DXRectFreeSpace(rect);

        if (availableSpace > this.DXThreshold()) {
            return this.DXRectFreeSpace(rect) - this.textPadding();
        } else {
            return (this.DXRectFreeSpace(rect) - this.textPadding())
                    + Window_Base._iconWidth;
        }
    };


    Window_BattleStatus.prototype.DXRectFreeSpace = function (rect) {
        return rect.width - Window_Base._faceWidth;
    };

    //==========================================================================
    // Game_System
    //==========================================================================
    Game_System.prototype.DXIsAboveBattleStatus = function () {
        if ($gameSystem.isSideView() || !eval(paramTopAnimations)) {
            return false;
        }
        return true;
    };

    //==========================================================================
    // Spriteset_Battle
    //==========================================================================
    DreamX.Ext_BattleStatusCore.Spriteset_Battle_createActors = Spriteset_Battle.prototype.createActors;
    Spriteset_Battle.prototype.createActors = function () {
        DreamX.Ext_BattleStatusCore.Spriteset_Battle_createActors.call(this);
        if (!$gameSystem.DXIsAboveBattleStatus()) {
            return;
        }

        var sprites = this._actorSprites;

        if (!sprites) {
            return;
        }

        var scene = SceneManager._scene;
        var spriteset = this;
        sprites.forEach(function (sprite) {
            spriteset._battleField.removeChild(sprite);
            scene.addChild(sprite);
        });
    };

    //==========================================================================
    // Sprite_Battler
    //==========================================================================
    if (!Imported['VE - Damge Popup']) {
        DreamX.Ext_BattleStatusCore.Sprite_Battler_setupDamagePopup = Sprite_Battler.prototype.setupDamagePopup;
        Sprite_Battler.prototype.setupDamagePopup = function () {
            DreamX.Ext_BattleStatusCore.Sprite_Battler_setupDamagePopup.call(this);

            if (!$gameSystem.DXIsAboveBattleStatus()) {
                return;
            }

            var parent = this.parent;
            var scene = SceneManager._scene;
            this._damages.forEach(function (sprite) {
                parent.removeChild(sprite);
                scene.addChild(sprite);
            });
        };
    }


    Sprite_Battler.prototype.createVisualHpGaugeWindow = function () {
        var scene = SceneManager._scene;
        var spriteset = scene._spriteset;
        if (!spriteset) {
            return;
        }

        var baseSprite = spriteset._baseSprite;
        var newParent = baseSprite;
        if (!$gameSystem.DXIsAboveBattleStatus()) {
            newParent = scene;
        }

        if (this._createdVisualHpGaugeWindow)
            return;
        if (!this._battler)
            return;
        if (this.checkVisualATBGauge()) {
            if (!this._visualATBWindow)
                return;
            if (!baseSprite.children.contains(this._visualATBWindow))
                return;
        }
        this._createdVisualHpGaugeWindow = true;
        this._visualHpGauge = new Window_VisualHPGauge();
        this._visualHpGauge.setBattler(this._battler);
        newParent.addChild(this._visualHpGauge);
    };

//    Sprite_Animation.prototype.updateCellSprite = function (sprite, cell) {
//        var pattern = cell[0];
//        if (pattern >= 0) {
//            var sx = pattern % 5 * 192;
//            var sy = Math.floor(pattern % 100 / 5) * 192;
//            var mirror = this._mirror;
//            sprite.bitmap = pattern < 100 ? this._bitmap1 : this._bitmap2;
//            sprite.setFrame(sx, sy, 192, 192);
//            sprite.x = cell[1];
//            sprite.y = cell[2];
//            if (this._mirror) {
//                sprite.x *= -1;
//            }
//            sprite.rotation = cell[4] * Math.PI / 180;
//            sprite.scale.x = cell[3] / 100;
//            if ((cell[5] && !mirror) || (!cell[5] && mirror)) {
//                sprite.scale.x *= -1;
//            }
//            sprite.scale.y = cell[3] / 100;
//            sprite.opacity = cell[6];
//            sprite.blendMode = cell[7];
//            sprite.visible = true;
//        } else {
//            sprite.visible = false;
//        }
//    };

    Window_Base.prototype.drawActorIcons = function (actor, x, y, width, height) {
        height = height || Window_Base._iconHeight;

        var icons = actor.allIcons().slice(0,
                Math.floor(width / Window_Base._iconWidth)
                * Math.floor(height / Window_Base._iconHeight));
        var currentX = x;
        var currentY = y + 2;

        for (var i = 0; i < icons.length; i++) {
            this.drawIcon(icons[i], currentX, currentY);
            currentX += Window_Base._iconWidth;
            if (currentX >= width) {
                currentX = x;
                currentY += Window_Base._iconHeight;
            }
        }

        if (Imported.YEP_BuffsStatesCore) {
            this.drawActorIconsTurns(actor, x, y, width, height);
        }
    };

    if (Imported.YEP_BuffsStatesCore) {
        Window_Base.prototype.drawActorIconsTurns = function (actor, wx, wy, ww, wh) {

            var iw = Window_Base._iconWidth;
            var ih = Window_Base._iconHeight;
            var wh = wh || ih;
            
            var shownMax = Math.floor(ww / iw) * Math.floor(wh / ih);

            var currentX = wx;
            var currentY = wy;

            for (var i = 0; i < actor.states().length; ++i) {
                if (shownMax <= 0)
                    break;
                var state = actor.states()[i];
                if (state.iconIndex <= 0)
                    continue;
                if (state.autoRemovalTiming > 0) {
                    this.drawStateTurns(actor, state, currentX, currentY);
                }
                this.drawStateCounter(actor, state, currentX, currentY);

                currentX += iw;
                if (currentX >= ww) {
                    currentX = wx;
                    currentY += ih;
                }
                --shownMax;
            }

            for (var i = 0; i < 8; ++i) {
                if (shownMax <= 0)
                    break;
                if (actor._buffs[i] === 0)
                    continue;
                this.drawBuffTurns(actor, i, currentX, currentY);
                if (Yanfly.Param.BSCShowBuffRate) {
                    this.drawBuffRate(actor, i, currentX, currentY);
                }

                currentX += iw;
                if (currentX >= ww) {
                    currentX = wx;
                    currentY += ih;
                }
                --shownMax;
            }
            this.resetFontSettings();
            this.resetTextColor();
        };
    }

})();
