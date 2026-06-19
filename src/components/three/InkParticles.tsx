import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePreferences } from "@/store/preferences";

function Particles() {
  const ref = useRef<THREE.Points>(null);
  const theme = usePreferences((s) => s.theme);
  const timeRef = useRef(0);

  const { positions, count } = useMemo(() => {
    const c = 1000; // Reduced from 1400 for better performance
    const p = new Float32Array(c * 3);
    for (let i = 0; i < c; i++) {
      p[i * 3 + 0] = (Math.random() - 0.5) * 14;
      p[i * 3 + 1] = (Math.random() - 0.5) * 9;
      p[i * 3 + 2] = (Math.random() - 0.5) * 4;
    }
    return { positions: p, count: c };
  }, []);

  useFrame(({ mouse, delta }) => {
    if (!ref.current) return;
    
    // Use delta time instead of elapsed time for smoother animations
    timeRef.current += delta;
    const t = timeRef.current;
    
    // Optimize: Use cheaper calculations
    ref.current.rotation.y = (t * 0.02 + mouse.x * 0.15) * 0.5; // Reduced speed
    ref.current.rotation.x = (-t * 0.01 + mouse.y * 0.1) * 0.5;
  });

  const color = theme === "dark" ? "#f5f3ee" : "#0d0d0d";

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.012}
        color={color}
        transparent
        opacity={0.55}
        sizeAttenuation
      />
    </points>
  );
}

export default function InkParticles() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 5], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }} // Dynamic quality scaling
    >
      <Particles />
    </Canvas>
  );
}