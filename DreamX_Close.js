/*:
 * @plugindesc v1.0 Adds close command to some menus.
 * @author DreamX
 * 
 * @param Close Text
 * @desc 
 * @default Finish
 * 
 * @help
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
Imported.DreamX_Close = true;

var DreamX = DreamX || {};
DreamX.Close = DreamX.Close || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_Close');
    var paramCloseText = String(parameters['Close Text']);

    DreamX.Close.Window_ItemCategory_makeCommandList = Window_ItemCategory.prototype.makeCommandList;
    Window_ItemCategory.prototype.makeCommandList = function () {
        DreamX.Close.Window_ItemCategory_makeCommandList.call(this);
        this.addCommand(paramCloseText, 'cancel');
    };

    DreamX.Close.Window_SkillType_makeCommandList = Window_SkillType.prototype.makeCommandList
    Window_SkillType.prototype.makeCommandList = function () {
        DreamX.Close.Window_SkillType_makeCommandList.call(this);
        this.addCommand(paramCloseText, 'cancel');
    };



})();
