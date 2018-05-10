// Aquascape object prefabs.

function Box(game, xPos, yPos, key, frame) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

	// Add properties.
	this.anchor.set(0.5);

	game.physics.enable(this);
	this.body.collideWorldBounds(true);
	this.body.velocity = 0;
	this.body.gravity.y = 200;
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
	// Box update loop.
	// Check for grabs?/Variables for opening doors?
}
