// Aquascape Game Over state

var GameOver = function(game) {};
GameOver.prototype = {
	preload: function() {
		console.log('GameOver: preload');
	},

	create: function() {
		console.log('GameOver: create');

		var gameOverText = game.add.text(game.width/2, game.height/2,  'Demo Complete: Press R to Restart.', {fontSize: '32px', fill: '#fff'});
		gameOverText.anchor.set(0.5);
	},

	update: function() {
		if (this.input.keyboard.isDown(Phaser.Keyboard.R)) {
			game.state.start('Title');
		}
	}
}
