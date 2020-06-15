var liste_sort = [];
function sort(params) {
	this.nom = params[0];
	this.puissance = params[1];
	this.element = params[2];
	if (params[3] != null) this.img = game.add.sprite(params[3][0],params[3][1],params[3][2]);
	this.description = params[4] || '';
	this.type = params[5];
	liste_sort.push(this);
}

/*sort.prototype = Object.create(Phaser.Sprite.prototype);
sort.prototype.constructor = sort;

sort.prototype.update = function(){
	
};
*/
var liste_buff =[];
function buff(nom,puissance,tour,type,element,img,entite){
	this.nom = nom;
	this.puissance = puissance;
	this.tour = tour;
	this.type = type;
	this.element = element;
	this.used = false;
	if (typeof img !== 'undefined') {
		var espace = entite.buff.length*35;
		this.img = game.add.sprite(img[0]+espace,img[1]+20,img[2])
	};
	liste_buff.push(this);
}