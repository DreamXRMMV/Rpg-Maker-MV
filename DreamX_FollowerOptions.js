/*:
 * @plugindesc v1.02 Choose which party members appear as followers or in battle.
 *
 * <DreamX Follower and Battle Member Options>
 * @author DreamX
 *
 * @param Max Index
 * @desc Recommended: Max Party Size (Including Non-Battle Members) Default: 12
 * @default 12
 
 * @param Battle Members Only
 * @desc Proc. as eval. true: only battle members may appear as followers, false: any party member may appear Default: true
 * @default true
 *
 * @param Max Followers
 * @desc Processed as eval. Max number of followers. Default: $gameParty.maxBattleMembers() - 1
 * @default $gameParty.maxBattleMembers() - 1
 *
 * @help This plugin does not provide plugin commands.
 * ============================================================================
 * Patch Notes
 * ============================================================================
 * Check this thread for patch notes: http://forums.rpgmakerweb.com/index.php?/topic/54510-follower-and-battle-member-options/
 * ============================================================================
 * How To Use
 * ============================================================================
 * Adjust parameters to your liking. Parameter "Max Index" is far the game looks
 * into your party for potential followers. For example, if you use 12, it'll 
 * look as far as party member #12. I recommend using the max possible size of 
 * the party, including actors that are reserve or don't participate in battle. 
 * Or a large number like 100 which the player would probably nearly reach in 
 * terms of  party size.
 *
 * Use <no_follow:1> in an actor's notetag to permanently prevent them from 
 * appearing as a follower.
 * Use <no_follow_switch:x> in an actor's notetag to designate a switch as what 
 * determines whether they're a follower. Change x to the switch number. 
 * You must use one of the following plugin commands to alter follower visiblity: 
 * ToggleFollower 2 	- Toggles the visiblity of an actor as a follower.
 *			Use the actor id. In this case, it is actor #2.
 * ShowFollower 4 	- Shows actor as follower
 *			Use the actor id. In this case, it is actor #4.
 * HideFollower  6 	- Hides actor as follower
 *			Use the actor id. In this case, it is actor #6.
 * Do not use both follower notetags at the same time for the same actor, 
 * choose one or  the other.
 *
 * Use <no_battle:1> in an actor's notetag to permanently prevent them from 
 * appearing in battle. Use <no_battle_switch:x> in an actor's notetag to 
 * designate a switch as what determines whether they appear in battle. Change x 
 * to the switch number. If the switch is true, the actor won't appear in battle. 
 * If it's false, they will. Do not use both notetags at the same time for the 
 * same actor, choose one or the other. You don't need to use plugin commands 
 * when using the switch notetag for battle.
 * 
 * Use <no_menu:1> in an actor's notetag to permanently prevent them from 
 * appearing in menus. Use <no_menu_switch:x> in an actor's notetag to 
 * designate a switch as what determines whether they appear in menus. Change x 
 * to the switch number. If the switch is true, the actor won't appear in menus. 
 * If it's false, they will. Do not use both notetags at the same time for the 
 * same actor, choose one or the other. You don't need to use plugin commands 
 * when using the switch notetag for menus.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Compatibility
 * ============================================================================
 * To use Hime's Custom Party Leader, make sure to place it under this plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Shaz and Liquidize on the Rpg Maker forum for assistance.
 */

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_FollowerOptions = true;
var DreamX = DreamX || {};
DreamX.FollowerOptions = DreamX.FollowerOptions || {};


(function () {

//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX Follower and Battle Member Options>');
    })[0].parameters; //Thanks to Iavra

    var parameterMaxIndex = parseInt(parameters['Max Index'] || '12');
    var parameterBattleMembersOnly = String(parameters['Battle Members Only']
            || 'true');
    var parameterMaxFollowers = String(parameters['Max Followers']
            || '$gameParty.maxBattleMembers() - 1');

//=============================================================================
// Alias/Override Functions
//=============================================================================
    //==========================================================================
    // Game_Interpreter
    //==========================================================================
    DreamX.FollowerOptions._Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.FollowerOptions._Game_Interpreter_pluginCommand.call(this,
                command, args);
        if (args[0] && parseInt(args[0]) >= 1) {
            var argument = DreamX.FollowerOptions.getSwitchNum(args[0]);
            switch (command) {
                case 'ToggleFollower':
                    DreamX.FollowerOptions.ToggleFollower(argument);
                    $gamePlayer.followers().refresh();
                    break;
                case 'ShowFollower':
                    DreamX.FollowerOptions.FollowerOff(argument);
                    $gamePlayer.followers().refresh();
                    break;
                case 'HideFollower':
                    DreamX.FollowerOptions.FollowerOn(argument);
                    $gamePlayer.followers().refresh();
                    break;
            }
        }
    };

    //==========================================================================
    // Game_Party
    //==========================================================================
    DreamX.FollowerOptions.Game_Party_initialize
            = Game_Party.prototype.initialize;
    Game_Party.prototype.initialize = function () {
        DreamX.FollowerOptions.Game_Party_initialize.call(this);
        this._customFollowers = [];
    };

    DreamX.FollowerOptions.Game_Party_leader = Game_Party.prototype.leader;
    Game_Party.prototype.leader = function () {
        if (eval(parameterBattleMembersOnly) === false) {
            return this.allPartyMembers()[0];
        }
        return DreamX.FollowerOptions.Game_Party_leader.call(this);
    };

    Game_Party.prototype.allMembers = function () {
        var members = [];
        this._actors.forEach(function (id) {
            if (DreamX.FollowerOptions.isActorMenuEnabled
                    ($gameActors.actor(id))) {
                members.push($gameActors.actor(id));
            }
        });
        return members;
    };

    Game_Party.prototype.battleMembers = function () {
        var battleMembers = this.allMembers().filter(function (actor) {
            return actor.isAppeared()
                    && DreamX.FollowerOptions.isActorBattleEnabled(actor);
        });
        return battleMembers.slice(0, this.maxBattleMembers());
    };

//=============================================================================
// Original Functions
//=============================================================================
    //==========================================================================
    // DreamX.FollowerOptions
    //==========================================================================
    DreamX.FollowerOptions.getSwitchNum = function (actorId) {
		if (!$dataActors[actorId]) return -1;
        var switchNum = $dataActors[actorId].meta.no_follow_switch
                ? $dataActors[actorId].meta.no_follow_switch : -1;
        return switchNum;
    };

    DreamX.FollowerOptions.ToggleFollower = function (switchNum) {
        if ($gameSwitches.value(switchNum)) {
            DreamX.FollowerOptions.FollowerOff(switchNum);
        }
        else {
            DreamX.FollowerOptions.FollowerOn(switchNum);
        }
    };

    DreamX.FollowerOptions.FollowerOff = function (switchNum) {
        $gameSwitches.setValue(switchNum, false);
    };

    DreamX.FollowerOptions.FollowerOn = function (switchNum) {
        $gameSwitches.setValue(switchNum, true);
    };

    DreamX.FollowerOptions.isFollowerOkay = function (actor) {
        if (!actor)
            return false;
        if ($dataActors[actor.actorId()].meta.no_follow === '1')
            return false;
        var followSwitch = $dataActors[actor.actorId()].meta.no_follow_switch
                || -1;
        if (followSwitch !== -1 && $gameSwitches.value(followSwitch))
            return false;
        return true;
    };

    DreamX.FollowerOptions.isActorBattleEnabled = function (actor) {
        if ($dataActors[actor.actorId()].meta.no_battle === '1')
            return false;
        var battleSwitch = $dataActors[actor.actorId()].meta.no_battle_switch
                || -1;
        if (battleSwitch !== -1 && $gameSwitches.value(battleSwitch))
            return false;
        return true;
    };

    DreamX.FollowerOptions.isActorMenuEnabled = function (actor) {
        if ($dataActors[actor.actorId()].meta.no_menu === '1')
            return false;
        var menuSwitch = $dataActors[actor.actorId()].meta.no_menu_switch
                || -1;
        if (menuSwitch !== -1 && $gameSwitches.value(menuSwitch))
            return false;
        return true;
    };

    //==========================================================================
    // Game_Followers
    //==========================================================================
    Game_Followers.prototype.initialize = function () {
        this._visible = $dataSystem.optFollowers;
        this._gathering = false;
        this._data = [];
        for (var i = 1; i < parameterMaxIndex; i++) {
            this._data.push(new Game_Follower(i));
        }
    };

    Game_Follower.prototype.actor = function () {
        return $gameParty.allFollowers()[this._memberIndex];
    };

    //==========================================================================
    // Game_Party
    //==========================================================================
    Game_Party.prototype.allPartyMembers = function () {
        return this._actors.map(function (id) {
            return $gameActors.actor(id);
        });
    };

    Game_Party.prototype.allFollowers = function () {
        var followers = [];
        if (eval(parameterBattleMembersOnly)) {
            followers = this.battleMembers().filter(function (actor) {
                return DreamX.FollowerOptions.isFollowerOkay(actor);
            });
        }
        else {
            followers = this.allPartyMembers().filter(function (actor) {
                return DreamX.FollowerOptions.isFollowerOkay(actor);
            });
        }
        return followers.slice(0, parseInt(eval(parameterMaxFollowers) + 1));
    };

})();
