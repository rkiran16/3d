import { useRef } from 'react';

import { useFrame, useLoader } from '@react-three/fiber';

import venusMap from '../../assets/textures/8k_venus_surface.jpg';
import venusCloud from "../../assets/textures/4k_venus_atmosphere.jpg";

import { DoubleSide, TextureLoader } from 'three';
import Scene from '../Scene';


const Venus = () => {
    const [normalMap, cloudsMap] = useLoader(
        TextureLoader,
        [venusMap, venusCloud]
      );
    
      const venusRef = useRef();
      const cloudsRef = useRef();
    
      useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
    
        venusRef.current.rotation.y = elapsedTime / 6;
        cloudsRef.current.rotation.y = elapsedTime / 6;
      });
    
      return (
        <Scene>
          <mesh ref={cloudsRef} position={[0, 0, 3]}>
            <sphereGeometry args={[1.002, 32, 32]} />
            <meshPhongMaterial
              map={cloudsMap}
              depthWrite={true}
              transparent={true}
              side={DoubleSide}
            />
          </mesh>
          <mesh ref={venusRef} position={[0, 0, 3]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
              map={normalMap}
              metalness={0.4}
              roughness={0.7}
            />
          </mesh>
        </Scene>
      );
}


export default Venus;