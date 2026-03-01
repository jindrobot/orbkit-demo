"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Mesh, Program, Renderer, Triangle, Vec3 } from "ogl";

function hexToVec3(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  return [r, g, b];
}

const vert = `
  precision highp float;
  attribute vec2 position;
  attribute vec2 uv;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const frag = `
  precision highp float;
  uniform float iTime;
  uniform vec3 iResolution;
  uniform float hue;
  uniform float hover;
  uniform float rot;
  uniform float hoverIntensity;
  uniform vec3 backgroundColor;
  uniform float orbScale;
  uniform float noiseAmount;
  uniform float glowIntensity;
  uniform float pulseSpeed;
  uniform float innerDetail;
  varying vec2 vUv;

  vec3 rgb2yiq(vec3 c) {
    float y = dot(c, vec3(0.299, 0.587, 0.114));
    float i = dot(c, vec3(0.596, -0.274, -0.322));
    float q = dot(c, vec3(0.211, -0.523, 0.312));
    return vec3(y, i, q);
  }
  vec3 yiq2rgb(vec3 c) {
    float r = c.x + 0.956 * c.y + 0.621 * c.z;
    float g = c.x - 0.272 * c.y - 0.647 * c.z;
    float b = c.x - 1.106 * c.y + 1.703 * c.z;
    return vec3(r, g, b);
  }
  vec3 adjustHue(vec3 color, float hueDeg) {
    float hueRad = hueDeg * 3.14159265 / 180.0;
    vec3 yiq = rgb2yiq(color);
    float cosA = cos(hueRad);
    float sinA = sin(hueRad);
    float i = yiq.y * cosA - yiq.z * sinA;
    float q = yiq.y * sinA + yiq.z * cosA;
    yiq.y = i;
    yiq.z = q;
    return yiq2rgb(yiq);
  }
  vec3 hash33(vec3 p3) {
    p3 = fract(p3 * vec3(0.1031, 0.11369, 0.13787));
    p3 += dot(p3, p3.yxz + 19.19);
    return -1.0 + 2.0 * fract(vec3(p3.x+p3.y, p3.x+p3.z, p3.y+p3.z) * p3.zyx);
  }
  float snoise3(vec3 p) {
    const float K1 = 0.333333333;
    const float K2 = 0.166666667;
    vec3 i = floor(p + (p.x+p.y+p.z)*K1);
    vec3 d0 = p - (i - (i.x+i.y+i.z)*K2);
    vec3 e = step(vec3(0.0), d0 - d0.yzx);
    vec3 i1 = e * (1.0 - e.zxy);
    vec3 i2 = 1.0 - e.zxy * (1.0 - e);
    vec3 d1 = d0 - (i1 - K2);
    vec3 d2 = d0 - (i2 - K1);
    vec3 d3 = d0 - 0.5;
    vec4 h = max(0.6 - vec4(dot(d0,d0), dot(d1,d1), dot(d2,d2), dot(d3,d3)), 0.0);
    vec4 n = h*h*h*h * vec4(dot(d0,hash33(i)), dot(d1,hash33(i+i1)), dot(d2,hash33(i+i2)), dot(d3,hash33(i+1.0)));
    return dot(vec4(31.316), n);
  }

  vec4 extractAlpha(vec3 colorIn) {
    float a = max(max(colorIn.r, colorIn.g), colorIn.b);
    return vec4(colorIn.rgb / (a + 1e-5), a);
  }

  const vec3 baseColor1 = vec3(0.611765, 0.262745, 0.996078);
  const vec3 baseColor2 = vec3(0.298039, 0.760784, 0.913725);
  const vec3 baseColor3 = vec3(0.062745, 0.078431, 0.600000);

  float light1(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * attenuation);
  }
  float light2(float intensity, float attenuation, float dist) {
    return intensity / (1.0 + dist * dist * attenuation);
  }

  vec4 draw(vec2 uv) {
    vec3 color1 = adjustHue(baseColor1, hue);
    vec3 color2 = adjustHue(baseColor2, hue);
    vec3 color3 = adjustHue(baseColor3, hue);

    float ang = atan(uv.y, uv.x);
    float len = length(uv);
    float invLen = len > 0.0 ? 1.0 / len : 0.0;

    float innerRadius = 0.6 * orbScale;
    float noiseScale = 0.65 * noiseAmount;

    // Pulsing inner radius
    float pulse = sin(iTime * pulseSpeed) * 0.03;
    innerRadius += pulse;

    float n0 = snoise3(vec3(uv * noiseScale, iTime * 0.5)) * 0.5 + 0.5;
    
    // Extra detail noise layers
    float n1 = snoise3(vec3(uv * noiseScale * 2.0, iTime * 0.3 + 100.0)) * 0.25 + 0.5;
    float n2 = snoise3(vec3(uv * noiseScale * 4.0, iTime * 0.7 + 200.0)) * 0.125 + 0.5;
    float combinedNoise = mix(n0, n0 * 0.6 + n1 * 0.3 + n2 * 0.1, innerDetail);

    float r0 = mix(mix(innerRadius, 1.0, 0.4), mix(innerRadius, 1.0, 0.6), combinedNoise);
    float d0 = distance(uv, (r0 * invLen) * uv);
    float v0 = light1(1.0, 10.0, d0);

    v0 *= smoothstep(r0 * 1.05, r0, len);
    float innerFade = smoothstep(r0 * 0.8, r0 * 0.95, len);
    float bgLuminance = dot(backgroundColor, vec3(0.299, 0.587, 0.114));
    v0 *= mix(innerFade, 1.0, bgLuminance * 0.7);
    float cl = cos(ang + iTime * 2.0) * 0.5 + 0.5;

    // Orbiting light
    float a = iTime * -1.0;
    vec2 pos = vec2(cos(a), sin(a)) * r0;
    float d = distance(uv, pos);
    float v1 = light2(1.5, 5.0, d);
    v1 *= light1(1.0, 50.0, d0);

    // Second orbiting light (opposite side)
    float a2 = iTime * 0.7 + 3.14159;
    vec2 pos2 = vec2(cos(a2), sin(a2)) * r0 * 0.8;
    float d2 = distance(uv, pos2);
    float v1b = light2(0.8, 8.0, d2);
    v1b *= light1(0.6, 50.0, d0);

    float v2 = smoothstep(1.0, mix(innerRadius, 1.0, combinedNoise * 0.5), len);
    float v3 = smoothstep(innerRadius, mix(innerRadius, 1.0, 0.5), len);

    vec3 colBase = mix(color1, color2, cl);
    
    vec3 col = mix(color3, colBase, v0);
    col = (col + v1 + v1b * color2) * v2 * v3;

    // Outer glow
    float outerGlow = smoothstep(1.2, innerRadius, len);
    col += colBase * outerGlow * 0.15 * glowIntensity;

    // Atmospheric haze
    float haze = exp(-len * len * 3.0) * 0.1 * glowIntensity;
    col += mix(color1, color2, 0.5) * haze;

    col = clamp(col, 0.0, 1.0);
    return extractAlpha(col);
  }

  // Stars / particles
  float star(vec2 uv, vec2 pos, float brightness) {
    float d = length(uv - pos);
    return brightness / (d * d * 800.0 + 1.0);
  }

  void main() {
    vec2 fragCoord = vUv * iResolution.xy;
    vec2 center = iResolution.xy * 0.5;
    float size = min(iResolution.x, iResolution.y);
    vec2 uv = (fragCoord - center) / size * 2.0;

    float angle = rot;
    float s = sin(angle);
    float c = cos(angle);
    uv = vec2(c*uv.x - s*uv.y, s*uv.x + c*uv.y);
    uv.x += hover * hoverIntensity * 0.1 * sin(uv.y * 10.0 + iTime);
    uv.y += hover * hoverIntensity * 0.1 * sin(uv.x * 10.0 + iTime);

    vec4 orb = draw(uv);

    // Background nebula
    vec2 bgUv = (fragCoord - center) / size;
    float nebula = snoise3(vec3(bgUv * 2.0, iTime * 0.1)) * 0.5 + 0.5;
    float nebula2 = snoise3(vec3(bgUv * 3.0 + 50.0, iTime * 0.15)) * 0.5 + 0.5;
    vec3 nebulaColor = mix(
      adjustHue(baseColor3, hue) * 0.15,
      adjustHue(baseColor1, hue) * 0.08,
      nebula
    );
    nebulaColor += adjustHue(baseColor2, hue) * nebula2 * 0.05;

    // Floating particles / stars
    vec3 stars = vec3(0.0);
    for (int i = 0; i < 20; i++) {
      float fi = float(i);
      float t = iTime * (0.05 + fi * 0.01);
      vec2 starPos = vec2(
        sin(fi * 127.1 + t * 0.3) * 0.9,
        cos(fi * 311.7 + t * 0.2) * 0.9
      );
      float brightness = (sin(iTime * (0.5 + fi * 0.1) + fi) * 0.5 + 0.5) * 0.4;
      stars += vec3(star(bgUv, starPos * 0.5, brightness));
    }
    vec3 starColor = mix(vec3(1.0), adjustHue(baseColor2, hue), 0.3);

    // Combine
    vec3 bg = backgroundColor + nebulaColor + stars * starColor * 0.3;
    vec3 final_color = bg * (1.0 - orb.a) + orb.rgb * orb.a;

    // Vignette
    float vig = 1.0 - dot(bgUv, bgUv) * 0.5;
    final_color *= vig;

    // Film grain
    float grain = (fract(sin(dot(fragCoord, vec2(12.9898, 78.233))) * 43758.5453) - 0.5) * 0.03;
    final_color += grain;

    gl_FragColor = vec4(final_color, 1.0);
  }
`;

interface Preset {
  name: string;
  hue: number;
  bg: string;
  orbScale: number;
  noiseAmount: number;
  glowIntensity: number;
  pulseSpeed: number;
  innerDetail: number;
  hoverIntensity: number;
}

const presets: Preset[] = [
  { name: "Cosmic Purple", hue: 0, bg: "#060010", orbScale: 1.0, noiseAmount: 1.0, glowIntensity: 1.0, pulseSpeed: 1.0, innerDetail: 0.5, hoverIntensity: 0.2 },
  { name: "Nebula Teal", hue: 140, bg: "#001010", orbScale: 1.1, noiseAmount: 1.2, glowIntensity: 1.5, pulseSpeed: 0.8, innerDetail: 0.7, hoverIntensity: 0.3 },
  { name: "Solar Flare", hue: 30, bg: "#0a0200", orbScale: 0.9, noiseAmount: 1.5, glowIntensity: 2.0, pulseSpeed: 2.0, innerDetail: 0.8, hoverIntensity: 0.4 },
  { name: "Deep Ocean", hue: 200, bg: "#000815", orbScale: 1.2, noiseAmount: 0.8, glowIntensity: 1.2, pulseSpeed: 0.5, innerDetail: 0.3, hoverIntensity: 0.15 },
  { name: "Aurora", hue: 100, bg: "#020a05", orbScale: 1.0, noiseAmount: 1.3, glowIntensity: 1.8, pulseSpeed: 1.2, innerDetail: 0.9, hoverIntensity: 0.25 },
  { name: "Plasma Core", hue: 320, bg: "#0a0008", orbScale: 0.85, noiseAmount: 2.0, glowIntensity: 2.5, pulseSpeed: 3.0, innerDetail: 1.0, hoverIntensity: 0.5 },
  { name: "Void", hue: 260, bg: "#020005", orbScale: 1.3, noiseAmount: 0.6, glowIntensity: 0.8, pulseSpeed: 0.3, innerDetail: 0.2, hoverIntensity: 0.1 },
  { name: "Inferno", hue: 350, bg: "#0f0000", orbScale: 0.95, noiseAmount: 1.8, glowIntensity: 2.2, pulseSpeed: 2.5, innerDetail: 0.85, hoverIntensity: 0.35 },
];

function OrbCanvas({ preset }: { preset: Preset }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const renderer = new Renderer({ alpha: false });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);

    const geometry = new Triangle(gl);
    const bgColor = hexToVec3(preset.bg);
    
    const program = new Program(gl, {
      vertex: vert,
      fragment: frag,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Vec3(gl.canvas.width, gl.canvas.height, 1) },
        hue: { value: preset.hue },
        hover: { value: 0 },
        rot: { value: 0 },
        hoverIntensity: { value: preset.hoverIntensity },
        backgroundColor: { value: new Vec3(...bgColor) },
        orbScale: { value: preset.orbScale },
        noiseAmount: { value: preset.noiseAmount },
        glowIntensity: { value: preset.glowIntensity },
        pulseSpeed: { value: preset.pulseSpeed },
        innerDetail: { value: preset.innerDetail },
      },
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      if (!container) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w * dpr, h * dpr);
      gl.canvas.style.width = w + "px";
      gl.canvas.style.height = h + "px";
      program.uniforms.iResolution.value.set(gl.canvas.width, gl.canvas.height, 1);
    }
    window.addEventListener("resize", resize);
    resize();

    let targetHover = 0;
    let currentRot = 0;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetHover = Math.sqrt(x * x + y * y) < 0.8 ? 1 : 0;
    };
    const handleMouseLeave = () => { targetHover = 0; };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);

    let rafId: number;
    const update = (t: number) => {
      rafId = requestAnimationFrame(update);
      const dt = (t - lastTime) * 0.001;
      lastTime = t;
      program.uniforms.iTime.value = t * 0.001;
      program.uniforms.hover.value += (targetHover - program.uniforms.hover.value) * 0.1;
      if (targetHover > 0.5) currentRot += dt * 0.3;
      program.uniforms.rot.value = currentRot;
      renderer.render({ scene: mesh });
    };
    rafId = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      if (gl.canvas.parentNode) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [preset]);

  return <div ref={containerRef} className="absolute inset-0" />;
}

export default function OrbExplorer() {
  const [active, setActive] = useState(0);

  return (
    <div className="min-h-screen bg-black text-white relative">
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/30 border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight">
            Orb <span className="text-white/30 font-normal text-sm ml-1">Explorer</span>
          </h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {presets.map((p, i) => (
              <button
                key={p.name}
                onClick={() => setActive(i)}
                className={`px-3 py-1 rounded-full text-xs transition-all cursor-pointer ${
                  active === i
                    ? "bg-white/90 text-black font-medium"
                    : "bg-white/8 hover:bg-white/15 text-white/50"
                }`}
              >
                {p.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full h-screen relative overflow-hidden">
        <OrbCanvas key={active} preset={presets[active]} />
      </div>
    </div>
  );
}
