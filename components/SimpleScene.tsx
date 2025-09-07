import { Box, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';

export const SimpleScene = () => {
  return (
    <Canvas>
      <OrbitControls />
      <ambientLight />
      <pointLight position={[10, 10, 10]} intensity={10} />
      <Box args={[1, 1, 1]}>
        <meshStandardMaterial color="red" />
      </Box>
    </Canvas>
  );
};
