// Aquascape Shallows state

var Shallows = function(game) {};
Shallows.prototype = {
	preload: function() {
		console.log('Shallows: preload');

	},

	create: function() {
		console.log('Shallows: create');

		this.backdrop = game.add.sprite(0, 0, 'lvl1_backdrop');

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Loads Tilemap
		this.map = game.add.tilemap('shallows');
		this.map.addTilesetImage('shallowsTileSet1', 'shallowsheet');
		console.log('Tilemap Loaded');

		// Create all layers of the tilemap.
		for (let layer of this.map["layers"]) {
			if (layer.name != 'Collision Layer') {
				this.map.createLayer((layer.name));
				console.log('We creatin: ' + layer.name);
			}
		}

		// Creates the collision layer of the tilemap.
		this.collisionlayer = this.map.createLayer('Collision Layer');
		console.log('We creatin: ' + this.collisionlayer.layer.name);

		this.collisionlayer.resizeWorld();

		this.map.setCollisionByExclusion([]);

		game.physics.p2.convertTilemap(this.map, this.collisionlayer);

		// Gravitay!
		game.physics.p2.gravity.y = 1000;

		game.stage.backgroundColor = "3075c9";

		game.physics.p2.setImpactEvents(true);

		// Create collision groups for interactivity.
		this.mapCollision = game.physics.p2.createCollisionGroup();
		this.playerCollision = game.physics.p2.createCollisionGroup();
		this.boxCollision = game.physics.p2.createCollisionGroup();
		this.statueCollision = game.physics.p2.createCollisionGroup();
		this.grateCollision = game.physics.p2.createCollisionGroup();
		this.openCollision = game.physics.p2.createCollisionGroup();
		this.spongeCollision = game.physics.p2.createCollisionGroup();
		this.coralCollision = game.physics.p2.createCollisionGroup();

		game.physics.p2.updateBoundsCollisionGroup();

		for (var bodyIndex = 0; bodyIndex < this.map.layer.bodies.length; bodyIndex++) {
			 var tileBody = this.map.layer.bodies[bodyIndex];
			 tileBody.setCollisionGroup(this.mapCollision);
			 tileBody.collides([this.playerCollision, this.boxCollision, this.grateCollision]);
	 }

		// Spawn player.
		this.player = new Player(game, 148, 1375);
		this.player.body.setCollisionGroup(this.playerCollision);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Spawn box.
		this.box = new Box(game, 867, 1417);
		this.box.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.box);

		// Spawn statue.
		this.statue = new Statue(game, 2069.54570947841, 1354.45877734156);
		this.statue.body.setCollisionGroup(this.statueCollision);
		this.game.add.existing(this.statue);

		// Spawn Grate
		this.grateExit = new Grate(game, 2588, 170);
		this.grateExit.body.setCollisionGroup(this.grateCollision);
		this.game.add.existing(this.grateExit);

		// Create the open greate to appear when gate opens.
		this.openGrate = new Grateopen(game, 2588, 170);
		this.openGrate.body.setCollisionGroup(this.openCollision);

		// Calls for certain occurances when objects collide.

		// Dynamic Objects:
		// Player
		this.player.body.collides(this.openCollision, this.advance, this);
		this.player.body.collides(this.boxCollision, this.grab, this);
		this.player.body.collides(this.coralCollision, this.break, this);
		this.player.body.collides([this.mapCollision, this.statueCollision, this.grateCollision,
			this.spongeCollision]);

		// Box
		this.box.body.collides(this.statueCollision, this.active, this);
		this.box.body.collides([this.mapCollision, this.playerCollision, this.statueCollision,
			this.grateCollision, this.spongeCollision, this.coralCollision]);

		// Grate
		this.grateExit.body.collides([this.playerCollision, this.mapCollision, this.statueCollision,
			this.spongeCollision, this.coralCollision]);

		// Static Objects:
		// Statue
		this.statue.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Open Grate
		this.openGrate.body.collides(this.playerCollision);

		// Audio settings
		this.lvl1 = this.game.add.audio('lvl1', 0.5, true);

		this.lvl1.play();

	},

	advance: function() {
		console.log('We leavin');
		this.lvl1.stop();
		game.state.start('Midroll');
	},

	grab: function(body1, body2) {

		if (!this.player.isGrabbing) {
			console.log('We grabbin');
			this.player.grabSound.play();
			this.constraint = game.physics.p2.createLockConstraint(body1, body2, [0, -55]);
			this.player.isGrabbing = true;
		}

		// Drops the object if the player is grabbing it.
		if (this.player.keys.grab.isDown && this.player.isGrabbing) {
			console.log('We droppin');
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
			console.log('Grab active');
		}
	},

	active: function() {
		console.log('Statue active');
		// If the player is holding the object kills the constraint.
		if(this.constraint) {
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
		}

		this.box.destroy();
		this.statue.switchOn = true;
	},

	break: function(body1, body2) {
		console.log('We breakin');
		body2.isAlive = false;
	},

	update: function() {

		if (this.statue.switchOn) {
			this.game.add.existing(this.openGrate);
			this.openGrate.sendToBack();
			this.backdrop.sendToBack();
			this.grateExit.body.static = false;
		}

	},

	render: function() {
		// Early return if gui has problems.
		if (this.game.gui === undefined || this.game.gui === null) return;

		if (settings.debugFps) {
			this.game.debug.text('FPS: ' + game.time.fps, 16, 16, 'yellow');
		}
		if (settings.debugBoundingBox) {
			this.game.debug.body(this.player);
		}
		if (settings.debugPlayerBodyInfo) {
			this.game.debug.bodyInfo(this.player, 16, 16);
		}
		if (settings.debugCameraInfo) {
			this.game.debug.cameraInfo(this.game.camera, 16, 16);
		}
	},
}
