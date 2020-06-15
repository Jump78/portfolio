var liste_objet = [];
function objet(param) {
	this.nom = param[0];
	this.puissance = param[1];
	this.type = param[2];
	this.description = param[3];
	liste_objet.push(this);
}