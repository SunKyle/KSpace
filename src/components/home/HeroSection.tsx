"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";

export function HeroSection() {
  const screenSize = useScreenSize();

  return (
    <section className="relative w-full min-h-[650px] flex flex-col items-center justify-center overflow-hidden bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-950/60 via-black to-black" />

      {/* Gooey filter definition */}
      <GooeyFilter id="gooey-filter-hero" strength={5} />

      {/* Pixel trail layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-hero)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-brand-400"
        />
      </div>

      {/* Floating orbs for ambient light */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-violet-500/15 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-white">
          KSpace
        </h1>
        <p className="mt-6 text-xl sm:text-2xl leading-relaxed text-white/70 max-w-xl mx-auto">
          思考 · 构建 · 分享
        </p>
        <p className="mt-3 text-base text-white/50">
          一个全栈开发者的个人技术空间，探索技术的边界
        </p>
        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-all duration-200 hover:bg-white/90 hover:scale-105 active:scale-95"
          >
            阅读博客
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-6 py-3 text-sm font-medium text-white transition-all duration-200 hover:border-white/60 hover:bg-white/10 active:scale-95"
          >
            查看项目
          </Link>
        </div>
      </div>
    </section>
  );
}
