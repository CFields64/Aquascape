// Aquascape NPC prefabs.

function Crab(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'crabIdle00001');

  // Animation
  this.animations.add('idle', Phaser.Animation.generateFrameNames('crabIdle',1,17,'',5), 15, true);

  // SFX
  this.sounds = this.game.add.audio('crab', 1, true);

  // Other attributes
  this.playerClose = false;

}

Crab.prototype = Object.create(Phaser.Sprite.prototype);
Crab.prototype.constructor = Crab;

Crab.prototype.update = function() {
	// Crab update loop.
  this.animations.play('idle');

}

function Clown(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'clownFishIdle00001');

  // Animation
  this.animations.add('idle', Phaser.Animation.generateFrameNames('clownFishIdle',1,9,'',5), 15, true);

  // SFX
  this.sounds = this.game.add.audio('clown', 1, true);

  // Other attributes
  this.playerClose = false;

}

Clown.prototype = Object.create(Phaser.Sprite.prototype);
Clown.prototype.constructor = Clown;

Clown.prototype.update = function() {
	// Clown update loop.
  this.animations.play('idle');

  if(this.playerClose) {
    this.sounds.play();
  } else {
    this.sounds.stop();
  }

}

function Hammerhead(game, xPos, yPos) {
	// Call to Phaser.Sprite
	Phaser.Sprite.call(this, game, xPos, yPos, 'animatedAtlas', 'hammerHeadIdle00001');

  // Animation
  this.animations.add('idle', Phaser.Animation.generateFrameNames('hammerHeadIdle',1,13,'',5), 15, true);

  // SFX
  this.sounds = this.game.add.audio('shark', 1, true);

  // Other attributes
  this.playerClose = false;

}

Hammerhead.prototype = Object.create(Phaser.Sprite.prototype);
Hammerhead.prototype.constructor = Hammerhead;

Hammerhead.prototype.update = function() {
	// Hammerhead update loop.
  this.animations.play('idle');

}
