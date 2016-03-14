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

    this.physics.startSystem(Phaser.Physics.ARCADE);

    this.tileSprites = function () {
        var TILE_SIZE = 65,
            tileSprites = [],
            tiles = [],
            imageKey = ['white','red','blue', 'orange', 'green', 'yellow'];

        tileSprites.push(this.add.sprite(0,0, 'black'));

        for (var p = 0; p < imageKey.length; p++) {
            tileSprites.push(this.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.add.sprite(0, 0, imageKey[p]));
        }

        this.shuffle(tileSprites);

        for (var y = 0; y < 5; y++) {
            var tileRow = [];

            for (var x = 0; x < 5; x++) {
                var idx = x * 5 + y;
                var t = tileSprites[idx];

                this.physics.enable(t, Phaser.Physics.ARCADE);

                t.body.collideWorldsBound = true;
                t.body.checkCollision.up = true;
                t.body.checkCollision.down = true;

                t.x = x * TILE_SIZE;
                t.y = y * TILE_SIZE;
                t.inputEnabled = true;
                t.input.draggable = true;
                t.hitArea = new Phaser.Rectangle(32,32,65,65);

                t.input.snapOnRelease = true;
                t.input.snapX = TILE_SIZE;
                t.input.snapY = TILE_SIZE;

                tileRow.push(t);
            }
            tiles.push(tileRow);

        }

        return tiles;
    };

    this.tiles = this.tileSprites();


};

Game.prototype.update = function () {
    // if this is selected, console.log it's position right now
    // sprite.input.pointerData => id, isDown, isDragged, isOut, isOver, isUp

    //if (game.input.mousePointer.isDown) {
    //    console.log("Mouse X when you clicked was: "+game.input.mousePointer.x);
    //}

//Assign a callback and a context to a click event
//    game.input.onDown.add(callback, context);
//    var testTiles = this.tiles;
//    for (var y = 0; y < 5; y++) {
//
//        for (var x = 0; x < 5; x++) {
//            //console.log(allTiles[i][j].x, allTiles[i][j].y);
//
//            var sprite = testTiles[x][y];
//            var sprite1 = testTiles[x+1][y];
//            //console.log(sprite.key, x, y);
//            this.physics.arcade.collide(sprite, sprite1)
//        }
//
//    }


};



Game.prototype.render = function () {

    //var allTiles = this.tiles;
    //for (var y = 0; y < 5; y++) {
    //
    //    for (var x = 0; x < 5; x++) {
    //        //console.log(allTiles[i][j].x, allTiles[i][j].y);
    //
    //        var sprite = allTiles[x][y];
    //        //console.log(sprite.key, x, y);
    //        game.debug.bodyInfo(sprite);
    //    }
    //
    //}


};

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

var game = new Phaser.Game(512,512, Phaser.CANVAS, 'game');
game.state.add('game', Game);
game.state.start('game');










/*
 var Board = function (columns, rows) {

 var board = [];
 var group = game.add.group();

 for (var y=0; y<rows; y++) {
 var row = [];

 for (var x=0; x<columns; x++) {
 var tile = new Tile(x, y, group);
 row.push(tile);
 }

 board.push(row);
 }

 this.moveTo = function (x, y) {
 group.x = x;
 group.y = y;
 };

 };
 */




