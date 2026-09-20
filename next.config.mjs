/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keeps the static shell of a route prerendered even when part of it reads
  // the request (the session slot in the header). See `src/app/layout.tsx`.
  cacheComponents: true,
  experimental: {
    // `@radix-ui/react-icons` ships ~1500 icons in one module and is not in
    // Next's default optimize list, so every import pulls the whole barrel.
    optimizePackageImports: ["@radix-ui/react-icons"],
  },
};

export default nextConfig;
