import * as THREE from 'three';
import Stats from 'stats.js';
import './index.css';
import threeOrbitControls from './utils/OrbitControls';
import TweenMax from 'gsap';

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

//Groupes
const terrain = new THREE.Group();
const verres = new THREE.Group();
const balles = new THREE.Group();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(-15, 30, 95);

// controls
const controls = new OrbitControls(camera, renderer.domElement);

// axis helper
const axisHelper = new THREE.AxisHelper(100);
scene.add(axisHelper);

//Lumiere ambiante
const light = new THREE.AmbientLight(0x888888);
scene.add(light);

//Lumiere1
const spotLight1 = new THREE.SpotLight(0x88aa88);
spotLight1.angle = 30 * (Math.PI / 180);
spotLight1.position.set(0, 40, 100);
spotLight1.castShadow = true;
spotLight1.distance = 200;
spotLight1.decay = 2;
spotLight1.penumbra = 0.9;
scene.add(spotLight1);
// const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
// scene.add(spotLightHelper1);

//Lumiere2
const spotLight2 = new THREE.SpotLight(0x88aa88);
spotLight2.angle = 30 * (Math.PI / 180);
spotLight2.position.set(0, 40, -100);
spotLight2.castShadow = true;
spotLight2.distance = 200;
spotLight2.decay = 2;
spotLight2.penumbra = 0.9;
scene.add(spotLight2);
// const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
// scene.add(spotLightHelper2);


//Materiaux
const materialTable = new THREE.MeshPhongMaterial({
	emissive: 0x000000,
	specular: 0x888888,
	color: 0x3CB371,
	side: THREE.DoubleSide,
});

const materialVerreExt = new THREE.MeshPhongMaterial({
	emissive: 0x000000,
	specular: 0x888888,
	color: 0xCF0A1D,
	side: THREE.DoubleSide,
});

const materialBalle = new THREE.MeshPhongMaterial({
	emissive: 0x000000,
	specular: 0x888888,
	color: 0xFFFFFF,
	side: THREE.DoubleSide,
});

const materialWhite = new THREE.MeshPhongMaterial({
	emissive: 0x000000,
	specular: 0x888888,
	color: 0xFFFFFF,
	side: THREE.DoubleSide,
});

const materialEau = new THREE.MeshPhongMaterial({
	emissive: 0x000000,
	specular: 0x888888,
	color: 0x87CEFA,
	side: THREE.DoubleSide,
});


//Table
const geometryTable = new THREE.PlaneGeometry(100, 180, 32, 32);
const table = new THREE.Mesh(geometryTable, materialTable);
table.rotation.x = Math.PI / 2;
table.receiveShadow = true;

const geometryBandes = new THREE.PlaneGeometry(2, 180, 32, 32);
const bandes = new THREE.Mesh(geometryBandes, materialWhite);
bandes.rotation.x = Math.PI / 2;
bandes.position.y = 0.1;
bandes.receiveShadow = true;

const geometryFilet = new THREE.PlaneGeometry(8, 100, 32, 32);
const filet = new THREE.Mesh(geometryFilet, materialWhite);
filet.rotation.z = - Math.PI / 2;
filet.position.y = 4;
filet.receiveShadow = true;

const geometryVerreExt = new THREE.CylinderGeometry(5, 3, 10, 8, 1, true, 0, 6.3);
const verre1Ext = new THREE.Mesh(geometryVerreExt, materialVerreExt);
verre1Ext.position.set(0,5,60);
verre1Ext.receiveShadow = true;
const verre2Ext = new THREE.Mesh(geometryVerreExt, materialVerreExt);
verre2Ext.position.set(0,5,-60);
verre2Ext.receiveShadow = true;

const geometryFontVerre = new THREE.CylinderGeometry(2.9, 2.9, 0.1, 8);
const fontVerre1 = new THREE.Mesh(geometryFontVerre, materialWhite);
fontVerre1.position.set(0,0.1,60);
fontVerre1.receiveShadow = true;
const fontVerre2 = new THREE.Mesh(geometryFontVerre, materialWhite);
fontVerre2.position.set(0,0.1,-60);
fontVerre2.receiveShadow = true;

const geometryVerreInt = new THREE.CylinderGeometry(4.9, 2.9, 10, 8, 1, true, 0, 6.3);
const verre1Int = new THREE.Mesh(geometryVerreInt, materialWhite);
verre1Int.position.set(0,5,60);
verre1Int.receiveShadow = true;
const verre2Int = new THREE.Mesh(geometryVerreInt, materialWhite);
verre2Int.position.set(0,5,-60);
verre2Int.receiveShadow = true;

const geometryContenuVerre = new THREE.CylinderGeometry(4, 4, 0.1, 8);
geometryContenuVerre.vertices.forEach(v => {
	if (Math.random() < 0.5) v.y += Math.random() * 2;
});
geometryContenuVerre.computeFaceNormals();
geometryContenuVerre.computeVertexNormals();
const contenuVerre1 = new THREE.Mesh(geometryContenuVerre, materialEau);
contenuVerre1.position.set(0,7,60);
contenuVerre1.receiveShadow = true;
const contenuVerre2 = new THREE.Mesh(geometryContenuVerre, materialEau);
contenuVerre2.position.set(0,7,-60);
contenuVerre2.receiveShadow = true;

const geometryBalle = new THREE.SphereGeometry(3,32,32);
const balle = new THREE.Mesh(geometryBalle, materialBalle);
balle.position.set(0,20,60);
balle.receiveShadow = true;

//Ajout au groupe
terrain.add(table);
terrain.add(filet);
terrain.add(bandes);
verres.add(verre1Ext);
verres.add(verre2Ext);
verres.add(verre1Int);
verres.add(verre2Int);
verres.add(fontVerre1);
verres.add(fontVerre2);
verres.add(contenuVerre1);
verres.add(contenuVerre2);
balles.add(balle);

//Ajout a la scene
scene.add(terrain);
scene.add(verres);
scene.add(balles);


// function trajectoire(angle, speed){
// 	TweenMax.to(balle.position, 0.9, {
// 		x: angle,
// 		z: `-=${speed}`,
// 	});
// 	TweenMax.to(balle.position, 0.6, {
// 		y: '3',
// 		ease: Power2.easeIn,
// 	}).delay(0.3);
// }
//
// function descente(){
// 	balle.position.y >= 1.5 ? balle.position.set(balle.position.x, balle.position.y-0.2, balle.position.z-0.2) : null ;
// }

// let animation=true;
const animate = timestamp => {

	stats.begin();
	// if (animation===true) trajectoire(0,120);
	// animation=false;


	renderer.render(scene, camera);
	stats.end();
	requestAnimationFrame(animate);
};
animate();
