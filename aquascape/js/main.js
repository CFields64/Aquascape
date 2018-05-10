// Aquascape Main function

var game;

window.onload = function() {
	game = new Phaser.Game(800, 600, Phaser.AUTO);
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Shallows', Shallows);
	game.state.add('Coral', Coral);
	game.state.add('Jelly', Jelly);
	game.state.add('Kelp', Kelp);
	game.state.add('Ocean', Ocean);
	game.state.add('GameOver', GameOver);
	game.state.add('Credits', Credits);
	game.state.start('Boot');
}
