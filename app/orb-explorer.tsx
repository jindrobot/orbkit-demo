"use client";

import { useState, useEffect, useRef } from "react";

interface OrbConfig {
  color: string;
  x: number;
  y: number;
  size: number;
  blur: number;
  speed: number;
  angle: number;
  radius: number;
}

interface SceneConfig {
  name: string;
  bg: string;
  grain: number;
  orbs: OrbConfig[];
}

const scenes: SceneConfig[] = [
  {
    name: "Ocean",
    bg: "#0a0f1a",
    grain: 0.3,
    orbs: [
      { color: "#0EA5E9", x: 25, y: 30, size: 45, blur: 80, speed: 0.3, angle: 0, radius: 8 },
      { color: "#06B6D4", x: 70, y: 55, size: 35, blur: 90, speed: 0.2, angle: 2, radius: 12 },
      { color: "#3B82F6", x: 45, y: 75, size: 40, blur: 70, speed: 0.25, angle: 4, radius: 6 },
    ],
  },
  {
    name: "Sunset",
    bg: "#1a0a0f",
    grain: 0.2,
    orbs: [
      { color: "#F97316", x: 30, y: 35, size: 50, blur: 85, speed: 0.25, angle: 0, radius: 10 },
      { color: "#EF4444", x: 65, y: 50, size: 40, blur: 75, speed: 0.35, angle: 3, radius: 8 },
      { color: "#F59E0B", x: 50, y: 70, size: 35, blur: 95, speed: 0.2, angle: 1.5, radius: 14 },
    ],
  },
  {
    name: "Aurora",
    bg: "#050a12",
    grain: 0.35,
    orbs: [
      { color: "#10B981", x: 20, y: 25, size: 55, blur: 100, speed: 0.15, angle: 0, radius: 15 },
      { color: "#8B5CF6", x: 60, y: 40, size: 45, blur: 90, speed: 0.2, angle: 2, radius: 10 },
      { color: "#06B6D4", x: 80, y: 65, size: 35, blur: 80, speed: 0.3, angle: 4, radius: 8 },
      { color: "#34D399", x: 40, y: 80, size: 30, blur: 110, speed: 0.25, angle: 5, radius: 12 },
    ],
  },
  {
    name: "Neon Cyber",
    bg: "#0a0a0f",
    grain: 0.25,
    orbs: [
      { color: "#FF00FF", x: 20, y: 30, size: 50, blur: 70, speed: 0.4, angle: 0, radius: 10 },
      { color: "#00FFFF", x: 75, y: 55, size: 40, blur: 80, speed: 0.3, angle: 2, radius: 8 },
      { color: "#7B00FF", x: 50, y: 80, size: 35, blur: 60, speed: 0.35, angle: 4, radius: 12 },
    ],
  },
  {
    name: "Lava",
    bg: "#0f0500",
    grain: 0.15,
    orbs: [
      { color: "#FF4500", x: 30, y: 40, size: 50, blur: 75, speed: 0.2, angle: 0, radius: 8 },
      { color: "#FF6B00", x: 65, y: 30, size: 40, blur: 85, speed: 0.3, angle: 3, radius: 10 },
      { color: "#DC2626", x: 50, y: 70, size: 45, blur: 65, speed: 0.25, angle: 1, radius: 6 },
    ],
  },
  {
    name: "Deep Space",
    bg: "#020108",
    grain: 0.4,
    orbs: [
      { color: "#2D1B69", x: 15, y: 20, size: 60, blur: 110, speed: 0.1, angle: 0, radius: 18 },
      { color: "#0D47A1", x: 70, y: 45, size: 35, blur: 90, speed: 0.15, angle: 2, radius: 12 },
      { color: "#4A148C", x: 40, y: 80, size: 45, blur: 100, speed: 0.12, angle: 4, radius: 15 },
      { color: "#00695C", x: 85, y: 15, size: 25, blur: 70, speed: 0.2, angle: 5, radius: 8 },
    ],
  },
  {
    name: "Forest",
    bg: "#0a110a",
    grain: 0.3,
    orbs: [
      { color: "#166534", x: 25, y: 35, size: 50, blur: 90, speed: 0.2, angle: 0, radius: 10 },
      { color: "#15803D", x: 65, y: 50, size: 40, blur: 80, speed: 0.15, angle: 3, radius: 12 },
      { color: "#065F46", x: 45, y: 75, size: 35, blur: 100, speed: 0.25, angle: 1, radius: 8 },
    ],
  },
  {
    name: "Minimal",
    bg: "#0f0f0f",
    grain: 0.1,
    orbs: [
      { color: "#374151", x: 40, y: 45, size: 60, blur: 120, speed: 0.08, angle: 0, radius: 20 },
      { color: "#1F2937", x: 65, y: 60, size: 45, blur: 100, speed: 0.1, angle: 3, radius: 15 },
    ],
  },
];

function GrainOverlay({ intensity }: { intensity: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 256;
    canvas.height = 256;

    const imageData = ctx.createImageData(256, 256);
    for (let i = 0; i < imageData.data.length; i += 4) {
      const v = Math.random() * 255;
      imageData.data[i] = v;
      imageData.data[i + 1] = v;
      imageData.data[i + 2] = v;
      imageData.data[i + 3] = intensity * 255 * 0.4;
    }
    ctx.putImageData(imageData, 0, 0);
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10"
      style={{ opacity: intensity, mixBlendMode: "overlay" }}
    />
  );
}

function AnimatedOrb({ orb, breathing }: { orb: OrbConfig; breathing: number }) {
  const [pos, setPos] = useState({ x: orb.x, y: orb.y });

  useEffect(() => {
    let frame: number;
    let t = orb.angle;

    const animate = () => {
      t += orb.speed * 0.01;
      const x = orb.x + Math.sin(t) * orb.radius;
      const y = orb.y + Math.cos(t * 0.7) * orb.radius * 0.8;
      setPos({ x, y });
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [orb]);

  const scale = 1 + Math.sin(Date.now() * 0.001 * (breathing / 50)) * 0.05;

  return (
    <div
      className="absolute rounded-full transition-transform duration-1000"
      style={{
        left: `${pos.x}%`,
        top: `${pos.y}%`,
        width: `${orb.size}vw`,
        height: `${orb.size}vw`,
        background: `radial-gradient(circle, ${orb.color}88 0%, ${orb.color}44 40%, transparent 70%)`,
        filter: `blur(${orb.blur}px)`,
        transform: `translate(-50%, -50%) scale(${scale})`,
        mixBlendMode: "screen",
      }}
    />
  );
}

export default function OrbExplorer() {
  const [activeScene, setActiveScene] = useState(0);
  const scene = scenes[activeScene];

  return (
    <div className="min-h-screen text-white" style={{ background: scene.bg }}>
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            Orb <span className="text-white/40 font-normal text-lg">Explorer</span>
          </h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {scenes.map((s, i) => (
              <button
                key={s.name}
                onClick={() => setActiveScene(i)}
                className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  activeScene === i
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 hover:bg-white/20 text-white/70"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Scene */}
      <div className="w-full h-screen relative overflow-hidden" style={{ background: scene.bg }}>
        {scene.orbs.map((orb, i) => (
          <AnimatedOrb key={`${activeScene}-${i}`} orb={orb} breathing={30} />
        ))}
        {scene.grain > 0 && <GrainOverlay intensity={scene.grain} />}
      </div>
    </div>
  );
}
