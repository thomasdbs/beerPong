import * as THREE from 'three';
import TweenMax from 'gsap';

const material = color =>
	new THREE.MeshPhongMaterial({
		color: color,
		side: THREE.DoubleSide,
		emissive: 0x000000,
		specular: 0xffffff,
		flatShading: true,
		transparent: true,
	});

const geometry = radius => new THREE.ConeGeometry(radius, radius, 3);

class Particle {
	constructor() {
		this.group = new THREE.Group();
		const size = Math.random();
		const up = new THREE.Mesh(geometry(size), material(0xFFFFFF));
		const down = up.clone();
		down.rotation.z = Math.PI;
		down.position.y = -size;
		this.group.add(up);
		this.group.add(down);
		this.group.position.set(Math.random()*4, Math.random(), Math.random()*4);
		this.canFart = true;
		this.group.visible = false;
	}

	fart() {
		if (this.canFart) {
			this.canFart = false;
			this.group.visible = true;
			const onComplete = () => {
				this.group.visible = false;
				this.canFart = true;
				this.group.position.set(Math.random(), Math.random(), Math.random());
				this.group.children.forEach(c => {
					c.material.opacity = 1;
				});
			};
			TweenMax.to(this.group.position, 1, {
				y: '+=3',
				x: () => {
					return this.group.position.x -2 + Math.random() * 4;
				},
				z: () => {
					return this.group.position.z -2 + Math.random() * 4;
				},
				ease: Power2.easeOut,
				onComplete,
			});
			this.group.children.forEach(c => {
				TweenMax.to(c.material, 2.5, {
					opacity: 0,
					ease: Power2.easeOut,
				});
			});
		}
	}
}

export default () => {
	const group = new THREE.Group();
	const particles = [];
	for (let i = 0; i <= 100; i++) {
		const p = new Particle();
		particles.push(p);
		group.add(p.group);
	}
	return { group, particles };
};
