"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const particleVertexShader = `
uniform float u_time;
attribute float a_scale;
varying vec3 vColor;

void main() {
  vec3 pos = position;
  
  // Flow movement
  pos.y += sin(u_time * 0.5 + pos.x * 0.5) * 0.2;
  pos.x += cos(u_time * 0.3 + pos.z * 0.5) * 0.1;
  
  vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
  gl_PointSize = a_scale * (300.0 / -mvPosition.z);
  gl_Position = projectionMatrix * mvPosition;
  
  // Color gradient based on height
  vColor = mix(vec3(0.0, 0.37, 1.0), vec3(0.67, 1.0, 0.2), (pos.y + 2.0) * 0.25);
}
`;

const particleFragmentShader = `
varying vec3 vColor;

void main() {
  if (length(gl_PointCoord - vec2(0.5, 0.5)) > 0.475) discard;
  gl_FragColor = vec4(vColor, 1.0);
}
`;

export function ParticleSystem({ count = 2000 }) {
    const mesh = useRef<THREE.Points>(null);

    const { positions, scales } = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const scales = new Float32Array(count);

        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5; // Depth
            scales[i] = Math.random();
        }

        return { positions, scales };
    }, [count]);

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
        }),
        []
    );

    useFrame((state) => {
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value = state.clock.getElapsedTime();
            mesh.current.rotation.y = state.clock.getElapsedTime() * 0.05;
        }
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-a_scale"
                    count={scales.length}
                    array={scales}
                    itemSize={1}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={particleVertexShader}
                fragmentShader={particleFragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
