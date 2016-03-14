
BasicGame.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

BasicGame.Preloader.prototype = {

	preload: function () {

		
		this.bck = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBackground');
		this.bck.anchor.setTo(0.5,0.5);
		this.bck.scale.setTo(0.5,0.5);
		this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderBar');
		this.preloadBar.anchor.setTo(0,0.5);
		this.preloadBar.scale.setTo(0.5,1);
		this.preloadBar.x = this.world.centerX - this.preloadBar.width/2;
		
		
		this.load.setPreloadSprite(this.preloadBar);

		this.load.atlas('spriteset', 'assets/spriteset.png', 'assets/spriteset.jsona');
		//this.load.atlas('spritesheet', 'assets/spritesheet.png', 'assets/spritesheet.jsona');
		this.load.audio('music', ['assets/music.mp3','assets/music.ogg','assets/music.wav','assets/music.m4a']);


		this.load.image('black', '../../assets/black.png');
		this.load.image('white', '../../assets/white.png');
		this.load.image('red', '../../assets/red.png');
		this.load.image('blue', '../../assets/blue.png');
		this.load.image('orange', '../../assets/orange.png');
		this.load.image('green', '../../assets/green.png');
		this.load.image('yellow', '../../assets/yellow.png');


	},

	create: function () {

		this.preloadBar.cropEnabled = false;

	},

	update: function () {

		
		
		if (this.cache.isSoundDecoded('music') && this.ready == false)
		{
			this.ready = true;
			this.state.start('Game');
		}

	}

};
