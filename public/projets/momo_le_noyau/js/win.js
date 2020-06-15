var winState = {
 preload: function(){
  game.load.image('fond_win', 'img/fondmenuetpages.png');
  game.load.image('bravo', 'img/Bravo.png');
  game.load.audio('you_win', 'son/victoire.ogg');
 },

 create: function(){
  son = game.add.audio('you_win');
  son.volume = 0.1;
  son.play();
  img = game.add.sprite(0,0,'fond_win');
  img.scale.set(0.25);
  bravo = game.add.sprite(-50,40, 'bravo');
  bravo.scale.set(0.25);
  var instru= game.add.text(100,400,'Appuyez sur W pour retourner au menu principal.',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '30px'});
     var w = game.input.keyboard.addKey(Phaser.Keyboard.W);
     w.onDown.addOnce(this.restat,this); 
    },

 restat: function(){
  game.state.start('menu');
 }
}