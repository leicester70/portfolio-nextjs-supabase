"use client";
import { Canvas } from "@react-three/fiber";
import PetsLayout from "../PetsLayout";
import Box from "@/lib/pets_lib/meshes/Box";

export default function Page() {
  return (
    <PetsLayout>
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          decay={0}
          intensity={Math.PI}
        />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <Box position={[-1.2, 0, 0]} />
        <Box position={[1.2, 0, 0]} />
      </Canvas>
    </PetsLayout>
  );
}
