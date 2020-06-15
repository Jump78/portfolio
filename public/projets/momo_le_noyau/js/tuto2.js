var tuto2Stade = {
 preload: function(){
  game.load.image('fond_win', 'img/fondmenuetpages.png');
  game.load.image('jouer', 'img/jouer_tuto.png');
  game.load.image('suivant', 'img/suivant.png');
 },

 create: function(){
  img = game.add.sprite(0,0,'fond_win');
  img.scale.set(0.25);  
  vie_tuto = game.add.sprite(100,100,'hp_momo');
  vie_tuto.animations.add('descente_vie', [30,29,28,27,26,25,24,23,22,21,20,19,18,17,16,15,14,13,12,11,10,9,8,7,6,5,4,3,2,1,0], 10, true);
  vie_tuto.animations.play('descente_vie');
  t1 = game.add.text(175,135,' Attention a votre vie qui baisse en permanence !',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '20px'});
  t1.x = vie_tuto.x+vie_tuto.width+20;
  fin_tuto = game.add.image(100,300,'fin');
  fin_tuto.animations.add('immobile_fin', [0,1,2,3,4,5,6,7,8,9,10,11,], 10, true);
  fin_tuto.animations.play('immobile_fin');
  t2 = game.add.text(175,335,' Navigque dans le monde jusqu\'a trouver ton cythoplasme !',{fill : '#000', font : 'Helvetica Neue Thin', fontSize : '20px'});
  t2.x = fin_tuto.x+fin_tuto.width+20;
  jouer = game.add.button(game.camera.width/2, 500, 'jouer', function(){game.state.start('play')});
  jouer.scale.set(0.6);
  jouer.anchor.set(0.5,0);  
},

 restat: function(){
  game.state.start('play');
 },
}