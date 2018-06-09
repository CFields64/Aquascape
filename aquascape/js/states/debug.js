// Aquascape Physics Debug State

var Sandbox = function(game) {};
Sandbox.prototype = {
	preload: function() {
		console.log('Sandbox: preload');

	},

	create: function() {
		console.log('Sandbox: create');

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Loads Tilemap
		this.map = game.add.tilemap('sandbox');
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
		this.player = new Player(game, 180, game.world.height - 180);
		this.player.body.setCollisionGroup(this.playerCollision);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Spawn box.
		this.box = new Box(game, 15, 15);
		this.box.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.box);

		// Spawn statue.
		this.statue = new Statue(game, game.world.width - 40, game.world.height - 100);
		this.statue.body.setCollisionGroup(this.statueCollision);
		this.game.add.existing(this.statue);

		// Spawn Grate
		this.grate = new Grate(game, 210, 150);
		this.grate.body.setCollisionGroup(this.grateCollision);
		this.game.add.existing(this.grate);

		// Create the open greate to appear when gate opens.
		this.openGrate = new Grateopen(game, 210, 150);
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
		this.grate.body.collides([this.playerCollision, this.mapCollision, this.statueCollision,
			this.spongeCollision, this.coralCollision]);

		// Static Objects:
		// Statue
		this.statue.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Open Grate
		this.openGrate.body.collides(this.playerCollision);

	},

	advance: function() {
		console.log('We leavin');
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
			this.grate.body.static = false;
		}

	},
}
