// Aquascape player prefab

function Player(game, xPos, yPos, key, frame) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

	// Add properties
	this.anchor.set(0.5);

	game.physics.enable(this);
	this.body.collideWorldBounds = true;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	
}
