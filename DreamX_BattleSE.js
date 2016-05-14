/*:
 * @plugindesc v1.0 Disable or change battle start SE
 * @author DreamX
 * 
 * @param Disable Battle SE Switch
 * @desc The switch ID to disable battle start SE.
 * @default 0
 * 
 * @param Battle BGM Instead Of SE Switch
 * @desc The switch ID to use the Battle BGM instead of the battle start SE.
 * @default 0
 * 
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * SetBattleSE w x y z
 * w - The name of the battle se to use.
 * x - (Optional) The pan of the se
 * y - (Optional) The pitch of the se
 * z - (Optional) The volume of the se
 * 
 * ResetBattleSE
 * Resets the battle se to default.
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
    var parameters = PluginManager.parameters('DreamX_BattleSE');
    DreamX.Param.BSEDisableSESwitch = parseInt(parameters['Disable Battle SE Switch']);
    DreamX.Param.BSEBattleBGMInstead = parseInt(parameters['Battle BGM Instead Of SE Switch']);

    DreamX.BattleSE.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.BattleSE.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
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
        var SESwitchID = DreamX.Param.BSEDisableSESwitch;
        if (SESwitchID >= 1 && $gameSwitches.value(SESwitchID)) {
            return;
        }
        var BGMSwitchID = DreamX.Param.BSEBattleBGMInstead;
        if (BGMSwitchID >= 1 && $gameSwitches.value(BGMSwitchID)) {
            BattleManager.playBattleBgm();
            return;
        }
        if ($gameSystem.customBattleSE) {
            var se = JSON.parse(JSON.stringify($dataSystem.sounds[7]));
            se.name = $gameSystem.customBattleSE;
            se.pan = $gameSystem.customBattleSEPan || se.pan;
            se.pitch = $gameSystem.customBattleSEPitch || se.pitch;
            se.volume = $gameSystem.customBattleSEVolume || se.volume;
            AudioManager.playStaticSe(se);
            return;
        }
        DreamX.BattleSE.SoundManager_playBattleStart.call(this);
    };

})();
