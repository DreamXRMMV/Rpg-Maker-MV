/*:
 * @plugindesc v0.1
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
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly for their Equip Core and Status Core plugins.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_ShowParam = true;

var DreamX = DreamX || {};
DreamX.ShowParam = DreamX.ShowParam || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_ShowParam');
    var paramEquipParams = String(parameters['Equip Parameters']).split(" ");
    var paramShowXSParamsPercent = eval(String(parameters['SParams & XParams as %']));

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

    if (Imported.YEP_EquipCore) {
        Window_StatCompare.prototype.DXParams = function () {
            var params = [];

            for (var i = 0; i < paramEquipParams.length; i++) {
                var param = paramEquipParams[i];
                if (new RegExp("^[0-9]+$").test(param)) {
                    params.push(parseInt(param));
                } else {
                    params.push(paramEquipParams[i]);
                }
            }

            return params;
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


})();
