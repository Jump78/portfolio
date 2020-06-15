var preloadState ={
    preload: function(){
        var load_barre = game.add.text(80,150,'Load ...',{fill:'#FF0000'});
        game.load.spritesheet('momo', 'img/Asset_momo.png', 64, 64);  
        game.load.spritesheet('hp_momo', 'img/Asset_Hp.png', 64, 64);  
        game.load.spritesheet('bullet_players', 'img/asset_Anticorps.png', 64, 64);  
        game.load.spritesheet('virus', 'img/Asset_virus.png', 64, 64);  
        game.load.spritesheet('cancer', 'img/Asset_Cellule Cancereuse.png', 64, 64);  
        game.load.spritesheet('feedBack', 'img/asset_Feed_Back.png', 64, 64);  
        game.load.spritesheet('cellule_noyau', 'img/Asset_Noyau_ally.png',64,64);  
        game.load.spritesheet('cellule_regen', 'img/Asset_Cellule_ally.png',128,128);  
        game.load.spritesheet('lymphocyteb', 'img/lymphocyteb.png',64,64);  
        game.load.spritesheet('enemyBullet', 'img/Asset_Projectil_ennemy.png',64,64);  
        game.load.spritesheet('fin', 'img/celluleFin.png',128,128);  
        game.load.spritesheet('heal', 'img/assetHeal.png',64,64);  
        game.load.spritesheet('explosion', 'img/assetExplosion.png',64,64);  
        game.load.spritesheet('imune', 'img/asset_imune.png',64,70);  
        game.load.image('fond', 'img/Fond_00000.png');  
        game.load.image('fond_filtre', 'img/displacement_map.jpg');  
        game.load.image('fond2', 'img/Fond_00001.png');  
        game.load.image('fond3', 'img/Fond_00002.png');  
        game.load.image('fond_menu', 'img/menu.png');  
        game.load.image('paroi', 'img/paroi.png');   
        game.load.image('c1', 'img/C1.png');  
        game.load.image('c2', 'img/C2.png');  
        game.load.image('c3', 'img/C3.png');  
        game.load.image('c4', 'img/C4.png');  
        game.load.image('c5', 'img/C5.png');  
        game.load.image('c6', 'img/C6.png');  
        game.load.image('c7', 'img/C7.png');  
        game.load.image('c8', 'img/C8.png');  
        game.load.image('c9', 'img/C9.png');  
        game.load.image('selectC', 'img/BoutonC.png');  
        game.load.image('selectJ', 'img/BoutonJ.png');  
        game.load.image('selectO', 'img/BoutonO.png');  
        game.load.image('selectQ', 'img/BoutonQ.png');  
        game.load.image('selectR', 'img/BoutonR.png');  
        game.load.image('regle', 'img/visuelrègledujeu.png');  
        game.load.image('credit', 'img/credit.png');  
        game.load.image('jouer', 'img/jouer.png');  
        game.load.image('quitter', 'img/quitter.png');  
        game.load.image('regle', 'img/regle.png');  
        game.load.image('titre_menu', 'img/Titremenu.png');  
        game.load.image('button_menu', 'img/retourmenu.png');
        game.load.image('button_fb', 'img/iconefb.png');
        game.load.image('button_twitter', 'img/iconetwitter.png');
        game.load.image('button_google', 'img/iconegoogle.png');
        game.load.audio('ambiance', 'son/sonjeu.ogg');
        game.load.audio('ambiance_meni', 'son/sonmenu.ogg');
        game.load.audio('son_powerUp', 'son/powerup.ogg');
        game.load.audio('tir', 'son/shoot.ogg');
        game.load.audio('mortvirus', 'son/mortvirus.ogg');
        game.load.audio('you_loose', 'son/defaite.ogg');
        game.load.audio('tir', 'son/shoot.ogg');
        game.load.video('intro', 'video/intro.mp4');
        game.load.physics('physicsData', 'physic.json');
        game.load.video('regen', 'video/regen.mp4');
        game.load.video('tir_video', 'video/tir_video.mp4');
    },

    create: function(){
        game.state.start('intro');
    }
}