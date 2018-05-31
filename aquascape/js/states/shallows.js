// Aquascape Shallows state

var Shallows = function(game) {};

var map, mapLayer, mapLayer2, mapLayer3, mapLayer4, player, box, respawn;

Shallows.prototype = {
	preload: function() {
		console.log('Shallows: preload');
	},

	create: function() {
		console.log('Shallows: create');

		this.game.time.advancedTiming = true;
		this.game.debug.font = '9px Arial';

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.P2JS);
		console.log('P2 Physics Active');

		// Gravitay!
		game.physics.p2.gravity.y = 1000;
		console.log('Gravity is now 1000');

		game.stage.backgroundColor = "3075c9";

		 //Create a new tilemap object for Shallows.
		this.map = game.add.tilemap('shallows');
		//('Tileset name, 'key')
		this.map.addTilesetImage('shallowsTileSet1', 'shallowsheet');
		console.log('Tilemap Loaded');

		/*/ Create all layers of the tilemap.
		for (let layer of this.map["layers"]) {
			if (layer.name != 'Collision Layer' || layer.name != 'Object Layer') {
				this.map.createLayer((layer.name));
				console.log('Layer Created');
			}
		} */

		this.collisionlayer = this.map.createLayer('Collision Layer');
		console.log('Collision Layer Created');
		//this.collisionLayer.resizeWorld();
		this.map.setCollisionBetween(0, 256, true, this.collisionLayer);

		this.objectLayer = this.map.createLayer('Object Layer');

		//game.physics.p2.convertTilemap(map, this.collisionLayer);

		game.physics.p2.setBoundsToWorld(true, true, true, true, false);

		// Set up object groups.
		respawn = game.add.group();

		/*/ Set up collision groups for interactivity.
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var boxCollisionGroup = game.physics.p2.createCollisionGroup();
		var statueCollisionGroup = game.physics.p2.createCollisionGroup();
		var grateCollisionGroup = game.physics.p2.createCollisionGroup(); */


		// Create the player.
		this.map.createFromObjects('Object Layer', 1, '', 0, true, false, respawn);
		this.player = new Player(game, 0, 0);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);
		console.log('Player Spawned');

		this.spawn();

		// Create the crab.
		/*var crabSpawn = this.map.createFromObjects('Object Layer 1', 30, '', 0, true, false);
		this.crab = new Crab(game, crabSpawn.x, crabSpawn.y);
		this.game.add.existing(this.crab);
		console.log('Crab Spawned');*/

		/*/ Create the block.
		var blockSpawn = this.map.createFromObjects('Object Layer', 2, '', 0, true, false);
		this.block = new Box(game, blockSpawn.x, blockSpawn.y);
		this.game.add.existing(this.block);
		console.log('Block Spawned'); */

		// Create the statue.
		/*var statSpawn = this.map.createFromObjects('Object Layer 1', 31, '', 0, true, false);
		this.statue = new Statue(game, statSpawn.x, statSpawn.y);
		this.game.add.existing(this.statue);
		console.log('Statue Spawned');*/

		// Audio settings.
		this.music1 = this.game.add.audio('lvl1', 0.5, true);
		this.winSound = this.game.add.audio('win', 0.75, false);
		if (settings.musicOn) {
			this.music1.play();
		}
	},

	update: function() {
		// Dat.gui setting changes
		this.player.xSpeed = settings.moveSpeed;
		this.player.ySpeed = settings.moveSpeed;
		game.physics.p2.gravity.y = settings.gravity.y;

		/*if (this.statue.switchOn) {
			this.grate.body.gravity.y = 500;
		} */
	},
//
	render: function() {
		// Early return if gui has problems.
		if (this.game.gui === undefined || this.game.gui === null) return;

		if (settings.musicOn && !this.music1.isPlaying) {
			if (this.music1.paused) {
				this.music1.resume();
			} else {
				this.music1.play();
			}
		} else if (!settings.musicOn && this.music1.isPlaying) {
			this.music1.pause();
		}

		if (settings.debugFps) {
			this.game.debug.text('FPS: ' + game.time.fps, 16, 16, 'yellow');
		}
		if (settings.debugBoundingBox) {
			this.game.debug.body(this.player);
			//this.game.debug.body(this.box);
			//this.game.debug.body(this.statue);
			//this.game.debug.body(this.grate);
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
	},

	spawn: function() {

		respawn.forEach(function(spawnPoint) {

			player.reset(spawnPoint.x, spawnPoint.y);

		}, this)
	}
};
