// Aquascape object prefabs.

function Box(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'box');

	// Physics
	this.scale.x = 0.6;
	this.scale.y = 0.6;
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
	// Box update loop.

}

function Statue(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'statueGlow00001');

	// Animation
	this.animations.add('glow', Phaser.Animation.generateFrameNames('statueGlow',1,17,'',5), 15, false);

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.dynamic = false;

	// Other attributes
	this.switchOn = false;
	this.inactive = true;
}

Statue.prototype = Object.create(Phaser.Sprite.prototype);
Statue.prototype.constructor = Statue;

Statue.prototype.update = function() {
	// Statue update loop.
	if (this.switchOn && this.inactive) {
		this.animations.play('glow');
		this.inactive = false;
	}
}

function Grate(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'SeaGrate');

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.setCircle(140);
	this.body.static = true;

	// Other attributes
}

Grate.prototype = Object.create(Phaser.Sprite.prototype);
Grate.prototype.constructor = Grate;

Grate.prototype.update = function() {
	// Grate update loop.
}

function Grateopen(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'SeaGrate2');

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.setCircle(100);
	this.body.dynamic = false;

	// Other attributes
}

Grateopen.prototype = Object.create(Phaser.Sprite.prototype);
Grateopen.prototype.constructor = Grateopen;

Grateopen.prototype.update = function() {
	// Grate update loop.
}

function Sponge(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'spongeCompress00001');

	// Animation
	this.animations.add('compress', Phaser.Animation.generateFrameNames('spongeCompress',1,11,'',5), 15, false);
	this.animations.add('expand', Phaser.Animation.generateFrameNames('spongeExpand',1,11,'',5), 15, false);

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.dynamic = false;

	// Other attributes
	this.switchOn = false;
	this.inactive = true;
	this.winSound = this.game.add.audio('win', 0.75);
}

Sponge.prototype = Object.create(Phaser.Sprite.prototype);
Sponge.prototype.constructor = Sponge;

Sponge.prototype.update = function() {
	// Sponge update loop.
}

function Coral(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'coralWallSmash00001');

	// Animations
	this.animations.add('explode', Phaser.Animation.generateFrameNames('coralWallSmash',1,19,'',5), 15, false);

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this, true);
	this.body.dynamic = false;

	// Other attributes
	this.isAlive = true;
	this.break = this.game.add.audio('break', 0.75);
}

Coral.prototype = Object.create(Phaser.Sprite.prototype);
Coral.prototype.constructor = Coral;

Coral.prototype.update = function() {
	// Coral update loop.
	if (!this.isAlive) {
			this.break.play();
			this.animations.play('explode');
			this.destroy();
	}
}
