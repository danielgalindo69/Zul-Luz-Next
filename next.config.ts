import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allows an isolated local verification build while `next dev` owns `.next`.
  // Production keeps Next's default output folder unless this variable is set.
  distDir: process.env.NEXT_DIST_DIR || '.next',
};

export default nextConfig;
