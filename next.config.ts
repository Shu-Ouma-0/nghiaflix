import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'resizing.flixster.com',
      'upload.wikimedia.org',
      'www.davidrevoy.com',
      // Nếu còn ảnh từ các domain khác, thêm vào đây
    ],
  },
};

export default nextConfig;