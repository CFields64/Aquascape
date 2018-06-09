// Aquascape Boot State

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');

		// Load logo asset for load state.
		game.load.image('logo', 'assets/img/Shinobu4.png');
		game.load.image('loading', 'assets/img/loading.png');

	},

	create: function() {
		console.log('Boot: create');
		game.state.start('Load');
	}
}
