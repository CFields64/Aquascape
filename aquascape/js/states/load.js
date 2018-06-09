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
		game.load.image('lvl1_decor', 'assets/img/shallowDecoration.png');
		game.load.tilemap('shallows', 'assets/map/shallowsMap.json', null, Phaser.Tilemap.TILED_JSON);
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
		game.load.audio('title', ['assets/audio/opening_theme.mp3', 'assets/audio/opening_theme.ogg']);
		game.load.audio('select', ['assets/audio/menu_select.mp3', 'assets/audio/menu_select.ogg']);
		game.load.audio('cont', ['assets/audio/pause_menu.mp3', 'assets/audio/pause_menu.ogg']);
		game.load.audio('lvl1', ['assets/audio/lvl1_main.mp3', 'assets/audio/lvl1_main.ogg']);
		game.load.audio('lvl2', ['assets/audio/lvl2_main.mp3', 'assets/audio/lvl2_main.ogg']);
		game.load.audio('crab', ['assets/audio/crab.mp3', 'assets/audio/crab.ogg']);
		game.load.audio('clown', ['assets/audio/clownfish.mp3', 'assets/audio/clownfish.ogg']);
		game.load.audio('shark', ['assets/audio/shark_voice.mp3', 'assets/audio/shark_voice.ogg']);
		game.load.audio('grab', ['assets/audio/grab.mp3', 'assets/audio/grab.ogg']);
		game.load.audio('break', ['assets/audio/coral_break.mp3', 'assets/audio/coral_break.ogg']);
		game.load.audio('lever', ['assets/audio/lever_pull.mp3', 'assets/audio/lever_pull.ogg']);

		// Loads voice.
		game.load.audio('mid_VO_1', ['assets/audio/where_am_i.mp3', 'assets/audio/where_am_i.ogg']);
		game.load.audio('mid_VO_2', ['assets/audio/life.mp3', 'assets/audio/life.ogg']);

		// Loads cutscenes.
		game.load.video('intro', 'assets/video/Intro.mp4');
		game.load.video('outro', 'assets/video/Outro.mp4');
		game.load.video('credits', 'assets/video/Credits.mp4');

	},

	create: function() {
		console.log('Load: create');

		// Starts title screen state.
		game.state.start('Title');
	}
}
