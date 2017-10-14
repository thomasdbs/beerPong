import * as THREE from 'three';

export default () => {

    const group = new THREE.Group();

    const spotLight1 = new THREE.SpotLight(0x88aa88);
    spotLight1.angle = 30 * (Math.PI / 180);
    spotLight1.position.set(0, 40, 100);
    spotLight1.castShadow = true;
    spotLight1.distance = 200;
    spotLight1.decay = 2;
    spotLight1.penumbra = 0.9;
    group.add(spotLight1);
    // const spotLightHelper1 = new THREE.SpotLightHelper(spotLight1);
    // group.add(spotLightHelper1);

    //Lumiere2
    const spotLight2 = new THREE.SpotLight(0x88aa88);
    spotLight2.angle = 30 * (Math.PI / 180);
    spotLight2.position.set(0, 40, -100);
    spotLight2.castShadow = true;
    spotLight2.distance = 200;
    spotLight2.decay = 2;
    spotLight2.penumbra = 0.9;
    group.add(spotLight2);
    // const spotLightHelper2 = new THREE.SpotLightHelper(spotLight2);
    // group.add(spotLightHelper2);

    return { group };
};
