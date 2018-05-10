// Aquascape Boot State

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {

	},

	create: function() {
		console.log('Boot: create');
		game.state.start('Load');
	}
}
