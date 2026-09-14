'use client'

import { useState } from 'react'
import Link from 'next/link'

const BRA_SIZES = [
  { size: 'XS', band: '28–30"', bust: '30–32"', cup: 'A/B', weight: '< 50 kg' },
  { size: 'S', band: '30–32"', bust: '33–35"', cup: 'B/C', weight: '50–58 kg' },
  { size: 'M', band: '32–34"', bust: '35–37"', cup: 'C/D', weight: '58–66 kg' },
  { size: 'L', band: '34–36"', bust: '37–39"', cup: 'D/DD', weight: '66–75 kg' },
  { size: 'XL', band: '36–38"', bust: '39–41"', cup: 'DD/E', weight: '75–85 kg' },
]

const PANTY_SIZES = [
  { size: 'XS', waist: '24–26"', hips: '34–36"', weight: '< 50 kg' },
  { size: 'S', waist: '26–28"', hips: '36–38"', weight: '50–58 kg' },
  { size: 'M', waist: '28–31"', hips: '38–41"', weight: '58–66 kg' },
  { size: 'L', waist: '31–34"', hips: '41–44"', weight: '66–75 kg' },
  { size: 'XL', waist: '34–37"', hips: '44–47"', weight: '75–85 kg' },
]

const SLEEPWEAR_SIZES = [
  { size: 'XS', chest: '30–32"', waist: '24–26"', hips: '34–36"', height: '5\'2"–5\'4"' },
  { size: 'S', chest: '33–35"', waist: '26–28"', hips: '36–38"', height: '5\'3"–5\'6"' },
  { size: 'M', chest: '35–37"', waist: '28–31"', hips: '38–41"', height: '5\'4"–5\'7"' },
  { size: 'L', chest: '37–39"', waist: '31–34"', hips: '41–44"', height: '5\'5"–5\'8"' },
  { size: 'XL', chest: '39–42"', waist: '34–37"', hips: '44–47"', height: '5\'6"–5\'9"' },
]

type Tab = 'bras' | 'panties' | 'sleepwear'

export default function SizeGuide() {
  const [activeTab, setActiveTab] = useState<Tab>('bras')

  return (
    <div className="min-h-[80vh] bg-cream">
      {/* Header */}
      <div className="relative overflow-hidden bg-blush" style={{ height: 'clamp(220px, 30vw, 360px)' }}>
        <img
          src="https://images.unsplash.com/photo-1606245455176-a30c1c36a6ad?w=1400&h=400&fit=crop&auto=format"
          alt="Size guide"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-dark/45" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-5">
          <p className="text-[10px] tracking-[0.22em] uppercase text-cream/70 mb-3 font-medium">Zul Luz</p>
          <h1 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-light text-cream">Size Guide</h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-5 lg:px-10 py-12 lg:py-20">

        {/* Intro */}
        <div className="text-center mb-12">
          <p className="text-xs text-muted leading-[1.9] max-w-2xl mx-auto">
            Our sizing is designed for the best possible fit. We recommend measuring yourself before ordering. If you&apos;re between sizes, we generally suggest sizing up for a more relaxed fit, or sizing down for a closer, more supportive feel.
          </p>
        </div>

        {/* How to measure */}
        <div className="bg-blush-light border border-border p-7 lg:p-9 mb-12">
          <h2 className="font-display text-xl font-light text-dark mb-6">How to Measure Yourself</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: 'Bust / Chest', instruction: 'Measure around the fullest part of your chest, keeping the tape parallel to the floor. Breathe normally — don\'t pull the tape too tight.' },
              { label: 'Waist', instruction: 'Measure around the narrowest part of your natural waist, usually 1–2 inches above your belly button.' },
              { label: 'Hips', instruction: 'Stand with your feet together and measure around the fullest part of your hips, about 7–8 inches below your natural waist.' },
              { label: 'Band Size (Bra)', instruction: 'Measure firmly around your ribcage, directly under your bust. Round up to the nearest even number for your band size.' },
              { label: 'Cup Size (Bra)', instruction: 'Measure loosely around the fullest part of your bust. The difference between this and your band measurement gives your cup size.' },
              { label: 'Height', instruction: 'Stand straight against a wall without shoes. Mark the highest point of your head and measure from floor to mark.' },
            ].map((m, i) => (
              <div key={i}>
                <h3 className="text-[10px] tracking-[0.14em] uppercase text-dark font-medium mb-2">{m.label}</h3>
                <p className="text-[11px] text-muted leading-[1.8]">{m.instruction}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Size table tabs */}
        <div className="mb-8">
          <div className="flex items-center gap-0 border-b border-border">
            {([
              { key: 'bras', label: 'Bras' },
              { key: 'panties', label: 'Panties & Sets' },
              { key: 'sleepwear', label: 'Sleepwear' },
            ] as const).map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`px-6 py-3 text-[10px] tracking-[0.14em] uppercase font-medium border-b-2 transition-all duration-200 ${activeTab === tab.key ? 'border-wine text-wine' : 'border-transparent text-muted hover:text-dark'}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Size tables */}
        <div className="overflow-x-auto mb-12">
          {activeTab === 'bras' && (
            <table className="w-full min-w-[500px]">
              <thead>
                <tr className="border-b border-border">
                  {['Size', 'Band', 'Bust', 'Cup', 'Approx. Weight'].map(h => (
                    <th key={h} className="text-left py-3 pr-6 text-[9px] tracking-[0.15em] uppercase text-muted font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {BRA_SIZES.map(row => (
                  <tr key={row.size} className="border-b border-border/40 hover:bg-blush-light transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-xs text-dark">{row.size}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.band}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.bust}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.cup}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'panties' && (
            <table className="w-full min-w-[440px]">
              <thead>
                <tr className="border-b border-border">
                  {['Size', 'Waist', 'Hips', 'Approx. Weight'].map(h => (
                    <th key={h} className="text-left py-3 pr-6 text-[9px] tracking-[0.15em] uppercase text-muted font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {PANTY_SIZES.map(row => (
                  <tr key={row.size} className="border-b border-border/40 hover:bg-blush-light transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-xs text-dark">{row.size}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.waist}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.hips}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.weight}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          {activeTab === 'sleepwear' && (
            <table className="w-full min-w-[520px]">
              <thead>
                <tr className="border-b border-border">
                  {['Size', 'Chest', 'Waist', 'Hips', 'Height'].map(h => (
                    <th key={h} className="text-left py-3 pr-6 text-[9px] tracking-[0.15em] uppercase text-muted font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SLEEPWEAR_SIZES.map(row => (
                  <tr key={row.size} className="border-b border-border/40 hover:bg-blush-light transition-colors">
                    <td className="py-3.5 pr-6 font-medium text-xs text-dark">{row.size}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.chest}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.waist}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.hips}</td>
                    <td className="py-3.5 pr-6 text-xs text-muted">{row.height}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Tips */}
        <div className="border-t border-border pt-10">
          <h2 className="font-display text-xl font-light text-dark mb-6">Fit Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              { tip: 'Between sizes?', detail: 'For bras and panties, size up if you prefer a relaxed fit or are fuller through the hips. Size down for a closer, more secure fit.' },
              { tip: 'Unsure about your bra cup?', detail: 'Start with our size chart measurement guide. Most women find they\'re wearing the wrong cup size — a difference of even 1" changes the cup by one letter.' },
              { tip: 'Sleepwear fit preference', detail: 'Our sleepwear is designed with ease in mind. If you prefer a more relaxed, oversized look, size up. The fit is intentionally generous.' },
              { tip: 'Still unsure?', detail: 'Email us at hello@zulluz.shop — our team is happy to help you find your perfect size. We respond within 24 hours.' },
            ].map((t, i) => (
              <div key={i} className="flex gap-4 p-5 bg-blush-light">
                <span className="text-wine font-display text-lg flex-shrink-0 mt-0.5">✦</span>
                <div>
                  <p className="text-xs font-medium text-dark mb-1.5">{t.tip}</p>
                  <p className="text-[11px] text-muted leading-[1.8]">{t.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-14">
          <p className="text-xs text-muted mb-6">Ready to find your perfect fit?</p>
          <Link href="/lingerie" className="inline-block bg-wine text-cream text-[10px] tracking-[0.18em] uppercase px-10 py-4 hover:bg-dark transition-colors duration-300 font-medium">
            Shop Lingerie
          </Link>
        </div>
      </div>
    </div>
  )
}
