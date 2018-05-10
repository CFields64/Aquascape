// Aquascape Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver; preload');
	},

	create: function() {
		console.log('GameOver: create');
		game.state.start('Load');
	},

	update: function() {}
}
