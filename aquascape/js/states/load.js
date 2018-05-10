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
		game.load.spritesheet('shallowsheet', 'assets/img/shallowsArea1.png', 32, 32);
	},

	create: function() {
		console.log('Load: create');
		game.state.start('Title');
	}
}
