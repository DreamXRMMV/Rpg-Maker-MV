/*:
 * @plugindesc 
 * 
 * <DreamX Sanshiro Map Gen EXT>
 * @author Extension by DreamX, original by Sanshiro
 *
 * @param Wall Height
 * @desc Processed as eval. The height of the walls. Default: 1
 * @default 1
 * 
 * @param Minimum Room Size
 * @desc Processed as eval. Minimum size of generated rooms. Default: 3
 * @default 3
 * 
 * @param Minimum Rooms
 * @desc Processed as eval. Minimum amount of rooms to generate if the map is 
 * large enough. Default: 2
 * @default 2
 * 
 * @param Maximum Rooms
 * @desc Processed as eval. Maximum amount of rooms to generate. Default: 5
 * @default 5
 * 
 * @param Space Between Walls
 * @desc Processed as eval. Whether there can be space tiles in between the inner walls. Default: true
 * @default true
 *
 * @help 
 * First, read the documentation from Sanshiro's Map Generator. Then, read this 
 * help for more clarification and instruction on how to use the additional 
 * features this extension offers.
 * 
 * Tiles: You MUST use autotiles for the tiles to display correctly. 
 * You can put other, normal tiles on top, but the bottom-most tile must be an 
 * autotile.
 * 
 * space :{x:0, y:0} - This is what is placed around the map and sometimes in 
 * between walls (unless you display that in this extension as a parameter).
 * room  :{x:0, y:1} - Room tiles.
 * pass  :{x:0, y:2} - Tiles for the passageways between rooms.
 * roof  :{x:0, y:3} - Tiles for the roofs of the walls.
 * wall  :{x:0, y:4} - Tiles for the walls.
 * rubble:{x:0, y:5} - Tiles that sometimes appear in passageways.
 * 
 * Events:
 * start:{x:1, y:0} - Place an event here. The event be whatever you want. 
 * I recommend putting stairs as the event graphic and a transfer command, but 
 * it's up to you. Use <SpecialWall:1> to force this event to start on a wall.
 * 
 * goal :{x:1, y:1} - Place an event here. The event be whatever you want. 
 * I recommend putting stairs as the event graphic and a transfer command, but 
 * it's up to you. Use <SpecialWall:1> to force this event to start on a wall.
 * 
 * All other coordinates: Place an event anywhere else (NOT where the start/goal or 
 * tiles are supposed to be) and then use a Rate notetag.
 * 
 * ============================================================================
 * Rate Notetags
 * ============================================================================
 * These notetags define the probability of non-start/goal events spawning on 
 * the map. x represents the % chance, from 0.0 to 1.0. If you wanted a 
 * 50% chance, for example, you would use 0.5
 * You should use only one Rate notetag for an event.
 * 
 * <RateRoom:x> The chance to appear in a room. This is tested for every room.
 * For example, if you entered 0.75, every room would have a 75% chance of 
 * having this event.
 * 
 * <RateRoomTile:x> The chance to appear on a room tile.
 * 
 * <RateWall:x> The chance to appear on a wall tile.
 * 
 * <StartRoomSpawn:x> The chance to appear in the room containing the start 
 * event.
 * <GoalRoomSpawn:x> The chance to appear in the room containing the room event.
 * 
 * ============================================================================
 * Extra Notetags
 * ============================================================================
 * These notetags allow you to further define the conditions for your event to 
 * spawn.
 * 
 * <MinimumStartDistance:x> x is the minimum distance away from the room 
 * containing the start event that this event can spawn. 
 * <MinimumGoalDistance:x> x is the minimum distance away from the room 
 * containing the goal event that this event can spawn. 
 * 
 * <NoStartRoomSpawn:1> This event may not spawn in the same room as the start 
 * event.
 * <NoGoalRoomSpawn:1> This event may not spawn in the same room as the start 
 * event.
 * 
 * <InnerWallOnly:1> If this event is set to spawn on wall tiles, it may only 
 * spawn on the inner walls.
 * <LowerWallOnly:1> If this event is set to spawn on wall tiles, and wall 
 * height is at least 2, this event may only spawn on the bottom wall tile.
 * <UpperWallOnly:1> If this event is set to spawn on wall tiles, and wall 
 * height is at least 2, this event may only spawn on the upper wall tile.
 * 
 * <NoPassageBlock:1> This event may not spawn in a location that would 
 * block a passageway. 
 * 
 * <Minimum:x> The minimum amount of times this event must be tested to appear 
 * on the map. If the rate for the event is 1.0, the event is almost guaranteed 
 * to spawn a minimum of this many times on the map.
 * <Maximum:x> The maximum amount of times this event may be tested to appear 
 * on the map. The event may not be spawned more than this many times.
 * ============================================================================
 * Tips
 * ============================================================================
 * Use fading in/out to hide the lag that may be caused while a map is 
 * generated.
 * ============================================================================
 * Terms Of Use
 * ============================================================================
 * This an extension done by DreamX of Sanshiro's Map Generator.
 * Please remember to credit Sanshiro if you use this or their original script.
 * Besides, this plugin does nothing without their plugin anyway.
 * 
 * Released under MIT license:
 * https://opensource.org/licenses/MIT
 * ============================================================================
 * Credits & Thanks
 * ============================================================================
 * DreamX
 */

//=============================================================================
// Import
//=============================================================================
var Imported = Imported || {};
Imported.DreamX_EXT_SAN_MapGenerator = true;

var DreamX = DreamX || {};
DreamX.EXT_SAN_MapGenerator = DreamX.EXT_SAN_MapGenerator || {};

(function () {

//=============================================================================
// Parameters
//=============================================================================
    var parameters = $plugins.filter(function (p) {
        return p.description.contains
                ('<DreamX Sanshiro Map Gen EXT>');
    })[0].parameters; //Thanks to Iavra

    var paramWallHeight = String(parameters['Wall Height'] || '1');
    var paramMinRoomSize = String(parameters['Minimum Room Size'] || '3');
    var paramMinRooms = String(parameters['Minimum Rooms'] || '2');
    var paramMaxRooms = String(parameters['Maximum Rooms'] || '5');
    var paramSpaceBetweenWalls = String(parameters['Space Between Walls'] || 'true');
    //var paramForceNarrow = String(parameters['Force Narrow Routes'] || 'false');

    Game_MapGenerator.prototype.setup = function () {
        $gameMap._events = [];
        for (key in $gameSelfSwitches._data) {
            if (key.split(",")[0] === String($gameMap.mapId())) {
                delete $gameSelfSwitches._data[key];
            }
        }
        this._isReady = false;
        this._blocks = [];
        this._rooms = [];
        this._passes = [];
        this._startXY = {x: 0, y: 0};
        this._goalXY = {x: 0, y: 0};
        this._data = [];
        this.initSymbolTable();
        this.initSymbolMap();
        this.generateMap();
        this.refreshWallAndRoof();
        // change: close cavities
        if (eval(paramSpaceBetweenWalls) === false) {
            this.closeCavities();
        }
        this.makeData();
        this.setStart();
        this.setGoal();
        this.setRateEvents();
        SceneManager._scene.createDisplayObjects();
        this._isReady = true;
    }

    _Game_MapGenerator_initialize = Game_MapGenerator.prototype.initialize;
    Game_MapGenerator.prototype.initialize = function () {
        _Game_MapGenerator_initialize.call(this);
        // change: wall height now parameter
        this._wallHeight = eval(paramWallHeight);
    };

    Game_MapGeneratorRoomAndPass.prototype.generateMap = function () {
        // change: _minRoomSize parameterized
        this._minRoomSize = eval(paramMinRoomSize);
        this._minBlockSize = this._minRoomSize + 2;
        // change: minRooms and maxRooms parameterized
        if (eval(paramMinRooms) >= 2) {
            this._minRooms = eval(paramMinRooms);
        }
        else {
            this._minRooms = 2;
        }
        if (eval(paramMaxRooms) >= 2) {
            this._maxRooms = eval(paramMaxRooms);
        }
        else {
            this._maxRooms = 2;
        }
        this._adjacentBlockIndexList = [];
        var block = {
            x: 1,
            y: 1 + this._wallHeight,
            w: $dataMap.width - 2,
            h: $dataMap.height - (this._wallHeight + 1) * 2
        };
        this._blocks.push(block);
        this.splitBlock(this._blocks[0]);
        this.makeAdjacentBlockIndexList();
        this.makeRooms();
        this.makePasses();
    };

    Game_MapGenerator.prototype.setStart = function () {
        var refXY = this._symbolTable['start'].refXY;
        var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
        var dataEvent = $dataMap.events[event._eventId];
        var newPlayerLocationX;
        var newPlayerLocationY;
        if (dataEvent.meta.SpecialWall) {
            this._startXY = this.setEvent(event, 'wall');
            // we want to spawn the player below the wall event so they dont get stuck
            newPlayerLocationY = this._startXY.y + 1;
            // set priority type to 1 (same as characters) so that player can touch event
            // to trigger it
            event.setPriorityType(1);
        }
        else {
            // change: call chooseRoom function
            var room = this.chooseRoom(event);
            // change: mark start room
            this._rooms[this._rooms.indexOf(room)].hasStart = true;
            // change: call setEvent with 'room' and room parameters
            this._startXY = this.setEvent(event, 'room', room);
            newPlayerLocationY = this._startXY.y;
        }
        newPlayerLocationX = this._startXY.x;

        $gamePlayer.locate(newPlayerLocationX, newPlayerLocationY);
        $gamePlayer.reserveTransfer($gameMap.mapId(), newPlayerLocationX, newPlayerLocationY);
        $gameMap._interpreter.setWaitMode('transfer')
    };

    Game_MapGenerator.prototype.setGoal = function () {
        var refXY = this._symbolTable['goal'].refXY;
        var event = new Game_Event($gameMap.mapId(), this.dataMapEventsXy(refXY.x, refXY.y)[0].id);
        var dataEvent = $dataMap.events[event._eventId];

        if (dataEvent.meta.SpecialWall) {
            // change: spawn on wall
            this._goalXY = this.setEvent(event, 'wall');
            // set priority type to 1 (same as characters) so that player can touch event
            // to trigger it
            event.setPriorityType(1);
        }
        else {
            // change: call chooseRoom function
            var room = this.chooseRoom(event);
            // change: mark goal room
            this._rooms[this._rooms.indexOf(room)].hasGoal = true;
            // change: call setEvent with 'room' and room parameters
            this._goalXY = this.setEvent(event, 'room', room);
        }
    };

    Game_MapGenerator.prototype.generateMap = function () {
        // change: added hasStart and hasGoal to room
        var room = {x: 0, y: 0, w: 0, h: 0, hasStart: false, hasGoal: false};
        room.x = 1;
        room.y = 1 + this._wallHeight;
        room.w = $dataMap.width - 2;
        room.h = $dataMap.height - (this._wallHeight + 1) * 2;
        for (var oX = 0; oX < room.w; oX++) {
            for (var oY = 0; oY < room.h; oY++) {
                this._symbolMap[oX + room.x][oY + room.y] = 'room';
            }
        }
        this._rooms.push(room);
    };

    Game_MapGenerator.prototype.canSetInRoom = function (room, event) {
        var dataEvent = $dataMap.events[event._eventId] ? $dataMap.events[event._eventId] : event;
        var NoStartRoomSpawn = dataEvent.meta.NoStartRoomSpawn ? true : false;
        var NoGoalRoomSpawn = dataEvent.meta.NoGoalRoomSpawn ? true : false;
        var StartRoomSpawn = dataEvent.meta.RateSpawn ? true : false;
        var GoalRoomSpawn = dataEvent.meta.RateGoal ? true : false;

        if (NoStartRoomSpawn === true && room.hasStart === true) {
            return false;
        }
        if (NoGoalRoomSpawn === true && room.hasGoal === true) {
            return false;
        }
        if (StartRoomSpawn === true && room.hasStart === false) {
            return false;
        }
        if (GoalRoomSpawn === true && room.hasGoal === false) {
            return false;
        }

        var viableTiles = this.viableTiles(event, 'room', room);
        if (viableTiles.length === 0) {
            return false;
        }
        return true;
    };

    Game_MapGenerator.prototype.chooseRoom = function (event) {
        var areaArray = [];

        this._rooms.forEach(function (room) {
            if (this.canSetInRoom(room, event)) {
                areaArray.push(room);
            }
        }, this);

        var randRoomNum = Math.floor(Math.random() * areaArray.length);

        return areaArray[randRoomNum];
    };

    Game_MapGeneratorRoomAndPass.prototype.makeRooms = function () {
        this._blocks.forEach(function (block) {
            var roomW = this._minRoomSize + Math.randomInt(block.w - this._minRoomSize - 2);
            var roomH = this._minRoomSize + Math.randomInt(block.h - this._minRoomSize - 2);
            var roomX = block.x + 1 + Math.randomInt(block.w - roomW - 2);
            var roomY = block.y + 1 + Math.randomInt(block.h - roomH - 2);
            // change: added hasStart and hasGoal to room
            var room = {x: roomX, y: roomY, w: roomW, h: roomH, hasStart: false, hasGoal: false};
            this._rooms.push(room);
        }, this);
        this._rooms.forEach(function (room) {
            for (var y = 0; y < room.h; y++) {
                for (var x = 0; x < room.w; x++) {
                    this._symbolMap[room.x + x][room.y + y] = 'room';
                }
            }
        }, this);
    };

    Game_MapGenerator.prototype.setRateEvents = function () {
        var mapDataRateMapEvents = $dataMap.events.filter(function (event) {
            return !!event && !!event.meta.RateMap;
        });
        mapDataRateMapEvents.forEach(function (mapDataEvent) {
            // change: check event meta for min/max
            var minimum = mapDataEvent.meta.Minimum
                    ? parseInt(mapDataEvent.meta.Minimum) : 1;
            var maximum = mapDataEvent.meta.Maximum
                    ? parseInt(mapDataEvent.meta.Maximum) : 1;
            var count = minimum;
            if (maximum - minimum >= 1) {
                count = Math.round((Math.random() * maximum) + minimum);
            }


            for (var i = 0; i < count; i++) {
                if (this.randBool(parseFloat(mapDataEvent.meta.RateMap))) {
                    var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
                    // change: select room by calling chooseRoom
                    var room = this.chooseRoom(event);
                    this.setEvent(event, 'room', room);
                }
            }
        }, this);

        var mapDataRateRoomEvents = $dataMap.events.filter(function (event) {
            return !!event && !!event.meta.RateRoom;
        });
        mapDataRateRoomEvents.forEach(function (mapDataEvent) {
            this._rooms.forEach(function (room) {
                // change: check event meta for min/max
                var minimum = mapDataEvent.meta.Minimum
                        ? parseInt(mapDataEvent.meta.Minimum) : 1;
                var maximum = mapDataEvent.meta.Maximum
                        ? parseInt(mapDataEvent.meta.Maximum) : 1;
                var count = minimum;
                if (maximum - minimum >= 1) {
                    count = Math.round((Math.random() * maximum) + minimum);
                }

                // change: make more than one attempt
                for (var i = 0; i < count; i++) {
                    // change: check if can set in room
                    if (this.canSetInRoom(room, mapDataEvent)) {
                        if (this.randBool(parseFloat(mapDataEvent.meta.RateRoom))) {
                            var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
                            this.setEvent(event, 'room', room);
                        }
                    }
                }
            }, this);
        }, this);

        var mapDataRateRoomTilesEvents = $dataMap.events.filter(function (event) {
            return !!event && !!event.meta.RateRoomTiles;
        });
        mapDataRateRoomTilesEvents.forEach(function (mapDataEvent) {
            // change: check event meta for min/max
            var minimum = mapDataEvent.meta.Minimum
                    ? parseInt(mapDataEvent.meta.Minimum) : 1;
            var maximum = mapDataEvent.meta.Maximum
                    ? parseInt(mapDataEvent.meta.Maximum) : 1;
            var count = minimum;
            if (maximum - minimum >= 1) {
                count = Math.round((Math.random() * maximum) + minimum);
            }


            for (var i = 0; i < count; i++) {
                if (this.randBool(parseFloat(mapDataEvent.meta.RateRoomTiles))) {
                    var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
                    // change: select room by calling chooseRoom
                    var room = this.chooseRoom(event);
                    this.setEvent(event, 'room', room);
                }
            }
        }, this);

        var mapDataRateWallsEvents = $dataMap.events.filter(function (event) {
            return !!event && !!event.meta.RateWall;
        });
        mapDataRateWallsEvents.forEach(function (mapDataEvent) {
            // change: check event meta for min/max
            var minimum = mapDataEvent.meta.Minimum
                    ? parseInt(mapDataEvent.meta.Minimum) : 1;
            var maximum = mapDataEvent.meta.Maximum
                    ? parseInt(mapDataEvent.meta.Maximum) : 1;
            var count = minimum;
            if (maximum - minimum >= 1) {
                count = Math.round((Math.random() * maximum) + minimum);
            }

            for (var i = 0; i < count; i++) {
                if (this.randBool(parseFloat(mapDataEvent.meta.RateWall))) {
                    var event = new Game_Event($gameMap.mapId(), mapDataEvent.id);
                    // change: select room by calling chooseRoom
                    var room = this.chooseRoom(event);
                    this.setEvent(event, 'wall');
                }
            }
        }, this);

    };

    Game_MapGenerator.prototype.startRoom = function () {
        var startRoom;
        this._rooms.forEach(function (room) {
            if (room.hasStart === true)
                startRoom = room;
        }, this);
        return startRoom;
    };

    Game_MapGenerator.prototype.goalRoom = function () {
        return this._rooms.forEach(function (room) {
            if (room.hasGoal === true)
                return room;
        }, this);
    };

    Game_MapGenerator.prototype.isWallRoofOrRubble = function (x, y) {
        switch (this._symbolMap[x][y]) {
            case 'roof':
            case 'wall':
            case 'rubble':
                return true;
                break;
        }
        return false;
    };

    Game_MapGenerator.prototype.isViableTile = function (event, targetSymbols, x, y) {
        var dataEvent = $dataMap.events[event._eventId]
                ? $dataMap.events[event._eventId] : event;

        var MinimumStartRoomDistance = dataEvent.meta.MinimumStartRoomDistance
                ? parseInt(dataEvent.meta.MinimumStartRoomDistance) : 0;
        var MinimumGoalRoomDistance = dataEvent.meta.MinimumGoalRoomDistance
                ? parseInt(dataEvent.meta.MinimumGoalRoomDistance) : 0;

        var MinimumStartDistance = dataEvent.meta.MinimumStartDistance
                ? parseInt(dataEvent.meta.MinimumStartDistance) : 0;
        var MinimumGoalDistance = dataEvent.meta.MinimumGoalDistance
                ? parseInt(dataEvent.meta.MinimumGoalDistance) : 0;

        var InnerWallOnly = dataEvent.meta.InnerWallOnly
                ? true : false;
        var OuterWallOnly = dataEvent.meta.OuterWallOnly
                ? true : false;
        var LowerWallOnly = dataEvent.meta.LowerWallOnly
                ? true : false;
        var MiddleWallOnly = dataEvent.meta.MiddleWallOnly
                ? true : false;
        var UpperWallOnly = dataEvent.meta.UpperWallOnly
                ? true : false;
        // tile must be a pass tile adjacent to a room
        var DoorWayOnly = dataEvent.meta.DoorWayOnly
                ? true : false;
        // tile may not be block a pass
        var NoPassageBlock = dataEvent.meta.NoPassageBlock
                ? true : false;

        // if tile doesn't match desired type, tile not viable
        if (this._symbolMap[x][y] !== targetSymbols) {
            return false;
        }
        // if there is already an event here, return false
        if ($gameMap.eventsXy(x, y).length !== 0) {
            return false;
        }
        
        if (NoPassageBlock === true) {
            // check passability to the left
            if (this.isWallRoofOrRubble(x - 1, y) === false && this.isWallRoofOrRubble(x - 1, y + 1) === true
                    && this.isWallRoofOrRubble(x - 1, y - 1) === true) {
                return false;
            }
            // check passability to the right
            if (this.isWallRoofOrRubble(x + 1, y) === false && this.isWallRoofOrRubble(x + 1, y + 1) === true
                    && this.isWallRoofOrRubble(x + 1, y - 1) === true) {
                return false;
            }
            // check passability up
            if (this.isWallRoofOrRubble(x, y - 1) === false && this.isWallRoofOrRubble(x + 1, y - 1) === true
                    && this.isWallRoofOrRubble(x - 1, y - 1) === true) {
                return false;
            }
            // check passability down
            if (this.isWallRoofOrRubble(x, y + 1) === false && this.isWallRoofOrRubble(x + 1, y + 1) === true
                    && this.isWallRoofOrRubble(x - 1, y + 1) === true) {
                return false;
            }
        }

//        // if there is a minimum distance from the start room and tile is too
//        // close, tile not viable
//        if (this.startRoom() && MinimumStartRoomDistance >= 1) {
//			console.log("startRoom x: " + this.startRoom().x);
//			console.log("startRoom x + w" + (this.startRoom().x + this.startRoom().w));
//			console.log("startRoom y: " + this.startRoom().y);
//			console.log("startRoom y + h" + (this.startRoom().y + this.startRoom().h));
//            if (Math.abs(x - (this.startRoom().x)) + Math.abs(y - (this.startRoom().y)) < MinimumStartRoomDistance + 1) {
//                return false;
//            }
//            if (Math.abs(x - (this.startRoom().x - this.startRoom().w)) 
//                    + Math.abs(y - (this.startRoom().y + this.startRoom().h))
//                    < MinimumStartRoomDistance + 1) {
//                return false;
//            }
//        }
//
//        // if there is a minimum distance from the goal room and tile is too
//        // close, tile not viable
//        if (this.goalRoom() && MinimumGoalRoomDistance >= 1) {
//            var distance = Math.abs(x - (this.goalRoom().x))
//                    + Math.abs(x - (this.goalRoom().x + this.goalRoom().w)
//                            + Math.abs(y - (this.goalRoom().y))
//                            + Math.abs(y - (this.goalRoom().y + this.goalRoom().h)));
//
//            if (distance < MinimumGoalRoomDistance + 1) {
//                return false;
//            }
//        }

        // if there is a minimum distance from the start event and tile is too
        // close, tile not viable
        if (this._startXY && MinimumStartDistance >= 1) {
            var distance = Math.abs(x - this._startXY.x) + Math.abs(y - this._startXY.y);
            if (distance < MinimumStartDistance + 1) {
                return false;
            }
        }

        // if there is a minimum distance from the goal event and tile is too
        // close, tile not viable
        if (this._goalXY && MinimumGoalDistance >= 1) {
            var distance = Math.abs(x - this._goalXY.x) + Math.abs(y - this._goalXY.y);
            if (distance < MinimumGoalDistance + 1) {
                return false;
            }
        }

        if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && UpperWallOnly === true) {
            // if the tile above is not roof, then not upper wall
            if (this._symbolMap[x][y - 1] !== 'roof') {
                return false;
            }
            // if the tile below is not wall, then not upper wall
            if (this._symbolMap[x][y + 1] !== 'wall') {
                return false;
            }
        }

        if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && LowerWallOnly === true) {
            // if the tile above is not wall, then not lower wall
            if (this._symbolMap[x][y - 1] !== 'wall') {
                return false;
            }
            // if the tile below is wall, then not lower wall
            if (this._symbolMap[x][y + 1] === 'wall') {
                return false;
            }
        }

        // if any tile below (for wall height) is space or 
        // any tile above (for wall height) is roof, it is 
        // the outer wall so return false
        if ((dataEvent.meta.RateWall || dataEvent.meta.SpecialWall) && InnerWallOnly === true) {
            // if tile below is roof, don't spawn
            if (this._symbolMap[x][y + 1] === 'roof') {
                return false;
            }

            // find position of tile on wall
            var tilesAboveToRoof = 1;
            if (this._symbolMap[x][y - 1] !== 'roof') {
                for (tilesAboveToRoof = 1; this._symbolMap[x][y - tilesAboveToRoof] !== 'roof'; tilesAboveToRoof++) {
                    // nothing
                }
            }

            if (this._symbolMap[x][y - tilesAboveToRoof + this._wallHeight + 1]
                    === 'space') {
                return false;
            }
        }

        return true;
    };

    Game_MapGenerator.prototype.viableTiles = function (event, targetSymbols, targetArea) {
        var coorsArray = [];
        for (var x = targetArea.x; x < targetArea.x + targetArea.w; x++) {
            for (var y = targetArea.y; y < targetArea.y + targetArea.h; y++) {
                if (this.isViableTile(event, targetSymbols, x, y)) {
                    var coors = {xCoor: x, yCoor: y};
                    coorsArray.push(coors);
                }
            }
        }
        return coorsArray;
    };

    Game_MapGenerator.prototype.setEvent = function (event, targetSymbols, targetArea) {
        targetSymbols = targetSymbols || ['room'];
        targetArea = targetArea || {x: 0, y: 0, w: $dataMap.width, h: $dataMap.height};
        var canSet = false;
        var viableTiles = this.viableTiles(event, targetSymbols, targetArea);
        if (viableTiles.length >= 1) {
            canSet = true;
        }

        if (canSet) {
            // choose a random index from the array
            var randCoorNum = Math.floor(Math.random() * viableTiles.length);
            $gameMap._events.push(event);
            event._eventId = $gameMap._events.indexOf(event);
            event.setPosition(viableTiles[randCoorNum].xCoor, viableTiles[randCoorNum].yCoor);
            return {x: viableTiles[randCoorNum].xCoor, y: viableTiles[randCoorNum].yCoor};
        } else {
            return undefined;
        }
    };

    Game_MapGenerator.prototype.closeCavities = function () {
        for (var x = 0; x < this._symbolMap.length; x++) {
            for (var y = 0; y < this._symbolMap[x].length; y++) {
                if ((this._symbolMap[x][y] === 'space' || this._symbolMap[x][y] === 'wall') && this._symbolMap[x][y + 1] === 'roof') {
                    var outerSpace = true;
                    var j = 0;
                    while (y - j !== 0) {
                        if (this._symbolMap[x][y - j] !== 'space') {
                            outerSpace = false;
                        }
                        j++;
                    }
                    var i = 0;
                    if (outerSpace === false) {
                        while (this._symbolMap[x][y - i] === 'space' || this._symbolMap[x][y - i] === 'wall') {
                            this._symbolMap[x][y - i] = 'roof';
                            i++;
                        }
                    }

                }
            }
        }
    };

})();