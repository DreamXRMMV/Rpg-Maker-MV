/*:
 * @plugindesc
 * @author
 * @help
 */

(function () {

    // Normally we would check if Gameus' plugin is active. But Gameus did not 
    // put an import variable in their plugin. There is probably another way to 
    // check, like looking at the global variables in their plugin, but for now
    // this plugin will assume their plugin is active
    YouCanNameThisAliasWhatEverYouWant = Scene_Quest.prototype.createQuestWindow;
    Scene_Quest.prototype.createQuestWindow = function () {
        // perform the operations from the original function
        YouCanNameThisAliasWhatEverYouWant.call(this);

        // now, perform the following operations:
        this.questFilter.opacity = 0;
        this.questWindow.opacity = 0;
        this.questInfo.opacity = 0;
    };

    // yep party system plugin must be turned on
    // otherwise this would not do anything, or may even crash
    // we can check easily by seeing if the import variable exists
    if (Imported.YEP_PartySystem) {
        ButItNeedsToBeUnique = Scene_Party.prototype.create;
        Scene_Party.prototype.create = function () {
            ButItNeedsToBeUnique.call(this);

            // we can set the opacity of this window because the original calls 
            // functions that create these variables
            this._commandWindow.opacity = 0;
            this._partyWindow.opacity = 0;
            this._listWindow.opacity = 0;
            this._detailWindow.opacity = 0;
        };
    }


})();
