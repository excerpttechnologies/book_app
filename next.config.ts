// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "images.unsplash.com",
//       },
//        {
//         protocol: "https",
//         hostname: "picsum.photos",
//       },

//     ],
//   },
// };

// module.exports = nextConfig;



import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
    ],
    // ✅ Allow images served via /api/uploads route
    unoptimized: true,
  },
};

export default nextConfig;
