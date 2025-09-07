/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "lh3.googleusercontent.com",
        // port: "",
        // pathname: "/assets/**",
      },
      {
        // protocol: "https",
        hostname: "images.unsplash.com",
        // port: "",
        // pathname: "/assets/**",
      },
      {
        // protocol: "https",
        hostname: "plus.unsplash.com",
        // port: "",
        // pathname: "/assets/**",
      },
    ],
  },
};

export default config;
