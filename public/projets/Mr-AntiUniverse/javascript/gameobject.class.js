class GameObject extends THREE.Mesh {
	
	constructor(geometry, material){

		super(geometry, material);
		this.velocity = new THREE.Vector3();
		this.alive = true;

	}

	update(){
	}

	kill(callback){
		Game.scene.remove(this);
		this.alive = false;
		if (callback) {
			callback();
		}
	}

	reset(x, y, z){
		Game.scene.add(this);
		this.position.x = x || 0;
		this.position.y = y || 0;
		this.position.z = z || 0;
		this.alive = true;
	}

	collideWith(obj, callback){

		physics.toCollide.push([this, obj, callback]);
	}
}