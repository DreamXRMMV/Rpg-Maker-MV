/*:
 * @plugindesc v1.2
 * @author DreamX
 * 
 * @param --Status Buttons--
 *  
 * @param -Status Left Button-
 * 
 * @param Status Left Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Status Left Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Status Left Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Status Left Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button. Default: 0
 * @default 0
 * 
 * @param Status Left Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 1
 * @default 1
 * 
 * @param Status Left Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * 
 * @param Status Left Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.StatusSwitchLeftHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.StatusSwitchLeftHeight
 * 
 * @param -Status Right Button-
 * 
 * @param Status Right Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Status Right Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Status Right Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Status Right Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button.Default: 2
 * @default 2
 * 
 * @param Status Right Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 3
 * @default 3
 * 
 * @param Status Right Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.StatusSwitchLeftWidth
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.StatusSwitchLeftWidth
 * 
 * @param Status Right Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.StatusSwitchRightHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.StatusSwitchRightHeight
 * 
 * @param --Equip Buttons--
 *  
 * @param -Equip Left Button-
 * 
 * @param Equip Left Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Equip Left Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Equip Left Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Equip Left Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button. Default: 0
 * @default 0
 * 
 * @param Equip Left Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 1
 * @default 1
 * 
 * @param Equip Left Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * 
 * @param Equip Left Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.EquipSwitchLeftHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.EquipSwitchLeftHeight
 * 
 * @param -Equip Right Button-
 * 
 * @param Equip Right Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Equip Right Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Equip Right Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Equip Right Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button. Default: 2
 * @default 2
 * 
 * @param Equip Right Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 3
 * @default 3
 * 
 * @param Equip Right Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.EquipSwitchLeftWidth
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.EquipSwitchLeftWidth
 * 
 * @param Equip Right Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.EquipSwitchRightHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.EquipSwitchRightHeight
 * 
 * @param --Skill Buttons--
 *  
 * @param Hide When Skill Actor Select
 * @desc Hide buttons when selecting an actor for a skill activation. Default: true
 * @default true
 * 
 * @param -Skill Left Button-
 * 
 * @param Skill Left Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Skill Left Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Skill Left Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Skill Left Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button. Default: 0
 * @default 0
 * 
 * @param Skill Left Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 1
 * @default 1
 * 
 * @param Skill Left Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + this._statusWindow.textPadding() 
 * 
 * @param Skill Left Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.SkillSwitchLeftHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.SkillSwitchLeftHeight
 * 
 * @param -Skill Right Button-
 * 
 * @param Skill Right Button Image
 * @desc Name of image from system folder to use for button. Default: ButtonSet
 * @default ButtonSet
 * 
 * @param Skill Right Button Width
 * @desc Default: 48
 * @default 48
 * 
 * @param Skill Right Button Height
 * @desc Default: 48
 * @default 48
 * 
 * @param Skill Right Button Cold Index
 * @desc Index frame for cold (unpressed) version of the button. Default: 2
 * @default 2
 * 
 * @param Skill Right Button Hot Index
 * @desc Index frame for hot (pressed) version of the button. Default: 3
 * @default 3
 * 
 * @param Skill Right Button X
 * @desc Eval. Default: this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.SkillSwitchLeftWidth
 * @default this._statusWindow.x + this._statusWindow.standardPadding() + Window_Base._faceWidth + (this._statusWindow.textPadding() * 2) + DreamX.Param.SkillSwitchLeftWidth
 * 
 * @param Skill Right Button Y
 * @desc Eval. Default: this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.SkillSwitchRightHeight
 * @default this._statusWindow.y + this._statusWindow.height - this._statusWindow.standardPadding() - DreamX.Param.SkillSwitchRightHeight
 * 
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
 * The button index in the parameters refers to the spot in the image 
 * that the button graphic should look like.
 * 
 * The default parameter values were intended for use with Yanfly Equip/Status/Skill 
 * Core menus, but can be changed to fit other configurations.
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
Imported.DreamX_MenuActorSwitch = true;

var DreamX = DreamX || {};
DreamX.MenuActorSwitch = DreamX.MenuActorSwitch || {};

DreamX.Parameters = PluginManager.parameters('DreamX_MenuActorSwitch');
DreamX.Param = DreamX.Param || {};

// Status

DreamX.Param.StatusSwitchLeftWidth = parseInt(DreamX.Parameters['Status Left Button Width']);
DreamX.Param.StatusSwitchLeftHeight = parseInt(DreamX.Parameters['Status Left Button Height']);
DreamX.Param.StatusSwitchLeftHotIndex = parseInt(DreamX.Parameters['Status Left Button Hot Index']);
DreamX.Param.StatusSwitchLeftColdIndex = parseInt(DreamX.Parameters['Status Left Button Cold Index']);
DreamX.Param.StatusSwitchLeftX = String(DreamX.Parameters['Status Left Button X']);
DreamX.Param.StatusSwitchLeftY = String(DreamX.Parameters['Status Left Button Y']);
DreamX.Param.StatusSwitchLeftImage = String(DreamX.Parameters['Status Left Button Image']);

DreamX.Param.StatusSwitchRightWidth = parseInt(DreamX.Parameters['Status Right Button Width']);
DreamX.Param.StatusSwitchRightHeight = parseInt(DreamX.Parameters['Status Right Button Height']);
DreamX.Param.StatusSwitchRightHotIndex = parseInt(DreamX.Parameters['Status Right Button Hot Index']);
DreamX.Param.StatusSwitchRightColdIndex = parseInt(DreamX.Parameters['Status Right Button Cold Index']);
DreamX.Param.StatusSwitchRightX = String(DreamX.Parameters['Status Right Button X']);
DreamX.Param.StatusSwitchRightY = String(DreamX.Parameters['Status Right Button Y']);
DreamX.Param.StatusSwitchRightImage = String(DreamX.Parameters['Status Right Button Image']);


// Equip

DreamX.Param.EquipSwitchLeftWidth = parseInt(DreamX.Parameters['Equip Left Button Width']);
DreamX.Param.EquipSwitchLeftHeight = parseInt(DreamX.Parameters['Equip Left Button Height']);
DreamX.Param.EquipSwitchLeftHotIndex = parseInt(DreamX.Parameters['Equip Left Button Hot Index']);
DreamX.Param.EquipSwitchLeftColdIndex = parseInt(DreamX.Parameters['Equip Left Button Cold Index']);
DreamX.Param.EquipSwitchLeftX = String(DreamX.Parameters['Equip Left Button X']);
DreamX.Param.EquipSwitchLeftY = String(DreamX.Parameters['Equip Left Button Y']);
DreamX.Param.EquipSwitchLeftImage = String(DreamX.Parameters['Equip Left Button Image']);

DreamX.Param.EquipSwitchRightWidth = parseInt(DreamX.Parameters['Equip Right Button Width']);
DreamX.Param.EquipSwitchRightHeight = parseInt(DreamX.Parameters['Equip Right Button Height']);
DreamX.Param.EquipSwitchRightHotIndex = parseInt(DreamX.Parameters['Equip Right Button Hot Index']);
DreamX.Param.EquipSwitchRightColdIndex = parseInt(DreamX.Parameters['Equip Right Button Cold Index']);
DreamX.Param.EquipSwitchRightX = String(DreamX.Parameters['Equip Right Button X']);
DreamX.Param.EquipSwitchRightY = String(DreamX.Parameters['Equip Right Button Y']);
DreamX.Param.EquipSwitchRightImage = String(DreamX.Parameters['Equip Right Button Image']);

// Skill

DreamX.Param.SkillSwitchLeftWidth = parseInt(DreamX.Parameters['Skill Left Button Width']);
DreamX.Param.SkillSwitchLeftHeight = parseInt(DreamX.Parameters['Skill Left Button Height']);
DreamX.Param.SkillSwitchLeftHotIndex = parseInt(DreamX.Parameters['Skill Left Button Hot Index']);
DreamX.Param.SkillSwitchLeftColdIndex = parseInt(DreamX.Parameters['Skill Left Button Cold Index']);
DreamX.Param.SkillSwitchLeftX = String(DreamX.Parameters['Skill Left Button X']);
DreamX.Param.SkillSwitchLeftY = String(DreamX.Parameters['Skill Left Button Y']);
DreamX.Param.SkillSwitchLeftImage = String(DreamX.Parameters['Skill Left Button Image']);

DreamX.Param.SkillSwitchRightWidth = parseInt(DreamX.Parameters['Skill Right Button Width']);
DreamX.Param.SkillSwitchRightHeight = parseInt(DreamX.Parameters['Skill Right Button Height']);
DreamX.Param.SkillSwitchRightHotIndex = parseInt(DreamX.Parameters['Skill Right Button Hot Index']);
DreamX.Param.SkillSwitchRightColdIndex = parseInt(DreamX.Parameters['Skill Right Button Cold Index']);
DreamX.Param.SkillSwitchRightX = String(DreamX.Parameters['Skill Right Button X']);
DreamX.Param.SkillSwitchRightY = String(DreamX.Parameters['Skill Right Button Y']);
DreamX.Param.SkillSwitchRightImage = String(DreamX.Parameters['Skill Right Button Image']);


DreamX.Param.SkillHideWhenActivateSelect = String(DreamX.Parameters['Hide When Skill Actor Select']);

Scene_MenuBase.prototype.createSwitchButtons = function () {
    this.addSwitchButton(true);
    this.addSwitchButton(false);
};

Scene_MenuBase.prototype.addSwitchButton = function (left) {
    var buttonWidth = this.switchActorButtonWidth(left);
    var buttonHeight = this.switchActorButtonHeight(left);
    var hotIndex = this.switchActorButtonHotIndex(left);
    var coldIndex = this.switchActorButtonColdIndex(left);
    var imageName = this.switchActorButtonImageName(left);
    var x = eval(this.switchActorButtonX(left));
    var y = eval(this.switchActorButtonY(left));
    var buttonFunction = this.switchActorButtonFunction(left);
    var bitmap = ImageManager.loadSystem(imageName);

    var button = new Sprite_SwitchActorButton(this);
    button.x = x;
    button.y = y;

    button.bitmap = bitmap;
    button.setColdFrame(buttonWidth * coldIndex, 0, buttonWidth, buttonHeight);
    button.setHotFrame(buttonWidth * hotIndex, 0, buttonWidth, buttonHeight);
    this.addChild(button);
    button.setClickHandler(buttonFunction);
};

Scene_MenuBase.prototype.switchActorButtonFunction = function (left) {
    return left ? this.onSwitchActorButtonLeft.bind(this) : this.onSwitchActorButtonRight.bind(this);
};

Scene_MenuBase.prototype.onSwitchActorButtonLeft = function () {
    this.previousActor();
    this.switchActorCleanUp();
};

Scene_MenuBase.prototype.onSwitchActorButtonRight = function () {
    this.nextActor();
    this.switchActorCleanUp();
};

Scene_MenuBase.prototype.switchActorCleanUp = function () {
};


DreamX.MenuActorSwitch.Scene_Status_create = Scene_Status.prototype.create;
Scene_Status.prototype.create = function () {
    DreamX.MenuActorSwitch.Scene_Status_create.call(this);
    this.createSwitchButtons();
};

Scene_Status.prototype.switchActorButtonWidth = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftWidth : DreamX.Param.StatusSwitchRightWidth;
};

Scene_Status.prototype.switchActorButtonHeight = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftHeight : DreamX.Param.StatusSwitchRightHeight;
};

Scene_Status.prototype.switchActorButtonHotIndex = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftHotIndex : DreamX.Param.StatusSwitchRightHotIndex;
};

Scene_Status.prototype.switchActorButtonColdIndex = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftColdIndex : DreamX.Param.StatusSwitchRightColdIndex;
};

Scene_Status.prototype.switchActorButtonImageName = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftImage : DreamX.Param.StatusSwitchRightImage;
};

Scene_Status.prototype.switchActorButtonX = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftX : DreamX.Param.StatusSwitchRightX;
};

Scene_Status.prototype.switchActorButtonY = function (left) {
    return left ? DreamX.Param.StatusSwitchLeftY : DreamX.Param.StatusSwitchRightY;
};

Scene_Equip.prototype.switchActorCleanUp = function () {
    this._windowLayer.children.forEach(function (child) {
        if (child instanceof Window_Selectable && !(child instanceof Window_EquipCommand)) {
            child.processCancel();
        }
    });
    this._windowLayer.children.forEach(function (child) {
        if (child instanceof Window_Selectable && !(child instanceof Window_EquipCommand)) {
            child.deactivate();
        }
    });
};

DreamX.MenuActorSwitch.Scene_Equip_create = Scene_Equip.prototype.create;
Scene_Equip.prototype.create = function () {
    DreamX.MenuActorSwitch.Scene_Equip_create.call(this);
    this.createSwitchButtons();
};

Scene_Equip.prototype.switchActorButtonWidth = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftWidth : DreamX.Param.EquipSwitchRightWidth;
};

Scene_Equip.prototype.switchActorButtonHeight = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftHeight : DreamX.Param.EquipSwitchRightHeight;
};

Scene_Equip.prototype.switchActorButtonHotIndex = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftHotIndex : DreamX.Param.EquipSwitchRightHotIndex;
};

Scene_Equip.prototype.switchActorButtonColdIndex = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftColdIndex : DreamX.Param.EquipSwitchRightColdIndex;
};

Scene_Equip.prototype.switchActorButtonImageName = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftImage : DreamX.Param.EquipSwitchRightImage;
};

Scene_Equip.prototype.switchActorButtonX = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftX : DreamX.Param.EquipSwitchRightX;
};

Scene_Equip.prototype.switchActorButtonY = function (left) {
    return left ? DreamX.Param.EquipSwitchLeftY : DreamX.Param.EquipSwitchRightY;
};

//-----------------------------------------------------------------------------
// Scene_Skill
//
// The scene class of the skill screen.

//DreamX.MenuActorSwitch.Scene_Skill_createSkillTypeWindow = Scene_Skill.prototype.createSkillTypeWindow;
//Scene_Skill.prototype.createSkillTypeWindow = function () {
//    DreamX.MenuActorSwitch.Scene_Skill_createSkillTypeWindow.call(this);
//    this._skillTypeWindow.setHandler('right', this.nextActor.bind(this));
//    this._skillTypeWindow.setHandler('left', this.previousActor.bind(this));
//};

Scene_Skill.prototype.switchActorCleanUp = function () {
    this._windowLayer.children.forEach(function (child) {
        if (child instanceof Window_Selectable && !(child instanceof Window_SkillType)) {
            child.processCancel();
        }
    });
    this._windowLayer.children.forEach(function (child) {
        if (child instanceof Window_Selectable && !(child instanceof Window_SkillType)) {
            child.deactivate();
        }
    });
};

DreamX.MenuActorSwitch.Scene_Skill_create = Scene_Skill.prototype.create;
Scene_Skill.prototype.create = function () {
    DreamX.MenuActorSwitch.Scene_Skill_create.call(this);
    this.createSwitchButtons();
};

Scene_Skill.prototype.switchActorButtonWidth = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftWidth : DreamX.Param.SkillSwitchRightWidth;
};

Scene_Skill.prototype.switchActorButtonHeight = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftHeight : DreamX.Param.SkillSwitchRightHeight;
};

Scene_Skill.prototype.switchActorButtonHotIndex = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftHotIndex : DreamX.Param.SkillSwitchRightHotIndex;
};

Scene_Skill.prototype.switchActorButtonColdIndex = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftColdIndex : DreamX.Param.SkillSwitchRightColdIndex;
};

Scene_Skill.prototype.switchActorButtonImageName = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftImage : DreamX.Param.SkillSwitchRightImage;
};

Scene_Skill.prototype.switchActorButtonX = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftX : DreamX.Param.SkillSwitchRightX;
};

Scene_Skill.prototype.switchActorButtonY = function (left) {
    return left ? DreamX.Param.SkillSwitchLeftY : DreamX.Param.SkillSwitchRightY;
};

//-----------------------------------------------------------------------------
// Sprite_SwitchActorButton
//
// The sprite for displaying a button.

function Sprite_SwitchActorButton() {
    this.initialize.apply(this, arguments);
}

Sprite_SwitchActorButton.prototype = Object.create(Sprite_Button.prototype);
Sprite_SwitchActorButton.prototype.constructor = Sprite_SwitchActorButton;

Sprite_SwitchActorButton.prototype.initialize = function (scene) {
    Sprite_Button.prototype.initialize.call(this);
    this._scene = scene;
};

Sprite_SwitchActorButton.prototype.update = function () {
    Sprite_Button.prototype.update.call(this);
    this.updateButtonVisibility();
};

Sprite_SwitchActorButton.prototype.updateButtonVisibility = function () {
    if (!eval(DreamX.Param.SkillHideWhenActivateSelect)) {
        return;
    }
    if (this._scene instanceof Scene_Skill) {
        this.visible = !this._scene._actorWindow.active;
        this.active = !this._scene._actorWindow.active;
    }
};
