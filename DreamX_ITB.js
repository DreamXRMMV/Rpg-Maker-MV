/*:
 * @plugindesc v1.01 Battlers perform actions instantly in an order decided by their agility. A turn ends after each battler acts.
 * @author DreamX
 * @help 
 * ============================================================================
 * Patch Notes
 * ============================================================================
 * v1.01 - Action time increases now work.
 * ============================================================================
 * Known Issues/Future Updates
 * ============================================================================
 -The script doesn't check if it has been explicitely enabled - the battle 
 system will always turn on. This will be changed in the future. For now, use
 the script with only dtb.
 -Not compatible with Yanfly's Instant Cast. This will changed in the future 
 if possible.
 -In the future, I would like have an option to give battlers an extra action 
 if they hit an opponent's weakness. The opponent will then optionally  have a 
 user-specified state applied to them, like paralysis. If the enemy is once 
 again hit on their weakness, another user-specified state may be applied. 
 There will be a limit to how many times this occur in a period, so as to not 
 have an infinite advantage for battlers. These hypothetical features are 
 modeled after Persona 4.
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

	Game_Battler.prototype.setITBActions = function() {
		var actions = this.actionPlusSet().reduce(function(r, p) {
			return Math.random() < p ? r + 1 : r;
		}, 1);
		this._ITBActions = actions;
		this._checkNumActions = false;
	};

	Game_Battler.prototype.numITBActions = function() {
		return this._ITBActions;
	};
	
	Game_Battler.prototype.resetCheckNumActions = function() {
		this._checkNumActions = true;
	};
	
	Game_Battler.prototype.decrementNumActions = function() {
		this._ITBActions -= 1;
	};

    DreamX.ITB.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        DreamX.ITB.Game_Battler_initMembers.call(this);
		this._ITBActions = 0;
		this._checkNumActions = true;
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
		$gameTroop.increaseTurn();
        this.allBattleMembers().forEach(function (battler) {
            battler.updateStateTurns();
			battler.updateBuffTurns();
			battler.removeBuffsAuto();
			battler.resetCheckNumActions();
        }, this);
    };

    BattleManager.getReadyITBBattler = function () {
		this.sortITBOrders();
        if (this._ITBBattlers.length <= 0) {
            this.endTurn();
        }
		firstBattler = this._ITBBattlers[0];
		if (firstBattler._checkNumActions) firstBattler.setITBActions();
		if (firstBattler.numITBActions() > 1) {
			firstBattler.decrementNumActions();
			return firstBattler;
		}
        return this._ITBBattlers.shift();
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

    BattleManager.setITBPhase = function () {
        this._phase = 'itb';
    };


    BattleManager.isITB = function () {
        return true;
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

    Game_Battler.prototype.endTurnAllITB = function () {
        this.clearActions();
        this.setActionState('undecided');
        if (this.battler())
            this.battler().refreshMotion();
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

//    BattleManager.updateBattlerITB = function () {
//        $gameParty.updateTick();
//        $gameTroop.updateTick();
//    };
//
//    DreamX.ITB.Game_Battler_updateTick = Game_Battler.prototype.updateTick;
//    Game_Battler.prototype.updateTick = function () {
//        DreamX.ITB.Game_Battler_updateTick.call(this);
//        if (BattleManager.isCTB())
//            this.updateITB();
//    };
//
//    Game_Battler.prototype.updateITB = function () {
//        if (!this.canMove()) {
//            this.updateITBStates();
//            return;
//        }
//    };
//
//    Game_Battler.prototype.updateITBStates = function () {
//        for (var i = 0; i < this._states.length; ++i) {
//            var stateId = this._states[i];
//            var state = $dataStates[stateId];
//            if (!state)
//                continue;
//            if (!this._stateTurns[stateId])
//                continue;
//            if (state.restriction >= 4 && state.autoRemovalTiming !== 0) {
//                this._stateTurns[stateId]--;
//                if (this._stateTurns[stateId] <= 0)
//                    this.removeState(stateId);
//            }
//        }
//    };

})();
