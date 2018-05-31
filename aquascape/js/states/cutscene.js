// Aquascape Cutscene state

var Cutscene = function(game) {};
Cutscene.prototype = {
	preload: function() {
		console.log('Cutscene: preload');
	},

	create: function() {
		console.log('Cutscene: create');
		console.log('Placeholder For Awesome Cinematic!');
		game.state.start('Shallows');
	},

	update: function() {}
}
