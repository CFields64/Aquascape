// Aquascape Shallows state

var Shallows = function(game) {};
Shallows.prototype = {
	preload: function() {
		console.log('Shallows; preload');
	},

	create: function() {
		console.log('Shallows: create');
		game.state.start('Load');
	},

	update: function() {}
}
