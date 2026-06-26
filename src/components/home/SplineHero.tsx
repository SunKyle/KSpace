"use client";

import { useEffect, useState, useRef } from "react";
import dynamic from "next/dynamic";

// ── Dynamic import: Spline is a WebGL canvas, cannot SSR ──
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center bg-[rgb(var(--color-bg-primary))]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 rounded-full border-2 border-[rgb(var(--color-accent))] border-t-transparent animate-spin" />
        <span className="text-xs font-mono tracking-widest text-[rgb(var(--color-text-tertiary))] uppercase">
          Loading scene...
        </span>
      </div>
    </div>
  ),
});

// ── Scene URL ──
const SPLINE_SCENE =
  "https://prod.spline.design/AgpOJaK21IzJzgOD/scene.splinecode";

export function SplineHero() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // ── Fade in content after Spline loads ──
  const handleSplineLoad = () => {
    setSplineLoaded(true);
  };

  useEffect(() => {
    if (splineLoaded) {
      // Stagger: let the 3D scene settle, then fade in text
      const t1 = setTimeout(() => setOpacity(0.6), 400);
      const t2 = setTimeout(() => setOpacity(1), 800);
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }
  }, [splineLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Spline 3D Scene — absolute fill, behind everything ── */}
      <div className="absolute inset-0 z-0">
        <Spline
          scene={SPLINE_SCENE}
          onLoad={handleSplineLoad}
        />
      </div>

      {/* ── Radial vignette for depth ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 70% at 50% 50%, transparent 40%, rgb(var(--color-bg-primary) / 0.35) 100%)",
        }}
      />

      {/* ── Hero Overlay Text — floats above the 3D scene ── */}
      <div
        className="relative z-10 flex flex-col items-center text-center px-6 transition-opacity duration-1000 ease-out"
        style={{ opacity }}
      >
        {/* Terminal prompt */}
        <p className="font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[rgb(var(--color-accent))]/60 mb-6">
          &gt; kyle@kspace:~$ <span className="animate-pulse">▊</span>
        </p>

        {/* Headline — spacious, breathing */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-[rgb(var(--color-text-primary))] leading-[1.05]">
          构建<span className="text-[rgb(var(--color-accent))]">.</span>
          思考<span className="text-[rgb(var(--color-accent))]">.</span>
          分享
        </h1>

        {/* Subtitle — restrained */}
        <p className="mt-6 sm:mt-8 text-sm sm:text-base text-[rgb(var(--color-text-secondary))]/70 max-w-sm sm:max-w-md font-normal leading-relaxed tracking-wide">
          AI · Java · FinTech 工程师
          <br />
          <span className="text-[rgb(var(--color-text-tertiary))]/60">
            在 Web 工程与智能系统的交汇处构建
          </span>
        </p>
      </div>

      {/* ── Scroll hint — minimal, at bottom ── */}
      <div
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2 transition-opacity duration-1000 ease-out"
        style={{ opacity: splineLoaded ? 1 : 0 }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-[rgb(var(--color-text-tertiary))]/50">
          scroll
        </span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-[rgb(var(--color-accent))]/30 to-transparent animate-pulse" />
      </div>

      {/* ── Gradient fade to next section ── */}
      <div className="absolute bottom-0 inset-x-0 z-[1] h-40 bg-gradient-to-t from-[rgb(var(--color-bg-primary))] via-[rgb(var(--color-bg-primary))]/60 to-transparent pointer-events-none" />
    </section>
  );
}
