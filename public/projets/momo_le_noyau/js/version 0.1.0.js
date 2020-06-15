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
var phase ='jeu';
var tir_ennemi;
var lives;
var firingTimer = 0;
var bulletTime = 0;
var firebutton;
var livingEnemies = [];
var fin_jeu = false;
var w = 800, h = 600;
var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gamesse', { preload: preload, create: create, update: update });

function preload() {
/*    var loadingBar = this.add.sprite(160,240,"fond");
    loadingBar.anchor.setTo(0.5,0.5);
    this.load.setPreloadSprite(loadingBar); */  
    game.load.spritesheet('momo', 'img/Asset_momo.png', 64, 64);  
    game.load.spritesheet('hp_momo', 'img/Asset_Hp.png', 64, 64);  
    game.load.spritesheet('bullet_players', 'img/asset_Anticorps.png', 64, 64);  
    game.load.spritesheet('virus', 'img/Asset_virus.png', 64, 64);  
    game.load.spritesheet('cancer', 'img/Asset_Cellule Cancereuse.png', 64, 64);  
    game.load.spritesheet('powerUp', 'img/Asset_Power_Up.png', 64, 64);  
    game.load.spritesheet('cellule_noyau', 'img/Asset_Noyau_ally.png',64,64);  
    game.load.spritesheet('cellule_regen', 'img/Asset_Cellule_ally.png',64,64);  
    game.load.spritesheet('lymphocyteb', 'img/lymphocyteb.png',64,64);  
    game.load.spritesheet('enemyBullet', 'img/Asset_Projectil_ennemy.png',64,64);  
    game.load.image('fin', 'img/fin.png');  
    game.load.image('fond', 'img/Fond_00000.png');  
    game.load.image('fond2', 'img/Fond_00001.png');  
    game.load.image('fond3', 'img/Fond_00002.png');  
    game.load.image('button', 'img/cellule_regen.png');  
    game.load.image('paroi', 'img/paroi.png');  
    game.load.script('blurx','filters/BlurX.js');
    game.load.script('blury','filters/BlurY.js');
    game.load.script('DisplacementFilter','filters/pixi/displacementfilter.js');
    game.load.physics('physicsData', 'physic.json');
}
function create() {
    //Physique, activation !
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.world.setBounds(0, 0, 2100, 2100);
    game.physics.p2.setImpactEvents(true);
    //Groupe Collide
    game.physics.p2.updateBoundsCollisionGroup();
    window.playerCollisionGroup = game.physics.p2.createCollisionGroup();
    window.playerBulletCollisionGroup = game.physics.p2.createCollisionGroup();
    window.virusCollisionGroup = game.physics.p2.createCollisionGroup();
    window.ennemyBulletCollisionGroup = game.physics.p2.createCollisionGroup();
    window.celluleAllieCollisionGroup = game.physics.p2.createCollisionGroup();
    window.noyauCollisionGroup = game.physics.p2.createCollisionGroup();
    window.powerUpAllieCollisionGroup = game.physics.p2.createCollisionGroup();
    window.finCollisionGroup = game.physics.p2.createCollisionGroup();
    window.murCollisionGroup = game.physics.p2.createCollisionGroup();
    //fond.fixedToCamera = true;
    fond1 = game.add.tileSprite(0, 0, 800, 600, 'fond');
    fond1.fixedToCamera = true;
    fond2 = game.add.tileSprite(0, 0, 800, 600, 'fond2');
    fond2.fixedToCamera = true;
    fond3 = game.add.tileSprite(0, 0, 800, 600, 'fond3');
    fond3.fixedToCamera = true;
    mur = game.add.sprite(game.world.centerX,game.world.centerY,'paroi');
    game.physics.p2.enable(mur, false);
    mur.body.clearShapes();
    mur.body.loadPolygon('physicsData','paroi');    
    //filtre
    //displacementTexture = new Phaser.Sprite(0,0,"fond1");
    //displacementFilter = new PIXI.DisplacementFilter(displacementTexture.texture);   
    //fond1.filters = [displacementFilter];
    //displacementFilter.scale.x = 0;
    //displacementFilter.scale.y = 0;
    //mur
    mur.fixedRotation = true;
    mur.body.kinematic = true;
    mur.body.setCollisionGroup(murCollisionGroup);    
    mur.body.collides([virusCollisionGroup,ennemyBulletCollisionGroup,celluleAllieCollisionGroup,playerBulletCollisionGroup]);   
    mur.body.collides(playerCollisionGroup,hitMur,this);   
     //allie
    allie = game.add.group();
    //Noyau allie
    noyaux = game.add.group();
    //Generation allie
    generateAllie(300,300,0,1);
    generateAllie(600,1000,1,1);
    generateAllie(1000,350,0,1);
    generateAllie(1500,500,1,1);
    generateAllie(1800,1800,0,1);
    generateAllie(750,800,1,1);
    generateAllie(1250,150,0,1);
    generateAllie(850,350,1,1);
    generateAllie(1400,1800,0,1);
    generateAllie(300,1000,1,1);
    generateAllie(650,350,0,1);
    //Ennemi
    virus = game.add.group();
    generateVirus(250,500,0,1);   
    generateVirus(1000,500,1,1);   
    generateVirus(1500,100,0,1);   
    generateVirus(1800,100,1,1);   
    generateVirus(1500,1500,0,1);   
    generateVirus(1850,1850,1,1);   
    generateVirus(500,1800,0,1);   
    generateVirus(1000,1000,1,1);   
    generateVirus(1250,500,0,1);

        
    //Munitions ennemies
    enemyBullets = game.add.group();
    enemyBullets.enableBody = true;
    enemyBullets.physicsBodyType = Phaser.Physics.P2JS;
    enemyBullets.createMultiple(10, 'enemyBullet');

    //Power Up
    powerUps = game.add.group();
    generatePowerUp(100,300,0,1);
    generatePowerUp(700,600,1,1);
    generatePowerUp(1000,1300,1,1);
    generatePowerUp(1100,1000,0,1);
    generatePowerUp(game.world.centerX,game.world.centerY,1,1);

    //fin
    fin = game.add.sprite(1800,1600,'fin');
    fin.scale.set(0.5);
    game.physics.p2.enable(fin);
    fin.body.setCircle(fin.width/2);
    fin.body.setCollisionGroup(finCollisionGroup);  
    fin.body.collides(playerCollisionGroup,hitFin,this);
  
    //Joueur
    player = game.add.sprite(200, 300, 'momo');
    game.physics.p2.enable(player,false);
    player.animations.add('immobile', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
    player.animations.add('mouvement', [34,35,36,37,38,42,43], 10, true);
    player.scale.set(0.6);
    player.body.setCircle(player.width/2);
    player.body.setCollisionGroup(playerCollisionGroup);    
    player.body.collides([virusCollisionGroup,ennemyBulletCollisionGroup],hitPlayer, this);
    player.body.collides([powerUpAllieCollisionGroup,noyauCollisionGroup]);
    player.body.collides([finCollisionGroup,murCollisionGroup]);
    player.dash_en_cours = false;
    player.vitesse_max = 800;
    player.vitesse_actuel = 800;
    player.distance_dash = 15;
    player.distance_parcouru = 0;
    player.cd_dash = 0;
    player.vie_max = 100;
    player.vie  = 100;
    player.environnement = 'rien';
    player.animations.play('immobile');
    player.buff = [];
    player.score = 0;
    game.camera.follow(player);
    //vie
    vie_momo = game.add.sprite(10,game.camera.height-player.height-50,'hp_momo');
    vie_momo.frame = 31;
    vie_momo.fixedToCamera = true;
    //bullet a nous
    bullets_player = game.add.group();
    bullets_player.enableBody = true;
    bullets_player.physicsBodyType = Phaser.Physics.P2JS;
    bullets_player.createMultiple(30, 'bullet_players');
    firebutton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    pausebutton = game.input.keyboard.addKey(Phaser.Keyboard.A);
}

function update() {
    if (player.alive && !fin_jeu) {
        move_momo();
        virus.forEachAlive(move_virus,this);
        vie();
        bullets_player.forEachAlive(verif_camera,this);
        enemyBullets.forEachAlive(verif_camera,this);
        allie.forEachAlive(collision_allie,this);
        allie.forEachAlive(mort_cellule,this);
        capacite(player.cellule);
        powerUps.forEachAlive(rotate_powerUp,this);
        if (game.time.now > firingTimer){
            tir_virus();
        }
    }else if (fin_jeu) {
        game.debug.text('U win !',50,100);
    }else{
        game.debug.text('T\'es mort',50,100);
    }
}

function generatePowerUp(x,y,type,nombre){
    for (var i = 0; i < nombre; i++) {
        var type_possible = ['immune','regen'];
        var img = ['immune','regen'];
        var powerUp = powerUps.create(x,y,'powerUp');
        game.physics.p2.enable(powerUp);
        powerUp.animations.add('immobile_power', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
        powerUp.scale.set(1);
        powerUp.body.fixedRotation = true;
        powerUp.body.setCollisionGroup(powerUpAllieCollisionGroup);
        powerUp.body.collides(playerCollisionGroup,hitPowerUp,this);
        powerUp.type= type_possible[type];    
    }
}
function generateAllie(x,y,type,nombre){
    for (var i = 0; i < nombre; i++){
        var type_possible =['regen','tir'];
        var img = ['cellule_regen','lymphocyteb'];
        var news = allie.create(x,y,img[type]);
        game.physics.p2.enable(news,false);
        news.viemax = 100;
        news.vie = news.viemax;
        if (type_possible[type] == 'regen') {
            news.animations.add('immobile_allie',[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
        }else if(type_possible[type] == 'tir'){
            news.animations.add('immobile_allie',[0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
        }
        news.animations.play('immobile_allie');   
        news.scale.set(2.5);
        news.body.fixedRotation = true;
        news.body.setCircle(news.width/2);
        news.body.setCollisionGroup(celluleAllieCollisionGroup);
        news.body.collides([virusCollisionGroup,ennemyBulletCollisionGroup],hitAllie,this);
        news.body.collides(celluleAllieCollisionGroup,hitMur,this);
        news.width_max = news.width;
        news.height_max = news.height;
        news.type= type_possible[type];
        news.noyau = generateNoyau(x,y);
    }
}
function generateNoyau(x,y){
    var noyau = noyaux.create(x+20,y,'cellule_noyau');
    game.physics.p2.enable(noyau,false);
    noyau.x_ini = x+20;
    noyau.y_ini = y;
    noyau.scale.set(0.4);
    noyau.body.fixedRotation = true;        
    noyau.animations.add('immobile_noyau', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
    noyau.animations.play('immobile_noyau');   
    noyau.body.setCircle(noyau.width/2);
    noyau.body.setCollisionGroup(noyauCollisionGroup);
    noyau.body.collides(playerCollisionGroup,hitNoyau,this);
    noyau.body.kinematic = true;
    return noyau;
}
function generateVirus(x,y,type,nombre){
    for (var i = 0; i < nombre;i++) {
        var img = ['virus','cancer'];
        var news = virus.create(x,y,img[type]); 
        game.physics.p2.enable(virus,false);
        news.vitesse = game.rnd.integerInRange(90, 150);
        news.body.setCircle(news.width/2);
        news.body.setCollisionGroup(virusCollisionGroup);
        //Collision collision virus/virus et virus/joueur
        news.body.collides(playerBulletCollisionGroup,hitPlayer,this);
        news.body.collides(murCollisionGroup,hitMur_Bullet,this);
        news.body.collides([celluleAllieCollisionGroup,playerCollisionGroup]);
        var type_virus = ['kamikaze','tireur'];
        news.type = type_virus[type];
        if(news.type == 'kamikaze'){
            news.vitesse = game.rnd.integerInRange(150,200)
            news.animations.add('immobile_virus', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
        } else if(news.type=='tireur'){
            news.vitesse = 0;
            news.animations.add('immobile_virus', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
            news.scale.set(2.5);
        }
        news.animations.play('immobile_virus');
    } 
}
function tir_virus() {
 
    enemyBullet = enemyBullets.getFirstExists(false);
 
    livingEnemies.length=0;
 
    virus.forEachAlive(function(virus){
     if(virus.type == 'tireur'&& Phaser.Math.distance(virus.x, virus.y, player.x, player.y) <= 500){
         livingEnemies.push(virus);
        };
    });
 
 
    if (enemyBullet && livingEnemies.length > 0)
    {
       
        var random=game.rnd.integerInRange(0,livingEnemies.length-1);
 
        var shooter=livingEnemies[random];
        enemyBullet.reset(shooter.body.x, shooter.body.y);
        enemyBullet.body.setCollisionGroup(ennemyBulletCollisionGroup);
        enemyBullet.body.collides([celluleAllieCollisionGroup, playerCollisionGroup]);
        enemyBullet.body.collides(playerBulletCollisionGroup,hitBullet,this);
        enemyBullet.body.collides(murCollisionGroup,hitMur_Bullet,this);
        enemyBullet.body.collideWorldBounds = false;
        enemyBullet.animations.add('tir_ennemi',[0,1,2,3,4,5,6,7,8,9,10,11],20,true);
        enemyBullet.animations.play('tir_ennemi');        
        game.physics.arcade.moveToObject(enemyBullet,player,200);
        firingTimer = game.time.now + 1500;
    } 
}
function tir_player(entite){
    if (firebutton.isDown) {
    //save des pos pointer
    click_bullet.x = game.input.activePointer.x + game.camera.x;
    click_bullet.y = game.input.activePointer.y + game.camera.y;
        if (game.time.now>bulletTime) {
                bullet = bullets_player.getFirstExists(false);
            if (bullet) {
                bullet.reset(entite.x,entite.y + 8);
                bullet.body.setCollisionGroup(playerBulletCollisionGroup);
                bullet.body.collides(virusCollisionGroup,hitVirus,this);
                bullet.body.collides(ennemyBulletCollisionGroup);
                bullet.body.collides(murCollisionGroup,hitMur_Bullet,this);
                bullet.body.collideWorldBounds = false;
                bullet.animations.add('tir_player',[0,1,2,3,4,5,6,7,8,9,10,11],20,true);
                bullet.animations.play('tir_player');
                bullet.angle = 90;
                mouvement_vers_objet(bullet,click_bullet,500);
                bulletTime = game.time.now+400;
                entite.vie-=15;
                taille_cellule(entite); 
                entite.body.setCircle(entite.width/2);
                entite.body.setCollisionGroup(celluleAllieCollisionGroup);
            }
        }
    }    
}
function collision_allie(body){
    if ((player.x>body.x-body.width/2&&(player.x<body.x+body.width/2))
    &&  (player.y>body.y-body.height/2&&(player.y<=body.y+body.height/2))){
        player.environnement=body.type;
        player.cellule = body;
        var indice = allie.children.indexOf(body);
        attraction(player,body);
        attraction(body.noyau,body);
        if (body.type=='regen') {
            body.vie-=0.5;
            taille_cellule(body); 
        }
    }else{
        if (body.type == 'regen'){            
            body.vie+=1;
            if (body.vie>body.viemax) {
                body.vie=body.viemax;
            }
            taille_cellule(body); 
        }
        repulsion(body.noyau,body);
    }
    mort_cellule(body);
    body.body.setCircle(body.width/2);
    body.body.setCollisionGroup(celluleAllieCollisionGroup);
}
function mort_cellule(allie){
    if (allie.width<=player.width+75) {
        allie.noyau.kill();
        allie.kill();
        player.environnement = 'rien';
    }
}    
function attraction(body,allie){
    if (body.x>allie.x){
        body.body.x-=1;
    }else if (body.x<allie.x){
        body.body.x+=1;
    }
    if (body.y>allie.y){
        body.body.y-=1;
    }else if (body.y<allie.y){
        body.body.y+=1;
    }
}
function repulsion(body,allie){
    if (body.x!= body.x_ini) {
        if (body.x>body.x_ini){
            body.body.x-=1;
        }else if (body.x<body.x_ini){
            body.body.x+=1;
        }
    }
    if (body.y!= body.y_ini) {
        if (body.y>body.y_ini){
            body.body.y-=1;
        }else if (body.y<body.y_ini){
            body.body.y+=1;
    }
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
        //save des pos pointer
        click.x = game.input.activePointer.positionDown.x + game.camera.x;
        click.y = game.input.activePointer.positionDown.y + game.camera.y;
        player.dash_en_cours = true;
        player.animations.play('mouvement');
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
//        player.vitesse_actuel = player.vitesse_max;
        if (player.cd_dash<=0) {
            player.cd_dash = 0;
        }
        player.animations.play('immobile');
  
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
    vie_momo.frame = Math.round((player.vie/player.vie_max)*30);
}
function move_virus(virus){
    mouvement_vers_objet(virus,player,virus.vitesse);
}

function mouvement_vers_objet(obj1, obj2, vitesse) {
    var angle = Math.atan2(obj2.y - obj1.y, obj2.x - obj1.x);
    if (obj1 == player) {
        obj1.body.rotation = angle;    
    }else{
        obj1.body.rotation = angle + game.math.degToRad(90);    
    }
    obj1.body.velocity.x = Math.cos(angle) * vitesse;
    obj1.body.velocity.y = Math.sin(angle) * vitesse;
    return angle;
}

function verif_camera(objet){
    if(objet.x<game.camera.x||objet.x>game.camera.x+game.camera.width){
       objet.kill();
    }
    if(objet.y<game.camera.y||objet.y>game.camera.y+game.camera.height){
       objet.kill();
    }
}

function taille_cellule(body){
    var taille = (body.vie/body.viemax)*2.5;
    body.scale.setTo(taille);
}

function rotate_powerUp(body){
    body.angle+=5;
}

function hitPlayer(body1,body2){
    var indice = player.buff.indexOf('immune');
    if (indice>=0) {
        player.buff.splice(indice,1);
    }else{
        body1.sprite.vie-=20;
    }
    body2.sprite.kill();
}

function hitVirus(body1,body2){
    body1.sprite.kill();
    body2.sprite.kill();
    player.score+=20;
}

function hitAllie(body1,body2) {
    body1.setZeroVelocity();
    body2.sprite.kill();
}

function hitPowerUp(body1,body2){
    body1.sprite.kill();
    if (body1.sprite.type == 'regen') {
        body2.sprite.vie +=20;
        if (body2.sprite.vie>100) {
            body2.sprite.vie = 100
        }
    }else{
        body2.sprite.buff.push(body1.sprite.type);
    }
}

function hitFin(body1,body2){
    fin_jeu = true;
    body1.setZeroVelocity();
    body2.setZeroVelocity();
}
function hitBullet(body1,body2){
    body1.sprite.kill();
    body2.sprite.kill();
}
function hitNoyau(body1,body2){
    body1.sprite.body.setZeroVelocity();
}
function hitMur(body1,body2){
    body1.sprite.body.setZeroVelocity();    
    body2.sprite.body.setZeroVelocity();
}
function hitMur_Bullet(body1,body2){
    body1.sprite.kill();
}