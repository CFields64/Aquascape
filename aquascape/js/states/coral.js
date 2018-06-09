// Aquascape Coral state

var Coral = function(game) {};
Coral.prototype = {
	preload: function() {
		console.log('Coral: preload');

	},

	create: function() {
		console.log('Coral: create');

		this.backdrop = game.add.sprite(0, 0, 'lvl2_backdrop');
		this.decor = game.add.sprite(0, 0, 'lvl2_decor');

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.P2JS);

		// Loads Tilemap
		this.map = game.add.tilemap('coral');
		this.map.addTilesetImage('coralReefTilesetFin', 'coralsheet');
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
		this.doorCollision = game.physics.p2.createCollisionGroup();
		this.openCollision = game.physics.p2.createCollisionGroup();
		this.spongeCollision = game.physics.p2.createCollisionGroup();
		this.coralCollision = game.physics.p2.createCollisionGroup();
		this.ballCollision = game.physics.p2.createCollisionGroup();

		game.physics.p2.updateBoundsCollisionGroup();

		for (var bodyIndex = 0; bodyIndex < this.map.layer.bodies.length; bodyIndex++) {
			 var tileBody = this.map.layer.bodies[bodyIndex];
			 tileBody.setCollisionGroup(this.mapCollision);
			 tileBody.collides([this.playerCollision, this.boxCollision, this.grateCollision, this.ballCollision]);
	 }

		// Spawn player.
		this.player = new Player(game, 255, 384);
		this.player.body.setCollisionGroup(this.playerCollision);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Spawn Entrance
		this.grateEntrance = new Grate(game, 143, 176);
		this.grateEntrance.body.setCollisionGroup(this.grateCollision);
		this.game.add.existing(this.grateEntrance);
		this.grateEntrance.sendToBack();
		this.decor.sendToBack();
		this.backdrop.sendToBack();

		// Spawn Shark
		this.shark = new Hammerhead(game, 1375, 230);
		this.game.add.existing(this.shark);
		this.shark.scale.x = -1;
		this.sharkText = game.add.text(1300, 210,
			'You there! If you press Spacebar\nyou can break coral with\nyour head. Just like me.',
		{font: 'Acme',
		fontSize: '24px',
		fill: '#fff'});
		this.sharkText.anchor.set(0.5);
		this.sharkText.alpha = 0;

		// Spawn clown fish.
		this.clown1 = new Clown(game, 2300, 1400);
		this.game.add.existing(this.clown1);
		this.clown1.scale.x = -1;
		this.clownText1 = game.add.text(2200, 1350,  'Get me out of here!',
		{font: 'Acme',
		fontSize: '24px',
		fill: '#fff'});
		this.clownText1.anchor.set(0.5);
		this.clownText1.alpha = 0;

		// Spawn Statue Instances (2)
		this.statue1 = new Statue(game, 717, 470);
		this.statue1.body.setCollisionGroup(this.statueCollision);
		this.game.add.existing(this.statue1);
		this.statue1.sendToBack();
		this.statue2 = new Statue(game, 2195, 1100);
		this.statue2.body.setCollisionGroup(this.statueCollision);
		this.game.add.existing(this.statue2);
		this.statue2.sendToBack();

		// Spawn Button Instances (2)
		this.button1 = new Sponge(game, 2700, 1800);
		this.button1.body.setCollisionGroup(this.spongeCollision);
		this.game.add.existing(this.button1);
		this.button1.sendToBack();
		this.button2 = new Sponge(game, 2703, 2200);
		this.button2.body.setCollisionGroup(this.spongeCollision);
		this.game.add.existing(this.button2);
		this.button2.sendToBack();

		// Spawn Door Instances (3)
		this.door1 = new CoralDoor(game, 1294, 885);
		this.door1.body.setCollisionGroup(this.doorCollision);
		this.door1.body.angle = 90;
		this.game.add.existing(this.door1);
		this.door1.sendToBack();
		this.door2 = new CoralDoor(game, 1966, 395);
		this.door2.body.setCollisionGroup(this.doorCollision);
		this.game.add.existing(this.door2);
		this.door2.sendToBack();
		this.door3 = new CoralDoor(game, 2383, 1680);
		this.door3.body.setCollisionGroup(this.doorCollision);
		this.game.add.existing(this.door3);
		this.door3.sendToBack();

		// Spawn Coral Instances (9)
		this.coral1 = new Breakable(game, 493, 430);
	  this.coral1.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral1);
		this.coral1.sendToBack();
		this.coral2 = new Breakable(game, 942, 430);
		this.coral2.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral2);
		this.coral2.sendToBack();
		this.coral3 = new Breakable(game, 2800, 975);
		this.coral3.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral3);
		this.coral3.sendToBack();
		this.coral4 = new Breakable(game, 659, 975);
		this.coral4.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral4);
		this.coral4.sendToBack();
		this.coral5 = new Breakable(game, 206, 975);
		this.coral5.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral5);
		this.coral5.sendToBack();
		this.coral6 = new Breakable(game, 2036, 1390);
		this.coral6.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral6);
		this.coral6.sendToBack();
		this.coral7 = new Breakable(game, 1647, 1553);
		this.coral7.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral7);
		this.coral7.sendToBack();
		this.coral8 = new Breakable(game, 1231, 1547);
		this.coral8.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral8);
		this.coral8.sendToBack();
		this.coral9 = new Breakable(game, 704, 1555);
		this.coral9.body.setCollisionGroup(this.coralCollision);
		this.game.add.existing(this.coral9);
		this.coral9.sendToBack();

		// Spawn Box Instances (3)
		this.box1 = new Box(game, 717, 20);
		this.box1.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.box1);
		this.box2 = new Box(game, 1294, 865);
		this.box2.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.box2);
		this.boxHeavy = new BoxHeavy(game, 398, 1040);
		this.boxHeavy.body.setCollisionGroup(this.boxCollision);
		this.game.add.existing(this.boxHeavy);

		// Spawn Ball
		this.ball = new Round(game, 236, 2064);
		this.ball.body.setCollisionGroup(this.ballCollision);
		this.game.add.existing(this.ball);

		// Spawn Exit
		this.grateExit = new Grate(game, 3100, 2100);
		this.grateExit.body.setCollisionGroup(this.grateCollision);
		this.game.add.existing(this.grateEntrance);
		this.grateExit.sendToBack();

		// Create the open grate to appear when gate opens.
		this.openGrate = new Grateopen(game, 3100, 2100);
		this.openGrate.body.setCollisionGroup(this.openCollision);
		this.openGrate.sendToBack();

		this.decor.sendToBack();
		this.backdrop.sendToBack();

		// Calls for certain occurances when objects collide.

		// Dynamic Objects:
		// Player
		this.player.body.collides(this.openCollision, this.advance, this);
		this.player.body.collides(this.boxCollision, this.grab, this);
		this.player.body.collides([this.mapCollision, this.statueCollision, this.grateCollision,
			this.spongeCollision, this.doorCollision, this.ballCollision, this.coralCollision]);

		// Boxes
		this.box1.body.collides(this.statueCollision, this.active1, this);
		this.box1.body.collides([this.mapCollision, this.playerCollision, this.statueCollision,
			this.grateCollision, this.spongeCollision, this.coralCollision, this.doorCollision]);
		this.box2.body.collides(this.statueCollision, this.active2, this);
		this.box2.body.collides([this.mapCollision, this.playerCollision, this.statueCollision,
			this.grateCollision, this.spongeCollision, this.coralCollision, this.doorCollision]);
		this.boxHeavy.body.collides(this.spongeCollision, this.active3, this);
		this.boxHeavy.body.collides([this.mapCollision, this.playerCollision, this.statueCollision,
			this.grateCollision, this.spongeCollision, this.coralCollision]);

		// Ball
		this.ball.body.collides(this.spongeCollision, this.active4, this);
		this.ball.body.collides([this.playerCollision, this.mapCollision, this.statueCollision,
			this.spongeCollision, this.coralCollision]);

		// Grate
		this.grateExit.body.collides([this.playerCollision, this.mapCollision, this.statueCollision,
		this.spongeCollision, this.coralCollision]);

		// Static Objects:
		// Open Grate
		this.openGrate.body.collides(this.playerCollision, this.advance, this);

		// Statues
		this.statue1.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);
		this.statue2.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Buttons
		this.button1.body.collides([this.playerCollision, this.boxCollision]);
		this.button2.body.collides([this.playerCollision, this.boxCollision]);

		// Door
		this.door1.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);
		this.door2.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);
		this.door3.body.collides([this.playerCollision, this.boxCollision, this.grateCollision]);

		// Coral
		this.coral1.body.collides(this.playerCollision, this.break1, this);
		this.coral1.body.collides([this.playerCollision, this.boxCollision]);
		this.coral2.body.collides(this.playerCollision, this.break2, this);
		this.coral2.body.collides([this.playerCollision, this.boxCollision]);
		this.coral3.body.collides(this.playerCollision, this.break3, this);
		this.coral3.body.collides([this.playerCollision, this.boxCollision]);
		this.coral4.body.collides(this.playerCollision, this.break4, this);
		this.coral4.body.collides([this.playerCollision, this.boxCollision]);
		this.coral5.body.collides(this.playerCollision, this.break5, this);
		this.coral5.body.collides([this.playerCollision, this.boxCollision]);
		this.coral6.body.collides(this.playerCollision, this.break6, this);
		this.coral6.body.collides([this.playerCollision, this.boxCollision]);
		this.coral7.body.collides(this.playerCollision, this.break7, this);
		this.coral7.body.collides([this.playerCollision, this.boxCollision]);
		this.coral8.body.collides(this.playerCollision, this.break8, this);
		this.coral8.body.collides([this.playerCollision, this.boxCollision]);
		this.coral9.body.collides(this.playerCollision, this.break9, this);
		this.coral9.body.collides([this.playerCollision, this.boxCollision]);

		// Audio settings
		this.lvl2 = this.game.add.audio('lvl2', 0.5, true);
		this.break = this.game.add.audio('break', 0.75);

		this.lvl2.play();

	},

	// Function to advance to the next state.
	advance: function() {
		console.log('We leavin');
		this.lvl2.stop();
		game.state.start('Ocean');
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

	// Function for activating the first statue instance.
	// Phaser wouldn't reassign object variables when the objects were referenced as P2 Physics
	// bodies, as a result this code has an interaction function for each object in the world
	// for each collision callback.
	active1: function() {
		console.log('Statue 1 active');
		// If the player is holding the object kills the constraint.
		if(this.constraint) {
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
		}

		this.box1.destroy();
		this.statue1.switchOn = true;
	},

	// Function for activating the second statue instance.
	active2: function() {
		console.log('Statue 2 active');
		// If the player is holding the object kills the constraint.
		if(this.constraint) {
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
		}

		this.box2.destroy();
		this.statue2.switchOn = true;
	},

	// Function for activating the first button instance.
	active3: function() {
		console.log('Button 1 active');
		// If the player is holding the object kills the constraint.
		if(this.constraint) {
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
		}

		this.boxHeavy.destroy();
		this.button1.switchOn = true;
	},

	// Function for activating the second button instance.
	active4: function() {
		console.log('Button 2 active');
		// If the player is holding the object kills the constraint.
		if(this.constraint) {
			game.physics.p2.removeConstraint(this.constraint);
			this.player.isGrabbing = false;
		}

		this.button2.switchOn = true;
	},

	// Function to break coral blocks.
	// As with the above interaction functions, the use of bodies on callbacks did not ellicit the
	// desired result, and thus several callbacks were written for each object.
	break1: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral1.destroy();
		}
	},

	break2: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral2.destroy();
		}
	},

	break3: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral3.destroy();
		}
	},

	break4: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral4.destroy();
		}
	},

	break5: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral5.destroy();
		}
	},

	break6: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral6.destroy();
		}
	},

	break7: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral7.destroy();
		}
	},

	break8: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral8.destroy();
		}
	},

	break9: function() {
		if (this.player.isCharging) {
			this.break.play();
			this.coral9.destroy();
		}
	},

	update: function() {

		// If the player is close to an NPC, display it's text.
		if (Math.abs(this.player.body.x - this.shark.x) < 150 && Math.abs(this.player.body.y - this.shark.y) < 200) {
			this.shark.playerClose = true;
			this.sharkText.alpha = 1;
		} else {
			this.shark.playerClose = false;
			this.sharkText.alpha = 0;
		}

		if (Math.abs(this.player.body.x - this.clown1.x) < 150 && Math.abs(this.player.body.y - this.clown1.y) < 200) {
			this.clown1.playerClose = true;
			this.clownText1.alpha = 1;
		} else {
			this.clown1.playerClose = false;
			this.clownText1.alpha = 0;
		}

		// Opens door once statue is active.
		if (this.statue1.switchOn) {
			this.door1.body.static = false;
		}

		if (this.statue2.switchOn) {
			this.door2.body.static = false;
		}

		// Opens door once button is active.
		if (this.button1.switchOn) {
			this.door3.body.static = false;
			this.button2.switchOn = true;
		}

		// Creates exit once button is active.
		if (this.button2.switchOn) {
			this.game.add.existing(this.openGrate);
			this.openGrate.sendToBack();
			this.decor.sendToBack();
			this.backdrop.sendToBack();
			this.grateExit.destroy();
		}

		// Restart.
		if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {
			this.lvl2.stop();
			game.state.start('Coral');
			}

	},
}
