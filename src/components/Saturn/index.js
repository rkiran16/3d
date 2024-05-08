import { useRef } from 'react';

import { useFrame, useLoader } from '@react-three/fiber';

import SaturnMap from '../../assets/textures/8k_saturn.jpg';
import SaturnRings from '../../assets/textures/8k_saturn_ring_alpha.png';

import { DoubleSide, TextureLoader } from 'three';
import Scene from '../Scene';

const Saturn = () => {
  const [colorMap, rings] = useLoader(TextureLoader, [
    SaturnMap,
    SaturnRings,
  ]);

  const saturnRef = useRef();
  const ringsRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();

    saturnRef.current.rotation.y = elapsedTime / 6;
    //cloudsRef.current.rotation.x = elapsedTime / 6;
  });

  return (
    <Scene>
      <group>
        <mesh ref={saturnRef}>
          <sphereGeometry args={[2, 32, 32]} />
          <meshStandardMaterial
            map={colorMap}
            metalness={0.4}
            roughness={0.7}
          />
        </mesh>
        <mesh ref={ringsRef} rotation-x={Math.PI / 2}>
          <torusGeometry args={[1.8, 0.5, 2, 200]} />
          <meshPhongMaterial
            map={rings}
            opacity={0.6}
            depthWrite={true}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
      </group>
    </Scene>
  );
};

export default Saturn;
