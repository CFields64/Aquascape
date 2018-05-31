// Aquascape Midroll state

var Midroll = function(game) {};
Midroll.prototype = {
	preload: function() {
		console.log('Midroll: preload');
	},

	create: function() {
		console.log('Midroll: create');

		game.stage.backgroundColor = "000000";

		this.prawn = this.add.sprite(0, game.world.height - 100, 'atlas', 'prawn');
		this.prawn.anchor.set(0.5);
		this.prawn.animations.add('PrawnMoveForward', Phaser.Animation.generateFrameNames('PrawnMoveForward',1,11,'',5),15,true);

		var contText = game.add.text(game.width/2, game.height/2 + 100,  'Press Space to Continue.', {fontSize: '32px', fill: '#fff'});
		contText.anchor.set(0.5);
	},

	update: function() {
		this.prawn.x += 3;
		this.prawn.animations.play('PrawnMoveForward');

		game.world.wrap(this.prawn, 0, true);

		if (this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			this.titleMusic.stop();
			game.state.start('Cutscene');
			}
	}
}
