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
	  //game.physics.p2.setImpactEvents(true);

		/*/ Set up collision groups for interactivity.
		var playerCollisionGroup = game.physics.p2.createCollisionGroup();
		var boxCollisionGroup = game.physics.p2.createCollisionGroup();
		var statueCollisionGroup = game.physics.p2.createCollisionGroup();
		var grateCollisionGroup = game.physics.p2.createCollisionGroup();
		*/

		// Update collision so that objects still collide with world bounds.
		//game.physics.p2.updateBoundsCollisionGroup();

		// Gravitay!
		game.physics.p2.gravity.y = 1000;

		game.stage.backgroundColor = "3075c9";

		// Create interactive object groups.
		var boxes = game.add.group();
		var statues = game.add.group();
		var doors = game.add.group();

		// Spawn player.
		this.player = new Player(game, 180, game.world.height - 180);
		this.game.add.existing(this.player);
		this.game.camera.follow(this.player);

		// Spawn box.
		this.box = new Box(game, 180, 180);
		this.game.add.existing(this.box);

	},

	update: function() {

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
