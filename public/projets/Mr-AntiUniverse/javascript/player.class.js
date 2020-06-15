class Player extends GameObject {
	
	constructor(geometry, material){
		super(geometry, material);

		this.target;

		this.maxSpeed = 1;

		this.acceleration = 0.012;
		this.fireRate = 10;

		this.entryControls = [];

		this.heat = 0;
		this.maxHeat = 90;
		this.oldHeat = 0;
		this.overHeat = false;
		this.overHeatTimer = 100;

		this.angle = -90*Math.PI/180;
		
		this.bulletManager = new BulletManager();

		this.hitbox = new GameObject(
			
			new THREE.SphereGeometry(  6, 8, 8  ),
			new THREE.MeshBasicMaterial( { color: 0xff00cc, wireframe: true} )
		);

		this.hitbox.position.x = 500;

		this.add(this.hitbox);
		this.hitbox.gameObject = this;
		
		Game.scene.add(this.hitbox);

		this.shield = new GameObject(
			new THREE.SphereGeometry(  26, 8, 3  ),
			new THREE.MeshBasicMaterial( { color: 0x00FFFF, wireframe: true} )
		);
		
		this.shield.position.x = 500;
		this.shield.alive = false;
		this.shield.visible = false;
/*		this.shield.scale.x = 0.1;
		this.shield.scale.y = 0.1;
		this.shield.scale.z = 0.1;*/
		
		Game.scene.add(this.shield);

		let playerBullets = this.bulletManager.populate(200,
			
			new THREE.SphereGeometry(  4, 1, 4  ),
			new THREE.MeshBasicMaterial( { color: 0xff00aa, wireframe: true } )

		);

		Game.physics.addCollisionGroup(this.hitbox, "player");
		
		Game.physics.addCollisionGroup(this.shield, "shield");

		Game.physics.addCollisionGroup(playerBullets, "playerBullets");

		this.powerUps = [];

	}

	update(){

		if (this.heat >= this.maxHeat) {
			this.heat = this.maxHeat
			this.overHeat = true;
		};

		if (!this.alive) return;

		if (this.entryControls['ArrowRight']) this.angle += this.acceleration; //deplacement droit
		if (this.entryControls['ArrowLeft']) this.angle -= this.acceleration; //depalcement gauche
		if (this.entryControls['a'] && !this.overHeat) {
			this.shield.alive = true;
			this.shield.visible = true;
			this.heat += 0.7;
		}else{
			this.shield.alive = false;
			this.shield.visible = false;
		}
		
		this.position.x = this.target.position.x + Math.cos(this.angle) * this.target.orbitSize;//deplacement autour de la planete
		this.position.z = this.target.position.z + Math.sin(this.angle) * this.target.orbitSize;//Attraction vers la planete
		
		this.hitbox.position.x = this.position.x;
		this.hitbox.position.z = this.position.z;
		this.lookAt(this.target.position);

		this.shield.position.x = this.position.x;
		this.shield.position.z = this.position.z;

		if (this.heat != this.oldHeat) Game.heatBar.geometry = new THREE.RingGeometry( 320, 400, 15, 1, utils.degToRad(225), - this.heat*(Math.PI/2)/this.maxHeat );
	
		if (this.entryControls[' '] && !this.overHeat) {//Pression d'espace

		if (this.bulletManager.fire(this.position, this.angle, 10)){
			this.bulletManager.wait(this.fireRate);
			this.heat += 7;
		};
			

		}

		if (this.overHeat){
			this.overHeatTimer--;
			if (this.overHeatTimer<0) {
				this.overHeatTimer = 100;
				this.heat = 80;
				this.overHeat = false;
			}
		} 

		if (!this.entryControls[' '] && !this.entryControls['a']  && !this.overHeat){
			this.heat--;
			if (this.heat<1) this.heat = 1;
		}

	}
}