// Aquascape Cutscene state

var Cutscene = function(game) {};
Cutscene.prototype = {
	preload: function() {
		console.log('Cutscene: preload');
	},

	create: function() {
		console.log('Cutscene: create');

		this.intro = game.add.video('intro');

		this.intro.play();

		this.intro.addToWorld(game.world.centerX, game.world.centerY, 0.5, 0.5, 1.4, 1.4);
	},

	update: function() {
		// Starts next state after video ends.
		if(!this.intro.playing) {
			game.state.start('Shallows');
		}
	}
}
