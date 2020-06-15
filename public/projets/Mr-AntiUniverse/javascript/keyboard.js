let keyboard = {
	init(){	
		document.body.addEventListener("keydown", function(e) {
		    Game.spaceship.entryControls[e.key] = true;
		});
		 
		document.body.addEventListener("keyup", function(e) {
		    Game.spaceship.entryControls[e.key] = false;
		});
	}
}