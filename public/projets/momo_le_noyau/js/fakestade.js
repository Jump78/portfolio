var fakeState = {
 preload: function(){
  game.load.image('fond', 'img/fondmenuetpages.png');
  game.load.image('travaux', 'img/travaux.png');
  // game.load.image('loulz', 'img/zoe.png');
 },

 create: function(){
  img = game.add.sprite(0,0,'fond');
  img.scale.set(0.25);
  trv = game.add.sprite(600,0,'travaux');
  trv.scale.set(0.5);
  // zozo = game.add.sprite(230,-70,'loulz');
  // zozo.scale.set(1.25);
  button = game.add.button(30, 515, 'button_menu', function(){game.state.start('menu')});
  button.scale.set(0.25);  
  var instru= game.add.text(250,500,'WIP, repassez plus tard.',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '30px'});
  var w = game.input.keyboard.addKey(Phaser.Keyboard.W);
  w.onDown.addOnce(this.restat,this); 
    },


 restat: function(){
  game.state.start('menu');
 }
}