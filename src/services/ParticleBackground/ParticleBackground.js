import {
    OrthographicCamera,
    Scene,
    WebGLRenderer,
    Vector2,
    Raycaster,
    MeshBasicMaterial,
    CircleGeometry
} from 'three';
import Particle from '../Particles/Particle';
import random from '../Random/getRandomNumberInRange';

export default class {
    constructor(
        width,
        height,
        near,
        far,
        domElement,
        particleCount
    ) {
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.width = width || 600;
        this.height = height ||300;
        this.near = near || 1;
        this.far = far || 1000;
        this.domElement = domElement;
        this.mouse = new Vector2();
        this.raycaster = new Raycaster();
        this.lastParticleHitUuid = null;
        this.particleCount = particleCount;
        this.isInit = false;
        
        this.init();
    }

    init() {
        // Iin Three.js, the origin of the orthonormal is center in the scene
        let camera = new OrthographicCamera(
            -(this.width / 2),
            this.width / 2,
            this.height / 2,
            -(this.height / 2),
            this.near,
            this.far
        );

        // move the camera back from origin (0,0,0)
        // all objects are initially created at (0,0,0)
        camera.position.z = 10;
        this.camera = camera;

        //add camera to a scene; scene contains all 3D data
        let scene = new Scene();
        scene.add(camera);
        this.scene = scene;

        //canvas renderer figures out what's in the scene, draws it.
        let renderer = new WebGLRenderer();
        renderer.setSize(this.width, this.height);

        this.domElement.appendChild( renderer.domElement );

        this.renderer = renderer;

        window.addEventListener( 'mousemove', this.onMouseMove, false );

        scene.add( ...this.generateParticles(this.particleCount) );

        this.isInit = true;
    }

    onMouseMove = () => {
        if (!this.isInit) {
            return;
        }

        event.preventDefault();

        this.mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        this.mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    generateParticles(max) {
        const material = new MeshBasicMaterial( { 
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
        });

        const geometry = new CircleGeometry(2, 5);

        let particles = [];
        for (let i = 0; i < max; i++) {
            const pX = Math.random() * this.width - this.width / 2;
            const pY = Math.random() * this.height - this.height / 2;
            const pZ = 0;
            
            const velocityX = random(-10, 10) / 100;
            const velocityY = random(-10, 10) / 100;

            const particle = new Particle(
                pX,
                pY,
                pZ,
                velocityX,
                velocityY,
                2000,
                -2000,
                2000,
                -2000,
                geometry.clone(),
                material.clone(),
                -(this.width / 2),
                this.width / 2,
                this.height / 2,
                -(this.height / 2)
            );

            particles.push(particle);
        }

        return particles;
    }

    render() {
        // update the picking ray with the camera and mouse position
        this.raycaster.setFromCamera( this.mouse, this.camera );

        const objectFromScene = this.scene.children;

        // calculate objects intersecting the picking ray
        let intersects = this.raycaster.intersectObjects(objectFromScene);
        if ( intersects.length > 0 ) {
            if ( this.lastParticleHitUuid != intersects[0].object.uuid ) {
                this.lastParticleHitUuid = intersects[0].object.uuid;
                intersects[0].object.multiplyVelocityByScalar(-20);
            }
        } else if ( this.lastParticleHitUuid !== null ) {
            this.lastParticleHitUuid = null;
        }

        objectFromScene.forEach( item => {
            if(typeof item.render !== 'function') {
                return;
            }

            item.render();
        });

        this.renderer.render(this.scene, this.camera);
    }

    start = () => {
        if(!this.isInit) {
            throw 'You call init() method before try to start the background';
        }

        requestAnimationFrame(this.start);
        this.render();
    }
}