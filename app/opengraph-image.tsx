import { ImageResponse } from 'next/og'

export const alt = 'Zul Luz — Timeless Comfort & Elegance'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: 'center',
          background: 'linear-gradient(135deg, #0F4C4F 0%, #0A3638 55%, #8C3F55 160%)',
          color: '#F9F5F0',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          justifyContent: 'center',
          padding: '80px',
          width: '100%',
        }}
      >
        <div style={{ fontSize: 76, letterSpacing: '18px', lineHeight: 1, textTransform: 'uppercase' }}>ZUL LUZ</div>
        <div style={{ fontSize: 28, letterSpacing: '11px', marginTop: 34, opacity: 0.8, textTransform: 'uppercase' }}>Lingerie & Sleepwear</div>
        <div style={{ background: '#E8C4C4', height: 2, marginTop: 58, width: 140 }} />
        <div style={{ fontSize: 34, marginTop: 42, opacity: 0.92 }}>Timeless comfort & elegance</div>
      </div>
    ),
    size,
  )
}
