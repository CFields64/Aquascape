// Aquascape Shallows state

var Shallows = function(game) {};

var map, mapLayer, player;

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
		map.addTilesetImage('');

		map.setCollisionByExclusion([]);

		mapLayer = map.createLayer('Tile Layer 1');
		mapLayer.resizeWorld();

		// Create the player.
		player = new Player(game, 32, 32, 'atlas', 'prawn');

	},

	update: function() {
		// Collision checks.
		game.physics.arcade.collide(player, mapLayer);
	}
}
