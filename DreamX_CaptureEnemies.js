var Imported = Imported || {};
Imported.DreamX_CaptureEnemy = true;

var DreamX = DreamX || {};
DreamX.CaptureEnemy = DreamX.CaptureEnemy || {};

/*:
 * @plugindesc Capture enemies
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 Put <capture:1> into the notetag of a skill or item. Put <capture_actor_id:x>
 into the notetag of an enemy, with x as the actor id. When you use the item
 or skill, the actor in that notetag will be added. You can have duplicates.
 You can manually add enemies to your party by using AddEnemy x with x being 
 the actor id. You can still have duplicates.
 * Credits: DreamX
 * Terms Of Use: Credit DreamX, may be modified & used for noncommercial and commercial games
 */

(function () {

    DreamX.CaptureEnemy.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.CaptureEnemy.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'AddEnemy':
                if (args[0]) {
                    DreamX.CaptureEnemy.captureEnemy(args[0]);
                }
                break;
        }
    };

    DreamX.CaptureEnemy.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DreamX.CaptureEnemy.DataManager_extractSaveContents.call(this, contents);
        for (var i = 0; i < $gameSystem.capturedActors.length; i++) {
            $dataActors.push($gameSystem.capturedActors[i]);
        }
    };

    DreamX.CaptureEnemy.Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function () {
        DreamX.CaptureEnemy.Game_System_initialize.call(this);
        this.capturedActors = [];
    };

    DreamX.CaptureEnemy.Game_Action_apply = Game_Action.prototype.apply;
    Game_Action.prototype.apply = function (target) {
        DreamX.CaptureEnemy.Game_Action_apply.call(this, target);
        var item = this.item();
        if (item.meta.capture && target.isEnemy()
                && $dataEnemies[target._enemyId].meta.capture_actor_id) {
            DreamX.CaptureEnemy.captureEnemy($dataEnemies[target._enemyId].meta.capture_actor_id);
        }
    };

    DreamX.CaptureEnemy.captureEnemy = function (actorId) {
        var monsterType = $dataActors[actorId];
        CapturedEnemy = {
            "id": $dataActors.length,
            "traits": monsterType["traits"],
            "initialLevel": 1,
            "maxLevel": monsterType["maxLevel"],
            "profile": monsterType["profile"],
            "battlerName": monsterType["battlerName"],
            "characterIndex": monsterType["characterIndex"],
            "characterName": monsterType["characterName"],
            "faceIndex": monsterType["faceIndex"],
            "faceName": monsterType["faceName"],
            "meta": monsterType["meta"],
            "name": monsterType["name"],
            "nickname": monsterType["nickname"],
            "note": monsterType["note"],
            "classId": monsterType["classId"],
            "equips": []
        };
        $dataActors.push(CapturedEnemy);
        $gameParty.addActor(CapturedEnemy.id);
        $gameSystem.capturedActors.push(CapturedEnemy);
    };

})();
