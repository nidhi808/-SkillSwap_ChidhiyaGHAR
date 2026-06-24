import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface RobotCanvasProps {
  scrollProgress: number; // 0 to 1 representing scroll position of landing page
  activeSection: string;  // 'landing' | 'auth' | 'profile' | 'dashboard' | 'whiteboard'
  visorState: 'eyes' | 'quote' | 'swap' | 'success' | 'camera';
}

export const RobotCanvas: React.FC<RobotCanvasProps> = ({
  scrollProgress,
  activeSection,
  visorState,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Track props in refs to prevent rebuilding WebGL context on scroll
  const scrollProgressRef = useRef(scrollProgress);
  const activeSectionRef = useRef(activeSection);
  const visorStateRef = useRef(visorState);

  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    visorStateRef.current = visorState;
  }, [visorState]);

  // Refs for animation targets
  const robotGroupRef = useRef<THREE.Group | null>(null);
  const headGroupRef = useRef<THREE.Group | null>(null);
  const torsoGroupRef = useRef<THREE.Group | null>(null);
  const chestPlateRef = useRef<THREE.Mesh | null>(null);
  
  // Left arm refs
  const leftShoulderRef = useRef<THREE.Group | null>(null);
  const leftElbowRef = useRef<THREE.Group | null>(null);
  const leftHandRef = useRef<THREE.Group | null>(null);
  const leftFingersRef = useRef<THREE.Group[]>([]);

  // Right arm refs
  const rightShoulderRef = useRef<THREE.Group | null>(null);
  const rightElbowRef = useRef<THREE.Group | null>(null);
  const rightHandRef = useRef<THREE.Group | null>(null);
  const rightFingersRef = useRef<THREE.Group[]>([]);
  
  // Visor dynamic 2D canvas texture refs
  const visorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const visorTextureRef = useRef<THREE.CanvasTexture | null>(null);

  // Mouse coords for tracking
  const mouseRef = useRef({ x: 0, y: 0 });

  // Animation gesture state
  const gestureStateRef = useRef<'idle' | 'wave'>('idle');
  const gestureTimerRef = useRef<number>(0);

  useEffect(() => {
    const handleMouseMove = (e: PointerEvent) => {
      // Normalize: -0.5 to +0.5
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('pointermove', handleMouseMove);
    return () => window.removeEventListener('pointermove', handleMouseMove);
  }, []);

  // Visor screen drawing logic
  const drawVisorTexture = (ctx: CanvasRenderingContext2D, state: string, time: number) => {
    // Clear canvas with dark futuristic dashboard background
    ctx.fillStyle = '#050508';
    ctx.fillRect(0, 0, 256, 176);

    // Draw glowing tech dot-grid pattern (15% opacity)
    ctx.fillStyle = 'rgba(0, 240, 255, 0.15)';
    for (let x = 16; x < 256; x += 16) {
      for (let y = 16; y < 176; y += 16) {
        ctx.fillRect(x, y, 1.5, 1.5);
      }
    }

    // Inner glowing thin bezel border
    ctx.strokeStyle = 'rgba(0, 240, 255, 0.3)';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, 236, 156);
    
    if (state === 'eyes') {
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 12;
      
      // Calculate dynamic eye offsets based on mouse positions
      const eyeOffsetX = mouseRef.current.x * 24; // Up to +/- 12px shift
      const eyeOffsetY = mouseRef.current.y * 16; // Up to +/- 8px shift
      
      // blinking logic based on time
      const blink = Math.sin(time * 0.05) > 0.98;
      
      if (blink) {
        ctx.fillRect(72 + eyeOffsetX, 87 + eyeOffsetY, 22, 2);
        ctx.fillRect(162 + eyeOffsetX, 87 + eyeOffsetY, 22, 2);
      } else {
        // Draw left eye circle with offset
        ctx.beginPath();
        ctx.arc(83 + eyeOffsetX, 88 + eyeOffsetY, 11, 0, Math.PI * 2);
        ctx.fill();

        // Draw right eye circle with offset
        ctx.beginPath();
        ctx.arc(173 + eyeOffsetX, 88 + eyeOffsetY, 11, 0, Math.PI * 2);
        ctx.fill();
      }

    } else if (state === 'quote') {
      ctx.fillStyle = '#bd00ff';
      ctx.shadowColor = '#bd00ff';
      ctx.shadowBlur = 15;
      ctx.font = 'bold 90px "Outfit", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('“', 128, 105);

    } else if (state === 'swap') {
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Left-to-right arrow
      ctx.beginPath();
      ctx.moveTo(60, 68);
      ctx.lineTo(190, 68);
      ctx.lineTo(165, 45);
      ctx.moveTo(190, 68);
      ctx.lineTo(165, 90);
      ctx.stroke();

      // Right-to-left arrow (colored Purple)
      ctx.strokeStyle = '#bd00ff';
      ctx.shadowColor = '#bd00ff';
      ctx.beginPath();
      ctx.moveTo(196, 118);
      ctx.lineTo(66, 118);
      ctx.lineTo(91, 95);
      ctx.moveTo(66, 118);
      ctx.lineTo(91, 140);
      ctx.stroke();

    } else if (state === 'success') {
      ctx.strokeStyle = '#28efce';
      ctx.shadowColor = '#28efce';
      ctx.shadowBlur = 15;
      ctx.lineWidth = 12;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';

      // Draw checkmark
      ctx.beginPath();
      ctx.moveTo(65, 90);
      ctx.lineTo(110, 132);
      ctx.lineTo(190, 52);
      ctx.stroke();
      
    } else if (state === 'camera') {
      ctx.strokeStyle = '#00f0ff';
      ctx.shadowColor = '#00f0ff';
      ctx.shadowBlur = 10;
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      
      // Draw camera body
      ctx.strokeRect(78, 58, 100, 60);
      ctx.beginPath();
      ctx.arc(128, 88, 16, 0, Math.PI * 2);
      ctx.stroke();
      
      // Flash indicator
      ctx.fillStyle = '#bd00ff';
      ctx.shadowColor = '#bd00ff';
      ctx.beginPath();
      ctx.arc(96, 72, 5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  useEffect(() => {
    if (!mountRef.current) return;

    // Create 2D canvas for visor texture
    const vCanvas = document.createElement('canvas');
    vCanvas.width = 256;
    vCanvas.height = 176;
    visorCanvasRef.current = vCanvas;

    const ctx = vCanvas.getContext('2d');
    if (ctx) {
      drawVisorTexture(ctx, visorStateRef.current, 0);
    }

    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      42,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      100
    );
    camera.position.z = 8.5;

    // Renderer with shadows enabled
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);

    // Dynamic Visor Texture
    const texture = new THREE.CanvasTexture(vCanvas);
    visorTextureRef.current = texture;

    // Programmatically create the glowing rainbow gradient texture for the bezel frame
    const rainbowCanvas = document.createElement('canvas');
    rainbowCanvas.width = 256;
    rainbowCanvas.height = 256;
    const rCtx = rainbowCanvas.getContext('2d');
    if (rCtx) {
      const gradient = rCtx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, '#00f0ff');   // Cyan
      gradient.addColorStop(0.3, '#bd00ff');  // Purple
      gradient.addColorStop(0.65, '#ff00aa'); // Pink
      gradient.addColorStop(1, '#28efce');    // Green
      rCtx.fillStyle = gradient;
      rCtx.fillRect(0, 0, 256, 256);
    }
    const rainbowTexture = new THREE.CanvasTexture(rainbowCanvas);

    // MATERIALS - Premium High-Fidelity Ceramic
    const ceramicMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfbfeff,
      roughness: 0.08,
      metalness: 0.04,
      clearcoat: 1.0,
      clearcoatRoughness: 0.03,
      reflectivity: 0.95,
      transmission: 0.12,
      thickness: 0.4,
    });

    // Dark grey/black metallic joints, core casing, and pedestal structure
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1d24,
      roughness: 0.18,
      metalness: 0.9,
    });

    const rainbowBezelMaterial = new THREE.MeshStandardMaterial({
      map: rainbowTexture,
      roughness: 0.15,
      metalness: 0.2,
      emissive: 0x222222,
    });

    // Invisible Floor plane to capture dynamic shadows
    const floorGeo = new THREE.PlaneGeometry(12, 12);
    const floorMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.y = -4.85;
    floorMesh.receiveShadow = true;
    scene.add(floorMesh);

    // Create Main Robot group
    const robot = new THREE.Group();
    robotGroupRef.current = robot;
    scene.add(robot);

    // 1. BOX PEDESTAL (Sleek dark beveled cuboid block matching ChainGPT)
    const pedestalShape = new THREE.Shape();
    const pRadius = 0.15;
    const pWidth = 2.2;
    const pHeight = 2.2;
    const px = -pWidth / 2;
    const py = -pHeight / 2;
    pedestalShape.moveTo(px, py + pRadius);
    pedestalShape.lineTo(px, py + pHeight - pRadius);
    pedestalShape.quadraticCurveTo(px, py + pHeight, px + pRadius, py + pHeight);
    pedestalShape.lineTo(px + pWidth - pRadius, py + pHeight);
    pedestalShape.quadraticCurveTo(px + pWidth, py + pHeight, px + pWidth, py + pHeight - pRadius);
    pedestalShape.lineTo(px + pWidth, py + pRadius);
    pedestalShape.quadraticCurveTo(px + pWidth, py, px + pWidth - pRadius, py);
    pedestalShape.lineTo(px + pRadius, py);
    pedestalShape.quadraticCurveTo(px, py, px, py + pRadius);

    const pedestalExtrudeSettings = {
      depth: 0.8,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.04
    };
    const pedestalGeo = new THREE.ExtrudeGeometry(pedestalShape, pedestalExtrudeSettings);
    pedestalGeo.center();
    pedestalGeo.rotateX(Math.PI / 2);
    const pedestal = new THREE.Mesh(pedestalGeo, darkMetalMaterial);
    pedestal.position.set(0, -4.8, 0);
    pedestal.castShadow = true;
    pedestal.receiveShadow = true;
    robot.add(pedestal);

    // Emissive materials for glowing cybernetic highlights
    const glowCyanMat = new THREE.MeshBasicMaterial({ color: 0x00f0ff });
    const glowPurpleMat = new THREE.MeshBasicMaterial({ color: 0xbd00ff });
    const glowPinkMat = new THREE.MeshBasicMaterial({ color: 0xff00aa });

    // 2. TORSO / SKELETON BASE GROUP
    const torsoGroup = new THREE.Group();
    torsoGroup.position.set(0, -1.8, 0);
    torsoGroupRef.current = torsoGroup;
    robot.add(torsoGroup);

    // Mechanical Spine core
    const spineGeo = new THREE.CylinderGeometry(0.24, 0.3, 0.8, 16);
    const spineMesh = new THREE.Mesh(spineGeo, darkMetalMaterial);
    spineMesh.position.set(0, -0.5, 0);
    spineMesh.castShadow = true;
    spineMesh.receiveShadow = true;
    torsoGroup.add(spineMesh);

    // Spine hydraulic pistons (Left & Right)
    const spinePistonGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.6, 8);
    const leftSpinePiston = new THREE.Mesh(spinePistonGeo, darkMetalMaterial);
    leftSpinePiston.position.set(-0.35, -0.5, 0);
    leftSpinePiston.castShadow = true;
    torsoGroup.add(leftSpinePiston);

    const rightSpinePiston = new THREE.Mesh(spinePistonGeo, darkMetalMaterial);
    rightSpinePiston.position.set(0.35, -0.5, 0);
    rightSpinePiston.castShadow = true;
    torsoGroup.add(rightSpinePiston);

    // Waist Hip Plate (Terminates the torso, replacing legs to match ChainGPT)
    const waistShieldGeo = new THREE.CylinderGeometry(0.65, 0.45, 0.45, 16);
    const waistShield = new THREE.Mesh(waistShieldGeo, ceramicMaterial);
    waistShield.position.set(0, -0.95, 0);
    waistShield.castShadow = true;
    waistShield.receiveShadow = true;
    torsoGroup.add(waistShield);

    // Shiny upper chest plate (Rounded Extruded)
    const chestShape = new THREE.Shape();
    const cRadius = 0.35;
    const cWidth = 2.1;
    const cHeight = 1.0;
    const cx = -cWidth / 2;
    const cy = -cHeight / 2;
    chestShape.moveTo(cx, cy + cRadius);
    chestShape.lineTo(cx, cy + cHeight - cRadius);
    chestShape.quadraticCurveTo(cx, cy + cHeight, cx + cRadius, cy + cHeight);
    chestShape.lineTo(cx + cWidth - cRadius, cy + cHeight);
    chestShape.quadraticCurveTo(cx + cWidth, cy + cHeight, cx + cWidth, cy + cHeight - cRadius);
    chestShape.lineTo(cx + cWidth, cy + cRadius);
    chestShape.quadraticCurveTo(cx + cWidth, cy, cx + cWidth - cRadius, cy);
    chestShape.lineTo(cx + cRadius, cy);
    chestShape.quadraticCurveTo(cx, cy, cx, cy + cRadius);

    const chestExtrudeSettings = {
      depth: 1.1,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.08,
      bevelThickness: 0.08
    };
    const chestPlateGeo = new THREE.ExtrudeGeometry(chestShape, chestExtrudeSettings);
    chestPlateGeo.center();
    const chestPlate = new THREE.Mesh(chestPlateGeo, ceramicMaterial);
    chestPlate.position.set(0, 0.2, 0);
    chestPlate.castShadow = true;
    chestPlate.receiveShadow = true;
    chestPlateRef.current = chestPlate;
    torsoGroup.add(chestPlate);

    // Glowing Chest Core (Reactor Core Detail)
    const chestCoreHousingGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.1, 32);
    chestCoreHousingGeo.rotateX(Math.PI / 2);
    const chestCoreHousing = new THREE.Mesh(chestCoreHousingGeo, darkMetalMaterial);
    chestCoreHousing.position.set(0, 0.2, 0.6);
    torsoGroup.add(chestCoreHousing);

    const chestCoreGlowGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.12, 32);
    chestCoreGlowGeo.rotateX(Math.PI / 2);
    const chestCoreGlow = new THREE.Mesh(chestCoreGlowGeo, glowCyanMat);
    chestCoreGlow.position.set(0, 0.2, 0.61);
    torsoGroup.add(chestCoreGlow);

    // Collar Dot indicators
    const collarDotGeo = new THREE.SphereGeometry(0.065, 16, 16);
    const dot1 = new THREE.Mesh(collarDotGeo, glowCyanMat);
    dot1.position.set(-0.35, 0.6, 0.6);
    torsoGroup.add(dot1);

    const dot2 = new THREE.Mesh(collarDotGeo, glowPinkMat);
    dot2.position.set(0, 0.6, 0.6);
    torsoGroup.add(dot2);

    const dot3 = new THREE.Mesh(collarDotGeo, glowPurpleMat);
    dot3.position.set(0.35, 0.6, 0.6);
    torsoGroup.add(dot3);

    // Helper to generate a detailed segmented mechanical limb (cylinder skeleton + outer ceramic shield)
    const buildSegmentedLimb = (length: number, width: number) => {
      const group = new THREE.Group();
      
      // Inner metallic core piston
      const pistonGeo = new THREE.CylinderGeometry(width * 0.5, width * 0.4, length, 16);
      const piston = new THREE.Mesh(pistonGeo, darkMetalMaterial);
      piston.position.set(0, -length * 0.5, 0);
      piston.castShadow = true;
      piston.receiveShadow = true;
      group.add(piston);

      // Outer sleek white armor plate shield covering the front
      const shieldGeo = new THREE.BoxGeometry(width * 1.5, length * 0.88, width * 1.3, 2, 2, 2);
      const shield = new THREE.Mesh(shieldGeo, ceramicMaterial);
      shield.position.set(0, -length * 0.5, width * 0.35);
      shield.castShadow = true;
      shield.receiveShadow = true;
      group.add(shield);

      // Cyber highlight strip on shield
      const stripeGeo = new THREE.BoxGeometry(width * 0.2, length * 0.6, 0.05);
      const stripe = new THREE.Mesh(stripeGeo, glowCyanMat);
      stripe.position.set(0, -length * 0.5, width * 0.35 + width * 0.5 + 0.03);
      group.add(stripe);

      return group;
    };

    // Helper to build a multi-segmented detailed robotic hand with individual fingers
    const buildRoboticHand = (side: 'left' | 'right') => {
      const handGroup = new THREE.Group();
      
      // Palm
      const palmGeo = new THREE.BoxGeometry(0.32, 0.25, 0.16);
      const palm = new THREE.Mesh(palmGeo, darkMetalMaterial);
      palm.position.set(0, -0.12, 0);
      palm.castShadow = true;
      palm.receiveShadow = true;
      handGroup.add(palm);

      // Ceramic guard on palm back
      const guardGeo = new THREE.BoxGeometry(0.34, 0.18, 0.08);
      const guard = new THREE.Mesh(guardGeo, ceramicMaterial);
      guard.position.set(0, -0.12, side === 'left' ? -0.1 : 0.1);
      guard.castShadow = true;
      handGroup.add(guard);

      const fingerJointGeo = new THREE.SphereGeometry(0.045, 8, 8);
      const phalanxGeo1 = new THREE.CylinderGeometry(0.035, 0.03, 0.14, 8);
      const phalanxGeo2 = new THREE.CylinderGeometry(0.025, 0.02, 0.11, 8);

      const fingers: THREE.Group[] = [];

      // Generate 3 fingers (Thumb, Index, Middle)
      const xPositions = [-0.09, 0, 0.09];
      for (let i = 0; i < 3; i++) {
        const finger = new THREE.Group();
        finger.position.set(xPositions[i], -0.22, 0);

        // Knuckle 1
        const k1 = new THREE.Mesh(fingerJointGeo, darkMetalMaterial);
        finger.add(k1);

        // Phalanx 1
        const p1 = new THREE.Mesh(phalanxGeo1, ceramicMaterial);
        p1.position.set(0, -0.07, 0);
        p1.castShadow = true;
        finger.add(p1);

        // Knuckle 2
        const k2 = new THREE.Mesh(fingerJointGeo, darkMetalMaterial);
        k2.position.set(0, -0.14, 0);
        finger.add(k2);

        // Phalanx 2
        const p2 = new THREE.Mesh(phalanxGeo2, ceramicMaterial);
        p2.position.set(0, -0.195, 0);
        p2.castShadow = true;
        finger.add(p2);

        // Default resting curl rotation
        finger.rotation.x = 0.25;

        handGroup.add(finger);
        fingers.push(finger);
      }

      return { handGroup, fingers };
    };

    const jointGeo = new THREE.SphereGeometry(0.24, 16, 16);

    // 3. LEFT ARM SKELETON
    const leftShoulder = new THREE.Group();
    leftShoulder.position.set(-1.25, 0.5, 0);
    leftShoulderRef.current = leftShoulder;
    torsoGroup.add(leftShoulder);

    const leftShoulderJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    leftShoulderJoint.castShadow = true;
    leftShoulder.add(leftShoulderJoint);

    const leftUpperArm = buildSegmentedLimb(0.75, 0.22);
    leftShoulder.add(leftUpperArm);

    const leftElbow = new THREE.Group();
    leftElbow.position.set(0, -0.75, 0);
    leftElbowRef.current = leftElbow;
    leftShoulder.add(leftElbow);

    const leftElbowJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    leftElbowJoint.castShadow = true;
    leftElbow.add(leftElbowJoint);

    const leftForearm = buildSegmentedLimb(0.75, 0.18);
    leftElbow.add(leftForearm);

    const leftHandResult = buildRoboticHand('left');
    const leftHand = leftHandResult.handGroup;
    leftHand.position.set(0, -0.75, 0);
    leftHandRef.current = leftHand;
    leftFingersRef.current = leftHandResult.fingers;
    leftElbow.add(leftHand);

    // 4. RIGHT ARM SKELETON
    const rightShoulder = new THREE.Group();
    rightShoulder.position.set(1.25, 0.5, 0);
    rightShoulderRef.current = rightShoulder;
    torsoGroup.add(rightShoulder);

    const rightShoulderJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    rightShoulderJoint.castShadow = true;
    rightShoulder.add(rightShoulderJoint);

    const rightUpperArm = buildSegmentedLimb(0.75, 0.22);
    rightShoulder.add(rightUpperArm);

    const rightElbow = new THREE.Group();
    rightElbow.position.set(0, -0.75, 0);
    rightElbowRef.current = rightElbow;
    rightShoulder.add(rightElbow);

    const rightElbowJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    rightElbowJoint.castShadow = true;
    rightElbow.add(rightElbowJoint);

    const rightForearm = buildSegmentedLimb(0.75, 0.18);
    rightElbow.add(rightForearm);

    const rightHandResult = buildRoboticHand('right');
    const rightHand = rightHandResult.handGroup;
    rightHand.position.set(0, -0.75, 0);
    rightHandRef.current = rightHand;
    rightFingersRef.current = rightHandResult.fingers;
    rightElbow.add(rightHand);

    // 4b. ROBOTIC LEGS (Standing on the cuboid pedestal to match ChainGPT reference)
    const footGeo = new THREE.BoxGeometry(0.28, 0.12, 0.45);

    // Left Leg Group
    const leftThighGroup = new THREE.Group();
    leftThighGroup.position.set(-0.38, -1.0, 0);
    leftThighGroup.rotation.x = -0.15;
    torsoGroup.add(leftThighGroup);

    const leftThighJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    leftThighJoint.scale.set(0.7, 0.7, 0.7);
    leftThighGroup.add(leftThighJoint);

    const leftThigh = buildSegmentedLimb(0.7, 0.18);
    leftThighGroup.add(leftThigh);

    const leftShinGroup = new THREE.Group();
    leftShinGroup.position.set(0, -0.7, 0);
    leftShinGroup.rotation.x = 0.3;
    leftThighGroup.add(leftShinGroup);

    const leftKneeJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    leftKneeJoint.scale.set(0.6, 0.6, 0.6);
    leftShinGroup.add(leftKneeJoint);

    const leftShin = buildSegmentedLimb(0.7, 0.15);
    leftShinGroup.add(leftShin);

    const leftFootGroup = new THREE.Group();
    leftFootGroup.position.set(0, -0.7, 0);
    leftFootGroup.rotation.x = -0.15;
    leftShinGroup.add(leftFootGroup);

    const leftAnkleJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    leftAnkleJoint.scale.set(0.4, 0.4, 0.4);
    leftFootGroup.add(leftAnkleJoint);

    const leftFoot = new THREE.Mesh(footGeo, ceramicMaterial);
    leftFoot.position.set(0, -0.06, 0.1);
    leftFoot.castShadow = true;
    leftFoot.receiveShadow = true;
    leftFootGroup.add(leftFoot);

    // Right Leg Group
    const rightThighGroup = new THREE.Group();
    rightThighGroup.position.set(0.38, -1.0, 0);
    rightThighGroup.rotation.x = -0.15;
    torsoGroup.add(rightThighGroup);

    const rightThighJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    rightThighJoint.scale.set(0.7, 0.7, 0.7);
    rightThighGroup.add(rightThighJoint);

    const rightThigh = buildSegmentedLimb(0.7, 0.18);
    rightThighGroup.add(rightThigh);

    const rightShinGroup = new THREE.Group();
    rightShinGroup.position.set(0, -0.7, 0);
    rightShinGroup.rotation.x = 0.3;
    rightThighGroup.add(rightShinGroup);

    const rightKneeJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    rightKneeJoint.scale.set(0.6, 0.6, 0.6);
    rightShinGroup.add(rightKneeJoint);

    const rightShin = buildSegmentedLimb(0.7, 0.15);
    rightShinGroup.add(rightShin);

    const rightFootGroup = new THREE.Group();
    rightFootGroup.position.set(0, -0.7, 0);
    rightFootGroup.rotation.x = -0.15;
    rightShinGroup.add(rightFootGroup);

    const rightAnkleJoint = new THREE.Mesh(jointGeo, darkMetalMaterial);
    rightAnkleJoint.scale.set(0.4, 0.4, 0.4);
    rightFootGroup.add(rightAnkleJoint);

    const rightFoot = new THREE.Mesh(footGeo, ceramicMaterial);
    rightFoot.position.set(0, -0.06, 0.1);
    rightFoot.castShadow = true;
    rightFoot.receiveShadow = true;
    rightFootGroup.add(rightFoot);

    // 5. NECK
    const neckGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.5, 32);
    const neck = new THREE.Mesh(neckGeo, darkMetalMaterial);
    neck.position.set(0, -0.9, 0);
    neck.castShadow = true;
    robot.add(neck);

    // 6. HEAD GROUP
    const headGroup = new THREE.Group();
    headGroupRef.current = headGroup;
    robot.add(headGroup);

    const headShape = new THREE.Shape();
    const radius = 0.35;
    const width = 2.0;
    const height = 1.8;
    const x = -width / 2;
    const y = -height / 2;
    headShape.moveTo(x, y + radius);
    headShape.lineTo(x, y + height - radius);
    headShape.quadraticCurveTo(x, y + height, x + radius, y + height);
    headShape.lineTo(x + width - radius, y + height);
    headShape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
    headShape.lineTo(x + width, y + radius);
    headShape.quadraticCurveTo(x + width, y, x + width - radius, y);
    headShape.lineTo(x + radius, y);
    headShape.quadraticCurveTo(x, y, x, y + radius);

    const headExtrudeSettings = {
      depth: 1.6,
      bevelEnabled: true,
      bevelSegments: 5,
      steps: 1,
      bevelSize: 0.1,
      };
    const headGeo = new THREE.ExtrudeGeometry(headShape, headExtrudeSettings);
    headGeo.center();
    const headMesh = new THREE.Mesh(headGeo, ceramicMaterial);
    headMesh.visible = true;
    headMesh.castShadow = true;
    headMesh.receiveShadow = true;
    headGroup.add(headMesh);
 
    // Flat Glossor Visor Screen Plane
    const visorScreenGeo = new THREE.PlaneGeometry(1.56, 1.06);
    const visorScreenMat = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      opacity: 0.95
    });
    const visorScreen = new THREE.Mesh(visorScreenGeo, visorScreenMat);
    visorScreen.position.set(0, 0.1, 1.02);
    headGroup.add(visorScreen);

    // Flat Dark Visor Outer Glass Plane
    const visorGlassGeo = new THREE.PlaneGeometry(1.58, 1.08);
    const visorGlassMat = new THREE.MeshPhysicalMaterial({
      color: 0x050508,
      roughness: 0.15,
      metalness: 0.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.1,
      transparent: true,
      opacity: 0.22,
      reflectivity: 0.4,
    });
    const visorGlass = new THREE.Mesh(visorGlassGeo, visorGlassMat);
    visorGlass.position.set(0, 0.1, 1.03);
    visorGlass.castShadow = true;
    headGroup.add(visorGlass);

    // Rainbow Bezel Frame wrapping the visor (Hollow Extruded)
    const bezelShape = new THREE.Shape();
    const bRadius = 0.25;
    const bWidth = 1.72;
    const bHeight = 1.22;
    const bx = -bWidth / 2;
    const by = -bHeight / 2;
    bezelShape.moveTo(bx, by + bRadius);
    bezelShape.lineTo(bx, by + bHeight - bRadius);
    bezelShape.quadraticCurveTo(bx, by + bHeight, bx + bRadius, by + bHeight);
    bezelShape.lineTo(bx + bWidth - bRadius, by + bHeight);
    bezelShape.quadraticCurveTo(bx + bWidth, by + bHeight, bx + bWidth, by + bHeight - bRadius);
    bezelShape.lineTo(bx + bWidth, by + bRadius);
    bezelShape.quadraticCurveTo(bx + bWidth, by, bx + bWidth - bRadius, by);
    bezelShape.lineTo(bx + bRadius, by);
    bezelShape.quadraticCurveTo(bx, by, bx, by + bRadius);

    // Create inner cut-out hole
    const bezelHole = new THREE.Path();
    const innerWidth = 1.56;
    const innerHeight = 1.06;
    const innerRadius = 0.20;
    const ix = -innerWidth / 2;
    const iy = -innerHeight / 2;

    bezelHole.moveTo(ix + innerRadius, iy);
    bezelHole.lineTo(ix + innerWidth - innerRadius, iy);
    bezelHole.quadraticCurveTo(ix + innerWidth, iy, ix + innerWidth, iy + innerRadius);
    bezelHole.lineTo(ix + innerWidth, iy + innerHeight - innerRadius);
    bezelHole.quadraticCurveTo(ix + innerWidth, iy + innerHeight, ix + innerWidth - innerRadius, iy + innerHeight);
    bezelHole.lineTo(ix + innerRadius, iy + innerHeight);
    bezelHole.quadraticCurveTo(ix, iy + innerHeight, ix, iy + innerHeight - innerRadius);
    bezelHole.lineTo(ix, iy + innerRadius);
    bezelHole.quadraticCurveTo(ix, iy, ix + innerRadius, iy);
    
    bezelShape.holes.push(bezelHole);

    const bezelExtrudeSettings = {
      depth: 0.1,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.03,
      bevelThickness: 0.03
    };
    const bezelGeo = new THREE.ExtrudeGeometry(bezelShape, bezelExtrudeSettings);
    bezelGeo.center();
    const bezelMesh = new THREE.Mesh(bezelGeo, rainbowBezelMaterial);
    bezelMesh.position.set(0, 0.1, 0.92);
    bezelMesh.castShadow = true;
    headGroup.add(bezelMesh);

    // Ear headphones
    const earGeo = new THREE.CylinderGeometry(0.48, 0.48, 0.28, 32);
    earGeo.rotateZ(Math.PI / 2);
    
    const earL = new THREE.Mesh(earGeo, darkMetalMaterial);
    earL.position.set(-1.08, 0.1, 0);
    earL.castShadow = true;
    headGroup.add(earL);

    const ringLGeo = new THREE.TorusGeometry(0.36, 0.05, 8, 32);
    ringLGeo.rotateY(Math.PI / 2);
    const ringL = new THREE.Mesh(ringLGeo, glowCyanMat);
    ringL.position.set(-1.24, 0.1, 0);
    headGroup.add(ringL);

    const earR = new THREE.Mesh(earGeo, darkMetalMaterial);
    earR.position.set(1.08, 0.1, 0);
    earR.castShadow = true;
    headGroup.add(earR);

    const ringR = new THREE.Mesh(ringLGeo, glowPurpleMat);
    ringR.position.set(1.24, 0.1, 0);
    headGroup.add(ringR);

    // Antennae on Head back/top
    const antennaBaseGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const antennaRodGeo = new THREE.CylinderGeometry(0.015, 0.015, 0.4, 8);
    antennaRodGeo.rotateX(Math.PI / 6); // tilt backward

    const antennaLBase = new THREE.Mesh(antennaBaseGeo, darkMetalMaterial);
    antennaLBase.position.set(-0.6, 0.9, -0.4);
    headGroup.add(antennaLBase);

    const antennaLRod = new THREE.Mesh(antennaRodGeo, darkMetalMaterial);
    antennaLRod.position.set(-0.6, 1.1, -0.5);
    headGroup.add(antennaLRod);

    const antennaRBase = new THREE.Mesh(antennaBaseGeo, darkMetalMaterial);
    antennaRBase.position.set(0.6, 0.9, -0.4);
    headGroup.add(antennaRBase);

    const antennaRRod = new THREE.Mesh(antennaRodGeo, darkMetalMaterial);
    antennaRRod.position.set(0.6, 1.1, -0.5);
    headGroup.add(antennaRRod);

    // 7. STUDIO LIGHTING SETUP (Rich shadows and reflective balance)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Main Studio Key Light (Top-Right-Front)
    const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
    keyLight.position.set(5, 7, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cyan Studio Fill Light (Left-Front)
    const fillLight = new THREE.DirectionalLight(0x00f0ff, 2.2);
    fillLight.position.set(-6, 2, 4);
    scene.add(fillLight);

    // Magenta/Purple Back Rim Light (Captures glossy clearcoat silhouette)
    const rimLight = new THREE.DirectionalLight(0xff00aa, 5.0);
    rimLight.position.set(-4, 5, -8);
    scene.add(rimLight);

    // Soft Cyan point light at pedestal height
    const pedLight = new THREE.PointLight(0x00f0ff, 3.5, 4.5, 2.0);
    pedLight.position.set(0, -4.2, 0);
    scene.add(pedLight);

    // Raycasting click logic on the window to trigger interactive gestures
    const raycaster = new THREE.Raycaster();
    const ndcMouse = new THREE.Vector2();

    const handleWindowClick = (e: MouseEvent) => {
      if (activeSectionRef.current !== 'landing' || scrollProgressRef.current > 0.8) return;

      // Map client coords to NDC (-1 to +1)
      ndcMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndcMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(ndcMouse, camera);

      // Check if robot intersects
      const intersects = raycaster.intersectObjects(robot.children, true);
      if (intersects.length > 0) {
        if (gestureStateRef.current === 'idle') {
          gestureStateRef.current = 'wave';
          gestureTimerRef.current = 0;
        }
      }
    };
    window.addEventListener('click', handleWindowClick);

    // Handle Resize
    const handleResize = () => {
      if (!mountRef.current) return;
      const width = mountRef.current.clientWidth;
      const height = mountRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Track smooth position interpolation targets
    const currentPos = new THREE.Vector3(0.5, -0.1, 0);
    const currentRotY = { val: 0 };
    const currentScale = { val: 0.95 };
    const currentOpacity = { val: 1.0 };

    // Animation Loop
    let animationFrameId: number;
    let time = 0;

    const animate = () => {
      time += 1;

      const scrollProgress = scrollProgressRef.current;
      const activeSection = activeSectionRef.current;
      const visorState = visorStateRef.current;

      // 1. SCROLL-DRIVEN POSITION & ROTATION TARGETS (Exactly aligned to landing sub-sections)
      let targetX = 0.5;
      let targetY = -0.1;
      let targetZ = 0;
      let targetRotY = 0;
      let targetScale = 0.95;
      let targetOpacity = 1.0;

      if (time === 1) {
        console.log("ROBOT MOUNTED. Props:", { scrollProgress, activeSection, visorState });
      }

      if (activeSection === 'landing') {
        if (scrollProgress <= 0.15) {
          // Section 1: Hero — centered slightly left of mid so right column is visible, turned 3D profile
          targetX = 0.5;
          targetY = -0.1;
          targetZ = 0;
          targetRotY = -0.45 + (scrollProgress / 0.15) * 0.1; // Face left (towards the left quote card)
          targetScale = 0.95;
          targetOpacity = 1.0;
        } else if (scrollProgress > 0.15 && scrollProgress <= 0.45) {
          // Section 2: Solutions — glides center, slightly faces right toward feature list
          const p = (scrollProgress - 0.15) / 0.30;
          targetX = THREE.MathUtils.lerp(0.5, 0.0, p);
          targetY = THREE.MathUtils.lerp(-0.1, 0.3, p);
          targetZ = 0;
          targetRotY = THREE.MathUtils.lerp(-0.35, -0.45, p);
          targetScale = THREE.MathUtils.lerp(0.95, 0.80, p);
          targetOpacity = 1.0;
        } else if (scrollProgress > 0.45 && scrollProgress <= 0.55) {
          // Solutions active zone
          targetX = 0.0;
          targetY = 0.3;
          targetZ = 0;
          targetRotY = -0.45;
          targetScale = 0.80;
          targetOpacity = 1.0;
        } else {
          // Ecosystem and beyond: fade out
          const p = (scrollProgress - 0.55) / 0.15;
          targetX = THREE.MathUtils.lerp(0.0, -0.6, Math.min(1, p));
          targetY = THREE.MathUtils.lerp(0.3, -1.2, Math.min(1, p));
          targetZ = 0;
          targetRotY = -0.45;
          targetScale = 0.80;
          targetOpacity = THREE.MathUtils.lerp(1.0, 0.0, Math.min(1, p));
        }
      } else {
        // App inner sections (auth, profile, dashboard, whiteboard)
        if (activeSection === 'auth') {
          targetX = -1.8;
          targetY = 0.5;
          targetRotY = -Math.PI / 4;
          targetScale = 0.65;
          targetOpacity = 1.0;
        } else if (activeSection === 'profile') {
          targetX = 1.8;
          targetY = 0.5;
          targetRotY = Math.PI / 4;
          targetScale = 0.7;
          targetOpacity = 1.0;
        } else if (activeSection === 'dashboard') {
          targetX = 2.4;
          targetY = 1.6;
          targetRotY = 0;
          targetScale = 0.4;
          targetOpacity = 1.0;
        } else if (activeSection === 'whiteboard') {
          targetX = 2.8;
          targetY = 2.0;
          targetRotY = Math.PI / 6;
          targetScale = 0.3;
          targetOpacity = 1.0;
        }
      }

      // Smoothly interpolate (lerp) towards current values
      currentPos.x += (targetX - currentPos.x) * 0.06;
      currentPos.y += (targetY - currentPos.y) * 0.06;
      currentPos.z += (targetZ - currentPos.z) * 0.06;
      currentRotY.val += (targetRotY - currentRotY.val) * 0.06;
      currentScale.val += (targetScale - currentScale.val) * 0.06;
      currentOpacity.val += (targetOpacity - currentOpacity.val) * 0.06;

      if (robot) {
        robot.position.copy(currentPos);
        robot.rotation.y = currentRotY.val;
        robot.scale.set(currentScale.val, currentScale.val, currentScale.val);
      }

      if (mountRef.current) {
        mountRef.current.style.opacity = currentOpacity.val.toString();
        mountRef.current.style.display = currentOpacity.val <= 0.01 ? 'none' : 'block';
      }

      // 2. DYNAMIC BREATHING MOTION (Chest & Neck expansion)
      const breathScale = 1.0 + Math.sin(time * 0.02) * 0.015;
      if (chestPlateRef.current) {
        chestPlateRef.current.scale.set(breathScale, 1.0 + Math.sin(time * 0.02) * 0.01, breathScale);
      }
      
      // Floating bob — ChainGPT style continuous gentle hover
      const floatOffset = Math.sin(time * 0.03) * 0.18;
      if (torsoGroup) {
        torsoGroup.position.y = -1.8 + floatOffset;
      }
      if (neck) {
        neck.position.y = -0.9 + floatOffset * 0.9;
      }
      if (headGroup) {
        headGroup.position.y = floatOffset * 0.9;
      }

      // 3. SMOOTH MOUSE TRACKING (Head and upper spine look towards coordinates)
      const targetHeadX = mouseRef.current.x * 0.45;
      const targetHeadY = mouseRef.current.y * 0.35;
      if (headGroup) {
        headGroup.rotation.y += (targetHeadX - headGroup.rotation.y) * 0.08;
        headGroup.rotation.x += (targetHeadY - headGroup.rotation.x) * 0.08;
      }
      if (chestPlateRef.current) {
        chestPlateRef.current.rotation.y += (targetHeadX * 0.3 - chestPlateRef.current.rotation.y) * 0.06;
      }

      // 4. ROBOTIC GESTURE CONTROLLER (Waving gesture vs standard idle sways)
      let rightFingerTargetRot = 0.25;
      if (gestureStateRef.current === 'wave') {
        const timer = gestureTimerRef.current;
        gestureTimerRef.current += 1;

        if (rightShoulderRef.current && rightElbowRef.current) {
          if (timer < 25) {
            // Stage 1: Raise Right Arm & spread fingers
            const progress = timer / 25;
            rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI / 10, Math.PI * 0.72, progress);
            rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(0, -Math.PI / 4.5, progress);
            rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 4.5, -Math.PI / 3, progress);
            rightFingerTargetRot = THREE.MathUtils.lerp(0.25, -0.1, progress); // open fingers
          } else if (timer >= 25 && timer < 95) {
            // Stage 2: Wave forearm back and forth
            rightShoulderRef.current.rotation.z = Math.PI * 0.72;
            rightShoulderRef.current.rotation.x = -Math.PI / 4.5;
            // Oscillate elbow rotation for the wave effect
            rightElbowRef.current.rotation.x = -Math.PI / 3 + Math.sin(time * 0.22) * 0.22;
            rightFingerTargetRot = -0.1 + Math.sin(time * 0.22) * 0.08; // slightly jitter fingers
          } else if (timer >= 95 && timer < 120) {
            // Stage 3: Lower Arm back to idle & curl fingers
            const progress = (timer - 95) / 25;
            rightShoulderRef.current.rotation.z = THREE.MathUtils.lerp(Math.PI * 0.72, Math.PI / 10, progress);
            rightShoulderRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 4.5, 0, progress);
            rightElbowRef.current.rotation.x = THREE.MathUtils.lerp(-Math.PI / 3, -Math.PI / 4.5, progress);
            rightFingerTargetRot = THREE.MathUtils.lerp(-0.1, 0.25, progress);
          } else {
            // Reset to idle
            gestureStateRef.current = 'idle';
          }
        }

        // Left arm does subtle breathing sway
        if (leftShoulderRef.current && leftElbowRef.current) {
          const swayAngle = Math.sin(time * 0.018) * 0.04;
          leftShoulderRef.current.rotation.z = -Math.PI / 10 + swayAngle;
          leftShoulderRef.current.rotation.x = Math.cos(time * 0.018) * 0.03;
          leftElbowRef.current.rotation.x = -Math.PI / 4.5 + Math.sin(time * 0.018) * 0.03;
        }

      } else {
        // IDLE STATE SKELETAL SWAYS
        if (leftShoulderRef.current && rightShoulderRef.current && leftElbowRef.current && rightElbowRef.current) {
          const swayAngle = Math.sin(time * 0.018) * 0.04;
          
          // Sway shoulders slightly flared outward
          leftShoulderRef.current.rotation.z = -Math.PI / 10 + swayAngle;
          leftShoulderRef.current.rotation.x = Math.cos(time * 0.018) * 0.03;
          
          rightShoulderRef.current.rotation.z = Math.PI / 10 - swayAngle;
          rightShoulderRef.current.rotation.x = Math.cos(time * 0.018) * 0.03;

          // Animate forearms slightly forward
          leftElbowRef.current.rotation.x = -Math.PI / 4.5 + Math.sin(time * 0.018) * 0.03;
          rightElbowRef.current.rotation.x = -Math.PI / 4.5 - Math.sin(time * 0.018) * 0.03;
        }
      }

      // 5. MICRO-STABILIZER JITTER FOR FINGERS & SMOOTH ROTATION
      const leftFingers = leftFingersRef.current;
      const rightFingers = rightFingersRef.current;
      for (let i = 0; i < 3; i++) {
        const jitter = Math.sin(time * 0.15 + i * 5) * 0.012;
        if (leftFingers[i]) {
          leftFingers[i].rotation.x += (0.25 - leftFingers[i].rotation.x) * 0.1;
          leftFingers[i].rotation.z = jitter;
        }
        if (rightFingers[i]) {
          rightFingers[i].rotation.x += (rightFingerTargetRot - rightFingers[i].rotation.x) * 0.1;
          rightFingers[i].rotation.z = jitter;
        }
      }

      // 6. ANIMATIONS UPDATED

      // 8. DYNAMIC VISOR TEXTURE UPDATING
      if (ctx && visorCanvasRef.current && visorTextureRef.current) {
        drawVisorTexture(ctx, visorState, time);
        visorTextureRef.current.needsUpdate = true;
      }

      if (time % 120 === 0) {
        const eyeOffsetX = mouseRef.current.x * 24;
        const eyeOffsetY = mouseRef.current.y * 16;
        console.log("DIAGNOSTIC - Visor State:", visorState, "Mouse:", { x: mouseRef.current.x, y: mouseRef.current.y }, "Eye Offsets:", { x: eyeOffsetX, y: eyeOffsetY }, "Position:", robot ? robot.position.x : null);
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', handleWindowClick);
      cancelAnimationFrame(animationFrameId);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      // Clean up WebGL resources recursively to prevent memory leaks
      floorGeo.dispose();
      floorMat.dispose();
      pedestalGeo.dispose();
      footGeo.dispose();
      spineGeo.dispose();
      spinePistonGeo.dispose();
      waistShieldGeo.dispose();
      chestPlateGeo.dispose();
      chestCoreHousingGeo.dispose();
      chestCoreGlowGeo.dispose();
      collarDotGeo.dispose();
      neckGeo.dispose();
      headGeo.dispose();
      bezelGeo.dispose();
      visorScreenGeo.dispose();
      visorGlassGeo.dispose();
      earGeo.dispose();
      ringLGeo.dispose();
      antennaBaseGeo.dispose();
      antennaRodGeo.dispose();

      ceramicMaterial.dispose();
      darkMetalMaterial.dispose();
      rainbowBezelMaterial.dispose();
      visorScreenMat.dispose();
      visorGlassMat.dispose();
      glowCyanMat.dispose();
      glowPurpleMat.dispose();
      glowPinkMat.dispose();
      
      texture.dispose();
      rainbowTexture.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      style={{ 
        width: '100vw', 
        height: 'calc(100vh - 120px)', 
        position: 'fixed',
        top: '70px',
        left: 0,
        pointerEvents: 'none',
        zIndex: 5,
        transition: 'opacity 0.1s ease'
      }} 
    />
  );
};

export default RobotCanvas;
