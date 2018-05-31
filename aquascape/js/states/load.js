// Aquascape Load state

var Load = function(game) {};

var logo

Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// Displays team logo while other assets are loaded.
		game.stage.backgroundColor = "fff";
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		logo.anchor.set(0.5);

		// Loads assets for title screen.
		game.load.image('titlescreen', 'assets/img/AquascapeTitle.png');

		// Loads assets for rendering the first level.
		game.load.tilemap('shallows', 'assets/map/sandBox.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('shallowsheet', 'assets/img/shallowsTileSet1.png', 32, 32);

		// Loads assets for rendering the second level.

		// Loads texture atlases.
		game.load.atlas('atlas', 'assets/img/shallowsSpritesheet2.png', 'assets/img/shallows2.json');

		// Loads audio.
		game.load.audio('title', ['assets/audio/opening_theme.mp3']);
		game.load.audio('select', ['assets/audio/menu_select.wav']);
		game.load.audio('pause', ['assets/audio/pause_menu.mp3']);
		game.load.audio('lvl1start', ['assets/audio/lvl1_opener.wav']);
		game.load.audio('lvl1', ['assets/audio/lvl1_main.wav']);
		game.load.audio('win', ['assets/audio/level_complete.wav']);
		game.load.audio('grab', ['assets/audio/grab.wav']);

		// Loads cutscenes.

	},

	create: function() {
		console.log('Load: create');

		// Starts title screen state.
		game.state.start('Title');
	}
}
