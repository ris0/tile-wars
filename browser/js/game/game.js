'use strict';

function Game () {}


Game.prototype.preload = function () {
    this.load.image('black', '../../assets/black.png');
    this.load.image('white', '../../assets/white.png');
    this.load.image('red', '../../assets/red.png');
    this.load.image('blue', '../../assets/blue.png');
    this.load.image('orange', '../../assets/orange.png');
    this.load.image('green', '../../assets/green.png');
    this.load.image('yellow', '../../assets/yellow.png');
};

Game.prototype.create = function () {

    this.tileSprites = function () {
        var TILE_SIZE = 64,
            tileSprites = [],
            tiles = [],
            imageKey = ['white','red','blue', 'orange', 'green', 'yellow'];

        tileSprites.push(this.game.add.sprite(0,0, 'black'));

        for (var p = 0; p < imageKey.length; p++) {
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
        }

        this.shuffle(tileSprites);

        for (var y = 0; y < 5; y++) {
            var tileRow = [];
            for (var x = 0; x < 5; x++) {
                var idx = x * 5 + y;
                tileSprites[idx].x = x * TILE_SIZE;
                tileSprites[idx].y = y * TILE_SIZE;
                tileSprites[idx].inputEnabled = true;
                tileSprites[idx].input.draggable= true;
                //tileSprites[idx].event.onDragStart(console.log('hi'))
                tileRow.push(tileSprites[idx]);
            }
            tiles.push(tileRow);

        }

        return tiles;
    };

    this.tiles = this.tileSprites();
    var test = this.tiles[0][0];
    console.log(test);


};

Game.prototype.update = function () {
    // if this is selected, console.log it's position right now
    // sprite.input.pointerData => id, isDown, isDragged, isOut, isOver, isUp

};



Game.prototype.render = function () {};
Game.prototype.shuffle = function (array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};

var game = new Phaser.Game(512,512, Phaser.AUTO, 'game');
game.state.add('game', Game);
game.state.start('game');



//
//
//TestGame.Unit = function (game, x, y, faction, job) {
//    var frameIdx = faction * TestGame.jobs.length + job;
//    Phaser.Sprite.call(this, game, x, y, 'spritesheet-units', frameIdx);
//    this.name = 'unit';
//
//    /* INITIALIZATION */
//
//    this.inputEnabled = true;
//    this.input.useHandCursor = true;
//    this.events.onInputDown.add(this.select, this);
//    this.events.onInputUp.add(this.release, this);
//    return this;
//};
//
//
//TestGame.Unit.prototype = Object.create(Phaser.Sprite.prototype);
//TestGame.Unit.prototype.constructor = TestGame.Unit;
//TestGame.Unit.prototype.select = function () {
//    this.game.events.onUnitSelected.dispatch(this);
//};
//
//TestGame.Unit.prototype.selectMove = function () {
//    this.game.events.onUnitMoveSelect.dispatch(this);
//    this.game.input.onUp.add(this.processClickMove, this);
//};
//TestGame.Unit.prototype.processClickMove = function (pointer) {
//    if (pointer.duration <= 150) {
//        // in case they are dragging
//        // this.moveTo({x: pointer.worldX, y:pointer.worldY});
//        // this.game.input.onUp.remove(this.processClickMove, this);
//        // }};
//        TestGame.Game.prototype = {
//            create: function () {
//                if (!this.game.events) this.game.events = {};
//                this.game.events.onUnitSelected = new Phaser.Signal();
//                this.game.events.onUnitMoveSelect = new Phaser.Signal();
//                this.game.events.onUnitSelected.add(this.handleUnitSelect, this);
//                this.game.events.onUnitMoveSelect.add(this.handleUnitMoveSelect, this);
//            }, update: function () {        ...
//            }...spawnUnit
//    :
//        function (castle) {
//            var unit;		// game, x, y, faction, icon		unit = new TestGame.Unit(this.game, 			    castle.x + 16,			    castle.y + 16,			    castle.properties.faction,			    this.game.rnd.integerInRange(0, TestGame.jobs.length-1)			);		this.game.add.existing(unit);		party.revive(100);		if (TestGame.factions[unit.properties.faction] === 'player') {		    this.playerParties.add(unit);		} else if (unit.properties.faction === 'foe') {		    this.foeParties.add(unit);		} else {		    this.neutralParties.add(unit);		}	},		handleUnitSelect : function (unit) {		if (TestGame.factions[unit.properties.faction] === 'player') {		    this.playerUnitSelected = unit;		    this.selectedUnitMenu.clearButtonHandle('move');		    this.selectedUnitMenu.clearButtonHandle('cancel');		    		    this.selectedUnitMenu.addButtonHandle('move', unit.selectMove, unit);		    this.selectedUnitMenu.addButtonHandle('cancel', this.selectedUnitMenu.hide, this.selectedUnitMenu);		    		    this.selectedPartyMenu.show({			x : party.x + 64,			y : party.y		    });		}	},	handleUnitMoveSelect : function (unit) {		this.selectedUnitMenu.hide();	}};
//









