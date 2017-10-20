import * as THREE from 'three';
import TweenMax from 'gsap';
import 'three/examples/js/controls/OrbitControls';
import 'three/examples/js/postprocessing/EffectComposer';
import 'three/examples/js/postprocessing/RenderPass';
import 'three/examples/js/postprocessing/ShaderPass';
import 'three/examples/js/shaders/CopyShader';
import 'three/examples/js/shaders/FilmShader';
import Game from './game';
import Table from './table';
import Lights from './lights';
import Particles from './particles';
import './index.css';

// attach orbit controls to THREE
// const OrbitControls = threeOrbitControls(THREE);

// stats
// const stats = new Stats();
// document.body.appendChild(stats.domElement);

// scene, renderer, camera, mesh (geometry + material)
const renderer = new THREE.WebGLRenderer({
    antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
// enbale the drawing of shadows
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

let body =  document.querySelector('body');
body.style.display = "block";

let scoreJ1 =  document.getElementById('j1').innerHTML;
let scoreJ2 =  document.getElementById('j2').innerHTML;
let indicationJ1 =  document.getElementById('indicationJ1').innerHTML;
let indicationJ2 =  document.getElementById('indicationJ2').innerHTML;
const modal = document.getElementById('myModal');
const resultat = document.querySelector('.resultat');
const panel = document.querySelectorAll('.score');
const span = document.getElementsByClassName("close")[0];
span.onclick = () => {
    modal.style.display = "none";
}




//Scene
const scene = new THREE.Scene();

//Lumiere ambiante
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(-15, 30, 95);

// controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);

const lights = Lights();
scene.add(lights.group);

const table = Table();
scene.add(table.group);

const game = Game();
scene.add(game.group);

const particlesJ1 = Particles();
particlesJ1.group.position.set(-2.5, 7, game.z-2.5);
scene.add(particlesJ1.group);

const particlesJ2 = Particles();
particlesJ2.group.position.set(-2.5, 7, -game.z-2.5);
scene.add(particlesJ2.group);

let direction= '-';
let yDestination = 2;
let win = false;
let touchable=true;

// const timer = () => {
//     let seconds = 5;
//     const interval = setInterval(() => {
//             seconds --;
//             if (seconds >=0) {
//                 document.getElementById('rebours').innerHTML = seconds;
//             }else {
//                 console.log(game.balle.position.z);
//                 direction == '-' ? direction = '+' : direction = '-';
//                 game.balle.position.z <0 ? game.balle.position.z = game.z : game.balle.position.z = -game.z;
//                 seconds=5;
//                 timer();
//             }
//     }, 1000);
// }


// const speed = game.z*2;

const randomAngle = (min,max) => {

    return Math.floor(Math.random() * (max-min)) + min;
    // return Math.floor(Math.random()*(max-min+1)+min);

}

const randomSpeed = (min,max) => {

    // return Math.floor(Math.random() * (max+min)) - min;
    return Math.floor(Math.random()*(max-min+1)+min);

}
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const handleClick = e => {


    // const speed = randomSpeed(75,150);
    const speed = randomSpeed(120,160);
    const angle = randomAngle(-8,8);
    // const angle = randomAngle(-40,40);
    // const speed = 140;
    // const angle = 0;

    e.preventDefault();
    mouse.x = e.clientX / window.innerWidth * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(game.group.children);

    if (intersects.length > 0 && intersects[0].object.uuid === game.balle.uuid && touchable==true) {

        console.log(angle);
        console.log(speed);
        if (angle >= -4 && angle <=4 && speed >= game.z*2-10 && speed <= game.z*2+10){
            // yDestination = 8;
            win = true;
            TweenMax.to(game.balle.position, 0.9, {
                x: '0',
                z: `${direction}=${game.z*2}`,
            });
            TweenMax.to(game.balle.position, 0.6, {
                y: 8,
                ease: Power2.easeIn,
            }).delay(0.3);
        }else {
            win = false;
            TweenMax.to(game.balle.position, 0.9, {
                x: angle,
                z: `${direction}=${speed}`,
            });
            TweenMax.to(game.balle.position, 0.6, {
                y: '2',
                ease: Power2.easeIn,
            }).delay(0.3);
        }




        touchable = false;

        const timeout1 = setTimeout(() => {

            if (win==true && game.balle.position.z < 0) {

                document.getElementById('resultat').innerHTML = "Dans le mille !";
                document.getElementById("imgResultat").src="img/best.png";
                resultat.style.display = "block";

                const timeout2 = setTimeout(() => {
                    document.getElementById('resultat').innerHTML = "";
                    resultat.style.display = "none";
                }, 2500);

                scoreJ1++;
                if (scoreJ1 == 5) modal.style.display = "block";
                document.getElementById('j1').innerHTML = scoreJ1/5;

            }else if (win == true && game.balle.position.z >0) {

                document.getElementById('resultat').innerHTML = "Dans le mille !";
                document.getElementById("imgResultat").src="img/best.png";
                resultat.style.display = "block";
                const timeout2 = setTimeout(() => {
                    document.getElementById('resultat').innerHTML = "";
                    resultat.style.display = "none";
                }, 2500);
                scoreJ2++;
                if (scoreJ2 == 5) modal.style.display = "block";
                document.getElementById('j2').innerHTML = scoreJ2/5;

            }else {

                document.getElementById('resultat').innerHTML = "Oups, raté...";
                document.getElementById("imgResultat").src="img/sad.png";
                resultat.style.display = "block";
                const timeout2 = setTimeout(() => {
                    document.getElementById('resultat').innerHTML = "";
                    resultat.style.display = "none";
                }, 2500);

            }

        }, 800);



        const timeout3 = setTimeout(() => {

            if (game.balle.position.z <0) {
                TweenMax.to(game.balle.position, 1.5, {
                    x: 0,
                    y: game.hauteurBalle,
                    z: -game.z,
                });
                direction='+';
            }else {
                TweenMax.to(game.balle.position, 1.5, {
                    x: 0,
                    y: game.hauteurBalle,
                    z: game.z,
                });
                direction='-';
            }

            touchable = true;

        }, 2000);

    }
};
addEventListener('click', handleClick);

// post processing
const composer = new THREE.EffectComposer(renderer);

const renderPass = new THREE.RenderPass(scene, camera);
const grainPass = new THREE.ShaderPass(THREE.FilmShader);
grainPass.renderToScreen = true;
grainPass.uniforms['grayscale'] = false;

composer.addPass(renderPass);
composer.addPass(grainPass);
// Fin de composer

let nb = 50;
let animation = true;
let hsl = 0;
const animate = timestamp => {

    if (game.balle.position.z == game.z) {
        document.getElementById('indicationJ1').innerHTML = 'À ton tour';
        document.getElementById('indicationJ2').innerHTML = 'En attente';
        document.getElementById("imgJ1").src="img/bottleCap.png";
        document.getElementById("imgJ2").src="img/wait.png";
    }else if (game.balle.position.z == -game.z) {
        document.getElementById('indicationJ2').innerHTML = 'À ton tour';
        document.getElementById('indicationJ1').innerHTML = 'En attente';
        document.getElementById("imgJ1").src="img/wait.png";
        document.getElementById("imgJ2").src="img/bottleCap.png";
    }
    if (hsl <=360) {
        document.querySelectorAll('.score').forEach(c => {
            c.style.backgroundColor = `hsl(${hsl},30%,60%)`;
        });
        modal.style.backgroundColor = `hsl(${hsl},50%,80%)`;
        span.style.color = `hsl(${hsl},50%,80%)`;
        hsl+=0.5;
    }else {
        hsl = 0;
    }

    if (nb <= 0) {
        game.geometryContenuVerre.vertices.forEach(v => {
            if (Math.random() < 0.5) v.y = Math.random() * 2;
        });
        game.geometryContenuVerre.verticesNeedUpdate = true;
        nb = 50;
    }
    nb --;

    if (animation==true) {
        // timer();
        animation = false
    }

    // stats.begin();

    // renderer.render(scene, camera);
    composer.render();
    // stats.end();
    requestAnimationFrame(animate);
};
animate();
