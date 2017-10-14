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

    const largeurTable = 100;
    const longueurTable = 180;
    const epaisseurBandes = 2;
    const hauteurFilet = 8;
    const rotation = Math.PI / 2;

    const geometryTable = new THREE.PlaneGeometry(largeurTable, longueurTable, 1, 1);
    const table = new THREE.Mesh(geometryTable, material(0x3CB371));
    table.rotation.x = rotation;
    table.receiveShadow = true;

    const geometryBandes = new THREE.PlaneGeometry(epaisseurBandes, longueurTable, 1, 1);
    const bandes = new THREE.Mesh(geometryBandes, material(0xFFFFFF));
    bandes.rotation.x = rotation;
    bandes.position.y = 0.1;
    bandes.receiveShadow = true;

    const geometryFilet = new THREE.PlaneGeometry(hauteurFilet, largeurTable, 1, 1);
    const filet = new THREE.Mesh(geometryFilet, material(0xFFFFFF));
    filet.rotation.z = -rotation;
    filet.position.y = hauteurFilet/2;
    filet.receiveShadow = true;

    //Ajout au groupe
    group.add(table);
    group.add(filet);
    group.add(bandes);
    // group.traverse(m => (m.castShadow = true));

    return { group };
};
