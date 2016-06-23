/*:
 * @plugindesc
 * 
 * @param Starting Map ID
 * @desc Processed as eval. Minimum total size of generated rooms. Default: 1000
 * @default 1000
 * 
 * @author DreamX
 * @help
 * This map does two things. One, it allows randomly selecting a map with a
 * plugin command.
 * Two, it allows for randomly allocating events on the map
 * manually via a plugin call or auotomatically when transferring.
 * ============================================================================
 * How To Use
 * ============================================================================
 * <RemoveRegion> will prevent any other events from being placed in this 
 * region after this event is placed.
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
Imported.DreamX_RandomMap = true;

var DreamX = DreamX || {};
DreamX.RandomMap = DreamX.RandomMap || {};

(function () {

    var parameterStartingId = 1000;

    DreamX.RandomMap.DataManager_isDatabaseLoaded = DataManager.isDatabaseLoaded;
    DataManager.isDatabaseLoaded = function () {
        if (!DreamX.RandomMap.DataManager_isDatabaseLoaded.call(this))
            return false;
        if (!DreamX.loadedRandomMapEvents) {
            this.setBaseDataMapsLength();
            DreamX.loadedRandomMapEvents = true;
        }
        return true;
    };

    DataManager.setBaseDataMapsLength = function () {
        this._baseMapsLength = $dataMapInfos.length;
    };

    DataManager.setGeneratedMapInfosLength = function () {
        for (; ; ) {
            if ($dataMapInfos.length > parameterStartingId)
                break;
            $dataMapInfos.push(null);
        }
    };

    DreamX.RandomMap.DataManager_makeSaveContents = DataManager.makeSaveContents;
    DataManager.makeSaveContents = function () {
        var contents = DreamX.RandomMap.DataManager_makeSaveContents.call(this);
        contents.generatedMaps = this._generatedMaps;
        contents.generatedMapInfos = this._generatedMapInfos;
        return contents;
    };

    DreamX.RandomMap.DataManager_extractSaveContents = DataManager.extractSaveContents;
    DataManager.extractSaveContents = function (contents) {
        DreamX.RandomMap.DataManager_extractSaveContents.call(this, contents);
        this._generatedMaps = contents.generatedMaps;
        this._generatedMapInfos = contents.generatedMapInfos;
        this.loadGeneratedMapInfos();
    };

    DataManager.loadGeneratedMapInfos = function () {
        // remove captured actors from other saves
        var difItems = $dataMapInfos.length - this._baseMapsLength;
        $dataMapInfos.splice(this._baseMapsLength, difItems);
        this.setGeneratedMapInfosLength();
        $dataMapInfos = $dataMapInfos.concat(this._generatedMapInfos);
    };

    DreamX.RandomMap.DataManager_createGameObjects =
            DataManager.createGameObjects;
    DataManager.createGameObjects = function () {
        DreamX.RandomMap.DataManager_createGameObjects.call(this);
        this._generatedMaps = [];
        this._generatedMapInfos = [];
        // remove captured actors from other saves
        this.loadGeneratedMapInfos();
    };


    DreamX.RandomMap.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.RandomMap.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'RandomMap':
                DreamX.RandomMap.test(args);
                break;
            case 'AllocateEvents':
                new DXMapRandomElements(args[0]);
                break;
        }
    };

    function DXMapRandomElements() {
        this.initialize.apply(this, arguments);
    }


    DXMapRandomElements.prototype.initialize = function (fadeType) {
        this._regionMap = new Map();

        this._fadeType = fadeType ? fadeType : 0;

        // events to distribute to new data map
        this._events = [];

        // class map keys
        this._regionIds = [];

        this.allocate();
    };

    DXMapRandomElements.prototype.setRegionTiles = function () {
        for (var x = 0; x < $dataMap.width; x++) {
            for (var y = 0; y < $dataMap.height; y++) {
                var regionId = $gameMap.regionId(x, y);
                if (regionId === 0) {
                    continue;
                }

                if (!this._regionMap.has(regionId)) {
                    this._regionMap.set(regionId, []);
                }
                this._regionIds.push(regionId);

                this._regionMap.get(regionId).push({x: x, y: y});
            }
        }
    };

    DXMapRandomElements.prototype.setEvents = function () {
        for (var i = 1; i < $dataMap.events.length; i++) {
            var event = $dataMap.events[i];
            var regionCandidates = [];
            var testRegions = [];

            if (!event) {
                continue;
            }

            var regionId = event.meta.DXRM_Region;
            if (!regionId) {
                continue;
            }

            var testRegions = this.parseNumberRanges(regionId);
            if (testRegions.length === 0) {
                continue;
            }

            var regionMap = this._regionMap;
            regionCandidates = testRegions.filter(function (region) {
                return regionMap.has(region);
            });

            if (regionCandidates.length === 0) {
                continue;
            }

            regionId = this.randomArrayElement(regionCandidates);

            var regionArray = this._regionMap.get(regionId);

            if (regionArray.length === 0) {
                continue;
            }

            var diceRoll = Math.floor(Math.random() * regionArray.length);
            var selectedCoors = regionArray[diceRoll];

            var eventCopy = JSON.parse(JSON.stringify(event));
            eventCopy.x = selectedCoors.x;
            eventCopy.y = selectedCoors.y;
            this._events.push(eventCopy);

            // remove coors from array
            regionArray.splice(diceRoll, 1);

            // delete key for full regions
            if (regionArray.length === 0) {
                this._regionMap.delete(regionId);
            }
        }
    };

    DXMapRandomElements.prototype.createDataMap = function () {
        var newId = $dataMapInfos.length;

        var dataMapCopy = JSON.parse(JSON.stringify($dataMap));
        dataMapCopy.events = this._events;
        dataMapCopy.id = newId;

        var dataMapInfoCopy = JSON.parse(JSON.stringify($dataMap));
        dataMapInfoCopy.id = newId;

        DataManager._generatedMaps.push(dataMapCopy);
        DataManager._generatedMapInfos.push(dataMapInfoCopy);
        $dataMapInfos.push(dataMapInfoCopy);

        return newId;
    };

    DXMapRandomElements.prototype.transferToNewMap = function (newId) {
        $gamePlayer.reserveTransfer(newId, 0, 0, 2, this._fadeType);
    };

    DXMapRandomElements.prototype.allocate = function () {
        this.setRegionTiles();

        // if there were no regions, return
        if (this._regionMap.size === 0) {
            return;
        }

        this.setEvents();

        // if there were no events, return
        if (this._events.length === 0) {
            return;
        }

        var id = this.createDataMap();

        this.transferToNewMap(id);
    };

    DreamX.RandomMap.DataManager_loadMapData = DataManager.loadMapData;
    DataManager.loadMapData = function (mapId) {
        if (mapId > parameterStartingId) {
            var id = mapId - parameterStartingId - 1;
            $dataMap = DataManager._generatedMaps[id];
            return;
        }
        DreamX.RandomMap.DataManager_loadMapData.call(this, mapId);
    };

    DXMapRandomElements.prototype.randomArrayElement = function (array) {
        var diceRoll = Math.floor(Math.random() * array.length);
        var selected = array[diceRoll];
        return selected;
    };

    DXMapRandomElements.prototype.parseNumberRanges = function (string) {
        var nums = [];
        for (var i = 0; i < string.length; i++) {
            var arg = string[i].trim();
            var split = arg.split("-");
            var min = parseInt(split[0]);
            var max = split[1] ? parseInt(split[1]) : min;

            if (!min || min > max) {
                continue;
            }

            for (var j = min; j <= max; j++) {
                nums.push(j);
            }
        }

        return nums;
    };

})();
