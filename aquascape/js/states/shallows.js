// Aquascape Shallows state

var Shallows = function(game) {};
Shallows.prototype = {
	preload: function() {
		console.log('Shallows: preload');

	},

	create: function() {
		console.log('Shallows: create');

		this.backdrop = game.add.sprite(0, 0, 'lvl1_backdrop');
		this.decor = game.add.sprite(0, 0, 'lvl1_decor');

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
		this.doorCollision = game.physics.p2.createCollisionGroup();
		this.leverCollision = game.physics.p2.createCollisionGroup();
		this.grateCollision = game.physics.p2.createCollisionGroup();
		this.openCollision = game.physics.p2.createCollisionGroup();

		game.physics.p2.updateBoundsCollisionGroup();

		for (var bodyIndex = 0; bodyIndex < this.map.layer.bodies.length; bodyIndex++) {
			 var tileBody = this.map.layer.bodies[bodyIndex];
			 tileBody.setCollisionGroup(this.mapCollision);
			 tileBody.collides([this.playerCollision, this.boxCollision, this.grateCollision]);
	 }

		// Spawn player.
		this.player = new Player(game, 200, 1375);
		this.player.body.setCollisionGroup(this.playerCollision);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Spawn crab.
		this.crab = new Crab(game, 600, 1450);
		this.game.add.existing(this.crab);
		this.crabText = game.add.text(600, 1400,  'You can swim towards\nobjects to pick them up.',
		{font: 'Acme',
		fontSize: '24px',
		fill: '#fff'});
		this.crabText.anchor.set(0.5);
		this.crabText.alpha = 0;

		// Spawn clown fish.
		this.clown1 = new Clown(game, 1500, 950);
		this.game.add.existing(this.clown1);
		this.clownText1 = game.add.text(1500, 900,  'If you get stuck you can\npress R to restart.',
		{font: 'Acme',
		fontSize: '24px',
		fill: '#fff'});
		this.clownText1.anchor.set(0.5);
		this.clownText1.alpha = 0;

		// Spawn second clown fish.
		this.clown2 = new Clown(game, 1300, 350);
		this.game.add.existing(this.clown2);
		this.clownText2= game.add.text(1300, 250,  'Keep going, you just opened\nthe way out of here!',
		{font: 'Acme',
		fontSize: '24px',
		fill: '#fff'});
		this.clownText2.anchor.set(0.5);
		this.clownText2.alpha = 0;

		// Spawn box.
		this.box = new Box(game, 1000, 1417);
		this.box.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.box);

		// Spawn statue.
		this.statue = new Statue(game, 2115, 1464);
		this.statue.body.setCollisionGroup(this.statueCollision);
		this.game.add.existing(this.statue);

		// Spawn door.
		this.door = new Door(game, 2375, 1410);
		this.door.body.setCollisionGroup(this.doorCollision);
		this.game.add.existing(this.door);
		this.door.sendToBack();
		this.backdrop.sendToBack();

		// Spawn lever.
		this.lever = new Lever(game, 1902, 800);
		this.lever.body.setCollisionGroup(this.leverCollision);
		this.game.add.existing(this.lever);
		this.lever.sendToBack();
		this.backdrop.sendToBack();

		// Spawn Grate
		this.grateExit = new Grate(game, 2588, 170);
		this.grateExit.body.setCollisionGroup(this.grateCollision);
		this.game.add.existing(this.grateExit);

		// Create the open greate to appear when gate opens.
		this.openGrate = new Grateopen(game, 2588, 170);
		this.openGrate.body.setCollisionGroup(this.openCollision);

		// Calls for certain occurances when objects collide.

		// Dynamic Objects (Object will have unique collision callback functions):
		// Player
		this.player.body.collides(this.openCollision, this.advance, this);
		this.player.body.collides(this.boxCollision, this.grab, this);
		this.player.body.collides([this.mapCollision, this.statueCollision, this.grateCollision,
			this.doorCollision, this.leverCollision]);

		// Box
		this.box.body.collides(this.statueCollision, this.active, this);
		this.box.body.collides([this.mapCollision, this.playerCollision, this.statueCollision,
			this.grateCollision]);

		// Lever
		this.lever.body.collides(this.playerCollision, this.flip, this);
		this.lever.body.collides(this.playerCollision);

		// Static Objects (Object will only collide with other objects):
		// Statue
		this.statue.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Door
		this.door.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Grate
		this.grateExit.body.collides([this.playerCollision, this.mapCollision, this.statueCollision]);

		// Open Grate
		this.openGrate.body.collides(this.playerCollision);

		// Audio settings
		this.lvl1 = this.game.add.audio('lvl1', 0.5, true);

		this.lvl1.play();

	},

	// Function to advance to the next state.
	advance: function() {
		console.log('We leavin');
		this.lvl1.stop();
		game.state.start('Midroll');
	},

	// Function to pick up objects.
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

	// Function for activating the statue.
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

	// Function for activating the lever.
	flip: function() {
		console.log('We flippin');
		this.lever.switchOn = true;
	},

	update: function() {

		// If the player is close to an NPC, display it's text.
		if (Math.abs(this.player.body.x - this.crab.x) < 150 && Math.abs(this.player.body.y - this.crab.y) < 200) {
			this.crab.playerClose = true;
			this.crabText.alpha = 1;
		} else {
			this.crab.playerClose = false;
			this.crabText.alpha = 0;
		}

		if (Math.abs(this.player.body.x - this.clown1.x) < 150 && Math.abs(this.player.body.y - this.clown1.y) < 200) {
			this.clown1.playerClose = true;
			this.clownText1.alpha = 1;
		} else {
			this.clown1.playerClose = false;
			this.clownText1.alpha = 0;
		}

		if (Math.abs(this.player.body.x - this.clown2.x) < 150 && Math.abs(this.player.body.y - this.clown2.y) < 200) {
			this.clown2.playerClose = true;
			this.clownText2.alpha = 1;
		} else {
			this.clown2.playerClose = false;
			this.clownText2.alpha = 0;
		}

		// Opens door once statue is active.
		if (this.statue.switchOn) {
			this.door.body.static = false;
		}

		// Creates exit once lever is turned.
		if (this.lever.switchOn) {
			this.game.add.existing(this.openGrate);
			this.openGrate.sendToBack();
			this.backdrop.sendToBack();
			this.grateExit.destroy();
		}

		// Restart
		if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {
			this.lvl1.stop();
			game.state.start('Shallows');
			}

	},
}
