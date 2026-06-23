"use client";

import Link from "next/link";
import { ArrowRight, Terminal } from "lucide-react";
import { useScreenSize } from "@/hooks/use-screen-size";
import { PixelTrail } from "@/components/ui/pixel-trail";
import { GooeyFilter } from "@/components/ui/gooey-filter";

export function HeroSection() {
  const screenSize = useScreenSize();

  return (
    <section className="relative w-full min-h-[700px] flex flex-col items-center justify-center overflow-hidden bg-[#050508]">
      {/* Deep grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(99 102 241 / 0.5) 1px, transparent 1px), linear-gradient(90deg, rgb(99 102 241 / 0.5) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Gradient depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 via-transparent to-[rgb(var(--color-bg-primary))] pointer-events-none" />

      {/* Gooey pixel trail */}
      <GooeyFilter id="hero-goo" strength={3} />
      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#hero-goo)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan("md") ? 20 : 28}
          fadeDuration={300}
          delay={200}
          pixelClassName="bg-indigo-400"
        />
      </div>

      {/* Ambient orbs */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-indigo-600/15 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-violet-600/8 rounded-full blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
        {/* Terminal eyebrow */}
        <div className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.2em] uppercase text-indigo-400/60 mb-8">
          <Terminal size={13} />
          <span className="text-indigo-400/30">kyle@kspace</span>
          <span className="text-indigo-400/40">:~$</span>
          <span className="inline-block w-2 h-4 bg-indigo-400/60 animate-pulse ml-0.5" />
        </div>

        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight text-white">
          构建<span className="text-indigo-400">.</span>
          思考<span className="text-indigo-400">.</span>
          分享
        </h1>

        <p className="mt-6 text-lg sm:text-xl leading-relaxed text-white/50 max-w-xl mx-auto font-light">
          KSpace — 一个全栈开发者的技术空间。
          <br />
          在 Web 与 AI 的交汇处构建产品。
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-indigo-400 hover:shadow-lg hover:shadow-indigo-500/30 active:scale-[0.97]"
          >
            阅读文章
            <ArrowRight size={16} />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-white/60 transition-all duration-200 hover:border-white/30 hover:text-white hover:bg-white/5 active:scale-[0.97]"
          >
            查看项目
          </Link>
        </div>

        {/* Stats row */}
        <div className="mt-16 flex items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-white tabular-nums">3</p>
            <p className="text-xs text-white/30 mt-1">技术文章</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-white tabular-nums">4</p>
            <p className="text-xs text-white/30 mt-1">开源项目</p>
          </div>
          <div className="w-px h-8 bg-white/10" />
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-400 tabular-nums">∞</p>
            <p className="text-xs text-white/30 mt-1">探索边界</p>
          </div>
        </div>
      </div>
    </section>
  );
}
