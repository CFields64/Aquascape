// Aquascape player prefab

function Player(game, xPos, yPos, key, frame) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, key, frame);

	// Add properties
	this.anchor.set(0.5);

	game.physics.enable(this);
	this.body.collideWorldBounds = true;
	this.body.velocity = 0;
}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
	if(game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
		this.body.velocity.y -= 15; 
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
		this.body.velocity.y += 15;
	}

	if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
		this.body.velocity.x -= 15;
	}
	else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
		this.body.velocity.x -= 15;
	}
}
