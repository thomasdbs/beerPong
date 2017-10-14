import * as THREE from 'three';
import TweenMax from 'gsap';
import threeOrbitControls from './utils/OrbitControls';
import Stats from 'stats.js';
import Game from './game';
import Table from './table';
import Lights from './lights';
import './index.css';

// attach orbit controls to THREE
const OrbitControls = threeOrbitControls(THREE);

// stats
const stats = new Stats();
document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

//Scene
const scene = new THREE.Scene();

//Lumiere ambiante
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-15, 30, 95);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

const lights = Lights();
scene.add(lights.group);

const game = Game();
scene.add(game.group);

const table = Table();
scene.add(table.group);

const speed = 120;
const angle = 0;
let direction= '-';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const handleClick = e => {
    e.preventDefault();
    mouse.x = e.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(game.group.children);
    if (intersects.length > 0 && intersects[0].object.uuid === game.balle.uuid) {
        TweenMax.to(game.balle.position, 0.9, {
            x: angle,
            z: `${direction}=${speed}`,
        });
        TweenMax.to(game.balle.position, 0.6, {
            y: '3',
            ease: Power2.easeIn,
        }).delay(0.3);
        const interval = setTimeout(() => {
            if (game.balle.position.y <=3 && game.balle.position.z < 0) {
                // TweenMax.to(camera.position, 2, {
                // 	x: '15',
                // 	y: '30',
                // 	z: `-95`,
                // });
                game.balle.position.set(0,20,-60);
                direction='+';
            }else if (game.balle.position.y <=3 && game.balle.position.z > 0) {
                // TweenMax.to(camera.position, 2, {
                // 	x: '-15',
                // 	y: '30',
                // 	z: `95`,
                // });
                game.balle.position.set(0,20,60);
                direction='-';
            }
        }, 1000);

    }
};
addEventListener('click', handleClick);


const animate = timestamp => {
    stats.begin();
    renderer.render(scene, camera);
    stats.end();
    requestAnimationFrame(animate);
};
animate();
