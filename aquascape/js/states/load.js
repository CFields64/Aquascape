// Aquascape Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load; preload');
	},

	create: function() {
		console.log('Load: create');
		game.state.start('Load');
	}
}
