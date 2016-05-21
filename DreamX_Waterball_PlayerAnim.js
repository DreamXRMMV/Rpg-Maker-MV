/*:
 * @plugindesc
 * @author
 * @help
 */

(function () {
    Game_Player.prototype.waterballAnim = function () {
        var list = [];
        var direction = this.direction();

        list.push({"code": 45, "parameters": ["this.set_frame(\"$Sen[field]%(5)\",1,1," + direction + ")"], "indent": null});
        // wait 2 frames
        list.push({"code": 15, "parameters": [2], "indent": null});
        list.push({"code": 45, "parameters": ["this.set_frame(\"$Sen[field]%(5)\",1,2," + direction + ")"], "indent": null});
        // wait 2 frames
        list.push({"code": 15, "parameters": [2], "indent": null});
        list.push({"code": 45, "parameters": ["this.set_frame(\"$Sen[field]%(5)\",1,3," + direction + ")"], "indent": null});
        list.push({"code": 15, "parameters": [2], "indent": null});
        list.push({"code": 45, "parameters": ["this.set_frame(\"$Sen[field]%(5)\",1,4," + direction + ")"], "indent": null});
        list.push({"code": 15, "parameters": [2], "indent": null});
        list.push({"code": 45, "parameters": ["this.set_frame(\"$Sen[field]%(5)\",1,5," + direction + ")"], "indent": null});
        list.push({"code": 15, "parameters": [2], "indent": null});
        list.push({"code": 45, "parameters": ["this.set_frame(\"Sen%(6)\",1,1," + direction + ")"], "indent": null});
        list.push({"code": 45, "parameters": ["$gameParty.leader().setCharacterImage(\"Sen%(6)\", 0)"], "indent": null});
        list.push({"code": 45, "parameters": ["this.restore_frame()"], "indent": null});
        // dir fix off
        list.push({"code": 36, "indent": null});
        // stepping on
        list.push({"code": 33, "indent": null});

        // reset move route so player doesnt get stuck
        list.push({"code": 45, "parameters": ["this._moveRouteForcing = false"], "indent": null});
        list.push({"code": 45, "parameters": ["this._moveRouteIndex = 0"], "indent": null});
        list.push({"code": 45, "parameters": ["this._moveRoute = null"], "indent": null});

        var moveRoute = {list: list, repeat: false, skippable: true, wait: false};
        this.memorizeMoveRoute();
        this.forceMoveRoute(moveRoute);
    };

})();
