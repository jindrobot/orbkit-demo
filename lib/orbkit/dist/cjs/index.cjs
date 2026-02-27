var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __moduleCache = /* @__PURE__ */ new WeakMap;
var __toCommonJS = (from) => {
  var entry = __moduleCache.get(from), desc;
  if (entry)
    return entry;
  entry = __defProp({}, "__esModule", { value: true });
  if (from && typeof from === "object" || typeof from === "function")
    __getOwnPropNames(from).map((key) => !__hasOwnProp.call(entry, key) && __defProp(entry, key, {
      get: () => from[key],
      enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
    }));
  __moduleCache.set(from, entry);
  return entry;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, {
      get: all[name],
      enumerable: true,
      configurable: true,
      set: (newValue) => all[name] = () => newValue
    });
};

// src/index.ts
var exports_src = {};
__export(exports_src, {
  useOrbSceneContext: () => useOrbSceneContext,
  sunset: () => sunset,
  registerPreset: () => registerPreset,
  presets: () => presets,
  ocean: () => ocean,
  minimal: () => minimal,
  hslToHex: () => hslToHex,
  hexToRgba: () => hexToRgba,
  hexToHsl: () => hexToHsl,
  getOrbitParams: () => getOrbitParams,
  generateOrbCSS: () => generateOrbCSS,
  generateGrainIntensity: () => generateGrainIntensity,
  generateGradientCSS: () => generateGradientCSS,
  generateDriftKeyframes: () => generateDriftKeyframes,
  generateDriftKeyframeCSS: () => generateDriftKeyframeCSS,
  forest: () => forest,
  detectBestRenderer: () => detectBestRenderer,
  createWebGLRenderer: () => createWebGLRenderer,
  createCanvasRenderer: () => createCanvasRenderer,
  calculateDriftOffset: () => calculateDriftOffset,
  aurora: () => aurora,
  applySaturation: () => applySaturation,
  OrbScene: () => OrbScene,
  Orb: () => Orb,
  Grain: () => Grain
});
module.exports = __toCommonJS(exports_src);

// src/components/orb-scene.tsx
var import_react5 = require("react");

// src/context/orb-scene-context.ts
var import_react = require("react");
var OrbSceneContext = import_react.createContext(null);
OrbSceneContext.displayName = "OrbSceneContext";
function useOrbSceneContext() {
  return import_react.useContext(OrbSceneContext);
}
function useOrbSceneProvider({
  background,
  grain,
  breathing,
  renderer,
  saturation,
  containerRef
}) {
  const nextOrbIndexRef = import_react.useRef(0);
  const orbConfigsRef = import_react.useRef(new Map);
  const imperativeRendererRef = import_react.useRef(null);
  const registerOrb = import_react.useCallback(() => {
    const index = nextOrbIndexRef.current;
    nextOrbIndexRef.current += 1;
    return index;
  }, []);
  const syncToRenderer = import_react.useCallback(() => {
    const renderer2 = imperativeRendererRef.current;
    if (renderer2) {
      renderer2.setOrbs(Array.from(orbConfigsRef.current.values()));
    }
  }, []);
  const registerOrbConfig = import_react.useCallback((id, config) => {
    orbConfigsRef.current.set(id, config);
    syncToRenderer();
  }, [syncToRenderer]);
  const unregisterOrbConfig = import_react.useCallback((id) => {
    orbConfigsRef.current.delete(id);
    syncToRenderer();
  }, [syncToRenderer]);
  return import_react.useMemo(() => ({
    background,
    grain,
    breathing,
    renderer,
    saturation,
    containerRef,
    registerOrb,
    registerOrbConfig,
    unregisterOrbConfig,
    imperativeRendererRef,
    orbConfigsRef
  }), [
    background,
    grain,
    breathing,
    renderer,
    saturation,
    containerRef,
    registerOrb,
    registerOrbConfig,
    unregisterOrbConfig
  ]);
}
// src/presets/index.ts
var ocean = {
  name: "ocean",
  label: "Ocean",
  backgroundColor: "#1a1a1a",
  points: [
    { id: "p1", color: "#4A90D9", position: [0.2, 0.25], radius: 0.8 },
    { id: "p2", color: "#D4836D", position: [0.75, 0.5], radius: 0.75 },
    { id: "p3", color: "#E8DCC8", position: [0.45, 0.85], radius: 0.7 }
  ],
  saturation: 70,
  grain: 35,
  breathing: 30
};
var sunset = {
  name: "sunset",
  label: "Sunset",
  backgroundColor: "#1a1018",
  points: [
    { id: "p1", color: "#E07B3C", position: [0.3, 0.2], radius: 0.85 },
    { id: "p2", color: "#D94F8C", position: [0.7, 0.4], radius: 0.75 },
    { id: "p3", color: "#7B3FA0", position: [0.5, 0.8], radius: 0.7 }
  ],
  saturation: 75,
  grain: 35,
  breathing: 30
};
var forest = {
  name: "forest",
  label: "Forest",
  backgroundColor: "#0f1a14",
  points: [
    { id: "p1", color: "#1A4D2E", position: [0.25, 0.3], radius: 0.8 },
    { id: "p2", color: "#4A8C5C", position: [0.65, 0.55], radius: 0.75 },
    { id: "p3", color: "#D4CDB8", position: [0.4, 0.8], radius: 0.65 }
  ],
  saturation: 60,
  grain: 35,
  breathing: 30
};
var aurora = {
  name: "aurora",
  label: "Aurora",
  backgroundColor: "#0f0f1a",
  points: [
    { id: "p1", color: "#7C3AED", position: [0.2, 0.25], radius: 0.8 },
    { id: "p2", color: "#06B6D4", position: [0.75, 0.5], radius: 0.75 },
    { id: "p3", color: "#3730A3", position: [0.45, 0.85], radius: 0.7 }
  ],
  saturation: 80,
  grain: 35,
  breathing: 30
};
var minimal = {
  name: "minimal",
  label: "Minimal",
  backgroundColor: "#1a1918",
  points: [
    { id: "p1", color: "#E8DCC8", position: [0.3, 0.3], radius: 0.8 },
    { id: "p2", color: "#9E9E9E", position: [0.7, 0.5], radius: 0.7 },
    { id: "p3", color: "#C4B99A", position: [0.5, 0.75], radius: 0.65 }
  ],
  saturation: 30,
  grain: 35,
  breathing: 20
};
var presets = {
  ocean,
  sunset,
  forest,
  aurora,
  minimal
};
function registerPreset(preset) {
  presets[preset.name] = preset;
}

// src/renderers/detect.ts
var cachedRenderer = null;
function detectBestRenderer() {
  if (cachedRenderer)
    return cachedRenderer;
  if (typeof document === "undefined") {
    return "css";
  }
  cachedRenderer = "css";
  return cachedRenderer;
}

// src/components/grain.tsx
var import_react2 = require("react");
var jsx_dev_runtime = require("react/jsx-dev-runtime");
function Grain({ intensity = 0.35, className, style }) {
  const canvasRef = import_react2.useRef(null);
  const renderNoise = import_react2.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas)
      return;
    const ctx = canvas.getContext("2d");
    if (!ctx)
      return;
    const { width, height } = canvas.getBoundingClientRect();
    canvas.width = width;
    canvas.height = height;
    const imageData = ctx.createImageData(width, height);
    const { data } = imageData;
    for (let i = 0;i < data.length; i += 4) {
      const value = Math.random() * 255;
      data[i] = value;
      data[i + 1] = value;
      data[i + 2] = value;
      data[i + 3] = 255;
    }
    ctx.putImageData(imageData, 0, 0);
  }, []);
  import_react2.useEffect(() => {
    renderNoise();
    const handleResize = () => renderNoise();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [renderNoise]);
  const opacity = intensity * 0.5;
  return /* @__PURE__ */ jsx_dev_runtime.jsxDEV("canvas", {
    ref: canvasRef,
    className: className ? `orbkit-grain ${className}` : "orbkit-grain",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      mixBlendMode: "overlay",
      opacity,
      pointerEvents: "none",
      ...style
    }
  }, undefined, false, undefined, this);
}

// src/components/imperative-scene.tsx
var import_react3 = require("react");

// src/utils/animation.ts
var MAX_DURATION = 40;
var MIN_DURATION = 6;
var MIN_AMPLITUDE = 2;
var MAX_AMPLITUDE = 10;
function positionSeed(x, y) {
  return x * 1000 + y * 7919;
}
function seededRandom(seed) {
  const x = Math.sin(seed) * 1e4;
  return x - Math.floor(x);
}
function getOrbitParams(x, y, index, breathing) {
  const seed = positionSeed(x, y);
  const rand1 = seededRandom(seed);
  const rand2 = seededRandom(seed + 1);
  const breathingFactor = breathing / 100;
  const amplitudeRange = MAX_AMPLITUDE - MIN_AMPLITUDE;
  const amplitudeX = MIN_AMPLITUDE + rand1 * amplitudeRange * breathingFactor;
  const amplitudeY = MIN_AMPLITUDE + rand2 * amplitudeRange * breathingFactor;
  const durationRange = MAX_DURATION - MIN_DURATION;
  const baseDuration = MIN_DURATION + (1 - breathingFactor) * durationRange;
  const duration = baseDuration * (1 + index * 0.3);
  const delay = index * -baseDuration * 0.25;
  return { amplitudeX, amplitudeY, duration, delay };
}
function generateDriftKeyframes(amplitudeX, amplitudeY) {
  const cos45 = Math.SQRT1_2;
  return [
    { offset: 0, transform: `translate(${amplitudeX}%, 0)` },
    { offset: 0.125, transform: `translate(${amplitudeX * cos45}%, ${amplitudeY * cos45}%)` },
    { offset: 0.25, transform: `translate(0, ${amplitudeY}%)` },
    { offset: 0.375, transform: `translate(${-amplitudeX * cos45}%, ${amplitudeY * cos45}%)` },
    { offset: 0.5, transform: `translate(${-amplitudeX}%, 0)` },
    { offset: 0.625, transform: `translate(${-amplitudeX * cos45}%, ${-amplitudeY * cos45}%)` },
    { offset: 0.75, transform: `translate(0, ${-amplitudeY}%)` },
    { offset: 0.875, transform: `translate(${amplitudeX * cos45}%, ${-amplitudeY * cos45}%)` },
    { offset: 1, transform: `translate(${amplitudeX}%, 0)` }
  ];
}
function calculateDriftOffset(params, timeMs) {
  const { amplitudeX, amplitudeY, duration, delay } = params;
  if (duration <= 0)
    return { x: 0, y: 0 };
  const timeSec = timeMs / 1000;
  const t = ((timeSec + delay) % duration + duration) % duration;
  const angle = t / duration * Math.PI * 2;
  return {
    x: Math.cos(angle) * amplitudeX / 100,
    y: Math.sin(angle) * amplitudeY / 100
  };
}
function generateDriftKeyframeCSS(name, ax, ay) {
  const cos45 = Math.SQRT1_2;
  return `@keyframes ${name} {
  0% { transform: translate(${ax}%, 0); }
  12.5% { transform: translate(${ax * cos45}%, ${ay * cos45}%); }
  25% { transform: translate(0, ${ay}%); }
  37.5% { transform: translate(${-ax * cos45}%, ${ay * cos45}%); }
  50% { transform: translate(${-ax}%, 0); }
  62.5% { transform: translate(${-ax * cos45}%, ${-ay * cos45}%); }
  75% { transform: translate(0, ${-ay}%); }
  87.5% { transform: translate(${ax * cos45}%, ${-ay * cos45}%); }
  100% { transform: translate(${ax}%, 0); }
}`;
}

// src/utils/color.ts
function hexToHsl(hex) {
  const cleaned = hex.replace("#", "");
  const r = Number.parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = Number.parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = Number.parseInt(cleaned.substring(4, 6), 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) {
    return { h: 0, s: 0, l: l * 100 };
  }
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h;
  switch (max) {
    case r:
      h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
      break;
    case g:
      h = ((b - r) / d + 2) / 6;
      break;
    default:
      h = ((r - g) / d + 4) / 6;
      break;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}
function hueToRgb(p, q, t) {
  let adjusted = t;
  if (adjusted < 0)
    adjusted += 1;
  if (adjusted > 1)
    adjusted -= 1;
  if (adjusted < 1 / 6)
    return p + (q - p) * 6 * adjusted;
  if (adjusted < 1 / 2)
    return q;
  if (adjusted < 2 / 3)
    return p + (q - p) * (2 / 3 - adjusted) * 6;
  return p;
}
function hslToHex(h, s, l) {
  const sNorm = s / 100;
  const lNorm = l / 100;
  let r;
  let g;
  let b;
  if (sNorm === 0) {
    r = g = b = lNorm;
  } else {
    const q = lNorm < 0.5 ? lNorm * (1 + sNorm) : lNorm + sNorm - lNorm * sNorm;
    const p = 2 * lNorm - q;
    r = hueToRgb(p, q, h / 360 + 1 / 3);
    g = hueToRgb(p, q, h / 360);
    b = hueToRgb(p, q, h / 360 - 1 / 3);
  }
  const toHex = (c) => Math.round(c * 255).toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
function applySaturation(hex, saturation) {
  const hsl = hexToHsl(hex);
  return hslToHex(hsl.h, saturation, hsl.l);
}
function hexToRgba(hex, alpha = 1) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length < 6)
    return `rgba(0,0,0,${alpha})`;
  const r = Number.parseInt(cleaned.substring(0, 2), 16);
  const g = Number.parseInt(cleaned.substring(2, 4), 16);
  const b = Number.parseInt(cleaned.substring(4, 6), 16);
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b))
    return `rgba(0,0,0,${alpha})`;
  return `rgba(${r},${g},${b},${alpha})`;
}

// src/renderers/canvas-renderer.ts
var BLEND_MODE_MAP = {
  screen: "screen",
  multiply: "multiply",
  overlay: "overlay",
  "hard-light": "hard-light",
  "soft-light": "soft-light",
  "color-dodge": "color-dodge",
  lighten: "lighten",
  normal: "source-over"
};
var ZERO_OFFSET = { x: 0, y: 0 };
function toInternalOrbs(configs) {
  return configs.map((config, index) => ({
    ...config,
    rgbaColor: hexToRgba(config.color),
    rgbaColorTransparent: hexToRgba(config.color, 0),
    orbitParams: getOrbitParams(config.position[0], config.position[1], index, 50)
  }));
}
function createCanvasRenderer() {
  let canvas = null;
  let ctx = null;
  let animationId = null;
  let orbs = [];
  let background = "#000000";
  let grainIntensity = 0;
  let cachedGrainCanvas = null;
  let running = false;
  let pointerX = 0.5;
  let pointerY = 0.5;
  function render(time) {
    if (!ctx || !canvas)
      return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = background;
    ctx.fillRect(0, 0, w, h);
    const dpr = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
    for (const orb of orbs) {
      ctx.globalCompositeOperation = BLEND_MODE_MAP[orb.blendMode] ?? "source-over";
      ctx.save();
      const driftEnabled = orb.drift === true || typeof orb.drift === "object" && orb.drift !== null;
      const offset = driftEnabled ? calculateDriftOffset(orb.orbitParams, time) : ZERO_OFFSET;
      const interactiveIntensity = 0.35;
      const ix = orb.interactive ? (pointerX - orb.position[0]) * interactiveIntensity : 0;
      const iy = orb.interactive ? (pointerY - orb.position[1]) * interactiveIntensity : 0;
      const cx = (orb.position[0] + offset.x + ix) * w;
      const cy = (orb.position[1] + offset.y + iy) * h;
      const radius = orb.size * Math.max(w, h) * 0.65;
      const blurPx = orb.blur * dpr;
      if (blurPx > 0) {
        ctx.filter = `blur(${blurPx}px)`;
      }
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, orb.rgbaColor);
      gradient.addColorStop(0.5, orb.rgbaColor);
      gradient.addColorStop(0.85, orb.rgbaColorTransparent);
      gradient.addColorStop(1, "transparent");
      const pad = blurPx * 3;
      ctx.fillStyle = gradient;
      ctx.fillRect(cx - radius - pad, cy - radius - pad, (radius + pad) * 2, (radius + pad) * 2);
      ctx.filter = "none";
      ctx.restore();
    }
    if (grainIntensity > 0) {
      renderGrain(w, h);
    }
    if (running) {
      animationId = requestAnimationFrame(render);
    }
  }
  function renderGrain(w, h) {
    if (!ctx)
      return;
    if (!cachedGrainCanvas || cachedGrainCanvas.width !== w || cachedGrainCanvas.height !== h) {
      cachedGrainCanvas = generateGrainCanvas(w, h, grainIntensity);
    }
    ctx.globalCompositeOperation = "overlay";
    ctx.drawImage(cachedGrainCanvas, 0, 0);
  }
  return {
    type: "canvas",
    mount(container) {
      if (typeof document === "undefined")
        return;
      canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      ctx = canvas.getContext("2d");
      container.appendChild(canvas);
      const rect = container.getBoundingClientRect();
      const dpr = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    },
    unmount() {
      this.stop();
      if (canvas?.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    },
    setOrbs(configs) {
      orbs = toInternalOrbs(configs);
    },
    setBackground(color) {
      background = color;
    },
    setGrain(intensity) {
      grainIntensity = intensity;
      cachedGrainCanvas = null;
    },
    setPointerPosition(x, y) {
      pointerX = x;
      pointerY = y;
    },
    resize(width, height) {
      if (!canvas)
        return;
      const dpr = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      cachedGrainCanvas = null;
    },
    start() {
      if (running)
        return;
      running = true;
      if (typeof requestAnimationFrame !== "undefined") {
        animationId = requestAnimationFrame(render);
      }
    },
    stop() {
      running = false;
      if (animationId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    destroy() {
      this.stop();
      this.unmount();
      canvas = null;
      ctx = null;
      orbs = [];
      cachedGrainCanvas = null;
    }
  };
}
function generateGrainCanvas(w, h, intensity) {
  const offscreen = document.createElement("canvas");
  offscreen.width = w;
  offscreen.height = h;
  const offCtx = offscreen.getContext("2d");
  if (!offCtx)
    return offscreen;
  const imageData = offCtx.createImageData(w, h);
  const data = imageData.data;
  const alpha = Math.round(intensity * 128);
  for (let i = 0;i < data.length; i += 4) {
    const value = Math.random() * 255;
    data[i] = value;
    data[i + 1] = value;
    data[i + 2] = value;
    data[i + 3] = alpha;
  }
  offCtx.putImageData(imageData, 0, 0);
  return offscreen;
}

// src/renderers/shaders/orb.frag.glsl
var orb_frag_default = `// OrbKit fragment shader — renders up to 8 orbs with noise distortion,
// blend modes, grain overlay, and anti-banding dither.
//
// Preamble (precision, version, output variable) is prepended by host code
// to support both WebGL2 (#version 300 es + out vec4) and WebGL1 (gl_FragColor).
// The output variable is named ORBKIT_FRAG_OUT via #define or declaration.

// ─── Uniforms ───────────────────────────────────────────────────────────────

uniform vec2 u_resolution;
uniform float u_time;
uniform int u_orbCount;
uniform vec3 u_orbColors[8];
uniform vec2 u_orbPositions[8];
uniform float u_orbSizes[8];
uniform float u_orbBlurs[8];
uniform int u_orbBlendModes[8];
uniform int u_orbWavy[8];
uniform float u_grainIntensity;
uniform vec3 u_background;

// ─── Simplex Noise 3D (Ashima Arts / Ian McEwan) ───────────────────────────

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 10.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);

  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);

  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;

  i = mod289(i);
  vec4 p = permute(permute(permute(
    i.z + vec4(0.0, i1.z, i2.z, 1.0))
    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
    + i.x + vec4(0.0, i1.x, i2.x, 1.0));

  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;

  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);

  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);

  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);

  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));

  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);

  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x;
  p1 *= norm.y;
  p2 *= norm.z;
  p3 *= norm.w;

  vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 105.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}

// ─── Fractal Brownian Motion ────────────────────────────────────────────────

float fbm(vec3 p) {
  float value = 0.0;
  float amplitude = 0.5;
  for (int i = 0; i < 4; i++) {
    value += amplitude * snoise(p);
    p *= 2.0;
    amplitude *= 0.5;
  }
  return value;
}

// ─── Anti-banding gradient noise (Jimenez) ──────────────────────────────────

float gradientNoise(vec2 uv) {
  return fract(52.9829189 * fract(dot(uv, vec2(0.06711056, 0.00583715))));
}

// ─── Blend modes ────────────────────────────────────────────────────────────

vec3 blend_screen(vec3 base, vec3 blend) {
  return 1.0 - (1.0 - base) * (1.0 - blend);
}

vec3 blend_multiply(vec3 base, vec3 blend) {
  return base * blend;
}

vec3 blend_overlay_ch(vec3 base, vec3 blend) {
  return vec3(
    base.r < 0.5 ? 2.0 * base.r * blend.r : 1.0 - 2.0 * (1.0 - base.r) * (1.0 - blend.r),
    base.g < 0.5 ? 2.0 * base.g * blend.g : 1.0 - 2.0 * (1.0 - base.g) * (1.0 - blend.g),
    base.b < 0.5 ? 2.0 * base.b * blend.b : 1.0 - 2.0 * (1.0 - base.b) * (1.0 - blend.b)
  );
}

vec3 blend_hard_light(vec3 base, vec3 blend) {
  return blend_overlay_ch(blend, base);
}

vec3 blend_soft_light(vec3 base, vec3 blend) {
  return vec3(
    blend.r < 0.5 ? base.r - (1.0 - 2.0 * blend.r) * base.r * (1.0 - base.r) : base.r + (2.0 * blend.r - 1.0) * (sqrt(base.r) - base.r),
    blend.g < 0.5 ? base.g - (1.0 - 2.0 * blend.g) * base.g * (1.0 - base.g) : base.g + (2.0 * blend.g - 1.0) * (sqrt(base.g) - base.g),
    blend.b < 0.5 ? base.b - (1.0 - 2.0 * blend.b) * base.b * (1.0 - base.b) : base.b + (2.0 * blend.b - 1.0) * (sqrt(base.b) - base.b)
  );
}

vec3 blend_color_dodge(vec3 base, vec3 blend) {
  return vec3(
    blend.r >= 1.0 ? 1.0 : min(1.0, base.r / (1.0 - blend.r)),
    blend.g >= 1.0 ? 1.0 : min(1.0, base.g / (1.0 - blend.g)),
    blend.b >= 1.0 ? 1.0 : min(1.0, base.b / (1.0 - blend.b))
  );
}

vec3 blend_lighten(vec3 base, vec3 blend) {
  return max(base, blend);
}

// Apply blend by mode index: 0=screen, 1=multiply, 2=overlay, 3=hard-light,
// 4=soft-light, 5=color-dodge, 6=lighten, 7=normal
vec3 applyBlend(vec3 base, vec3 blend, int mode) {
  if (mode == 1) return blend_multiply(base, blend);
  if (mode == 2) return blend_overlay_ch(base, blend);
  if (mode == 3) return blend_hard_light(base, blend);
  if (mode == 4) return blend_soft_light(base, blend);
  if (mode == 5) return blend_color_dodge(base, blend);
  if (mode == 6) return blend_lighten(base, blend);
  if (mode == 7) return mix(base, blend, 1.0);
  return blend_screen(base, blend);
}

// ─── Main ───────────────────────────────────────────────────────────────────

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float aspect = u_resolution.x / u_resolution.y;
  vec3 color = u_background;

  for (int i = 0; i < 8; i++) {
    if (i >= u_orbCount) break;

    vec2 orbPos = u_orbPositions[i];
    float orbSize = u_orbSizes[i];
    float orbBlur = u_orbBlurs[i];

    // Distance from pixel to orb center (aspect-corrected)
    vec2 diff = uv - orbPos;
    diff.x *= aspect;
    float dist = length(diff);

    // Noise distortion for organic bubble-like edges (only when wavy is enabled)
    if (u_orbWavy[i] == 1) {
      // Low frequency noise for smooth, large undulations (bubble-like)
      float noise = fbm(vec3(uv * 2.0, u_time * 0.25 + float(i)));
      // Scale amplitude with blur so wavy edges remain visible through smoothing
      float wavyAmplitude = 0.12 + orbBlur * 0.003;
      dist += noise * wavyAmplitude;
    }

    // Soft radial falloff — blur factor scaled to approximate CSS filter: blur()
    float alpha = 1.0 - smoothstep(0.0, orbSize * (1.0 + orbBlur * 0.035), dist);

    // Blend orb color onto accumulated color
    vec3 orbContribution = u_orbColors[i] * alpha;
    color = applyBlend(color, orbContribution, u_orbBlendModes[i]);
  }

  // Grain overlay
  if (u_grainIntensity > 0.0) {
    float grain = gradientNoise(gl_FragCoord.xy) * u_grainIntensity;
    color += grain - u_grainIntensity * 0.5;
  }

  // Anti-banding dither
  color += (1.0 / 255.0) * gradientNoise(gl_FragCoord.xy + 0.5) - (0.5 / 255.0);

  ORBKIT_FRAG_OUT = vec4(color, 1.0);
}
`;

// src/renderers/shaders/orb.vert.glsl
var orb_vert_default = `#version 300 es
// Fullscreen triangle — covers entire viewport with a single triangle.
// Uses gl_VertexID (no vertex buffer needed).
// For WebGL1, the host code uses a separate shader with a_position attribute.

void main() {
  vec2 pos = vec2(
    float((gl_VertexID & 1) * 4 - 1),
    float((gl_VertexID & 2) * 2 - 1)
  );
  gl_Position = vec4(pos, 0.0, 1.0);
}
`;

// src/renderers/shaders/index.ts
var VERTEX_SHADER_WEBGL1 = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;
var FRAGMENT_SHADER_WEBGL2 = `#version 300 es
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
out vec4 ORBKIT_FRAG_OUT;
${orb_frag_default}`;
var FRAGMENT_SHADER_WEBGL1 = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
  precision highp float;
#else
  precision mediump float;
#endif
#define ORBKIT_FRAG_OUT gl_FragColor
${orb_frag_default}`;

// src/renderers/webgl-renderer.ts
var MAX_ORBS = 8;
var BLEND_MODE_INDEX = {
  screen: 0,
  multiply: 1,
  overlay: 2,
  "hard-light": 3,
  "soft-light": 4,
  "color-dodge": 5,
  lighten: 6,
  normal: 7
};
function compileShader(gl, type, source) {
  const shader = gl.createShader(type);
  if (!shader)
    return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn(`OrbKit: Shader compile error: ${gl.getShaderInfoLog(shader)}`);
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}
function linkProgram(gl, vertShader, fragShader) {
  const program = gl.createProgram();
  if (!program)
    return null;
  gl.attachShader(program, vertShader);
  gl.attachShader(program, fragShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.warn(`OrbKit: Program link error: ${gl.getProgramInfoLog(program)}`);
    gl.deleteProgram(program);
    return null;
  }
  return program;
}
function hexToVec3(hex) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length < 6)
    return [0, 0, 0];
  const r = Number.parseInt(cleaned.substring(0, 2), 16) / 255;
  const g = Number.parseInt(cleaned.substring(2, 4), 16) / 255;
  const b = Number.parseInt(cleaned.substring(4, 6), 16) / 255;
  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b))
    return [0, 0, 0];
  return [r, g, b];
}
var ZERO_OFFSET2 = { x: 0, y: 0 };
function createWebGLRenderer() {
  if (typeof document === "undefined") {
    return createCanvasRenderer();
  }
  let canvas = null;
  let gl = null;
  let program = null;
  let isWebGL2 = false;
  let animationId = null;
  let running = false;
  let orbs = [];
  let background = [0, 0, 0];
  let grainIntensity = 0;
  let pointerX = 0.5;
  let pointerY = 0.5;
  let uResolution = null;
  let uTime = null;
  let uOrbCount = null;
  let uGrainIntensity = null;
  let uBackground = null;
  const uOrbColors = [];
  const uOrbPositions = [];
  const uOrbSizes = [];
  const uOrbBlurs = [];
  const uOrbBlendModes = [];
  const uOrbWavy = [];
  let vao = null;
  let vertexBuffer = null;
  function initShaders() {
    if (!gl)
      return false;
    const vertSource = isWebGL2 ? orb_vert_default : VERTEX_SHADER_WEBGL1;
    const fragSource = isWebGL2 ? FRAGMENT_SHADER_WEBGL2 : FRAGMENT_SHADER_WEBGL1;
    const vert = compileShader(gl, gl.VERTEX_SHADER, vertSource);
    const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSource);
    if (!vert || !frag)
      return false;
    program = linkProgram(gl, vert, frag);
    if (!program)
      return false;
    gl.deleteShader(vert);
    gl.deleteShader(frag);
    gl.useProgram(program);
    uResolution = gl.getUniformLocation(program, "u_resolution");
    uTime = gl.getUniformLocation(program, "u_time");
    uOrbCount = gl.getUniformLocation(program, "u_orbCount");
    uGrainIntensity = gl.getUniformLocation(program, "u_grainIntensity");
    uBackground = gl.getUniformLocation(program, "u_background");
    for (let i = 0;i < MAX_ORBS; i++) {
      uOrbColors[i] = gl.getUniformLocation(program, `u_orbColors[${i}]`);
      uOrbPositions[i] = gl.getUniformLocation(program, `u_orbPositions[${i}]`);
      uOrbSizes[i] = gl.getUniformLocation(program, `u_orbSizes[${i}]`);
      uOrbBlurs[i] = gl.getUniformLocation(program, `u_orbBlurs[${i}]`);
      uOrbBlendModes[i] = gl.getUniformLocation(program, `u_orbBlendModes[${i}]`);
      uOrbWavy[i] = gl.getUniformLocation(program, `u_orbWavy[${i}]`);
    }
    return true;
  }
  function setupGeometry() {
    if (!gl || !program)
      return;
    if (isWebGL2) {
      const gl2 = gl;
      vao = gl2.createVertexArray();
      gl2.bindVertexArray(vao);
    } else {
      vertexBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
      const positions = new Float32Array([-1, -1, 3, -1, -1, 3]);
      gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
      const posLoc = gl.getAttribLocation(program, "a_position");
      gl.enableVertexAttribArray(posLoc);
      gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);
    }
  }
  function uploadOrbUniforms() {
    if (!gl)
      return;
    const count = Math.min(orbs.length, MAX_ORBS);
    gl.uniform1i(uOrbCount, count);
    for (let i = 0;i < count; i++) {
      const orb = orbs[i];
      if (!orb)
        continue;
      gl.uniform3f(uOrbColors[i] ?? null, orb.colorVec3[0], orb.colorVec3[1], orb.colorVec3[2]);
      gl.uniform1f(uOrbSizes[i] ?? null, orb.size);
      gl.uniform1f(uOrbBlurs[i] ?? null, orb.blur);
      gl.uniform1i(uOrbBlendModes[i] ?? null, orb.blendModeIndex);
      const wavyEnabled = orb.wavy === true || typeof orb.wavy === "object" && orb.wavy !== null;
      gl.uniform1i(uOrbWavy[i] ?? null, wavyEnabled ? 1 : 0);
    }
  }
  function render(time) {
    if (!gl || !canvas || !program)
      return;
    const w = canvas.width;
    const h = canvas.height;
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uResolution, w, h);
    gl.uniform1f(uTime, time / 1000);
    gl.uniform3f(uBackground, background[0], background[1], background[2]);
    gl.uniform1f(uGrainIntensity, grainIntensity);
    const count = Math.min(orbs.length, MAX_ORBS);
    for (let i = 0;i < count; i++) {
      const orb = orbs[i];
      if (!orb)
        continue;
      const driftEnabled = orb.drift === true || typeof orb.drift === "object" && orb.drift !== null;
      const offset = driftEnabled ? calculateDriftOffset(orb.orbitParams, time) : ZERO_OFFSET2;
      const interactiveIntensity = 0.35;
      const ix = orb.interactive ? (pointerX - orb.position[0]) * interactiveIntensity : 0;
      const iy = orb.interactive ? (pointerY - orb.position[1]) * interactiveIntensity : 0;
      gl.uniform2f(uOrbPositions[i] ?? null, orb.position[0] + offset.x + ix, orb.position[1] + offset.y + iy);
    }
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (running) {
      animationId = requestAnimationFrame(render);
    }
  }
  return {
    type: "webgl",
    mount(container) {
      if (typeof document === "undefined")
        return;
      canvas = document.createElement("canvas");
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.style.display = "block";
      gl = canvas.getContext("webgl2");
      if (gl) {
        isWebGL2 = true;
      } else {
        gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        isWebGL2 = false;
      }
      if (!gl) {
        console.warn("OrbKit: WebGL not available, falling back to Canvas renderer");
        const fallback = createCanvasRenderer();
        fallback.mount(container);
        Object.assign(this, fallback);
        return;
      }
      container.appendChild(canvas);
      const rect = container.getBoundingClientRect();
      const dpr = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      if (!initShaders()) {
        console.warn("OrbKit: WebGL shader compilation failed, falling back to Canvas renderer");
        container.removeChild(canvas);
        const fallback = createCanvasRenderer();
        fallback.mount(container);
        Object.assign(this, fallback);
        return;
      }
      setupGeometry();
      uploadOrbUniforms();
    },
    unmount() {
      this.stop();
      if (canvas?.parentElement) {
        canvas.parentElement.removeChild(canvas);
      }
    },
    setOrbs(configs) {
      if (configs.length > MAX_ORBS) {
        console.warn(`OrbKit: WebGL renderer supports a maximum of ${MAX_ORBS} orbs. Only the first ${MAX_ORBS} will be rendered.`);
      }
      orbs = configs.slice(0, MAX_ORBS).map((config, index) => ({
        ...config,
        orbitParams: getOrbitParams(config.position[0], config.position[1], index, 50),
        colorVec3: hexToVec3(config.color),
        blendModeIndex: BLEND_MODE_INDEX[config.blendMode] ?? 0
      }));
      uploadOrbUniforms();
    },
    setBackground(color) {
      background = hexToVec3(color);
    },
    setGrain(intensity) {
      grainIntensity = intensity;
    },
    setPointerPosition(x, y) {
      pointerX = x;
      pointerY = y;
    },
    resize(width, height) {
      if (!canvas)
        return;
      const dpr = typeof devicePixelRatio !== "undefined" ? devicePixelRatio : 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
    },
    start() {
      if (running)
        return;
      running = true;
      if (typeof requestAnimationFrame !== "undefined") {
        animationId = requestAnimationFrame(render);
      }
    },
    stop() {
      running = false;
      if (animationId !== null && typeof cancelAnimationFrame !== "undefined") {
        cancelAnimationFrame(animationId);
        animationId = null;
      }
    },
    destroy() {
      this.stop();
      this.unmount();
      if (gl && program) {
        gl.deleteProgram(program);
      }
      if (gl && vertexBuffer) {
        gl.deleteBuffer(vertexBuffer);
      }
      if (isWebGL2 && gl && vao) {
        gl.deleteVertexArray(vao);
      }
      canvas = null;
      gl = null;
      program = null;
      vao = null;
      vertexBuffer = null;
      orbs = [];
    }
  };
}

// src/components/imperative-scene.tsx
var jsx_dev_runtime2 = require("react/jsx-dev-runtime");
function ImperativeScene({
  rendererType
}) {
  const scene = useOrbSceneContext();
  const containerRef = import_react3.useRef(null);
  const rendererRef = import_react3.useRef(null);
  import_react3.useEffect(() => {
    const container = containerRef.current;
    if (!container || !scene)
      return;
    const factory = rendererType === "webgl" ? createWebGLRenderer : createCanvasRenderer;
    const renderer = factory();
    renderer.mount(container);
    renderer.setBackground(scene.background);
    renderer.setGrain(scene.grain);
    renderer.start();
    rendererRef.current = renderer;
    scene.imperativeRendererRef.current = renderer;
    const configs = Array.from(scene.orbConfigsRef.current.values());
    if (configs.length > 0) {
      renderer.setOrbs(configs);
    }
    return () => {
      scene.imperativeRendererRef.current = null;
      rendererRef.current = null;
      renderer.destroy();
    };
  }, [rendererType, scene]);
  import_react3.useEffect(() => {
    rendererRef.current?.setBackground(scene?.background ?? "#000000");
  }, [scene?.background]);
  import_react3.useEffect(() => {
    rendererRef.current?.setGrain(scene?.grain ?? 0);
  }, [scene?.grain]);
  import_react3.useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof ResizeObserver === "undefined")
      return;
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        rendererRef.current?.resize(entry.contentRect.width, entry.contentRect.height);
      }
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);
  return /* @__PURE__ */ jsx_dev_runtime2.jsxDEV("div", {
    ref: containerRef,
    style: {
      position: "absolute",
      inset: 0,
      pointerEvents: "none"
    }
  }, undefined, false, undefined, this);
}

// src/components/orb.tsx
var import_react4 = require("react");

// src/renderers/css-renderer.ts
function generateOrbCSS(point, saturation) {
  const adjustedColor = applySaturation(point.color, saturation);
  const [x, y] = point.position;
  return `radial-gradient(at ${x * 100}% ${y * 100}%, ${adjustedColor} 0%, transparent ${point.radius * 100}%)`;
}
function generateGradientCSS(points, saturation) {
  return points.map((point) => generateOrbCSS(point, saturation)).join(", ");
}
function generateGrainIntensity(grain) {
  return grain / 100 * 0.5;
}
function generateOrbAnimation(_props, index, breathing) {
  const position = _props.position ?? [0.5, 0.5];
  const [x, y] = position;
  const orbit = getOrbitParams(x, y, index, breathing);
  const animationName = `orbkit-drift-${index}`;
  const keyframeCSS = generateDriftKeyframeCSS(animationName, orbit.amplitudeX, orbit.amplitudeY);
  return {
    keyframeCSS,
    animationName,
    duration: orbit.duration,
    delay: orbit.delay
  };
}

// src/utils/blob.ts
function seededRandom2(seed) {
  let s = Number.isFinite(seed) ? Math.floor(seed) : 1;
  if (s <= 0)
    s = 1;
  return () => {
    s = s * 16807 % 2147483647;
    return (s - 1) / 2147483646;
  };
}
function randomBorderRadius(rand) {
  const r = () => Math.round(30 + rand() * 40);
  return `${r()}% ${r()}% ${r()}% ${r()}% / ${r()}% ${r()}% ${r()}% ${r()}%`;
}
function generateBlobMorphKeyframes(seed, speed) {
  const rand = seededRandom2(seed + 1);
  const name = `orbkit-blob-${Math.abs(Math.floor(seed))}`;
  const safeSpeed = speed > 0 ? speed : 1;
  const duration = 8 / safeSpeed;
  const keyframeCSS = `@keyframes ${name} {
  0%, 100% { border-radius: ${randomBorderRadius(rand)}; }
  25% { border-radius: ${randomBorderRadius(rand)}; }
  50% { border-radius: ${randomBorderRadius(rand)}; }
  75% { border-radius: ${randomBorderRadius(rand)}; }
}`;
  return { animationName: name, keyframeCSS, duration };
}

// src/utils/keyframe-registry.ts
var injectedKeyframes = new Set;
function injectKeyframes(name, css) {
  if (!name.trim() || !css.trim())
    return;
  if (injectedKeyframes.has(name))
    return;
  if (typeof document === "undefined")
    return;
  const style = document.createElement("style");
  style.setAttribute("data-orbkit", name);
  style.textContent = css;
  document.head.appendChild(style);
  injectedKeyframes.add(name);
}
function removeKeyframes(name) {
  if (!name.trim())
    return;
  if (typeof document === "undefined")
    return;
  const el = document.querySelector(`style[data-orbkit="${name}"]`);
  if (el)
    el.remove();
  injectedKeyframes.delete(name);
}

// src/components/orb.tsx
var jsx_dev_runtime3 = require("react/jsx-dev-runtime");
function Orb({
  color,
  position = [0.5, 0.5],
  size = 0.75,
  blur = 40,
  blendMode = "screen",
  wavy,
  drift,
  renderer: _renderer,
  interactive,
  className,
  style
}) {
  const scene = useOrbSceneContext();
  const instanceId = import_react4.useId();
  const [orbIndex, setOrbIndex] = import_react4.useState(-1);
  const fallbackOrbIndex = import_react4.useMemo(() => {
    let hash = 0;
    for (let i = 0;i < instanceId.length; i++) {
      hash = hash * 31 + instanceId.charCodeAt(i) | 0;
    }
    return Math.abs(hash);
  }, [instanceId]);
  const resolvedRenderer = scene?.renderer ?? "css";
  const isImperative = resolvedRenderer !== "css";
  const [px, py] = position;
  const driftEnabled = drift === true || typeof drift === "object" && drift !== null;
  const driftSpeed = typeof drift === "object" ? drift.speed ?? 1 : 1;
  const resolvedBreathing = scene?.breathing ?? 0;
  import_react4.useEffect(() => {
    if (scene) {
      setOrbIndex(scene.registerOrb());
    } else {
      setOrbIndex(fallbackOrbIndex);
    }
  }, [scene, fallbackOrbIndex]);
  import_react4.useEffect(() => {
    if (!isImperative || !scene)
      return;
    const config = {
      id: instanceId,
      color,
      position: [px, py],
      size,
      blur,
      blendMode,
      drift: drift ?? false,
      wavy: wavy ?? false,
      interactive: interactive === true
    };
    scene.registerOrbConfig(instanceId, config);
    return () => scene.unregisterOrbConfig(instanceId);
  }, [
    isImperative,
    scene,
    instanceId,
    color,
    px,
    py,
    size,
    blur,
    blendMode,
    drift,
    wavy,
    interactive
  ]);
  const [animationProps, setAnimationProps] = import_react4.useState(null);
  import_react4.useEffect(() => {
    if (isImperative || !driftEnabled || orbIndex < 0) {
      setAnimationProps(null);
      return;
    }
    const { keyframeCSS, animationName, duration, delay } = generateOrbAnimation({ color, position: [px, py], size }, orbIndex, resolvedBreathing);
    injectKeyframes(animationName, keyframeCSS);
    const safeDriftSpeed = driftSpeed > 0 ? driftSpeed : 1;
    setAnimationProps({ animationName, duration: duration / safeDriftSpeed, delay });
    return () => removeKeyframes(animationName);
  }, [isImperative, driftEnabled, driftSpeed, orbIndex, resolvedBreathing, px, py, color, size]);
  const animationStyle = import_react4.useMemo(() => {
    if (!animationProps)
      return {};
    return {
      animation: `${animationProps.animationName} ${animationProps.duration}s linear infinite`,
      animationDelay: `${animationProps.delay}s`
    };
  }, [animationProps]);
  const wavyEnabled = wavy === true || typeof wavy === "object" && wavy !== null;
  const wavyConfig = typeof wavy === "object" && wavy !== null ? wavy : {};
  const wavySpeed = Math.max(wavyConfig.speed ?? 1, 0.1);
  const [blobAnimProps, setBlobAnimProps] = import_react4.useState(null);
  import_react4.useEffect(() => {
    if (isImperative || !wavyEnabled || orbIndex < 0) {
      setBlobAnimProps(null);
      return;
    }
    const { animationName, keyframeCSS, duration } = generateBlobMorphKeyframes(orbIndex, wavySpeed);
    injectKeyframes(animationName, keyframeCSS);
    setBlobAnimProps({ animationName, duration });
    return () => removeKeyframes(animationName);
  }, [isImperative, wavyEnabled, wavySpeed, orbIndex]);
  const interactiveEnabled = interactive === true;
  const intensity = 35;
  const interactiveTransform = interactiveEnabled ? `translate(calc((var(--orbkit-mx, 0.5) - ${px}) * ${intensity}%), calc((var(--orbkit-my, 0.5) - ${py}) * ${intensity}%))` : "";
  const interactiveStyle = interactiveEnabled ? {
    transform: interactiveTransform,
    transition: "transform 0.2s ease-out",
    willChange: "transform"
  } : {};
  if (isImperative) {
    return null;
  }
  const blobAnimStyle = blobAnimProps ? {
    animation: `${blobAnimProps.animationName} ${blobAnimProps.duration}s ease-in-out infinite`
  } : {};
  if (wavyEnabled) {
    const blobDiameter = `${size * 150}%`;
    const blobTransform = interactiveEnabled ? `translate(-50%, -50%) ${interactiveTransform}` : "translate(-50%, -50%)";
    const blobStyle = {
      position: "absolute",
      width: blobDiameter,
      height: blobDiameter,
      left: `${px * 100}%`,
      top: `${py * 100}%`,
      transform: blobTransform,
      background: `radial-gradient(circle, ${color} 0%, ${color}cc 30%, ${color}44 60%, transparent 70%)`,
      filter: `blur(${blur}px)`,
      mixBlendMode: blendMode,
      borderRadius: "50%",
      transition: interactiveEnabled ? "transform 0.2s ease-out" : undefined,
      willChange: interactiveEnabled ? "transform" : undefined,
      ...blobAnimStyle,
      ...style
    };
    if (driftEnabled) {
      return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
        className: "orbkit-orb-drift",
        style: {
          position: "absolute",
          width: blobDiameter,
          height: blobDiameter,
          left: `${px * 100}%`,
          top: `${py * 100}%`,
          transform: "translate(-50%, -50%)",
          ...animationStyle
        },
        children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
          className: className ? `orbkit-orb orbkit-orb-blob ${className}` : "orbkit-orb orbkit-orb-blob",
          style: {
            width: "100%",
            height: "100%",
            background: blobStyle.background,
            filter: blobStyle.filter,
            mixBlendMode: blobStyle.mixBlendMode,
            borderRadius: "50%",
            ...interactiveEnabled ? {
              transform: interactiveTransform,
              transition: "transform 0.2s ease-out",
              willChange: "transform"
            } : {},
            ...blobAnimStyle,
            ...style
          }
        }, undefined, false, undefined, this)
      }, undefined, false, undefined, this);
    }
    return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
      className: className ? `orbkit-orb orbkit-orb-blob ${className}` : "orbkit-orb orbkit-orb-blob",
      style: blobStyle
    }, undefined, false, undefined, this);
  }
  const orbStyle = {
    position: "absolute",
    width: "130%",
    height: "130%",
    top: "-15%",
    left: "-15%",
    background: `radial-gradient(at ${px * 100}% ${py * 100}%, ${color} 0%, transparent ${size * 100}%)`,
    filter: `blur(${blur}px)`,
    mixBlendMode: blendMode
  };
  if (driftEnabled && interactiveEnabled) {
    return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
      className: "orbkit-orb-drift",
      style: {
        position: "absolute",
        width: "130%",
        height: "130%",
        top: "-15%",
        left: "-15%",
        ...animationStyle
      },
      children: /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
        className: className ? `orbkit-orb ${className}` : "orbkit-orb",
        style: {
          width: "100%",
          height: "100%",
          background: orbStyle.background,
          filter: orbStyle.filter,
          mixBlendMode: orbStyle.mixBlendMode,
          ...interactiveStyle,
          ...style
        }
      }, undefined, false, undefined, this)
    }, undefined, false, undefined, this);
  }
  return /* @__PURE__ */ jsx_dev_runtime3.jsxDEV("div", {
    className: className ? `orbkit-orb ${className}` : "orbkit-orb",
    style: {
      ...orbStyle,
      ...animationStyle,
      ...interactiveStyle,
      ...style
    }
  }, undefined, false, undefined, this);
}

// src/components/orb-scene.tsx
var jsx_dev_runtime4 = require("react/jsx-dev-runtime");
function OrbScene({
  background,
  grain,
  breathing,
  preset,
  renderer = "css",
  className,
  style,
  as = "div",
  children
}) {
  const [resolvedRenderer, setResolvedRenderer] = import_react5.useState(renderer === "auto" ? "css" : renderer);
  import_react5.useEffect(() => {
    if (renderer === "auto") {
      setResolvedRenderer(detectBestRenderer());
    } else {
      setResolvedRenderer(renderer);
    }
  }, [renderer]);
  const presetData = preset ? presets[preset] : null;
  const resolvedBackground = background ?? presetData?.backgroundColor ?? "#000000";
  const resolvedGrain = grain ?? (presetData ? presetData.grain / 100 : 0);
  const resolvedBreathing = breathing ?? presetData?.breathing ?? 0;
  const resolvedSaturation = presetData?.saturation ?? 70;
  const containerRef = import_react5.useRef(null);
  const contextValue = useOrbSceneProvider({
    background: resolvedBackground,
    grain: resolvedGrain,
    breathing: resolvedBreathing,
    renderer: resolvedRenderer,
    saturation: resolvedSaturation,
    containerRef
  });
  const imperativeRendererRef = contextValue.imperativeRendererRef;
  import_react5.useEffect(() => {
    const container = containerRef.current;
    if (!container)
      return;
    let rafId = null;
    const handlePointerMove = (e) => {
      if (rafId)
        return;
      rafId = requestAnimationFrame(() => {
        const rect = container.getBoundingClientRect();
        const mx = (e.clientX - rect.left) / rect.width;
        const my = (e.clientY - rect.top) / rect.height;
        container.style.setProperty("--orbkit-mx", String(mx));
        container.style.setProperty("--orbkit-my", String(my));
        imperativeRendererRef.current?.setPointerPosition(mx, my);
        rafId = null;
      });
    };
    const handlePointerLeave = () => {
      if (rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
      container.style.setProperty("--orbkit-mx", "0.5");
      container.style.setProperty("--orbkit-my", "0.5");
      imperativeRendererRef.current?.setPointerPosition(0.5, 0.5);
    };
    container.addEventListener("pointermove", handlePointerMove);
    container.addEventListener("pointerleave", handlePointerLeave);
    return () => {
      container.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      if (rafId)
        cancelAnimationFrame(rafId);
    };
  }, [imperativeRendererRef]);
  const presetOrbs = presetData?.points.map((point, index) => /* @__PURE__ */ jsx_dev_runtime4.jsxDEV(Orb, {
    color: point.color,
    position: point.position,
    size: point.radius,
    blur: 40 + index * 10,
    drift: true
  }, point.id, false, undefined, this));
  const setRef = (el) => {
    containerRef.current = el;
  };
  const isImperative = resolvedRenderer !== "css";
  return /* @__PURE__ */ jsx_dev_runtime4.jsxDEV(OrbSceneContext.Provider, {
    value: contextValue,
    children: import_react5.createElement(as, {
      ref: setRef,
      className: className ? `orbkit-scene ${className}` : "orbkit-scene",
      style: {
        position: "relative",
        overflow: "hidden",
        backgroundColor: resolvedBackground,
        "--orbkit-mx": "0.5",
        "--orbkit-my": "0.5",
        ...style
      }
    }, isImperative ? /* @__PURE__ */ jsx_dev_runtime4.jsxDEV(ImperativeScene, {
      rendererType: resolvedRenderer
    }, undefined, false, undefined, this) : null, presetOrbs, children, !isImperative && resolvedGrain > 0 ? /* @__PURE__ */ jsx_dev_runtime4.jsxDEV(Grain, {
      intensity: resolvedGrain
    }, undefined, false, undefined, this) : null)
  }, undefined, false, undefined, this);
}
