class PowerUp extends GameObject {
	
	constructor(geometry,material,duration){
		super(geometry,material);

		this.geometry = geometry;
		this.material = material;

		this.duration = duration;
		this.creatAt = 0;

		this.angle = 0;
		
	}

	create(duration){
		let newPowerUp = new this.constructor(this.geometry,this.material,duration);
		return newPowerUp;
	}


	spawn(origin){
		this.angle = (Math.random()*360);
		this.reset(origin.x,origin.y,origin.z);
		this.creatAt = Game.time;

	}


	update(){
		if (Game.time > this.creatAt+this.duration ) this.kill(); 
		
		this.position.z = Game.planet.position.z + Math.sin(this.angle) * Game.planet.orbitSize;
		this.position.x = Game.planet.position.x + Math.cos(this.angle) * Game.planet.orbitSize;
	}
}

class Repel extends PowerUp{
	
	constructor(geometry,material,duration){
		super(geometry,material,duration);		
	}

	effect(){
		Game.planet.orbitSize += 50;
		if (Game.planet.orbitSize >Game.planet.orbitSizeMax) Game.planet.orbitSize = Game.planet.orbitSizeMax;
	}
}

class Clean extends PowerUp{
	
	constructor(geometry,material,duration){
		super(geometry,material,duration);
	}

	effect(){
		for (let i = 0; i < Game.planet.bulletManagers.length; i++) {
			let bulletManager = Game.planet.bulletManagers[i];

			for(let j = 0; j<bulletManager.pool.length; j++){
				let bullet = bulletManager.pool[j];
				if (!bullet.alive) continue;

				bullet.kill();
			}
		}
	}
}

class HeatDown extends PowerUp{
	
	constructor(geometry,material,duration){
		super(geometry,material,duration);
	}

	effect(){
		Game.spaceship.healt -= 25;
	}
}