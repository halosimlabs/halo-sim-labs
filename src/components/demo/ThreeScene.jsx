import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  SMAA,
  Vignette,
  HueSaturation,
  BrightnessContrast,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
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

// ── Scene environment setup ───────────────────────────────────────────────────

function SceneSetup() {
  const { scene } = useThree()
  useEffect(() => {
    // Warm sky blue background
    scene.background = new THREE.Color('#8fd4f8')
    // Subtle environment fog for depth
    scene.fog = new THREE.FogExp2('#b8dff5', 0.022)
    // Control HDR environment contribution
    scene.environmentIntensity = 0.85
  }, [scene])
  return null
}

// ── Sun ───────────────────────────────────────────────────────────────────────

function Sun() {
  return (
    <group position={[14, 20, -32]}>
      {/* Core disc */}
      <mesh>
        <sphereGeometry args={[2.0, 16, 16]} />
        <meshBasicMaterial color="#fff9c4" />
      </mesh>
      {/* Inner glow halo */}
      <mesh>
        <sphereGeometry args={[3.2, 16, 16]} />
        <meshBasicMaterial color="#fff5a0" transparent opacity={0.18} depthWrite={false} />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[4.4, 16, 16]} />
        <meshBasicMaterial color="#ffe060" transparent opacity={0.07} depthWrite={false} />
      </mesh>
    </group>
  )
}

// ── Clouds ────────────────────────────────────────────────────────────────────

function Cloud({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      <mesh><sphereGeometry args={[1.0, 8, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} envMapIntensity={0} /></mesh>
      <mesh position={[1.2, 0.15, 0]}><sphereGeometry args={[0.75, 8, 6]} /><meshStandardMaterial color="#f5f5f5" roughness={1} envMapIntensity={0} /></mesh>
      <mesh position={[-1.0, 0.05, 0]}><sphereGeometry args={[0.65, 8, 6]} /><meshStandardMaterial color="#f8f8f8" roughness={1} envMapIntensity={0} /></mesh>
      <mesh position={[0.3, 0.55, 0]}><sphereGeometry args={[0.58, 8, 6]} /><meshStandardMaterial color="#ffffff" roughness={1} envMapIntensity={0} /></mesh>
    </group>
  )
}

// ── Flower ────────────────────────────────────────────────────────────────────

function Flower({ x, z, color, scale }) {
  return (
    <group position={[x, 0.01, z]}>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.011, 0.011, 0.14, 4]} />
        <meshStandardMaterial color="#3a8a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0, 0.155, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[scale, 6]} />
        <meshStandardMaterial color={color} side={THREE.DoubleSide} roughness={0.8} />
      </mesh>
      <mesh position={[0, 0.158, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <circleGeometry args={[scale * 0.38, 6]} />
        <meshStandardMaterial color="#ffe822" side={THREE.DoubleSide} roughness={0.8} />
      </mesh>
    </group>
  )
}

// ── Tree ──────────────────────────────────────────────────────────────────────

function Tree({ position, height = 3.8, cr = 1.7, lc = '#3d8c2a' }) {
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.14, 0.22, height, 8]} />
        <meshStandardMaterial color="#6b4423" roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh position={[0, height + cr * 0.45, 0]} castShadow receiveShadow>
        <sphereGeometry args={[cr, 10, 8]} />
        <meshStandardMaterial color={lc} roughness={0.95} metalness={0.0} />
      </mesh>
      <mesh position={[0.35, height + cr * 0.82, 0.25]} castShadow>
        <sphereGeometry args={[cr * 0.62, 8, 7]} />
        <meshStandardMaterial color="#4aaa33" roughness={0.95} metalness={0.0} />
      </mesh>
    </group>
  )
}

// ── Bush ──────────────────────────────────────────────────────────────────────

function Bush({ x, z }) {
  return (
    <group position={[x, 0.38, z]}>
      <mesh castShadow><sphereGeometry args={[0.62, 8, 6]} /><meshStandardMaterial color="#3a7a28" roughness={0.95} /></mesh>
      <mesh position={[0.52, 0.08, 0]} castShadow><sphereGeometry args={[0.48, 8, 6]} /><meshStandardMaterial color="#4a8a32" roughness={0.95} /></mesh>
      <mesh position={[-0.44, 0.05, 0.18]} castShadow><sphereGeometry args={[0.46, 8, 6]} /><meshStandardMaterial color="#3d7525" roughness={0.95} /></mesh>
    </group>
  )
}

// ── Playground ────────────────────────────────────────────────────────────────

const FENCE_COLORS = ['#e84040', '#f5a020', '#3399dd', '#44bb44', '#e84040', '#f5a020']

function SchoolPlayground() {
  return (
    <>
      {/* Grass — slightly rough PBR for better light interaction */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#52a035" roughness={1.0} metalness={0.0} />
      </mesh>
      {/* Brighter patch under characters */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#62b842" roughness={0.98} metalness={0.0} />
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
      <Tree position={[-13,  0,  -6]} height={3.4} cr={1.5} lc="#529c38" />
      <Tree position={[9,    0, -11]} height={4.0} cr={1.8} lc="#4a9e32" />
      <Tree position={[11.5, 0,  -7]} height={3.8} cr={1.6} lc="#3a8828" />
      <Tree position={[7,    0, -13]} height={5.0} cr={2.0} lc="#3d8c2a" />
      <Tree position={[-14,  0,  -2]} height={3.2} cr={1.4} lc="#459930" />
      <Tree position={[14,   0,  -2]} height={3.6} cr={1.7} lc="#3d8c2a" />

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
        <meshStandardMaterial color="#f0e8d4" roughness={0.92} metalness={0.0} />
      </mesh>
      <mesh position={[0, 1.1, -16.97]}>
        <planeGeometry args={[34, 2.2]} />
        <meshStandardMaterial color="#2d5a3d" roughness={0.88} metalness={0.0} />
      </mesh>
      {[-9, -3, 3, 9].map((x) => (
        <group key={x} position={[x, 3.8, -16.9]}>
          <mesh>
            <boxGeometry args={[2.0, 1.6, 0.07]} />
            <meshStandardMaterial color="#888870" roughness={0.4} metalness={0.3} />
          </mesh>
          <mesh position={[0, 0, 0.04]}>
            <planeGeometry args={[1.8, 1.4]} />
            <meshStandardMaterial color="#b8d4f0" roughness={0.05} metalness={0.1} transparent opacity={0.6} />
          </mesh>
        </group>
      ))}

      {/* Colourful fence */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} position={[i * 1.0 - 14.5, 0.75, -10]} castShadow>
          <boxGeometry args={[0.07, 1.5, 0.07]} />
          <meshStandardMaterial color={FENCE_COLORS[i % FENCE_COLORS.length]} roughness={0.55} metalness={0.1} />
        </mesh>
      ))}
      <mesh position={[0, 1.5, -10]}>
        <boxGeometry args={[30, 0.07, 0.07]} />
        <meshStandardMaterial color="#e0c080" roughness={0.55} />
      </mesh>

      {/* Wooden bench */}
      <mesh position={[-5.5, 0.27, 1.8]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.1, 0.42]} />
        <meshStandardMaterial color="#c85520" roughness={0.72} metalness={0.0} />
      </mesh>
      <mesh position={[-4.9, 0.13, 1.8]} castShadow>
        <boxGeometry args={[0.1, 0.26, 0.42]} />
        <meshStandardMaterial color="#a03a10" roughness={0.8} />
      </mesh>
      <mesh position={[-6.1, 0.13, 1.8]} castShadow>
        <boxGeometry args={[0.1, 0.26, 0.42]} />
        <meshStandardMaterial color="#a03a10" roughness={0.8} />
      </mesh>
    </>
  )
}

// ── Head-turn lookup ──────────────────────────────────────────────────────────
// Tuned to scene layout: melissa(–2.2, 0.5) kelly(0.5,–0.5) nadine(0.7, 0.8) sthandile(1.8, 0)

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

  // Per-character phase offset — prevents synced breathing
  const seed = useRef(charName.charCodeAt(0) * 0.7853)
  const headBone  = useRef(null)
  const spineBone = useRef(null)

  // Discover head/spine bones once
  useEffect(() => {
    clonedScene.current.traverse((obj) => {
      const n = obj.name.toLowerCase()
      if (!headBone.current  && /\bhead\b/.test(n))                                 headBone.current  = obj
      if (!spineBone.current && /(spine[12]?|chest|upperchest|upper_body)/.test(n)) spineBone.current = obj
    })
  }, [])

  // Enable shadows + upgrade materials for HDR lighting
  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow    = true
        child.receiveShadow = true
        // Boost material quality for PBR rendering
        if (child.material) {
          const upgrade = (m) => {
            const mc = m.clone()
            mc.envMapIntensity = 1.2
            mc.needsUpdate = true
            return mc
          }
          child.material = Array.isArray(child.material) ? child.material.map(upgrade) : upgrade(child.material)
        }
      }
    })
  }, [])

  // Emissive highlight for active speaker
  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const apply = (m) => {
          const mc = m.clone()
          mc.emissive    = new THREE.Color(isActive ? 0x1a1825 : 0x000000)
          mc.emissiveIntensity = isActive ? 1.0 : 0.0
          mc.needsUpdate = true
          return mc
        }
        child.material = Array.isArray(child.material) ? child.material.map(apply) : apply(child.material)
      }
    })
  }, [isActive])

  // Play idle animation
  useEffect(() => {
    if (names.length > 0) {
      const action = actions['idle'] || actions['Idle'] || actions['mixamo.com'] || actions[names[0]]
      if (action) action.reset().fadeIn(0.3).play()
    }
  }, [actions, names])

  // Base transform set once — prevents R3F overwriting on re-render
  useEffect(() => {
    if (!group.current) return
    group.current.position.set(...position)
    group.current.rotation.set(...rotation)
  }, []) // eslint-disable-line

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    const s = seed.current

    // ── Breathing — gentle y oscillation ──────────────────────────────────
    const breathe = Math.sin(t * 1.15 + s) * 0.009

    // ── Body sway — slow side-to-side tilt ────────────────────────────────
    const sway = Math.sin(t * 0.65 + s * 0.7) * 0.013

    // ── Contextual targets ─────────────────────────────────────────────────
    const isUnderPressure =
      charName === 'melissa' && (speakingCharacter === 'kelly' || speakingCharacter === 'nadine')
    const isLeaning =
      (charName === 'kelly' || charName === 'nadine') && speakingCharacter === charName

    const targetLeanZ    = isLeaning       ? 0.08  : 0
    const targetTensionX = isUnderPressure ? 0.045 : 0

    // ── Apply transforms ───────────────────────────────────────────────────
    group.current.position.x = position[0]
    group.current.position.z = position[2]
    group.current.position.y = position[1] + breathe

    group.current.rotation.y = rotation[1]
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, sway + targetLeanZ,  0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetTensionX,      0.05)

    // ── Head turn toward current speaker ──────────────────────────────────
    if (headBone.current) {
      const target = headTurnY(charName, speakingCharacter)
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, target, 0.04)
    }

    // ── Spine breathing swell ──────────────────────────────────────────────
    if (spineBone.current) {
      spineBone.current.rotation.x = Math.sin(t * 1.15 + s) * 0.018
    }
  })

  return <primitive ref={group} object={clonedScene.current} />
}

// ── Post-processing ───────────────────────────────────────────────────────────

function PostFX() {
  return (
    <EffectComposer multisampling={0}>
      {/* Anti-aliasing — replaces MSAA, works with post-processing */}
      <SMAA />

      {/* Depth of field — characters sharp, background gently blurred */}
      <DepthOfField
        target={[0, 1.4, 0]}
        focalLength={0.022}
        bokehScale={3.2}
        height={480}
      />

      {/* Bloom — sun corona, flower highlights, skin catch-lights */}
      <Bloom
        luminanceThreshold={0.88}
        luminanceSmoothing={0.3}
        intensity={0.65}
        mipmapBlur
        radius={0.6}
      />

      {/* Warm golden-hour colour grade */}
      <HueSaturation
        hue={0.03}
        saturation={0.22}
        blendFunction={BlendFunction.NORMAL}
      />
      <BrightnessContrast brightness={0.03} contrast={0.10} />

      {/* Cinematic vignette */}
      <Vignette eskil={false} offset={0.28} darkness={0.72} />
    </EffectComposer>
  )
}

// ── Scene assembly ────────────────────────────────────────────────────────────

function SceneContents({ activeCharacter }) {
  return (
    <>
      <SceneSetup />

      {/* HDR environment — drives PBR skin/fabric sheen on characters */}
      <Suspense fallback={null}>
        <Environment preset="sunset" background={false} />
      </Suspense>

      {/* ── Lighting ── */}

      {/* Key light: warm golden-hour sun (high angle, long soft shadows) */}
      <directionalLight
        position={[8, 14, 5]}
        intensity={2.2}
        color="#ffd080"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={40}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-radius={6}
        shadow-bias={-0.0003}
      />
      {/* Fill light: cool sky-bounce from opposite side */}
      <directionalLight position={[-5, 8, -3]} intensity={0.45} color="#b8d8ff" />
      {/* Rim light: subtle warm back-light to separate characters from background */}
      <directionalLight position={[2, 4, -8]} intensity={0.3} color="#ffc860" />

      <ambientLight intensity={0.35} color="#ffe8c0" />
      <hemisphereLight args={['#87ceeb', '#7abb50', 0.42]} />

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

      <PostFX />
    </>
  )
}

// ── Export ────────────────────────────────────────────────────────────────────

export default function ThreeScene({ activeCharacter }) {
  return (
    <Canvas
      style={{ position: 'absolute', inset: 0 }}
      camera={{ position: [0, 1.65, 5.5], fov: 52, near: 0.1, far: 200 }}
      shadows="soft"
      dpr={[1, 2]}
      gl={{
        antialias: false,                              // SMAA handles AA
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.35,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}                       // adaptive pixel-ratio under load
    >
      <SceneContents activeCharacter={activeCharacter} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/Melissa.glb')
useGLTF.preload('/assets/models/Kelly.glb')
useGLTF.preload('/assets/models/Nadine.glb')
useGLTF.preload('/assets/models/Sthandile.glb')
