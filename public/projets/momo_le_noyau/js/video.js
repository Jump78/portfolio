var vidState = {
 create: function(){
  video = game.add.video('intro');
      videoSprite = game.add.sprite(-10, 0, video);
      video.play();
      
      video.onComplete.add(function(){
       game.state.start('menu');
      })
     }
}