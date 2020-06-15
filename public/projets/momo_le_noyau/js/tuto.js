var tutoStade = {
 preload: function(){
  game.load.image('fond_win', 'img/fondmenuetpages.png');
  game.load.image('jouer', 'img/jouer_tuto.png');
  game.load.image('suivant', 'img/suivant.png');
 },

 create: function(){
  tuto = 0;
  img = game.add.sprite(0,0,'fond_win');
  img.scale.set(0.25);  
  powerUp =game.add.sprite(100,100,'feedBack',0);
  powerUp.scale.set(1.5);
  t1= game.add.text(175,135,'= + 20 vie',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '20px'});
  powerUp2 =game.add.sprite(100,300,'feedBack',1);
  t2= game.add.text(175,335,'= bouclier',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '20px'});
  powerUp2.scale.set(1.5);
/*  powerUp.frame=0;
  powerUp.frame=1;*/
  jouer = game.add.button(200, 500, 'jouer', function(){game.state.start('play')});
  jouer.scale.set(0.6);  
  suivant = game.add.button(400, 500, 'suivant', this.affiche);
  suivant.scale.set(0.6);

},

 restat: function(){
  game.state.start('play');
 },

 affiche: function(){
  tuto++
  if (tuto == 1) {
    powerUp.kill();
    powerUp2.kill();
    regen = game.add.video('regen');
    regen.addToWorld(250, 135, 0.5, 0.5);
    regen.play(true);
    t1.text = ' = regeneration de vie';
    t1.x = 125+regen.width;    
    tir_video = game.add.video('tir_video');
    tir_video.addToWorld(250, 350, 0.5, 0.5);
    tir_video.play(true);
    t2.text = ' + espace = tir';
    t2.x = 125+tir_video.width;
  }

  if (tuto == 2) {
    game.state.start('tuto2');
  }
 }
}