var click = {
    x: 0,
    y: 0,
    x_bullet:0,
    y_bullet:0
};
var click_bullet = {
    x_bullet:0,
    y_bullet:0
};
var game = new Phaser.Game(1200, 550, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
    game.load.spritesheet('momo', 'img/momo.png', 64, 64);  
    game.load.spritesheet('virus', 'img/virus.png', 64, 64);  
    game.load.image('cellule_regen', 'img/cellule_regen.png');  
    game.load.image('lymphocyteb', 'img/lymphocyteb.png');  
}
var bulletTime = 0;
var firebutton;
function create() {
    //Physique, activation !
    game.physics.startSystem(Phaser.Physics.P2JS);
    //game.world.setBounds(0, 0, 1200, 700);
    game.physics.p2.updateBoundsCollisionGroup();
    //Joueur
    player = game.add.sprite(150, 300, 'momo');
    game.physics.p2.enable(player);
    player.animations.add('immobile', [0,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
    player.scale.set(0.5);
    player.body.setCircle(player.width/2);
    player.body.collideWorldBounds = true;
    player.body.fixedRotation = true;
    player.body.fixedRotation = true;
    player.dash_en_cours = false;
    player.vitesse_max = 800;
    player.vitesse_actuel = 800;
    player.distance_dash = 15;
    player.distance_parcouru = 0;
    player.cd_dash = 0;
    player.vie_max = 100;
    player.vie  = 100;
    player.environnement = 'rien';
    //bullet a nous
    bullets_player = game.add.group();
    bullets_player.enableBody = true;
    bullets_player.physicsBodyType = Phaser.Physics.ARCADE;
    bullets_player.createMultiple(30, 'bullet_players');
    bullets_player.setAll('outOfBoundsKill', true);
    bullets_player.setAll('checkWorldBounds', true);
    //bare de vie
    barre_vie_max = new Phaser.Rectangle(10, game.height-30, player.vie_max*5, 25);
    barre_vie = new Phaser.Rectangle(10, game.height-30, player.vie*5, 25);
    barre_vie.fixedToCamera = true;
    barre_vie_max.fixedToCamera = true;
    //allie
    allie = game.add.group();
    var type =['regen','tir'];
    var img = ['cellule_regen','lymphocyteb']
    for (var i = 1; i < 3; i++){
        var indice = game.rnd.integerInRange(0,type.length-1);
        var news = allie.create(150*i,150*i*i/2,img[indice]);
        game.physics.p2.enable(news);
        news.scale.set(0.3);
        news.body.setCircle(news.width/2);
        news.body.collides(allie);
        news.width_max = news.width;
        news.height_max = news.height;
        news.type= 'cellule_regen';
    }
    //Ennemi
    virus = game.add.group();
    for (var i = 0; i < 10;i++) {
        var news = virus.create(game.rnd.integerInRange(0,game.width),game.rnd.integerInRange(0,game.height),'virus'); 
        news.animations.add('immobile', [0,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
        news.animations.play('immobile');
    }
    game.physics.p2.enable(virus,false);
    
    player.body.collides(allie);
    game.camera.follow(player);
    firebutton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
}

function update() {
    if (player.alive) {
        player.animations.play('immobile');
        move_momo();
        virus.forEachAlive(move_virus,this);
        vie();
        allie.forEachAlive(collision_allie,this);
        capacite(player.cellule);
        bullets_player.forEachAlive(collision_bullet_ennemi,this);
    }else{
        game.debug.text('T\'es mort',50,100);
    }

}
function tir_player(entite){
    if (firebutton.isDown) {
    //save des pos pointer
    click_bullet.x = game.input.mousePointer.x;
    click_bullet.y = game.input.mousePointer.y;
        if (game.time.now>bulletTime) {
                bullet = bullets_player.getFirstExists(false);
            if (bullet) {
                bullet.reset(entite.x,entite.y + 8);
                mouvement_vers_objet(bullet,click_bullet,500);
                bulletTime = game.time.now+400;
                entite.width-=((entite.width_max*15)/100);
                entite.height-=((entite.height_max*15)/100); 
            }
        }
    }    
}
function collision_allie(allie){
    if ((player.x>allie.x-allie.width/2&&(player.x<allie.x+allie.width/2))
    &&  (player.y>allie.y-allie.height/2&&(player.y<=allie.y+allie.height/2))){
        player.environnement=allie.type;
        player.cellule = allie;
        if (allie.type=='cellule_regen') {
            allie.width-=0.9;
            allie.height-=0.9;          
        }
        attraction(allie);
    }else{
        if (allie.type == 'cellule_regen'){            
            allie.width++;
            allie.height++;
        }
        if (allie.width>allie.width_max) {
            allie.width=allie.width_max;
            allie.height=allie.height_max;
        }
    }
}
function collision_bullet_ennemi(){

}
function attraction(allie){
    if (player.x>allie.x){
        player.body.x-=1;
    }else if (player.x<allie.x){
        player.body.x+=1;
    }
    if (player.y>allie.y){
        player.body.y-=1;
    }else if (player.y<allie.y){
        player.body.y+=1;
    }
    if (allie.width<player.width) {
        allie.kill();
        player.environnement='rien';
    }
}
function capacite(entite){
    switch(player.environnement){
        case 'regen':
            player.vie+=0.15;
            if (player.vie>=player.vie_max) {
                player.vie = player.vie_max;
            }
        break;
        case 'tir':
            tir_player(entite);
        break;
        }
}
function move_momo(){
    //Si on click dans le monde et qu'aucun dash est en cours
    if (game.input.activePointer.leftButton.isDown && player.cd_dash==0 && player.dash_en_cours == false) {
        console.log(game.input.activePointer);
        //save des pos pointer
        click.x = game.input.activePointer.leftButton.event.clientX;
        click.y = game.input.activePointer.leftButton.event.clientY;
        player.dash_en_cours = true;
    }
    //Si le dash est en cours
    if (player.dash_en_cours==true){
        player.distance_parcouru++;  
        mouvement_vers_objet(player,click,player.vitesse_actuel); //mouvement de momo vers le pointer
        if (player.distance_parcouru>=player.distance_dash) {
           player.dash_en_cours = false;
           player.cd_dash = 25;
           player.environnement = 'rien';

        }
        //Si momo atteint les coordonnée du click, il se stop
        if ((player.x<click.x && click.x<player.x+(player.width*0.5))
        &&(player.y<click.y && click.y<player.y+(player.height*0.5))){
            player.dash_en_cours = false;
            player.cd_dash = 25;
            player.environnement = 'rien';
        }  
    }else{
        player.distance_parcouru=0;
        player.body.setZeroVelocity();
        player.cd_dash--;
        player.vitesse_actuel = player.vitesse_max;
        if (player.cd_dash<=0) {
            player.cd_dash = 0;
        }  
    }
}   
function vie(){
    if (player.environnement == 'rien'){
        player.vie-=0.15;
        if (player.vie<=0){
            player.vie = 0; 
            player.kill();
        }
    }
    barre_vie.width = player.vie*5;
    game.debug.geom(barre_vie_max,'#000000');
    game.debug.geom(barre_vie,'#ff0000');
}
function move_virus(virus){
    mouvement_vers_objet(virus,player,game.rnd.integerInRange(10,30));
}

function mouvement_vers_objet(obj1, obj2, vitesse) {
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    obj1.body.velocity.x = Math.cos(angle) * vitesse;
    obj1.body.velocity.y = Math.sin(angle) * vitesse;
}