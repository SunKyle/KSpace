import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  webpack: (config) => {
    // Handle GLB/GLTF 3D model files
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });
    // @splinetool/react-spline exports ESM-only without a "default"
    // fallback condition. Standard webpack conditionNames include
    // "require" first on the server build, which rejects the module.
    // Reorder so "import" takes priority.
    config.resolve.conditionNames = [
      "import",
      "module",
      "browser",
      "default",
      "require",
    ];
    return config;
  },
  // Allow importing GLB files
  transpilePackages: ["three"],
};

export default nextConfig;
