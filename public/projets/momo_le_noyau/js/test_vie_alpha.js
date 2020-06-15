var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
	game.load.spritesheet('momo', 'img/momo.png', 32, 32);	
}

function create() {
	//Physique, activation !
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.stage.backgroundColor = '#0072bc';
    //Joueur
    player = game.add.sprite(132, game.world.height - 150, 'momo');
    game.physics.p2.enable(player);
    player.animations.add('immobile', [0,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,,26,27,28,29,30,31,32,33,34,35,36,37,38,39], 10, true);
    player.scale.set(3);
    var circle = new Phaser.Circle(game.world.centerX, game.world.centerY, 500);
    var graphics = game.add.graphics(0, 0);
    graphics.lineStyle(3, 0x00ff00);
    graphics.drawCircle(player.x, player.y, player.width+20);
}    

var vie_momo = 100;
var vie_actuel_momo = 100;

function update() {
    player.animations.play('immobile');
    vie_actuel_momo --;
    if (vie_actuel_momo<=0) vie_actuel_momo = 0;
}
