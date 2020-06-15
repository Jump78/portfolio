class Planet extends GameObject {
	constructor(geometry, material){
		super(geometry, material);

		this.health = 200;

		// this.radius = radius;
		this.orbitSize = 300;
		this.orbitSizeMax = 300;

		this.rotationSpeed = {
			x: 0.01,
			y: 0.02
		}


		this.weapon = null;
		
		this.bulletManagers = [];
		
		Game.physics.addCollisionGroup([], "planetBullets");

		for (let i = 0; i < 8; i++) {
			
			let bm = new BulletManager();
			
			let bullets = bm.populate(200, 	
				new THREE.SphereGeometry(  4, 1, 4  ),
				new THREE.MeshBasicMaterial( { color: 0x00ccff, wireframe: true } )
			);

			this.bulletManagers.push(bm);

			Game.physics.populateCollisionGroup(bullets, "planetBullets");
		}

		let self = this;

		this.pattern = new Pattern(

			this.bulletManagers,

			[
				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(20);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(20);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(1);
				},

				function(index, pattern) {

					this.rotation = utils.degToRad(pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					
				},

				function(index,pattern) {
					pattern.wait(50);
				}
			]
		);
		
		for(let k = 0; k < 32; k++) {
			this.pattern.grid.push(

				function(index, pattern) {

					this.rotation = utils.degToRad(-pattern.index*5);
					
					this.fire(self.position, utils.degToRad(45*index) - utils.degToRad(pattern.cursor*2), 2);
					pattern.wait(8 - Math.round(k)/4);
				}
			);

			// if (k%4==0){
			// 	this.pattern.grid.push(
			// 		function(index, pattern) {
			// 			pattern.wait(15);
			// 		}
			// 	)
			// }
		}

		this.pattern.grid.push(function(index,pattern) {
					pattern.wait(50);
				});
		

		Game.physics.addCollisionGroup([this], "planet");

	}

	update(){
		//Si l'entitée est morte on stop l'update;
		if (!this.alive) return

		//Si l'entitée n'as plus d'hp on la tue et on sort de la fonction
		if (this.health<=0){
			this.kill();
			Game.win();
			return
		}


		// for (let i = 0; i < this.bulletManagers.length; i++) {
			
		// 	let bm = this.bulletManagers[i];
		// 	if(bm.fire(this.position, utils.degToRad(i*45), 2)){
		// 		bm.wait(3);
		// 	};
			
		// 	bm.rotation = utils.degToRad(Math.sin(index)*10);
		// 	index += 1;
		// }

		this.pattern.use();

		this.rotation.x += this.rotationSpeed.x;
		this.rotation.y += this.rotationSpeed.y;
		this.orbitSize -= 0.2;

	}
}

let index = 0;