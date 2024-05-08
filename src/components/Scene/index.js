import { Stars } from '@react-three/drei';

const Scene = ({ children }) => {
  return (
    <>
      <ambientLight intensity={1} />
      <directionalLight
        color="#f6f3ea"
        intensity={1.2}
        position={[2, 0, 2]}
      />
      <Stars
        radius={300}
        depth={60}
        count={20000}
        factor={7}
        saturation={0}
        fade={true}
      />
      {children}
    </>
  );
};

export default Scene;
