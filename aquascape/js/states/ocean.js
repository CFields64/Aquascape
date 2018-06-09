// Aquascape Finale Cutscene state

var Ocean = function(game) {};
Ocean.prototype = {
	preload: function() {
		console.log('Ocean: preload');
	},

	create: function() {
		console.log('Ocean: create');

		this.outro = game.add.video('outro');

		this.outro.play();

		this.outro.addToWorld(game.width/2, game.height/2, 0.5, 0.5, 1.4, 1.4);

	},

	update: function() {
		// Starts next state after video ends.
		if(!this.outro.playing) {
			game.state.start('Credits');
		}
	}
}
