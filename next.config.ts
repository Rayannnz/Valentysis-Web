import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/services/customer-support",
        destination: "/services/real-customer-support",
        permanent: true,
      },
      {
        source: "/services/social-media-marketing",
        destination: "/services/digital-marketing",
        permanent: true,
      },
    ];
  },
};



export default nextConfig;
