import { ImageResponse } from 'next/og';

export const runtime = 'edge';

// Image metadata
export const alt = 'PT Makmur Bersama Gadai Cabang Pasuruan';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#003B73',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: 80,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '40px 80px',
            borderRadius: 24,
            border: '1px solid rgba(255, 255, 255, 0.2)',
          }}
        >
          {/* TODO(yoga): ganti dengan desain og:image yang sebenarnya */}
          <h1 style={{ fontSize: 64, fontWeight: 800, margin: 0, textAlign: 'center', marginBottom: 24 }}>
            PT Makmur Bersama Gadai
          </h1>
          <p style={{ fontSize: 32, margin: 0, opacity: 0.9, textAlign: 'center' }}>
            Cabang Pasuruan
          </p>
          <div style={{ marginTop: 48, padding: '12px 24px', background: 'white', color: '#003B73', borderRadius: 999, fontSize: 24, fontWeight: 'bold' }}>
            Gadai Emas, Elektronik, & Kendaraan
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
