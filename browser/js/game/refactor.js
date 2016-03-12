Game.prototype.create = function () {

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

    var board = [],
        row = [],
        TILE_SIZE = 64,
        tileSprites = [],
        imageKey = ['white','red','blue', 'orange', 'green', 'yellow'];

    // generate the 4 tiles of each color in the imageKey array.
    this.tileSprites = function () {

        tileSprites.push(this.game.add.sprite(0,0, 'black'));

        for (var p = 0; p < imageKey.length; p++) {
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
            tileSprites.push(this.game.add.sprite(0, 0, imageKey[p]));
        }

        this.shuffle(tileSprites);
    };

    for (var y = 0; y < 5; y++) {
        for (var x = 0; x < 5; x++) {

            var idx = x * 5 + y;
            tileSprites[idx].x = x * TILE_SIZE;
            tileSprites[idx].y = y * TILE_SIZE;

        }
    }



    this.tiles = this.tileSprites();
    //var test = tileSprites[0];
    //test.x = 64
    //test.y = 64
    ////console.log(test)
    console.log(tileSprites);









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

