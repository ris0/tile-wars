'use strict';

function loadState () {
    var state = {},
        game = window.game;

    state.preload = function () {
        game.load.image('black', '../../assets/black.png');
        game.load.image('white', '../../assets/white.png');
        game.load.image('red', '../../assets/red.png');
        game.load.image('blue', '../../assets/blue.png');
        game.load.image('orange', '../../assets/orange.png');
        game.load.image('green', '../../assets/green.png');
        game.load.image('yellow', '../../assets/yellow.png');
    }

    state.create = function () {

    }
}

function Game () {}

/*
 Grid is a constructor function that allows us to define object that contain
 coordinates that represent the gridBoard itself. Reference the gridBoard by
 accessing a G
 */

function Grid (x, y) {
    this.x = x;
    this.y = y;
}

function Tile (x, y, key) {
    // y is vertical
    this.x = x;
    this.y = y;
    this.pos = [x,y];
    this.color = key;
}

var game = new Phaser.Game(512,512, Phaser.AUTO, 'game');

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

    // generate grid board that will be an array of objects. each object will represent a tile.
    this.gridBoard = function () {
        var board = [];

        for (var y = 0; y < 5; y++) {
            var row = [];
            for (var x = 0; x < 5; x++) {
                row.push(new Grid(x, y));
            }
            board.push(row);
        }
        return board;
    };

    this.board = this.gridBoard();
    // this.board = [{},{},{}]

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

        // now that we finished tileSprites, let's get the position of them and
        // setting the x, y coordinates of tiles
        for (var y = 0; y < 5; y++) {
            var tileRow = [];
            for (var x = 0; x < 5; x++) {
                var idx = x * 5 + y,
                    xCor = x * TILE_SIZE,
                    yCor = y * TILE_SIZE,
                    color = tiles[x].key;

                tileRow.push(new Tile(xCor, yCor, color));
                tiles[idx].x = xCor;
                tiles[idx].y = yCor;
            }
            tiles.push(tileRow);
        }
        return tiles;
    };

    //this.board.tiles = this.tileSprites
    this.tiles = this.tileSprites();
    console.log("board", this.board)
    console.log("tiles", this.tiles);




};

Game.prototype.update = function () {

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


game.state.add('game', Game);
game.state.start('game');

















