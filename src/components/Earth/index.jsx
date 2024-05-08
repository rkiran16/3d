import { useRef } from 'react';

import { useFrame, useLoader } from '@react-three/fiber';

import EarthDayMap from '../../assets/textures/8k_earth_daymap.jpg';
import EarthNormalMap from '../../assets/textures/8k_earth_normal_map.jpg';
import EarthSpecularMap from '../../assets/textures/8k_earth_specular_map.jpg';
import EarthCloudsMap from '../../assets/textures/8k_earth_clouds.jpg';

import { DoubleSide, TextureLoader } from 'three';
import Scene from '../Scene';


const Earth = () => {
    const [colorMap, normalMap, specularMap, cloudsMap] = useLoader(
        TextureLoader,
        [EarthDayMap, EarthNormalMap, EarthSpecularMap, EarthCloudsMap]
      );
    
      const earthRef = useRef();
      const cloudsRef = useRef();
    
      useFrame(({ clock }) => {
        const elapsedTime = clock.getElapsedTime();
    
        earthRef.current.rotation.y = elapsedTime / 6;
        cloudsRef.current.rotation.y = elapsedTime / 6;
      });
    
      return (
        <Scene>
          <mesh ref={cloudsRef} position={[0, 0, 3]}>
            <sphereGeometry args={[1.005, 32, 32]} />
            <meshPhongMaterial
              map={cloudsMap}
              opacity={0.4}
              depthWrite={true}
              transparent={true}
              side={DoubleSide}
            />
          </mesh>
          <mesh ref={earthRef} position={[0, 0, 3]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial specularMap={specularMap} />
            <meshStandardMaterial
              map={colorMap}
              normalMap={normalMap}
              metalness={0.4}
              roughness={0.7}
            />
          </mesh>
        </Scene>
      );
}


export default Earth;