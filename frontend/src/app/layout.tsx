import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "PT Makmur Bersama Gadai | Solusi Gadai Konvensional Aman & Berizin OJK",
  description:
    "PT Makmur Bersama Gadai (PT MBG) menyediakan solusi likuiditas tepercaya dengan taksiran tinggi untuk emas, gadget, elektronik, dan alat pertukangan. Berizin & diawasi resmi oleh OJK.",
  keywords:
    "gadai emas, gadai hp surabaya, gadai laptop malang, gadai alat pertukangan, pergadaian berizin ojk, PT Makmur Bersama Gadai, gadai jawa timur",
  authors: [{ name: "PT Makmur Bersama Gadai" }],
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://makmurbersamagadai.co.id",
    title: "PT Makmur Bersama Gadai | Solusi Gadai Konvensional Aman & Berizin OJK",
    description:
      "Layanan pergadaian resmi konvensional di Jawa Timur dengan taksiran nilai barang maksimal dan amanah.",
    siteName: "PT Makmur Bersama Gadai",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.className} scroll-smooth`}>
      <body className="antialiased min-h-screen bg-white text-slate-950">

        {/* ─── PREMIUM CLIENT SIDE STICKY NAVIGATION BAR ─── */}
        <Navbar />

        {/* ─── PAGE CONTENT ─── */}
        {children}

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
                  <li><a href="#kategori" className="hover:text-white transition-colors">Emas & Logam Mulia</a></li>
                  <li><a href="#kategori" className="hover:text-white transition-colors">Gadget & HP</a></li>
                  <li><a href="#kategori" className="hover:text-white transition-colors">Laptop & Elektronik</a></li>
                  <li><a href="#kategori" className="hover:text-white transition-colors">Alat Pertukangan Mesin</a></li>
                </ul>
              </div>

              {/* Col 3: Regulation */}
              <div>
                <h4 className="text-[12px] font-semibold text-white tracking-wider uppercase mb-5">Informasi Regulasi</h4>
                <p className="text-xs leading-relaxed text-slate-500">
                  Semua proses gadai dilakukan secara transparan sesuai dengan peraturan yang ditetapkan oleh OJK mengenai pergadaian di Indonesia. Agunan Anda diasuransikan penuh dan disimpan dalam brankas berstandar keamanan tinggi.
                </p>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="mt-14 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
              <p>&copy; 2026 PT Makmur Bersama Gadai. Hak Cipta Dilindungi.</p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                <a href="#" className="hover:text-white transition-colors">Syarat & Ketentuan</a>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
