// Aquascape object prefabs.

function Box(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'box');

	// Physics
	this.scale.x = 1;
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
	//this.body.setSize(18, 36, 18, 15);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 500;
	this.body.bounce = 1;
	this.body.tilePadding.x = this.body.width;
	this.body.tilePadding.y = this.body.height;
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
	// Box update loop.
	
}

function Statue(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'statue');

	// Physics
	this.scale.x = 1;
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
	//this.body.setSize(18, 36, 18, 15);
	this.body.immovable = true;
	this.body.tilePadding.x = this.body.width;
	this.body.tilePadding.y = this.body.height;

	// Other attributes
	this.switchOn = false;
	this.winSound = this.game.add.audio('win', 0.75);
}

Statue.prototype = Object.create(Phaser.Sprite.prototype);
Statue.prototype.constructor = Statue;

Statue.prototype.update = function() {
	// Statue update loop.
	if (this.switchOn) {
		if (settings.sfxOn) {
			this.winSound.play();
		}
	}	
}

function Grate(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'grate');

	// Physics
	this.scale.x = 1;
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enable(this);
	this.body.collideWorldBounds = true;
	//this.body.setSize(18, 36, 18, 15);
	this.body.gravity.y = 0;
	this.body.tilePadding.x = this.body.width;
	this.body.tilePadding.y = this.body.height;

	// Other attributes
}

Grate.prototype = Object.create(Phaser.Sprite.prototype);
Grate.prototype.constructor = Grate;

Grate.prototype.update = function() {
	// Grate update loop.
}
