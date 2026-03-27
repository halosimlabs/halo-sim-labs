import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment, Sky } from '@react-three/drei'
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
  // Muted, natural flower colours — no neons
  const colors = ['#d4604a', '#c8a832', '#c87ab0', '#c86840', '#e8d458', '#b86888', '#a85090', '#d48830']
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
    // Sky component handles the background — fog color matches horizon haze
    scene.fog = new THREE.FogExp2('#c8d8e8', 0.016)
    scene.environmentIntensity = 0.75
  }, [scene])
  return null
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

function Tree({ position, height = 3.8, cr = 1.7, lc = '#3a6824' }) {
  // Use slightly flattened, offset spheres so foliage reads as a canopy not a lollipop
  return (
    <group position={position}>
      <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.24, height, 7]} />
        <meshStandardMaterial color="#5a3818" roughness={0.97} metalness={0.0} />
      </mesh>
      {/* Main canopy — slightly flattened */}
      <mesh position={[0, height + cr * 0.38, 0]} scale={[1, 0.72, 1]} castShadow receiveShadow>
        <sphereGeometry args={[cr, 9, 7]} />
        <meshStandardMaterial color={lc} roughness={0.97} metalness={0.0} />
      </mesh>
      {/* Side cluster — breaks up the silhouette */}
      <mesh position={[cr * 0.55, height + cr * 0.7, cr * 0.3]} scale={[1, 0.68, 1]} castShadow>
        <sphereGeometry args={[cr * 0.58, 8, 6]} />
        <meshStandardMaterial color="#385c20" roughness={0.97} metalness={0.0} />
      </mesh>
      {/* Back cluster */}
      <mesh position={[-cr * 0.4, height + cr * 0.75, -cr * 0.35]} scale={[1, 0.65, 1]} castShadow>
        <sphereGeometry args={[cr * 0.52, 8, 6]} />
        <meshStandardMaterial color="#426828" roughness={0.97} metalness={0.0} />
      </mesh>
    </group>
  )
}

// ── Bush ──────────────────────────────────────────────────────────────────────

function Bush({ x, z }) {
  return (
    <group position={[x, 0.32, z]}>
      <mesh scale={[1, 0.7, 1]} castShadow><sphereGeometry args={[0.62, 8, 6]} /><meshStandardMaterial color="#355c22" roughness={0.97} /></mesh>
      <mesh position={[0.5, 0.06, 0.1]} scale={[1, 0.68, 1]} castShadow><sphereGeometry args={[0.46, 8, 6]} /><meshStandardMaterial color="#3d6828" roughness={0.97} /></mesh>
      <mesh position={[-0.42, 0.04, 0.15]} scale={[1, 0.65, 1]} castShadow><sphereGeometry args={[0.44, 8, 6]} /><meshStandardMaterial color="#304e1c" roughness={0.97} /></mesh>
    </group>
  )
}

// ── Playground ────────────────────────────────────────────────────────────────

// Weathered dark-green painted steel — typical SA school fence
const FENCE_POST_COLOR = '#2a3d28'
const FENCE_RAIL_COLOR = '#243322'

function SchoolPlayground() {
  return (
    <>
      {/* Grass — muted, realistic green */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#456828" roughness={1.0} metalness={0.0} />
      </mesh>
      {/* Slightly lighter patch under characters — sun dapple */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[9, 7]} />
        <meshStandardMaterial color="#4e7430" roughness={0.98} metalness={0.0} />
      </mesh>

      {/* Trees — muted olive/forest greens */}
      <Tree position={[-9,   0, -10]} height={4.2} cr={1.9} lc="#3a6824" />
      <Tree position={[-6.5, 0, -13]} height={5.5} cr={2.2} lc="#2e5a1c" />
      <Tree position={[-13,  0,  -6]} height={3.4} cr={1.5} lc="#446030" />
      <Tree position={[9,    0, -11]} height={4.0} cr={1.8} lc="#3e6826" />
      <Tree position={[11.5, 0,  -7]} height={3.8} cr={1.6} lc="#355820" />
      <Tree position={[7,    0, -13]} height={5.0} cr={2.0} lc="#3a6424" />
      <Tree position={[-14,  0,  -2]} height={3.2} cr={1.4} lc="#3c6228" />
      <Tree position={[14,   0,  -2]} height={3.6} cr={1.7} lc="#385e22" />

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

      {/* Dark-green painted steel fence — typical SA school */}
      {Array.from({ length: 30 }, (_, i) => (
        <mesh key={i} position={[i * 1.0 - 14.5, 0.75, -10]} castShadow>
          <boxGeometry args={[0.06, 1.5, 0.06]} />
          <meshStandardMaterial color={FENCE_POST_COLOR} roughness={0.7} metalness={0.25} />
        </mesh>
      ))}
      <mesh position={[0, 1.38, -10]}>
        <boxGeometry args={[30, 0.05, 0.05]} />
        <meshStandardMaterial color={FENCE_RAIL_COLOR} roughness={0.7} metalness={0.25} />
      </mesh>
      <mesh position={[0, 0.55, -10]}>
        <boxGeometry args={[30, 0.05, 0.05]} />
        <meshStandardMaterial color={FENCE_RAIL_COLOR} roughness={0.7} metalness={0.25} />
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

      {/* Subtle warm colour grade — keep it filmic, not saturated */}
      <HueSaturation
        hue={0.01}
        saturation={0.06}
        blendFunction={BlendFunction.NORMAL}
      />
      <BrightnessContrast brightness={0.02} contrast={0.12} />

      {/* Cinematic vignette */}
      <Vignette eskil={false} offset={0.32} darkness={0.62} />
    </EffectComposer>
  )
}

// ── Scene assembly ────────────────────────────────────────────────────────────

function SceneContents({ activeCharacter }) {
  return (
    <>
      <SceneSetup />

      {/* Physically-based atmospheric sky — replaces flat colour background */}
      <Sky
        distance={450}
        sunPosition={[8, 14, 5]}
        turbidity={9}
        rayleigh={1.4}
        mieCoefficient={0.004}
        mieDirectionalG={0.76}
      />

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
