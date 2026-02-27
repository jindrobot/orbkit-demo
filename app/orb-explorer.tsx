"use client";

import { OrbScene, Orb } from "orbkit";
import { useState } from "react";

const presets = ["ocean", "sunset", "forest", "aurora", "minimal"] as const;

const customScenes = [
  {
    name: "Neon Cyber",
    bg: "#0a0a0f",
    grain: 0.3,
    breathing: 40,
    orbs: [
      { color: "#FF00FF", position: [0.2, 0.3] as [number, number], size: 0.9, blur: 50 },
      { color: "#00FFFF", position: [0.8, 0.6] as [number, number], size: 0.7, blur: 60 },
      { color: "#7B00FF", position: [0.5, 0.8] as [number, number], size: 0.6, blur: 40 },
    ],
  },
  {
    name: "Lava",
    bg: "#1a0500",
    grain: 0.2,
    breathing: 50,
    orbs: [
      { color: "#FF4500", position: [0.3, 0.4] as [number, number], size: 0.85, blur: 45 },
      { color: "#FF6B00", position: [0.7, 0.3] as [number, number], size: 0.7, blur: 55 },
      { color: "#8B0000", position: [0.5, 0.7] as [number, number], size: 0.8, blur: 35 },
    ],
  },
  {
    name: "Deep Space",
    bg: "#020108",
    grain: 0.4,
    breathing: 20,
    orbs: [
      { color: "#1a0533", position: [0.15, 0.2] as [number, number], size: 0.95, blur: 70 },
      { color: "#0D47A1", position: [0.75, 0.5] as [number, number], size: 0.6, blur: 50 },
      { color: "#4A148C", position: [0.4, 0.85] as [number, number], size: 0.75, blur: 60 },
      { color: "#00695C", position: [0.9, 0.15] as [number, number], size: 0.4, blur: 40 },
    ],
  },
];

export default function OrbExplorer() {
  const [activePreset, setActivePreset] = useState<string>("ocean");
  const [activeCustom, setActiveCustom] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold tracking-tight">
            OrbKit <span className="text-white/40 font-normal text-lg">Explorer</span>
          </h1>
          <div className="flex gap-2 mt-3 flex-wrap">
            {presets.map((p) => (
              <button
                key={p}
                onClick={() => { setActivePreset(p); setActiveCustom(null); }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  activePreset === p && activeCustom === null
                    ? "bg-white text-black font-medium"
                    : "bg-white/10 hover:bg-white/20 text-white/70"
                }`}
              >
                {p}
              </button>
            ))}
            <span className="w-px bg-white/20 mx-1" />
            {customScenes.map((s, i) => (
              <button
                key={s.name}
                onClick={() => { setActiveCustom(i); }}
                className={`px-4 py-1.5 rounded-full text-sm transition-all cursor-pointer ${
                  activeCustom === i
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

      {/* Orb Scene */}
      <div className="w-full h-screen relative">
        {activeCustom === null ? (
          <OrbScene key={activePreset} preset={activePreset} style={{ width: "100%", height: "100%" }} />
        ) : (
          <OrbScene
            key={`custom-${activeCustom}`}
            background={customScenes[activeCustom].bg}
            grain={customScenes[activeCustom].grain}
            breathing={customScenes[activeCustom].breathing}
            style={{ width: "100%", height: "100%" }}
          >
            {customScenes[activeCustom].orbs.map((orb, i) => (
              <Orb
                key={i}
                color={orb.color}
                position={orb.position}
                size={orb.size}
                blur={orb.blur}
                drift
                wavy
              />
            ))}
          </OrbScene>
        )}
      </div>
    </div>
  );
}
