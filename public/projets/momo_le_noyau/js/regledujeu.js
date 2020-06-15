var regleDuJeuState = {
	create: function(){
        game.add.sprite(0,0,'regle');
        button = game.add.button(30, 515, 'button_menu', function(){game.state.start('menu')});
		button.scale.set(0.25);
	},

}