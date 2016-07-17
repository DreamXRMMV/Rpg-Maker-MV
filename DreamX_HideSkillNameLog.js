/*:
 * @plugindesc
 * 
 * @param Show Skill Names In Log
 * @desc Whether to show skill name in battle log Default: true
 * @default true
 * 
 * @author DreamX
 * @help
 * ============================================================================
 * Skill Notetag
 * ============================================================================
 * Use <HideSkillNameLog> to hide skill name in battle log
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thank you to Yanfly for Battle Engine Core
 */

var Imported = Imported || {};
Imported.DreamX_HideSkillNameLog = true;

var DreamX = DreamX || {};
DreamX.HideSkillNameLog = DreamX.HideSkillNameLog || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_HideSkillNameLog');
    var paramShowSkillName = eval(String(parameters['Show Skill Names In Log']));

    DreamX.HideSkillNameLog.Window_BattleLog_displayAction = Window_BattleLog.prototype.displayAction;
    Window_BattleLog.prototype.displayAction = function (subject, item) {
        if (item.meta.HideSkillNameLog) {
            return;
        }
        if (!paramShowSkillName) {
            return;
        }
        DreamX.HideSkillNameLog.Window_BattleLog_displayAction.call(this, subject, item);
    };


})();
