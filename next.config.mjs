/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/',
        destination: '/framer.html',
      },
    ];
  },
};

export default nextConfig;

// Force restart