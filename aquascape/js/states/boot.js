// Aquascape Boot State

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');
	},

	create: function() {
		console.log('Boot: create');
		game.state.start('Load');
	}
}
