/*:
 * @plugindesc v1.09
 * @author DreamX
 * 
 * @param Battle Members Only
 * @desc Proc. as eval. true: only battle members may appear as followers, false: any party member may appear Default: true
 * @default true
 * 
 * @param Automatic Follower Refresh
 * @desc Automatically refresh followers whenever a switch is changed. Default: true
 * @default true
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * Place this plugin BELOW Yanfly's Party System plugin.
 * 
 * Use <no_follow:1> in an actor's notetag to permanently prevent them from 
 * appearing as a follower.
 * Use <no_follow_switch:x> in an actor's notetag to designate a switch as what 
 * determines whether they're a follower. Change x to the switch number. 
 * 
 *  * Do not use both follower notetags at the same time for the same actor, 
 * choose one or  the other.
 * 
 * To quickly alter follower visibiity, you can use these plugin commands.
 * 
 * ToggleFollower 2 	- Toggles the visiblity of an actor as a follower.
 *			Use the actor id. In this case, it is actor #2.
 * ShowFollower 4 	- Shows actor as follower
 *			Use the actor id. In this case, it is actor #4.
 * HideFollower  6 	- Hides actor as follower
 *			Use the actor id. In this case, it is actor #6.
 * 
 * Alternatively, you can use just change the associated switch while having 
 * the parameter "Automatic Refresh" on.		
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
 * Thanks to Gilles on Rpg Maker Forum for assistance.
 * Thanks to Yanfly for YEP Party System.
 */

var Imported = Imported || {};
Imported.DreamX_FollowerOptions = true;

var DreamX = DreamX || {};
DreamX.FollowerOptions = DreamX.FollowerOptions || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_FollowerOptions');
    var parameterBattleMembersOnly = eval(String(parameters['Battle Members Only']));
    var parameterAutoRefresh = eval(String(parameters['Automatic Follower Refresh']));

    DreamX.FollowerOptions.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.FollowerOptions.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_PartySystem) {
            throw new Error('DreamX_FollowerOptions requires YEP Party System');
        }
    };

    DreamX.FollowerOptions._Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.FollowerOptions._Game_Interpreter_pluginCommand.call(this,
                command, args);
        var actorId = args[0];
        if (!actorId) {
            return;
        }
        actorId = parseInt(actorId);
        if (actorId === NaN || actorId <= 0) {
            return;
        }

        var switchId = DreamX.FollowerOptions.getSwitchNum(actorId);
        switchId = parseInt(switchId);

        switch (command) {
            case 'ToggleFollower':
                DreamX.FollowerOptions.ToggleFollower(switchId);
                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
            case 'ShowFollower':
                DreamX.FollowerOptions.FollowerOff(switchId);
                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
            case 'HideFollower':
                DreamX.FollowerOptions.FollowerOn(switchId);

                if (!parameterAutoRefresh) {
                    $gamePlayer.refresh();
                }
                break;
        }
    };

    //==========================================================================
    // DreamX.FollowerOptions
    //==========================================================================
    DreamX.FollowerOptions.getSwitchNum = function (actorId) {
        if (!$dataActors[actorId])
            return -1;
        var switchNum = $dataActors[actorId].meta.no_follow_switch
                ? $dataActors[actorId].meta.no_follow_switch : -1;
        return switchNum;
    };

    DreamX.FollowerOptions.ToggleFollower = function (switchNum) {

        if ($gameSwitches.value(switchNum)) {
            DreamX.FollowerOptions.FollowerOff(switchNum);
        } else {
            DreamX.FollowerOptions.FollowerOn(switchNum);
        }
    };

    DreamX.FollowerOptions.FollowerOff = function (switchNum) {
        $gameSwitches.setValue(switchNum, false);
    };

    DreamX.FollowerOptions.FollowerOn = function (switchNum) {
        $gameSwitches.setValue(switchNum, true);
    };

    DreamX.FollowerOptions.disableCommand = function (symbol) {
        var disabledSymbols = ['status', 'skill', 'equip'];
        return $gameParty.members().length === 0 && disabledSymbols.indexOf(symbol) !== -1;
    };

    //==========================================================================
    // Game_Switches
    //==========================================================================
    DreamX.FollowerOptions.Game_Switches_onChange = Game_Switches.prototype.onChange;
    Game_Switches.prototype.onChange = function () {
        DreamX.FollowerOptions.Game_Switches_onChange.call(this);
        if (parameterAutoRefresh) {
            $gamePlayer.refresh();
        }
    };

    //==========================================================================
    // Game_Follower
    //==========================================================================
    Game_Follower.prototype.actor = function () {
        return $gameParty.followers()[this._memberIndex];
    };

    //==========================================================================
    // Game_Party
    //==========================================================================
    Game_Party.prototype.leader = function () {
        return this.followers()[0];
    };

    Game_Party.prototype.followers = function () {
        var group = parameterBattleMembersOnly ? this.battleMembers()
                : this.allMembers();

        return group.filter(function (member) {
            return $gameParty.isFollowerEnabled(member);
        });
    };

    Game_Party.prototype.isFollowerEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_follow) {
            return false;
        }
        var switchId = member.actor().meta.no_follow_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    Game_Party.prototype.isBattleMemberEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_battle) {
            return false;
        }
        var switchId = member.actor().meta.no_battle_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    Game_Party.prototype.isMenuMemberEnabled = function (member) {
        if (!member) {
            return false;
        }
        if (member.actor().meta.no_menu) {
            return false;
        }
        var switchId = member.actor().meta.no_menu_switch;
        if (!switchId) {
            return true;
        }
        switchId = parseInt(switchId);
        if ($gameSwitches.value(switchId)) {
            return false;
        }
        return true;
    };

    DreamX.FollowerOptions.Game_Party_initializeBattleMembers = Game_Party.prototype.initializeBattleMembers;
    Game_Party.prototype.initializeBattleMembers = function () {
        DreamX.FollowerOptions.Game_Party_initializeBattleMembers.call(this);
        var bm = [];

        for (var i = 0; i < this._battleMembers.length; i++) {
            var id = this._battleMembers[i];
            if (this.isBattleMemberEnabled($gameActors.actor(id))) {
                bm.push(id);
            } else {
                bm.push(0);
            }
        }

        this._battleMembers = bm;
    };

    DreamX.FollowerOptions.Game_Party_members = Game_Party.prototype.members;
    Game_Party.prototype.members = function () {
        var scene = SceneManager._scene;
        var members = DreamX.FollowerOptions.Game_Party_members.call(this);

        if (scene instanceof Scene_MenuBase) {
            members = members.filter(function (member) {
                return $gameParty.isMenuMemberEnabled(member);
            });
        }

        return members;
    };

    Game_Party.prototype.sortBattleMembers = function () {
        var regularMembers = this._battleMembers.filter(function (member) {
            return member !== 0;
        });

        var nullMembers = this._battleMembers.filter(function (member) {
            return member === 0;
        });

        this._battleMembers = regularMembers.concat(nullMembers);
    };

    DreamX.FollowerOptions.Game_Party_addActor = Game_Party.prototype.addActor;
    Game_Party.prototype.addActor = function (actorId) {
        if (!this.isBattleMemberEnabled($gameActors.actor(actorId))) {
            Yanfly.Party.Game_Party_addActor.call(this, actorId);
            this.sortBattleMembers();
            return;
        }
        DreamX.FollowerOptions.Game_Party_addActor.call(this, actorId);
        this.sortBattleMembers();
    };



    //==========================================================================
    // Window_PartyList
    //==========================================================================
    DreamX.FollowerOptions.Window_PartyList_createActorOrder = Window_PartyList.prototype.createActorOrder;
    Window_PartyList.prototype.createActorOrder = function () {
        DreamX.FollowerOptions.Window_PartyList_createActorOrder.call(this);
        var a = [];

        for (var i = 0; i < this._data.length; ++i) {
            var id = this._data[i];
            if ($gameParty.isBattleMemberEnabled($gameActors.actor(id))) {
                a.push(id);
            }
        }

        this._data = a;
    };

    //==========================================================================
    // Window_Command
    //==========================================================================
    DreamX.FollowerOptions.Window_Command_addCommand = Window_Command.prototype.addCommand;
    Window_Command.prototype.addCommand = function (name, symbol, enabled, ext) {
        if (DreamX.FollowerOptions.disableCommand(symbol)) {
            enabled = false;
        }
        DreamX.FollowerOptions.Window_Command_addCommand.call(this, name, symbol, enabled, ext);
    };

    if (Imported.YEP_X_ActorPartySwitch) {
        DreamX.FollowerOptions.Window_ActorPartySwitch_makeCommandList = Window_ActorPartySwitch.prototype.makeCommandList;
        Window_ActorPartySwitch.prototype.makeCommandList = function () {
            DreamX.FollowerOptions.Window_ActorPartySwitch_makeCommandList.call(this);
            this._list = this._list.filter(function (cmd) {
                var id = cmd.ext;
                return $gameParty.isBattleMemberEnabled($gameActors.actor(id));
            });
        };
    }

})();
