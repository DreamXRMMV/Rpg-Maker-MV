/*:
 * @plugindesc
 * @author DreamX
 * @help
 * ============================================================================
 * How To Use
 * ============================================================================
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
Imported.DreamX_SeparateAttackTimes = true;

var DreamX = DreamX || {};
DreamX.SeparateAttackTimes = DreamX.SeparateAttackTimes || {};

DreamX.Parameters = PluginManager.parameters('DreamX_SeparateAttackTimes');
DreamX.Param = DreamX.Param || {};

//DreamX.Param.DXCESDefaultPrice = parseInt(DreamX.Parameters['Default Cost']);

Game_Action.prototype.repeatTargets = function (targets) {
    return targets;
};

DreamX.SeparateAttackTimes.BattleManager_endAction = BattleManager.endAction;
BattleManager.endAction = function () {
    DreamX.SeparateAttackTimes.BattleManager_endAction.call(this);
    var user = this._subject;
    var action = this._action;
    var item = action.item();

    if (!user.canMove() || user.isDead()) {
        return;
    }
    if (user._canComboAttack) {
        return;
    }
    var extraActions = action.numRepeats() - 1;
    if (extraActions <= 0) {
        return;
    }
    
    if (user._repeatActions < 0) {
        user._repeatActions = undefined;
        return;
    }

    if (user._repeatActions === undefined) {
        user._repeatActions = extraActions;
    }
    if (user._repeatActions > 0) {
        BattleManager.queueForceAction(user, item.id, -2);
    }

    user._repeatActions--;
};