// Aquascape object prefabs.

function Box(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'box');

	// Physics
	this.scale.x = 0.6;
	this.scale.y = 0.6;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
}

Box.prototype = Object.create(Phaser.Sprite.prototype);
Box.prototype.constructor = Box;

Box.prototype.update = function() {
	// Box update loop.

}

function BoxHeavy(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'heavyBox2');

	// Physics
	this.scale.x = 1;
	this.scale.y = 1;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 1000;
}

BoxHeavy.prototype = Object.create(Phaser.Sprite.prototype);
BoxHeavy.prototype.constructor = BoxHeavy;

BoxHeavy.prototype.update = function() {
	// BoxHeavy update loop.

}

function Round(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'beachBall');

	// Physics
	this.scale.x = 1;
	this.scale.y = 1;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.setCircle(60);
	this.body.gravity.y = 1000;
}

Round.prototype = Object.create(Phaser.Sprite.prototype);
Round.prototype.constructor = Round;

Round.prototype.update = function() {
	// Round update loop.

}

function Statue(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'statueGlow00001');

	// Animation
	this.animations.add('glow', Phaser.Animation.generateFrameNames('statueGlow',1,17,'',5), 15, false);

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this);
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

function Sponge(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'spongeCompress00011');

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this);
	this.body.dynamic = false;

	// Other attributes
	this.switchOn = false;
	this.inactive = true;
}

Sponge.prototype = Object.create(Phaser.Sprite.prototype);
Sponge.prototype.constructor = Sponge;

Sponge.prototype.update = function() {
	// Sponge update loop.
	if (this.switchOn && this.inactive) {
		this.inactive = false;
	}
}

function Grate(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'SeaGrate');

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this);
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
	this.game.physics.p2.enable(this);
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

function Breakable(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'coralWallSmash00001');

	// Animations
	this.animations.add('explode', Phaser.Animation.generateFrameNames('coralWallSmash',1,19,'',5), 15, false);

	// Physics
	this.scale.x = 1;
	this.game.physics.p2.enable(this);
	this.body.setRectangle(150, 450);
	this.body.dynamic = false;

	// Other attributes
	this.isAlive = true;
}

Breakable.prototype = Object.create(Phaser.Sprite.prototype);
Breakable.prototype.constructor = Breakable;

Breakable.prototype.update = function() {
	// Coral update loop.
	if (!this.isAlive) {
		console.log('We breakin')
		console.log(this.isAlive);
		this.animations.play('explode');
		this.break.play();
		this.destroy();
		this.break.stop();
	}
}

function Door(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'Wall');

	// Physics
	this.scale.y = 1;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.static = true;

	// Other attributes
	this.body.open = false;
}

Door.prototype = Object.create(Phaser.Sprite.prototype);
Door.prototype.constructor = Door;

Door.prototype.update = function() {
	// Door update loop.
}

function CoralDoor(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'wall2');

	// Physics
	this.scale.y = 1;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.static = true;

	// Other attributes
	this.body.open = false;
}

CoralDoor.prototype = Object.create(Phaser.Sprite.prototype);
CoralDoor.prototype.constructor = CoralDoor;

CoralDoor.prototype.update = function() {
	// CoralDoor update loop.
}

function Lever(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'staticAtlas', 'SnakeLever');

	// Physics
	this.facing = 'right';
	this.scale.x = 1;
	this.game.physics.p2.enable(this);
	this.body.collideWorldBounds = true;
	this.body.gravity.y = 0;
	this.body.static = true;

	// Other attributes
	this.switchOn = false;
	this.inactive = true;

	// SFX
	this.creak = this.game.add.audio('lever', 0.5);
}

Lever.prototype = Object.create(Phaser.Sprite.prototype);
Lever.prototype.constructor = Lever;

Lever.prototype.update = function() {
	// Lever update loop.
	if (this.switchOn && this.inactive) {
		this.creak.play();
		this.scale.x = -1;
		this.inactive = false;
	}
}
