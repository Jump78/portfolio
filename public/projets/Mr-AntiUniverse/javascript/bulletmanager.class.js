class BulletManager{
	
	constructor(scene){
		this.pool = [];
		this.nextFire = 0;
		this.parent = scene;
		this.rotation = 0;
	};
	
	populate(nb, geometry, material){
		for (let i = 0; i < nb; i++) {
			let bullet = new Bullet(geometry, material);
			bullet.kill();
			this.pool.push(bullet);
		}
		return this.pool;
	};

	getBullet(){
		for (let i = 0; i < this.pool.length; i++) {
			let b = this.pool[i];
			if (!b.alive) {
				return b;
			}
		}
	}

	fire(origin, angle, speed){
		if (Game.time > this.nextFire) {

			this.getBullet().fire(origin, angle + this.rotation, speed);
			return true;
		}
		else {
			return false;
		}
	};

	wait(ms, callback){
		this.nextFire = Game.time + ms;
		if (callback) callback();
	}
}