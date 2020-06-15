var menuState = {
	create: function(){
   		music = game.add.audio('ambiance_meni');
    	music.play();	
		game.stage.backgroundColor = 0xFFFFFF
        var fond = game.add.image(0, 0,'fond_menu');

        var button_regle = game.add.button(130,308,'c1',function(){
        		game.state.start('regleDuJeu');
        });
        button_regle.scale.set(0.2); 
        button_regle.onInputOver.add(this.over_regle, this);
        button_regle.onInputOut.add(this.out_regle, this);

        var button_jouer = game.add.button(235,220,'c2',function(){
        		game.state.start('tuto');
        });
        button_jouer.scale.set(0.25);  
        button_jouer.onInputOver.add(this.over_jouer, this);
        button_jouer.onInputOut.add(this.out_jouer, this);

        var button_option = game.add.button(520,290,'c1',function(){
        	game.state.start('fake');
        });  
        button_option.scale.set(0.2);
        button_option.onInputOver.add(this.over_option, this);
        button_option.onInputOut.add(this.out_option, this);

        var button_credit = game.add.button(550,445,'c6',function(){
        	game.state.start('credit');

        });  
        button_credit.scale.set(0.4);        
        button_credit.onInputOver.add(this.over_credit, this);
        button_credit.onInputOut.add(this.out_credit,this);
        
        var button_quitter = game.add.button(710,435,'c9',function(){
        	window.open('https://www.google.fr/','_parent','');
    		window.close();
        });
        button_quitter.onInputOver.add(this.over_quitter, this);
        button_quitter.onInputOut.add(this.out_quitter, this);
        button_quitter.scale.set(0.25);

		selectR = game.add.sprite(-100,-100,'selectR');
        selectR.scale.set(0.25); 
		selectJ = game.add.sprite(-100,-100,'selectJ');
        selectJ.scale.set(0.25);
		selectO = game.add.sprite(-100,-100,'selectO');
        selectO.scale.set(0.25);
		selectC = game.add.sprite(-100,-100,'selectC');
        selectC.scale.set(0.25);        
		selectQ = game.add.sprite(-100,-100,'selectQ');
        selectQ.scale.set(0.3);
	},

	over_regle: function(){
		selectR.x = 130;
		selectR.y = 310;	

	},
	over_jouer: function(){
		selectJ.x = 246;
		selectJ.y = 237;	
	},
	over_option: function(){
		selectO.x = 539.5;
		selectO.y = 298.5;	
	},
	over_credit: function(){
		selectC.x = 572.5;
		selectC.y = 450;	
	},

	over_quitter: function(){
		selectQ.x = 734.5;
		selectQ.y = 438.5;	
	},

	out_regle: function(){
		selectR.x = -100;
		selectR.y = -100;
	},

	out_jouer: function(){
		selectJ.x = -100;
		selectJ.y = -100;
	},

	out_option: function(){
		selectO.x = -100;
		selectO.y = -100;
	},

	out_credit: function(){
		selectC.x = -100;
		selectC.y = -100;
	},

	out_quitter: function(){
		selectQ.x = -100;
		selectQ.y = -100;	
	},	
}