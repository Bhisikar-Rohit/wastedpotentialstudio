// App.js
import * as THREE from 'three';
import { useRef, useState } from 'react';
import { Canvas, createPortal, useFrame, useThree } from '@react-three/fiber';
import { useFBO, useGLTF, useScroll, Text, Image, Scroll, Preload, ScrollControls, MeshTransmissionMaterial } from '@react-three/drei';
import { easing } from 'maath';

export default function App() {
  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 15 }}>
        <ScrollControls damping={0.2} pages={2.90} distance={0.2}>
          <Lens>
            <Scroll>
              <Typography />
              <Images />
            </Scroll>
            <Scroll html>
              <div style={{ transform: 'translate3d(65vw, 192vh, 0)' }}>
                <br />
                <br />
                <br />
              </div>
            </Scroll>
            <Preload />
          </Lens>
        </ScrollControls>
      </Canvas>
    </div>
  );
}

function Lens({ children, damping = 0.15, ...props }) {
  const ref = useRef();
  const { nodes } = useGLTF('/lens-transformed.glb');
  const buffer = useFBO();
  const viewport = useThree((state) => state.viewport);
  const [scene] = useState(() => new THREE.Scene());
  useFrame((state, delta) => {
    const viewport = state.viewport.getCurrentViewport(state.camera, [0, 0, 15]);
    easing.damp3(
      ref.current.position,
      [(state.pointer.x * viewport.width) / 2, (state.pointer.y * viewport.height) / 2, 15],
      damping,
      delta
    );
    state.gl.setRenderTarget(buffer);
    state.gl.setClearColor('#d8d7d7');
    state.gl.render(scene, state.camera);
    state.gl.setRenderTarget(null);
  });
  return (
    <>
      {createPortal(children, scene)}
      <mesh scale={[viewport.width, viewport.height, 1]}>
        <planeGeometry />
        <meshBasicMaterial map={buffer.texture} transparent />
      </mesh>
      <mesh scale={0.25} ref={ref} rotation-x={Math.PI / 2} geometry={nodes.Cylinder.geometry} {...props}>
        <MeshTransmissionMaterial buffer={buffer.texture} ior={1.2} thickness={1.5} anisotropy={0.1} chromaticAberration={0.04} />
      </mesh>
    </>
  );
}

function Images() {
  const group = useRef();
  const data = useScroll();
  const { width, height } = useThree((state) => state.viewport);
  useFrame(() => {
    group.current.children[0].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[1].material.zoom = 1 + data.range(0, 1 / 3) / 3;
    group.current.children[2].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[3].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[4].material.zoom = 1 + data.range(1.15 / 3, 1 / 3) / 2;
    group.current.children[5].material.grayscale = 1 - data.range(1.6 / 3, 1 / 3);
    group.current.children[6].material.zoom = 1 + (1 - data.range(2 / 3, 1 / 3)) / 3;
  });
  return (
    <group ref={group}>
      <Image position={[-2, 0, 0]} scale={[4, height, 1]} url="/img1.jpg" />
      <Image position={[2, 0, 3]} scale={3} url="/img6.jpg" />
      <Image position={[-2.05, -height, 6]} scale={[1, 3, 1]} url="/trip2.jpg" />
      <Image position={[-0.6, -height, 9]} scale={[1, 2, 1]} url="/img8.jpg" />
      <Image position={[0.75, -height, 10.5]} scale={1.5} url="/trip4.jpg" />
      <Image position={[0, -height * 1.5, 7.5]} scale={[1.5, 3, 1]} url="/img3.jpg" />
      <Image position={[0, -height * 2 - height / 4, 0]} scale={[width, height / 1.1, 1]} url="/img7.jpg" />
    </group>
  );
}

function Typography() {
  const state = useThree();
  const { width, height } = state.viewport.getCurrentViewport(state.camera, [0, 0, 12]); // Corrected typo
  const shared = { font: '/Inter-Regular.woff', letterSpacing: -0.1, color: 'black' };
  return (
    <>
      <Text children="Wasted" anchorX="left" position={[-width / 2.5, -height / 10, 12]} {...shared} />
      <Text children="Potential" anchorX="right" position={[width / 2.5, -height * 2, 12]} {...shared} />
      <Text children="Studio" position={[0, -height * 4.624, 12]} {...shared} />
    </>
  );
}
