/*:
 * @plugindesc v1.0
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
 * @param --Faces--
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
 * @desc Eval. Default: gaugeRect.width / 2
 * @default gaugeRect.width / 2
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
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Yanfly for YEP Battle Status Window
 */

var Imported = Imported || {};
Imported.DreamX_Ext_BattleStatusCore = true;

var DreamX = DreamX || {};
DreamX.Ext_BattleStatusCore = DreamX.Ext_BattleStatusCore || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Ext_BattleStatusCore');
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

    //var paramDirectGaugeY = eval(String(parameters['Direct Gauge Y Placement']));

    var paramFrameOpacity = parseInt(String(parameters['Battle Status Frame Opacity']));
    var paramWindowOpacity = parseInt(String(parameters['Battle Status Window Opacity']));

    DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize = Window_BattleStatus.prototype.initialize;
    Window_BattleStatus.prototype.initialize = function () {
        DreamX.Ext_BattleStatusCore.Window_BattleStatus_initialize.call(this);
        this._windowFrameSprite.alpha = paramFrameOpacity;
        this.opacity = paramWindowOpacity;
    };

    Window_BattleStatus.prototype.drawStatusFace = function (index) {
        var actor = $gameParty.battleMembers()[index];
        var rect = this.itemRect(index);
        var ww = eval(paramDrawFaceWidth);
        var wh = eval(paramDrawFaceHeight);
        var wx = eval(paramDrawFaceX);
        var wy = eval(paramDrawFaceY);
        this.drawActorFace(actor, wx, wy, ww, wh);
    };

    Window_BattleStatus.prototype.drawItem = function (index) {
        var actor = $gameParty.battleMembers()[index];
        this.drawBasicArea(this.basicAreaRect(index), actor, index);
        this.drawGaugeArea(this.gaugeAreaRect(index), actor, index);
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
            this.drawActorIcons(actor, iconsX, iconsY, iconsWidth);
        }

        if (Imported.YEP_X_BattleSysATB && Yanfly.Param.ATBGaugeStyle
                && !actor.actor().meta.HideBattleStatusAtb) {
            if (BattleManager.isATB()) {
                this.drawActorAtbGauge(actor, eval(paramAtbGaugeX),
                        eval(paramAtbGaugeY), eval(paramAtbGaugeWidth));
            }
        }
    };

})();
