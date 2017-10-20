import * as THREE from 'three';

export default () => {

    const group = new THREE.Group();

    const angleProjection = 30 * (Math.PI / 180);
    const x = 0;
    const y = 40;
    const z = 100;
    const distance = 280;
    const decay = 3;
    const penombre = 0.9;

    const spotLight1 = new THREE.SpotLight(0x88aa88);
    spotLight1.angle = angleProjection;
    spotLight1.position.set(x, y, z);
    spotLight1.castShadow = true;
    spotLight1.distance = distance;
    spotLight1.decay = decay;
    spotLight1.penumbra = penombre;
    group.add(spotLight1);
    // const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
    // group.add(spotLightHelper1);

    //Lumiere2
    const spotLight2 = new THREE.SpotLight(0x88aa88);
    spotLight2.angle = angleProjection;
    spotLight2.position.set(x, y, -z);
    spotLight2.castShadow = true;
    spotLight2.distance = distance;
    spotLight2.decay = decay;
    spotLight2.penumbra = penombre;
    group.add(spotLight2);
    // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
    // group.add(spotLightHelper2);

    return { group };
};
