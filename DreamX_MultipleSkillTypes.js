/*:
 * @plugindesc v0.01 Extra skill types for showing up in skill list.
 * 
 * <DreamX MultipleSkillTypes>
 * @author DreamX
 *
 * @param Always Show Learned
 * @desc Always show learned abilities in skill list. Default: false
 * @default false
 *
 * @help 
 * ============================================================================
 * How To Use
 * ============================================================================
 Use this notetag on a skill: <extraSkillTypeID:x y z> with the letters being the 
 extra skill type ids for the purposes of showing up in the skill list. You can 
 have as many ids as you want.
 
 Use this notetag on a skill: <alwaysShow:1> to always show it in the skill list
 even if the skill type doesn't match.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 DreamX

 */

var Imported = Imported || {};
Imported.DreamX_ExtraSkillTypes = true;

var DreamX = DreamX || {};
DreamX.ExtraSkillTypes = DreamX.ExtraSkillTypes || {};

(function () {
	
//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX MultipleSkillTypes>');
    })[0].parameters; //Thanks to Iavra
	
var paramAlwaysShow = eval(parameters['Always Show Learned'] || false);
	
    DreamX.ExtraSkillTypes.shouldPutInList = function (item, expectedSkillTypeID) {
        if (item) {
            if (item.meta.alwaysShow || paramAlwaysShow === true)
                return true;
            if (item.meta.extraSkillTypeID) {
                var array = item.meta.extraSkillTypeID.trim().split(" ");
                for (var i = 0; i < array.length; i++) {
                    if (parseInt(array[i]) === expectedSkillTypeID) {
                        return true;
                    }
                }
            }
        }
        // default return false
        return false;

    };
    DreamX.ExtraSkillTypes.Window_SkillList_includes = Window_SkillList.prototype.includes;
    Window_SkillList.prototype.includes = function (item) {
        if (DreamX.ExtraSkillTypes.shouldPutInList(item, this._stypeId))
            return true;
        return DreamX.ExtraSkillTypes.Window_SkillList_includes.call(this, item);
    };

})();
