// Aquascape Title state

var Title = function(game) {};

var titlescreen;

Title.prototype = {
	preload: function() {
		console.log('Title: preload');
	},

	create: function(game) {
		console.log('Title: create');

		// Render the title screen and add text.
		titlescreen = game.add.sprite(game.width/2, game.height/2, 'titlescreen');
		titlescreen.anchor.set(0.5);

		var titleText = game.add.text(game.width/2, game.height/2 + 100,  'Press Spacebar to Begin.\n   Use WASD to explore.',
		{font: 'Acme',
		fontSize: '40px',
		fill: '#fff'});
		titleText.anchor.set(0.5);

		// Audio settings.
		this.titleMusic = this.game.add.audio('title', 0.5, true);
		this.menuSel = this.game.add.audio('select', 0.75, false);

		this.titleMusic.play();

	},

	update: function(game) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.titleMusic.stop();
			this.menuSel.play();
			game.state.start('Cutscene');
			}
	},
}
