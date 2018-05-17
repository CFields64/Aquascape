// Aquascape Kelp Forest state

var Kelp = function(game) {};
Kelp.prototype = {
	preload: function() {
		console.log('Kelp; preload');
	},

	create: function() {
		console.log('Kelp: create');
		game.state.start('Load');
	},

	update: function() {}
}
