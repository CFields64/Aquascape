// Aquascape Credits state.

var Credits = function(game) {};
Credits.prototype = {
	preload: function() {
		console.log('Credits: preload');
	},

	create: function() {
		console.log('Credits: create');
		game.state.start('Title');
	},

	update: function() {}
}
