// Aquascape Open Ocean state

var Ocean = function(game) {};
Ocean.prototype = {
	preload: function() {
		console.log('Ocean; preload');
	},

	create: function() {
		console.log('Ocean: create');
		game.state.start('Load');
	},

	update: function() {}
}
