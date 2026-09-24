export type Agunan = {
  id: 'emas' | 'elektronik' | 'alat-rumah-tangga' | 'kendaraan' | 'alat-tukang';
  label: string;
  tenor: string;
  syarat: string[];
  image: string;
  imageAlt: string;
  contoh: { name: string, image: string }[];
};

export const agunanList: Agunan[] = [
  {
    id: 'emas',
    label: 'Emas & Logam Mulia',
    tenor: 's.d. 4 bulan',
    syarat: ['KTP asli', 'Emas / Logam Mulia', 'Surat pembelian (opsional, jika ada)'],
    image: '/images/agunan-emas.jpg',
    imageAlt: 'Gadai Emas dan Logam Mulia di PT MBG Pasuruan',
    contoh: [
      { name: 'Cincin Emas', image: '/images/barang/cincin.png' },
      { name: 'Gelang Emas', image: '/images/barang/gelang.png' },
      { name: 'Kalung Emas', image: '/images/barang/kalung.png' },
      { name: 'Anting Emas', image: '/images/barang/anting.png' },
      { name: 'Liontin Emas', image: '/images/barang/liontin.png' }
    ],
  },
  {
    id: 'elektronik',
    label: 'Elektronik & Gadget',
    tenor: 's.d. 1 bulan',
    syarat: ['KTP asli', 'Barang elektronik/gadget', 'Kondisi baik & normal', 'Akun iCloud/Google wajib logout', 'Kelengkapan (charger, dus) opsional tapi mempengaruhi nilai'],
    image: '/images/agunan-gadget.jpg',
    imageAlt: 'Gadai Elektronik dan Gadget di PT MBG Pasuruan',
    contoh: [
      { name: 'HP', image: '/images/barang/hp.png' },
      { name: 'Laptop', image: '/images/barang/laptop.png' },
      { name: 'Kamera', image: '/images/barang/kamera.png' },
      { name: 'TV', image: '/images/barang/tv.png' }
    ],
  },
  {
    id: 'alat-rumah-tangga',
    label: 'Alat Rumah Tangga',
    tenor: 's.d. 4 bulan',
    syarat: ['KTP asli', 'Barang alat rumah tangga', 'Kondisi baik & normal'],
    image: '/images/placeholder-rumah-tangga.jpg', // TODO(yoga): sediakan aset foto asli untuk alat rumah tangga
    imageAlt: 'Gadai Alat Rumah Tangga di PT MBG Pasuruan',
    contoh: [
      { name: 'Kulkas', image: '/images/barang/kulkas.png' },
      { name: 'Blender', image: '/images/barang/blender.png' },
      { name: 'Rice Cooker', image: '/images/barang/rice-cooker.png' },
      { name: 'Dispenser', image: '/images/barang/dispenser.jpg' },
      { name: 'Kipas Angin', image: '/images/barang/kipas-angin.jpg' },
      { name: 'Microwave', image: '/images/barang/microwave.jpg' }
    ],
  },
  {
    id: 'kendaraan',
    label: 'Kendaraan',
    tenor: 's.d. 2 bulan',
    syarat: ['KTP asli', 'Kendaraan bermotor', 'STNK asli', 'BPKB asli'],
    image: '/images/agunan-kendaraan.jpg',
    imageAlt: 'Gadai Kendaraan di PT MBG Pasuruan',
    contoh: [
      { name: 'Sepeda Motor', image: '/images/barang/sepeda-motor.jpg' },
      { name: 'Mobil', image: '/images/barang/mobil.jpg' }
    ],
  },
  {
    id: 'alat-tukang',
    label: 'Alat Tukang',
    tenor: 's.d. 4 bulan',
    syarat: ['KTP asli', 'Barang alat tukang/mesin', 'Kondisi baik & berfungsi normal'],
    image: '/images/agunan-perkakas.jpg',
    imageAlt: 'Gadai Alat Tukang dan Perkakas di PT MBG Pasuruan',
    contoh: [
      { name: 'Mesin Bor', image: '/images/barang/mesin-bor.jpg' },
      { name: 'Gerinda', image: '/images/barang/gerinda.jpg' },
      { name: 'Mesin Las', image: '/images/barang/mesin-las.jpg' },
      { name: 'Genset', image: '/images/barang/genset.jpg' },
      { name: 'Mesin Ketam', image: '/images/barang/mesin-ketam.jpg' }
    ],
  },
];

export const biaya = {
  sewaModal: [
    { rentang: '1–15 hari', persen: 5 },
    { rentang: '16–30 hari', persen: 10 },
  ],
  biayaAdmin: 0,
  contohPinjaman: 1_000_000,
};

export const faqData = [
  {
    q: "Dokumen apa yang harus dibawa?",
    a: "Cukup bawa KTP asli yang masih berlaku dan barang yang ingin digadaikan beserta kelengkapannya. Pastikan nama pemilik barang agunan sesuai dengan nama pada KTP."
  },
  {
    q: "Apakah ada biaya admin?",
    a: "Tidak ada. Kami melayani gadai tanpa potongan biaya admin."
  },
  {
    q: "Berapa sewa modalnya?",
    a: "Sewa modal dikenakan sebesar 5% untuk jangka waktu 1–15 hari, dan 10% untuk 16–30 hari."
  },
  {
    q: "Berapa lama tenor atau jangka waktu pinjaman?",
    a: "Tergantung kategori barang. Emas s.d. 4 bulan, Alat Rumah Tangga s.d. 4 bulan, Alat Tukang s.d. 4 bulan, Kendaraan s.d. 2 bulan, dan Elektronik s.d. 1 bulan."
  },
  {
    q: "Apa syarat khusus untuk gadai HP atau Laptop?",
    a: "Pastikan barang dalam kondisi normal. Selain itu, akun iCloud (untuk perangkat Apple) atau akun Google wajib di-logout sebelum diserahkan."
  },
  {
    q: "Kapan jam buka kantor cabang Pasuruan?",
    a: "Kami buka hari Senin–Sabtu pukul 07:00–20:00 WIB, dan hari Minggu pukul 10:00–17:00 WIB."
  }
];
