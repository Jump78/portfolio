var game = new Phaser.Game(800, 600, Phaser.AUTO, 'divGame', { preload: preload, create: create, update: update });
var tweenPasser;
var menu = 'main';
var ancienMenu ='';	
var animMenuEnCours = false;
var etapeActuel = 1;
var sortEnCours = null;
var tablElement ={
	feu:{
		feu:1,
		eau:0.5,

	},
	eau:{
		feu:2,
		eau:1,
	},


};

tablElement.addElement = function(nom,params){
	var newElement = {};
	tablElement[nom] = newElement;
	var j = 0;
	for(var i in tablElement){
		if(i != 'addElement'){ 
			newElement[i]=params[j];
			tablElement[i][nom] = 1/params[j];
			j++;
		};
	}
}

tablElement.addElement('terre',[0.5,2,1]);

function preload() {
/*	game.load.spritesheet('perso','img/perso.png',64,64);
	game.load.spritesheet('ennemi','img/ennemi.png',64,64);
	game.load.spritesheet('brasier','img/fireball.png',14,10);
	game.load.spritesheet('lanceMontagne','img/019-Earth01.png',132,132);
	game.load.spritesheet('tsunami','img/tsunami.png',73,112);
	game.load.image('boutonHautGauche','img/boutonHautGauche.png');
	game.load.image('boutonHautDroit','img/boutonHautDroit.png');
	game.load.image('boutonBasGauche','img/boutonBasGauche.png');
	game.load.image('boutonBasDroit','img/boutonBasDroit.png');
	game.load.image('boutonCentre','img/boutonCentre.png');
	game.load.image('button','img/button.png');
	game.load.image('fondMenu','img/fondMenu.png');
	game.load.image('menu','img/menu.png');
	game.load.image('fondTexte','img/fondTexte.png');
	game.load.image('cave','img/043-Cave01.jpg');
	game.load.image('lifebar','img/lifebar.png');
	game.load.image('feu','img/flamer.png');
	game.load.image('terre','img/linden-leaf.png');
	game.load.image('eau','img/water-drop.png');
	game.load.image('particuleHeal','img/particuleHeal.png')
*/
	for(var donne in data.asset){
		if (donne == 'image') {
			for (var i = 0; i < data.asset[donne].length; i+=2) {
				game.load.image(data.asset[donne][i],data.asset[donne][i+1]);		
			}			
		}else if (donne == 'spritesheet'){
			for (var i = 0; i < data.asset[donne].length; i+=4) {
				game.load.spritesheet(data.asset[donne][i],data.asset[donne][i+1],data.asset[donne][i+2],data.asset[donne][i+3]);		
			}	
		}
	}
}

function create() {
	game.physics.startSystem(Phaser.Physics.ARCADE);
	//game.stage.backgroundColor = 0x005555;
	var fond= game.add.sprite(0,0,'cave');
	fond.width = game.camera.width;
	fond.height = game.camera.height;
	//objet
	var potion = new objet(data.objet.potion);
	//Sort
	brasier = new sort(data.sort.brasier);
	brasier.typeAnim = 'v';
	brasier.appliquerDebuff = function(entite){
		var nb = game.rnd.integerInRange(1,100);
		if (nb<=25){
			entite.buff.push(new buff('Brulure',7,2,'degat','feu',[entite.barreHp.x,entite.barreHp.y+entite.barreHp.height,'brulurImg'],entite));
			return '\n'+entite.nom+' subit brulure'
		}
		return ''
	}
	//brasier.img = game.add.sprite(-1000,0,'brasier');
	brasier.img.scale.set(4);
	game.physics.enable(brasier.img, Phaser.Physics.ARCADE);
	brasier.img.animations.add('anim',[0,1,2,3,4],10,true);
	
	tsunami = new sort(data.sort.tsunami);
	tsunami.typeAnim = 'h';
	tsunami.img.scale.set(3);
	tsunami.img.animations.add('anim',[0,1,2],10,true);
	game.physics.enable(tsunami.img, Phaser.Physics.ARCADE);
	
	var lanceMontagne = new sort(data.sort.lanceMontagne);
	lanceMontagne.typeAnim = 's';

	animMontagne=lanceMontagne.img.animations.add('anim',[0,1,2,3,4],5,false);
	animMontagne.onComplete.add(overlapHandler);
	game.physics.enable(lanceMontagne.img, Phaser.Physics.ARCADE);
	lanceMontagne.img.scale.set(1.3);

	var intimidation = new sort(data.sort.intimidation);
	intimidation.appliquerDebuff = function(entite){
		entite.buff.push(new buff('Intimidation',5,2,'defense',null,[entite.barreHp.x,entite.barreHp.y+entite.barreHp.height,'atkDown'],entite));
	}
	
	var faiblesse = new sort(data.sort.faiblesse);
	faiblesse.appliquerDebuff = function(entite){
		entite.buff.push(new buff('Faiblesse',5,2,'atk',null,[entite.barreHp.x,entite.barreHp.y+entite.barreHp.height,'defDown'],entite));
}
	
	var pansement = new sort(data.sort.pansement);

	//Effet
	effet = game.add.sprite(-100,0,'effet');
	effet.anchor.set(0.5);
	effet.scale.set(2.5);
	var animEffet = effet.animations.add('anim',[0,1,2,3,4,5],5,false);
	animEffet.onComplete.add(function(){
		tweenPasser.resume();
		autorisationEtape = true;
	});
	
	//Arme
	var comp = [brasier,lanceMontagne];
	new arme('Excalibure','50',comp,'feu');
	var comp = [tsunami,intimidation];
	new arme('Durandale','35',comp,'eau');
	var comp = [faiblesse,pansement];
	new arme('Belzebuth','50',comp,'eau');

	//ennemi
	ennemi = game.add.sprite(550,100, 'ennemi');
	ennemi.frame = 27;
	ennemi.nom ='Soldat';
	ennemi.hp_max = 100;
	ennemi.hp = 100;
	ennemi.defense = 25;
	ennemi.atk = 42;
	ennemi.tour = false;
	ennemi.objet = [liste_objet[0],liste_objet[0],liste_objet[0],liste_objet[0]];
	ennemi.buff = [];
	ennemi.arme = [liste_arme[0],liste_arme[2]];
	ennemi.armeEquipe = ennemi.arme[0];
	ennemi.element = ennemi.armeEquipe.element;
	ennemi.scale.set(1.9);

	ennemi.barreHpFond = game.add.sprite(ennemi.x-200,ennemi.y, 'lifebar');
	ennemi.barreHpFond.scale.set(0.6);
	ennemi.barreHp = new Phaser.Rectangle(ennemi.barreHpFond.x+8.5,ennemi.barreHpFond.y+10, (ennemi.hp*ennemi.barreHpFond.width/ennemi.hp_max) - (30*ennemi.barreHpFond.scale.x), 13);
	ennemi.couleurHp = '#00ffff'
	game.debug.geom(ennemi.barreHp,ennemi.couleurHp);

	ennemi.icone = game.add.sprite(ennemi.barreHpFond.x-40,ennemi.barreHpFond.y+2,ennemi.element);
	game.physics.enable(ennemi, Phaser.Physics.ARCADE);

	//Joueur
	perso = game.add.sprite(100,250, 'perso');
	perso.scale.set(3);
	perso.frame = 0;
	perso.nom = 'Alzer';
	perso.tour = true;
	perso.hp_max = 100;
	perso.hp = 100;
	perso.defense = 33;
	perso.atk = 35;
	perso.buff = [];
	perso.arme = [liste_arme[0],liste_arme[2],liste_arme[1]];
	perso.armeEquipe = perso.arme[0];
	perso.objet = [liste_objet[0],liste_objet[0],liste_objet[0],liste_objet[0]];
	perso.element = perso.armeEquipe.element;
	
	perso.barreHpFond = game.add.sprite((perso.x+perso.width)-20,perso.y+35, 'lifebar');
	perso.barreHpFond.scale.set(0.8);
	perso.barreHp = new Phaser.Rectangle(perso.barreHpFond.x+11,perso.barreHpFond.y+13, ((perso.hp*perso.barreHpFond.width/perso.hp_max) - (30*perso.barreHpFond.scale.x)), 17);
	perso.couleurHp = '#00ffff'
	game.debug.geom(perso.barreHp,perso.couleurHp);
	
	perso.icone = game.add.sprite(perso.barreHpFond.x+perso.barreHpFond.width+10,perso.barreHpFond.y+7,perso.element);
	game.physics.enable(perso, Phaser.Physics.ARCADE);	
	
	var fondX = 25;
	var fondY = 900;
	//Bouton
	boutonGRP = game.add.group();
	textMenuGrp = game.add.group();

	boutonX = fondX+400;
	boutonY = fondY+95;
	var fondMenu = game.add.sprite(fondX, fondY, 'fondMenu');
	boutonGRP.add(fondMenu);
	//fondMenu.anchor.set(0.5,0);

	boutonHautGauche = game.add.button(boutonX-20, boutonY, 'boutonHautGauche', clickBoutonHautGauche);
	boutonHautGauche.anchor.set(1);
	boutonHautGauche.id = 0;
	boutonGRP.add(boutonHautGauche);
	
	textHautGauche = game.add.text(centrerDans(boutonHautGauche,'w')-380,centrerDans(boutonHautGauche,'h')-93,'Attaquer',{font: "32px Arial",fill: "#ff0000"});
	textHautGauche.anchor.set(0.5);
	textMenuGrp.add(textHautGauche);
	
	boutonHautDroit = game.add.button(boutonX, boutonY, 'boutonHautDroit', clickBoutonHautDroit);
	boutonHautDroit.id = 1;
	boutonHautDroit.anchor.set(0,1);
	boutonGRP.add(boutonHautDroit);
	
	textHautDroit = game.add.text(centrerDans(boutonHautDroit,'w'),centrerDans(boutonHautDroit,'h')-93,'Changer',{font: "32px Arial",fill: "#ff0000"});
	textHautDroit.anchor.set(0.5);
	textMenuGrp.add(textHautDroit);

	boutonBasGauche = game.add.button(boutonX-20, boutonY+100, 'boutonBasGauche', clickBoutonBasGauche);
	boutonBasGauche.id = 2;
	boutonBasGauche.anchor.set(1);
	boutonGRP.add(boutonBasGauche);
	
	textBasGauche = game.add.text(centrerDans(boutonBasGauche,'w')-380,centrerDans(boutonBasGauche,'h')-93,'Objet',{font: "32px Arial",fill: "#ff0000"});
	textBasGauche.anchor.set(0.5);
	textMenuGrp.add(textBasGauche);

	boutonBasDroit = game.add.button(boutonX, boutonY+100, 'boutonBasDroit', clickBoutonBasDroit);
	boutonBasDroit.id = 3;
	boutonBasDroit.anchor.set(0,1);
	boutonGRP.add(boutonBasDroit);
	
	textBasDroit = game.add.text(centrerDans(boutonBasDroit,'w'),centrerDans(boutonBasDroit,'h')-93,'Fuite',{font: "32px Arial",fill: "#ff0000"});
	textBasDroit.anchor.set(0.5);
	textMenuGrp.add(textBasDroit);

	boutonRetour = game.add.button(fondX+330,fondY+15, 'boutonCentre', retourArriere);
	boutonGRP.add(boutonRetour);
	
	textCentre = game.add.text(centrerDans(boutonRetour,'w'),centrerDans(boutonRetour,'h'),'Retour',{font: "32px Arial",fill: "#ff0000"});
	textCentre.anchor.set(0.5);
	textMenuGrp.add(textCentre);

	borneDroitX = boutonBasDroit.x+50;
	borneGaucheX = boutonBasGauche.x-50;

	//Zone texte
	fondTexte = game.add.sprite(boutonHautGauche.x+30,game.world.height-150,'fondTexte');
	fondTexte.height = 100;
	fondTexte.width = 350;
	fondTexte.x_original = fondTexte.x;
	fondTexte.y_original = fondTexte.y;
	iconeDescription=game.add.sprite(0,0,'');
	
	var style = {font:'20px Arial', fill: '#fff'};
	textEvenement = game.add.text(fondTexte.x+70,fondTexte.y+35,'Que voulez-vous faire ?',style);
	textEvenement.x_original = textEvenement.x;
	textEvenement.y_original = textEvenement.y;
	//textEvenement.anchor.set(0.5);
	boutonGRP.scale.set(0.5);
	textMenuGrp.scale.set(0.5);

	passedKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
	autorisationEtape = false;
	
	textPasser = game.add.text((fondTexte.x+fondTexte.width)-275,(fondTexte.y+fondTexte.height)-40,'Appuyer sur W pour continuer',style);
	textPasser.alpha=0;
	tweenPasser = game.add.tween(textPasser).to({ alpha: 1 }, 300, "Linear", true, 0, -1);
	tweenPasser.yoyo(true, 1000);
	tweenPasser.pause();

} 

function update() {
	animationMenu();
	if (passedKey.isDown) {
		if(typeof tinTween !== 'undefined' )tinTween.stop();
		etapeSuivante();
		perso.tint = 16777215;	
		ennemi.tint = 16777215;	
		tweenPasser.pause();
		textPasser.alpha=0;
	}
	if (sortEnCours == null || typeof sortEnCours.img === 'undefined') return
	if (sortEnCours.typeAnim=='h' & sortEnCours.img.x>game.camera.width) {
		overlapHandler(sortEnCours.img,sortEnCours.img.cible);
	}
	//Check des overlaps

	if (sortEnCours.typeAnim == 'v') {
		if (sortEnCours.img.rotation>0){
			game.physics.arcade.overlap(sortEnCours.img, ennemi, overlapHandler, null, this);
		}else
			game.physics.arcade.overlap(sortEnCours.img, perso, overlapHandler, null, this);		
	}
}
function overlapHandler(sprite1,sprite2){
	if (typeof sprite2.barreHp === 'undefined') majHp(sprite1.cible);
	else majHp(sprite2);
	tweenPasser.resume();
	sprite1.animations.stop();
	sprite1.x= 0-sprite1.width;
	sprite1.body.velocity.x = 0;
	sprite1.body.velocity.y = 0;
	tinTween=tweenTint(sprite1.cible,sprite1.cible.tint,0xFF0000,350,1500);
	autorisationEtape = true;
}
function majHp(obj){
	if (obj.hp>=obj.hp_max) obj.hp = obj.hp_max;
	obj.barreHp.width = (obj.hp*(obj.barreHpFond.width - (30*obj.barreHpFond.scale.x))/obj.hp_max);		
	if ((obj.hp/obj.hp_max)*100<35) {
		obj.couleurHp = '#FF0000';
	}else if((obj.hp/obj.hp_max)*100<50) {
		obj.couleurHp = '#FFA500';
	}else{
		obj.couleurHp = '#00ffff';
	}
	if (obj.hp<=0) {
		obj.kill();
		obj.hp=0;
		obj.barreHp.width = 0;	
		afficherMessageEvent(obj.nom+' est mort !');
	}	
	game.debug.geom(obj.barreHp,obj.couleurHp);
	if (obj == ennemi) game.debug.geom(perso.barreHp,perso.couleurHp);
	else game.debug.geom(ennemi.barreHp,ennemi.couleurHp);
}

function centrerDans(obj,option){
	if (option == 'w') {
		return (obj.x+obj.width/2);
	}else if (option == 'h'){
		return (obj.y+obj.height/2);
	}
}

function tourDeTable(etape){
	switch(etape){
		case 0:
			checkBuff(perso);
			perso.tour = true;
			retourArriere();
		break;
		case 1:
			fondTexte.width = 350;
			fondTexte.x = fondTexte.x_original;
			textEvenement.x = textEvenement.x_original;
			textEvenement.y = textEvenement.y_original;
			boutonGRP.visible = true;
			textMenuGrp.visible = true;
			perso.tour = true;
		break;
		case 2:
			checkBuff(ennemi);
			ennemi.tour = true;
		break;
		case 3:
			tourEnnemi();
		break;
		
		default:
		break;
	}
	return etape;

}
function etapeSuivante(){
	if (autorisationEtape != true) return;
	autorisationEtape = false;
	etapeActuel++;
	if (etapeActuel>3) 	etapeActuel  = 0;
	tourDeTable(etapeActuel);
}
function tourEnnemi(){
	if (!ennemi.alive){
		nouvelleEnnemi();
		etapeSuivante();
	 return;}

	var pourcentageHp = ennemi.hp_max* 30/100;
	var index=game.rnd.integerInRange(1,100);
	var msg = '';
	var chanceObjet = 10;
	var chanceAtk = 80;

	if (ennemi.hp<= pourcentageHp){
		chanceObjet = 43;
		chanceAtk = 90;
	}

	if (ennemi.objet.length == 0 || ennemi.hp> ennemi.hp_max-30) chanceObjet = 0;

	if (index<=chanceObjet) { //Utilsation d'un objet
		var indexObjet = game.rnd.integerInRange(0,ennemi.objet.length-1);
		msg = ennemi.nom+' utilise '+ ennemi.objet[indexObjet].nom;
		utiliserObjet(ennemi,ennemi.objet[indexObjet]);

	}else if (index>chanceObjet && index<=chanceAtk){ // Attaque
	var indexAtk = game.rnd.integerInRange(0,ennemi.armeEquipe.competence.length-1);
		for (var i = 0; i < ennemi.armeEquipe.competence.length;i++) {
			if (ennemi.armeEquipe.competence[i].element =='soin') {
				console.log('heal trouver');
				var indexHeal = game.rnd.integerInRange(1,100);
				if (ennemi.hp/ennemi.hp_max>=0.5) indexHeal = 36;
				if (indexHeal <= 35) indexAtk = i;
				break;
			}
		}
		msg = ennemi.nom+' utilise '+ennemi.armeEquipe.competence[indexAtk].nom;
		animationSort(ennemi,perso,ennemi.armeEquipe.competence[indexAtk]);
		msg+=attaque(ennemi,perso,ennemi.armeEquipe.competence[indexAtk]);
	}else{ //Changer d'arme
	var indexChange = game.rnd.integerInRange(0,ennemi.arme.length-1);
		if (ennemi.armeEquipe != ennemi.arme[indexChange]){
			msg = changerArme(ennemi,indexChange);
		}else{
			tourEnnemi();
			return
		}
	}
	ennemi.tour = false;
	afficherMessageEvent(msg);
}
function tourJoueur(nb){
	if (perso.alive && ennemi.alive && perso.tour == true) {
		var fonction = [menuAtk,menuChanger,menuObjet,fuite]
		switch (menu){
			case 'main':
				fonction[nb]();
			break;
			default:
				var msg = 'Vous utilisez ';
				switch(menu){
					case 'atk':
						if (typeof perso.armeEquipe.competence[nb] === 'undefined') return;
						msg+=perso.armeEquipe.competence[nb].nom;
						animationSort(perso,ennemi,perso.armeEquipe.competence[nb]);
						msg+=attaque(perso,ennemi,perso.armeEquipe.competence[nb]);
					break;
					case 'changer':
						msg = changerArme(perso,nb);
					break;
					case 'objet':
						msg+=perso.objet[nb].nom;
						utiliserObjet(perso,perso.objet[nb]);
					break;
				}
				retourArriere();
				afficherMessageEvent(msg);
				perso.tour = false;		
				boutonGRP.visible = false;
				textMenuGrp.visible = false;
				fondTexte.width = game.camera.width;
				fondTexte.x = 0;
				textEvenement.anchor.set(0,0);
				textEvenement.x = fondTexte.x+50;
				textEvenement.y = fondTexte.y+10;
			break;
		}
	}
}

function changerArme(user,nb){
	if (typeof  user.arme[nb] === 'undefined') return;
	var img = game.add.sprite(centrerDans(user,'w'),centrerDans(user,'h'),'changerarme');
	img.anchor.set(0.5);
	img.scale.x = user.scale.x/2;
	img.scale.y = user.scale.y/2;
	var anim = img.animations.add('changer',[0,1,2,3,4,5,6,7,8,9,10,12,13,14],10,false);
	img.play('changer');
	anim.onComplete.add(function () {
		autorisationEtape = true;
		tweenPasser.resume();
	})
	user.armeEquipe = user.arme[nb];
	user.element = user.armeEquipe.element;
	user.icone.loadTexture(user.element);
	return user.nom+' s\'équipe de '+user.arme[nb].nom;
}

function clickBoutonHautGauche() {
	tourJoueur(0);
}

function clickBoutonHautDroit() {	
	tourJoueur(1);
}

function clickBoutonBasGauche() {
	tourJoueur(2);
}

function clickBoutonBasDroit() {
	tourJoueur(3)
}

function retourArriere() {
	if (animMenuEnCours == true) return;
	ancienMenu = menu;
	menu = 'main';
	textEvenement.x = textEvenement.x_original
	textEvenement.y = textEvenement.y_original
	textEvenement.text 	 = 'Que voulez-vous faire ?';
	
	iconeDescription.kill();
	
	textHautGauche.text = 'Attaquer';
	boutonHautGauche.onInputOver.remove(showDetail,boutonHautGauche.id);

	textHautDroit.text = 'Changer';
	boutonHautDroit.onInputOver.remove(showDetail,boutonHautDroit.id);
	
	textBasGauche.text = 'Objet';
	boutonBasGauche.onInputOver.remove(showDetail,boutonBasGauche.id);
	
	textBasDroit.text = 'Fuite';
	boutonBasDroit.onInputOver.remove(showDetail,boutonBasDroit.id);

}
function menuAtk() {
	menu = 'atk';
	var texte = '';
	textEvenement.text = 'Quelle compétence utiliser ?';
	textHautGauche.text = perso.armeEquipe.competence[0].nom;
	
	if (perso.armeEquipe.competence.length >= 2)texte = perso.armeEquipe.competence[1].nom;
	textHautDroit.text = texte;
	texte ='';
	boutonHautDroit.onInputOver.add(showDetail,boutonHautDroit.id)
	
	if (perso.armeEquipe.competence.length>= 3) texte = perso.armeEquipe.competence[2].nom;
	textBasGauche.text = texte;
	texte ='';
	boutonBasGauche.onInputOver.add(showDetail,boutonHautDroit.id)
	
	if (perso.armeEquipe.competence.length>= 4) texte = perso.armeEquipe.competence[3].nom;
	textBasDroit.text = texte;
	texte ='';
	boutonBasDroit.onInputOver.add(showDetail,boutonHautDroit.id)
}


function menuChanger() {
	menu = 'changer';
	var texte = '';

	textEvenement.text = 'Quelle arme prendre ?';
	textHautGauche.text = perso.arme[0].nom;
	texte ='';
	if (perso.arme.length>=2) texte = perso.arme[1].nom;
	textHautDroit.text = texte
	texte ='';
	if (perso.arme.length>=3) texte = perso.arme[2].nom;
	textBasGauche.text = texte;
	texte ='';
	if (perso.arme.length>=4) texte = perso.arme[3].nom;
	textBasDroit.text = texte;
	texte ='';
}

function menuObjet() {
	menu = 'objet';
	var texte = '';
	textEvenement.text = 'Quel objet consommé ?';
	if (perso.objet.length >=1) texte = perso.objet[0].nom;
	textHautGauche.text = texte;
	texte ='';
	if (perso.objet.length>=2) texte = perso.objet[1].nom;
	textHautDroit.text = texte
	texte ='';
	if (perso.objet.length>=3) texte = perso.objet[2].nom;
	textBasGauche.text = texte;
	texte ='';
	if (perso.objet.length>=4) texte = perso.objet[3].nom;
	textBasDroit.text = texte;
	texte ='';
}


function fuite(){
	console.log('fuite');
}

function attaque(attaquant,defenseur,sort){
	var msg = '';
	switch (sort.element){
		case 'soin':
			var multipicateur = Math.random();
			while(multipicateur<0.85){
				multipicateur = Math.random();  
			}
			var soin = ((attaquant.atk*0.07)*(attaquant.armeEquipe.puissance*sort.puissance/100))*multipicateur;
			attaquant.hp+=soin;
			if (attaquant.hp>attaquant.hp_max) attaquant.hp = attaquant.hp_max;
			majHp(attaquant);
			break;
		case null:
			if (sort.appliquerDebuff){
				sort.appliquerDebuff(defenseur);
			}
		break;	
		default:
			sortEnCours = sort;
			msg = '\n'+attaquant.nom+' inflige ';
			var multipicateur = Math.random();
			while(multipicateur<0.85){
				multipicateur = Math.random();  
			}
			if (typeof checkElement(sort.element,defenseur.element) !== 'undefined') {				
				if (checkElement(sort.element,defenseur.element)>1)  msg +='énormément de degat !';
				else if(checkElement(sort.element,defenseur.element)<1) msg +='peu de degat ...';
				else msg ='';
				multipicateur*=checkElement(sort.element,defenseur.element);
			}
			else console.log('Un element na pas été trouvé');
			var degat = (attaquant.atk*(attaquant.armeEquipe.puissance*sort.puissance/100))/(defenseur.defense*0.65)*multipicateur;
			defenseur.hp-=degat;
			if (sort.appliquerDebuff){
				msg+=sort.appliquerDebuff(defenseur);
			}
			//console.log('attaquant : '+attaquant.nom,'Sort: '+ sort.nom,'Hp du def: '+defenseur.hp,'Degat: '+degat);
		break;
	}
	return msg;
}

function utiliserObjet(user,obj){
	switch (obj.type){
		case 'soin':
			effet.tint = 0x00FF00;
			animParticule(user);
			user.hp+= obj.puissance;
			if (user.hp>user.hp_max) user.hp = user.hp_max;
		break;
	}
	majHp(user);
	tweenPasser.resume();
	var index = user.objet.indexOf(obj);
	user.objet.splice(index,1);
}

function animParticule(cible){
/*	emitter = game.add.emitter(centrerDans(user,'w'), user.y+user.height-25, 100);
  	emitter.makeParticles('particuleHeal');
	emitter.setAlpha(0.1, 1);
	emitter.setScale(0.5, 1);
	emitter.gravity = -200;			
   	emitter.start(true, 1000, null, 20);
   	game.time.events.add(1000, etapeSuivante);*/
   	effet.x = centrerDans(cible,'w');
   	effet.y = centrerDans(cible,'h');
   	effet.bringToTop();
   	effet.animations.play('anim');
}

function animationMenuAtk(nb){
	animMenuEnCours = true;
	if (nb>0) {
		var arg1 = boutonBasDroit.angle;
		var arg2 = 15;
	}else{
		var arg1 = 0;
		var arg2 = boutonBasDroit.angle;
	}

	if (arg1<arg2) {
		textBasDroit.angle+=1*nb;
		textBasDroit.y+=3*nb;
		textBasDroit.x+=2*nb;
		boutonBasDroit.angle+=1*nb;
		boutonBasDroit.x+=2*nb;
	}else{
		ancienMenu='';
		animMenuEnCours = false;
	}

	if (nb>0) {
		var arg1 = boutonHautGauche.angle;
	}else{
		var arg2 = boutonHautGauche.angle;
	}
	
	if (arg1<arg2) {
		textHautGauche.angle+=1*nb;
		textHautGauche.y-=3*nb;
		boutonHautGauche.angle+=1*nb;
		boutonHautGauche.x-=2*nb;
	}	

	if (nb>0) {
		var arg1 = boutonBasGauche.angle;
	}else{
		var arg2 = boutonBasGauche.angle;
	}	

	if (arg1> -arg2*nb) {
		textBasGauche.angle-=1*nb;
		textBasGauche.y+=3*nb;
		textBasGauche.x-=2*nb;
		boutonBasGauche.angle-=1*nb;
		boutonBasGauche.x-=2*nb;
	}

	if (nb>0) {
		var arg1 = boutonHautDroit.angle;
	}else{
		var arg2 = boutonHautDroit.angle;
	}

	if (arg1> -arg2*nb) {
		textHautDroit.angle-=1*nb;
		textHautDroit.y-=3*nb;
		boutonHautDroit.angle-=1*nb;
		boutonHautDroit.x+=2*nb;
	}
}
function animationChanger(nb){
	animMenuEnCours = true;
	if (nb>0) {
		var arg1 = boutonBasDroit.angle;
		var arg2 = 30;
	}else{
		var arg1 = 0;
		var arg2 = boutonBasDroit.angle;
	}

	if (arg1> -arg2*nb) {
		boutonBasDroit.x-=0.5*nb;
		boutonBasDroit.y+=4*nb;
		boutonBasDroit.angle-=1*nb;
		textBasDroit.x-=1.5*nb;
		textBasDroit.y+=1.25*nb;
		textBasDroit.angle-=1*nb;
	}else{
		ancienMenu='';
		animMenuEnCours = false;
	}

	if (nb>0) {
		var arg1 = boutonHautGauche.angle;
	}else{
		var arg2 = boutonHautGauche.angle;
	}

	if (arg1> -arg2*nb) {
		textHautGauche.x+=1.75*nb;
		textHautGauche.y-=2.3*nb;
		textHautGauche.angle-=1*nb;
		boutonHautGauche.x+=1.6*nb;
		boutonHautGauche.y-=6*nb;
		boutonHautGauche.angle-=1*nb;
	}

	if (nb>0) {
		var arg1 = boutonBasGauche.angle;
	}else{
		var arg2 = boutonBasGauche.angle;
	}

	if (arg1< arg2) {
		textBasGauche.x+=1.5*nb;
		textBasGauche.y+=1.25*nb;
		textBasGauche.angle+=1*nb;
		//boutonBasGauche.x+=0.25*nb;
		boutonBasGauche.y+=4*nb;
		boutonBasGauche.angle+=1*nb;

	}
	if (nb>0) {
		var arg1 = boutonHautDroit.angle;
	}else{
		var arg2 = boutonHautDroit.angle;
	}

	if (arg1< arg2) {
		textHautDroit.x-=2*nb;
		textHautDroit.y-=2.5*nb;
		textHautDroit.angle+=1*nb;
		boutonHautDroit.x-=2*nb;
		boutonHautDroit.y-=6*nb;
		boutonHautDroit.angle+=1*nb;
	}
}

function animationObjet(nb) {
	animMenuEnCours = true;
	if (nb>0) {
		if (boutonBasDroit.x<borneDroitX) {
			boutonBasDroit.x+=5;
			boutonBasDroit.y+=2;
			textBasDroit.x+=5;	
			textBasDroit.y+=2;	
		}
		if (boutonHautDroit.x<borneDroitX) {
			boutonHautDroit.x+=5;
			boutonHautDroit.y-=2;
			textHautDroit.x+=5;	
			textHautDroit.y-=2;	
		}
		if (boutonHautGauche.x>borneGaucheX) {
			boutonHautGauche.x-=5;
			boutonHautGauche.y-=2;
			textHautGauche.x-=5;	
			textHautGauche.y-=2;	
		}
		if (boutonBasGauche.x>borneGaucheX) {
			boutonBasGauche.x-=5;
			boutonBasGauche.y+=2;
			textBasGauche.x-=5;	
			textBasGauche.y+=2;	
		}else{
			ancienMenu='';
			animMenuEnCours = false;
		}
	}

	if (nb<0) {
		if(boutonBasDroit.x>borneDroitX-50){
			boutonBasDroit.x-=5;
			boutonBasDroit.y-=2;
			textBasDroit.x-=5;	
			textBasDroit.y-=2;		
		}
		if(boutonHautDroit.x>borneDroitX-50){
			boutonHautDroit.x-=5;
			boutonHautDroit.y+=2;
			textHautDroit.x-=5;	
			textHautDroit.y+=2;	
		}
		if(boutonHautGauche.x<borneGaucheX+50){
			boutonHautGauche.x+=5;
			boutonHautGauche.y+=2;
			textHautGauche.x+=5;	
			textHautGauche.y+=2;	
		}
		if(boutonBasGauche.x<borneGaucheX+50){
			boutonBasGauche.x+=5;
			boutonBasGauche.y-=2;
			textBasGauche.x+=5;	
			textBasGauche.y-=2;
		}else{
			ancienMenu='';
			animMenuEnCours = false;
		}
	}
}

function animationMenu(){
	boutonHautGauche.onInputOver.add(showDetail,boutonHautDroit);
	boutonHautDroit.onInputOver.add(showDetail,boutonHautDroit);
	boutonBasGauche.onInputOver.add(showDetail,boutonHautDroit);
	boutonBasDroit.onInputOver.add(showDetail,boutonHautDroit);
	switch(menu){
		case 'atk':
			animationMenuAtk(1);
		break;
		case 'changer':
			animationChanger(1);
		break;	
		case 'objet':
			animationObjet(1);
		break;
		case 'main':
			switch(ancienMenu){
				case 'atk':
					animationMenuAtk(-1);
				break;
				case 'changer':
					animationChanger(-1);
				break;
				case 'objet':
					animationObjet(-1);
				break;				
				default:

				break;	
			}
		break;
		default: 
		break;
	}
}

function afficherMessageEvent(msg,option){
	if (option=='rajout') {
		textEvenement.text+= msg;
		return
	}
	textEvenement.text= msg;
}

function checkBuff(entite){
	if (entite.buff.length<=0) {
		autorisationEtape = true;
		return;
	}
	for (var i = 0; i < entite.buff.length; i++) {
		switch(entite.buff[i].type){
			case 'degat':
				var degat = entite.buff[i].puissance*checkElement(entite.buff[i].element,entite.element);
				entite.hp-= degat;
				majHp(entite);
			break;

			case 'atk':
				if (entite.buff[i].used == false) {
					entite.atk-= entite.buff[i].puissance;
					entite.buff[i].used = true;				
					afficherMessageEvent('Attaque de '+entite.nom+' baisse !');
				}
			break;
			
			case 'defense':
				if (entite.buff[i].used == false) {
					entite.defense-= entite.buff[i].puissance;
					entite.buff[i].used = true;	
					afficherMessageEvent('Defense de '+entite.nom+' baisse !');
				}
			break;
			
		}
		entite.buff[i].tour--;
		if (entite.buff[i].tour<=0){
			switch(entite.buff[i].type){
				case 'atk':
					entite.atk+= entite.buff[i].puissance;
					
				break;
				case 'defense':
					entite.defense+= entite.buff[i].puissance;
				break;
				default:
				break;
			}
		entite.buff[i].img.kill();
		entite.buff.splice(i,1);
			for (var k = 0; k < entite.buff.length; k++) {
				entite.buff[k].img.x = entite.barreHp.x+k*35;
			}
		} 
	}
	autorisationEtape = true;
}

function checkElement(elem1,elem2){
	for(var i in tablElement){
		if (i == elem1) {
			for(var j in tablElement[i]){
				if (j == elem2) {
					return tablElement[i][j]
				}
			}
		}
	}
}

function animationSort(attaquant,defenseur,sort){
	if(typeof sort.img==='undefined') {
		switch(sort.element){
			case null:
				effet.tint = 0xFF0000;
				animParticule(defenseur);
			break;
			case 'soin':
				effet.tint = 0x00FF00;
				animParticule(attaquant);
		}
		return;
	}
	sort.img.body.velocity.x = 0;
	sort.img.body.velocity.y = 0;
	sort.img.cible = defenseur;
	sort.img.bringToTop();
	
	if (sort.typeAnim == 'v') {
		sort.img.x = centrerDans(attaquant,'w');
		sort.img.y = centrerDans(attaquant,'h');
		sort.img.rotation = game.physics.arcade.angleBetween(defenseur,attaquant);	
	    sort.img.body.angularVelocity = 200;
	    game.physics.arcade.velocityFromAngle(sort.img.angle, -300, sort.img.body.velocity);
	    sort.img.body.angularVelocity = 0;		
	}else if (sort.typeAnim == 'h'){
		sort.img.x = 0;
		sort.img.y = 0;
		sort.img.body.velocity.x = 750;
		sort.img.body.velocity.y = 0;
	}else{
		sort.img.x = defenseur.x;
		sort.img.y = defenseur.y;
	}
 	sort.img.animations.play('anim');
}

function tweenTint(obj, startColor, endColor, time, timeRetour) { 
	// create an object to tween with our step value at 0    
	var colorBlend = {step: 0};    
	// create the tween on this object and tween its step 
	// property to 100    
    var colorTween = game.add.tween(colorBlend).to({step: 100}, time);        
    colorTween.easing('Linear');
    colorTween.loop(true);
    colorTween.yoyo(true);
	// run the interpolateColor function every time the tween updates, 
	// feeding it the   
	// updated value of our tween each time, and set the result 
	//  as our tint    
    colorTween.onUpdateCallback(function() {      
   		obj.tint = Phaser.Color.interpolateColor(startColor, endColor, 100, colorBlend.step);       
   	}); 
   	// set the object to the start color straight away    
    obj.tint = startColor;            
    // start the tween    
    colorTween.start()

    return colorTween
}

function nouvelleEnnemi(){
	autorisationEtape = false;
	ennemi.hp = ennemi.hp_max;
	ennemi.buff = [];
	ennemi.revive();
	afficherMessageEvent('Un nouvelle ennemi apparait !');
	etapeActuel = 1;
}

function showDetail(bouton){
	if (menu != 'main') {
		textEvenement.x = fondTexte.x+20;
		textEvenement.y = fondTexte.y+10;
		var posIconeX = textEvenement.x+85;
		var posIconeY = textEvenement.y+25;
	}
	if (menu =='atk') {
		if (typeof perso.armeEquipe.competence[bouton.id] === 'undefined') return;
		var msg ='Nom: '+perso.armeEquipe.competence[bouton.id].nom;
		if (perso.armeEquipe.competence[bouton.id].element == null){
			msg+='\nEffet: ';
			iconeDescription.loadTexture(perso.armeEquipe.competence[bouton.id].type);
		}else{
			if (perso.armeEquipe.competence[bouton.id].element != 'soin') {
				msg+='\nElement: ';
				iconeDescription.loadTexture(perso.armeEquipe.competence[bouton.id].element); 
			}else{
				iconeDescription.loadTexture();
				msg+='';				
			}
		}	
		iconeDescription.revive();
		iconeDescription.x=posIconeX;
		iconeDescription.y=posIconeY;	
		msg+='\n'+perso.armeEquipe.competence[bouton.id].description;
		afficherMessageEvent(msg);
		
	}else if(menu =='changer'){
		if (typeof perso.arme[bouton.id] === 'undefined') return;
		var msg ='Nom: '+perso.arme[bouton.id].nom;
		msg+='\nElement: ';
		iconeDescription.loadTexture(perso.arme[bouton.id].element);
		iconeDescription.revive();
		iconeDescription.x=posIconeX;
		iconeDescription.y=posIconeY;	
		afficherMessageEvent(msg);	
	}else if(menu=='objet'){
		if (typeof perso.objet[bouton.id] === 'undefined') return;
		afficherMessageEvent('Nom: '+perso.objet[bouton.id].nom+'\nEffet: '+perso.objet[bouton.id].description);
	
	}
}