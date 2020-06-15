var creditState = {
	preload: function(){
		game.load.image('img_credit','img/crédits.png');
		game.load.image('credit_hover', 'img/retourmenu_hover.png');
	},

	create: function(){
		img = game.add.sprite(-50,-20,'img_credit');
		img.scale.set(0.25);
		button = game.add.button(30, 515, 'button_menu', function(){game.state.start('menu')});
		button.scale.set(0.25);
		button_fb = game.add.button(340, 515, 'button_fb', function(){document.location.href="https://www.facebook.com/"});
		button_fb.scale.set(0.25);
		button_twitter = game.add.button(380, 515, 'button_twitter', function(){document.location.href="https://www.twitter.com/"});
		button_twitter.scale.set(0.25);
		button_google = game.add.button(420, 515, 'button_google', function(){document.location.href="https://plus.google.com/"});
		button_google.scale.set(0.25);
	}
}