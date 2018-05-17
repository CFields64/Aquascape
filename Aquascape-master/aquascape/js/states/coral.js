// Aquascape Coral Reef state

var Coral = function(game) {};
Coral.prototype = {
	preload: function() {
		console.log('Coral; preload');
	},

	create: function() {
		console.log('Coral: create');
		game.state.start('Load');
	},

	update: function() {}
}
