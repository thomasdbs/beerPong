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

    const geometryVerreExt = new THREE.CylinderGeometry(5, 3, 10, 8, 1, true, 0, 6.3);
    const verre1Ext = new THREE.Mesh(geometryVerreExt, material(0xCF0A1D));
    verre1Ext.position.set(0,5,60);
    const verre2Ext = new THREE.Mesh(geometryVerreExt, material(0xCF0A1D));
    verre2Ext.position.set(0,5,-60);

    const geometryFontVerre = new THREE.CylinderGeometry(2.9, 2.9, 0.1, 8);
    const fontVerre1 = new THREE.Mesh(geometryFontVerre, material(0xFFFFFF));
    fontVerre1.position.set(0,0.1,60);
    const fontVerre2 = new THREE.Mesh(geometryFontVerre, material(0xFFFFFF));
    fontVerre2.position.set(0,0.1,-60);

    const geometryVerreInt = new THREE.CylinderGeometry(4.9, 2.9, 10, 8, 1, true, 0, 6.3);
    const verre1Int = new THREE.Mesh(geometryVerreInt, material(0xFFFFFF));
    verre1Int.position.set(0,5,60);
    const verre2Int = new THREE.Mesh(geometryVerreInt, material(0xFFFFFF));
    verre2Int.position.set(0,5,-60);

    const geometryContenuVerre = new THREE.CylinderGeometry(4, 4, 0.1, 8);
    geometryContenuVerre.vertices.forEach(v => {
        if (Math.random() < 0.5) v.y += Math.random() * 2;
    });
    geometryContenuVerre.computeFaceNormals();
    geometryContenuVerre.computeVertexNormals();
    const contenuVerre1 = new THREE.Mesh(geometryContenuVerre, material(0x87CEFA));
    contenuVerre1.position.set(0,7,60);
    const contenuVerre2 = new THREE.Mesh(geometryContenuVerre, material(0x87CEFA));
    contenuVerre2.position.set(0,7,-60);

    const geometryBalle = new THREE.SphereGeometry(3,32,32);
    const balle = new THREE.Mesh(geometryBalle, material(0xFFFFFF));
    balle.position.set(0,20,60);

    group.add(verre1Ext);
    group.add(verre2Ext);
    group.add(verre1Int);
    group.add(verre2Int);
    group.add(fontVerre1);
    group.add(fontVerre2);
    group.add(contenuVerre1);
    group.add(contenuVerre2);
    group.add(balle);
    group.traverse(m => (m.castShadow = true));

    return { group, balle };
};
