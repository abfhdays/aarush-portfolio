import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  // Automatically set by the GitHub Actions workflow for project pages (e.g. username.github.io/repo-name).
  // Empty string for user/org pages or custom domains.
  basePath: process.env.PAGES_BASE_PATH ?? "",
  // Expose basePath to components so image srcs can be prefixed manually.
  // Next.js <Image> with unoptimized:true in static export does not auto-prepend basePath.
  env: {
    NEXT_PUBLIC_BASE_PATH: process.env.PAGES_BASE_PATH ?? "",
  },
};

export default nextConfig;
