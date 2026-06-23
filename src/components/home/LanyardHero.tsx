"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Lanyard = dynamic(() => import("@/components/ui/Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen flex items-center justify-center bg-[#030303]">
      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export function LanyardHero() {
  const pathname = usePathname();

  // Force Lanyard Canvas remount on each client-side navigation back to /
  // R3F Canvas keeps its WebGL context; without a new key the old (stale) context
  // gets reused and renders nothing.
  // eslint-disable-next-line react-hooks/exhaustive-deps -- pathname triggers remount
  const canvasKey = useMemo(() => `lanyard-${Date.now()}`, [pathname]);

  return (
    <section className="relative w-full h-screen bg-[#030303] flex flex-col items-center justify-center overflow-hidden">
      {/* Lanyard 3D canvas — keyed to force remount on navigation */}
      <Lanyard
        key={canvasKey}
        position={[0, 0, 20]}
        gravity={[0, -40, 0]}
      />

      {/* Overlay text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10">
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-indigo-400/50 mb-4">
          &gt; kyle@kspace:~$
        </p>
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white text-center px-4">
          构建<span className="text-indigo-400">.</span>
          思考<span className="text-indigo-400">.</span>
          分享
        </h1>
        <p className="mt-4 text-sm sm:text-base text-white/30 max-w-md text-center px-4">
          拖拽卡片试试 — KSpace 技术空间
        </p>
      </div>

      {/* Gradient fade to next section */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[rgb(var(--color-bg-primary))] to-transparent pointer-events-none" />
    </section>
  );
}
