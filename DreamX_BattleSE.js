/*:
 * @plugindesc v1.1 Disable or change battle start sound
 * @author DreamX
 *  
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * BattleStartUseSE
 * Sets battle start to use a SE, like the default.
 * 
 * BattleStartUseME
 * Sets battle start to use a ME. You must define the ME with SetBattleME 
 * (see below) before using. 
 * 
 * BattleStartUseBattleBGM
 * Sets battle start to use the battle BGM.
 * 
 * BattleStartUseNone
 * Don't play any sound on battle start.
 * 
 * SetBattleSE w x y z
 * w - The name of the battle start SE to use.
 * x - (Optional) The pan of the SE
 * y - (Optional) The pitch of the SE
 * z - (Optional) The volume of the SE
 * 
 * SetBattleME w x y z
 * w - The name of the battle start ME to use.
 * x - (Optional) The pan of the ME
 * y - (Optional) The pitch of the ME
 * z - (Optional) The volume of the ME
 * 
 * ResetBattleSE
 * Resets the battle start SE to default.
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
Imported.DreamX_BattleSE = true;

var DreamX = DreamX || {};
DreamX.BattleSE = DreamX.BattleSE || {};
DreamX.Param = DreamX.Params || {};

(function () {
    DreamX.BattleSE.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.BattleSE.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'BattleStartUseSE':
                $gameSystem.battleStartSoundType = 'SE';
                break;
            case 'BattleStartUseME':
                $gameSystem.battleStartSoundType = 'ME';
                break;
            case 'BattleStartUseBattleBGM':
                $gameSystem.battleStartSoundType = 'BATTLEBGM';
                break;
            case 'BattleStartUseNone':
                $gameSystem.battleStartSoundType = 'NONE';
                break;
            case 'SetBattleSE':
                if (args[0]) {
                    $gameSystem.customBattleSE = args[0];
                }
                if (args[1]) {
                    parseInt($gameSystem.customBattleSEPan = args[1]);
                }
                if (args[2]) {
                    parseInt($gameSystem.customBattleSEPitch = args[2]);
                }
                if (args[3]) {
                    parseInt($gameSystem.customBattleSEVolume = args[3]);
                }
                break;
            case 'SetBattleME':
                if (args[0]) {
                    $gameSystem.customBattleME = args[0];
                }
                if (args[1]) {
                    parseInt($gameSystem.customBattleMEPan = args[1]);
                }
                if (args[2]) {
                    parseInt($gameSystem.customBattleMEPitch = args[2]);
                }
                if (args[3]) {
                    parseInt($gameSystem.customBattleMEVolume = args[3]);
                }
                break;
            case 'ResetBattleSE':
                $gameSystem.customBattleSE = "";
                $gameSystem.customBattleSEPan = "";
                $gameSystem.customBattleSEPitch = "";
                $gameSystem.customBattleSEVolume = "";
                break;
        }
    };

    DreamX.BattleSE.SoundManager_playBattleStart = SoundManager.playBattleStart;
    SoundManager.playBattleStart = function () {
        if ((!$gameSystem.battleStartSoundType
                || $gameSystem.battleStartSoundType === 'SE')
                && $gameSystem.customBattleSE) {
            var se = {};
            se.name = $gameSystem.customBattleSE;
            se.pan = $gameSystem.customBattleSEPan || se.pan;
            se.pitch = $gameSystem.customBattleSEPitch || se.pitch;
            se.volume = $gameSystem.customBattleSEVolume || se.volume;
            AudioManager.playStaticSe(se);
            return;
        } else if ($gameSystem.battleStartSoundType === 'ME'
                && $gameSystem.customBattleME) {
            var me = {};
            me.name = $gameSystem.customBattleME;
            me.pan = $gameSystem.customBattleMEPan || 0;
            me.pitch = $gameSystem.customBattleSEPitch || 100;
            me.volume = $gameSystem.customBattleSEVolume || 100;
            AudioManager.playMe(me);
            return;
        } else if ($gameSystem.battleStartSoundType === 'BATTLEBGM') {
            BattleManager.playBattleBgm();
            return;
        } else if ($gameSystem.battleStartSoundType === 'NONE') {
            return;
        }
        DreamX.BattleSE.SoundManager_playBattleStart.call(this);
    };

})();
