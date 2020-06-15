class PowerUpManager{
	
	constructor(spawnTimer, duration, scene){
		this.pool = [];
		this.spawnTimer = spawnTimer;
		this.nextPowerUp = spawnTimer;
		this.parent = scene;
		this.powerUpClass = [];
		this.duration = duration;
	}
	
	populate(nb){
		for (let i = 0; i < this.powerUpClass.length; i++) {
			for (let j = 0; j < nb; j++) {
				let newPowerUp = this.powerUpClass[i].create(this.duration);
				newPowerUp.kill();
				this.pool.push(newPowerUp);
			}
		}
		return this.pool;
	}

	getPowerUp(){
		let index = Math.round(Math.random()*(this.pool.length-1));

		let powerUp = this.pool[index];

		if (!powerUp.alive) return powerUp;
		else this.getPowerUp()
	}

	spawn(origin){
		if (Game.time > this.nextPowerUp) {
			this.getPowerUp().spawn(origin);
			this.nextPowerUp = Game.time + this.spawnTimer;
			return true;
		}
		else {
			return false;
		}
	}
}