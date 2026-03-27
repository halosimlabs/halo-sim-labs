import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations, Environment } from '@react-three/drei'
import {
  EffectComposer,
  Bloom,
  SMAA,
  Vignette,
  HueSaturation,
  BrightnessContrast,
} from '@react-three/postprocessing'
import { BlendFunction } from 'postprocessing'
import { useRef, useEffect, Suspense } from 'react'
import * as THREE from 'three'

// ── Scene setup (indoor corridor) ─────────────────────────────────────────────

function SceneSetup() {
  const { scene } = useThree()
  useEffect(() => {
    scene.background = new THREE.Color('#1a1410')
    // Subtle linear fog — corridor recedes into warm darkness
    scene.fog = new THREE.Fog('#2a1e14', 14, 28)
    scene.environmentIntensity = 0.5
  }, [scene])
  return null
}

// ── Fluorescent ceiling light panel ──────────────────────────────────────────

function FluorescentPanel({ z, intensity = 1.0 }) {
  return (
    <group position={[0, 3.38, z]}>
      {/* Emissive white panel */}
      <mesh>
        <boxGeometry args={[0.55, 0.04, 1.1]} />
        <meshStandardMaterial
          color="#fff8ee"
          emissive="#fff8ee"
          emissiveIntensity={2.2 * intensity}
          roughness={0.6}
        />
      </mesh>
      {/* Point light below the panel */}
      <pointLight
        position={[0, -0.15, 0]}
        intensity={6.0 * intensity}
        color="#fff5e8"
        distance={9}
        decay={2}
        castShadow={false}
      />
    </group>
  )
}

// ── Notice board ──────────────────────────────────────────────────────────────

function NoticeBoard({ z, scale = 1 }) {
  // Mounted on the right wall (x = 4.1), facing left
  const w = 1.7 * scale
  const h = 1.2 * scale
  return (
    <group position={[4.08, 2.05, z]}>
      {/* Gold/wood frame */}
      <mesh>
        <boxGeometry args={[0.07, h + 0.12, w + 0.12]} />
        <meshStandardMaterial color="#7a5c10" roughness={0.65} metalness={0.2} />
      </mesh>
      {/* Dark cork board */}
      <mesh position={[-0.02, 0, 0]}>
        <boxGeometry args={[0.04, h, w]} />
        <meshStandardMaterial color="#1c1a12" roughness={0.95} />
      </mesh>
      {/* A4 notices — white/cream papers */}
      <mesh position={[-0.06, 0.22, -0.45]}>
        <boxGeometry args={[0.01, 0.34, 0.26]} />
        <meshStandardMaterial color="#f0ede4" roughness={0.9} />
      </mesh>
      <mesh position={[-0.06, 0.22, -0.08]}>
        <boxGeometry args={[0.01, 0.34, 0.26]} />
        <meshStandardMaterial color="#eeeae0" roughness={0.9} />
      </mesh>
      <mesh position={[-0.06, -0.2, -0.3]}>
        <boxGeometry args={[0.01, 0.38, 0.28]} />
        <meshStandardMaterial color="#f2f0e8" roughness={0.9} />
      </mesh>
      {/* Coloured accent paper (like a poster) */}
      <mesh position={[-0.06, 0.15, 0.42]}>
        <boxGeometry args={[0.01, 0.5, 0.38]} />
        <meshStandardMaterial color="#6a8cb8" roughness={0.9} />
      </mesh>
      <mesh position={[-0.06, -0.15, 0.55]}>
        <boxGeometry args={[0.01, 0.28, 0.22]} />
        <meshStandardMaterial color="#c05030" roughness={0.9} />
      </mesh>
    </group>
  )
}

// ── SA School Corridor ────────────────────────────────────────────────────────

function SchoolCorridor() {
  const wallX   = 4.2   // half-width
  const ceilY   = 3.45
  const zNear   =  6    // behind camera
  const zFar    = -24
  const len     = zNear - zFar   // 30

  // Brick colour — warm red-brown like the reference photo
  const brickCol  = '#8b4028'
  const mortarCol = '#7a3820' // slightly darker for depth
  // Dark bottle-green wainscoting (lower 0.95 m)
  const wainscotH = 0.95
  const wainscotC = '#2d5038'
  // Cream tile floor
  const floorCol  = '#cec8b8'
  // Ceiling warm white
  const ceilCol   = '#f0ece0'

  const zMid = (zNear + zFar) / 2  // -9

  return (
    <>
      {/* ── Floor — cream tile ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, zMid]} receiveShadow>
        <planeGeometry args={[wallX * 2, len]} />
        <meshStandardMaterial color={floorCol} roughness={0.55} metalness={0.04} />
      </mesh>
      {/* Subtle tile grout lines — dark strips in a grid */}
      {Array.from({ length: 12 }, (_, i) => (
        <mesh key={`g${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, zFar + i * 2.5 + 1.25]}>
          <planeGeometry args={[wallX * 2, 0.025]} />
          <meshStandardMaterial color="#b0a898" roughness={1} />
        </mesh>
      ))}
      {[-3.5, -1.5, 0.5, 2.5].map((x) => (
        <mesh key={`gv${x}`} rotation={[-Math.PI / 2, 0, 0]} position={[x, 0.001, zMid]}>
          <planeGeometry args={[0.025, len]} />
          <meshStandardMaterial color="#b0a898" roughness={1} />
        </mesh>
      ))}

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ceilY, zMid]}>
        <planeGeometry args={[wallX * 2, len]} />
        <meshStandardMaterial color={ceilCol} roughness={0.9} />
      </mesh>

      {/* ── Left wall — two sections ── */}
      {/* Upper: brick */}
      <mesh position={[-wallX, wainscotH + (ceilY - wainscotH) / 2, zMid]}>
        <planeGeometry args={[len, ceilY - wainscotH]} />
        <meshStandardMaterial color={brickCol} roughness={0.92} metalness={0.0} side={THREE.FrontSide} />
      </mesh>
      {/* Brick mortar row accent strips — evenly spaced horizontal lines */}
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={`lb${i}`} position={[-wallX + 0.002, wainscotH + 0.12 + i * 0.185, zMid]}>
          <planeGeometry args={[len, 0.018]} />
          <meshStandardMaterial color={mortarCol} roughness={1.0} />
        </mesh>
      ))}
      {/* Lower: dark green wainscot */}
      <mesh position={[-wallX, wainscotH / 2, zMid]}>
        <planeGeometry args={[len, wainscotH]} />
        <meshStandardMaterial color={wainscotC} roughness={0.85} metalness={0.0} />
      </mesh>
      {/* Wainscot cap rail */}
      <mesh position={[-wallX + 0.01, wainscotH + 0.04, zMid]}>
        <planeGeometry args={[len, 0.08]} />
        <meshStandardMaterial color="#1e3828" roughness={0.8} />
      </mesh>

      {/* ── Right wall ── */}
      <mesh rotation={[0, Math.PI, 0]} position={[wallX, wainscotH + (ceilY - wainscotH) / 2, zMid]}>
        <planeGeometry args={[len, ceilY - wainscotH]} />
        <meshStandardMaterial color={brickCol} roughness={0.92} metalness={0.0} />
      </mesh>
      {Array.from({ length: 14 }, (_, i) => (
        <mesh key={`rb${i}`} rotation={[0, Math.PI, 0]} position={[wallX - 0.002, wainscotH + 0.12 + i * 0.185, zMid]}>
          <planeGeometry args={[len, 0.018]} />
          <meshStandardMaterial color={mortarCol} roughness={1.0} />
        </mesh>
      ))}
      <mesh rotation={[0, Math.PI, 0]} position={[wallX, wainscotH / 2, zMid]}>
        <planeGeometry args={[len, wainscotH]} />
        <meshStandardMaterial color={wainscotC} roughness={0.85} />
      </mesh>
      <mesh rotation={[0, Math.PI, 0]} position={[wallX - 0.01, wainscotH + 0.04, zMid]}>
        <planeGeometry args={[len, 0.08]} />
        <meshStandardMaterial color="#1e3828" roughness={0.8} />
      </mesh>

      {/* ── Back wall ── */}
      <mesh position={[0, ceilY / 2, zFar]}>
        <planeGeometry args={[wallX * 2, ceilY]} />
        <meshStandardMaterial color={brickCol} roughness={0.95} />
      </mesh>
      <mesh position={[0, wainscotH / 2, zFar + 0.01]}>
        <planeGeometry args={[wallX * 2, wainscotH]} />
        <meshStandardMaterial color={wainscotC} roughness={0.88} />
      </mesh>

      {/* ── Fluorescent ceiling lights ── */}
      <FluorescentPanel z={0.5}  intensity={1.0} />
      <FluorescentPanel z={-4.5} intensity={0.95} />
      <FluorescentPanel z={-9.0} intensity={0.85} />
      <FluorescentPanel z={-13.5} intensity={0.7} />
      <FluorescentPanel z={-18.0} intensity={0.5} />

      {/* ── Notice boards on right wall ── */}
      <NoticeBoard z={-1.5} scale={1.0} />
      <NoticeBoard z={-5.5} scale={0.95} />
      <NoticeBoard z={-9.5} scale={0.9} />

      {/* ── Small shelf/ledge on left wall (visible in reference) ── */}
      <mesh position={[-wallX + 0.12, 1.0, -2]}>
        <boxGeometry args={[0.24, 0.04, 0.8]} />
        <meshStandardMaterial color="#1e3828" roughness={0.8} />
      </mesh>
    </>
  )
}

// ── Head-turn lookup ──────────────────────────────────────────────────────────

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

  const seed       = useRef(charName.charCodeAt(0) * 0.7853)
  const headBone   = useRef(null)
  const spineBone  = useRef(null)

  useEffect(() => {
    clonedScene.current.traverse((obj) => {
      const n = obj.name.toLowerCase()
      if (!headBone.current  && /\bhead\b/.test(n))                                 headBone.current  = obj
      if (!spineBone.current && /(spine[12]?|chest|upperchest|upper_body)/.test(n)) spineBone.current = obj
    })
  }, [])

  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh) {
        child.castShadow    = true
        child.receiveShadow = true
        if (child.material) {
          const upgrade = (m) => {
            const mc = m.clone()
            mc.envMapIntensity = 1.0
            mc.needsUpdate = true
            return mc
          }
          child.material = Array.isArray(child.material) ? child.material.map(upgrade) : upgrade(child.material)
        }
      }
    })
  }, [])

  useEffect(() => {
    clonedScene.current.traverse((child) => {
      if (child.isMesh && child.material) {
        const apply = (m) => {
          const mc = m.clone()
          mc.emissive          = new THREE.Color(isActive ? 0x1a1825 : 0x000000)
          mc.emissiveIntensity = isActive ? 1.0 : 0.0
          mc.needsUpdate = true
          return mc
        }
        child.material = Array.isArray(child.material) ? child.material.map(apply) : apply(child.material)
      }
    })
  }, [isActive])

  useEffect(() => {
    if (names.length > 0) {
      const action = actions['idle'] || actions['Idle'] || actions['mixamo.com'] || actions[names[0]]
      if (action) action.reset().fadeIn(0.3).play()
    }
  }, [actions, names])

  useEffect(() => {
    if (!group.current) return
    group.current.position.set(...position)
    group.current.rotation.set(...rotation)
  }, []) // eslint-disable-line

  useFrame(({ clock }) => {
    if (!group.current) return
    const t = clock.elapsedTime
    const s = seed.current

    const breathe = Math.sin(t * 1.15 + s) * 0.009
    const sway    = Math.sin(t * 0.65 + s * 0.7) * 0.013

    const isUnderPressure = charName === 'melissa' && (speakingCharacter === 'kelly' || speakingCharacter === 'nadine')
    const isLeaning       = (charName === 'kelly' || charName === 'nadine') && speakingCharacter === charName

    const targetLeanZ    = isLeaning       ? 0.08  : 0
    const targetTensionX = isUnderPressure ? 0.045 : 0

    group.current.position.x = position[0]
    group.current.position.z = position[2]
    group.current.position.y = position[1] + breathe

    group.current.rotation.y = rotation[1]
    group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, sway + targetLeanZ,  0.05)
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetTensionX,      0.05)

    if (headBone.current) {
      const target = headTurnY(charName, speakingCharacter)
      headBone.current.rotation.y = THREE.MathUtils.lerp(headBone.current.rotation.y, target, 0.04)
    }
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
      <SMAA />

      {/* Very subtle bloom — catches the fluorescent panels and skin highlights */}
      <Bloom
        luminanceThreshold={0.92}
        luminanceSmoothing={0.2}
        intensity={0.45}
        mipmapBlur
        radius={0.5}
      />

      {/* Slight warm indoor grade */}
      <HueSaturation
        hue={0.008}
        saturation={0.04}
        blendFunction={BlendFunction.NORMAL}
      />
      <BrightnessContrast brightness={0.01} contrast={0.13} />

      {/* Cinematic vignette */}
      <Vignette eskil={false} offset={0.3} darkness={0.68} />
    </EffectComposer>
  )
}

// ── Scene assembly ────────────────────────────────────────────────────────────

function SceneContents({ activeCharacter }) {
  return (
    <>
      <SceneSetup />

      {/* Neutral indoor HDR — studio preset suits the artificial lighting */}
      <Suspense fallback={null}>
        <Environment preset="studio" background={false} />
      </Suspense>

      {/* ── Lighting ── */}

      {/* Warm fill so characters don't go fully dark on shadow side */}
      <ambientLight intensity={0.55} color="#ffe8cc" />

      {/* Key light: overhead angle, warm white, matching fluorescent positions */}
      <directionalLight
        position={[1, 4, 2]}
        intensity={1.6}
        color="#fff5e0"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-4}
        shadow-radius={5}
        shadow-bias={-0.0003}
      />
      {/* Cool back-fill — prevents flat look, simulates reflected light from brick */}
      <directionalLight position={[-2, 3, -6]} intensity={0.35} color="#ffd8b0" />

      <SchoolCorridor />

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
        antialias: false,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.2,
        outputColorSpace: THREE.SRGBColorSpace,
        powerPreference: 'high-performance',
      }}
      performance={{ min: 0.5 }}
    >
      <SceneContents activeCharacter={activeCharacter} />
    </Canvas>
  )
}

useGLTF.preload('/assets/models/Melissa.glb')
useGLTF.preload('/assets/models/Kelly.glb')
useGLTF.preload('/assets/models/Nadine.glb')
useGLTF.preload('/assets/models/Sthandile.glb')
