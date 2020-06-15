//Potion
var potion=		{
					nom: 	'potion', 
					valeur: 50,
					type: 	'soin'
				};

//Potionx
var potionx=	{
					nom: 	'potionx', 
					valeur: 100,
					type:   "soin", 
				};
//Stéroides
var steroides=	{
					nom: 	'steroides',
					valeur: 5,
					type: 	'attaque_boost',
					duree:  3,
				}
//Propriété compétence
var rage=	{
				nom: 	'rage',
				valeur: 3,
				type: 	'attaque_boost',
				duree: 5,				
			}
var brasier= {
				nom: 	'brasier',
				valeur: 	15,
				type: 	'dot',
				duree: 3,
			 }			
//Propriétés perso
var perso=		{
					nom: 		 'joueur',
					vie: 		 50, 
					vie_max:     50,
					attaque:     5,
					inventaire:	 [potion,potion,steroides],
					coup:		 0,
					buff: 		 [],
					cc: 		 15,
					degat_cc: 	 50
				};
//Ensemble des objets du jeu 
var collection_objet = [potion,potionx,steroides];
//Ensemble des compétence du jeu
var collection_competence = ['coup'];
//Ensemble des monstre du jeu
var collection_monstre = [];
//Ensemble des compétence des monstre du jeu
var collection_competence_monstre = [rage];
//Commande
var commande =['attaquer','utiliser','commande_possible','inventaire','info'];
var nombre_tours = 0;
var score = 0;
var historique_joueur = [];
//Intro
var message = 'Dans un royaume où les monstres se sont répandus vous etes l\'élut qui les éradiquera. Vous etes parti avec uniquement deux potions sur vous. Que Dieu soit avec vous.\r\n Vous rencontrez un monstre sur votre chemin !\r\n';
console.log(message+commande_possible());

//Genere 2000 monstres
while(true){
	if (collection_monstre.length>2000) break;
	var vie = Math.round((Math.random()+1)*30);
	var nom = ['Schwaby','Dussolinou','Ecorcinet','Bastinou'];	
	var indice= Math.round((Math.random())*(nom.length-1));
	var nom_complet = nom[indice];
	var cc= Math.round((Math.random())*10);
	var couleur = ['rouge','bleu','jaune','violet'];
	indice= Math.round((Math.random())*(couleur.length-1));
	nom_complet+=' '+couleur[indice];
	
	var monstre={
		nom: 	nom_complet,
		vie_max: vie,
		vie: 	 vie,
		buff: 	 [],
		attaque: Math.ceil((Math.random()*6)),
		cc : 	 cc,
		degat_cc:25,
	}

	collection_monstre.push(monstre);
}

//Fonction d'info
function info(entite){
	message = ''
	for (x in entite) {
		switch (x){
			case 'nom':
				message+= 'Le ' + entite[x];
				break;
			case 'vie':
				message+= ' possede '+entite[x]+' HP.';
				break;
			case'attaque':
				message+= ' Ainsi que '+entite[x]+ ' attaque.';
				break;
			case 'buff':
				if (entite[x].length>0) {
					message += ' Ses buffs sont: ';					
					message	+=	affiche_buff(entite);
					message	+= ' .';	
				}else{
					message+= '';
				}

				break;
		}
	}

	return(message);
}
//Affiche les buff
function affiche_buff(entite){
	message = '';
	for (var i = 0; i < entite.buff.length; i++) {
		message+=entite.buff[i].nom +' ';
	};

	return(message);
}

//Fonction buff
function buff(entite,buff){
	message = '';
	var nouveau_buff = Object.assign({},buff);
	if (nouveau_buff.type=='attaque_boost') {
		entite.attaque+=nouveau_buff.valeur;
		message = 'Le '+entite.nom+' augmente son attaque !';
	}
	
	entite.buff.push(nouveau_buff);
	return(message);
}

//Fonction de debuff
function debuff(entite){
	message = '';
	if (entite.buff.length>0){
		for (var i = 0; i < entite.buff.length; i++) {
			entite.buff[i].duree  --;
			if (entite.buff[i].duree<=0){
				if (entite.buff[i].type == 'attaque_boost') {
					entite.attaque-=entite.buff[i].valeur;
				}else if(entite.buff[i].type == 'dot'){
					entite.vie-=entite.buff[i].valeur;
					message+='Le '+entite.nom+' subit '+entite.buff[i].valeur+' degats.';
				}
				message+= '\r\nLe '+entite.nom+' n\'est plus sous l\'emprise de';
				message+= ' '+entite.buff[i].nom+' .\r\n';
				entite.buff.splice(i,1);
			}
		}
	}else{
		message='';
	}
	return(message);
}
//Fonction du tour deu joueur
function action_joueur(action,nombre,objet){
	message ='';
	if (perso.vie>0) {
		switch (action){
			case 'attaquer':
				switch(nombre){
					case brasier:
						buff(monstre,brasier);
						message = 'Vous utilisez brasier. L\'ennemi subira des degats plus tard.';
						break; 
					default: 
						message=attaque(perso,monstre);
						break;	
				}
			break;
			
			case 'utiliser':
				message=utiliser(nombre,objet);
			break;	

			case 'inventaire':
				message = 'Votre inventaire contient: ';
				for (var i = 0; i < perso.inventaire.length; i++) {
					message+=perso.inventaire[i].nom +' ';
				};	
			break;
			case 'info':
				message=info(nombre);
			break;
			default:
				message = commande_possible();
				perso.coup--;
				nombre_tours--;
			break;	
		}	
		historique_joueur.push(action);
	}		
	return(message);
}

//Fonction du tour du montre
function action_monstre(){
	message =''	
	if ((monstre.vie>0 && historique_joueur[historique_joueur.length-1] == 'utiliser')||(monstre.vie>0 && historique_joueur[historique_joueur.length-1] == 'attaquer')) {
		var competence=collection_competence.concat(collection_competence_monstre);
		var utilise =  Math.round((Math.random())*(competence.length-1));
		switch(competence[utilise]) {
			case 'coup':
				message=attaque(monstre,perso);
				break;

			case rage:
				message=buff(monstre,rage);
				break;

			default:
				message='I dont give a fuck';
				break;
		}	
	}
	
	return(message);
}

//Fonction de mort
function mort(arg){
	message = 'Tour '+nombre_tours+'.\n\r';
	if (arg == monstre){
		var nouveau_monstre = Math.round((Math.random())*(collection_monstre.length-1));
		monstre = collection_monstre[nouveau_monstre];
		score++;
		var id = Math.round(Math.random()*(collection_objet.length-1));
		perso.inventaire.push(collection_objet[id]);
		message += 'Vous avez tué votre adversaire en '+perso.coup+' coups!! Vous trouvez un(e) '+collection_objet[id].nom+' en depessant son cadavre. Mais un nouvelle adversaire apparait avec '+monstre.vie+' hp!!';
		perso.coup = 0;
	}else if( arg == perso){
		message += 'Vous êtes mort apres avoir tué '+score+' monstres';
	}
	return(message);
}

//fonction cc 
function coup_critque(entite){
	message ='';
	var cc = Math.round(Math.random()*100);
	var coup_critque_reussi = false;
	if (cc>=0 && cc<= entite.cc){
		coup_critque_reussi=true;
	}

	return(coup_critque_reussi);
}
//fonction de calcule des degat
function attaque(attaquant,defenseur){
	message =''
	var degat = Math.round((Math.random()+1)*attaquant.attaque);
	if (coup_critque(attaquant)) {
		degat += Math.round((degat*attaquant.degat_cc)/100);
		defenseur.vie-= degat;
		message = 'Coup critique ! Le '+attaquant.nom+' inflige '+degat+' points de dégat. Il reste '+defenseur.vie+' HP au '+defenseur.nom+'.';
		return(message);
	}else{
		defenseur.vie-= degat;
		message = 'Le '+attaquant.nom+' inflige '+degat+' points de dégat. Il reste '+defenseur.vie+' HP au '+defenseur.nom+'.';
		return(message);
	}
}

//Enlever un objet
function enlever_objet(objet){
	message =''
	var id = perso.inventaire.indexOf(objet);
	if (id>=0) {
		var item = perso.inventaire[id].nom;
		perso.inventaire.splice(id,1);
		return('Vous jettez un(e) '+item);
	}else{
		return('Vous ne possedez pas cette objet');
	}	
}

//Utiliser un objet
function utiliser(nombre,objet){
	message ='';
	var i = 0;
	while(true){
		var indice=perso.inventaire.indexOf(objet);
		if (indice>=0 && Number.isInteger(nombre)){ 
			var apelle_tableau = perso.inventaire[indice];
			if (i>=nombre){
				message='Vous avez utiliser '+i+' '+apelle_tableau.nom+'. Il vous reste '+perso.vie+' hp.';
				break;
			}
			if(apelle_tableau.type =='soin') {
				if (perso.vie<=perso.vie_max) {
					perso.vie+= apelle_tableau.valeur;
					if (perso.vie>perso.vie_max) perso.vie = perso.vie_max;
					enlever_objet(objet);
				}else{
					message='Votre vie est déja au max.';
				}
			}else if(apelle_tableau.type =='attaque_boost'){
				buff(perso,apelle_tableau);
				enlever_objet(objet);
			}
		}else if (indice<0 && i==1) {
			message='Vous avez utiliser '+i+' '+apelle_tableau.nom+'. Il vous reste '+perso.vie+' hp.';
			break;
		}else if(indice<0 && i>0){
			message='Vous n\'aviez que '+i+' '+apelle_tableau.nom+'.Vous les consommez. Il vous reste '+perso.vie+' hp.';
			break; 
		}else if(indice<0){
			message='Vous ne possedez pas cette objet';
		}else{
			break;
			message='Un parametre est incorrect.';
			break;
		}	
	i++
	}		
	return(message);
}

//Affiche une commande_possible
function commande_possible(){
	message = 'Pour jouer tapez "gameloop()" avec entre paranthese l\' une des commande suivantes:';
	for (var i = 0; i < commande.length; i++) {
		message +=' "'+commande[i]+'"';
	}
	message+='\n\rLa fonction "utiliser" demande de preciser la quantitée a utiliser et l\'objet. Exemple: gameloop("utiliser",3,potion)'; 
	message+='\n\rLa fonction "info" demande de preciser "monstre" ou "perso". Exemple: gameloop("info",perso)'; 
	return(message);
}


function gameloop(action,nombre,objet){
	message = '';
	action = action.toLowerCase();	
	var indice = commande.indexOf(action);
	if(indice<2 && score<=5){
		nombre_tours++;
		message = 'Tour '+nombre_tours+'.\r\n';
		message+= action_joueur(action,nombre,objet)+'\r\n';
		perso.coup++;			
		message+= action_monstre()+'\r\n';
		message+= debuff(perso);
		message+= debuff(monstre);
		message+= 'Que faites vous ?';
		if (monstre.vie<=0) message = mort(monstre); 
		if (perso.vie<=0) message = mort(perso); 
		
	}else if(indice>=2 && score<=5){
		message+= action_joueur(action,nombre,objet);
	}else if (score>5){
		message='Vous avez sauvez le royaume !! Vous pouvez refresh la page :3 !';
	}else{
		message = "Les commandes sont: "+ commande_possible();
	}

	return(message);
}