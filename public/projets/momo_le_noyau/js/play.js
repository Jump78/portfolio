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
var count = 0;
var playState = {
    create: function(){
        music.stop();
        music_mortVirus = game.add.audio('mortvirus');
        music_powerup=game.add.audio('son_powerUp');
        music_tir = game.add.audio('tir');
        ambiance = game.add.audio('ambiance');
        ambiance.loopFull();   
        fin_jeu = false;
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
        grpFond = game.add.group();
        fond1 = new Phaser.TileSprite(game,0, 0, game.world.width, game.world.height, 'fond');
        fond2 = new Phaser.TileSprite(game,0, 0, game.world.width, game.world.height, 'fond2');
        fond3 = new Phaser.TileSprite(game,0, 0, game.world.width, game.world.height, 'fond3');
        grpFond.add(fond1);
        grpFond.add(fond2);
        grpFond.add(fond3);
        game.world.add(grpFond);
        mur = game.add.sprite(game.world.centerX,game.world.centerY,'paroi');
        game.physics.p2.enable(mur, false);
        mur.body.clearShapes();
        mur.body.loadPolygon('physicsData','paroi');    
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
        generateAllie(325,300,0,1);
        generateAllie(775,275,1,1);
        generateAllie(1161,1342,1,1);
        generateAllie(1075,250,1,1);
        generateAllie(1350,250,0,1);
        generateAllie(501,824,1,1);
        generateAllie(467,1491,1,1);
        generateAllie(966,806,0,1);
        generateAllie(724,1292,1,1);
        generateAllie(1628,1263,0,1);

        //Ennemi
        virus = game.add.group();
        //generateVirus(480,510,1,1);
        generateVirus(1561,1741,0,1);
        generateVirus(1622,840,1,1);
        generateVirus(1790,244,1,1);
        generateVirus(1486,586,0,1);
        //generateVirus(540,250,1,1);
        generateVirus(1128,1484,1,1);
        generateVirus(1476,1715,1,1);
        generateVirus(1540,570,1,1);
        generateVirus(900,500,1,1);
        //generateVirus(800,650,0,1);
        generateVirus(1100,1000,1,1);
        generateVirus(752,1658,1,1);
        generateVirus(176,1914,0,1);
        generateVirus(272,978,1,1);
        generateVirus(790,1570,0,1);

        //Munitions ennemies
        enemyBullets = game.add.group();
        enemyBullets.enableBody = true;
        enemyBullets.physicsBodyType = Phaser.Physics.P2JS;
        enemyBullets.createMultiple(10, 'enemyBullet');

        //Power Up
        powerUps = game.add.group();
        generatePowerUp(1500,350,0,1);
        generatePowerUp(1731,974,0,1);
        generatePowerUp(231,1840,0,1);
        generatePowerUp(284,1442,0,1);
        generatePowerUp(721,642,0,1);
        generatePowerUp(673,1799,0,1);
        generatePowerUp(1152,1677,0,1);
        generatePowerUp(1347,727,0,1);
        generatePowerUp(464,1071,0,1);
        //Heal
        heals = game.add.group();
        for (var j = 0; j < 10; j++)
        {
            var heal = heals.create(0, 0, 'heal', [0], false);
            heal.anchor.setTo(0.5, 0.5);
            heal.scale.set(2);
            heal.animations.add('heal');
        } 
        //Immune
        imunes = game.add.group();
        for (var a = 0; a < 10; a++)
        {
            var imune = imunes.create(0, 0, 'imune', [0], false);
            imune.anchor.setTo(0.5, 0.5);
            imune.scale.set(1.3);
            imune.animations.add('imune');
        }        
        //Explosion
        explosions = game.add.group();
        for (var k = 0; k < 130; k++)
        {
            var explosionAnimation = explosions.create(0, 0, 'explosion', [0], false);
            explosionAnimation.anchor.setTo(0.5, 0.5);
            explosionAnimation.animations.add('explose');
        }        
        //fin
        fin = game.add.sprite(1800,1750,'fin');
        game.physics.p2.enable(fin);
        fin.body.setCircle(fin.width/2);
        fin.body.setCollisionGroup(finCollisionGroup);  
        fin.body.collides(playerCollisionGroup,hitFin,this);
        fin.scale.set(1);
        fin.animations.add('immobile_fin', [0,1,2,3,4,5,6,7,8,9,10,11,], 10, true);
        fin.animations.play('immobile_fin');
        fin.body.kinematic = true;
        //Joueur
        player = game.add.sprite(200, 300, 'momo');
        game.physics.p2.enable(player,false);
        player.animations.add('immobile', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
        player.animations.add('mouvement', [34,35,36,37,38,42,43], 10, true);
        player.animations.add('mort',[45,46,47,48,49,50,51,52,53,54,55],10,false);
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
        player.buff = '';
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
    },

    update: function(){
        if (player.alive && !fin_jeu) {
            if(player.vie>0) move_momo();
            virus.forEachAlive(move_virus,this);
            vie();
            bullets_player.forEachAlive(verif_camera,this);
            enemyBullets.forEachAlive(verif_camera,this);
            allie.forEachAlive(collision_allie,this);
            allie.forEachAlive(taille_cellule,this);
            allie.forEachAlive(mort_cellule,this);
            capacite(player.cellule);
            powerUps.forEachAlive(rotate_powerUp,this);
            count+=0.1;
            //Paralax  fond
            fond3.x = game.camera.x*0.7;
            fond2.x = game.camera.x*0.8;
            fond1.x = game.camera.x*0.9;
            if (game.time.now > firingTimer){
                tir_virus();
            }
        }else if (fin_jeu) {
            this.win();
        }
    },

    win: function(){
        game.state.start('win');
        music_mortVirus.stop();
        music_powerup.stop();
        music_tir.stop();
        ambiance.stop();    
    },

    loose: function(){
        game.state.start('loose');
        music_mortVirus.stop();
        music_powerup.stop();
        music_tir.stop();
        ambiance.stop(); 
    }
};    
function generatePowerUp(x,y,type,nombre){
    for (var i = 0; i < nombre; i++) {
        type = game.rnd.integerInRange(0,1);
        var type_possible = ['regen','immune'];
        //A donner a Clem
            powerUp = powerUps.create(x,y,'feedBack');
            if(type==0){
                powerUp.frame=0;
            } else {
                powerUp.frame=1;
            }
        game.physics.p2.enable(powerUp);
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
        if (type_possible[type] == 'regen') {
            news.rescale = 1.6;
            news.scale.set(news.rescale);
            news.animations.add('mort',[20,21,22,23,24,25,26,27,28],10,false);
            news.noyau = generateNoyau(x,y);
        }else if (type_possible[type] == 'tir'){
            news.viemax = game.rnd.integerInRange(100,200);
            news.rescale = 2.5;
            news.animations.add('mort',[15,16,17,18,19,20,21,22,23,24],10,false);
            news.scale.set(news.rescale);
        }
        news.vie = news.viemax;
        news.animations.add('immobile_allie',[0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
        news.animations.play('immobile_allie');   
        news.body.fixedRotation = true;
        news.body.setCollisionGroup(celluleAllieCollisionGroup);
        news.body.collides([virusCollisionGroup,ennemyBulletCollisionGroup],hitAllie,this);
        news.body.collides(celluleAllieCollisionGroup,hitMur,this);
        news.width_max = news.width;
        news.height_max = news.height;
        news.type= type_possible[type];
        news.hitbox = 2.7;
        news.body.setCircle(news.width/news.hitbox);
        news.body.kinematic = true;

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
        var n_virus = virus.create(x,y,img[type]); 
        game.physics.p2.enable(n_virus,false);
        n_virus.vitesse = game.rnd.integerInRange(90, 150);
        n_virus.body.setCircle(n_virus.width/2);
        n_virus.body.setCollisionGroup(virusCollisionGroup);
        //Collision collision virus/virus et virus/joueur
        n_virus.body.collides(playerCollisionGroup);
        n_virus.body.collides(murCollisionGroup,hitMur_Bullet,this);
        n_virus.body.collides([celluleAllieCollisionGroup,playerBulletCollisionGroup]);
        var type_virus = ['kamikaze','tireur'];
        n_virus.type = type_virus[type];
        if(n_virus.type == 'kamikaze'){
            n_virus.vitesse = game.rnd.integerInRange(150,200)
            n_virus.animations.add('immobile_virus', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23], 10, true);
            n_virus.animations.add('mort_virus', [30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51], 10, false);
        } else if(n_virus.type=='tireur'){
            n_virus.vitesse = 0;
            n_virus.animations.add('immobile_virus', [0,1,2,3,4,5,6,7,8,9,10,11], 10, true);
            n_virus.animations.add('mort_virus', [15,16,17,18,19,20,21,22,23,24,25,26], 10, false);
            n_virus.scale.set(2.5);
        }
        n_virus.animations.play('immobile_virus');
        n_virus.cle = 'virus';
        n_virus.tape = false;
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
        enemyBullet.tape = false;
        game.physics.arcade.moveToObject(enemyBullet,player,200);
        firingTimer = game.time.now + 1200;
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
                bullet.scale.set(0.7);
                mouvement_vers_objet(bullet,click_bullet,500);
                bulletTime = game.time.now+400;
                entite.vie-=20;
                entite.body.setCircle(entite.hitbox);
                entite.body.setCollisionGroup(celluleAllieCollisionGroup);
                music_tir.play();
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
        if (body.type=='regen') {
            attraction(body.noyau,body);
            body.vie-=0.5;
        }
    }else{
        if (body.type == 'regen'){            
            body.vie+=1.5;
            if (body.vie>body.viemax) {
                body.vie=body.viemax;
            }
            repulsion(body.noyau,body);
        }
    }
}

function mort_cellule(allie){
    if (allie.width<=player.width+75) {
        if (allie.type =='regen')  allie.noyau.kill();
        allie.animations.play('mort');
        allie.animations.currentAnim.onComplete.add(function(){
            allie.kill();
        });
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
            player.vie+=0.28;
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
    if (game.input.activePointer.leftButton.isDown && player.dash_en_cours == false && Date.now()>player.cd_dash+150) {
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
            player.cd_dash = Date.now();
            player.environnement = 'rien';
            player.animations.play('immobile');
        }
        //Si momo atteint les coordonnée du click, il se stop
        if ((player.x<click.x && click.x<player.x+(player.width*0.5))
        &&(player.y<click.y && click.y<player.y+(player.height*0.5))){
            player.dash_en_cours = false;
            player.cd_dash = Date.now();
            player.environnement = 'rien';
            player.animations.play('immobile');
        }  

        if (player.buff=='immune') {
            imune.x = player.x;
            imune.y = player.y;
        }  
    }else{
        player.distance_parcouru=0;
        player.body.setZeroVelocity();
        player.cd_dash--;
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
            player.animations.play('mort');
            player.animations.currentAnim.onComplete.add(function(){
                playState.loose();
                music_mortVirus.stop();
                music_powerup.stop();
                music_tir.stop();
                ambiance.stop(); 
            });  
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
    var taille = (body.vie/body.viemax)*body.rescale;
    body.scale.setTo(taille);
    body.body.setCircle(body.width/body.hitbox);
    body.body.setCollisionGroup(celluleAllieCollisionGroup);
}

function rotate_powerUp(body){
    body.angle+=5;
}

function hitPlayer(body1,body2){
    if (player.buff == 'immune') {
        player.buff = '';
        imune.kill();
    }else{
        body1.sprite.vie-=20;
    }
    body2.sprite.vitesse = 0;
    if (body2.sprite.cle == "virus") {
        body2.sprite.animations.play('mort_virus');
        body2.sprite.animations.currentAnim.onComplete.add(function(){
            body2.sprite.kill();
        });
    }else if(body2.sprite.key == "enemyBullet"){
        body2.sprite.kill();
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(body2.x, body2.y);
        explosionAnimation.play('explose', 12, false, true);
    }
;}

function hitVirus(body1,body2){
    body1.sprite.kill();
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(body1.x, body1.y);
    explosionAnimation.play('explose', 12, false, true);
    body2.sprite.animations.play('mort_virus');
    body2.sprite.animations.currentAnim.onComplete.add(function(){
        body2.sprite.kill();
    });
    music_mortVirus.play();
    player.score+=20;
}

function hitAllie(body1,body2) {
    if (body2.sprite.cle == "virus") {
        if (body2.sprite.tape == false) {
            body1.sprite.vie-=20;
            body2.sprite.tape = true;
        }
        body2.sprite.animations.play('mort_virus');
        body2.sprite.animations.currentAnim.onComplete.add(function(){
            body2.sprite.kill();
        });
    }else if(body2.sprite.key == "enemyBullet"){
        body2.sprite.kill();
        if (body2.sprite.tape == false) {
            body1.sprite.vie-=10;
            body2.sprite.tape = true;
        }
        var explosionAnimation = explosions.getFirstExists(false);
        explosionAnimation.reset(body2.x, body2.y);
        explosionAnimation.play('explose', 12, false, true);

    }
    body1.sprite.body.setZeroVelocity();
    body2.sprite.body.setZeroVelocity();
    taille_cellule(body1.sprite);
    mort_cellule(body1);
}

function hitPowerUp(body1,body2){
    music_powerup.play();
    body1.sprite.kill();
    if (body1.sprite.type == 'regen') {
        var heal = heals.getFirstExists(false);
        heal.reset(body1.x, body1.y);
        heal.play('heal', 13, false, true);
        body2.sprite.vie +=20;
        if (body2.sprite.vie>100) {
            body2.sprite.vie = 100
        }
    }else{
        if (typeof imune != 'undefined') {imune.kill()};
        body2.sprite.buff = 'immune';
        imune = imunes.getFirstExists(false);
        imune.reset(body1.x, body1.y);
        imune.play('imune', 10, true, false);
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
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(body1.x, body1.y);
    explosionAnimation.play('explose', 12, false, true);
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
    var explosionAnimation = explosions.getFirstExists(false);
    explosionAnimation.reset(body1.x, body1.y);
    explosionAnimation.play('explose', 12, false, true);
}