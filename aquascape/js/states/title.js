// Aquascape Title state

var Title = function(game) {};

var titlescreen;

Title.prototype = {
	preload: function() {
		console.log('Title: preload');
	},

	create: function(game) {
		console.log('Title: create');

		titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'titlescreen');
		titlescreen.anchor.set(0.5);

		var titleText = game.add.text(game.width/2, game.height/2 + 100,  'WSAD to move, Space to start.', {fontSize: '32px', fill: '#fff'});
		titleText.anchor.set(0.5);

		this.titleMusic = this.game.add.audio('title', 0.5, true);
		this.menuSel = this.game.add.audio('select', 0.75, false);

		if(settings.musicOn) {
			this.titleMusic.play();
		}

	},

	update: function(game) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Shallows');
		}
	},
}
