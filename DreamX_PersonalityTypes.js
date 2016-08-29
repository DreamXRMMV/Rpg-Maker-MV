/*:
 * @plugindesc
 * @author DreamX
 * 
 * @param Personality Types
 * @desc Personalities separated by a space Example: Mean Nice Lazy
 * @default 
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * To access an actor's personality you check the meta tag PersonalityType
 * 
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_PersonalityTypes = true;

var DreamX = DreamX || {};
DreamX.PersonalityTypes = DreamX.PersonalityTypes || {};

DreamX.Parameters = PluginManager.parameters('DreamX_PersonalityTypes');
DreamX.Param = DreamX.Param || {};

DreamX.Param.DXRandPersonalityTypes = DreamX.Parameters['Personality Types'].split(" ");

DreamX.PersonalityTypes.DreamX_CaptureEnemy_captureEnemy = DreamX.CaptureEnemy.captureEnemy;
DreamX.CaptureEnemy.captureEnemy = function (actorId, level) {
    DreamX.PersonalityTypes.DreamX_CaptureEnemy_captureEnemy.call(this, actorId, level);
    
    var personalities = DreamX.Param.DXRandPersonalityTypes;
    
    var newActor = DataManager._capturedActors[DataManager._capturedActors.length - 1];
    if (newActor.meta.RandomizePersonalityOnCapture) {
        var diceRoll = personalities[Math.floor(Math.random() * personalities.length)];
        newActor.meta.PersonalityType = diceRoll;
    }
};