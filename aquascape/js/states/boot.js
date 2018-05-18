// Aquascape Boot State

var Boot = function(game) {};
Boot.prototype = {
	preload: function() {
		console.log('Boot: preload');

		// Load logo asset for load state.
		game.load.image('logo', 'assets/img/Shinobu4.png');
		
	},

	create: function() {
		console.log('Boot: create');

		// Dat.gui implementation, based on implementation from Johannes
		// Spaulding's examples from the Tools guest lecture.
		settings = {

			// Debug Controls
			debugCollisonLayer: false,
			debugBoundingBox: false,
			debugPlayerBodyInfo: false,
			debugCameraInfo: false,
			debugFps: false,
			musicOn: false,
			sfxOn: true,

			// Player properties
			maxVelocity: 700,
			moveSpeed: 150,
			gravity: 1000,

		};

		// Reference to gui.
		this.game.gui = new dat.GUI({width: 350});

		// Save and remember settings.
		this.game.gui.useLocalStorage = true;
		this.game.gui.remember(settings);

		// Set precision level of gui.
		var stepSize = 1;

		// Player Folder settings.
		this.game.gui.playerFolder = this.game.gui.addFolder('Player');
		this.game.gui.playerFolder.add(settings, 'moveSpeed').min(0).max(1000).step(stepSize).name('Move Speed');
		this.game.gui.playerFolder.add(settings, 'maxVelocity').min(0).max(1000).step(stepSize).name('Max Velocity');
		this.game.gui.playerFolder.add(settings, 'gravity').min(0).max(1000).step(stepSize).name('Gravity');

		// Debug Folder settings.
		this.game.gui.debugFolder = this.game.gui.addFolder('Debug');
		this.game.gui.debugFolder.add(settings, 'debugFps').name('FPS');
		this.game.gui.debugFolder.add(settings, 'debugCollisonLayer').name('Collision Layer');
		this.game.gui.debugFolder.add(settings, 'debugBoundingBox').name('Bounding Boxes');
		this.game.gui.debugFolder.add(settings, 'debugPlayerBodyInfo').name('Player Body Info');
		this.game.gui.debugFolder.add(settings, 'debugCameraInfo').name('Camera Info');
		this.game.gui.debugFolder.add(settings, 'musicOn').name('Music On');
		this.game.gui.debugFolder.add(settings, 'sfxOn').name('SFX On');


		game.state.start('Load');
	}
}
