// Aquascape Shallows state

var Shallows = function(game) {};

var map, mapLayer, mapLayer2, mapLayer3, mapLayer4, player, box;

Shallows.prototype = {
	preload: function() {
		console.log('Shallows: preload');
	},

	create: function() {
		console.log('Shallows: create');

		this.game.time.advancedTiming = true;
		this.game.debug.font = '9px Arial';

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.stage.backgroundColor = "3075c9";

		 //Create a new tilemap object for Shallows.
		map = game.add.tilemap('shallows');
		//('Tileset name, 'key')
		map.addTilesetImage('shallowsSheet', 'shallowsheet');

		map.setCollisionByExclusion([]);
		//(tileset layer name)
		mapLayer2 = map.createLayer('backDrop');
		apLayer3 = map.createLayer('Decoration');
		apLayer4 = map.createLayer('blueSand');
		mapLayer = map.createLayer('collisionLayer');


		mapLayer.resizeWorld(); 

		// Create the player.
		this.player = new Player(game, 180, game.world.height - 180);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Create the box.
		this.box = new Box(game, game.world.width/2 , 45, 'atlas', 'box');
		this.game.add.existing(this.box);

		// Create the pedestal.
		this.statue = new Statue(game, game.world.width - 180, game.world.height - 100);
		this.game.add.existing(this.statue);

		// Create the grate.
		this.grate = new Grate(game, 150, 150);
		this.game.add.existing(this.grate);

		// Audio settings.
		this.music = this.game.add.audio('lvl1', 0.5, true);
		this.winSound = this.game.add.audio('win', 0.75, false);
		if (settings.musicOn) {
			this.music.play();
		}
	},

	update: function() {
		// Collision checks.
		this.game.physics.arcade.collide(this.player, this.box);
		this.game.physics.arcade.collide(this.player, this.statue);
		this.game.physics.arcade.collide(this.box, this.statue, this.boxCollide, null, this);

		// Dat.gui setting changes
		this.player.xSpeed = settings.moveSpeed;
		this.player.ySpeed = settings.moveSpeed;
		this.player.body.gravity.y = settings.gravity;

		if (this.statue.switchOn) {
			this.grate.body.gravity.y = 500;
		}
	},

	render: function() {
		// Early return if gui has problems.
		if (this.game.gui === undefined || this.game.gui === null) return;

		if (settings.musicOn && !this.music.isPlaying) {
			if (this.music.paused) {
				this.music.resume();
			} else {
				this.music.play();
			}
		} else if (!settings.musicOn && this.music.isPlaying) {
			this.music.pause();
		}

		if (settings.debugFps) {
			this.game.debug.text('FPS: ' + game.time.fps, 16, 16, 'yellow');
		}
		if (settings.debugBoundingBox) {
			this.game.debug.body(this.player);
			this.game.debug.body(this.box);
			this.game.debug.body(this.statue);
		}
		if (settings.debugPlayerBodyInfo) {
			this.game.debug.bodyInfo(this.player, 16, 16);
		}
		if (settings.debugCameraInfo) {
			this.game.debug.cameraInfo(this.game.camera, 16, 16);
		}
	},

	boxCollide: function() {
		this.box.destroy();
		this.statue.switchOn = true;
		this.winSound.play();
		game.time.events.add(Phaser.Timer.SECOND * 2, function() {game.state.start('GameOver')});
	}
};
