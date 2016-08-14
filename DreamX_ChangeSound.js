/*:
 * @plugindesc v1.0 Change System Sounds
 * @author DreamX
 *  
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * SetSE type name volume pitch pan
 * This will change the sound used. 
 * For type, see the type section below.
 * For name, choose the name of the sound file you want to use.
 * For volume, enter a number from 0 to 100.
 * For pitch, enter a number from 50 and 150. Use 100 for normal pitch.
 * For pan, enter a number from -100 to 100. Use 0 for normal pan.
 * 
 * Example:
 * SetSE cursor CustomCursor 75 100 0
 * 
 * ResetSE type
 * This will reset the sound to what it is in the database.
 * Replace type with the type (see below)
 * 
 * Example:
 * ResetSE battle_start
 * ============================================================================
 * Types
 * ============================================================================
 * Here are the types of system sounds you can replace. Use one for the 
 * plugin command.
 * 
 *  cursor
 *  ok
 *  cancel
 *  buzzer
 *  equip
 *  save
 *  load
 *  battle_start
 *  escape
 *  enemy_attack
 *  enemy_damage
 *  enemy_collapse
 *  boss_collapse1
 *  boss_collapse2
 *  actor_damage
 *  actor_collapse
 *  recovery
 *  miss
 *  evasion
 *  magic_evasion
 *  magic_reflection
 *  shop
 *  use_item
 *  use_skill
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
Imported.DreamX_ChangeSound = true;

var DreamX = DreamX || {};
DreamX.ChangeSound = DreamX.ChangeSound || {};
DreamX.Param = DreamX.Params || {};

(function () {
    DreamX.ChangeSound.SENumbers = {
        cursor: 0,
        ok: 1,
        cancel: 2,
        buzzer: 3,
        equip: 4,
        save: 5,
        load: 6,
        battle_start: 7,
        escape: 8,
        enemy_attack: 9,
        enemy_damage: 10,
        enemy_collapse: 11,
        boss_collapse1: 12,
        boss_collapse2: 13,
        actor_damage: 14,
        actor_collapse: 15,
        recovery: 16,
        miss: 17,
        evasion: 18,
        magic_evasion: 19,
        magic_reflection: 20,
        shop: 21,
        use_item: 22,
        use_skill: 23
    };

    DreamX.ChangeSound.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.ChangeSound.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'SetSE':
                DreamX.ChangeSound.setSE.apply(this, args);
                break;
            case 'ResetSE':
                DreamX.ChangeSound.resetSE(args[0]);
                break;
        }
    };

    DreamX.ChangeSound.resetSE = function (type) {
        var num = DreamX.ChangeSound.SENumbers[type];
        var se = JSON.parse(JSON.stringify($dataSystem.sounds[num]));
        DreamX.ChangeSound.setSEOverride(num, se);
    };

    DreamX.ChangeSound.setSE = function (type, name, volume, pitch, pan) {
        type = type.toLowerCase();
        var num = DreamX.ChangeSound.SENumbers[type];
        var se = JSON.parse(JSON.stringify($dataSystem.sounds[num]));
        se.name = name;
        se.volume = volume || se.volume;
        se.pitch = pitch || se.pitch;
        se.pan = pan || se.pan;

        DreamX.ChangeSound.setSEOverride(num, se);
    };

    DreamX.ChangeSound.setSEOverride = function (num, se) {
        if (!$gameSystem._soundEffectOverrides) {
            $gameSystem._soundEffectOverrides = {};
        }
        $gameSystem._soundEffectOverrides[num] = se;
    };

    DreamX.ChangeSound.SoundManager_loadSystemSound = SoundManager.loadSystemSound;
    SoundManager.loadSystemSound = function (n) {
        if ($gameSystem && $gameSystem._soundEffectOverrides && $gameSystem._soundEffectOverrides[n]) {
            AudioManager.loadStaticSe($gameSystem._soundEffectOverrides[n]);
            return;
        }
        DreamX.ChangeSound.SoundManager_loadSystemSound.call(this, n);
    };

    DreamX.ChangeSound.SoundManager_playSystemSound = SoundManager.playSystemSound;
    SoundManager.playSystemSound = function (n) {
        if ($gameSystem._soundEffectOverrides && $gameSystem._soundEffectOverrides[n]) {
            AudioManager.playStaticSe($gameSystem._soundEffectOverrides[n]);
            return;
        }
        DreamX.ChangeSound.SoundManager_playSystemSound.call(this, n);
    };

})();
