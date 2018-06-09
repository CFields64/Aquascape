// Aquascape Credits state.

var Credits = function(game) {};
Credits.prototype = {
	preload: function() {
		console.log('Credits: preload');
	},

	create: function() {
		console.log('Credits: create');

		this.credits = game.add.video('credits');

		this.credits.play();

		this.credits.addToWorld(game.width/2, game.height/2, 0.5, 0.5, 1.4, 1.4);
	},

	update: function() {
		// Returns to the title screen after video ends.
		if(!this.credits.playing) {
			game.state.start('Title');
		}
	}
}
