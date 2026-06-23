"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";

export function HeroSection() {
  const screenSize = useScreenSize();

  return (
    <section className="hero-fade-bottom relative w-full min-h-[650px] flex flex-col items-center justify-center overflow-hidden bg-[#09090B]">
      {/* Deep background with subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.3) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/40 via-transparent to-[rgb(var(--color-bg-primary))]" />

      {/* Gooey filter definition — lower strength for more visible trail */}
      <GooeyFilter id="gooey-filter-hero" strength={4} />

      {/* Pixel trail layer */}
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-hero)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 20 : 28}
          fadeDuration={400}
          delay={300}
          pixelClassName="bg-indigo-400"
        />
      </div>

      {/* Ambient light orbs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Monospace eyebrow */}
        <p className="font-mono text-xs tracking-[0.15em] uppercase text-indigo-400/80 mb-6">
          <span className="text-indigo-400/40">&gt;&nbsp;</span>
          探索 · 构建 · 分享
        </p>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white">
          KSpace
        </h1>

        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/60 max-w-xl mx-auto font-light">
          一个全栈开发者的个人技术空间
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.97]"
          >
            阅读博客
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-6 py-3 text-sm font-medium text-white/70 transition-all duration-200 hover:border-white/40 hover:text-white hover:bg-white/5 active:scale-[0.97]"
          >
            查看项目
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium text-white/40 transition-all duration-200 hover:text-white/70"
          >
            关于我
          </Link>
        </div>
      </div>
    </section>
  );
}
