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

    const geometryTable = new THREE.BoxGeometry(largeurTable, longueurTable, 2);
    const table = new THREE.Mesh(geometryTable, material(0x3CB371));
    table.rotation.x = rotation;
    table.position.y = -1;
    table.receiveShadow = true;

    const geometryPieds = new THREE.BoxGeometry(5, 70, 5);
    const pied1 = new THREE.Mesh(geometryPieds, material(0xE7E7E7));
    pied1.rotation.y = rotation;
    pied1.position.x = largeurTable/2 -10;
    pied1.position.y = -36;
    pied1.position.z = longueurTable/2 -10;
    pied1.receiveShadow = true;
    const pied2 = new THREE.Mesh(geometryPieds, material(0xE7E7E7));
    pied2.rotation.y = rotation;
    pied2.position.x = -largeurTable/2 +10;
    pied2.position.y = -36;
    pied2.position.z = longueurTable/2 -10;
    pied2.receiveShadow = true;
    const pied3 = new THREE.Mesh(geometryPieds, material(0xE7E7E7));
    pied3.rotation.y = rotation;
    pied3.position.x = largeurTable/2 -10;
    pied3.position.y = -36;
    pied3.position.z = -longueurTable/2 +10;
    pied3.receiveShadow = true;
    const pied4 = new THREE.Mesh(geometryPieds, material(0xE7E7E7));
    pied4.rotation.y = rotation;
    pied4.position.x = -largeurTable/2 +10;
    pied4.position.y = -36;
    pied4.position.z = -longueurTable/2 +10;
    pied4.receiveShadow = true;

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
    group.add(pied1);
    group.add(pied2);
    group.add(pied3);
    group.add(pied4);
    group.add(filet);
    group.add(bandes);
    // group.traverse(m => (m.castShadow = true));

    return { group };
};
