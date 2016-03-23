/*:
 * @plugindesc v1.12 Battlers perform actions instantly in an order decided by their agility. A turn ends after each battler acts.
 * 
 * <DreamX ITB>
 * @author DreamX
 *
 * @param Max Elemental Extra Actions
 * @desc Eval. Max # extra actions battler can get in turn for hitting enemy weakness. 0 - none, -1: infinite. Default: 0
 * @default 0
 *
 * @param Elemental Weakness State
 * @desc Eval. State ID to apply to battler when they're hit in their elemental weakness. 0 - disable. Default: 0
 * @default 0 
 *
 * @param Elemental Weakness Animation
 * @desc Animation ID to play on battler when they get an extra action from hitting enemy in weakness. 0: disable. Default: 0
 * @default 0
 * 
 * @param Ready Overlay
 * @desc Whether to have a looping overlay on actor when they are ready to act. Default: false
 * @default false
 * 
 * @param Ready Overlay Name
 * @desc Name of file in img/system that has ready animation. Default: States
 * @default States
 * 
 * @param Ready Overlay Index
 * @desc Index of ready overlay image to use, starting at 0.
 * @default 0
 * 
 * @param Ready Overlay Anchor X
 * @desc Anchor x position of ready overlay on sprite. Default: 0.5
 * @default 0.5
 * 
 * @param Ready Overlay Anchor Y
 * @desc Anchor y position of ready overlay on sprite. Default: 1
 * @default 1
 * 
 * @param ---Sound---
 * @default
 *
 * @param Ready Sound
 * @desc This is the sound played when an actor is ready. Use -1 to disable. Default: -1 Example: Decision1
 * @default -1
 *
 * @param Ready Volume
 * @desc This is the volume of the ready sound. Default: 100
 * @default 100
 *
 * @param Ready Pitch
 * @desc This is the pitch of the ready sound. Default: 100
 * @default 100
 *
 * @param Ready Pan
 * @desc This is the pan of the ready sound. Default: 0
 * @default 0
 *
 * @help 
 * ============================================================================
 * How To Use
 * ============================================================================
 Set the battle type to itb in Yanfly's Battle Engine Core.
 Use <free_itb_action:1> as a skill notetag to prevent
 that skill from consuming an action for the battler - they will be able to act 
 again after the skill is used. 
 
 Make sure to set the parameters to your liking.
 Put the <noExtraElemenWeaknessAction:1> notetag on a state to disallow opponents
 from getting an extra action from hitting the battler in their weakness.
 
 Put <elemWeaknessState:x> with x as the state id as a notetag for an actor or 
 enemy to define which state is applied when they are hit in their weakness. 
 This overrides the parameter setting for that actor or enemy. Use 0 to disable 
 states from being applied from being hit in the weakness.
 
 Use <reAddBattler:1> in a skill/item to readd a battler to the pool of battlers 
 if they had already finished their previous actions. Must be used with a state 
 that increases action times.

 To use a custom ready overlay, use a file in the same folder and same style as 
 States.png in img/system, make sure the parameter is set to the custom file 
 name.
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
 Yanfly - "Battle System - Charge Turn Battle" & "Battle Engine Core"
 */

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_ITB = true;

var DreamX = DreamX || {};
DreamX.ITB = DreamX.ITB || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX ITB>');
    })[0].parameters; //Thanks to Iavra

    // store the parameter data in variables. The defaults are -1
    var paramMaxElementExtraActions =
            String(parameters['Max Elemental Extra Actions'] || '0');
    var paramElementWeaknessState =
            String(parameters['Elemental Weakness State'] || '0');
    var paramElementWeaknessAnimation =
            parseInt(parameters['Elemental Weakness Animation'] || 0);
    var parameterReadySound =
            String(parameters['Ready Sound'] || '-1');
    var parameterReadyVolume =
            parseInt(parameters['Ready Volume'] || '90');
    var parameterReadyPitch =
            parseInt(parameters['Ready Pitch'] || '100');
    var parameterReadyPan =
            parseInt(parameters['Ready Pan'] || '0');
    var paramaterReadyOverlayEnabled =
            eval(parameters['Ready Overlay'] || false);
    var parameterReadyOverlayName =
           String(parameters['Ready Overlay Name'] || 'States');
    var parameterReadyOverlayIndex =
           parseInt(parameters['Ready Overlay Index'] || 0);
    var parameterReadyAnchorX =
           parseFloat(parameters['Ready Overlay Anchor X'] || 0.5);
    var parameterReadyAnchorY =
           parseFloat(parameters['Ready Overlay Anchor Y'] || 1);
//    var parameterTurnSound =
//            String(parameters['Turn Sound'] || '-1');

//=============================================================================
// Game_Battler
//=============================================================================
    //==========================================================================
    // Alias Functions
    //==========================================================================
    DreamX.ITB.Game_Battler_onTurnEnd = Game_Battler.prototype.onTurnEnd;
    Game_Battler.prototype.onTurnEnd = function () {
        DreamX.ITB.Game_Battler_onTurnEnd.call(this);
        this.resetActionNum();
    };

    DreamX.ITB.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        DreamX.ITB.Game_Battler_initMembers.call(this);
        this._ITBActions = 0;
        this._previousTraitITBActions = 0;
        this._extraActionsFromWeakness = 0;
    };

    //==========================================================================
    // Original Functions
    //==========================================================================

    // Checks if any states disallow elemental extra actions
    Game_Battler.prototype.allowExtraElemWeaknessAction = function () {
        var isAllowed = true;
        this.states().forEach(function (state) {
            if (state.meta.noExtraElemenWeaknessAction) {
                isAllowed = false;
            }
        });
        return isAllowed;
    };

    // Adds ITB actions to the battler from hitting elemental weakness.
    Game_Battler.prototype.extraElementalWeaknessAction = function () {
        if ((this._extraActionsFromWeakness
                < eval(paramMaxElementExtraActions))
                || eval(paramMaxElementExtraActions) === -1) {

            if (paramElementWeaknessAnimation >= 1) {
                this.startAnimation(paramElementWeaknessAnimation, true, 0);
            }
            this._extraActionsFromWeakness += 1;
            this.addITBActions(1);
        }
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
        this._extraActionsFromWeakness = 0;
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
        this._itbReadySound = {
            name: parameterReadySound,
            volume: parameterReadyVolume,
            pitch: parameterReadyPitch,
            pan: parameterReadyPan
        };
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
    // prevent escape from selecting previous actor
    // issue: causes the windows to jitter when you select fight again
    DreamX.ITB.BattleManager_selectPreviousCommand = BattleManager.selectPreviousCommand;
    BattleManager.selectPreviousCommand = function () {
        if (this.isITB()) {
            this.actor().addITBActions(1);
            this.changeActor(-1, 'undecided');
        } else {
            DreamX.ITB.BattleManager_selectPreviousCommand.call(this);
        }
    };

    // prevent surprise attacks from disallowing enemies to act
    DreamX.ITB.BattleManager_startInput = BattleManager.startInput;
    BattleManager.startInput = function () {
        if (this.isITB()) {
            this._phase = 'input';
            $gameParty.makeActions();
            $gameTroop.makeActions();
            this.clearActor();
        } else {
            DreamX.ITB.BattleManager_startInput.call(this);
        }
    };

    // window position
    DreamX.ITB.Scene_Battle_updateWindowPositions
            = Scene_Battle.prototype.updateWindowPositions;
    Scene_Battle.prototype.updateWindowPositions = function () {
        if (BattleManager.isITB()) {
            var statusX = 0;
            if (BattleManager.normalWindowPosition()) {
                statusX = this._partyCommandWindow.width;
            } else {
                statusX = this._partyCommandWindow.width / 2;
            }
            if (this._statusWindow.x < statusX) {
                this._statusWindow.x += 16;
                if (this._statusWindow.x > statusX) {
                    this._statusWindow.x = statusX;
                }
            }
            if (this._statusWindow.x > statusX) {
                this._statusWindow.x -= 16;
                if (this._statusWindow.x < statusX) {
                    this._statusWindow.x = statusX;
                }
            }
        } else {
            DreamX.ITB.Scene_Battle_updateWindowPositions.call(this);
        }
    };

    // if itb the battle system is turn based
    DreamX.ITB.BattleManager_isTurnBased = BattleManager.isTurnBased;
    BattleManager.isTurnBased = function () {
        if (this.isITB())
            return true;
        return DreamX.ITB.BattleManager_isTurnBased.call(this);
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
        } else {
            this._ITBBattlers.shift();
            return this.getReadyITBBattler();
        }
    };

    BattleManager.playITBReadySound = function () {
        AudioManager.playSe(this._itbReadySound);
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
            if (parameterReadySound !== '-1') {
                this.playITBReadySound();
            }
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
            // if does not have same agi
            if (b.agi !== a.agi) {
                return b.agi - a.agi;
            } else {
                // if has same agi
                // if both actors then return one with higher id
                if (a.isActor() && b.isActor()) {
                    return b.actorId() - a.actorId();
                }
                // give enemy priority
                else if (b.isActor() && a.isEnemy()) {
                    return -1;
                }
                // give enemy priority
                else if (b.isEnemy() && a.isActor()) {
                    return 1;
                }
                // if both enemies then return one with higher id
                else if (b.isEnemy() && a.isEnemy()) {
                    return b.enemyId() - a.enemyId();
                }
            }
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

    BattleManager.normalWindowPosition = function () {
        return this._phase === 'input' || (this._phase === 'itb' && this._actorIndex === -1);
    };

    BattleManager.addBattler = function (battler) {
        if (this._ITBBattlers.indexOf(battler) == -1) {
            this._ITBBattlers.push(battler);
            this.sortITBOrders();
        }
    };

//=============================================================================
// Game_Action
//=============================================================================
    // action is "free" if free_itb_action notetag present
    DreamX.ITB.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        DreamX.ITB.Game_Action_apply.call(this, target);
        var item = this.item();
        if (item.meta.free_itb_action) {
            this.subject().addITBActions(1);
        }
        if (item.meta.reAddBattler) {
            BattleManager.addBattler(target);
        }
    };

    // extra actions for hitting enemy weakness
    DreamX.ITB.Game_Action_makeDamageValue = Game_Action.prototype.makeDamageValue;
    Game_Action.prototype.makeDamageValue = function (target, critical) {
        // if param set to 0, it's disabled
        if (BattleManager.isITB() && eval(paramMaxElementExtraActions) !== 0) {
            var user = this.subject();
            var dataTarget = target.isEnemy() ? $dataEnemies[target.enemyId()] :
                    $dataActors[target.actorId()];

            var weaknessStateID = dataTarget.meta.elemWeaknessState
                    ? dataTarget.meta.elemWeaknessState
                    : eval(paramElementWeaknessState);

            if (this.calcElementRate(target) > 1) {
                // add an extra action to user
                if (target.allowExtraElemWeaknessAction()) {
                    user.extraElementalWeaknessAction();
                }

                // apply state to target here
                if (parseInt(weaknessStateID) >= 1) {
                    target.addState(weaknessStateID);
                }
            }
        }
        return DreamX.ITB.Game_Action_makeDamageValue.call(this, target, critical);
    };

//-----------------------------------------------------------------------------
// Sprite_ReadyOverlay
//
// The sprite for displaying the ready image for an actor.

    DreamX.ITB.Sprite_Actor_setBattler = Sprite_Actor.prototype.setBattler;
    Sprite_Actor.prototype.setBattler = function (battler) {
        DreamX.ITB.Sprite_Actor_setBattler.call(this, battler);
        if (paramaterReadyOverlayEnabled) {
            this._readySprite.setup(battler);
        }
    };

    DreamX.ITB.Sprite_Actor_initMembers = Sprite_Actor.prototype.initMembers;
    Sprite_Actor.prototype.initMembers = function () {
        DreamX.ITB.Sprite_Actor_initMembers.call(this);
        if (paramaterReadyOverlayEnabled) {
            this.createReadySprite();
        }
    };

    Sprite_Actor.prototype.createReadySprite = function () {
        this._readySprite = new Sprite_ReadyOverlay();
        this.addChild(this._readySprite);
    };

    function Sprite_ReadyOverlay() {
        this.initialize.apply(this, arguments);
    }

    Sprite_ReadyOverlay.prototype = Object.create(Sprite_Base.prototype);
    Sprite_ReadyOverlay.prototype.constructor = Sprite_ReadyOverlay;

    Sprite_ReadyOverlay.prototype.initialize = function () {
        Sprite_Base.prototype.initialize.call(this);
        this.initMembers();
        this.loadBitmap();
    };

    Sprite_ReadyOverlay.prototype.initMembers = function () {
        this._battler = null;
        this._overlayIndex = 0;
        this._animationCount = 0;
        this._pattern = 0;
        this.anchor.x = parameterReadyAnchorX;
        this.anchor.y = parameterReadyAnchorY;
    };

    Sprite_ReadyOverlay.prototype.loadBitmap = function () {
        this.bitmap = ImageManager.loadSystem(parameterReadyOverlayName);
        this.setFrame(0, 0, 0, 0);
    };

    Sprite_ReadyOverlay.prototype.setup = function (battler) {
        this._battler = battler;
    };

    Sprite_ReadyOverlay.prototype.update = function () {
        Sprite_Base.prototype.update.call(this);
        this._animationCount++;
        if (this._animationCount >= this.animationWait()) {
            this.updatePattern();
            this.updateFrame();
            this._animationCount = 0;
        }
    };

    Sprite_ReadyOverlay.prototype.animationWait = function () {
        return 8;
    };

    Game_BattlerBase.prototype.readyOverlayIndex = function () {
        return parameterReadyOverlayIndex;
    };
    Sprite_ReadyOverlay.prototype.updatePattern = function () {
        this._pattern++;
        this._pattern %= 8;
        if (this._battler && this._battler === BattleManager.actor() && BattleManager._phase === 'input') {
            this._overlayIndex = this._battler.readyOverlayIndex() + 1;
            this.opacity = 255;
        } else {
            this.opacity = 0;
        }
    };

    Sprite_ReadyOverlay.prototype.updateFrame = function () {
        if (this._overlayIndex > 0) {
            var w = 96;
            var h = 96;
            var sx = this._pattern * w;
            var sy = (this._overlayIndex - 1) * h;
            this.setFrame(sx, sy, w, h);
        } else {
            this.setFrame(0, 0, 0, 0);
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
