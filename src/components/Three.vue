<template>
    <div id='three-container'></div>
</template>

<script>
    import  * as THREE from 'three';

    let camera, scene, renderer;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let particleCount = 350;
    let velocityInterval = [-10, 10];
    let maxVelocityInterval = [-2000, 2000];
    let raycaster = new THREE.Raycaster();
    let mouse = new THREE.Vector2();
    let INTERSECTED;

    let init = function() {
        //create a new camera; camera controls pos/rotation/FOV
        //PerspectiveCamera(fieldOfView, aspectRatio, renderNearLimit, renderFarLimit)
        camera = new THREE.OrthographicCamera(width / - 2, width / 2, height / 2, height / - 2, 1, 1000);

        // move the camera back from origin (0,0,0)
        // all objects are initially created at (0,0,0)
        camera.position.z = 10;

        //add camera to a scene; scene contains all 3D data
        scene = new THREE.Scene();
        scene.add(camera);

        //canvas renderer figures out what's in the scene, draws it.
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(width, height);

        document.body.appendChild( renderer.domElement );
            
        makeParticles();
    }


    let random = function(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    let makeParticles = function() {
        //definte what the particles look like
        let material = new THREE.MeshBasicMaterial( { 
            color: 0xffffff,
            transparent: true,
            opacity: 0.5,
        });

        let geometry = new THREE.CircleGeometry(2, 5);

        //define each particle's position and add it to the system
        for (let i = 0; i < particleCount; i++) {
            let pX = Math.random() * width - width / 2;
            let pY = Math.random() * height - height / 2;
            let pZ = 0;
            
            let velocity = new THREE.Vector3(
                random(velocityInterval[0], velocityInterval[1]) / 100,
                random(velocityInterval[0], velocityInterval[1]) / 100,
                0
            );

            let particle = new THREE.Mesh(geometry.clone(), material.clone())
            particle.position.x = pX;
            particle.position.y = pY;
            particle.position.z = pZ;

            particle.velocity = velocity;

            scene.add(particle);
        }
    }

    let onMouseMove = function( event ) {
        event.preventDefault();

        mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
        mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    }

    let render = function() {
        // update the picking ray with the camera and mouse position
        raycaster.setFromCamera( mouse, camera );

        // calculate objects intersecting the picking ray
        let intersects = raycaster.intersectObjects( scene.children );
        if ( intersects.length > 0 ) {
            if ( INTERSECTED != intersects[ 0 ].object.uuid ) {

                INTERSECTED = intersects[ 0 ].object.uuid;

                intersects[0].object.velocity.multiplyScalar(-20);            
            }
        } else if ( INTERSECTED !== null ) {
            INTERSECTED = null;
        }

        scene.children.forEach( child => {
            if (child.type !== 'Mesh') {
                return;
            }
            
            child.velocity.x += random(-1, 1) / 100;
            if(child.velocity.x > maxVelocityInterval[1]) {
                child.velocity.x = maxVelocityInterval[1];
            }
            if(child.velocity.x < maxVelocityInterval[0]) {
                child.velocity.x = maxVelocityInterval[0];
            }
            
            child.velocity.y += random(-1, 1) / 100;
            if(child.velocity.y > maxVelocityInterval[1]) {
                child.velocity.y = maxVelocityInterval[1];
            }
            if(child.velocity.y < maxVelocityInterval[0]) {
                child.velocity.y = maxVelocityInterval[0];
            }

            const nextX = child.position.x + child.velocity.x;
            const nextY = child.position.y + child.velocity.y;

            if (
                nextX >= (width / 2) ||
                nextX <= -(width / 2)
            ) {
                child.velocity.x *= -0.8;                
            }

            if (
                nextY >= (height / 2) ||
                nextY <= -(height / 2)
            ) {
                child.velocity.y *= -0.8;
            }

            child.position.add(child.velocity);
        });

        renderer.render(scene, camera);
    }

    let animateParticles = function() {
        requestAnimationFrame (animateParticles);
        render();
    }

    init();
    animateParticles();
    window.addEventListener( 'mousemove', onMouseMove, false );

    export default {
        'name': 'Three',
        mounted: () => document.getElementById('three-container').appendChild( renderer.domElement )
    }
</script>

<style scoped>
    #three-container {
        position: absolute;
        display: block;
        top: 0;
        left: 0;
        z-index: -2;
    }
</style>