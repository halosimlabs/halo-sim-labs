import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, Suspense, useMemo } from 'react'
import * as THREE from 'three'

// ── Set scene background ──────────────────────────────────────────────────────

function SceneBackground() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#7ab8e8')
  }, [scene])
  return null
}

// ── South African school playground ──────────────────────────────────────────

function SchoolPlayground() {
  return (
    <>
      {/* Concrete ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color="#9e9e8e" roughness={0.95} metalness={0.0} />
      </mesh>

      {/* Grass patches beyond the concrete */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, -18]}>
        <planeGeometry args={[60, 20]} />
        <meshStandardMaterial color="#5a8a3a" roughness={1} />
      </mesh>

      {/* Concrete cracks / painted lines */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.005, -4]}>
        <planeGeometry args={[0.06, 20]} />
        <meshStandardMaterial color="#8a8a7a" roughness={1} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[3, 0.005, -4]}>
        <planeGeometry args={[0.06, 20]} />
        <meshStandardMaterial color="#8a8a7a" roughness={1} />
      </mesh>

      {/* ── School building back wall ── */}
      {/* Main wall — cream upper */}
      <mesh position={[0, 4, -10]} receiveShadow>
        <planeGeometry args={[26, 8]} />
        <meshStandardMaterial color="#e0d8c0" roughness={0.9} />
      </mesh>
      {/* Bottle green wainscot lower */}
      <mesh position={[0, 1.1, -9.97]}>
        <planeGeometry args={[26, 2.2]} />
        <meshStandardMaterial color="#2d5a3d" roughness={0.85} />
      </mesh>
      {/* Dividing stripe */}
      <mesh position={[0, 2.22, -9.96]}>
        <planeGeometry args={[26, 0.07]} />
        <meshStandardMaterial color="#1a3d28" roughness={0.7} />
      </mesh>

      {/* Classroom windows in back wall */}
      {[-6, -1, 4].map((x) => (
        <group key={x} position={[x, 3.2, -9.9]}>
          {/* Window frame */}
          <mesh>
            <boxGeometry args={[2.2, 1.8, 0.08]} />
            <meshStandardMaterial color="#888870" roughness={0.4} metalness={0.4} />
          </mesh>
          {/* Glass */}
          <mesh position={[0, 0, 0.05]}>
            <planeGeometry args={[2.0, 1.6]} />
            <meshStandardMaterial color="#b8d0e8" roughness={0.05} metalness={0.1} transparent opacity={0.55} />
          </mesh>
          {/* Window mullion */}
          <mesh position={[0, 0, 0.06]}>
            <boxGeometry args={[0.05, 1.6, 0.02]} />
            <meshStandardMaterial color="#888870" roughness={0.4} />
          </mesh>
        </group>
      ))}

      {/* Doors in back wall */}
      {[-9, 9].map((x) => (
        <group key={x} position={[x, 1.5, -9.88]}>
          <mesh>
            <boxGeometry args={[1.1, 3.0, 0.1]} />
            <meshStandardMaterial color="#4a3018" roughness={0.7} />
          </mesh>
          <mesh position={[0, 0.4, 0.06]}>
            <planeGeometry args={[0.5, 0.6]} />
            <meshStandardMaterial color="#c0d4e8" roughness={0.1} transparent opacity={0.5} />
          </mesh>
        </group>
      ))}

      {/* School name on building */}
      <mesh position={[0, 6.5, -9.95]}>
        <planeGeometry args={[5, 0.6]} />
        <meshStandardMaterial color="#8b1a1a" roughness={0.8} />
      </mesh>

      {/* Roof overhang */}
      <mesh position={[0, 8.0, -8.5]} rotation={[0.15, 0, 0]}>
        <boxGeometry args={[26, 0.2, 2.5]} />
        <meshStandardMaterial color="#c8b898" roughness={0.8} />
      </mesh>

      {/* ── Chain-link fence far back ── */}
      {Array.from({ length: 28 }, (_, i) => i - 14).map((x) => (
        <mesh key={x} position={[x, 1.0, -14]}>
          <boxGeometry args={[0.04, 2.0, 0.04]} />
          <meshStandardMaterial color="#909080" roughness={0.5} metalness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 2.0, -14]}>
        <boxGeometry args={[28, 0.06, 0.04]} />
        <meshStandardMaterial color="#909080" roughness={0.5} metalness={0.5} />
      </mesh>
      <mesh position={[0, 0.0, -14]}>
        <boxGeometry args={[28, 0.06, 0.04]} />
        <meshStandardMaterial color="#909080" roughness={0.5} metalness={0.5} />
      </mesh>

      {/* ── Concrete bench — left side ── */}
      <mesh position={[-5, 0.22, 1]} castShadow>
        <boxGeometry args={[2.2, 0.12, 0.4]} />
        <meshStandardMaterial color="#b0aca0" roughness={0.9} />
      </mesh>
      <mesh position={[-4.5, 0.1, 1]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.4]} />
        <meshStandardMaterial color="#a0a090" roughness={0.9} />
      </mesh>
      <mesh position={[-5.5, 0.1, 1]} castShadow>
        <boxGeometry args={[0.12, 0.2, 0.4]} />
        <meshStandardMaterial color="#a0a090" roughness={0.9} />
      </mesh>

      {/* ── Basketball hoop pole — far right ── */}
      <mesh position={[7, 2.5, -6]} castShadow>
        <boxGeometry args={[0.12, 5.0, 0.12]} />
        <meshStandardMaterial color="#606060" roughness={0.5} metalness={0.6} />
      </mesh>
      {/* Backboard */}
      <mesh position={[7, 5.2, -6.5]}>
        <boxGeometry args={[1.2, 0.9, 0.06]} />
        <meshStandardMaterial color="#e0e0d8" roughness={0.6} />
      </mesh>
      {/* Rim */}
      <mesh position={[7, 4.7, -6.3]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.23, 0.025, 8, 20]} />
        <meshStandardMaterial color="#d05020" roughness={0.4} metalness={0.5} />
      </mesh>

      {/* ── Small tree — left back ── */}
      <mesh position={[-8, 1.5, -8]} castShadow>
        <cylinderGeometry args={[0.12, 0.18, 3.0, 8]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.9} />
      </mesh>
      <mesh position={[-8, 3.8, -8]} castShadow>
        <sphereGeometry args={[1.4, 10, 8]} />
        <meshStandardMaterial color="#3a6e28" roughness={1} />
      </mesh>

      {/* Another tree right */}
      <mesh position={[9, 1.2, -9]} castShadow>
        <cylinderGeometry args={[0.1, 0.15, 2.4, 8]} />
        <meshStandardMaterial color="#5c3d1e" roughness={0.9} />
      </mesh>
      <mesh position={[9, 3.2, -9]} castShadow>
        <sphereGeometry args={[1.2, 10, 8]} />
        <meshStandardMaterial color="#4a7e30" roughness={1} />
      </mesh>
    </>
  )
}

// ── Character ─────────────────────────────────────────────────────────────────

function Character({ url, position, rotation, isActive }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const clonedScene = useRef(null)
  if (!clonedScene.current) clonedScene.current = scene.clone(true)
  const { actions, names } = useAnimations(animations, group)

  useEffect(() => {
    if (names.length > 0) {
      const action =
        actions['idle'] || actions['Idle'] || actions['mixamo.com'] || actions[names[0]]
      if (action) action.reset().fadeIn(0.3).play()
    }
  }, [actions, names])

  useFrame((state) => {
    if (group.current && names.length === 0) {
      group.current.position.y =
        position[1] + Math.sin(state.clock.elapsedTime * 1.2 + position[0]) * 0.012
    }
  })

  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const applyEmissive = (m) => {
          const mc = m.clone()
          mc.emissive = new THREE.Color(isActive ? 0x222233 : 0x000000)
          return mc
        }
        child.material = Array.isArray(child.material)
          ? child.material.map(applyEmissive)
          : applyEmissive(child.material)
      }
    })
  }, [isActive])

  return (
    <primitive
      ref={group}
      object={clonedScene.current}
      position={position}
      rotation={rotation}
    />
  )
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function SceneContents({ activeCharacter }) {
  return (
    <>
      <SceneBackground />

      {/* Outdoor sunlight — bright SA midday sun */}
      <directionalLight position={[8, 12, 4]} intensity={2.2} color="#fff8e8" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <ambientLight intensity={0.7} color="#d8eaff" />
      <hemisphereLight args={['#87ceeb', '#8a7a60', 0.5]} />

      <SchoolPlayground />

      <Suspense fallback={null}>
        <Character
          url="/assets/models/Melissa.glb"
          position={[-2.2, 1.1, 0.5]}
          rotation={[0, Math.PI * 0.2, 0]}
          isActive={activeCharacter === 'melissa'}
        />
        <Character
          url="/assets/models/Kelly.glb"
          position={[0.5, 1.1, -0.5]}
          rotation={[0, -Math.PI * 0.15, 0]}
          isActive={activeCharacter === 'kelly'}
        />
        <Character
          url="/assets/models/Sthandile.glb"
          position={[1.8, 1.1, 0]}
          rotation={[0, -Math.PI * 0.25, 0]}
          isActive={activeCharacter === 'sthandile'}
        />
        <Character
          url="/assets/models/Nadine.glb"
          position={[0.7, 1.1, 0.8]}
          rotation={[0, -Math.PI * 0.1, 0]}
          isActive={activeCharacter === 'nadine'}
        />
      </Suspense>
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function ThreeScene({ activeCharacter }) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 1.65, 5.5], fov: 52 }}
      shadows
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.1 }}
    >
      <SceneContents activeCharacter={activeCharacter} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/Melissa.glb')
useGLTF.preload('/assets/models/Kelly.glb')
useGLTF.preload('/assets/models/Nadine.glb')
useGLTF.preload('/assets/models/Sthandile.glb')
