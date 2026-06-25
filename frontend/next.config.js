/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/lelang/:path*',
        destination: 'https://mbg-lelang-pasuruan.vercel.app/lelang/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
