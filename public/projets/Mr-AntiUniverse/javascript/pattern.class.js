class Pattern {
	constructor(managers, functions){
		
		this.managers = managers;
		this.grid = functions;
		this.cursor = 0;
		this.nextStep = 0;
		this.index = 0;
	}

	use() {

		if (Game.time > this.nextStep) {
			console.log(this.managers.length)
			for (let i = 0; i < this.managers.length; i++){
				
				let fn = this.grid[this.cursor];
				let m  = this.managers[i];
				
				fn.apply(m, [i, this]);
			}

			this.cursor ++;
			this.index  ++;
			if(this.cursor >= this.grid.length){
				this.cursor = 0;
			}
		}
	}

	wait(ms){
		this.nextStep = Game.time+ms;
	}
}