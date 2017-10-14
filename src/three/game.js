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

    const diametreHautVerre = 5;
    const diametreBasVerre = 3;
    const hauteurVerre = 10;
    const detailsVerre = 8;
    const x=0;
    const y=hauteurVerre/2;
    const z=70;
    const hauteurBalle=20;

    const geometryVerreExt = new THREE.CylinderGeometry(diametreHautVerre, diametreBasVerre, hauteurVerre, detailsVerre, 1, true, 0, 6.3);
    const verre1Ext = new THREE.Mesh(geometryVerreExt, material(0xCF0A1D));
    verre1Ext.position.set(x,y,z);
    const verre2Ext = new THREE.Mesh(geometryVerreExt, material(0xCF0A1D));
    verre2Ext.position.set(x,y,-z);

    const geometryFontVerre = new THREE.CylinderGeometry(diametreBasVerre-0.1, diametreBasVerre-0.1, 0.1, detailsVerre);
    const fontVerre1 = new THREE.Mesh(geometryFontVerre, material(0xFFFFFF));
    fontVerre1.position.set(x,0.1,z);
    const fontVerre2 = new THREE.Mesh(geometryFontVerre, material(0xFFFFFF));
    fontVerre2.position.set(x,0.1,-z);

    const geometryVerreInt = new THREE.CylinderGeometry(diametreHautVerre-0.1, diametreBasVerre-0.1, hauteurVerre, detailsVerre, 1, true, 0, 6.3);
    const verre1Int = new THREE.Mesh(geometryVerreInt, material(0xFFFFFF));
    verre1Int.position.set(x,y,z);
    const verre2Int = new THREE.Mesh(geometryVerreInt, material(0xFFFFFF));
    verre2Int.position.set(x,y,-z);

    const geometryContenuVerre = new THREE.CylinderGeometry(4, 4, 0.1, detailsVerre);
    geometryContenuVerre.vertices.forEach(v => {
        if (Math.random() < 0.5) v.y += Math.random() * 2;
    });
    geometryContenuVerre.computeFaceNormals();
    geometryContenuVerre.computeVertexNormals();
    geometryContenuVerre.__dirtyNormals = true;
    geometryContenuVerre.verticesNeedUpdate = true;
    const contenuVerre1 = new THREE.Mesh(geometryContenuVerre, material(0xF9AB01));
    contenuVerre1.position.set(x,7,z);
    const contenuVerre2 = new THREE.Mesh(geometryContenuVerre, material(0xF9AB01));
    contenuVerre2.position.set(x,7,-z);

    const geometryBalle = new THREE.SphereGeometry(2,32,32);
    const balle = new THREE.Mesh(geometryBalle, material(0xFFFFFF));
    balle.position.set(x,hauteurBalle,z);

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

    return { group, balle, z, hauteurBalle, geometryContenuVerre };
};
