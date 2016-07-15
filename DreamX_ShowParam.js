/*:
 * @plugindesc v0.2
 *
 * @param --Status Menu Core--
 *
 * @param General Parameters
 * @desc Parameters in General section Default: lvl lo 0 lo 1 lo 2 sh 3 sh 4 sh 5 sh 6 sh 7 sh
 * @default lvl lo 0 lo 1 lo 2 sh 3 sh 4 sh 5 sh 6 sh 7 sh
 * 
 * @param Show General Parameters
 * @desc Whether to show General parameters Default: true
 * @default true
 * 
 * @param Show General EXP
 * @desc Whether to show EXP. Default: true
 * @default true
 * 
 * @param Parameter Graph Parameters
 * @desc Parameters to show when equipping in this order. Default: 2 3 4 5 6 7
 * @default 2 3 4 5 6 7
 *
 * @param --Equip Core--
 *
 * @param Equip Parameters
 * @desc Parameters to show when equipping in this order. Default: 0 1 2 3 4 5 6 7
 * @default 0 1 2 3 4 5 6 7
 *
 * @param SParams & XParams as %
 * @desc Show sparams and xparams as percentages. Default: true
 * @default true
 * 
 * @param --Item Core--
 *
 * @param Equip Parameters (Item Core)
 * @desc Parameters to show when equipping in this order. Default: 0 1 2 3 4 5 6 7
 * @default 0 1 2 3 4 5 6 7
 * 
 * @param --Victory Aftermath--
 * 
 * @param Level Up Parameters (Victory Aftermath)
 * @desc Parameters to show when equipping in this order. Default: lvl 0 1 2 3 4 5 6 7
 * @default lvl 0 1 2 3 4 5 6 7
 * 
 * @param --Text Manager--
 * 
 * @param hit Name
 * @desc The text name used for this attribute.
 * @default Hit Rate
 *
 * @param eva Name
 * @desc The text name used for this attribute.
 * @default Evasion Rate
 *
 * @param cri Name
 * @desc The text name used for this attribute.
 * @default Critical Hit Rate
 *
 * @param cev Name
 * @desc The text name used for this attribute.
 * @default Critical Evasion Rate
 *
 * @param mev Name
 * @desc The text name used for this attribute.
 * @default Magic Evasion Rate
 *
 * @param mrf Name
 * @desc The text name used for this attribute.
 * @default Magic Reflect Rate
 *
 * @param cnt Name
 * @desc The text name used for this attribute.
 * @default Counter Rate
 *
 * @param hrg Name
 * @desc The text name used for this attribute.
 * @default HP Regen Rate
 *
 * @param mrg Name
 * @desc The text name used for this attribute.
 * @default MP Regen Rate
 *
 * @param trg Name
 * @desc The text name used for this attribute.
 * @default TP Regen Rate
 *
 * @param tgr Name
 * @desc The text name used for this attribute.
 * @default Aggro Rate
 *
 * @param grd Name
 * @desc The text name used for this attribute.
 * @default Guard Effect
 *
 * @param rec Name
 * @desc The text name used for this attribute.
 * @default Recovery Effect
 *
 * @param pha Name
 * @desc The text name used for this attribute.
 * @default Pharmacology Effect
 *
 * @param mcr Name
 * @desc The text name used for this attribute.
 * @default MP Cost Rate
 *
 * @param tcr Name
 * @desc The text name used for this attribute.
 * @default TP Charge Rate
 *
 * @param pdr Name
 * @desc The text name used for this attribute.
 * @default Physical Damage Rate
 *
 * @param mdr Name
 * @desc The text name used for this attribute.
 * @default Magical Damage Rate
 *
 * @param fdr Name
 * @desc The text name used for this attribute.
 * @default Floor Damage Rate
 *
 * @param exr Name
 * @desc The text name used for this attribute.
 * @default Experience Rate
 *
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * When defining parameters, you can either use the parameter number or
 * parameter abbreviation. If you are using Quasi Params Plus, you can use the
 * abbreviations from that plugin as well.
 * 
 * 0 - mhp
 * 1 - mmp
 * 2 - atk
 * 3 - def
 * 4 - mat
 * 5 - mdf
 * 6 - agi
 * 7 - luk
 * 
 * For Parameter "General Parameters", use lo or hi after each parameter to 
 * designate whether is displayed with a long box or a short one.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Quasi for their parameter plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for their plugins.
 */

var Imported = Imported || {};
Imported.DreamX_ShowParam = true;

var DreamX = DreamX || {};
DreamX.ShowParam = DreamX.ShowParam || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_ShowParam');
    var paramEquipParams = String(parameters['Equip Parameters']).split(" ");

    var paramEquipParamsItemCore = String(parameters['Equip Parameters (Item Core)']).split(" ");

    var paramGraphParams = String(parameters['Parameter Graph Parameters']).split(" ");
    var paramGeneralParams = String(parameters['General Parameters']).split(" ");
    var paramLevelUpParamsVA = String(parameters['Level Up Parameters (Victory Aftermath)']).split(" ");

    var paramShowXSParamsPercent = eval(String(parameters['SParams & XParams as %']));
    var paramShowGenParam = eval(String(parameters['Show General Parameters']));
    var paramShowStatusExp = eval(String(parameters['Show General EXP']));

    var paramHitName = String(parameters['hit Name']);
    var paramEvaName = String(parameters['eva Name']);
    var paramCriName = String(parameters['cri Name']);
    var paramCevName = String(parameters['cev Name']);
    var paramMevName = String(parameters['mev Name']);
    var paramMrfName = String(parameters['mrf Name']);
    var paramCntName = String(parameters['cnt Name']);
    var paramHrgName = String(parameters['hrg Name']);
    var paramMrgName = String(parameters['mrg Name']);
    var paramTrgName = String(parameters['trg Name']);
    var paramTgrName = String(parameters['tgr Name']);
    var paramGrdName = String(parameters['grd Name']);
    var paramRecName = String(parameters['rec Name']);
    var paramPhaName = String(parameters['pha Name']);
    var paramMcrName = String(parameters['mcr Name']);
    var paramTcrName = String(parameters['tcr Name']);
    var paramPdrName = String(parameters['pdr Name']);
    var paramMdrName = String(parameters['mdr Name']);
    var paramFdrName = String(parameters['fdr Name']);
    var paramExrName = String(parameters['exr Name']);

    DreamX.ShowParam.defParamStr = function () {
        return ["mhp", "mmp", "atk", "def", "mat", "mdf", "agi", "luk"];
        ;
    };

    DreamX.ShowParam.defXParamStr = function () {
        return ["hit", "eva", "cri", "cev", "mev", "mrf", "cnt", "hrg", "mrg", "trg"];
    };

    DreamX.ShowParam.defSParamStr = function () {
        return ["tgr", "grd", "rec", "pha", "mcr", "tcr", "pdr", "mdr", "fdr", "exr"];
    };

    DreamX.ShowParam.TextManager_param = TextManager.param;
    TextManager.param = function (paramId) {
        var defParamStr = DreamX.ShowParam.defParamStr();

        if (Imported.Quasi_ParamsPlus) {
            var cParam = QuasiParams._custom.filter(function (param) {
                return param.abr === paramId;
            });
            if (cParam.length === 1) {
                return QuasiParams._customName(QuasiParams._custom.indexOf(cParam[0]));
            }
        }

        if (defParamStr.indexOf(paramId) !== -1) {
            paramId = defParamStr.indexOf(paramId);
        }

        switch (paramId) {
            case "hit":
                return paramHitName;
                break;
            case "eva":
                return paramEvaName;
                break;
            case "cri":
                return paramCriName;
                break;
            case "cev":
                return paramCevName;
                break;
            case "mev":
                return paramMevName;
                break;
            case "mrf":
                return paramMrfName;
                break;
            case "cnt":
                return paramCntName;
                break;
            case "hrg":
                return paramHrgName;
                break;
            case "mrg":
                return paramMrgName;
                break;
            case "trg":
                return paramTrgName;
                break;
            case "tgr":
                return paramTgrName;
                break;
            case "grd":
                return paramGrdName;
                break;
            case "rec":
                return paramRecName;
                break;
            case "pha":
                return paramPhaName;
                break;
            case "mcr":
                return paramMcrName;
                break;
            case "tcr":
                return paramTcrName;
                break;
            case "pdr":
                return paramPdrName;
                break;
            case "mdr":
                return paramMdrName;
                break;
            case "fdr":
                return paramFdrName;
                break;
            case "exr":
                return paramExrName;
                break;
        }

        return DreamX.ShowParam.TextManager_param.call(this, paramId);
    };

    DreamX.ShowParam.paramMultiplyFunction = function () {
        var funcs = [];
        funcs.push(Window_StatCompare.prototype.drawCurrentParam);
        funcs.push(Window_StatCompare.prototype.drawNewParam);
        return funcs;
    };

    DreamX.ShowParam.Game_BattlerBase_param = Game_BattlerBase.prototype.param;
    Game_BattlerBase.prototype.param = function (paramId) {
        if (this[paramId] !== undefined) {
            if (paramShowXSParamsPercent === true) {
                var funcIndex = DreamX.ShowParam.paramMultiplyFunction().indexOf(arguments.callee.caller);
                if (funcIndex !== -1) {
                    var xParamIndex = DreamX.ShowParam.defXParamStr().indexOf(paramId);
                    var sParamIndex = DreamX.ShowParam.defSParamStr().indexOf(paramId);
                    if (xParamIndex !== -1 || sParamIndex !== -1) {
                        return this[paramId] * 100 + "%";
                    }
                }
            }
            return this[paramId];
        }
        return DreamX.ShowParam.Game_BattlerBase_param.call(this, paramId);
    };

    if (Imported.YEP_StatusMenuCore) {
        Window_StatusInfo.prototype.DXGraphParams = function () {
            return DreamX.ShowParam.DXParams(paramGraphParams);
        };

        Window_StatusInfo.prototype.DXGeneralParams = function () {
            return DreamX.ShowParam.DXParams(paramGeneralParams);
        };

        Window_StatusInfo.prototype.drawParameters = function () {
            var dx = 0;
            var dy = this.lineHeight() / 2;
            var dw = this.contents.width;
            var dh = this.lineHeight();
            var dw2;
            var text;
            this.changeTextColor(this.systemColor());
            this.drawText(Yanfly.Param.StatusGraphText, dx, dy, dw, 'center');
            dy = this.lineHeight();
            dx = this.standardPadding();
            dw -= this.standardPadding() * 2;


            for (var i = 0; i < this.DXGraphParams().length; i++) {
                var param = this.DXGraphParams()[i];

                dy += this.lineHeight();
                var rate = this.drawParamGauge(dx, dy, dw, param);
                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(param), dx + 4, dy, dw - 4);
                text = Yanfly.Util.toGroup(this._actor.param(param));
                this.changeTextColor(this.normalColor());
                dw2 = dw * rate;
                this.drawText(text, dx, dy, dw2 - 4, 'right');
            }
        };

        Window_StatusInfo.prototype.drawParamGauge = function (dx, dy, dw, paramId) {
            var rate = this.calcParamRate(paramId);
            var array;
            var color1;
            var color2;

            if (paramId >= 2 && paramId <= 7) {
                array = eval('Yanfly.Param.ColorParam' + paramId + 'Gauge').split(' ');
                color1 = array[0];
                color2 = array[1];
            } else {
                color1 = "#ed1c24";
                color2 = "#f26c4f";
            }

            this.drawGauge(dx, dy, dw, rate, color1, color2);
            return rate;
        };

        Window_StatusInfo.prototype.drawGeneral = function () {
            var dx = 0;
            var dy = this.lineHeight() / 2;

            var headerWidth = (this.contents.width - this.standardPadding());

            this.changeTextColor(this.systemColor());

            if (paramShowGenParam && paramShowStatusExp) {
                headerWidth /= 2;
            }

            if (paramShowGenParam) {
                this.drawText(Yanfly.Param.StatusParamText, dx, dy, headerWidth, 'center');
            }

            if (paramShowGenParam && paramShowStatusExp) {
                dx += this.contents.width / 2;
            }

            if (paramShowStatusExp) {
                this.drawText(Yanfly.Param.StatusExpText, dx, dy, headerWidth, 'center');
            }

            if (paramShowGenParam) {
                this.drawGeneralParam();
            }

            if (paramShowStatusExp) {
                this.drawGeneralExp();
            }

        };

        Window_StatusInfo.prototype.drawGeneralExp = function () {
            var dx = 0;
            var dy = this.lineHeight() * 2;
            var dw = (this.contents.width - this.textPadding());

            if (paramShowGenParam) {
                dw /= 2;
                dx = this.textPadding() + dw;
            } else {
                dw -= this.textPadding();
            }

            // Current Exp
            this.changeTextColor(this.systemColor());
            text = TextManager.expTotal.format(TextManager.exp);
            this.drawText(text, dx, dy, dw, 'left');
            dy += this.lineHeight();
            this.changeTextColor(this.normalColor());
            text = Yanfly.Util.toGroup(this._actor.currentExp());
            this.drawText(text, dx, dy, dw, 'right');
            // To Next Level
            dy += this.lineHeight();
            this.changeTextColor(this.systemColor());
            text = TextManager.expNext.format(TextManager.level);
            this.drawText(text, dx, dy, dw, 'left');
            dy += this.lineHeight();
            var rect = new Rectangle();
            rect.x = dx;
            rect.y = dy;
            rect.width = dw;
            var rate = this.actorCurrentExpRate(this._actor);
            this.drawExpGauge(this._actor, rate, rect);
            this.changeTextColor(this.normalColor());
            text = Yanfly.Util.toGroup(this._actor.nextRequiredExp());
            if (this._actor.isMaxLevel())
                text = '-------';
            this.drawText(text, dx, dy, dw, 'right');
            // Total EXP for Next Level
            dy += this.lineHeight();
            this.changeTextColor(this.systemColor());
            text = Yanfly.Param.StatusTotalFmt.format(TextManager.exp,
                    TextManager.level);
            this.drawText(text, dx, dy, dw, 'left');
            dy += this.lineHeight();
            var rect = new Rectangle();
            rect.x = dx;
            rect.y = dy;
            rect.width = dw;
            var rate = this.actorExpRate(this._actor);
            this.drawExpGauge(this._actor, rate, rect);
            this.changeTextColor(this.normalColor());
            text = Yanfly.Util.toGroup(this._actor.nextLevelExp());
            if (this._actor.isMaxLevel())
                text = '-------';
            this.drawText(text, dx, dy, dw, 'right');
        };

        Window_StatusInfo.prototype.drawGeneralParam = function () {
            var rect = new Rectangle();
            var width = this.contents.width - (this.standardPadding() * 2);
            var paramsThisLine = 2;
            var longWasLast = false;
            var paramNameText = "";
            var paramValueText = "";

            if (paramShowStatusExp) {
                width /= 2;
            }

            rect.width = width;

            rect.y = this.lineHeight();
            rect.height = this.lineHeight();

            for (var i = 0; i < this.DXGeneralParams().length; i++) {
                var param = this.DXGeneralParams()[i];
                var type = this.DXGeneralParams()[i + 1];

                i += 1;

                if (type === 'lo' || paramsThisLine === 2 || longWasLast) {
                    paramsThisLine = 0;
                    rect.y += this.lineHeight();
                    rect.x = 0;
                }

                if (type === 'sh') {
                    rect.width = width / 2;
                    rect.x += paramsThisLine * rect.width;
                    paramsThisLine++;
                    longWasLast = false;
                } else {
                    rect.width = width;
                    longWasLast = true;
                }

                var dx = rect.x + this.textPadding();
                var dw = rect.width - this.textPadding() * 2;

                this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);

                if (param !== 'lvl') {
                    paramNameText = TextManager.param(param);
                    paramValueText = Yanfly.Util.toGroup(this._actor.param(param));
                } else {
                    paramNameText = TextManager.level;
                    paramValueText = Yanfly.Util.toGroup(this._actor.level);
                }

                this.changeTextColor(this.systemColor());
                this.drawText(paramNameText, dx, rect.y, dw, 'left');
                this.changeTextColor(this.normalColor());
                this.drawText(paramValueText, dx, rect.y, dw, 'right');
            }
        };
    }

    if (Imported.YEP_EquipCore) {
        Window_StatCompare.prototype.DXParams = function () {
            return DreamX.ShowParam.DXParams(paramEquipParams);
        };

        Window_StatCompare.prototype.refresh = function () {
            this.contents.clear();
            if (!this._actor)
                return;
            for (var i = 0; i < this.DXParams().length; ++i) {
                this.drawItem(0, this.lineHeight() * i, this.DXParams()[i]);
            }
        };
    }

    DreamX.ShowParam.DXParams = function (parameters) {
        var params = [];

        for (var i = 0; i < parameters.length; i++) {
            var param = parameters[i];
            if (new RegExp("^[0-9]+$").test(param)) {
                params.push(parseInt(param));
            } else {
                params.push(param);
            }
        }

        return params;
    };

    if (Imported.YEP_X_AftermathLevelUp) {
        DreamX.ShowParam.BattleManager_prepareVictoryPreLevel = BattleManager.prepareVictoryPreLevel;
        BattleManager.prepareVictoryPreLevel = function () {
            DreamX.ShowParam.BattleManager_prepareVictoryPreLevel.call(this);
            var length = $gameParty.allMembers().length;
            for (var i = 0; i < length; ++i) {
                var actor = $gameParty.allMembers()[i];
                if (!actor)
                    continue;
                this.prepareVictoryPrePostCustomParams(actor, "_preVictoryParams");
            }
        };

        Window_VictoryLevelUp.prototype.drawDarkRects = function () {
            var length = Window_VictoryLevelUp.prototype.DXLevelUpParams().length;
            for (var i = 0; i < length; ++i) {
                var rect = this.itemRect(i);
                this.drawDarkRect(rect.x, rect.y, rect.width, rect.height);
            }
        };

        BattleManager.prepareVictoryPrePostCustomParams = function (actor, property) {
            var params = Window_VictoryLevelUp.prototype.DXLevelUpParams();
            for (var j = 0; j < params.length; j++) {
                var param = params[j];
                if (!new RegExp("^[0-9]+$").test(param) && param !== 'lvl') {
                    actor[property][param] = actor[param];
                }
            }
        };

        DreamX.ShowParam.BattleManager_prepareVictoryPostLevel = BattleManager.prepareVictoryPostLevel;
        BattleManager.prepareVictoryPostLevel = function () {
            DreamX.ShowParam.BattleManager_prepareVictoryPostLevel.call(this);
            var length = $gameParty.allMembers().length;
            for (var i = 0; i < length; ++i) {
                var actor = $gameParty.allMembers()[i];
                if (!actor)
                    continue;
                if (actor._preVictoryLv === actor._level)
                    continue;
                this.prepareVictoryPrePostCustomParams(actor, "_postVictoryParams");
            }
        };

        Window_VictoryLevelUp.prototype.DXLevelUpParams = function () {
            return DreamX.ShowParam.DXParams(paramLevelUpParamsVA);
        };

        Window_VictoryLevelUp.prototype.drawStatChanges = function () {
            this.contents.fontSize = Yanfly.Param.ALUFontSize;
            var params = this.DXLevelUpParams();
            for (var i = 0; i < params.length; ++i) {
                var param = params[i];
                var rect = this.itemRect(i);
                this.drawRightArrow(rect);
                this.drawParamName(param, rect);
                this.drawCurrentParam(param, rect);
                this.drawNewParam(param, rect);
                this.drawParamDifference(param, rect);
            }
        };

        Window_VictoryLevelUp.prototype.drawParamName = function (index, rect) {
            var x = rect.x + this.textPadding();
            var y = rect.y;
            if (index === 'lvl') {
                var text = TextManager.level;
            } else {
                var text = TextManager.param(index);
            }
            this.changeTextColor(this.systemColor());
            this.drawText(text, x, y, this._paramNameWidth);
        };

        Window_VictoryLevelUp.prototype.drawCurrentParam = function (index, rect) {
            var x = rect.width - this.textPadding() + rect.x;
            var y = rect.y;
            x -= this._paramValueWidth * 2 + this._arrowWidth + this._bonusValueWidth;
            this.resetTextColor();
            if (index === 'lvl') {
                var text = Yanfly.Util.toGroup(this._actor._preVictoryLv);
            } else {
                var text = Yanfly.Util.toGroup(this._actor._preVictoryParams[index]);
            }
            this.drawText(text, x, y, this._paramValueWidth, 'right');
        };

        Window_VictoryLevelUp.prototype.drawNewParam = function (index, rect) {
            var x = rect.width - this.textPadding() + rect.x;
            x -= this._paramValueWidth + this._bonusValueWidth;
            var y = rect.y;
            if (index === 'lvl') {
                var newValue = this._actor.level;
                var diffvalue = newValue - this._actor._preVictoryLv;
            } else {
                var newValue = this._actor._postVictoryParams[index];
                var diffvalue = newValue - this._actor._preVictoryParams[index];
            }
            var text = Yanfly.Util.toGroup(newValue);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            this.drawText(text, x, y, this._paramValueWidth, 'right');
        };

        Window_VictoryLevelUp.prototype.drawParamDifference = function (index, rect) {
            if (this._bonusValueWidth <= 0)
                return;
            var x = rect.width - this.textPadding() + rect.x;
            x -= this._bonusValueWidth;
            var y = rect.y;
            if (index === 'lvl') {
                var newValue = this._actor.level;
                var diffvalue = newValue - this._actor._preVictoryLv;
            } else {
                var newValue = this._actor._postVictoryParams[index];
                var diffvalue = newValue - this._actor._preVictoryParams[index];
            }
            if (diffvalue === 0)
                return;
            var actorparam = Yanfly.Util.toGroup(newValue);
            this.changeTextColor(this.paramchangeTextColor(diffvalue));
            var text = Yanfly.Util.toGroup(diffvalue);
            if (diffvalue > 0) {
                text = ' (+' + text + ')';
            } else {
                text = ' (' + text + ')';
            }
            this.drawText(text, x, y, this._bonusValueWidth, 'left');
        };
    }

    if (Imported.YEP_ItemCore) {
        Window_ItemStatus.prototype.DXParamsEquip = function () {
            return DreamX.ShowParam.DXParams(paramEquipParamsItemCore);
        };

        Window_ItemStatus.prototype.drawEquipInfo = function (item) {
            var rect = new Rectangle();
            if (eval(Yanfly.Param.ItemShowIcon)) {
                rect.width = (this.contents.width - Window_Base._faceWidth) / 2;
            } else {
                rect.width = this.contents.width / 2;
            }
            var params = this.DXParamsEquip();
            console.log(params);

            for (var i = 0; i < params.length; ++i) {
                var param = params[i];
                var paramValue = item.params[i];

                rect = this.getRectPosition(rect, i);
                var dx = rect.x + this.textPadding();
                var dw = rect.width - this.textPadding() * 2;

                this.changeTextColor(this.systemColor());
                this.drawText(TextManager.param(param), dx, rect.y, dw);

                if (!new RegExp("^[0-9]+$").test(param)) {
                    var qParamIndex = 0;
                    QuasiParams._custom.forEach(function (qParam) {
                        if (qParam.abr === param) {
                            return;
                        }
                        qParamIndex++;
                    });
                    paramValue = parseInt(QuasiParams.equipParamsPlus(item)[qParamIndex + 17]);
                }
                this.changeTextColor(this.paramchangeTextColor(paramValue));

                var text = Yanfly.Util.toGroup(paramValue);
                if (paramValue >= 0)
                    text = '+' + text;
                if (text === '+0')
                    this.changePaintOpacity(false);
                this.drawText(text, dx, rect.y, dw, 'right');
                this.changePaintOpacity(true);
            }
        };
    }



})();
