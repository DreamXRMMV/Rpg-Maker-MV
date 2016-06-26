/*:
 * @plugindesc v1.0
 * 
 * @param Starting Map ID
 * @desc Starting id for generated maps. Default: 1000
 * @default 1000
 * 
 * @param Fade Type
 * @desc Default fade type for generated map transfers. 0: Black 1: White 2: None Default: 0
 * @default 0
 * 
 * @author DreamX
 * @help
 * This plugin allows for randomly allocating events on the map
 * manually via a plugin call or auotomatically when transferring.
 * ============================================================================
 * How To Use
 * ============================================================================
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 * AllocateEvents x y
 *  This command will randomly allocate events and transfer the player to the 
 *  new map. x - Fade Type. Use -1 to use default. y - tileset id of new 
 *  generated map. Use -1 or don't include it to use the same tileset id as 
 *  the base map. 
 *  
 *  In order for events to be placed on the new map, they MUST have the 
 *  notetags <RandomRegion: x> or <AllocateSame>. 
 *  Make sure to read below in "Event Notetags" to learn how to use these.
 * ============================================================================
 * Event Notetags
 * ============================================================================
 * <RandomRegion: x> will allow this event to be randomly allocated in the 
 * specified regions. This is required for events to be spawned in the 
 * generated map, unless you use <AllocateSame> below.
 * Example: 
 * <RandomRegion: 1-4 7 10> will have the event spawn in regions 1-4, 7 or 10.
 * If you want it to be able to spawn in any region, enter 1-255 (or whatever 
 * the max is in your case).
 * 
 * <AllocateSame> will cause this event to put in the same exact spot it was 
 * before the allocation process began.
 * 
 * <AllocateStart> will cause the player to spawn at the point this event is 
 * placed at. Use this tag for only one event. If this event does not exist or 
 * is not allocated, the player will spawn on the same tile they were at when 
 * the map began allocating events.
 * 
 * <AllocatePriority: x> will determine the order that event is spawned. Lower 
 * numbers get allocated first. Events without a priority get allocated last.
 * I recommend using the lowest value for the AllocateStart event.
 * 
 * <AllocateMin: x> will attempt to the spawn the event a minimum of x times. 
 * Use this only if you need to use a number other than 1. Do not use 
 * with <AllocateStart>
 * 
 * <AllocateMax: x> will attempt to the spawn the event a maximum of x times.
 * Use this only when you are also setting a minimum. Must be greater than the 
 * minimum. Do not use with <AllocateStart>
 * 
 * <AllocateChance: x> will give the event x chance to spawn. This is tested 
 * for every attempt at placing the event. 
 * Example:
 * <AllocateChance: 55> will give the event 55% chance to spawn.
 * 
 * <AllocateTag: x> This tag is used to label events for special conditions. 
 * At the moment, it is only useful for the notetag below.
 * 
 * <AllocateMinimumDistance: x y> will require that the event be spawned away 
 * at least y tiles from events tagged with x (from <AllocateTag: x>). 
 * If no tiles fit this criteria, then the event may not be spawned. 
 * Because of this, it is a good idea to utilize allocation priority to 
 * ensure that events that have a conditional distance placement are allocated 
 * after events they must be placed away from.
 * You can use more than one distance condition.
 * Example: 
 * <AllocateMinimumDistance: Start 4 End 9> will require that this event 
 * can only be placed 4 tiles or more from events tagged with Start and 
 * 9 tiles or more from events tagged with End.
 * 
 * <RemoveSelectedRegion> will prevent the region this event is placed in from 
 * having any other events placed in it.
 * 
 * <RemoveRegion: x> will prevent the regions specified from having any 
 * other events placed in it, after this event is placed.
 * Example:
 * <RemoveRegion: 1-4 7 10> will prevent regions 1-4, 7 and 10.
 * 
 * ============================================================================
 * Map Notetags
 * ============================================================================
 * <AllocateEvents> will automatically allocate events on map load.
 * 
 * <AllocateWallAutotileRegion: x> This will set all wall autotiles to be 
 * considered region x, besides tiles that you have manually set a region to.
 * 
 * <AllocateRoofAutotileRegion: x> This will set all roof autotiles to be 
 * considered region x, besides tiles that you have manually set a region to.
 * 
 * <RandomTileset: x> when a new map is generated from this map, it will select 
 * one of these tileset ids for the new map. 
 * Example: 
 * <RandomTileset: 1-4 7 10> will select from ids 1-4, 7 or 10.
 * ============================================================================
 * Event Commands
 * ============================================================================
 * Events will the retain the same event id with one exception. Any time that 
 * the same event is copied to the map more than once, the extra clones have 
 * new ids. This means that the first copy will retain the same id as on the 
 * base map, but the other copies will not. This only applies when using the 
 * <AllocateMin: x> notetag, otherwise an event will never have extra clones.
 * ============================================================================
 * Functions
 * ============================================================================
 * Functions you may find useful.
 * 
 * new DXMapRandomElements(args) - Equivalent of the plugin command 
 * AllocateEvents. Useful if you want to use a tileset id that you generated. 
 * Example:
 * new DXMapRandomElements("0 5") - will have 0 as the fade type and 5 as the
 * tileset id.
 * 
 * DreamX.RandomMap.RandomNumber(string) - Will return a random number from the 
 * string given. Useful for getting a random tileset id, among other things.
 * Example: 
 * DreamX.RandomMap.RandomNumber("1-4 7 10") will return numbers 1-4, 7 or 10.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * Free to use and modify for commercial and noncommercial games, with credit.
 * Credit Yanfly as I used some of the same code/concepts from their 
 * Item Core plugin.
 * ============================================================================
 * Credits
 * ============================================================================
 * DreamX
 * Thanks to Yanfly for code/concepts from their Item Core plugin.
 */

var Imported = Imported || {};
Imported.DreamX_RandomMap = true;

var DreamX = DreamX || {};
DreamX.RandomMap = DreamX.RandomMap || {};

(function () {
    var parameters = PluginManager.parameters('DreamX_RandomMapEvents');

    var parameterStartingId = parseInt(parameters['Starting Map ID'] || 100);
    var parameterFadeType = parseInt(parameters['Fade Type'] || 0);

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
        // remove generated maps from other saves
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
        // remove generated maps from other saves
        this.loadGeneratedMapInfos();
    };


    DreamX.RandomMap.Game_Interpreter_pluginCommand =
            Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function (command, args) {
        DreamX.RandomMap.Game_Interpreter_pluginCommand.call(this, command, args);
        switch (command) {
            case 'AllocateEvents':
                new DXMapRandomElements(args);
                break;
        }
    };

    DreamX.RandomMap.RandomNumber = function (string) {
        var choices = this.parseNumberRanges(string);
        if (!choices || choices.length === 0) {
            return;
        }

        var choice = parseInt(this.randomArrayElement(choices));

        return choice;
    };

    function DXMapRandomElements() {
        this.initialize.apply(this, arguments);
    }

    DXMapRandomElements.prototype.initialize = function (args) {
        var fadeType = parameterFadeType;
        this._tilesetId = $dataMap.tilesetId;

        if ($dataMap.meta.RandomTileset) {
            this._tilesetId = DreamX.RandomMap.RandomNumber($dataMap.meta.RandomTileset);
        }

        if (args && args.length >= 1) {
            fadeType = args[0];

            if (args[1]) {
                this._tilesetId = args[1];
            }
        }


        this._direction = $gamePlayer.direction();

        this._regionMap = new Map();

        if (fadeType >= 0 && fadeType <= 2) {
            this._fadeType = parseInt(fadeType);
        }



        // events to distribute to new data map
        this._events = [];
        // initialize with null
        for (var i = 0; i < $dataMap.events.length; i++) {
            this._events.push(null);
        }

        // class map keys
        this._regionIds = [];

        this._mapId = 0;

        // x and y coordinates
        this._x = $gamePlayer.x;
        this._y = $gamePlayer.y;

        this.allocate();
    };

    DXMapRandomElements.prototype.specialRegionId = function (x, y) {
        var tileId = $gameMap.tileId(x, y, 0);
        var isWall = Tilemap.isWallSideTile(tileId);
        var isRoof = Tilemap.isWallTopTile(tileId);
        var wallRegion = $dataMap.meta.AllocateWallAutotileRegion;
        var roofRegion = $dataMap.meta.AllocateRoofAutotileRegion;

        if (wallRegion && isWall) {
            return parseInt(wallRegion.trim());
        }
        if (roofRegion && isRoof) {
            return parseInt(roofRegion.trim());
        }

        return 0;
    };

    DXMapRandomElements.prototype.setRegionTiles = function () {
        for (var x = 0; x < $dataMap.width; x++) {
            for (var y = 0; y < $dataMap.height; y++) {
                var regionId = $gameMap.regionId(x, y);
                if (regionId === 0) {
                    var specialRegionId = this.specialRegionId(x, y);
                    if (specialRegionId === 0) {
                        continue;
                    } else {
                        regionId = specialRegionId;
                    }
                }

                if (!this._regionMap.has(regionId)) {
                    this._regionMap.set(regionId, []);
                }
                this._regionIds.push(regionId);

                this._regionMap.get(regionId).push({x: x, y: y});
            }
        }
    };

    DXMapRandomElements.prototype.testMinDistance = function (tile) {
        var valid = true;

        for (var j = 0; j < this._events.length; j++) {
            var otherEvent = this._events[j];
            if (!otherEvent) {
                continue;
            }

            var otherEventTag = otherEvent.meta.AllocateTag;
            if (!otherEventTag) {
                continue;
            }


            otherEventTag = otherEventTag.trim();

            if (!this._tagDistanceMap.has(otherEventTag)) {
                continue;
            }

            var minimumDistance = this._tagDistanceMap.get(otherEventTag);

            var xDistance = Math.abs(tile.x - otherEvent.x);
            var yDistance = Math.abs(tile.y - otherEvent.y);

            if (xDistance < minimumDistance && yDistance < minimumDistance) {
                valid = false;
                break;
            }
        }

        return valid;
    };

    DXMapRandomElements.prototype.testMinDistances = function (event, regionArray) {
        var validTiles = [];
        var split = event.meta.AllocateMinimumDistance.trim().split(" ");
        this._tagDistanceMap = new Map();

        if (split.length <= 1) {
            return regionArray;
        }

        for (var i = 0; i < split.length; ) {
            var tag = split[i];
            var distance = parseInt(split[i + 1]);

            this._tagDistanceMap.set(tag, distance);

            i += 2;
        }

        for (var i = 0; i < regionArray.length; i++) {
            var tile = regionArray[i];

            if (this.testMinDistance(tile)) {
                validTiles.push(tile);
            }
        }

        return validTiles;
    };

    DXMapRandomElements.prototype.setEvent = function (event) {
        var regionCandidates = [];
        var testRegions = [];

        if (!event) {
            return;
        }

        var regionId = event.meta.RandomRegion;
        if (!regionId) {
            return;
        }

        var testRegions = DreamX.RandomMap.parseNumberRanges(regionId);
        if (testRegions.length === 0) {
            return;
        }

        var regionMap = this._regionMap;
        regionCandidates = testRegions.filter(function (region) {
            return regionMap.has(region);
        });

        if (regionCandidates.length === 0) {
            return;
        }

        regionId = DreamX.RandomMap.randomArrayElement(regionCandidates);

        var regionArray = this._regionMap.get(regionId);

        if (event.meta.AllocateMinimumDistance) {
            regionArray = this.testMinDistances(event, regionArray);
        }

        if (regionArray.length === 0) {
            return;
        }

        var diceRoll = Math.floor(Math.random() * regionArray.length);
        var selectedCoors = regionArray[diceRoll];

        var eventCopy = JSON.parse(JSON.stringify(event));
        eventCopy.x = selectedCoors.x;
        eventCopy.y = selectedCoors.y;

        if (event.isAllocateClone) {
            eventCopy.id = this._events.length;
            this._events.push(eventCopy);
        } else {
            this._events[event.id] = eventCopy;
        }

        if (event.meta.AllocateStart) {
            this._x = eventCopy.x;
            this._y = eventCopy.y;
        }

        // remove coors from array
        regionArray.splice(diceRoll, 1);
        this._regionMap.set(regionId, regionArray);

        // delete key for full regions
        if (regionArray.length === 0 || event.meta.RemoveSelectedRegion) {
            this.removeRegion(regionId);
        }

        if (event.meta.RemoveRegion) {
            var regionsToRemove
                    = DreamX.RandomMap.parseNumberRanges(event.meta.RemoveRegion);
            this.removeRegions(regionsToRemove);
        }
    };

    DXMapRandomElements.prototype.removeRegions = function (regions) {
        for (var i = 0; i < regions.length; i++) {
            var region = regions[i];
            this.removeRegion(region);
        }
    };

    DXMapRandomElements.prototype.removeRegion = function (region) {
        this._regionMap.delete(region);
    };

    DXMapRandomElements.prototype.handleEvent = function (event) {
        var priority;
        var timesToTest = 1;
        var timesToPlace = 1;
        var diceRoll;

        if (!event || (!event.meta.AllocateSame && !event.meta.RandomRegion)) {
            return;
        }

        if (event.meta.AllocateSame) {
            this._events[event.id] = event;
            return;
        }

        if (event.meta.AllocateMin !== undefined) {
            var min = parseInt(event.meta.AllocateMin.trim());
            timesToTest = min;
            if (event.meta.AllocateMax !== undefined) {
                var max = parseInt(event.meta.AllocateMax.trim());
                if (min !== max && max > min) {
                    timesToTest = Math.floor(Math.random() * max) + min;
                }
            }
        }

        if (event.meta.AllocateChance) {
            timesToPlace = 0;
            var chance = parseInt(event.meta.AllocateChance.trim());
            for (var i = 0; i < timesToTest; i++) {
                var diceRoll = Math.floor(Math.random() * 100) + 1;
                if (diceRoll <= chance) {
                    timesToPlace++;
                }
            }
        } else {
            timesToPlace = timesToTest;
        }

        for (var i = 0; i < timesToPlace; i++) {
            // make a deep copy
            event = JSON.parse(JSON.stringify(event));

            if (i > 0) {
                event.isAllocateClone = true;
            }

            if (event.meta.AllocatePriority) {
                priority = parseInt(event.meta.AllocatePriority.trim());
                this._priorityEvents.push({event: event, priority: priority});
            } else {
                this._nonPriorityEvents.push({event: event});
            }
        }

    };

    DXMapRandomElements.prototype.setEvents = function () {
        var events = $dataMap.events.slice(0);
        this._priorityEvents = [];
        this._nonPriorityEvents = [];
        var allocateEvents = [];

        for (var i = 0; i < events.length; i++) {
            // make a deep copy
            var event = JSON.parse(JSON.stringify(events[i]));
            this.handleEvent(event);
        }

        this._priorityEvents.sort(function (a, b) {
            return a.priority - b.priority;
        });

        allocateEvents = this._priorityEvents.concat(this._nonPriorityEvents);

        for (var i = 0; i < allocateEvents.length; i++) {
            var event = allocateEvents[i];
            this.setEvent(event.event);
        }
    };

    DXMapRandomElements.prototype.createDataMap = function () {
        var newId = $dataMapInfos.length;

        var dataMapCopy = JSON.parse(JSON.stringify($dataMap));
        dataMapCopy.events = this._events;
        dataMapCopy.id = newId;
        delete dataMapCopy.meta.AllocateEvents;
        dataMapCopy.tilesetId = this._tilesetId;

        var dataMapInfoCopy = JSON.parse(JSON.stringify($dataMap));
        dataMapInfoCopy.id = newId;

        DataManager._generatedMaps.push(dataMapCopy);
        DataManager._generatedMapInfos.push(dataMapInfoCopy);
        $dataMapInfos.push(dataMapInfoCopy);

        return newId;
    };

    DXMapRandomElements.prototype.transferToNewMap = function (newId) {
        $gamePlayer.reserveTransfer(newId, this._x, this._y, this._direction,
                this._fadeType);
    };

    DXMapRandomElements.prototype.allocate = function () {
        this.setRegionTiles();
        this.setEvents();

        this._mapId = this.createDataMap();

        this.transferToNewMap(this._mapId);
    };

    DXMapRandomElements.prototype.mapId = function () {
        return this._mapId;
    };

    DreamX.RandomMap.DataManager_loadMapData = DataManager.loadMapData;
    DataManager.loadMapData = function (mapId) {
        if (this.setGeneratedDataMap(mapId)) {
            return;
        }
        DreamX.RandomMap.DataManager_loadMapData.call(this, mapId);
    };

    DataManager.setGeneratedDataMap = function (mapId) {
        if (mapId > parameterStartingId) {
            var id = mapId - parameterStartingId - 1;
            $dataMap = DataManager._generatedMaps[id];
            return true;
        }
        return false;
    };

    DreamX.RandomMap.Scene_Map_onMapLoaded = Scene_Map.prototype.onMapLoaded;
    Scene_Map.prototype.onMapLoaded = function () {
        if (DataManager.isMapLoaded()) {
            if ($dataMap.meta.AllocateEvents) {
                var o = new DXMapRandomElements();
                var id = o.mapId();
                DataManager.setGeneratedDataMap(id);
            }
        }
        DreamX.RandomMap.Scene_Map_onMapLoaded.call(this);
    };

    DreamX.RandomMap.randomArrayElement = function (array) {
        var diceRoll = Math.floor(Math.random() * array.length);
        var selected = array[diceRoll];
        return selected;
    };

    DreamX.RandomMap.parseNumberRanges = function (string) {
        var nums = [];
        var stringSplit = string.trim().replace(/,/g, " ").split(new RegExp("\\s{1,}"));

        for (var i = 0; i < stringSplit.length; i++) {
            var split = stringSplit[i].split("-");
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

    // fix a bug
    Tilemap.isWallSideTile = function (tileId) {
        // change: getAutotileKind(tileId) to this.getAutotileKind(tileId)
        return (this.isTileA3(tileId) || this.isTileA4(tileId)) &&
                this.getAutotileKind(tileId) % 16 >= 8;
    };

})();
