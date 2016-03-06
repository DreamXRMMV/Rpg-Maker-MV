/*:
 * @plugindesc v1.0 Change sprites when dashing.
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 Actors will change their sprite while dashing if an image file with the same 
 name as their character image file exists, but with _Run added to it. 
 For example, if the actor's normal sprite is using the Actor1.png image file, 
 Actor1_Run.png must exist in the same folder. The character index will be the 
 same. 
 
 By default, if a run sprite could not be found, then the sprite for an actor is 
 simply not changed.
 
 Use <NoRunSprite:1> for an actor to disable changing their image on dash.
 * ============================================================================
 * Compatibility
 * ============================================================================
 This plugin is compatible with Shaz's more character frames. Instead of adding
 _Run to the very end, you'll add it just before the part about the character 
 frames. For example, the run equivalent of an image named $Character [8 8 8 8] 
 becomes $Character_Run [8 8 8 8]
 * ============================================================================
 * Known Issues
 * ============================================================================
 The first time while dashing, there may be a momentary flash of the sprite 
 when the image changes. It's more noticeable if you're using Shaz's More 
 Character Frames.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 DreamX
 Thanks to Zalerinian on the Rpg Maker forums for their post on finding the
 directory.
 */
var Imported = Imported || {};
Imported.DreamX_RunSprite = true;

var DreamX = DreamX || {};
DreamX.RunSprite = DreamX.RunSprite || {};

(function () {
    // get character directory
    DreamX.RunSprite.charImgDirectoryPath = function () {
        var path = window.location.pathname.replace(/(\/www|)\/[^\/]*$/, '/img/characters/');
        if (path.match(/^\/([A-Z]\:)/)) {
            path = path.slice(1);
        }
        return decodeURIComponent(path);
    };

    DreamX.RunSprite.Game_Actor_initImages = Game_Actor.prototype.initImages;
    Game_Actor.prototype.initImages = function () {
        DreamX.RunSprite.Game_Actor_initImages.call(this);
        this._nonRunCharacterName = this._characterName;
    };

    Game_Actor.prototype.dashCharacterName = function () {
        // pattern for shaz's more character frames
        var patt = new RegExp('\[[0-9]* [0-9]* [0-9]* [0-9]*\]$')
        var filename;
        if (patt.test(this._nonRunCharacterName)) {
            filename = this._nonRunCharacterName.split(" [")[0] + "_Run " + "[" + this._nonRunCharacterName.split("[")[1];
        }
        else {
            filename = this._nonRunCharacterName + "_Run";
        }

        // thanks to zalerinian
        var fs = require('fs');
        // if file exists
        if (fs.existsSync(DreamX.RunSprite.charImgDirectoryPath() + filename + ".png")) {
            return filename;
        } else {
            // if file does not exist return previous char name
            return this._nonRunCharacterName;
        }
    };
	
    Game_Actor.prototype.nonRunCharacterName = function () {
        return this._nonRunCharacterName;
    };
	
    Game_Actor.prototype.changeToRunImage = function (index) {
        this._characterName = this.dashCharacterName();
		this._characterIndex = index;
    };
	
	DreamX.RunSprite.Game_Actor_setCharacterImage = Game_Actor.prototype.setCharacterImage
	Game_Actor.prototype.setCharacterImage = function(characterName, characterIndex) {
		DreamX.RunSprite.Game_Actor_setCharacterImage.call(this, characterName, characterIndex);
		this._nonRunCharacterName = this._characterName;
	};
	
    DreamX.RunSprite.Game_Player_updateDashing = Game_Player.prototype.updateDashing;
    Game_Player.prototype.updateDashing = function () {
        DreamX.RunSprite.Game_Player_updateDashing.call(this);
        if (this.isDashing() === true && ((Input.isPressed('down')
                || Input.isPressed('up') || Input.isPressed('left')
                || Input.isPressed('right')) || $gameTemp.isDestinationValid())) {
            $gameParty.allMembers().forEach(function (actor) {
				if (actor.characterName() !== actor.dashCharacterName() && !$dataActors[actor.actorId()].meta.NoRunSprite) {
			        actor.changeToRunImage(actor.characterIndex());		
				}
            });

        }
        else {
            $gameParty.allMembers().forEach(function (actor) {
                actor.setCharacterImage(actor.nonRunCharacterName(), actor.characterIndex());
            });

        }
		$gamePlayer.refresh();
    };
})();
