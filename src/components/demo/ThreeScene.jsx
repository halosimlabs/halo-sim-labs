import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
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
    scene.environmentIntensity = 0.15
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
        intensity={1.6 * intensity}
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

// ── Procedural canvas textures ────────────────────────────────────────────────
// Created once on first render, shared across all corridor instances.

function drawBrickColor(canvas) {
  const W = 512, H = 256
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')
  const BW = 118, BH = 44, MV = 7, MH = 10  // brick + mortar dims in px
  const cStride = BW + MV, rStride = BH + MH
  const rows = Math.ceil(H / rStride) + 1
  const cols = Math.ceil(W / cStride) + 2
  // Mortar — warm grey
  ctx.fillStyle = '#8a7a6e'
  ctx.fillRect(0, 0, W, H)
  for (let r = 0; r < rows; r++) {
    const y = r * rStride + MH * 0.5
    const ox = (r % 2) * (cStride / 2)
    for (let c = 0; c < cols; c++) {
      const x = c * cStride - ox + MV * 0.5
      // Per-brick colour variation — deterministic, no Math.random
      const v = Math.sin(r * 7.31 + c * 13.77) * 16
      const rc = Math.min(255, Math.max(0, Math.round(142 + v)))
      const gc = Math.min(255, Math.max(0, Math.round(66  + v * 0.38)))
      const bc = Math.min(255, Math.max(0, Math.round(42  + v * 0.28)))
      ctx.fillStyle = `rgb(${rc},${gc},${bc})`
      ctx.fillRect(x, y, BW, BH)
      // Top-edge shadow — gives each brick a raised look
      ctx.fillStyle = 'rgba(0,0,0,0.18)'
      ctx.fillRect(x, y, BW, 3)
      // Bottom highlight — catches the light
      ctx.fillStyle = 'rgba(255,255,255,0.07)'
      ctx.fillRect(x, y + BH - 3, BW, 3)
    }
  }
}

function drawBrickBump(canvas) {
  const W = 512, H = 256
  canvas.width = W; canvas.height = H
  const ctx = canvas.getContext('2d')
  const BW = 118, BH = 44, MV = 7, MH = 10
  const cStride = BW + MV, rStride = BH + MH
  const rows = Math.ceil(H / rStride) + 1
  const cols = Math.ceil(W / cStride) + 2
  // Mortar = dark (low/recessed)
  ctx.fillStyle = '#363636'
  ctx.fillRect(0, 0, W, H)
  for (let r = 0; r < rows; r++) {
    const y = r * rStride + MH * 0.5
    const ox = (r % 2) * (cStride / 2)
    for (let c = 0; c < cols; c++) {
      const x = c * cStride - ox + MV * 0.5
      // Brick face = lighter (raised)
      ctx.fillStyle = '#b2b2b2'
      ctx.fillRect(x, y, BW, BH)
      // Brighter centre — peak of the raised surface
      ctx.fillStyle = '#d0d0d0'
      ctx.fillRect(x + 4, y + 4, BW - 8, BH - 8)
      // Recessed edge bevel
      ctx.fillStyle = '#787878'
      ctx.fillRect(x, y, BW, 2)
      ctx.fillRect(x, y, 2, BH)
    }
  }
}

function drawFloorConcrete(canvas) {
  const S = 512
  canvas.width = canvas.height = S
  const ctx = canvas.getContext('2d')
  // Dark charcoal base
  ctx.fillStyle = '#2c2c2a'
  ctx.fillRect(0, 0, S, S)
  // Layered sin-based noise to break up the flat look
  for (let y = 0; y < S; y += 2) {
    for (let x = 0; x < S; x += 2) {
      const n =
        Math.sin(x * 0.031 + y * 0.017) * 7 +
        Math.sin(x * 0.11  - y * 0.073) * 4 +
        Math.sin(x * 0.057 + y * 0.13 ) * 3
      const v = Math.round(44 + n)
      ctx.fillStyle = `rgb(${v},${v},${v - 2})`
      ctx.fillRect(x, y, 2, 2)
    }
  }
  // Subtle darker patches — worn areas
  for (let i = 0; i < 6; i++) {
    const px = (Math.sin(i * 37.1) * 0.5 + 0.5) * S
    const py = (Math.sin(i * 53.7) * 0.5 + 0.5) * S
    const r  = 40 + (Math.sin(i * 19.3) * 0.5 + 0.5) * 60
    const g  = ctx.createRadialGradient(px, py, 0, px, py, r)
    g.addColorStop(0, 'rgba(0,0,0,0.18)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, S, S)
  }
}

// Lazy-initialised texture singletons (one canvas each, multiple CanvasTextures)
const _ctex = {}
function getCorridorTextures() {
  if (_ctex.ready) return _ctex

  const brickColorCanvas = document.createElement('canvas')
  const brickBumpCanvas  = document.createElement('canvas')
  const floorCanvas      = document.createElement('canvas')
  drawBrickColor(brickColorCanvas)
  drawBrickBump (brickBumpCanvas)
  drawFloorConcrete(floorCanvas)

  // Side walls — 30 m long × 2.5 m brick height
  // Real brick 225 mm × 75 mm; canvas = 4 bricks wide, 4 rows tall
  // repeat X = 30 / 0.225 / 4 ≈ 33   repeat Y = 2.5 / 0.075 / 4 ≈ 8
  const mkTex = (canvas, rX, rY) => {
    const t = new THREE.CanvasTexture(canvas)
    t.wrapS = t.wrapT = THREE.RepeatWrapping
    t.repeat.set(rX, rY)
    t.needsUpdate = true
    return t
  }
  _ctex.wallBrickL  = mkTex(brickColorCanvas, 33, 8)
  _ctex.wallBumpL   = mkTex(brickBumpCanvas,  33, 8)
  _ctex.wallBrickR  = mkTex(brickColorCanvas, 33, 8)
  _ctex.wallBumpR   = mkTex(brickBumpCanvas,  33, 8)
  // Back wall — 8.4 m wide × 2.5 m brick height → repeat (9, 8)
  _ctex.backBrick   = mkTex(brickColorCanvas, 9,  8)
  _ctex.backBump    = mkTex(brickBumpCanvas,  9,  8)
  // Floor — 8.4 m × 30 m, 30 cm tiles, 2 tiles per canvas → repeat (14, 50)
  _ctex.floor       = mkTex(floorCanvas, 6, 20)

  _ctex.ready = true
  return _ctex
}

// ── SA School Corridor ────────────────────────────────────────────────────────

function SchoolCorridor() {
  const tex = getCorridorTextures()

  const wallX    = 4.2   // half-width (interior face)
  const ceilY    = 3.45
  const zNear    =  6    // slightly behind camera
  const zFar     = -24
  const len      = zNear - zFar   // 30 m
  const zMid     = (zNear + zFar) / 2   // −9
  const wainscotH = 0.95
  const brickH    = ceilY - wainscotH   // 2.5 m

  return (
    <>
      {/* ── Floor — textured polished tile ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, zMid]} receiveShadow>
        <planeGeometry args={[wallX * 2, len]} />
        <meshStandardMaterial map={tex.floor} roughness={0.88} metalness={0.0} />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, ceilY, zMid]}>
        <planeGeometry args={[wallX * 2, len]} />
        <meshStandardMaterial color="#f0ece0" roughness={0.92} />
      </mesh>

      {/* ── Left wall — faces +X (into corridor) ── */}
      {/* Brick section */}
      <mesh rotation={[0, Math.PI / 2, 0]}
            position={[-wallX, wainscotH + brickH / 2, zMid]} receiveShadow>
        <planeGeometry args={[len, brickH]} />
        <meshStandardMaterial
          map={tex.wallBrickL}
          bumpMap={tex.wallBumpL}
          bumpScale={0.024}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      {/* Wainscot */}
      <mesh rotation={[0, Math.PI / 2, 0]}
            position={[-wallX, wainscotH / 2, zMid]}>
        <planeGeometry args={[len, wainscotH]} />
        <meshStandardMaterial color="#2d5038" roughness={0.78} metalness={0.03} />
      </mesh>
      {/* Cap rail */}
      <mesh position={[-wallX + 0.025, wainscotH + 0.045, zMid]}>
        <boxGeometry args={[0.05, 0.09, len]} />
        <meshStandardMaterial color="#1c3024" roughness={0.72} metalness={0.04} />
      </mesh>

      {/* ── Right wall — faces −X (into corridor) ── */}
      <mesh rotation={[0, -Math.PI / 2, 0]}
            position={[wallX, wainscotH + brickH / 2, zMid]} receiveShadow>
        <planeGeometry args={[len, brickH]} />
        <meshStandardMaterial
          map={tex.wallBrickR}
          bumpMap={tex.wallBumpR}
          bumpScale={0.024}
          roughness={0.9}
          metalness={0.0}
        />
      </mesh>
      <mesh rotation={[0, -Math.PI / 2, 0]}
            position={[wallX, wainscotH / 2, zMid]}>
        <planeGeometry args={[len, wainscotH]} />
        <meshStandardMaterial color="#2d5038" roughness={0.78} metalness={0.03} />
      </mesh>
      <mesh position={[wallX - 0.025, wainscotH + 0.045, zMid]}>
        <boxGeometry args={[0.05, 0.09, len]} />
        <meshStandardMaterial color="#1c3024" roughness={0.72} metalness={0.04} />
      </mesh>

      {/* ── Back wall ── */}
      <mesh position={[0, wainscotH + brickH / 2, zFar]}>
        <planeGeometry args={[wallX * 2, brickH]} />
        <meshStandardMaterial
          map={tex.backBrick}
          bumpMap={tex.backBump}
          bumpScale={0.024}
          roughness={0.92}
        />
      </mesh>
      <mesh position={[0, wainscotH / 2, zFar + 0.01]}>
        <planeGeometry args={[wallX * 2, wainscotH]} />
        <meshStandardMaterial color="#2d5038" roughness={0.82} />
      </mesh>

      {/* ── Fluorescent ceiling lights ── */}
      <FluorescentPanel z={ 0.5} intensity={1.00} />
      <FluorescentPanel z={-4.5} intensity={0.92} />
      <FluorescentPanel z={-9.0} intensity={0.80} />
      <FluorescentPanel z={-13.5} intensity={0.65} />
      <FluorescentPanel z={-18.0} intensity={0.48} />

      {/* ── Notice boards on right wall ── */}
      <NoticeBoard z={-1.5} scale={1.0} />
      <NoticeBoard z={-5.5} scale={0.95} />
      <NoticeBoard z={-9.5} scale={0.9} />

      {/* ── Ledge on left wall (visible in reference photo) ── */}
      <mesh position={[-wallX + 0.14, 1.0, -1.8]}>
        <boxGeometry args={[0.28, 0.05, 0.9]} />
        <meshStandardMaterial color="#1c3024" roughness={0.75} />
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
    // Background pair — bodies already face each other, tiny head tilt inward
    nothando:  { senzi:    0.08 },
    senzi:     { nothando: 0.08 },
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
            mc.envMapIntensity = 0.2
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

      {/* ── Lighting ── */}

      {/* Warm fill — lower so characters sit in the corridor's natural dimness */}
      <ambientLight intensity={0.08} color="#ffe8cc" />

      {/* Key light: overhead fluorescent angle, toned down */}
      <directionalLight
        position={[1, 4, 2]}
        intensity={0.45}
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
      {/* Brick-bounce fill — subtle */}
      <directionalLight position={[-2, 3, -6]} intensity={0.16} color="#ffd8b0" />

      <SchoolCorridor />

      <Suspense fallback={null}>
        {/* Foreground group — brought forward, Melissa closer to her friends */}
        <Character url="/assets/models/Melissa.glb"
          position={[-0.8, 1.1, 2.0]}  rotation={[0,  Math.PI * 0.18, 0]}
          isActive={activeCharacter === 'melissa'}   charName="melissa"   speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Kelly.glb"
          position={[0.8,  1.1, 0.8]}  rotation={[0, -Math.PI * 0.14, 0]}
          isActive={activeCharacter === 'kelly'}     charName="kelly"     speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Sthandile.glb"
          position={[1.7,  1.1, 1.2]}  rotation={[0, -Math.PI * 0.22, 0]}
          isActive={activeCharacter === 'sthandile'} charName="sthandile" speakingCharacter={activeCharacter} />
        <Character url="/assets/models/Nadine.glb"
          position={[0.2,  1.1, 1.8]}  rotation={[0, -Math.PI * 0.08, 0]}
          isActive={activeCharacter === 'nadine'}    charName="nadine"    speakingCharacter={activeCharacter} />

        {/* Background pair — close friends, face-to-face conversation */}
        <Character url="/assets/models/Nothando.glb"
          position={[-0.22, 1.1, -7.4]} rotation={[0,  Math.PI * 0.5, 0]}
          isActive={false} charName="nothando" speakingCharacter="senzi" />
        <Character url="/assets/models/Senzi.glb"
          position={[ 0.22, 1.1, -7.6]} rotation={[0, -Math.PI * 0.5, 0]}
          isActive={false} charName="senzi"    speakingCharacter="nothando" />
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
        toneMappingExposure: 0.82,
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
useGLTF.preload('/assets/models/Nothando.glb')
useGLTF.preload('/assets/models/Senzi.glb')
