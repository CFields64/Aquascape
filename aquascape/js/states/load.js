// Aquascape Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// Loads assets for title screen.
		//this.load.image('titlescreen', 'assets/img/titlescreen.png');
		//this.load.image('button', 'assets/img/button.png');

		// Loads assets for rendering the first level.
		game.load.tilemap('shallows', 'assets/img/shallowsArea1.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('shallowsheet1', 'assets/img/extrawall1.png', 32, 32);
		game.load.spritesheet('shallowsheet2', 'assets/img/extrawall2.png', 32, 32);
		game.load.spritesheet('shallowsheet3', 'assets/img/extrawall3.png', 32, 32);
		game.load.spritesheet('shallowsheet4', 'assets/img/extrawall4.png', 32, 32);
		game.load.spritesheet('shallowsheet5', 'assets/img/offBackdrop.png', 32, 32);
		game.load.spritesheet('shallowsheet6', 'assets/img/blackseaWallRight.png', 32, 32);
		game.load.spritesheet('shallowsheet7', 'assets/img/Sandy.png', 32, 32);
		game.load.spritesheet('shallowsheet8', 'assets/img/shallows.png', 32, 32);

		// Loads player assets.
		game.load.image('player', 'assets/img/prawn.png');

		// Loads world object assets.
		game.load.image('box', 'assets/img/SeaBlock2.png');
	},

	create: function() {
		console.log('Load: create');
		game.state.start('Title');
	}
}
