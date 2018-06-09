// Aquascape Midroll state

var Midroll = function(game) {};
Midroll.prototype = {
	preload: function() {
		console.log('Midroll: preload');

	},

	create: function() {
		console.log('Midroll: create');

		// Create faux loading screen.

		game.stage.backgroundColor = "000000";

		this.prawn = this.add.sprite(game.world.width, game.world.height - 100, 'animatedAtlas', 'PrawnMoveForward00001');
		this.prawn.anchor.set(0.5);
		this.prawn.animations.add('PrawnMoveForward', Phaser.Animation.generateFrameNames('PrawnMoveForward',1,11,'',5),15,true);

		var contText = game.add.text(game.width/2, game.height/2,  'Shall we continue?\nPress Spacebar when you are ready.',
		{font: 'Acme',
		fontSize: '40px',
		fill: '#fff'});
		contText.anchor.set(0.5);

		// Audio settings.
		this.midVO1 = this.game.add.audio('mid_VO_1', 1, false);
		this.playedOnce = true;
		this.midVO2 = this.game.add.audio('mid_VO_2', 1, false);
		this.continue = this.game.add.audio('cont', 1, false);

		this.midVO1.play();

	},

	update: function() {
		this.prawn.x += 3;
		this.prawn.animations.play('PrawnMoveForward');

		game.world.wrap(this.prawn, 0, true);

		if (!this.midVO1.isPlaying && this.playedOnce) {
			this.midVO2.play();
			this.playedOnce = false;
		}

		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.continue.play();
			game.state.start('Coral');
			}
	}
}
