/*:
 * @plugindesc v1.10c
 * 
 * <DreamX Capture Enemies>
 * @author DreamX
 *
 * @param Capture Success Message
 * @desc Message to display to when player captures an enemy Default: %1 was captured!
 * @default %1 was captured!
 *
 * @param Capture Fail Message
 * @desc Message to display to when player fails to capture an enemy Default: %1 was not captured!
 * @default %1 was not captured!
 *
 * @param Cannot Capture Message
 * @desc Message after capture attempt in battle where capture disallowed. Default: %2 blocked the capture!
 * @default %2 blocked the capture!
 *
 * @param Health Capture Rate Formula
 * @desc The formula that adds to the capture rate based on enemy health. Default: 50 - ((enemy.hp/enemy.mhp) * 50)
 * @default 50 - ((enemy.hp/enemy.mhp) * 50) 
 *
 * @param Capture Success Anim
 * @desc Animation to play on capture success. 0 - disable. Default: 0
 * @default 0
 *
 * @param Capture Fail Anim
 * @desc Animation to play on capture failure. 0 - disable. Default: 0
 * @default 0
 *
 * @param Message As Show Text
 * @desc true: display messages as show text command. false: display messages in the battlelog.
 * @default true
 * 
 * @param EXP From Capture
 * @desc Whether to give exp from enemies that were captured. Default: false
 * @default false
 * 
 * @param Capture Limit
 * @desc Limit of duplicates of captured enemy 0 - infinite Default: 0
 * @default 0
 * 
 * @param Capture Limit Message
 * @desc The message to display if player tries to capture an enemy whose limit was reached Default: The limit for %1 has been reached!
 * @default The limit for %1 enemy has been reached!
 * 
 * @param Level Up Instead of Duplicates
 * @desc Whether to level up a captured enemy when limit is reached. Default: false
 * @default false
 * 
 * @param Use Standard Level Up Message
 * @desc Whether to use the standard level up message instead of a custom one. Default: true
 * @default true
 * 
 * @param Level Up Message
 * @desc The custom message to display if an actor leveled up instead of being 
 * duplicated on capture. Default: %3 leveled up!
 * @default %3 leveled up!
 * 
 * @param Add In Battle
 * @desc true: Add captured enemies in battle. false: Add captured enemies after battle. Default: true
 * @default true
 * 
 * @param Capture Count Variable
 * @desc Add 1 to this variable id every time an enemy is captured. 0 - disable Default: 0
 * @default 0
 * 
 * @param Starting ID
 * @desc This will be the starting ID number for captured actors
 * so that they don't interfere with default actors.
 * @default 3000
 *
 * @help 
 * ============================================================================
 * How To Use
 * ============================================================================
 Must be used with Yanfly's Battle Engine Core to work properly.
 
 Put <capture_actor_id:x> into the notetag of an enemy, with x as the actor id.
 
 Put <capture> or <captureRate:x> into the notetag of a skill or item to 
 enable capture. <capture> guarantees capture while <captureRate:x> adds 
 x to the chance of capture.
 
 Put <captureRate:x> in the notetag of an actor to add x to the chance of 
 capture. Make sure this is the same actor id as you put in the enemy
 notetag.
 
 Put <captureRate:x> in the notetag of a state to add x to the chance of 
 capture when the enemy has that state.
 
 Put <capturedSwitch:x> with x as the switch id as an enemy notetag to set the 
 switch to true when the enemy is captured.
 
 Put <capturedVariable:x> with x as the variable id as an enemy notetag to 
 incremenet that variable by 1 every time the enemy type is captured.
 
 When you use the item or skill succesfully, the actor in that notetag will be 
 added. You can have duplicates. You can manually add actors to your party by 
 using the AddActor x y plugin command with x being the actor id and y being 
 the level. You can still have duplicates.
 
 Make a comment in the first page of a troop with <noCapture> to disable 
 capture for that battle. Make sure the comment only consists of that.
 
 Here are the text codes for the message parameters:
 %1 - The name of the enemy in the capture attempt
 %2 - The name of the troop in the database
 %3 - The name of the actor corresponding to the enemy
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * This plugin uses some code from Yanfly's Item Core. Please credit Yanfly.
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 * Thanks to Jeremy Cannady for reference from his Monster Breeding System script.
 * Thanks to Yanfly for code from their Item Core script.
 * 
 */

var Imported = Imported || {};
Imported.DreamX_CaptureEnemy = true;

var DreamX = DreamX || {};
DreamX.CaptureEnemy = DreamX.CaptureEnemy || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX Capture Enemies>');
    })[0].parameters; //Thanks to Iavra

    var parameterCaptureSuccessMsg = String(parameters['Capture Success Message']
            || '%1 was captured!');
    var parameterCaptureFailedMsg = String(parameters['Capture Fail Message']
            || '%1 was not captured!');
    var parameterCannotCaptureMsg = String(parameters['Cannot Capture Message']
            || '%2 blocked the capture!');
    var paramLvlUpMsg = String(parameters['Level Up Message']
            || '%3 leveled up!');
    var parameterHealthFormula = String(parameters['Health Capture Rate Formula']
            || '50 - ((enemy.hp/enemy.mhp) * 50)');
    var parameterCaptureAnim = parseInt(parameters['Capture Success Anim']
            || 0);
    var parameterCaptureFailAnim = parseInt(parameters['Capture Fail Anim']
            || 0);
    var parameterShowText = eval(parameters['Message As Show Text']
            || true);
    var paramEXPFromCapture = eval(parameters['EXP From Capture']
            || false);
    var paramLevelUpNoDuplicate = eval(parameters['Level Up Instead of Duplicates']
            || false);
    var paramDefaultLevelUpMsg = eval(parameters['Use Standard Level Up Message']
            || true);
    var paramAddInBattle = eval(parameters['Add In Battle']
            || true);
    var paramCaptureCountVariable = parseInt(parameters['Capture Count Variable']
            || 0);
    var parameterStartingId = parseInt(parameters['Starting ID']
            || 0);
    var parameterDuplicateLimit = parseInt(parameters['Capture Limit']
            || 0);
    var parameterDuplicateLimitMessage = String(parameters['Capture Limit Message']);

    DreamX.CaptureEnemy.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.CaptureEnemy.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'AddActor':
                if (args[0]) {
                    var level = args[1] ? args[1] : 1;
                    DreamX.CaptureEnemy.captureEnemy(args[0], level);
                }
                break;
            case 'SearchActorBaseId':
                if (args[0] && args[1]) {
                    DreamX.CaptureEnemy.searchBaseId(args[0], args[1]);
                }
                break;
        }
    };

//=============================================================================
// DataManager
//=============================================================================
    DreamX.CaptureEnemy.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.CaptureEnemy.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX.loadedCapturedEnemies) {
            this.setBaseDataActorLength();
            DreamX.loadedCapturedEnemies = true;
        }
        return true;
    };

    DataManager.setBaseDataActorLength = function () {
        this._baseActorsLength = $dataActors.length;
    };

    DataManager.setCapturedActorsLength = function () {
        for (; ; ) {
            if ($dataActors.length > parameterStartingId)
                break;
            $dataActors.push(null);
        }
    };

    DreamX.CaptureEnemy.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = DreamX.CaptureEnemy.DataManager_makeSaveContents.call(this);
        contents.capturedActors = this._capturedActors;
        return contents;
    };

    DreamX.CaptureEnemy.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DreamX.CaptureEnemy.DataManager_extractSaveContents.call(this, contents);
        this._capturedActors = contents.capturedActors;
        this.loadCapturedActors();
    };

    DataManager.loadCapturedActors = function () {
        // remove captured actors from other saves
        var difItems = $dataActors.length - this._baseActorsLength;
        $dataActors.splice(this._baseActorsLength, difItems);
        this.setCapturedActorsLength();
        $dataActors = $dataActors.concat(this._capturedActors);
    };

    DreamX.CaptureEnemy.DataManager_createGameObjects =
            DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        DreamX.CaptureEnemy.DataManager_createGameObjects.call(this);
        this._capturedActors = [];
        // remove captured actors from other saves
        this.loadCapturedActors();
    };

//=============================================================================
// Game_Actor
//=============================================================================
    DreamX.CaptureEnemy.Game_Actor_setup = Game_Actor.prototype.setup;
    Game_Actor.prototype.setup = function (actorId) {
        DreamX.CaptureEnemy.Game_Actor_setup.call(this, actorId);
        var actor = $dataActors[actorId];
        this._baseActorId = actor.baseActorId ? actor.baseActorId : actorId;
    };

    Game_Actor.prototype.baseActorId = function () {
        return this._baseActorId;
    };
//=============================================================================
// Game_Enemy
//=============================================================================
    DreamX.CaptureEnemy.searchBaseId = function (variableId, baseId) {
        if (!variableId || !baseId) {
            return;
        }

        var partyMember = $gameParty.members().filter(function (member) {
            return member.baseActorId() === baseId;
        });

        if (!partyMember[0]) {
            return;
        }

        var pMemberId = partyMember[0].actorId();

        if (!pMemberId) {
            return;
        }
        $gameVariables.setValue(variableId, pMemberId);
    };

    DreamX.CaptureEnemy.performCollapse = Game_Enemy.prototype.performCollapse;
    Game_Enemy.prototype.performCollapse = function () {
        DreamX.CaptureEnemy.performCollapse.call(this);
        var enemyName = this.originalName();
        var troopName = $gameTroop.troop().name;
        var actorId = parseInt(this.enemy().meta.capture_actor_id);
        var actor = $dataActors[actorId];
        if (!actor) {
            return;
        }
        var actorName = actor.name;
        var gameActor = $gameParty.allMembers().filter(function (actor) {
            return (actor.actorId() === actorId) || actor.baseActorId() === actorId;
        });
        gameActor = gameActor[0];

        if (this._wasCaptured) {
            DreamX.CaptureEnemy.displayMessage(parameterCaptureSuccessMsg.format(enemyName, troopName, actorName));
        }
        if (this._wasLevelUpCaptured) {
            DreamX.CaptureEnemy.levelUpDuplicateActors(actorId);
            if (paramDefaultLevelUpMsg === false) {
                DreamX.CaptureEnemy.displayMessage(paramLvlUpMsg.format(actorName, troopName, actorName));
            }
        }
    };

    DreamX.CaptureEnemy.Game_Enemy_exp = Game_Enemy.prototype.exp;
    Game_Enemy.prototype.exp = function () {
        if ((paramEXPFromCapture === false)
                && (this._wasCaptured === true
                        || this._wasLevelUpCaptured === true)) {
            return 0;
        }
        return DreamX.CaptureEnemy.Game_Enemy_exp.call(this);
    };

    Game_Troop.prototype.isCaptureEnabled = function () {
        var list = this.troop().pages[0].list;
        var enabled = true;
        list.forEach(function (cmd) {
            if (cmd.code === 108 && cmd.parameters[0] === "<noCapture>") {
                enabled = false;
            }
        });
        return enabled;
    };

    DreamX.CaptureEnemy.CalculateResult = function (item, target) {
        // if capture is disabled for this battle
        if ($gameTroop.isCaptureEnabled() === false) {
            return "BattleCaptureDisabled";
        }

        // if the capture missed
        if (DreamX.CaptureEnemy.decideCapture(item, target) === false) {
            return "CaptureMissed";
        }

        return "CaptureSuccess";
    };

    DreamX.CaptureEnemy.ItemTargetConfiguredProperly = function (item, dataEnemyMeta) {
        if ((!item.meta.captureRate && !item.meta.capture)
                || !dataEnemyMeta.capture_actor_id) {
            return false;
        }

        return true;
    };

    DreamX.CaptureEnemy.numActorDuplicates = function (actorId) {
        var allActors = $gameActors._data.concat($gameTemp._tempCaptureIDs);
        var enemiesCapturedThisBattle = 0;

        var gameActorsLength = $gameActors._data.filter(function (actor) {
            return actor && (actor.actorId() === actorId || actor._baseActorId === actorId);
        }).length;

        if (BattleManager._capturedEnemies) {
            enemiesCapturedThisBattle = BattleManager._capturedEnemies.filter(function (enemy) {
                return enemy.baseId === actorId;
            }).length;
        }

        return gameActorsLength + enemiesCapturedThisBattle;
    };

    DreamX.CaptureEnemy.levelUpDuplicateActors = function (actorId) {
        for (var i = 0; i < $gameParty.allMembers().length; i++) {
            var actor = $gameParty.allMembers()[i];
            if (actor.actorId() === actorId || actor.baseActorId() === actorId) {
                var newExp = actor.currentExp() + actor.nextRequiredExp();
                actor.changeExp(newExp, paramDefaultLevelUpMsg);
            }
        }
    };

    Game_Action.prototype.handleCaptureSuccess = function (target, dataEnemyMeta, baseActorId, numDuplicates) {
        var newActorLevel = 1;

        if (parameterDuplicateLimit > 0 && numDuplicates >= parameterDuplicateLimit && paramLevelUpNoDuplicate) {
            target._wasLevelUpCaptured = true;
        } else {
            if (target.level && target.level >= 1) {
                newActorLevel = target.level;
            }
            DreamX.CaptureEnemy.captureEnemy(baseActorId, newActorLevel);
            target._wasCaptured = true;
        }

        if (paramCaptureCountVariable >= 1) {
            var oldCaptureCount = $gameVariables.value(paramCaptureCountVariable);
            $gameVariables.setValue(paramCaptureCountVariable,
                    oldCaptureCount + 1);
        }

        if (parseInt(dataEnemyMeta.capturedSwitch)) {
            var capturedSwitchId = parseInt(dataEnemyMeta.capturedSwitch);
            if (capturedSwitchId >= 1) {
                $gameSwitches.setValue(capturedSwitchId, true);
            }
        }

        if (parseInt(dataEnemyMeta.capturedVariable)) {
            var capturedVariableId = parseInt(dataEnemyMeta.capturedVariable);
            if (capturedVariableId >= 1) {
                var oldVarValue = $gameVariables.value(capturedVariableId);
                $gameVariables.setValue(capturedVariableId,
                        oldVarValue + 1);
            }
        }

        if (parameterCaptureAnim >= 1) {
            target.startAnimation(parameterCaptureAnim, false, 0);
        }

        target.die();
    };

    Game_Action.prototype.handleCaptureAttempt = function (target, dataEnemyMeta) {
        var baseActorId = parseInt(dataEnemyMeta.capture_actor_id);
        var targetName = target.originalName();
        var troopName = $gameTroop.troop().name;
        var actorName = $dataActors[dataEnemyMeta.capture_actor_id].name;

        // record duplicates (number of times enemy has been captured as a copy)
        var numDuplicates = DreamX.CaptureEnemy.numActorDuplicates(baseActorId);
        // if number of duplicates exceeds limit and won't cause a level up
        if (parameterDuplicateLimit > 0 && numDuplicates >= parameterDuplicateLimit && !paramLevelUpNoDuplicate) {
            DreamX.CaptureEnemy.displayMessage(parameterDuplicateLimitMessage.format(targetName, troopName, actorName));
            return;
        }

        switch (DreamX.CaptureEnemy.CalculateResult(this.item(), target)) {
            case "BattleCaptureDisabled":
                DreamX.CaptureEnemy.displayMessage();
                break;
            case "CaptureMissed":
                if (parameterCaptureFailAnim >= 1) {
                    target.startAnimation(parameterCaptureFailAnim, false, 0);
                }
                DreamX.CaptureEnemy.displayMessage(parameterCaptureFailedMsg.format(targetName, troopName, actorName));
                break;
            case "CaptureSuccess":
                this.handleCaptureSuccess(target, dataEnemyMeta, baseActorId, numDuplicates);
                break;
        }
    };

    DreamX.CaptureEnemy.Game_Action_applyItemUserEffect = Game_Action.prototype.applyItemUserEffect;
    Game_Action.prototype.applyItemUserEffect = function (target) {
        DreamX.CaptureEnemy.Game_Action_applyItemUserEffect.call(this, target);
        this.makeSuccess(target);

        // if target is not enemy
        if (!target.isEnemy())
            return;

        var item = this.item();
        var dataEnemyMeta = $dataEnemies[target.enemyId()].meta;

        // if no notetag for corresponding actor
        if (!$dataActors[dataEnemyMeta.capture_actor_id]) {
            return;
        }

        // if the item or target isn't configured correctly, return
        if (DreamX.CaptureEnemy.ItemTargetConfiguredProperly(item, dataEnemyMeta) === false) {
            return;
        }

        this.handleCaptureAttempt(target, dataEnemyMeta);
    };

    DreamX.CaptureEnemy.displayMessage = function (message) {
        if (parameterShowText === true) {
            $gameMessage.add(message);
        } else {
            SceneManager._scene._logWindow.push('addText', message);
        }
    }

    DreamX.CaptureEnemy.stateCaptureRate = function (target) {
        var rate = 0;
        target.states().forEach(function (state) {
            rate += parseInt(state.meta.captureRate) || 0;
        });
        return rate;
    };

    DreamX.CaptureEnemy.healthCaptureRate = function (enemy) {
        return eval(parameterHealthFormula);
    };

    DreamX.CaptureEnemy.decideCapture = function (item, target) {
        if (item.meta.capture)
            return true;
        var dataTarget = $dataEnemies[target._enemyId];
        var dataTargetActor = $dataActors[dataTarget.meta.capture_actor_id];
        var rateCaptureItem = parseInt(item.meta.captureRate) || 0;
        var rateCaptureTarget = parseInt(dataTargetActor.meta.captureRate) || 0;
        var likelihood = rateCaptureItem + rateCaptureTarget +
                DreamX.CaptureEnemy.stateCaptureRate(target)
                + DreamX.CaptureEnemy.healthCaptureRate(target);

        if (likelihood <= 0)
            return false;
        var diceRoll = Math.floor((Math.random() * 100) + 1);

        if (diceRoll <= likelihood)
            return true;

        return false;
    };

    DreamX.CaptureEnemy.captureEnemy = function (actorId, level) {
        // default to level 1 if level not defined
        level = level || 1;
        var dataActor = $dataActors[actorId];
        // make a deep copy
        var CapturedEnemy = JSON.parse(JSON.stringify(dataActor));

        // give a new id
        CapturedEnemy.id = $dataActors.length;
        CapturedEnemy.baseActorId = actorId;

        // give a new starting level
        CapturedEnemy.initialLevel = parseInt(level);

        DataManager._capturedActors.push(CapturedEnemy);
        $dataActors.push(CapturedEnemy);

        $gameActors.actor(CapturedEnemy.id).setup(CapturedEnemy.id);

        if ($gameParty.inBattle() && paramAddInBattle === false) {
            BattleManager._capturedEnemies.push({newId: CapturedEnemy.id, baseId: actorId});
        } else {
            $gameParty.addActor(CapturedEnemy.id);
        }
    };

    DreamX.CaptureEnemy.BattleManager_initMembers = BattleManager.initMembers;
    BattleManager.initMembers = function () {
        DreamX.CaptureEnemy.BattleManager_initMembers.call(this);
        this._capturedEnemies = [];
    };

    DreamX.CaptureEnemy.BattleManager_updateBattleEnd = BattleManager.updateBattleEnd;
    BattleManager.updateBattleEnd = function () {
        DreamX.CaptureEnemy.BattleManager_updateBattleEnd.call(this);
        if (paramAddInBattle === false) {
            for (var i = 0; i < this._capturedEnemies.length; i++) {
                $gameParty.addActor(this._capturedEnemies[i].newId);
            }
        }
        this._capturedEnemies = [];
    };

    //=============================================================================
// Compatibility
//=============================================================================

})();
