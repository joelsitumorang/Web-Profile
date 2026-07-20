/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["http://192.168.18.31:3000"],
  async rewrites() {
    return [
      {
        // Kondisi 1: Jika user mengakses root /lelang persis (tanpa trailing slash loop)
        source: '/lelang',
        destination: 'https://mbg-lelang-pasuruan.vercel.app/lelang',
      },
      {
        // Kondisi 2: Jika user mengakses halaman di dalamnya (seperti /lelang/katalog, /lelang/dashboard)
        source: '/lelang/:path*',
        destination: 'https://mbg-lelang-pasuruan.vercel.app/lelang/:path*',
      },
    ];
  },
};

module.exports = nextConfig;
