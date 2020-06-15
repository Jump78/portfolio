let utils = {

	degToRad(deg){
		return deg * Math.PI / 180;
	},

	radToDeg(rad){
		return rad * 180 / Math.PI;
	},

	velocityFromRotation (rotation, speed) {

        if (speed === undefined) { speed = 60; };
        return {x: Math.cos(rotation) * speed, z: Math.sin(rotation) * speed};

    }
}