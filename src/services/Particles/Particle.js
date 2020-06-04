import { Vector3, Mesh } from 'three';
import random from '../Random/getRandomNumberInRange';

export default class extends Mesh{
    constructor(
        x,
        y,
        z,
        velocityX,
        velocityY,
        maxVelocityX,
        minVelocityX,
        maxVelocityY,
        minVelocityY,
        geometry,
        material,
        boundaryMinX,
        boundaryMaxX,
        boundaryMaxY,
        boundaryMinY,
    ) {
        super(geometry.clone(), material.clone());

        const position = new Vector3(
            x,
            y,
            z
        )

        const velocity = new Vector3(
            velocityX,
            velocityY,
            0
        );

        const maxVelocity = new Vector3(
            maxVelocityX,
            maxVelocityY,
            0
        );

        const minVelocity = new Vector3(
            minVelocityX,
            minVelocityY,
            0
        );

        this.position.add(position);

        this.velocity = velocity;
        this.maxVelocity = maxVelocity;
        this.minVelocity = minVelocity;
        this.boundary = {
            minX: boundaryMinX,
            maxX: boundaryMaxX,
            maxY: boundaryMaxY,
            minY: boundaryMinY,
        }
    }
    
    getPosition(coordinateName) {
        const authorizedName = ['x', 'y', 'z'];
        if(!authorizedName.includes(coordinateName)) {
            return this.position;
        }

        return this.position[coordinateName];
    }

    getVelocity(coordinateName) {
        const authorizedName = ['x', 'y', 'z'];
        if(!authorizedName.includes(coordinateName)) {
            return this.velocity;
        }

        return this.velocity[coordinateName];
    }

    addVectorToPosition(vector) {
        this.position.add(vector);

        return this.getPosition();
    }

    addVelocity(coordinateName, value) {
        const authorizedName = ['x', 'y', 'z'];
        if(!authorizedName.includes(coordinateName)) {
            return this.getVelocity();
        }

        this.velocity[coordinateName] += value;

        if(this.velocity[coordinateName] > this.maxVelocity[coordinateName]) {
            this.velocity[coordinateName] = this.maxVelocity[coordinateName];
        }

        if(this.velocity[coordinateName] < this.minVelocity[coordinateName]) {
            this.velocity[coordinateName] = this.minVelocity[coordinateName];
        }

        return this.getVelocity();
    }

    multiplyVelocityByScalar(value) {
        this.velocity.multiplyScalar(value);
        return this.getVelocity();
    }

    render() {
        this.addVelocity('x', random(-1, 1) / 100);
        this.addVelocity('y', random(-1, 1) / 100);

        const nextX = this.getPosition('x') + this.getVelocity('x');
        const nextY = this.getPosition('y') + this.getVelocity('y');

        if (
            nextX >= this.boundary.maxX ||
            nextX <= this.boundary.minY
        ) {
            this.velocity.x *= -0.8;                
        }

        if (
            nextY >= this.boundary.maxY ||
            nextY <= this.boundary.minY
        ) {
            this.velocity.y *= -0.8;
        }

        this.addVectorToPosition(this.getVelocity());
    }
}