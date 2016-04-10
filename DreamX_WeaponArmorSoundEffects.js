/*:
 * @plugindesc v1.1 Replace animation sound effects with notetags.
 * <DreamX WeaponArmorSoundEffects>
 * @author
 *
 * @param SEs to Replace
 * @desc Default SEs to replace separated by spaces. Example: Slash1 Blow1
 * @default 
 * 
 * @param Actor Armor Equipment Type ID
 * @desc The Equipment Types id that is tested for actors for their armor. Example: 4 
 * @default 0
 * 
 * @param Json Filename
 * @desc The filename for the json file. Do not include file type. Default: WeaponArmorSoundEffects
 * @default WeaponArmorSoundEffects
 * 
 * @param Json Folder
 * @desc The folder where the json is. Leave blank for root folder. Example: data/
 * @default 
 * 
 * @param Play Weapon Use SE
 * @desc Whether to play an SE when a weapon motion is performed. Default: false
 * @default false
 * 
 * @param Weapon Use Volume
 * @desc The volume of the sound effect that can play on weapon use. Default: 80
 * @default 80
 * 
 * @help  Important! This plugin requires Yanfly's Battle Engine Core and 
 * requires the use of a json file.
 * 
 * The weapon/armor sound effect combinations are defined in a json file. The 
 * filename and folder are defined by parameters. 
 * The default is WeaponArmorSoundEffects.json in the root folder.
 * 
 * It must be configured properly in order for the plugin to work properly.  
 * When configuring the json, use upper case except with sound effect file names 
 * (use the same case as the file names for them). You can specify more than 
 * one file name by separating them with a space. One of them will be chosen 
 * at random.
 * 
 * Parameter "SEs to Replace" are the sound effects to replace globally when a 
 * skill is set to replace sound effects.
 * 
 * Parameter "Actor Armor Equipment Type ID" is the equipment type ID that is 
 * tested for actors to decide what sound effect to play when they are hit by an 
 * animation that is set to replace sound effects. For example, if you were 
 * using the default equipment types, you could use 4 to use "Body" equipment 
 * type. 
 * 
 * ---
 * Use <replaceSE:1> as a notetag on a skill to enable that skill have its 
 * animation sound effects replaced. Those sound effects must be configured to 
 * be replaced either through the parameter or this notetag: 
 * <SEsToReplace:x y> with letters being the sound effect file names.
 * Example: <SEsToReplace:Blow1 Slash1 Fire1> 
 * There is no limit on how many you can have.
 * ---
 * Use <SEWeaponType:x> with x being the identifier on an actor, enemy, weapon,
 * state or skill.
 * It's the weapon type for the json file. 
 * Example: <SEWeaponType:Sword>
 * A skill has the highest priority, then state, then weapon and then the 
 * database actor/enemy.
 * 
 * The plugin will only test the first weapon an actor has.
 * If there is no <SEWeaponType:x> notetag for the attacker, then it'll be 
 * considered "NONE" in the json.
 * ---
 * Use <SEArmorType:x> with x being the identifier on an actor, enemy, armor or 
 * state. 
 * It's their armor type for the json file.
 * Example: <SEArmorType:Chainmail>
 * 
 * A state has the highest priority, followed by armor and then the 
 * database actor/enemy.
 *
 * For armors, the armor equip type must be the same as the one configured as a 
 * parameter.
 * If there is no <SEArmorType:x> notetag for the target, then it'll be 
 * considered "NONE" in the json.
 * ---
 * If there is no sound file name for a weapon/armor combination, the sound  
 * effect of the animation from the database will play as normal.
 * 
 * If you are using my Predetermine Results plugin, you can specify the miss and 
 * critical sounds in the json file.
 * ---
 * When a battler with a <SEWeaponType:x> notetag performs a weapon motion, a
 * sound effect can be played. This is defined in the json file under "USE"
 * The parameter "Play Weapon Use SE" must be true.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Iavra for providing load and plugin parameter help.
 */

var Imported = Imported || {};
Imported.DreamX_WeaponArmorSoundEffects = true;

var DreamX = DreamX || {};
DreamX.WeaponArmorSoundEffects = DreamX.WeaponArmorSoundEffects || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX WeaponArmorSoundEffects>');
    })[0].parameters; //Thanks to Iavra

    var paramReplaceSEs = String(parameters['SEs to Replace'] || '').split(" ");
    var paramFileName = String(parameters['Json Filename'] || 'WeaponArmorSoundEffects');
    var paramFileFolder = String(parameters['Json Folder'] || '');
    var paramArmorTypeId = parseInt(parameters['Actor Armor Equipment Type ID'] || 0);
    var paramUseVol = parseInt(parameters['Weapon Use Volume'] || 80);
    var paramPlayUse = eval(parameters['Play Weapon Use SE'] || false);

    DreamX.WeaponArmorSoundEffects.DataManager_loadDatabase = DataManager.loadDatabase;
    DataManager.loadDatabase = function () {
        DreamX.WeaponArmorSoundEffects.DataManager_loadDatabase.call(this);
        if (!Imported.YEP_BattleEngineCore) {
            throw new Error("DreamX WeaponArmorSoundEffects requires Yanfly "
                    + "Battle Engine Core");
        }
    };

    DreamX.WeaponArmorSoundEffects.Scene_Boot_isReady = Scene_Boot.prototype.isReady;
    Scene_Boot.prototype.isReady = function () {
        if (!DreamX.WeaponArmorSoundEffects.loaded
                || DreamX.WeaponArmorSoundEffects.loaded === false) {
            return false;
        }
        return DreamX.WeaponArmorSoundEffects.Scene_Boot_isReady.call(this);
    };

    DreamX.WeaponArmorSoundEffects.loadSEData = function () {
        this.loadData(this.SEDataFileName(), this.seLoadCallBack);
    };

    DreamX.WeaponArmorSoundEffects.SEDataFileName = function () {
        return paramFileFolder + paramFileName + ".json";
    };

    DreamX.WeaponArmorSoundEffects.seLoadCallBack = function (data) {
        DreamX.WeaponArmorSoundEffects.data = data;
        DreamX.WeaponArmorSoundEffects.loaded = true;
    };

    // thanks to Iavra
    DreamX.WeaponArmorSoundEffects.loadData = function (url, callback) {
        var request = new XMLHttpRequest();
        request.open('GET', url);
        request.onload = function () {
            callback(JSON.parse(request.response));
        };
        request.onerror = function () {
            throw new Error("There was an error loading the file '" + url + "'.");
        };
        request.send();
    };

    DreamX.WeaponArmorSoundEffects.Scene_Boot_create = Scene_Boot.prototype.create;
    Scene_Boot.prototype.create = function () {
        DreamX.WeaponArmorSoundEffects.Scene_Boot_create.call(this);
        DreamX.WeaponArmorSoundEffects.loaded = false;
        DreamX.WeaponArmorSoundEffects.loadSEData();
    };

    DreamX.WeaponArmorSoundEffects.Game_Battler_initMembers = Game_Battler.prototype.initMembers;
    Game_Battler.prototype.initMembers = function () {
        DreamX.WeaponArmorSoundEffects.Game_Battler_initMembers.call(this);
        this._DXWASE_attacker = null;
        this._DXWASE_item = null;
    };

    Game_Actor.prototype.DXWASEArmorArmorTypeMeta = function () {
        // default is actor meta
        var armorTypeMeta;

        // check armors
        for (var i = 0; i < this.armors().length; i++) {
            var armor = this.armors()[i];
            if (armor === paramArmorTypeId) {
                if (armor.meta.SEArmorType) {
                    armorTypeMeta = armor.meta;
                }
            }
        }

        return armorTypeMeta;
    };

    Game_Battler.prototype.DXWASEStateArmorTypeMeta = function () {
        var armorTypeMeta;

        // check states
        for (var i = 0; i < this.states().length; i++) {
            var state = this.states()[i];
            if (state.meta.SEArmorType) {
                armorTypeMeta = state.meta;
            }
        }

        return armorTypeMeta;
    };

    Game_Battler.prototype.DXWASEArmorTypeMeta = function () {
        // default is actor/enemy meta
        var armorTypeMeta = this.isActor() ? this.actor().meta : this.enemy().meta;

        // check armors
        if (this.isActor() && this.DXWASEArmorArmorTypeMeta()) {
            armorTypeMeta = this.DXWASEArmorArmorTypeMeta();
        }

        // check states
        if (this.DXWASEStateArmorTypeMeta()) {
            armorTypeMeta = this.DXWASEStateArmorTypeMeta();
        }

        return armorTypeMeta;
    };

    Game_Battler.prototype.DXWASEArmorType = function () {
        var armorTypeMeta;
        // default armor type is none
        var armorType = "NONE";

        if (this.DXWASEArmorTypeMeta().SEArmorType) {
            armorTypeMeta = this.DXWASEArmorTypeMeta();
            armorType = armorTypeMeta.SEArmorType.trim().toUpperCase();
        }

        return armorType;
    };

    Game_Battler.prototype.DXWASEStateWeaponTypeMeta = function () {
        var weaponTypeMeta;

        // check states
        for (var i = 0; i < this.states().length; i++) {
            var state = this.states()[i];
            if (state.meta.SEWeaponType) {
                weaponTypeMeta = state.meta;
            }
        }

        return weaponTypeMeta;
    };

    Game_Battler.prototype.DXWASEWeaponWeaponTypeMeta = function () {
        var weaponTypeMeta;

        if (this.weapons()[0] && this.weapons()[0].meta.SEWeaponType) {
            weaponTypeMeta = this.weapons()[0].meta;
        }

        return weaponTypeMeta;
    };

    Game_Battler.prototype.DXWASEWeaponTypeMeta = function () {
        // default is actor/enemy meta
        var weaponTypeMeta = this.isActor() ? this.actor().meta : this.enemy().meta;

        // check weapons
        if (this.isActor() && this.DXWASEWeaponWeaponTypeMeta()) {
            weaponTypeMeta = this.DXWASEWeaponWeaponTypeMeta();
        }

        // check states
        if (this.DXWASEStateWeaponTypeMeta()) {
            weaponTypeMeta = this.DXWASEStateWeaponTypeMeta();
        }

        return weaponTypeMeta;
    };

    Game_Battler.prototype.DXWASEWeaponType = function () {
        var weaponTypeMeta;
        // default weapon type is none
        var weaponType = "NONE";

        if (this.DXWASEWeaponTypeMeta().SEWeaponType) {
            weaponTypeMeta = this.DXWASEWeaponTypeMeta();
            weaponType = weaponTypeMeta.SEWeaponType.trim().toUpperCase();
        }

        return weaponType;
    };

    Game_Battler.prototype.DXWASEMakeAnimation = function (animationId) {
        var newId;
        var item = this._DXWASE_item;
        var attacker = this._DXWASE_attacker;
        this._DXWASE_attacker = null;
        this._DXWASE_item = null;

        // if item (skill used) is not set, return
        if (!item) {
            return;
        }
        // if subject (attacker, user of skill) is not set, return
        if (!attacker) {
            return;
        }

        // set item meta
        var itemMeta = item.meta;

        // if skill is not set to replace SE, return
        if (!itemMeta.replaceSE) {
            return;
        }

        var weaponType;
        if (itemMeta.SEWeaponType) {
            weaponType = itemMeta.SEWeaponType.toUpperCase();

        } else {
            weaponType = attacker.DXWASEWeaponType();
        }

        // if information for the weapon type doesn't exist
        if (!DreamX.WeaponArmorSoundEffects.data[weaponType]) {
            return;
        }

        var armorType = this.DXWASEArmorType();

        // if information for this weapon/armor combo doesn't exist
        if (!DreamX.WeaponArmorSoundEffects.data[weaponType][armorType]) {
            return;
        }

        var animID = animationId;
        var animation;

        if (animID !== -1) {
            animation = $dataAnimations[animID];
        } else {
            if (attacker.isActor()) {
                animation = $dataAnimations[attacker.attackAnimationId1()];
            }
        }

        if (animation) {
            // make a deep copy
            var newAnim = JSON.parse(JSON.stringify(animation));
            newAnim.timings.forEach(function (timing) {
                if (timing.se
                        && DreamX.WeaponArmorSoundEffects.
                        shouldReplaceSE(timing.se.name, itemMeta)) {
                    var weaponSEData = DreamX.WeaponArmorSoundEffects.data[weaponType];
                    var soundName;
                    var result = this._preCalculatedResult;

                    if (result) {
                        if ((result.missed || result.evaded) && weaponSEData["MISS"]) {
                            soundName = weaponSEData["MISS"];
                        } else if (result.critical
                                && weaponSEData[armorType]
                                && weaponSEData[armorType]["CRITICAL"]) {
                            soundName = weaponSEData[armorType]["CRITICAL"];
                        }
                    }

                    if (!soundName && weaponSEData[armorType]) {
                        if (weaponSEData[armorType]["NORMAL"] !== undefined) {
                            soundName = weaponSEData[armorType]["NORMAL"];
                        } else {
                            soundName = weaponSEData[armorType];
                        }
                    }

                    if (soundName) {
                        var splitSENames = soundName.split(" ");
                        // if more than one sound file name was entered, choose 
                        // one randomly
                        if (splitSENames.length > 1) {
                            var diceRoll = Math.floor(Math.random() * splitSENames.length);
                            soundName = splitSENames[diceRoll];
                        }
                        timing.se.name = soundName;
                    }
                }
            }, this);
            newAnim.id = $dataAnimations.length;
            $dataAnimations.push(newAnim);
            newId = newAnim.id;
        }
        return newId;
    };

    DreamX.WeaponArmorSoundEffects.Game_Battler_startAnimation = Game_Battler.prototype.startAnimation;
    Game_Battler.prototype.startAnimation = function (animationId, mirror, delay) {
        var newId = this.DXWASEMakeAnimation(animationId);
        if (newId) {
            animationId = newId;
        }
        DreamX.WeaponArmorSoundEffects.Game_Battler_startAnimation.call(this, animationId, mirror, delay);
    };

    DreamX.WeaponArmorSoundEffects.shouldReplaceSE = function (passSE, itemMeta) {
        for (var i = 0; i < paramReplaceSEs.length; i++) {
            if (paramReplaceSEs[i].match(passSE)) {
                return true;
            }
        }

        if (itemMeta.SEsToReplace) {
            var SEsToReplaceItem = itemMeta.SEsToReplace.split(" ");
            for (var i = 0; i < SEsToReplaceItem.length; i++) {
                if (SEsToReplaceItem[i].match(passSE)) {
                    return true;
                }
            }
        }
    };

    DreamX.WeaponArmorSoundEffects.BattleManager_actionActionAnimation
            = BattleManager.actionActionAnimation;
    BattleManager.actionActionAnimation = function (actionArgs) {
        // get item
        var item = this._action.item();

        // get subject and weapon type
        var subject = this._subject;

        // get targets
        if (actionArgs && actionArgs[0]) {
            var targets = this.makeActionTargets(actionArgs[0]);
        } else {
            var targets = this._targets;
        }

        for (var i = 0; i < targets.length; i++) {
            targets[i]._DXWASE_attacker = subject;
            targets[i]._DXWASE_item = item;
        }
        DreamX.WeaponArmorSoundEffects.BattleManager_actionActionAnimation.call(this, actionArgs);
    };

    DreamX.WeaponArmorSoundEffects.Game_Actor_performAttack = Game_Actor.prototype.performAttack;
    Game_Actor.prototype.performAttack = function () {
        DreamX.WeaponArmorSoundEffects.Game_Actor_performAttack.call(this);
        if (!paramPlayUse) return;
        var weaponType = this.DXWASEWeaponType();
        DreamX.WeaponArmorSoundEffects.performUseSound(weaponType);
    };

    if (Imported.YEP_X_AnimatedSVEnemies) {
        DreamX.WeaponArmorSoundEffects.Game_Enemy_performAttack = Game_Enemy.prototype.performAttack;
        Game_Enemy.prototype.performAttack = function () {
            DreamX.WeaponArmorSoundEffects.Game_Enemy_performAttack.call(this);
            if (!this.hasSVBattler() || !paramPlayUse) {
                return;
            }
            var weaponType = this.DXWASEWeaponType();
            DreamX.WeaponArmorSoundEffects.performUseSound(weaponType);
        };
    }

    DreamX.WeaponArmorSoundEffects.performUseSound = function (weaponType) {
        if (!weaponType)
            return;
        var weaponSEData = this.data[weaponType];
        if (!weaponSEData)
            return;
        var useData = weaponSEData["USE"];
        if (!useData)
            return;
        var se = {
            name: useData,
            volume: paramUseVol,
            pitch: 100,
            pan: 0
        };
        AudioManager.playSe(se);
    };

})();
