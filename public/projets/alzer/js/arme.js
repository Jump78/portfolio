var liste_arme = [];
function arme(nom,puissance,competence,element) {
	this.nom = nom;
	this.puissance = puissance;
	this.competence = competence;
	this.element = element;
	liste_arme.push(this);
}