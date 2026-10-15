import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, Lightformer, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

const isSmall = typeof window !== 'undefined' && window.innerWidth < 768

function Blob() {
  const mesh = useRef()
  const mat = useRef()
  useFrame((state, delta) => {
    const scroll = window.scrollY / window.innerHeight
    const t = Math.min(scroll, 1.5)
    mesh.current.rotation.x += delta * 0.08
    mesh.current.rotation.y += delta * 0.12
    // drift right & shrink as the visitor scrolls past the hero
    const targetX = (isSmall ? 0.3 : 1.9) + t * (isSmall ? 1.6 : 2.6)
    const targetY = (isSmall ? 1.5 : 0) - t * 0.4
    mesh.current.position.x = THREE.MathUtils.damp(mesh.current.position.x, targetX, 3, delta)
    mesh.current.position.y = THREE.MathUtils.damp(mesh.current.position.y, targetY, 3, delta)
    const s = THREE.MathUtils.damp(mesh.current.scale.x, (isSmall ? 0.55 : 1) * (1 - t * 0.2), 3, delta)
    mesh.current.scale.setScalar(s)
    mat.current.distort = THREE.MathUtils.damp(mat.current.distort, 0.35 + Math.abs(state.pointer.x) * 0.2, 2, delta)
  })
  return (
    <Float speed={1.4} rotationIntensity={0.6} floatIntensity={0.8}>
      <mesh ref={mesh} position={[isSmall ? 0.3 : 1.9, isSmall ? 1.5 : 0, 0]}>
        <icosahedronGeometry args={[1.35, isSmall ? 48 : 96]} />
        <MeshDistortMaterial
          ref={mat}
          color="#e9e7ff"
          roughness={0.12}
          metalness={0.75}
          iridescence={1}
          iridescenceIOR={1.6}
          iridescenceThicknessRange={[100, 900]}
          clearcoat={1}
          distort={0.35}
          speed={1.6}
        />
      </mesh>
    </Float>
  )
}

function Rings() {
  const group = useRef()
  useFrame((_, delta) => {
    group.current.rotation.z += delta * 0.05
    group.current.rotation.x = Math.PI / 2.4 + Math.sin(performance.now() / 4000) * 0.1
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5)
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, (isSmall ? 0.3 : 1.9) + scroll * (isSmall ? 1.6 : 2.6), 3, delta)
    group.current.position.y = THREE.MathUtils.damp(group.current.position.y, (isSmall ? 1.5 : 0) - scroll * 0.4, 3, delta)
  })
  return (
    <group ref={group} scale={isSmall ? 0.6 : 1}>
      <mesh>
        <torusGeometry args={[2.3, 0.004, 8, 200]} />
        <meshBasicMaterial color="#c6ff3d" transparent opacity={0.55} />
      </mesh>
      <mesh rotation={[0.4, 0.2, 0]}>
        <torusGeometry args={[2.75, 0.003, 8, 200]} />
        <meshBasicMaterial color="#7c5cff" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

function Particles({ count = isSmall ? 700 : 1800 }) {
  const points = useRef()
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = r * Math.cos(phi) - 4
    }
    return arr
  }, [count])
  useFrame((state, delta) => {
    points.current.rotation.y += delta * 0.015
    points.current.rotation.x = THREE.MathUtils.damp(points.current.rotation.x, state.pointer.y * 0.15, 2, delta)
    points.current.rotation.z = THREE.MathUtils.damp(points.current.rotation.z, -state.pointer.x * 0.1, 2, delta)
  })
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.025} color="#d4d4ff" transparent opacity={0.7} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Rig() {
  useFrame((state, delta) => {
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, state.pointer.x * 0.4, 2, delta)
    state.camera.position.y = THREE.MathUtils.damp(state.camera.position.y, state.pointer.y * 0.3, 2, delta)
    state.camera.lookAt(0, 0, 0)
  })
  return null
}

export default function Scene() {
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      eventSource={document.getElementById('root')}
      eventPrefix="client"
    >
      <ambientLight intensity={0.4} />
      <directionalLight position={[3, 4, 5]} intensity={1.2} />
      <Blob />
      <Rings />
      <Particles />
      <Rig />
      {/* studio lighting built from light-formers: no HDR download needed */}
      <Environment resolution={256} background={false} frames={1}>
        <color attach="background" args={['#15122a']} />
        <group rotation={[-Math.PI / 3, 0, 1]}>
          <Lightformer form="rect" intensity={1.5} color="#7c5cff" position={[0, 0, -10]} scale={[30, 30, 1]} />
          <Lightformer form="rect" intensity={1.2} color="#c6ff3d" position={[0, -8, 0]} rotation-x={-Math.PI / 2} scale={[20, 20, 1]} />
          <Lightformer form="circle" intensity={4} color="#c6ff3d" position={[0, 5, -9]} scale={2} />
          <Lightformer form="circle" intensity={3} color="#7c5cff" position={[-5, 1, -1]} scale={3} />
          <Lightformer form="rect" intensity={2} color="#ffffff" position={[10, 1, 0]} scale={[10, 2, 1]} />
          <Lightformer form="ring" intensity={3} color="#ff5ca8" position={[-3, -4, 4]} scale={4} />
        </group>
      </Environment>
    </Canvas>
  )
}
