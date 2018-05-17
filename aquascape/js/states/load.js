// Aquascape Load state

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// Loads assets for title screen.
		//this.load.image('titlescreen', 'assets/img/titlescreen.png');
		//this.load.image('button', 'assets/img/button.png');

		// Loads assets for rendering the first level.
		game.load.tilemap('shallows', 'assets/img/shallowsArea.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('shallowsheet', 'assets/img/shallowsSheet.png', 32, 32);

		// Loads texture atlas.
		game.load.atlas('atlas', 'assets/img/shallows2.png', 'assets/img/shallows2.json');

		// Loads audio assets.
		game.load.audio('lvl1start', ['assets/audio/lvl1_opener.wav']);
		game.load.audio('lvl1', ['assets/audio/lvl1_main.wav']);
		game.load.audio('win', ['assets/audio/level_complete.wav']);
		game.load.audio('grab', ['assets/audio/grab.wav']);

	},

	create: function() {
		console.log('Load: create');
		game.state.start('Title');
	}
}
