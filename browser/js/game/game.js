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

    // TILE SPRITES //// TILE SPRITES //// TILE SPRITES //// TILE SPRITES //
    this.tileSprites = function () {
        var TILE_SIZE = 32.5,
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
                t.hitArea = new Phaser.Rectangle(16,16,32,32);

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
    // TILE SPRITES //// TILE SPRITES //// TILE SPRITES //




    // WINNING PATTERN //// WINNING PATTERN //// WINNING PATTERN //
    this.winningPattern = function () {
        var patternSprites = [],
            patternKey = ['white','red','blue', 'orange', 'green', 'yellow','white','red','blue', 'orange', 'green', 'yellow'];


        var patternIdx1 = Math.floor(Math.random() * 10  );
        var patternIdx2 = Math.floor(Math.random() * 10  );
        var patternIdx3 = Math.floor(Math.random() * 10  );
        var patternIdx4 = Math.floor(Math.random() * 10  );
        var patternIdx5 = Math.floor(Math.random() * 10  );
        var patternIdx6 = Math.floor(Math.random() * 10  );
        var patternIdx8 = Math.floor(Math.random() * 10  );
        var patternIdx9 = Math.floor(Math.random() * 10  );


        patternSprites.push([this.add.sprite(0, 320, patternKey[patternIdx1]), this.add.sprite(32.5, 320, patternKey[patternIdx4]), this.add.sprite(65, 320, patternKey[patternIdx5])])
        patternSprites.push([this.add.sprite(32.5, 352, patternKey[patternIdx2]), this.add.sprite(65, 352, patternKey[patternIdx6]), this.add.sprite(0, 352, patternKey[patternIdx8])]);
        patternSprites.push([this.add.sprite(0, 384, patternKey[patternIdx6]), this.add.sprite(32.5, 384, patternKey[patternIdx3]), this.add.sprite(65, 384, patternKey[patternIdx9])]);


        return patternSprites;
    };

    this.pattern = this.winningPattern();
    //console.log(Object.keys(this.pattern[0][0]));
    // WINNING PATTERN //// WINNING PATTERN //// WINNING PATTERN //




};

Game.prototype.update = function () {

    this.insideGrid = [
        [this.tiles[1][1], this.tiles[1][2], this.tiles[1][3] ],
        [this.tiles[2][1], this.tiles[2][2], this.tiles[2][3] ],
        [this.tiles[3][1], this.tiles[3][2], this.tiles[3][3] ]
    ];

    if ( this.pattern[0][0].key === this.insideGrid[0][0].key &&
         this.pattern[0][1].key === this.insideGrid[0][1].key &&
         this.pattern[0][2].key === this.insideGrid[0][2].key &&
         this.pattern[0][0].key === this.insideGrid[0][0].key &&
         this.pattern[0][1].key === this.insideGrid[0][1].key &&
         this.pattern[0][2].key === this.insideGrid[0][2].key &&
         this.pattern[0][0].key === this.insideGrid[0][0].key &&
         this.pattern[0][1].key === this.insideGrid[0][1].key &&
         this.pattern[0][2].key === this.insideGrid[0][2].key
    ) { console.log("WIN") }



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

var game = new Phaser.Game(320,525, Phaser.CANVAS, 'game');
game.state.add('game', Game);
game.state.start('game');














