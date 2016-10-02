/*:
 * @plugindesc
 * @author DreamX
 * @help
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * PlayScreenAnimation x y z
 *  x: The animation id. Required.
 *  y: Whether to mirror (true or false). Optional, defaults to false.
 *  z: The delay. Optional, defaults to 0.  
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
Imported.DreamX_ScreenAnimation = true;

var DreamX = DreamX || {};
DreamX.ScreenAnimation = DreamX.ScreenAnimation || {};

DreamX.Parameters = PluginManager.parameters('DreamX_ScreenAnimation');
DreamX.Param = DreamX.Param || {};

//==========================================================================
// Game_Interpreter
//==========================================================================
DreamX.ScreenAnimation.Game_Interpreter_pluginCommand =
        Game_Interpreter.prototype.pluginCommand;
Game_Interpreter.prototype.pluginCommand = function (command, args) {
    DreamX.ScreenAnimation.Game_Interpreter_pluginCommand.call(this, command, args);
    switch (command) {
        case 'PlayScreenAnimation':
            SceneManager._scene._spriteset.startAnimation(args[0], eval(args[1]), eval(args[2]));
            break;
    }
};

DreamX.ScreenAnimation.Spriteset_Base_createUpperLayer = Spriteset_Base.prototype.createUpperLayer;
Spriteset_Base.prototype.createUpperLayer = function() {
    DreamX.ScreenAnimation.Spriteset_Base_createUpperLayer.call(this);
    this._spritesetAnimation = new Sprite_Base();

    this.addChild(this._spritesetAnimation);
};

Spriteset_Base.prototype.startAnimation = function(animationId, mirror, delay) {    
    var animation = $dataAnimations[animationId];
    animation = JSON.parse(JSON.stringify(animation));
    animation.position = 3;
    
    this._spritesetAnimation.startAnimation(animation, mirror, delay);
};
