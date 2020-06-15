class Bullet extends GameObject {
	
	constructor(geometry, material){
		
		super(geometry, material);

	}

	fire(origin, rotation, speed){
		this.reset(origin.x, origin.y, origin.z);
		this.rotation.y = rotation;
		let vel = utils.velocityFromRotation(rotation, speed);
		this.velocity.x = -vel.x;
		this.velocity.z = -vel.z;
	}

	update(){
		let c = Game.camera;
		
		if ( Math.abs(this.position.x) > Math.abs (c.right) || Math.abs(this.position.z) > Math.abs(c.top) ) {		
			this.kill();
		}
	}
}