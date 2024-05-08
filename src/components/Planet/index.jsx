import Scene from '../Scene';

import { TextureLoader } from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';

const Planet = ({planetMap}) => {
  const [map] = useLoader(TextureLoader, [planetMap]);

  const planetRef = useRef();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    planetRef.current.rotation.y = elapsedTime / 5;
  });

  return (
    <Scene>
      <mesh ref={planetRef} position={[0, 0, 3]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          map={map}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </Scene>
  );
};

export default Planet;
