class Physics {
	


	constructor(game){
		this.game = game;
		this.collisionGroups = {};
		this.collisions = [];
	}
	
	process(){

		for (let i = 0; i < this.game.scene.children.length; i++) {
			let o = this.game.scene.children[i];
			
			if (o.velocity && o.position){
				o.position.x += o.velocity.x;
				o.position.y += o.velocity.y;
				o.position.z += o.velocity.z;
			}
		}

		for (let i = 0; i < this.collisions.length; i++) {
			
			let collision = this.collisions[i];

			let group1 = this.collisionGroups[collision[0]];
			let group2 = this.collisionGroups[collision[1]];
			
			let callback = collision[2];

			for (let j = 0; j < group1.length; j++) {
				
				let obj1 = group1[j];
				
				for (let k = 0; k < group2.length; k++) {

					let obj2 = group2[k];
					
					if (this.checkCollision(obj1, obj2)){
						callback(obj1, obj2);
					}
				}
			}
		}
	}

	checkCollision(obj1, obj2){
		if (!obj1.alive || !obj2.alive) return false;

		//On calcule la distance entre les 2 objets;
		let dist = Math.sqrt(Math.pow((obj2.position.x-obj1.position.x),2) + Math.pow((obj2.position.z-obj1.position.z),2));

		// Si elle est inférieur à la somme des radius des deux objets, il y a collison
		if (dist<(obj2.geometry.parameters.radius+obj1.geometry.parameters.radius)) return true;
		return false;
	}

	addCollisionGroup(array, key){

		if (Array.isArray(array)){
			this.collisionGroups[key] = array;
		} else {
			this.collisionGroups[key] = [array];
		}
	}

	populateCollisionGroup(array, key) {

		if (this.collisionGroups[key]){
			if (Array.isArray(array)){
				this.collisionGroups[key] = this.collisionGroups[key].concat(array);
			} else {
				this.collisionGroups[key].push(array);
			}			
		}
	}

	collide(key1, key2, callback) {
		this.collisions.push([key1, key2, callback]);
	}
}