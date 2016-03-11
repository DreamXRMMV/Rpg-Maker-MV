/*:
 * @plugindesc v1.0 Replace animation sound effects with notetags.
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
 * @help Important!
 The weapon/armor sound effect combinations are defined in 
 WeaponArmorSoundEffects.json which should be put into your root project 
 folder. It must exist and be configured properly (use standard json syntax) 
 in order for the plugin to work properly. Find a sample json file link below. 
 When configuring the json, use upper case except with sound effect file names 
 (use the same case as the file names for them).
 
 Important! This plugin requires Yanfly's Battle Engine Core.

 Parameter "SEs to Replace" are the sound effects to replace globally when a 
 skill is set to 
 replace sound effects.
 
 Parameter "Actor Armor Equipment Type ID" is the equipment type ID that is 
 tested for actors to decide what sound effect to play when they are hit by an 
 animation that is set to replace sound effects. For example, if you were using 
 the default equipment types, you could use 4 to use "Body" equipment type. 
 
 Use <replaceSE:1> as a notetag on a skill to enable that skill have its 
 animation sound effects 
 replaced. Those sound effects must be configured to be replaced either through 
 the parameter or this notetag: 
 <SEsToReplace:x y> with letters being the sound effect file names.
 Example: <SEsToReplace:Blow1 Slash1 Fire1> 
 There is no limit on how many you can have.
 
 Use <SEWeaponType:x> with x being the identifier on a weapon or enemy. It's 
 their weapon type for the json file. Example: <SEWeaponType:Sword>
 The plugin will only test the first weapon an actor has.
 
 Use <SEArmorType:x> with x being the identifier on an armor piece,  actor or 
 enemy. It's their armor type for the json file. 
 Example: <SEArmorType:Chainmail>
 The armor notetag takes precedence over the actor notetag. The armor equip 
 type must be the same as the one configured as a parameter. If an actor does 
 not have an armor piece of the appropriate equipment type or that armor piece 
 does not have the notetag, it'll use the actor notetag if the actor has it. 
 
 If there is no <SEArmorType:x> notetag for the target, then it'll be 
 considered "NONE" in the json.
 
 Note that the animation and therefore sounds will play even if the action 
 misses. This is a separate issue that is not caused by this plugin.
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
    var paramArmorTypeId = parseInt(parameters['Actor Armor Equipment Type ID'] || 0);

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
        this.loadData('WeaponArmorSoundEffects.json', this.seLoadCallBack);
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

    DreamX.WeaponArmorSoundEffects.Game_Battler_startAnimation = Game_Battler.prototype.startAnimation;
    Game_Battler.prototype.startAnimation = function (animationId, mirror, delay) {
        // return if notetag isnt present
        var item = this._DXWASE_item;
        var itemMeta = item.meta;
        if (!itemMeta.replaceSE) {
            return DreamX.WeaponArmorSoundEffects.BattleManager_actionActionAnimation.call(this, actionArgs);
        }

        // get subject and weapon type
        var subject = this._DXWASE_attacker;

        var weaponTypeMeta;
        if (subject.isActor()) {
            if (!subject.weapons()[0]) {
                // return if actor doesn't have a weapon in slot 1
                return DreamX.WeaponArmorSoundEffects.BattleManager_actionActionAnimation.call(this, actionArgs);
            }
            weaponTypeMeta = subject.weapons()[0].meta;
        } else {
            weaponTypeMeta = $dataEnemies[subject.enemyId()].meta;
        }
        if (!weaponTypeMeta.SEWeaponType) {
            // return if weapon/enemy doesn't have a se weapon type
            return;
        }
        var weaponType = weaponTypeMeta.SEWeaponType.trim().toUpperCase();

        var armorTypeMeta;
        var SETarget = this;
        if (SETarget.isActor()) {
            armorTypeMeta = $dataActors[SETarget.actorId()].meta;
            for (var i = 0; i < SETarget.armors().length; i++) {
                if (SETarget.armors()[i].etypeId === paramArmorTypeId) {
                    if (SETarget.armors()[i].meta.SEArmorType) {
                        armorTypeMeta = SETarget.armors()[i].meta;
                    }
                }
            }
        } else {
            armorTypeMeta = $dataEnemies[SETarget.enemyId()].meta;
        }
        var armorType = armorTypeMeta.SEArmorType
                ? armorTypeMeta.SEArmorType.trim().toUpperCase()
                : "NONE";

        var animID = animationId;
        var animation;

        if (animID !== -1) {
            animation = $dataAnimations[animID];
        } else {
            if (subject.isActor()) {
                animation = $dataAnimations[subject.attackAnimationId1()];
            }
        }

        if (animation) {
            // make a deep copy
            var newAnim = JSON.parse(JSON.stringify(animation));
            newAnim.timings.forEach(function (timing) {
                if (timing.se
                        && DreamX.WeaponArmorSoundEffects.
                        shouldReplaceSE(timing.se.name, weaponTypeMeta, itemMeta)) {
                    if (DreamX.WeaponArmorSoundEffects.data[weaponType][armorType]) {
                        timing.se.name = DreamX.WeaponArmorSoundEffects.data[weaponType][armorType];
                    }
                }
            }, this);
            newAnim.id = $dataAnimations.length - 1;
            $dataAnimations.push(newAnim);

            animationId = $dataAnimations.length - 1;
        }
        DreamX.WeaponArmorSoundEffects.Game_Battler_startAnimation.call(this, animationId, mirror, delay);
        this._DXWASE_attacker = null;
        this._DXWASE_item = null;
    };

    DreamX.WeaponArmorSoundEffects.shouldReplaceSE = function (passSE, weaponTypeMeta, itemMeta) {
        for (var i = 0; i < paramReplaceSEs.length; i++) {
            if (paramReplaceSEs[i].match(passSE)) {
                return true;
            }
        }
        if (weaponTypeMeta.SEsToReplace) {
            var SEsToReplaceWeapon = weaponTypeMeta.SEsToReplace.split(" ");
            for (var i = 0; i < SEsToReplaceWeapon.length; i++) {
                if (SEsToReplaceWeapon[i].match(passSE)) {
                    return true;
                }
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

})();
