/*:
 * @plugindesc v0.2
 * 
 * @param Battle Start Tone
 * @desc The tone to use when the battle starts.
 * @default 
 * 
 * @param Battle Start Tone Switch
 * @desc The switch to turn battle start tone on and off. 0 to disable. Recommended: Same as Battle End
 * @default 0
 * 
 * @param Battle End Tone
 * @desc The tone to use when the battle ends and returns to the map.
 * @default 
 * 
 * @param Battle End Tone Switch
 * @desc The switch to turn battle end tone on and off. 0 to disable. Recommended: Same as Battle Start
 * @default 0
 * 
 * @param Fade Out Length
 * @desc The fade out length for the previous tone in seconds. Default: .75
 * @default .75
 * 
 * @param Fade In Length
 * @desc The fade in length for the new tone in seconds. Default: .25
 * @default .25
 * 
 * @author DreamX
 * @help
 * Bgm files that are variations or tones of each other should have the 
 * following file name style:
 * Name-Tone
 * 
 * For example, you could have Field-Calm for one audio file and Field-Battle 
 * for another audio file.
 * 
 * These files should have the same length and same loop points.
 * 
 *  This plugin requires Preload Manager and Web Audio Cache
 *  
 *  Within the Preload Manager JS file, you should also preload the BGM tones, 
 *  like this (read the documentation for the js file for more information):
 *  TDDP.bootPreloadBGM = [
 *  "Field-Normal",
 *  "Field-Combat"
 *  ] 
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *   ChangeMusicTone x
 *   - x is the tone to change to. It uses the current bgm. For example, if the 
 *   currently playing bgm is Temple-Normal and you used the plugin command 
 *   ChangeMusicTone Combat, the bgm will be changed to Temple-Combat.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Zalerinian on Rpg Maker Web forums for code on how to check if a 
 * file exists.
 */

var Imported = Imported || {};
Imported.DreamX_MusicTones = true;

var DreamX = DreamX || {};
DreamX.MusicTones = DreamX.MusicTones || {};

(function () {



    DreamX.Parameters = PluginManager.parameters('DreamX_MusicTones');
    DreamX.Param = DreamX.Param || {};

    DreamX.Param.battleStartTone = String(DreamX.Parameters['Battle Start Tone']);
    DreamX.Param.battleEndTone = String(DreamX.Parameters['Battle End Tone']);

    DreamX.Param.battleStartToneSwitch = parseInt(DreamX.Parameters['Battle Start Tone Switch']) || 0;
    DreamX.Param.battleEndToneSwitch = parseInt(DreamX.Parameters['Battle End Tone Switch']) || 0;

    DreamX.Param.fadeOutLength = parseFloat(DreamX.Parameters['Fade Out Length']) || .75;
    DreamX.Param.fadeInLength = parseFloat(DreamX.Parameters['Fade In Length']) || .25;

    DreamX.MusicTones.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.MusicTones.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'ChangeMusicTone':
                AudioManager.ChangeTone(args[0]);
                break;
        }
    };

    DreamX.MusicTones.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.MusicTones.DataManager_loadDatabase.call(this);
        if (!Imported.TDDP_PreloadManager)
            throw "DreamX Music Tones requires PreloadManager";
    };

    DreamX.MusicTones.battleStartToneOn = function () {
        return $gameSwitches.value(DreamX.Param.battleStartToneSwitch) === true;
    }

    DreamX.MusicTones.battleEndToneOn = function () {
        return $gameSwitches.value(DreamX.Param.battleEndToneSwitch) === true;
    }

    DreamX.MusicTones.BattleManager_saveBgmAndBgs = BattleManager.saveBgmAndBgs;
    BattleManager.saveBgmAndBgs = function () {
        if (DreamX.MusicTones.battleEndToneOn() === true) {
            return;
        }
        DreamX.MusicTones.BattleManager_saveBgmAndBgs.call(this);
    };

    DreamX.MusicTones.BattleManager_playBattleBgm = BattleManager.playBattleBgm;
    BattleManager.playBattleBgm = function () {
        if (DreamX.MusicTones.battleStartToneOn() === true) {
            return;
        }
        DreamX.MusicTones.BattleManager_playBattleBgm.call(this);
    };

    DreamX.MusicTones.BattleManager_replayBgmAndBgs = BattleManager.replayBgmAndBgs;
    BattleManager.replayBgmAndBgs = function () {
        if (DreamX.MusicTones.battleEndToneOn() === true) {
            return;
        }
        DreamX.MusicTones.BattleManager_replayBgmAndBgs.call(this);
    };

    DreamX.MusicTones.Scene_Map_launchBattle = Scene_Map.prototype.launchBattle;
    Scene_Map.prototype.launchBattle = function () {
        DreamX.MusicTones.Scene_Map_launchBattle.call(this);
        if (DreamX.MusicTones.battleStartToneOn() === true) {
            AudioManager.ChangeTone(DreamX.Param.battleStartTone);
        }
    };

    DreamX.MusicTones.Scene_Map_stopAudioOnBattleStart = Scene_Map.prototype.stopAudioOnBattleStart
    Scene_Map.prototype.stopAudioOnBattleStart = function () {
        if (DreamX.MusicTones.battleStartToneOn() === true) {
            AudioManager.stopBgs();
            AudioManager.stopMe();
            AudioManager.stopSe();
            return;
        }
        DreamX.MusicTones.Scene_Map_stopAudioOnBattleStart.call(this);
    };

    DreamX.MusicTones.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        DreamX.MusicTones.BattleManager_updateBattleEnd.call(this);
        if (DreamX.MusicTones.battleEndToneOn() === false) {
            return;
        }
        if (this.isBattleTest()) {
            return;
        }
        if ($gameParty.isAllDead()) {
            if (this._canLose) {
                AudioManager.ChangeTone(DreamX.Param.battleEndTone);
            }
        } else {
            AudioManager.ChangeTone(DreamX.Param.battleEndTone);
        }
    };

    // get bgm directory
    DreamX.MusicTones.bgmDirectoryPath = function () {
        var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/audio/bgm/');
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    };

    DreamX.MusicTones.doesToneExist = function (currentBgmName, tone) {
        // thanks to zalerinian
        var fs = require('fs');
        // if file exists
        if (fs.existsSync(this.bgmDirectoryPath() + currentBgmName + "-" + tone
                + AudioManager.audioFileExt())) {
            return true;
        }
        return false;
    };


    AudioManager.ChangeTone = function (tone) {
        // if no bgm is currently playing
        if (!this._currentBgm) {
            return;
        }
        // if the tone file doesn't exist
        if (!DreamX.MusicTones.doesToneExist(this._currentBgm.name.split("-")[0], tone)) {
            return;
        }
        var bgm = JSON.parse(JSON.stringify(this._currentBgm));

        var pos = this._bgmBuffer ? this._bgmBuffer.seek() : 0;
        var fadeoutBuffer = this.createBuffer('bgm', bgm.name);

        fadeoutBuffer.play(false, pos);
        fadeoutBuffer.fadeOut(DreamX.Param.fadeOutLength);

        bgm.name = bgm.name.split("-")[0] + "-" + tone;

        this.playBgm(bgm, pos);
        this.fadeInBgm(DreamX.Param.fadeInLength);
    };

})();
