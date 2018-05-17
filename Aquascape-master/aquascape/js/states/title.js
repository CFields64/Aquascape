// Aquascape Title state

var Title = function(game) {};

var titlescreen;

Title.prototype = {
	preload: function() {
		console.log('Title: preload');
	},

	create: function(game) {
		console.log('Title: create');

		/*this.createButton(game, "Play", game.world.centerX, game.world.centerY + 32, 300, 100, 
			function() {
				this.state.start('Shallows');
			});

		this.createButton(game, "Credits", game.world.centerX, game.world.centerY + 120, 300, 100, 
			function() {
				this.state.start('Credits');
			}); */

		//titlescreen = game.add.sprite(game.world.centerX, game.world.centerY, 'titlescreen');
		//titlescreen.anchor.set(0.5);

		var titleText = game.add.text(game.width/2, game.height/2,  'Aquascape Demo: WSAD to move, Space to start.', {fontSize: '32px', fill: '#fff'});
		titleText.anchor.set(0.5);
		
	},

	update: function(game) {
		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('Shallows');
		}
	},

	createButton: function(game, string, x, y, w, h, callback) {
		var button1 = game.add.button(x, y, 'button', callback, this, 2, 1, 0);

		button1.anchor.set(0.5);
		button1.width = w;
		button1.height = h;

		//var txt = game.add.text(button1.x, button1.y, string, (font: "14px Arial" , fill: "#fff", align: "center"));

		txt.anchor.set(0.5);
	}
}
