"use client";

import dynamic from "next/dynamic";
import { useState } from "react";

const OrbExplorer = dynamic(() => import("./orb-explorer"), { ssr: false });

export default function Home() {
  return <OrbExplorer />;
}
