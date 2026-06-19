import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { usePreferences } from "@/store/preferences";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const theme = usePreferences((s) => s.theme);

  const count = 320;

  const { positions } = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Cluster particles loosely in a layered field
      const r = Math.random() * 7 + 1;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      p[i * 3 + 0] = r * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      p[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return { positions: p };
  }, []);

  // Build constellation lines between nearby particles
  const linePositions = useMemo(() => {
    const threshold = 1.8;
    const verts: number[] = [];
    for (let i = 0; i < count; i++) {
      for (let j = i + 1; j < count; j++) {
        const dx = positions[i * 3] - positions[j * 3];
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1];
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < threshold) {
          verts.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          );
        }
      }
    }
    return new Float32Array(verts);
  }, [positions]);

  // Per-particle drift speeds
  const driftSpeeds = useMemo(() => {
    const s = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      s[i] = (Math.random() - 0.5) * 0.004;
    }
    return s;
  }, []);

  // Per-particle phase offsets for sinusoidal drift
  const phases = useMemo(() => {
    const ph = new Float32Array(count);
    for (let i = 0; i < count; i++) ph[i] = Math.random() * Math.PI * 2;
    return ph;
  }, []);

  const isDark = theme === "dark";
  const particleColor = isDark ? "#c8c3bb" : "#2a2621";
  const lineColor = isDark ? "#9a9188" : "#6b6560";

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      for (let i = 0; i < count; i++) {
        const ox = positions[i * 3 + 0];
        const oy = positions[i * 3 + 1];
        const phase = phases[i];
        pos.setX(i, ox + Math.sin(t * 0.18 + phase) * 0.22 + driftSpeeds[i * 3] * t * 8);
        pos.setY(i, oy + Math.cos(t * 0.14 + phase * 1.3) * 0.15 + driftSpeeds[i * 3 + 1] * t * 6);
        pos.setZ(i, positions[i * 3 + 2] + Math.sin(t * 0.1 + phase * 0.7) * 0.1);
      }
      pos.needsUpdate = true;

      pointsRef.current.rotation.y = t * 0.012;
      pointsRef.current.rotation.x = Math.sin(t * 0.06) * 0.04;
    }

    if (linesRef.current) {
      linesRef.current.rotation.y = t * 0.012;
      linesRef.current.rotation.x = Math.sin(t * 0.06) * 0.04;
    }
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[positions.slice(), 3]}
            count={count}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.045}
          color={particleColor}
          transparent
          opacity={0.7}
          sizeAttenuation
          vertexColors={false}
        />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={lineColor}
          transparent
          opacity={0.18}
        />
      </lineSegments>
    </>
  );
}

export default function InkParticles() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 8], fov: 55 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      performance={{ min: 0.5 }}
    >
      <ambientLight intensity={0.4} />
      <Particles />
    </Canvas>
  );
}
