"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const fragmentShader = `
uniform float u_time;
uniform vec2 u_mouse;
uniform vec3 u_color_base;
uniform vec3 u_color_accent_a;
uniform vec3 u_color_accent_b;
varying vec2 vUv;

// Simplex 3D Noise 
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 uv = vUv;
  
  // Noise field
  float noise = snoise(vec2(uv.x * 3.0 + u_time * 0.1, uv.y * 3.0 - u_time * 0.15));
  
  // Mouse interaction
  float dist = distance(uv, u_mouse);
  float interaction = smoothstep(0.4, 0.0, dist) * 0.5;
  
  // Mix colors
  vec3 color = mix(u_color_base, u_color_accent_a, noise * 0.5 + interaction);
  color = mix(color, u_color_accent_b, interaction * noise);
  
  gl_FragColor = vec4(color, 1.0);
}
`;

export function LiquidBackground() {
    const mesh = useRef<THREE.Mesh>(null);
    const { viewport } = useThree();

    const uniforms = useMemo(
        () => ({
            u_time: { value: 0 },
            u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
            u_color_base: { value: new THREE.Color("#1a1b26") },
            u_color_accent_a: { value: new THREE.Color("#005eff") },
            u_color_accent_b: { value: new THREE.Color("#abff32") },
        }),
        []
    );

    useFrame((state) => {
        const { clock, pointer } = state;
        if (mesh.current) {
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_time.value = clock.getElapsedTime();
            // Pointer is -1 to 1, map to 0 to 1
            (mesh.current.material as THREE.ShaderMaterial).uniforms.u_mouse.value.set(
                pointer.x * 0.5 + 0.5,
                pointer.y * 0.5 + 0.5
            );
        }
    });

    return (
        <mesh ref={mesh} scale={[viewport.width, viewport.height, 1]}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
            />
        </mesh>
    );
}
