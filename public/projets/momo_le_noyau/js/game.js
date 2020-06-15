var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamesse');

game.state.add('boot', bootState);
game.state.add('preload', preloadState);
game.state.add('menu', menuState);
game.state.add('play', playState);
game.state.add('win', winState);
game.state.add('loose', looseState);
game.state.add('credit', creditState);
game.state.add('regleDuJeu', regleDuJeuState);
game.state.add('intro', vidState);
game.state.add('fake', fakeState);
game.state.add('tuto', tutoStade);
game.state.add('tuto2', tuto2Stade);

game.state.start('boot');