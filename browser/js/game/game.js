var game = new Phaser.Game(400, 490, Phaser.AUTO, 'gameDiv');

var mainState = {

    preload: function() {
        game.stage.backgroundColor = '#71c5cf';

        game.load.image('bird', '../../assets/joe.png');
        game.load.image('pipe', '../../assets/pipe.png');

        // Load the jump sound
        game.load.audio('jump', '../../assets/jump.wav');
    },

    create: function() {
        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.pipes = game.add.group();
        this.pipes.enableBody = true;
        this.pipes.createMultiple(20, 'pipe');
        this.timer = this.game.time.events.loop(1500, this.addRowOfPipes, this);

        this.bird = this.game.add.sprite(100, 245, 'bird');
        game.physics.arcade.enable(this.bird);
        this.bird.body.gravity.y = 1000;

        // New anchor position
        this.bird.anchor.setTo(-0.2, 0.5);

        var spaceKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        spaceKey.onDown.add(this.jump, this);

        this.score = 0;
        this.labelScore = this.game.add.text(20, 20, "0", { font: "30px Arial", fill: "#ffffff" });

        // Add the jump sound
        this.jumpSound = this.game.add.audio('jump');
    },

    update: function() {
        if (this.bird.inWorld == false)
            this.restartGame();

        game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);

        // Slowly rotate the bird downward, up to a certain point.
        if (this.bird.angle < 20)
            this.bird.angle += 1;
    },

    jump: function() {
        // If the bird is dead, he can't jump
        if (this.bird.alive == false)
            return;

        this.bird.body.velocity.y = -350;

        // Jump animation
        game.add.tween(this.bird).to({angle: -20}, 100).start();

        // Play sound
        this.jumpSound.play();
    },

    hitPipe: function() {
        // If the bird has already hit a pipe, we have nothing to do
        if (this.bird.alive == false)
            return;

        // Set the alive property of the bird to false
        this.bird.alive = false;

        // Prevent new pipes from appearing
        this.game.time.events.remove(this.timer);

        // Go through all the pipes, and stop their movement
        this.pipes.forEachAlive(function(p){
            p.body.velocity.x = 0;
        }, this);
    },

    restartGame: function() {
        game.state.start('main');
    },

    addOnePipe: function(x, y) {
        var pipe = this.pipes.getFirstDead();

        pipe.reset(x, y);
        pipe.body.velocity.x = -200;
        pipe.checkWorldBounds = true;
        pipe.outOfBoundsKill = true;
    },

    addRowOfPipes: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++)
            if (i != hole && i != hole +1)
                this.addOnePipe(400, i*60+10);

        this.score += 1;
        this.labelScore.text = this.score;
    },
};

game.state.add('main', mainState);
game.state.start('main');

/*
 'use strict'


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

 */




