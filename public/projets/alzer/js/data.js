var data = {
	asset:{
		image: ['boutonHautGauche','img/boutonHautGauche.png',
				'boutonHautDroit','img/boutonHautDroit.png',
				'boutonBasGauche','img/boutonBasGauche.png',
				'boutonBasDroit','img/boutonBasDroit.png',
				'boutonCentre','img/boutonCentre.png',
				'button','img/button.png',
				'fondMenu','img/fondMenu.png',
				'menu','img/menu.png',
				'fondTexte','img/fondTexte.png',
				'cave','img/043-Cave01.jpg',
				'lifebar','img/lifebar.png',
				'feu','img/flamer.png',
				'terre','img/linden-leaf.png',
				'eau','img/water-drop.png',
				'defDown','img/despair.png',
				'atkDown','img/thunder-blade.png',
				'soin','img/soin.png',
				'brulurImg','img/fire-silhouette.png',
				'particuleHeal','img/particuleHeal.png'

			],
		spritesheet:['perso','img/perso.png',64,64,
					'ennemi','img/ennemi.png',64,64,
					'brasier','img/fireball.png',14,10,
					'lanceMontagne','img/019-Earth01.png',132,132,
					'tsunami','img/tsunami.png',73,112,
					'effet','img/effet.png',92,70,
					'changerarme','img/changerarme.PNG',192,192
					],		
		son:[]
	},
	objet:{
		potion: ['Potion',30,'soin','Vous soigne']
	},
	sort: {
		brasier:['Brasier',25,'feu',[-1000,0,'brasier'],'Peut provoquer brûlure'],
		tsunami: ['Tsunami',30,'eau',[-500,0,'tsunami']],
		lanceMontagne:['Lance montagne',25,'terre',[-200,0,'lanceMontagne']],
		intimidation: ['Intimidation',0,null,null,'Baisse l\'attaque ennemi','atkDown'],
		faiblesse:['Faiblesse',0,null,null,'Baisse la defense ennemi','defDown'],
		pansement: ['Pansement',20,'soin',null,'Vous soigne']
	}

}