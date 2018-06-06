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

		var titleText = game.add.text(game.width/2, game.height/2 + 100,  'WASD to move, Space to start.', {fontSize: '32px', fill: '#fff'});
		titleText.anchor.set(0.5);

		var debugText = game.add.text(game.width/2, game.height/2 + 150,  'D to access physics sandbox', {fontSize: '32px', fill: '#fff'});
		debugText.anchor.set(0.5);

		// Audio settings.
		this.titleMusic = this.game.add.audio('title', 0.5, true);
		this.menuSel = this.game.add.audio('select', 0.75, false);

		if(settings.musicOn) {
			this.titleMusic.play();
		}

	},

	update: function(game) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.titleMusic.stop();
			this.menuSel.play();
			game.state.start('Cutscene');
			}

		if (this.input.keyboard.isDown(Phaser.Keyboard.D)) {
			this.titleMusic.stop();
			game.state.start('Sandbox');
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.M)) {
			this.titleMusic.stop();
			game.state.start('Midroll');
		}
	},
}
