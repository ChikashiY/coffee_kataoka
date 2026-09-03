import { useEffect, useRef, useState } from 'react'

const chapterImages = [
  'https://picsum.photos/seed/kataoka-hero-01/1600/1000',
  'https://picsum.photos/seed/kataoka-hero-02/1600/1000',
]

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      const next = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
      setProgress(next)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const showAbout = progress > 0.5

  return (
    <section ref={sectionRef} className="relative h-[200vh]">
      <div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
        <img
          src={chapterImages[0]}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showAbout ? 'opacity-0' : 'opacity-45'
          }`}
        />
        <img
          src={chapterImages[1]}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            showAbout ? 'opacity-45' : 'opacity-0'
          }`}
        />

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
            progress < 0.4 ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h1 className="font-mincho text-4xl tracking-widest sm:text-6xl">COFFEE KATAOKA</h1>
          <p className="mt-4 text-sm tracking-[0.2em] text-paper/80">Shibuya, Tokyo</p>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
            showAbout ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs tracking-[0.3em] text-paper/80">ABOUT OUR COFFEE &amp; SHOP</p>
          <h2 className="mt-4 font-mincho text-2xl sm:text-3xl">豆と向き合う、静かな時間。</h2>
          <p className="mx-auto mt-6 max-w-xl text-sm leading-loose text-paper/90 sm:text-base">
            片岡珈琲は、一杯のコーヒーがもたらす小さな余白を大切にするロースタリーです。
            生産地の個性を丁寧に引き出す浅煎りから深煎りまで、その日の気分に寄り添う一杯をお届けします。
            忙しい日々の中でも、ふと立ち止まれる時間を。
          </p>
        </div>
      </div>
    </section>
  )
}

export default Hero
