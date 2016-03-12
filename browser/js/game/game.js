'use strict';

function Game () {}

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
                tileRow.push(tileSprites[idx]);
            }
            tiles.push(tileRow);

        }

        return tiles;
    };

    this.tiles = this.tileSprites();
    var test = this.tiles[4][4];
    console.log(test.key)
    console.log(test.x)
    console.log(test.y)
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














