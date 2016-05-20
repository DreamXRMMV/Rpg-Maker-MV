/*:
 * @plugindesc v0.1
 * 
 * @param Map Display Name
 * @desc Show make display name instead of editor name. default: false
 * @default false
 * 
 * @param Battle Member Display Count
 * @desc Number of battle members to display. default: 4
 * @default 4
 * 
 * @author DreamX
 * @help
 * ============================================================================
 * Parameter Info
 * ============================================================================
 * Map Display Name
 *  The save file must have been saved with this plugin on to display the 
 *  map display name.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_ExtSaveCore = true;

var DreamX = DreamX || {};
DreamX.ExtSaveCore = DreamX.ExtSaveCore || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Ext_SaveCore');
    var paramMapDisplayName = eval(String(parameters['Map Display Name']));
    var paramBattleMemberCount = Number(parameters['Battle Member Display Count']);

    DreamX.ExtSaveCore.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = DreamX.ExtSaveCore.DataManager_makeSaveContents.call(this);
        contents.map.saveDisplayName = $dataMap.displayName;
        return contents;
    };

    Window_SaveInfo.prototype.drawLocation = function (dx, dy, dw) {
        var id = this._saveContents.map._mapId;
        var text = $dataMapInfos[id].name;
        // change
        if (paramMapDisplayName && this._saveContents.map.saveDisplayName) {
            text = this._saveContents.map.saveDisplayName;
        }
        // change
        if (Yanfly.Param.SaveVocabLocation.length > 0) {
            this.changeTextColor(this.systemColor());
            this.drawText(Yanfly.Param.SaveVocabLocation, dx, dy, dw, 'left');
            this.changeTextColor(this.normalColor());
            this.drawText(text, dx, dy, dw, 'right');
        } else {
            this.drawText(text, dx, dy, dw, 'center');
        }
    };

    Window_SaveInfo.prototype.drawPartyGraphics = function (dy) {
        if (Yanfly.Param.SaveInfoPartyType === 0)
            return dy;
        dy = eval(Yanfly.Param.SaveInfoPartyY);
        // change
        var length = paramBattleMemberCount;
        // change
        var dw = this.contents.width / length;

        dw = Math.floor(dw);
        var dx = Math.floor(dw / 2);
        for (var i = 0; i < length; ++i) {
            var actorId = this._saveContents.party._actors[i];
            var member = this._saveContents.actors._data[actorId];
            if (member) {
                if (Yanfly.Param.SaveInfoPartyType === 1) {
                    var name = member.characterName();
                    var index = member.characterIndex();
                    this.drawCharacter(name, index, dx, dy);
                } else if (Yanfly.Param.SaveInfoPartyType === 2) {
                    var fh = Window_Base._faceHeight;
                    var fw = Window_Base._faceWidth;
                    var fx = dx - Math.floor(Math.min(fh, dw) / 2);
                    var dif = Math.floor(Math.max(0, dw - fw) / 2);
                    var name = member.faceName();
                    var index = member.faceIndex();
                    this.drawFace(name, index, fx - dif, dy - fh, dw, fh);
                } else if (Yanfly.Param.SaveInfoPartyType === 3) {
                    this.drawSvActor(member, dx, dy);
                }
            }
            dx += dw;
        }
        return dy;
    };

    Window_SaveInfo.prototype.drawPartyNames = function (dy) {
        if (!Yanfly.Param.SaveInfoActorName)
            return dy;
        this.resetFontSettings();
        this.contents.fontSize = Yanfly.Param.SaveInfoActorNameSz;
        // change
        var length = paramBattleMemberCount;
        // change
        var dw = this.contents.width / length;
        
        dw = Math.floor(dw);
        var dx = 0;
        for (var i = 0; i < length; ++i) {
            var member = this._saveContents.party.battleMembers()[i];
            if (member) {
                var name = member.name();
                this.drawText(name, dx, dy, dw, 'center');
            }
            dx += dw
        }
        return dy += this.lineHeight();
    };

    Window_SaveInfo.prototype.drawPartyLevels = function (dy) {
        if (!Yanfly.Param.SaveInfoActorLv)
            return dy;
        this._drawLevel = true;
        // change
        var length = paramBattleMemberCount;
        // change
        var dw = this.contents.width / length;
        
        dw = Math.floor(dw);
        var dx = 0;
        var fmt = Yanfly.Param.SaveInfoActorLvFmt;
        for (var i = 0; i < length; ++i) {
            var actorId = this._saveContents.party._actors[i];
            var member = this._saveContents.actors._data[actorId];
            if (member) {
                var lv = Yanfly.Util.toGroup(member.level);
                var text = fmt.format(TextManager.levelA, TextManager.level, lv);
                var tw = this.textWidthEx(text);
                var dif = Math.floor(Math.max(0, dw - tw) / 2);
                this.drawTextEx(text, dx + dif, dy);
            }
            dx += dw
        }
        this._drawLevel = false;
        return dy += this.lineHeight();
    };

})();
