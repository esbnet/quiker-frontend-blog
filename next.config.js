/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "github.com",
      },
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        // port: "",
        pathname: "/esbnet/scp/main/public/assets/images/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/esbnet/nlw-spacetime-web/raw/develop/src/assets/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/esbnet/example-saas/blob/main/doc/**",
      },
      {
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/esbnet/synthetic/blob/**",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
        port: "",
        pathname: "/512/2165/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "http",
        hostname: "google.com",
      },
      {
        protocol: "https",
        hostname: "unsplash.com",
      }
    ],
  },
};

module.exports = nextConfig;
