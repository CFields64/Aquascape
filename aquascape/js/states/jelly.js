// Aquascape Deep Sea state

var Jelly = function(game) {};
Jelly.prototype = {
	preload: function() {
		console.log('Jelly; preload');
	},

	create: function() {
		console.log('Jelly: create');
		game.state.start('Load');
	},

	update: function() {}
}
