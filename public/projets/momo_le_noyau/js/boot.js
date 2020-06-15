var bootState = {
	create: function(){
		//Physique, activation !
	    game.physics.startSystem(Phaser.Physics.P2JS);
	    game.world.setBounds(0, 0, 2100, 2100);
	    game.physics.p2.setImpactEvents(true);

	    game.state.start('preload');
	}
}