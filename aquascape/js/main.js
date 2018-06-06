// Aquascape Main function

var game;
var settings;

window.onload = function() {
	game = new Phaser.Game(1000, 800, Phaser.AUTO);
	game.state.add('Boot', Boot);
	game.state.add('Load', Load);
	game.state.add('Title', Title);
	game.state.add('Sandbox', Sandbox);
	game.state.add('Cutscene', Cutscene);
	game.state.add('Shallows', Shallows);
	game.state.add('Midroll', Midroll);
	game.state.add('Coral', Coral);
	game.state.add('Credits', Credits);
	game.state.start('Boot');
}

// Set up game pause.
window.onkeydown = function(event) {
	// Firefox compatability.
	var keycode = event.keyCode || event.which;

	if (keycode === Phaser.Keyboard.P) {
		pauseGame();
	}
}

function pauseGame() {
	// Toggle game pause.
	game.paused ? game.paused = false : game.paused = true;
}
