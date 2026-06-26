"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// ── Dynamic import: Spline is a WebGL canvas, cannot SSR ──
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-6 h-6 rounded-full border-2 border-indigo-400/40 border-t-white/80 animate-spin" />
        <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-white/20">
          Loading scene...
        </span>
      </div>
    </div>
  ),
});

// ── Scene URL ──
const SPLINE_SCENE =
  "https://prod.spline.design/AgpOJaK21IzJzgOD/scene.splinecode";

/* ═══════════════════════════════════════════════════════════════════
   Background Layers (bottom → top)
   1. Aurora Gradient  – animated flowing colour-field
   2. Grid              – barely-there dot grid
   3. Floating Blur     – slow-moving large blurred orbs
   4. Radial Glow       – soft central radiance
   5. Light Bloom       – small intense bloom spots
   6. Noise Texture     – fine film-grain overlay
   ═══════════════════════════════════════════════════════════════════ */

function SplineBackground() {
  // ── Generate stable random-ish values for blur orbs ──
  const orbs = useMemo(
    () => [
      {
        id: 1,
        w: 640,
        h: 640,
        color: "rgb(99 102 241 / 0.18)", // indigo
        cx: 15,
        cy: 20,
        dur: 28,
        delay: 0,
      },
      {
        id: 2,
        w: 480,
        h: 480,
        color: "rgb(56 189 248 / 0.10)", // sky
        cx: 82,
        cy: 72,
        dur: 34,
        delay: -8,
      },
      {
        id: 3,
        w: 520,
        h: 520,
        color: "rgb(167 139 250 / 0.13)", // violet
        cx: 70,
        cy: 15,
        dur: 38,
        delay: -16,
      },
      {
        id: 4,
        w: 360,
        h: 360,
        color: "rgb(45 212 191 / 0.09)", // teal
        cx: 30,
        cy: 75,
        dur: 31,
        delay: -22,
      },
    ],
    []
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {/* ─────────────────────────────────────────────
          1. Aurora Gradient
          Layered radial + conic gradients that
          slowly shift to create a northern-lights feel.
          ───────────────────────────────────────────── */}
      <div className="absolute inset-0">
        {/* Deep base */}
        <div className="absolute inset-0 bg-[#05060f]" />

        {/* Aurora layer 1 — large indigo wash */}
        <div
          className="absolute inset-0 animate-[aurora1_18s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 25% 40%, rgb(79 70 229 / 0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 70% at 70% 55%, rgb(56 189 248 / 0.10) 0%, transparent 55%)",
            willChange: "opacity",
          }}
        />

        {/* Aurora layer 2 — violet + teal sweep */}
        <div
          className="absolute inset-0 animate-[aurora2_22s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 60% 30%, rgb(139 92 246 / 0.18) 0%, transparent 55%), radial-gradient(ellipse 55% 60% at 35% 65%, rgb(20 184 166 / 0.09) 0%, transparent 50%)",
            willChange: "opacity",
          }}
        />

        {/* Aurora layer 3 — warm accent counterpoint */}
        <div
          className="absolute inset-0 animate-[aurora3_25s_ease-in-out_infinite]"
          style={{
            background:
              "radial-gradient(ellipse 40% 50% at 50% 45%, rgb(244 114 182 / 0.06) 0%, transparent 60%)",
            willChange: "opacity",
          }}
        />
      </div>

      {/* ─────────────────────────────────────────────
          2. Dot Grid
          Subtle repeating dot pattern — visible only
          on close inspection, adds texture.
          ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgb(148 163 184 / 0.8) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* ─────────────────────────────────────────────
          3. Floating Blur Orbs
          Large, slow-moving blurred circles that
          create gentle colour shifts across the scene.
          ───────────────────────────────────────────── */}
      {orbs.map((orb) => (
        <div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.w,
            height: orb.h,
            background: orb.color,
            filter: "blur(120px)",
            left: `${orb.cx}%`,
            top: `${orb.cy}%`,
            transform: "translate(-50%, -50%)",
            animation: `floatBlur ${orb.dur}s ease-in-out infinite`,
            animationDelay: `${orb.delay}s`,
            willChange: "transform",
          }}
        />
      ))}

      {/* ─────────────────────────────────────────────
          4. Radial Glow
          Soft central radiance — pulls the eye toward
          the Spline scene in the centre.
          ───────────────────────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 50%, rgb(99 102 241 / 0.12) 0%, transparent 70%)",
        }}
      />

      {/* ─────────────────────────────────────────────
          5. Light Bloom
          Small intense spots with extreme blur —
          like distant light sources bleeding into fog.
          ───────────────────────────────────────────── */}
      {/* Top-right bloom */}
      <div
        className="absolute rounded-full"
        style={{
          width: 320,
          height: 320,
          background: "rgb(129 140 248 / 0.20)",
          filter: "blur(100px)",
          right: "8%",
          top: "12%",
          animation: "bloomPulse 7s ease-in-out infinite",
          willChange: "opacity",
        }}
      />
      {/* Bottom-left bloom */}
      <div
        className="absolute rounded-full"
        style={{
          width: 240,
          height: 240,
          background: "rgb(56 189 248 / 0.14)",
          filter: "blur(90px)",
          left: "10%",
          bottom: "20%",
          animation: "bloomPulse 9s ease-in-out infinite",
          animationDelay: "-3s",
          willChange: "opacity",
        }}
      />

      {/* ─────────────────────────────────────────────
          6. Noise Texture
          SVG filter noise with low opacity —
          fine film grain that ties everything together.
          ───────────────────────────────────────────── */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.035] pointer-events-none">
        <filter id="noise">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.75"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════
   Keyframes — injected via <style> so they're scoped to this module
   ═══════════════════════════════════════════════════════════════════ */

const KEYFRAMES = `
  @keyframes aurora1 {
    0%, 100%   { opacity: 0.7; }
    33%        { opacity: 1; }
    66%        { opacity: 0.55; }
  }
  @keyframes aurora2 {
    0%, 100%   { opacity: 0.45; }
    50%        { opacity: 0.85; }
  }
  @keyframes aurora3 {
    0%, 100%   { opacity: 0.3; }
    40%        { opacity: 0.7; }
    80%        { opacity: 0.25; }
  }
  @keyframes floatBlur {
    0%, 100%   { transform: translate(-50%, -50%) translate(0, 0); }
    25%        { transform: translate(-50%, -50%) translate(4%, -3%); }
    50%        { transform: translate(-50%, -50%) translate(-2%, 5%); }
    75%        { transform: translate(-50%, -50%) translate(-5%, -2%); }
  }
  @keyframes bloomPulse {
    0%, 100%   { opacity: 0.5; }
    50%        { opacity: 1; }
  }
`;

/* ═══════════════════════════════════════════════════════════════════
   SplineHero — public export

   Composition
   ───────────
   Asymmetric layout: text block anchored bottom-left, Spline scene
   fills the upper ~55% of the viewport and bleeds down behind text.

   Typography hierarchy (top → bottom)
   ────────────────────────────────────
   L1  Terminal prompt    10px mono  — label / decoration
   L2  Headline           clamp(3rem,7vw,6.5rem) bold — primary message
   L3  Role line          14px       — who
   L4  Description        13px       — context, max-width constrained
   L5  CTAs               13px       — primary + secondary actions
   L6  Scroll hint        10px mono  — at page bottom (centered)

   Spacing rhythm: 8–12–20–28–36  (roughly Fibonacci-ish)
   ═══════════════════════════════════════════════════════════════════ */

export function SplineHero() {
  const [splineLoaded, setSplineLoaded] = useState(false);
  const [entered, setEntered] = useState(false);

  // ── Fade in content after Spline loads ──
  const handleSplineLoad = () => setSplineLoaded(true);

  useEffect(() => {
    if (splineLoaded) {
      const id = setTimeout(() => setEntered(true), 500);
      return () => clearTimeout(id);
    }
  }, [splineLoaded]);

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Inject keyframes */}
      <style>{KEYFRAMES}</style>

      {/* ═══ Background layers (behind Spline) ═══ */}
      <SplineBackground />

      {/* ═══ Spline 3D Scene — fills upper portion, bleeds down ═══ */}
      <div className="absolute inset-0 z-[1]">
        <Spline scene={SPLINE_SCENE} onLoad={handleSplineLoad} />
      </div>

      {/* ═══ Directional vignette — fades right + top edges harder,
           keeps bottom-left clearer for the text block ═══ */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 55% 40%, transparent 30%, #05060f 95%),
            linear-gradient(to bottom, #05060f 0%, transparent 25%),
            linear-gradient(to right, transparent 55%, #05060f 90%)
          `,
        }}
      />

      {/* ══════════════════════════════════════════════
          Text Block — bottom-left anchored
          ══════════════════════════════════════════════ */}
      <div
        className="absolute bottom-0 left-0 right-0 z-10 pb-12 sm:pb-16 md:pb-20
                   px-6 sm:px-10 md:px-14 lg:px-20
                   transition-all duration-1000 ease-out"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? "translateY(0)" : "translateY(16px)",
        }}
      >
        <div className="max-w-2xl">
          {/* ── L1: Terminal prompt ── */}
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.22em] uppercase text-indigo-300/55 mb-4 sm:mb-5">
            &gt; kyle@kspace:~$ <span className="inline-block w-[1ch] bg-indigo-300/40 animate-pulse" />
          </p>

          {/* ── L2: Headline ── */}
          <h1 className="font-display text-[clamp(2.5rem,7vw,6.5rem)] font-bold tracking-[-0.03em] text-white leading-[0.92]">
            构建<span className="text-indigo-400">.</span>
            思考<span className="text-indigo-400">.</span>
            分享
          </h1>

          {/* ── L3: Role line ── */}
          <p className="mt-5 sm:mt-6 text-sm sm:text-[15px] text-white/50 font-normal tracking-[0.01em]">
            AI &middot; Java &middot; FinTech 工程师
          </p>

          {/* ── L4: Description ── */}
          <p className="mt-3 sm:mt-4 text-sm sm:text-base text-white/55 font-normal leading-relaxed max-w-[360px]">
            在 Web 工程与智能系统的交汇处构建
          </p>

          {/* ── L5: CTAs ── */}
          <div className="mt-8 sm:mt-10 flex items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 rounded-xl bg-white/90 px-5 py-2.5
                         text-sm font-semibold text-[#0a0a14]
                         transition-all duration-300
                         hover:bg-white hover:shadow-[0_0_32px_rgb(99_102_241/0.25)]
                         active:scale-[0.97]"
            >
              查看项目
              <svg
                width="13"
                height="13"
                viewBox="0 0 13 13"
                fill="none"
                className="opacity-40"
              >
                <path
                  d="M1 12L12 1M12 1H3.5M12 1V9.5"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20
                         px-5 py-2.5 text-sm font-medium text-white/55
                         transition-all duration-300
                         hover:border-white/35 hover:text-white/85 hover:bg-white/[0.06]
                         active:scale-[0.97]"
            >
              关于我
            </Link>
          </div>
        </div>
      </div>

      {/* ═══ Scroll hint — centred at bottom, outside text block ═══ */}
      <div
        className="absolute bottom-8 right-8 z-10 flex flex-col items-center gap-2
                   transition-all duration-1000 ease-out"
        style={{
          opacity: entered ? 0.35 : 0,
          transitionDelay: entered ? "600ms" : "0ms",
        }}
      >
        <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-white/30">
          scroll
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-white/20 to-transparent" />
      </div>

      {/* ═══ Gradient fade to next section ═══ */}
      <div className="absolute bottom-0 inset-x-0 z-[1] h-32 bg-gradient-to-t from-[rgb(var(--color-bg-primary))] via-[rgb(var(--color-bg-primary))]/50 to-transparent pointer-events-none" />
    </section>
  );
}
