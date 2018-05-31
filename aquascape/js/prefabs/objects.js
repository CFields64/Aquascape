// Aquascape object prefabs.

function Box(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'box');

	// Physics
	this.scale.x = 0.4;
	this.scale.y = 0.4;
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	//this.body.setCollisionGroup(boxCollisionGroup);
	//this.body.collides([playerCollisionGroup, boxCollisionGroup, statueCollisionGroup]);
	this.body.gravity.y = 1000;
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
	this.game.physics.p2.enable(this, true);
	this.body.dynamic = false;

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
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.setCircle(140);
	this.body.dynamic = false;

	// Other attributes
}

Grateopen.prototype = Object.create(Phaser.Sprite.prototype);
Grateopen.prototype.constructor = Grateopen;

Grateopen.prototype.update = function() {
	// Grateopen update loop.
}

function Grateopen(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'grate');

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.setCircle(140);
	this.body.static = false;

	// Other attributes
}

Grateopen.prototype = Object.create(Phaser.Sprite.prototype);
Grateopen.prototype.constructor = Grateopen;

Grateopen.prototype.update = function() {
	// Grate update loop.
}
