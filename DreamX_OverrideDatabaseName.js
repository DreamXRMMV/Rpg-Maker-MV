/*:
 * @plugindesc v1.0 Replace database names
 * @author DreamX
 * @help
 * Use 
 * <Override Name>
 * x
 * </Override Name>
 * In an actor, class, item, weapon, armor, enemy or state notebox with x as 
 * the name. It will use this name instead of the database name.
 * ===========================================================================
 * Terms Of Use
 * ===========================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly as well because I used some code/concepts from their plugins.
 * ===========================================================================
 * Credits
 * ===========================================================================
 * DreamX
 */

var Imported = Imported || {};
Imported.DreamX_OverrideDatabaseName = true;

var DreamX = DreamX || {};
DreamX.OverrideDatabaseName = DreamX.OverrideDatabaseName || {};

(function () {
    DreamX.OverrideDatabaseName.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.OverrideDatabaseName.DataManager_isDatabaseLoaded.call(this))
            return false;
        this.overrideDatabaseName($dataItems);
        this.overrideDatabaseName($dataStates);
        this.overrideDatabaseName($dataWeapons);
        this.overrideDatabaseName($dataArmors);
        this.overrideDatabaseName($dataActors);
        this.overrideDatabaseName($dataEnemies);
        this.overrideDatabaseName($dataSkills);
        this.overrideDatabaseName($dataClasses);
        return true;
    };

    DataManager.overrideDatabaseName = function (group) {
        var evalMode = 'none';
        var name = "";

        for (var i = 0; i < group.length; i++) {
            var obj = group[i];
            if (!obj)
                continue;
            var notedata = obj.note.split(/[\r\n]+/);

            for (var j = 0; j < notedata.length && !evalMode.match('finish'); j++) {
                var line = notedata[j];
                if (line.match(/<(?:OVERRIDE NAME)>/i)) {
                    evalMode = 'name';
                } else if (line.match(/<\/(?:OVERRIDE NAME)>/i)) {
                    evalMode = 'finish';
                } else if (evalMode === 'name') {
                    name += line;
                }
            }

            if (name) {
                obj.name = name;
            }
            name = "";
            evalMode = 'none';
        }
    };

})();
