import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'

// ── Static flower data (deterministic golden-angle spiral) ────────────────────

const FLOWER_DATA = (() => {
  const colors = ['#ff6b6b', '#ffcc00', '#ff9ef7', '#ff7f50', '#fff44f', '#ff85a1', '#ff4da6', '#ffb347']
  return Array.from({ length: 38 }, (_, i) => {
    const angle = i * 2.399963
    const r = 5 + (i % 7) * 1.1 + (i % 3) * 0.6
    return {
      x: Math.cos(angle) * r,
      z: Math.sin(angle) * r - 2,
      color: colors[i % colors.length],
      scale: 0.07 + (i % 5) * 0.016,
    }
  })
})()

// ── Sky ───────────────────────────────────────────────────────────────────────

function SceneBackground() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#87cef5')
  }, [scene])
  return null
}

// ── Sun ───────────────────────────────────────────────────────────────────────

function Sun() {
  return (
    <group position={[14, 20, -32]}>
      <mesh>
        <sphereGeometry args={[2.0, 16, 16]} />
        <meshBasicMaterial color="#fff5a0" />
      </mesh>
      <mesh>
        <sphereGeometry args={[2.9, 16, 16]} />
        <meshBasicMaterial color="#fffac8" transparent opacity={0.22} />
      </mesh>
    </group>
  )
}

// ── Clouds ────────────────────────────────────────────────────────────────────

function Cloud({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh><sphereGeometry args={[1.0, 8, 6]} /><meshBasicMaterial color="#ffffff" /></mesh>
      <mesh position={[1.2, 0.15, 0]}><sphereGeometry args={[0.75, 8, 6]} /><meshBasicMaterial color="#f5f5f5" /></mesh>
      <mesh position={[-1.0, 0.05, 0]}><sphereGeometry args={[0.65, 8, 6]} /><meshBasicMaterial color="#f8f8f8" /></mesh>
      <mesh position={[0.3, 0.55, 0]}><sphereGeometry args={[0.58, 8, 6]} /><meshBasicMaterial color="#ffffff" /></mesh>
    </group>
  )
}

// ── Flower ────────────────────────────────────────────────────────────────────

function Flower({ x, z, color, scale }) {
  return (
    <group position={[x, 0.01, z]}>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 0.14, 4]} />
        <meshStandardMaterial color="#3a8a2a" />
      </mesh>
      <mesh position={[0, 0.155, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[scale, 6]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, 0.158, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[scale * 0.38, 6]} />
        <meshStandardMaterial color="#ffe822" side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

// ── Tree ──────────────────────────────────────────────────────────────────────

function Tree({ position, height = 3.8, cr = 1.7, lc = '#3d8c2a' }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow>
        <cylinderGeometry args={[0.14, 0.22, height, 8]} />
        <meshStandardMaterial color="#6b4423" roughness={0.9} />
      </mesh>
      <mesh position={[0, height + cr * 0.45, 0]} castShadow>
        <sphereGeometry args={[cr, 10, 8]} />
        <meshStandardMaterial color={lc} roughness={1} />
      </mesh>
      <mesh position={[0.35, height + cr * 0.82, 0.25]} castShadow>
        <sphereGeometry args={[cr * 0.62, 8, 7]} />
        <meshStandardMaterial color="#4aaa33" roughness={1} />
      </mesh>
    </group>
  )
}

// ── Bush ──────────────────────────────────────────────────────────────────────

function Bush({ x, z }) {
  return (
    <group position={[x, 0.38, z]}>
      <mesh><sphereGeometry args={[0.62, 8, 6]} /><meshStandardMaterial color="#3a7a28" roughness={1} /></mesh>
      <mesh position={[0.52, 0.08, 0]}><sphereGeometry args={[0.48, 8, 6]} /><meshStandardMaterial color="#4a8a32" roughness={1} /></mesh>
      <mesh position={[-0.44, 0.05, 0.18]}><sphereGeometry args={[0.46, 8, 6]} /><meshStandardMaterial color="#3d7525" roughness={1} /></mesh>
    </group>
  )
}

// ── Playground ────────────────────────────────────────────────────────────────

const FENCE_COLORS = ['#e84040', '#f5a020', '#3399dd', '#44bb44', '#e84040', '#f5a020']

function SchoolPlayground() {
  return (
    <>
      {/* Grass ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#5aaa3a" roughness={1} />
      </mesh>
      {/* Brighter patch under characters */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#65bc45" roughness={1} />
      </mesh>

      <Sun />

      <Cloud position={[-10, 13, -26]} scale={1.4} />
      <Cloud position={[6,   15, -30]} scale={1.1} />
      <Cloud position={[17,  12, -22]} scale={1.0} />
      <Cloud position={[-2,  14, -34]} scale={1.3} />
      <Cloud position={[25,  11, -20]} scale={0.85} />

      {/* Trees */}
      <Tree position={[-9,   0, -10]} height={4.2} cr={1.9} lc="#3d8c2a" />
      <Tree position={[-6.5, 0, -13]} height={5.5} cr={2.2} lc="#2e7a20" />
      <Tree position={[-13,  0, -6]}  height={3.4} cr={1.5} lc="#529c38" />
      <Tree position={[9,    0, -11]} height={4.0} cr={1.8} lc="#4a9e32" />
      <Tree position={[11.5, 0, -7]}  height={3.8} cr={1.6} lc="#3a8828" />
      <Tree position={[7,    0, -13]} height={5.0} cr={2.0} lc="#3d8c2a" />
      <Tree position={[-14,  0, -2]}  height={3.2} cr={1.4} lc="#459930" />
      <Tree position={[14,   0, -2]}  height={3.6} cr={1.7} lc="#3d8c2a" />

      {/* Bushes */}
      <Bush x={-5.5} z={-7} />
      <Bush x={5.5}  z={-7} />
      <Bush x={-8}   z={-3} />
      <Bush x={8}    z={-3} />
      <Bush x={-4}   z={-9} />
      <Bush x={4}    z={-9} />

      {/* Flowers */}
      {FLOWER_DATA.map((f, i) => (
        <Flower key={i} x={f.x} z={f.z} color={f.color} scale={f.scale} />
      ))}

      {/* School building back wall */}
      <mesh position={[0, 4.5, -17]} receiveShadow>
        <planeGeometry args={[34, 9]} />
        <meshStandardMaterial color="#f0e8d4" roughness={0.9} />
      </mesh>
      <mesh position={[0, 1.1, -16.97]}>
        <planeGeometry args={[34, 2.2]} />
        <meshStandardMaterial color="#2d5a3d" roughness={0.85} />
      </mesh>
      {[-9, -3, 3, 9].map((x) => (
        <group key={x} position={[x, 3.8, -16.9]}>
          <mesh>
            <boxGeometry args={[2.0, 1.6, 0.07]} />
            <meshStandardMaterial color="#888870" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[1.8, 1.4]} />
            <meshStandardMaterial color="#b8d4f0" roughness={0.05} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Colourful fence */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} position={[i * 1.0 - 14.5, 0.75, -10]}>
          <boxGeometry args={[0.07, 1.5, 0.07]} />
          <meshStandardMaterial color={FENCE_COLORS[i % FENCE_COLORS.length]} roughness={0.5} />
        </mesh>
      ))}
      <mesh position={[0, 1.5, -10]}>
        <boxGeometry args={[30, 0.07, 0.07]} />
        <meshStandardMaterial color="#e0c080" roughness={0.5} />
      </mesh>

      {/* Wooden bench */}
      <mesh position={[-5.5, 0.27, 1.8]} castShadow>
        <boxGeometry args={[2.2, 0.1, 0.42]} />
        <meshStandardMaterial color="#e06030" roughness={0.7} />
      </mesh>
      <mesh position={[-4.9, 0.13, 1.8]}>
        <boxGeometry args={[0.1, 0.26, 0.42]} />
        <meshStandardMaterial color="#c04010" />
      </mesh>
      <mesh position={[-6.1, 0.13, 1.8]}>
        <boxGeometry args={[0.1, 0.26, 0.42]} />
        <meshStandardMaterial color="#c04010" />
      </mesh>
    </>
  )
}

// ── Head turn lookup ──────────────────────────────────────────────────────────

function headTurnY(charName, speaker) {
  if (!speaker || charName === speaker) return 0
  const T = {
    melissa:   { kelly: -0.45, nadine: -0.30, sthandile: -0.35 },
    kelly:     { melissa: 0.55, nadine: 0.20,  sthandile: 0.12  },
    nadine:    { melissa: 0.40, kelly: -0.18,  sthandile: 0.10  },
    sthandile: { melissa: 0.28, kelly: -0.26,  nadine: -0.12    },
  }
  return T[charName]?.[speaker] ?? 0
}

// ── Character ─────────────────────────────────────────────────────────────────

function Character({ url, position, rotation, isActive, charName, speakingCharacter }) {
  const group = useRef()
  const { scene, animations } = useGLTF(url)
  const clonedScene = useRef(null)
  if (!clonedScene.current) clonedScene.current = scene.clone(true)
  const { actions, names } = useAnimations(animations, group)

  // Deterministic per-character phase offset so breathing is not synchronised
  const seed = useRef(charName.charCodeAt(0) * 0.7853)

  const headBone  = useRef(null)
  const spineBone = useRef(null)

  // Discover bones once after model loads
  useEffect(() => {
    clonedScene.current.traverse((obj) => {
      const n = obj.name.toLowerCase()
      if (!headBone.current  && /\bhead\b/.test(n))                                 headBone.current  = obj
      if (!spineBone.current && /(spine[12]?|chest|upperchest|upper_body)/.test(n)) spineBone.current = obj
    })
  }, [])

  // Idle animation
  useEffect(() => {
    if (names.length > 0) {
      const action = actions['idle'] || actions['Idle'] || actions['mixamo.com'] || actions[names[0]]
      if (action) action.reset().fadeIn(0.3).play()
    }
  }, [actions, names])

  // Emissive highlight for active speaker
  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const apply = (m) => {
          const mc = m.clone()
          mc.emissive = new THREE.Color(isActive ? 0x222233 : 0x000000)
          return mc
        }
        child.material = Array.isArray(child.material) ? child.material.map(apply) : apply(child.material)
      }
    })
  }, [isActive])

  // Set initial world transform once — avoids R3F re-applying inline arrays on re-render
  useEffect(() => {
    if (!group.current) return
    group.current.position.set(...position)
    group.current.rotation.set(...rotation)
  }, []) // eslint-disable-line

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    const s = seed.current

    // Breathing: gentle vertical oscillation
    const breathe = Math.sin(t * 1.15 + s) * 0.009

    // Body sway: slow side-to-side tilt
    const sway = Math.sin(t * 0.65 + s * 0.7) * 0.013

    // Contextual animation targets
    const isUnderPressure =
      charName === 'melissa' && (speakingCharacter === 'kelly' || speakingCharacter === 'nadine')
    const isLeaning =
      (charName === 'kelly' || charName === 'nadine') && speakingCharacter === charName

    // Kelly/Nadine lean toward Melissa (she's on their left, so +z tilt)
    const targetLeanZ    = isLeaning       ? 0.08  : 0
    // Melissa's body tenses forward when pressured
    const targetTensionX = isUnderPressure ? 0.045 : 0

    // Position — lock x/z, animate y
    group.current.position.x = position[0]
    group.current.position.z = position[2]
    group.current.position.y = position[1] + breathe

    // Rotation — lock y to base facing, lerp x/z for animation
    group.current.rotation.y = rotation[1]
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, sway + targetLeanZ,  0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetTensionX,      0.05)

    // Head turn toward current speaker
    if (headBone.current) {
      const target = headTurnY(charName, speakingCharacter)
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, target, 0.04)
    }

    // Spine breathing swell
    if (spineBone.current) {
      spineBone.current.rotation.x = Math.sin(t * 1.15 + s) * 0.018
    }
  })

  return <primitive ref={group} object={clonedScene.current} />
}

// ── Scene ─────────────────────────────────────────────────────────────────────

function SceneContents({ activeCharacter }) {
  return (
    <>
      <SceneBackground />

      <directionalLight position={[10, 16, 6]} intensity={2.4} color="#fff8e8" castShadow
        shadow-mapSize-width={2048} shadow-mapSize-height={2048} />
      <ambientLight intensity={0.65} color="#d8eaff" />
      <hemisphereLight args={['#87ceeb', '#7abb50', 0.55]} />

      <SchoolPlayground />

      <Suspense fallback={null}>
        <Character url="/assets/models/Melissa.glb"
          position={[-2.2, 1.1, 0.5]}  rotation={[0,  Math.PI * 0.2,  0]}
          isActive={activeCharacter === 'melissa'}   charName="melissa"   speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Kelly.glb"
          position={[0.5,  1.1, -0.5]} rotation={[0, -Math.PI * 0.15, 0]}
          isActive={activeCharacter === 'kelly'}     charName="kelly"     speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Sthandile.glb"
          position={[1.8,  1.1, 0]}    rotation={[0, -Math.PI * 0.25, 0]}
          isActive={activeCharacter === 'sthandile'} charName="sthandile" speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Nadine.glb"
          position={[0.7,  1.1, 0.8]}  rotation={[0, -Math.PI * 0.1,  0]}
          isActive={activeCharacter === 'nadine'}    charName="nadine"    speakingCharacter={activeCharacter} />
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
      gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
    >
      <SceneContents activeCharacter={activeCharacter} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/Melissa.glb')
useGLTF.preload('/assets/models/Kelly.glb')
useGLTF.preload('/assets/models/Nadine.glb')
useGLTF.preload('/assets/models/Sthandile.glb')
