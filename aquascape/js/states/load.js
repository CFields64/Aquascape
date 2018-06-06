// Aquascape Load state

var Load = function(game) {};

var logo, loadingBar

Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// Displays team logo while other assets are loaded.
		game.stage.backgroundColor = "3075c9";
		logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
		logo.anchor.set(0.5);

		// Sets up the loading bar.
		loadingBar = game.add.sprite(logo.x, logo.y + 200, 'loading');
		loadingBar.anchor.set(0.5);
		game.load.setPreloadSprite(loadingBar);

		// Loads assets for title screen.
		game.load.image('titlescreen', 'assets/img/AquascapeTitle.png');

		// Loads assets for physics sandbox.
		game.load.tilemap('sandbox', 'assets/map/sandBox.json', null, Phaser.Tilemap.TILED_JSON);

		// Loads assets for the first level.
		game.load.image('lvl1_backdrop', 'assets/img/offBackdrop.png');
		game.load.tilemap('shallows', 'assets/map/shallowsFinalVer.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('shallowsheet', 'assets/map/shallowsTileSet1.png', 32, 32);

		// Loads assets for the second level.
		game.load.image('lvl2_backdrop', 'assets/img/offBackdrop2.png');
		game.load.image('lvl2_decor', 'assets/img/coralDecoration.png');
		game.load.tilemap('coral', 'assets/map/coralReefMap.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.spritesheet('coralsheet', 'assets/map/coralReefTilesetFin.png', 32, 32);

		// Loads texture atlases.
		game.load.atlas('animatedAtlas', 'assets/img/animatedSpritesheet.png', 'assets/img/animatedSprites.json');
		game.load.atlas('staticAtlas', 'assets/img/stillSpritesheet.png', 'assets/img/stillSprites.json');

		// Loads audio.
		game.load.audio('title', ['assets/audio/opening_theme.mp3']);
		game.load.audio('select', ['assets/audio/menu_select.wav']);
		game.load.audio('cont', ['assets/audio/pause_menu.mp3']);
		game.load.audio('lvl1', ['assets/audio/lvl1_main.wav']);
		game.load.audio('lvl2', ['assets/audio/lvl2_theme2.mp3']);
		game.load.audio('crab', ['assets/audio/hermit_crab.wav']);
		game.load.audio('shark', ['assets/audio/shark.mp3']);
		game.load.audio('shark2', ['assets/audio/shark_voice.mp3']);
		game.load.audio('grab', ['assets/audio/grab.wav']);
		game.load.audio('break', ['assets/audio/coral_break.wav']);
		game.load.audio('bump', ['assets/audio/thud.mp3']);

		// Loads voice.
		game.load.audio('mid_VO_1', ['assets/audio/where_am_i.mp3']);
		game.load.audio('mid_VO_2', ['assets/audio/life.mp3']);

		// Loads cutscenes.
		game.load.video('intro', 'assets/video/Intro.mp4');

	},

	create: function() {
		console.log('Load: create');

		// Starts title screen state.
		game.state.start('Title');
	}
}
