import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import BottomNavbar from "@/components/BottomNavbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Makmur Bersama Gadai Cabang Pasuruan | Gadai Emas, Elektronik, & Kendaraan",
  description:
    "Gadai emas, elektronik, alat rumah tangga, kendaraan, dan alat tukang di Pasuruan. Tanpa potongan biaya admin. PT Makmur Bersama Gadai (PT MBG) berizin & diawasi resmi oleh OJK.",
  keywords:
    "gadai emas Pasuruan, gadai HP Pasuruan, gadai kendaraan Pasuruan, gadai elektronik Pasuruan, gadai alat tukang Pasuruan, gadai alat rumah tangga Pasuruan, PT Makmur Bersama Gadai Pasuruan",
  authors: [{ name: "PT Makmur Bersama Gadai Cabang Pasuruan" }],
  metadataBase: new URL("https://www.mbgpasuruan.co.id"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://www.mbgpasuruan.co.id",
    title: "PT Makmur Bersama Gadai Cabang Pasuruan | Solusi Gadai Berizin OJK",
    description:
      "Layanan pergadaian resmi konvensional di Pasuruan untuk emas, elektronik, alat rumah tangga, kendaraan, dan alat tukang. Tanpa potongan biaya admin.",
    siteName: "PT Makmur Bersama Gadai Cabang Pasuruan",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PT Makmur Bersama Gadai Cabang Pasuruan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PT Makmur Bersama Gadai Cabang Pasuruan",
    description: "Gadai emas, elektronik, alat rumah tangga, kendaraan, dan alat tukang di Pasuruan. Tanpa potongan biaya admin.",
    images: ["/images/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "PT Makmur Bersama Gadai, cabang Pasuruan",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Hasanudin No. 5, Karanganyar, Kec. Panggungrejo",
      "addressLocality": "Pasuruan",
      "addressRegion": "Jawa Timur",
      "postalCode": "67131",
      "addressCountry": "ID"
    },
    "telephone": "+6281213211413",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        "opens": "07:00",
        "closes": "20:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday"],
        "opens": "10:00",
        "closes": "17:00"
      }
    ],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.6437896,
      "longitude": 112.8983213
    }
  };

  return (
    <html lang="id" className={`${inter.className} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* TODO(yoga): samakan dengan Google Business Profile */}
      </head>
      <body className="antialiased min-h-screen bg-white text-slate-950">

        {/* ─── PREMIUM CLIENT SIDE STICKY NAVIGATION BAR ─── */}
        <Navbar />

        {/* ─── PAGE CONTENT ─── */}
        <div className="pb-20 md:pb-0">
          {children}
        </div>

        {/* ─── MOBILE ONLY BOTTOM NAVIGATION BAR ─── */}
        <BottomNavbar />

        {/* ─── GLOBAL FOOTER ─── */}
        <footer className="bg-[#002244] text-[#E2E8F0] py-16 border-t border-slate-800/30">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

              {/* Col 1: Brand & License */}
              <div className="md:col-span-2 space-y-5">
                <div className="flex items-center gap-3">
                  <img
                    src="/images/logo-mbg-white.png"
                    alt="Logo PT MBG"
                    className="h-[60px] w-auto object-contain"
                  />
                </div>
                <p className="text-sm text-slate-400 max-w-md leading-relaxed">
                  Perusahaan pergadaian resmi konvensional berizin dan diawasi langsung oleh Otoritas Jasa Keuangan (OJK). Berkomitmen memberikan solusi keuangan berlandaskan asas kepercayaan, kecepatan, dan legalitas hukum.
                </p>
                <span className="inline-block px-3 py-1.5 rounded-md bg-mbg-navy/50 text-[11px] font-semibold text-mbg-steel border border-mbg-navy">
                  Surat Izin OJK: KEP-42/D.05/2026
                </span>
              </div>

              {/* Col 2: Service Links */}
              <div>
                <h4 className="text-[12px] font-semibold text-white tracking-wider uppercase mb-5">Layanan Agunan</h4>
                <ul className="space-y-3 text-sm">
                  <li><a href="/#kategori" className="hover:text-white transition-colors">Emas & Logam Mulia</a></li>
                  <li><a href="/#kategori" className="hover:text-white transition-colors">Elektronik & Gadget</a></li>
                  <li><a href="/#kategori" className="hover:text-white transition-colors">Alat Rumah Tangga</a></li>
                  <li><a href="/#kategori" className="hover:text-white transition-colors">Kendaraan</a></li>
                  <li><a href="/#kategori" className="hover:text-white transition-colors">Alat Tukang</a></li>
                </ul>
              </div>

              {/* Col 3: Regulation */}
              <div>
                <h4 className="text-[12px] font-semibold text-white tracking-wider uppercase mb-5">Informasi Regulasi</h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  Semua proses gadai dilakukan secara transparan sesuai dengan peraturan yang ditetapkan oleh OJK mengenai pergadaian di Indonesia. Barang disimpan di brankas kantor.
                  {/* TODO(yoga): pulihkan klaim asli jika bukti tersedia (asuransi penuh dan brankas berstandar keamanan tinggi/tahan api) */}
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>&copy; 2026 PT Makmur Bersama Gadai. Hak Cipta Dilindungi.</p>
              <div className="flex gap-6">
                <a href="/kebijakan-privasi" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="/syarat-ketentuan" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
