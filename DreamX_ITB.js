/*:
 * @plugindesc v1.14a Battlers perform actions instantly in an order decided by their agility. A turn ends after each battler acts.
 * 
 * <DreamX ITB>
 * @author DreamX
 *
 * @param Max Elemental Extra Actions
 * @desc Eval. Max # extra actions battler can get in turn for hitting enemy weakness. 0 - none, -1: infinite. Default: 0
 * @default 0
 * 
 * @param Max Elemental Extra Actions Per Opponent Per Turn
 * @desc Eval. Max # extra actions battler can get in turn for hitting enemy weakness per opponent. <= 0: infinite. Default: 0
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
 * @param Show Turn Orders
 * @desc Whether to show turn orders. Default: false
 * @default false
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

    var paramMaxElemExtraPerOpponentPerTurn =
            String(parameters['Max Elemental Extra Actions Per Opponent Per Turn'] || '0');

    var paramElementWeaknessState =
            String(parameters['Elemental Weakness State'] || '0');
    var paramElementWeaknessAnimation =
            parseInt(parameters['Elemental Weakness Animation'] || 0);
    var paramaterShowTurnOrder =
            eval(parameters['Show Turn Orders'] || false);
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

        // holds ids and number of times hit in weakness by another battler
        this._weaknessHitMap = new Map();
    };

    //==========================================================================
    // Original Functions
    //==========================================================================

    // Checks if any states disallow elemental extra actions
    Game_Battler.prototype.allowExtraElemWeaknessAction = function (user) {
        var isAllowed = true;
        this.states().forEach(function (state) {
            if (state.meta.noExtraElemenWeaknessAction) {
                isAllowed = false;
            }
        });

        if (this._weaknessHitMap.get(user) && paramMaxElemExtraPerOpponentPerTurn >= 1
                && this._weaknessHitMap.get(user)
                >= paramMaxElemExtraPerOpponentPerTurn - 1) {
            return false;
        }
        return isAllowed;
    };

    // Adds ITB actions to the battler from hitting elemental weakness.
    Game_Battler.prototype.extraElementalWeaknessAction = function (target) {
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
        this._weaknessHitMap = new Map();
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
        if (this._ITBBattlers.indexOf(battler) === -1) {
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
        var result = target.result();
        if (!result.isHit()) {
            return;
        }
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
                if (target.allowExtraElemWeaknessAction(user)) {
                    var timesWeaknessHit = target._weaknessHitMap.get(user)
                            ? target._weaknessHitMap.get(user) : 0;
                    target._weaknessHitMap.set(user, timesWeaknessHit + 1);
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
// Window_CTBIcon
//=============================================================================
    Game_Battler.prototype.itbIcon = function () {
        return 0;
    };

    Game_Battler.prototype.itbBorderColor = function () {
        return 0;
    };

    Game_Battler.prototype.itbBackgroundColor = function () {
        return 0;
    };

    Game_Actor.prototype.itbIcon = function () {
        // CHANGE ME: Have meta processed instead
        if (this.actor().itbClassIcon) {
            if (this.actor().itbClassIcon[this._classId]) {
                return this.actor().itbClassIcon[this._classId];
            }
        }
        return this.actor().itbIcon;
    };

    Game_Actor.prototype.itbBorderColor = function () {
        // CHANGE ME: Have meta processed instead
        return this.actor().itbBorderColor;
    };

    Game_Actor.prototype.itbBackgroundColor = function () {
        // CHANGE ME: Have meta processed instead
        return this.actor().itbBackgroundColor;
    };

    Game_Enemy.prototype.itbIcon = function () {
        // CHANGE ME: Have meta processed instead
        return this.enemy().itbIcon;
    };

    Game_Enemy.prototype.ctbBorderColor = function () {
        // CHANGE ME: Have meta processed instead
        return this.enemy().itbBorderColor;
    };

    Game_Enemy.prototype.ctbBackgroundColor = function () {
        // CHANGE ME: Have meta processed instead
        return this.enemy().itbBackgroundColor;
    };

    DreamX.ITB.Sprite_Battler_postSpriteInitialize =
            Sprite_Battler.prototype.postSpriteInitialize;
    Sprite_Battler.prototype.postSpriteInitialize = function () {
        DreamX.ITB.Sprite_Battler_postSpriteInitialize.call(this);
        if (BattleManager.isITB() && paramaterShowTurnOrder === true)
            this.createITBIcon();
    };

    Sprite_Battler.prototype.createITBIcon = function () {
        // CHANGE ME: Added parameter to decide whether to show turn order
//        if (!Yanfly.Param.CTBTurnOrder)
//            return;
        this._ITBIcon = new Window_ITBIcon(this);
    };

    DreamX.ITB.Sprite_Battler_update = Sprite_Battler.prototype.update;
    Sprite_Battler.prototype.update = function () {
        DreamX.ITB.Sprite_Battler_update.call(this);
        this.addITBIcon();
    };

    Sprite_Battler.prototype.addITBIcon = function () {
        if (!this._ITBIcon)
            return;
        if (this._addedITBIcon)
            return;
        if (!SceneManager._scene)
            return;
        var scene = SceneManager._scene;
        if (!scene._windowLayer)
            return;
        this._addedITBIcon = true;
        this._ITBIcon.setWindowLayer(scene._windowLayer);
        scene.addChild(this._ITBIcon);
    };

    function Window_ITBIcon() {
        this.initialize.apply(this, arguments);
    }

    Window_ITBIcon.prototype = Object.create(Window_Base.prototype);
    Window_ITBIcon.prototype.constructor = Window_ITBIcon;

    Window_ITBIcon.prototype.initialize = function (mainSprite) {
        this._mainSprite = mainSprite;
        var width = this.iconWidth() + 8 + this.standardPadding() * 2;
        var height = this.iconHeight() + 8 + this.standardPadding() * 2;
        this._redraw = false;
        // CHANGE ME: Add position and direction parameter
        this._position = "center";
        this._direction = "left";
        // not really sure what this is, but since you need BEC anyway, okay to use?
        this._lowerWindows = eval(Yanfly.Param.BECLowerWindows);
        Window_Base.prototype.initialize.call(this, 0, 0, width, height);
        this.opacity = 0;
        this.contentsOpacity = 0;
    };

    Window_ITBIcon.prototype.iconWidth = function () {
        // CHANGE ME: change to parameter
        return 32;
    };

    Window_ITBIcon.prototype.iconHeight = function () {
        // CHANGE ME: change to parameter
        return 32;
    };

    Window_ITBIcon.prototype.setWindowLayer = function (windowLayer) {
        this._windowLayer = windowLayer;
    };

    Window_ITBIcon.prototype.update = function () {
        Window_Base.prototype.update.call(this);
        this.updateBattler();
        this.updateIconIndex();
        this.updateRedraw();
        this.updateDestinationX();
        this.updateOpacity();
        this.updatePositionX();
        this.updatePositionY();
    };

    Window_ITBIcon.prototype.updateBattler = function () {
        var changed = this._battler !== this._mainSprite._battler;

        // CHANGE ME: Added transformation to ITB?
//        if (this._battler && this._battler._ctbTransformed)
//            changed = true;
        if (!changed)
            return;
        this._battler = this._mainSprite._battler;

        // if battler sprite doesn't exit, remove icon
        if (!this._battler)
            return this.removeITBIcon();


        this._battler._itbTransformed = undefined;

// CHANGE ME: Get index from function instead of constant
//        this._iconIndex = this._battler.itbIcon();
        this._iconIndex = 0;

        if (this._iconIndex > 0) {
            this._image = ImageManager.loadSystem('IconSet');
        } else if (this._battler.isEnemy()) {
            if (this.isUsingSVBattler()) {
                var name = this._battler.svBattlerName();
                this._image = ImageManager.loadSvActor(name);
            } else {
                var battlerName = this._battler.battlerName();
                var battlerHue = this._battler.battlerHue();
                if ($gameSystem.isSideView()) {
                    this._image = ImageManager.loadSvEnemy(battlerName, battlerHue);
                } else {
                    this._image = ImageManager.loadEnemy(battlerName, battlerHue);
                }
            }
        } else if (this._battler.isActor()) {
            var faceName = this._battler.faceName();
            this._image = ImageManager.loadFace(faceName);
        }
        this._redraw = true;
    };

    Window_ITBIcon.prototype.removeITBIcon = function () {
        this.contents.clear();
        this.opacity = 0;
        this.contentsOpacity = 0;
    };

    Window_ITBIcon.prototype.isUsingSVBattler = function () {
        if (!Imported.YEP_X_AnimatedSVEnemies)
            return false;
        if (!this._battler.hasSVBattler())
            return false;
        // CHANGE ME: Use Parameter
        return false;
    };

    Window_ITBIcon.prototype.updateIconIndex = function () {
        if (!this._battler)
            return;
        var changed = this._iconIndex !== this._battler.itbIcon();
        if (changed) {
            this._iconIndex = this._battler.itbIcon();
            this._redraw = true;
        }
    };

    Window_ITBIcon.prototype.updateRedraw = function () {
        if (!this._redraw)
            return;
        if (!this._image)
            return;
        if (this._image.width <= 0)
            return;
        this._redraw = false;
        this.contents.clear();
        this.drawBorder();
        if (this._iconIndex > 0) {
            this.drawIcon(this._iconIndex, 4, 4);
        } else if (this._battler.isActor()) {
            this.redrawActorFace();
        } else if (this._battler.isEnemy()) {
            this.redrawEnemy();
        }
        this.redrawLetter();
    };

    Window_ITBIcon.prototype.drawBorder = function () {
        var width = this.contents.width;
        var height = this.contents.height;
        this.contents.fillRect(0, 0, width, height, this.gaugeBackColor());
        width -= 2;
        height -= 2;
        this.contents.fillRect(1, 1, width, height, this.ctbBorderColor());
        width -= 4;
        height -= 4;
        this.contents.fillRect(3, 3, width, height, this.gaugeBackColor());
        width -= 2;
        height -= 2;
        this.contents.fillRect(4, 4, width, height, this.ctbBackgroundColor());
    };

    Window_ITBIcon.prototype.ctbBorderColor = function () {
        return this.textColor(0);
        // CHANGE ME
//        var colorId = this._battler.itbBorderColor() || 0;
//        return this.textColor(colorId);
    };

    Window_ITBIcon.prototype.ctbBackgroundColor = function () {
        return this.textColor(0);
        // CHANGE ME
//        var colorId = this._battler.ctbBackgroundColor() || 0;
//        return this.textColor(colorId);
    };

    Window_ITBIcon.prototype.drawIcon = function (iconIndex, x, y) {
        var bitmap = ImageManager.loadSystem('IconSet');
        var pw = Window_Base._iconWidth;
        var ph = Window_Base._iconHeight;
        var sx = iconIndex % 16 * pw;
        var sy = Math.floor(iconIndex / 16) * ph;
        var ww = this.iconWidth();
        var wh = this.iconHeight();
        this.contents.blt(bitmap, sx, sy, pw, ph, x, y, ww, wh);
    };

    Window_ITBIcon.prototype.redrawActorFace = function () {
        var width = Window_Base._faceWidth;
        var height = Window_Base._faceHeight;
        var faceIndex = this._battler.faceIndex();
        var bitmap = this._image;
        var pw = Window_Base._faceWidth;
        var ph = Window_Base._faceHeight;
        var sw = Math.min(width, pw);
        var sh = Math.min(height, ph);
        var dx = Math.floor(Math.max(width - pw, 0) / 2);
        var dy = Math.floor(Math.max(height - ph, 0) / 2);
        var sx = faceIndex % 4 * pw + (pw - sw) / 2;
        var sy = Math.floor(faceIndex / 4) * ph + (ph - sh) / 2;
        var dw = this.contents.width - 8;
        var dh = this.contents.height - 8;
        this.contents.blt(bitmap, sx, sy, sw, sh, dx + 4, dy + 4, dw, dh);
    };

    Window_ITBIcon.prototype.redrawEnemy = function () {
        if (this.isUsingSVBattler()) {
            return this.redrawSVEnemy();
        }
        ;
        var bitmap = this._image;
        var sw = bitmap.width;
        var sh = bitmap.height;
        var dw = this.contents.width - 8;
        var dh = this.contents.height - 8;
        var dx = 0;
        var dy = 0;
        if (sw >= sh) {
            var rate = sh / sw;
            dh *= rate;
            dy += this.contents.height - 8 - dh;
        } else {
            var rate = sw / sh;
            dw *= rate;
            dx += Math.floor((this.contents.width - 8 - dw) / 2);
        }
        this.contents.blt(bitmap, 0, 0, sw, sh, dx + 4, dy + 4, dw, dh);
    };

    Window_ITBIcon.prototype.redrawSVEnemy = function () {
        var bitmap = this._image;
        var sw = bitmap.width / 9;
        var sh = bitmap.height / 6;
        var dw = this.contents.width - 8;
        var dh = this.contents.height - 8;
        var dx = 0;
        var dy = 0;
        if (sw >= sh) {
            var rate = sh / sw;
            dh *= rate;
            dy += this.contents.height - 8 - dh;
        } else {
            var rate = sw / sh;
            dw *= rate;
            dx += Math.floor((this.contents.width - 8 - dw) / 2);
        }
        this.contents.blt(bitmap, 0, 0, sw, sh, dx + 4, dy + 4, dw, dh);
    };

    Window_ITBIcon.prototype.redrawLetter = function () {
        if (!this._battler.isEnemy())
            return;
        if (!this._battler._plural)
            return;
        var letter = this._battler._letter;
        var dy = this.contents.height - this.lineHeight();
        this.drawText(letter, 0, dy, this.contents.width - 4, 'right');
    };

    Window_ITBIcon.prototype.destinationXConstant = function () {
        return this.contents.width + 2;
    };

    Window_ITBIcon.prototype.updateDestinationX = function () {
        if (!this._battler)
            return;
        if (this._battler.isDead())
            return;
        if (this._position === 'left')
            this.updateDestinationLeftAlign();
        if (this._position === 'center')
            this.updateDestinationCenterAlign();
        if (this._position === 'right')
            this.updateDestinationRightAlign();
        if (this._direction === 'left')
            this.updateDestinationGoingLeft();
        if (this._direction === 'right')
            this.updateDestinationGoingRight();
    };

    Window_ITBIcon.prototype.updateDestinationLeftAlign = function () {
        this._destinationX = 0;
    };

    Window_ITBIcon.prototype.updateDestinationCenterAlign = function () {
        this._destinationX = 0;
        var width = this.standardPadding() * 2;
        var size = BattleManager.itbTurnOrder().length;
        var constant = this.destinationXConstant();
        width += constant * size;
        width += constant / 2 - 2;
        this._destinationX = Math.floor((Graphics.boxWidth - width) / 2);
    };

    Window_ITBIcon.prototype.updateDestinationRightAlign = function () {
        this._destinationX = Graphics.boxWidth;
        this._destinationX -= this.standardPadding() * 2;
        var size = BattleManager.itbTurnOrder().length;
        var constant = this.destinationXConstant();
        this._destinationX -= constant * size;
        this._destinationX -= constant / 2;
        this._destinationX += 2;
    };

    BattleManager.itbTurnOrder = function () {
        var ITBbattlers = BattleManager._ITBBattlers;
        ITBbattlers.sort(function (a, b) {
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
        var battlers = BattleManager.allBattleMembers();
        battlers.sort(function (a, b) {
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


        ITBbattlers = ITBbattlers.concat(battlers);

        return ITBbattlers;
    };

    Window_ITBIcon.prototype.updateDestinationGoingLeft = function (index) {
        var index = BattleManager.itbTurnOrder().indexOf(this._battler);
        if (index < 0) {
            index = BattleManager.itbTurnOrder().length + 5;
        }

        var constant = this.destinationXConstant();
        this._destinationX += index * constant;
        if (index !== 0) {
            this._destinationX += constant / 2;
        }
    };

    Window_ITBIcon.prototype.updateDestinationGoingRight = function (index) {
        var index = BattleManager.itbTurnOrder().reverse().indexOf(this._battler);
        if (index < 0)
            index = -5;
        var constant = this.destinationXConstant();
        this._destinationX += index * constant;
        if (index === BattleManager.itbTurnOrder().length - 1) {
            this._destinationX += constant / 2;
        }
    };

    Window_ITBIcon.prototype.updateOpacity = function () {
        var rate = this.opacityFadeRate();
        if (this._foreverHidden)
            return this.reduceOpacity();
        if (this.isReduceOpacity())
            return this.reduceOpacity();
        if (BattleManager._victoryPhase) {
            this._foreverHidden = true;
            return this.reduceOpacity();
        }
        if (BattleManager._escaped) {
            this._foreverHidden = true;
            return this.reduceOpacity();
        }
        if (this._battler) {
            var index = BattleManager.itbTurnOrder().reverse().indexOf(this._battler);
            if (index < 0)
                return this.reduceOpacity();
        }
        this.contentsOpacity += rate;
    };

    Window_ITBIcon.prototype.opacityFadeRate = function () {
        return 8;
    };

    Window_ITBIcon.prototype.isReduceOpacity = function () {
        if (!this._lowerWindows) {
            if (this.isLargeWindowShowing())
                return true;
        }
        return this._windowLayer && this._windowLayer.x !== 0;
    };

    Window_ITBIcon.prototype.isLargeWindowShowing = function () {
        if (SceneManager._scene._itemWindow.visible)
            return true;
        if (SceneManager._scene._skillWindow.visible)
            return true;
        return false;
    };

    Window_ITBIcon.prototype.reduceOpacity = function () {
        this.contentsOpacity -= this.opacityFadeRate();
    };

    Window_ITBIcon.prototype.updatePositionX = function () {
        if (this._destinationX === undefined)
            return;
        if (BattleManager._escaped)
            return;
        var desX = this._destinationX;
        var moveAmount = Math.max(1, Math.abs(desX - this.x) / 4);
        if (this.x > desX)
            this.x = Math.max(this.x - moveAmount, desX);
        if (this.x < desX)
            this.x = Math.min(this.x + moveAmount, desX);
    };

    Window_ITBIcon.prototype.updatePositionY = function () {
        if (BattleManager._escaped)
            return;
        if (this._destinationX !== this.x) {
            var desX = this._destinationX;
            var cap1 = this.destinationY() - this.contents.height / 2;
            var cap2 = this.destinationY() + this.contents.height / 2;
            var moveAmount = Math.max(1, Math.abs(cap2 - this.y) / 4);
            if (this.x > desX)
                this.y = Math.max(this.y - moveAmount, cap1);
            if (this.x < desX)
                this.y = Math.min(this.y + moveAmount, cap2);
        } else if (this.destinationY() !== this.y) {
            var desY = this.destinationY();
            var moveAmount = Math.max(1, Math.abs(desY - this.y) / 4);
            if (this.y > desY)
                this.y = Math.max(this.y - moveAmount, desY);
            if (this.y < desY)
                this.y = Math.min(this.y + moveAmount, desY);
        }
    };

    Window_ITBIcon.prototype.destinationY = function () {
        // CHANGE ME: Use parameter instead of constant
        var value = 54 - this.standardPadding();
        var scene = SceneManager._scene;
        if (scene && scene._helpWindow.visible) {
            value = Math.max(value, scene._helpWindow.height);
        }
        if (!this._battler)
            return value;
        if (this._battler.isSelected()) {
            value -= this.contents.height / 4;
        }
        return value;
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
