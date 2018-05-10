// Aquascape Shallows state

var Shallows = function(game) {};

var map, mapLayer, player, box;

Shallows.prototype = {
	preload: function() {
		console.log('Shallows: preload');
	},

	create: function() {
		console.log('Shallows: create');

		// Spin up physics.
		game.physics.startSystem(Phaser.Physics.ARCADE);

		// Create a new tilemap object for Shallows.
		map = game.add.tilemap('shallows');
		map.addTilesetImage('Backdrop', 'shallowsheet5');
		map.addTilesetImage('Decoration', 'shallowsheet8');
		map.addTilesetImage('BlueSand', 'shallowsheet7');
		//map.addTilesetImage('Rockywalls', '')

		map.setCollisionByExclusion([]);

		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();

		// Create the player.
		player = new Player(game, 180, game.world.height - 180, 'atlas', 'prawn');

		// Create the box.
		box = new Box(game, 45, 45, 'atlas', 'box');

	},

	update: function() {
		// Collision checks.
		game.physics.arcade.collide(player, mapLayer);
	}
}
