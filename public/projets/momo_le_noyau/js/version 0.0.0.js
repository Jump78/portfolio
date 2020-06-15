var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('momo', 'img/momo.png', 32, 32);	
}

function create() {
	//Physique, activation !
    game.physics.startSystem(Phaser.Physics.P2JS);

    //Joueur
    player = game.add.sprite(132, game.world.height - 150, 'momo');
    game.physics.p2.enable(player,false);
    player.animations.add('immobile', [0,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,,26,27,28,29,30,31,32,33,34,35,36,37,38,39], 10, true);
    player.scale.x*=3;
    player.scale.y*=3;
    //Ennemi
    virus = game.add.group();
    /*for (var i = 0; i < 10; i++) {
        var news = virus.create(game.rnd.integerInRange(0,game.width),game.rnd.integerInRange(0,game.height),'momo'); 
    }*/
    game.physics.p2.enable(virus,false);

}
    var x_click;
    var y_click;
    var dash_en_cours = false;
    var vitesse_momo = 500;
function update() {
    player.animations.play('immobile');
    move_momo();
    virus.forEachAlive(move_virus,this);

}

function move_momo(){
    //Si on click dans le monde et qu'aucun dash est en cours
    if (game.input.activePointer.leftButton.isDown && dash_en_cours == false) {
        //save des pos pointer
        x_click = game.input.activePointer.leftButton.event.clientX;
        y_click = game.input.activePointer.leftButton.event.clientY;
        mouvement_vers_objet(player,game.input.activePointer,vitesse_momo); //mouvement de momo vers le pointer
        dash_en_cours = true;
    }

    //Si momo atteint les coordonnée du click, il se stop
    if ((player.x<x_click && x_click<player.x+(player.width*0.5))
    &&(player.y<y_click && y_click<player.y+(player.height*0.5))){
        player.body.velocity.x = 0;
        player.body.velocity.y = 0;
        dash_en_cours = false;
    }  

}
function move_virus(virus){
    mouvement_vers_objet(virus,player,game.rnd.integerInRange(10,666));
}

function mouvement_vers_objet(obj1, obj2, vitesse) {
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.velocity.x = Math.cos(angle) * vitesse;
    obj1.body.velocity.y = Math.sin(angle) * vitesse;
}