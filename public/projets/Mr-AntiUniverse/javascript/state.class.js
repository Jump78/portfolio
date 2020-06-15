class State {
	constructor(name, func){
		this.name = name;
		this.scene = null;
		this.camera = null;
		this.funcs = func;
		this.init(func);
	}

	init(){
		this.scene  = new THREE.Scene();
		this.camera =  new THREE.OrthographicCamera( SCREEN_WIDTH / - 2, SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2, SCREEN_HEIGHT / - 2, 1, 1000 );
		this.camera.position.y = -400;
		this.funcs.init.apply(this);
	}

	update(){
		for (var i = 0; i < this.scene.children.length; i++) {
			if (this.scene.children[i].update) this.scene.children[i].update();
		}
		this.funcs.update.apply(this);
	}
}