import { ImageResponse } from 'next/og';

export const alt = 'Daniyal Zia — Software & Infrastructure';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(60% 70% at 50% 45%, rgba(185,28,28,0.45), #000 70%)',
          color: '#f5f5f7',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 132, fontWeight: 700, letterSpacing: '-0.05em', lineHeight: 1 }}>Daniyal Zia.</div>
        <div style={{ marginTop: 28, fontSize: 40, color: '#a1a1a6', display: 'flex' }}>
          One builder.&nbsp;<span style={{ color: '#ff6b5b' }}>Multiple systems.</span>
        </div>
        <div style={{ position: 'absolute', bottom: 48, fontSize: 24, color: '#6e6e73' }}>daniyalzia.co.uk</div>
      </div>
    ),
    size
  );
}
