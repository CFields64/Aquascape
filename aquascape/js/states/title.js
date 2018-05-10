// Aquascape Title state

var Title = function(game) {};
Title.prototype = {
	preload: function() {
		console.log('Title; preload');
	},

	create: function() {
		console.log('Title: create');
		game.state.start('Load');
	},

	update: function() {}
}
