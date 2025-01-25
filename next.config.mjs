/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["utfs.io", "img.clerk.com", "www.gravatar.com"],
  },
};
export default nextConfig;
