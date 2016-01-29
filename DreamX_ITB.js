/*:
 * @plugindesc v1.06 Battlers perform actions instantly in an order decided by their agility. A turn ends after each battler acts.
 * @author DreamX
 * @help 
 * ============================================================================
 * How To Use
 * ============================================================================
 * Set the battle type to itb in Yanfly's Battle Engine Core.
 * Use <free_itb_action:1> as a skill notetag to prevent
 * that skill from consuming an action for the battler - they will be able to
 * act again after the skill is used.
 * ============================================================================
 * Patch Notes/Known Issues/Future Updates
 * ============================================================================
 * See the forum thread for patch notes:
 * http://forums.rpgmakerweb.com/index.php?/topic/54880-instant-turn-battle-system/
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 Free to use and modify for commercial and noncommercial games, with credit.
 This script was based off of Yanfly's Battle System - Charge Turn Battle
 and was programmed using Yanfly's Battle Engine Core turned on. Please credit
 them for both scripts.
 * ============================================================================
 * Credits
 * ============================================================================
 DreamX
 Yanfly - "Battle System - Charge Turn Battle" && "Battle Engine Core"
 */

var Imported = Imported || {};
Imported.DreamX_ITB = true;

var DreamX = DreamX || {};
DreamX.ITB = DreamX.ITB || {};

(function () {

//=============================================================================
// Game_Battler
//=============================================================================

    DreamX.ITB.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function () {
        DreamX.ITB.Game_Battler_onTurnEnd.call(this);
        this.resetActionNum();
		this.regenerateAll();
    };

    DreamX.ITB.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        DreamX.ITB.Game_Battler_initMembers.call(this);
        this._ITBActions = 0;
        this._previousTraitITBActions = 0;
    };

    // Adds ITB actions to the battler.
    Game_Battler.prototype.addITBActions = function (actions) {
        this._ITBActions += actions;
    };

    // Adds ITB actions from traits to the battler.
    Game_Battler.prototype.addTraitITBActions = function (actions) {
        this._previousTraitITBActions += actions;
        this.addITBActions(actions);
    };

    // Returns the previous number of actions added from traits.
    Game_Battler.prototype.previousTraitITBActions = function (actions) {
        return this._previousTraitITBActions;
    };

    // Returns extra actions from traits, plus the default one.
    Game_Battler.prototype.traitITBActions = function () {
        var actions = this.actionPlusSet().reduce(function (r, p) {
            return Math.random() < p ? r + 1 : r;
        }, 1);
        return actions;
    };

    // Returns the current number of ITB actions left for the battler.
    Game_Battler.prototype.numITBActions = function () {
        return this._ITBActions;
    };

    // Resets the ITB action variables for the battler.
    Game_Battler.prototype.resetActionNum = function () {
        this._ITBActions = 0;
        this._previousTraitITBActions = 0;
    };

    // Decides whether to add ITB actions from traits.
    Game_Battler.prototype.decideITBTraitActions = function () {
        // if there is a difference between the current number of trait actions
        // and the previous number of them, add the difference to the battler's
        // itb action number
        var difference = this.traitITBActions() - this.previousTraitITBActions();
        if (difference >= 1) {
            this.addTraitITBActions(difference);
        }
    };

    Game_Battler.prototype.endTurnAllITB = function () {
        this.clearActions();
        this.setActionState('undecided');
        if (this.battler())
            this.battler().refreshMotion();
    };

//=============================================================================
// BattleManager
//=============================================================================
    //==========================================================================
    // Alias Functions
    //==========================================================================
    DreamX.ITB.BattleManager_startTurn = BattleManager.startTurn;
    BattleManager.startTurn = function () {
        $gameTroop.clearActions();
        $gameParty.clearActions();
        DreamX.ITB.BattleManager_startTurn.call(this);
    };

    DreamX.BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function () {
        DreamX.BattleManager_initMembers.call(this);
        this._ITBBattlers = [];
    };

    DreamX.ITB.battleManager_endTurn = BattleManager.endTurn;
    BattleManager.endTurn = function () {
        DreamX.ITB.battleManager_endTurn.call(this);
        this.makeITBOrders();
    };

    DreamX.ITB.BattleManager_update = BattleManager.update;
    BattleManager.update = function () {
        if (this.isITB()) {
            if (this.isBusy()) {
                return;
            }

            if (this.updateEvent()) {
                return;
            }

            if (this._phase === 'battleEnd') {
                return DreamX.ITB.BattleManager_update.call(this);
            }
            if (this.checkBattleEnd()) {
                return;
            }

            if (this._phase === 'itb') {
                this.updateITBPhase();
            } else {
                DreamX.ITB.BattleManager_update.call(this);
            }
        } else {
            DreamX.ITB.BattleManager_update.call(this);
        }
    };

    DreamX.BattleManager_startBattle = BattleManager.startBattle;
    BattleManager.startBattle = function () {
        DreamX.BattleManager_startBattle.call(this);
        this.makeITBOrders();
    };

    DreamX.ITB.BattleManager_selectNextCommand = BattleManager.selectNextCommand;
    BattleManager.selectNextCommand = function () {
        if (this.isITB()) {
            if (!this.actor())
                return this.setITBPhase();
            if (this.isValidITBActorAction()) {
                this.startITBAction(this.actor());
            }
        } else {
            DreamX.ITB.BattleManager_selectNextCommand.call(this);
        }
    };

    DreamX.ITB.BattleManager_endAction = BattleManager.endAction;
    BattleManager.endAction = function () {
        if (this.isITB()) {
            this.endITBAction();
        } else {
            DreamX.ITB.BattleManager_endAction.call(this);
        }
    };

    DreamX.ITB.BattleManager_updateEventMain = BattleManager.updateEventMain;
    BattleManager.updateEventMain = function () {
        if (this.isITB()) {
            $gameTroop.updateInterpreter();
            $gameParty.requestMotionRefresh();
            if ($gameTroop.isEventRunning()) {
                return true;
            }
            $gameTroop.setupBattleEvent();
            if ($gameTroop.isEventRunning() || SceneManager.isSceneChanging()) {
                return true;
            }
            return false;
        } else {
            return DreamX.ITB.BattleManager_updateEventMain.call(this);
        }
    };
    //==========================================================================
    // Original Functions
    //==========================================================================
    BattleManager.getReadyITBBattler = function () {
        this.sortITBOrders();
        // if the pool of ITB Battlers is empty, start the turn
        if (this._ITBBattlers.length <= 0) {
            this.startTurn();
            return;
        }
        firstBattler = this._ITBBattlers[0];
        firstBattler.decideITBTraitActions();

        if (firstBattler.numITBActions() >= 1) {
            firstBattler.addITBActions(-1);
            return firstBattler;
        }
        else {
            this._ITBBattlers.shift();
            return this.getReadyITBBattler();
        }
    };

    BattleManager.breakITBPhase = function () {
        if (this._victoryPhase)
            return true;
        if (this._processingForcedAction)
            return true;
        if ($gameTroop.isEventRunning())
            return true;
        return this._phase !== 'itb';
    };

    BattleManager.updateITBPhase = function () {
        for (; ; ) {
            if (this.breakITBPhase())
                break;
            var readyBattler = this.getReadyITBBattler();
            if (readyBattler) {
                return this.startITBInput(readyBattler);
            }
            break;
        }
    };

    BattleManager.startITBInput = function (battler) {
        if (battler.isDead())
            return;
        battler.makeActions();
        if (battler.isEnemy()) {
            this.startITBAction(battler);
        } else if (battler.canInput()) {
            this._actorIndex = battler.index();
            //this.playCTBReadySound();
            battler.setActionState('inputting');
            battler.spriteStepForward();
            this._phase = 'input';
            return;
        } else if (battler.isConfused()) {
            battler.makeConfusionActions();
        } else {
            battler.makeAutoBattleActions();
        }

    };

    BattleManager.setITBPhase = function () {
        this._phase = 'itb';
    };

    BattleManager.isITB = function () {
        return this.isBattleSystem('itb');
    };

    BattleManager.isValidITBActorAction = function () {
        if (!this.actor())
            return false;
        if (!this.actor().currentAction())
            return false;
        return this.actor().currentAction().item();
    };

    BattleManager.startITBAction = function (battler) {
        this._subject = battler;
        var action = this._subject.currentAction();
        if (action && action.isValid()) {
            this.startAction();
        } else {
            this.endAction();
        }
    };

    BattleManager.makeITBOrders = function () {
        var battlers = [];
        if (!this._surprise) {
            battlers = battlers.concat($gameParty.members());
        }
        if (!this._preemptive) {
            battlers = battlers.concat($gameTroop.members());
        }
        this._ITBBattlers = battlers;
        this.sortITBOrders();
    };

    BattleManager.sortITBOrders = function () {
        this._ITBBattlers.sort(function (a, b) {
            return b.agi - a.agi;
        });
    };

    BattleManager.endITBAction = function () {
        if (Imported.YEP_BattleEngineCore) {
            if (this._processingForcedAction)
                this._phase = this._preForcePhase;
            this._processingForcedAction = false;
        }
        if (this._subject)
            this._subject.onAllActionsEnd();
        if (this.updateEventMain())
            return;
        this._subject.endTurnAllITB();
        if (this.loadPreForceActionSettings())
            return;
        this.setITBPhase();
    };

    //==========================================================================
    // Overwrite Functions
    //==========================================================================
    DreamX.ITB.BattleManager_selectPreviousCommand = BattleManager.selectPreviousCommand;
    BattleManager.selectPreviousCommand = function () {
        if (this.isITB()) {
            this.actor().addITBActions(1);
            this.changeActor(-1, 'undecided');
        }
        else {
            DreamX.ITB.BattleManager_selectPreviousCommand.call(this);
        }

    };
//=============================================================================
// Game_Action
//=============================================================================
    DreamX.ITB.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        DreamX.ITB.Game_Action_apply.call(this, target);
        var item = this.item();
        if (item.meta.free_itb_action) {
            this.subject().addITBActions(1);
        }
    };

//=============================================================================
// Compatibility
//=============================================================================
    if (Imported.YEP_BattleAICore) {
        DreamX.ITB.Game_Battler_setAIPattern = Game_Battler.prototype.setAIPattern;
        Game_Battler.prototype.setAIPattern = function () {
            if (BattleManager.isITB()) {
                if (this.numITBActions() <= 0)
                    return;
            }
            DreamX.ITB.Game_Battler_setAIPattern.call(this);
        };
    }

})();
