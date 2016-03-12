'use strict';

function Game () {}

//// multi-dimensional array of objects that will reference the general structure of the board in which we will manipulate as the game progresses. it will store the y, x coordinates for each object.
function Grid (x, y) {
    this.gridX = x;
    this.gridY = y;
};

// the object tile will have keys that reference the current index position
// it will also have the color, maybe?
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

    // assign to this.board so that we can invoke it later when we update/render?
    this.board = this.gridBoard();


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

        // setting the x, y coordinates of tileSprites

        for (var y = 0; y < 5; y++) {
            var tileRow = [];
            for (var x = 0; x < 5; x++) {
                var idx = x * 5 + y,
                    color = tileSprites[x].key,
                    xCor = x * TILE_SIZE,
                    yCor = y * TILE_SIZE;

                tileRow.push(new Tile(xCor, yCor, color));
                tileSprites[idx].x = xCor;
                tileSprites[idx].y = yCor;
            }
            tiles.push(tileRow);
        }
        return tiles;
    };

    this.tiles = this.tileSprites();



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

















