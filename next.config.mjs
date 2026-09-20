/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keeps the static shell of a route prerendered even when part of it reads
  // the request (the session slot in the header). See `src/app/layout.tsx`.
  cacheComponents: true,
};

export default nextConfig;
