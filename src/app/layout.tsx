import type { Metadata } from "next";
import { JetBrains_Mono, Space_Grotesk, Archivo } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { StructuredData } from "@/components/shared/StructuredData";
import "@/styles/globals.css";

const fontSans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  preload: false,
});

const fontDisplay = Archivo({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  preload: false,
});

const fontMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kspace.dev"),
  title: {
    default: "KSpace — 思考 · 构建 · 分享",
    template: "%s | KSpace",
  },
  description:
    "一个全栈开发者的个人技术站点。探索技术博客、开源项目与 AI 实验。",
  keywords: ["全栈", "前端", "React", "Next.js", "AI", "LLM", "技术博客"],
  authors: [{ name: "Kyle", url: "https://kspace.dev" }],
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
  manifest: "/manifest.json",
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://kspace.dev",
    siteName: "KSpace",
    title: "KSpace — 思考 · 构建 · 分享",
    description:
      "一个全栈开发者的个人技术站点。探索技术博客、开源项目与 AI 实验。",
  },
  twitter: {
    card: "summary_large_image",
    title: "KSpace",
    description:
      "一个全栈开发者的个人技术站点。探索技术博客、开源项目与 AI 实验。",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        {/* Structured Data for SEO */}
        <StructuredData />
      </head>
      <body
        className={`${fontSans.variable} ${fontDisplay.variable} ${fontMono.variable} font-sans bg-[rgb(var(--color-bg-primary))] text-[rgb(var(--color-text-primary))] min-h-screen flex flex-col`}
      >
        {/* Prevent FOUC */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('theme')
                const d = t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)
                if (d) document.documentElement.classList.add('dark')
              } catch(e) {}
            `,
          }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
