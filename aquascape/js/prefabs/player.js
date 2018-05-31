// Aquascape player prefab
// Some of player prefab is adapted from Johannes Spaulding's player prefab from
// provided tools source code.

function Player(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'atlas', 'PrawnMoveForward00001');

	// Animations
	this.animations.add('PrawnMoveForward', Phaser.Animation.generateFrameNames('PrawnMoveForward',1,11,'',5),15,true);
	this.animations.add('PrawnMoveUp', Phaser.Animation.generateFrameNames('PrawnMoveUp',1,11,'',5),15,true);
	this.animations.add('PrawnMoveDown', Phaser.Animation.generateFrameNames('PrawnMoveDown',1,11,'',5),15,true);
	this.animations.add('PrawnMoveIdle', Phaser.Animation.generateFrameNames('PrawnMoveIdle',1,11,'',5),15,true);
	this.animations.add('PrawnGrab', Phaser.Animation.generateFrameNames('PrawnGrab',1,11,'',5),15,true);
	this.animations.add('PrawnUngrab', Phaser.Animation.generateFrameNames('PrawnUngrab',1,11,'',5),15,true);
	this.animations.add('PrawnGrabMove', Phaser.Animation.generateFrameNames('PrawnGrabMove',1,10,'',5),15,true);

	// Physics
	this.facing = 'right';
	this.scale.x = 0.4;
	this.scale.y = 0.4;
	this.game.physics.p2.enable(this, true);
	this.body.static = false;
	this.body.collideWorldBounds = true;
	//this.body.setCollisionGroup(playerCollisionGroup);
	this.body.clearShapes();
	this.body.addCapsule(10, 30);
	this.body.gravity.y = 1000;
	this.xSpeed = 150;
	this.ySpeed = 150;
	this.body.maxVelocity = 700;

	// Input
	this.keys = {};
	this.keys.left = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
	this.keys.right = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
	this.keys.up = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
	this.keys.down = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
	this.keys.grab = this.game.input.keyboard.addKey(Phaser.Keyboard.E);
	this.keys.charge = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	// Other mechanics
	this.grabSound = this.game.add.audio('grab', 0.75);

}

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {

	// Physics
	this.body.velocity.x = 0;
	this.body.velocity.y = 0;


	if (!this.keys.grab.isDown) {
		if (this.keys.left.isDown && this.keys.down.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.body.velocity.y = this.ySpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnMoveDown');
		} else if (this.keys.left.isDown && this.keys.up.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.body.velocity.y = -this.ySpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnMoveUp');
		} else if (this.keys.right.isDown && this.keys.up.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.body.velocity.y = -this.ySpeed;
			this.facing = 'right';
			this.scale.x = 0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnMoveUp');
		} else if (this.keys.right.isDown && this.keys.down.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.body.velocity.y = this.ySpeed;
			this.facing = 'right';
			this.scale.x = 0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnMoveDown');
		} else if (this.keys.right.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.facing = 'right';
			this.animations.play('PrawnMoveForward');
			this.scale.x = 0.4;
			this.scale.y = 0.4;
		} else if (this.keys.left.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnMoveForward');
		} else if (this.keys.down.isDown) {
			this.body.velocity.y = this.ySpeed;
			this.animations.play('PrawnMoveDown');
		} else if (this.keys.up.isDown) {
			this.body.velocity.y = -this.ySpeed;
			this.animations.play('PrawnMoveUp');
		} else {
			this.animations.play('PrawnMoveIdle');
		}
	}

	if (this.keys.grab.isDown) {
		//this.body.collides(boxCollisonGroup, grab, this);

		// Movement animations while grabbing.
		if (this.keys.left.isDown && this.keys.down.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.body.velocity.y = this.ySpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.left.isDown && this.keys.up.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.body.velocity.y = -this.ySpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.right.isDown && this.keys.up.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.body.velocity.y = -this.ySpeed;
			this.facing = 'right';
			this.scale.x = 0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.right.isDown && this.keys.down.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.body.velocity.y = this.ySpeed;
			this.facing = 'right';
			this.scale.x = 0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.right.isDown) {
			this.body.velocity.x = this.xSpeed;
			this.facing = 'right';
			this.animations.play('PrawnGrabMove');
			this.scale.x = 0.4;
			this.scale.y = 0.4;
		} else if (this.keys.left.isDown) {
			this.body.velocity.x = -this.xSpeed;
			this.facing = 'left';
			this.scale.x = -0.4;
			this.scale.y = 0.4;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.down.isDown) {
			this.body.velocity.y = this.ySpeed;
			this.animations.play('PrawnGrabMove');
		} else if (this.keys.up.isDown) {
			this.body.velocity.y = -this.ySpeed;
			this.animations.play('PrawnGrabMove');
		} else {
			this.animations.play('PrawnGrab');
		}

	}
};

Player.prototype.grab = function(body1, body2) {
	if (settings.sfxOn) this.grabSound.play();
	console.log('Grab');

	// If player object is touching a grabbable object, creates a constraint between the
	// and the object they are picking up.
	game.physics.p2.createRevoluteConstraint(body1, [0.5, 0.8], body2, [0,0]);
}
