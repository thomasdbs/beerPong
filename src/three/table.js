import * as THREE from 'three';

const material = color => new THREE.MeshPhongMaterial({
    color,
    side: THREE.DoubleSide,
    emissive: 0x000000,
    specular: 0xffffff,
    flatShading: true,
});

export default () => {

    const group = new THREE.Group();

    const geometryTable = new THREE.PlaneGeometry(100, 180, 32, 32);
    const table = new THREE.Mesh(geometryTable, material(0x3CB371));
    table.rotation.x = Math.PI / 2;
    table.receiveShadow = true;

    const geometryBandes = new THREE.PlaneGeometry(2, 180, 32, 32);
    const bandes = new THREE.Mesh(geometryBandes, material(0xFFFFFF));
    bandes.rotation.x = Math.PI / 2;
    bandes.position.y = 0.1;
    bandes.receiveShadow = true;

    const geometryFilet = new THREE.PlaneGeometry(8, 100, 32, 32);
    const filet = new THREE.Mesh(geometryFilet, material(0xFFFFFF));
    filet.rotation.z = - Math.PI / 2;
    filet.position.y = 4;
    filet.receiveShadow = true;

    //Ajout au groupe
    group.add(table);
    group.add(filet);
    group.add(bandes);
    // group.traverse(m => (m.castShadow = true));

    return { group };
};
