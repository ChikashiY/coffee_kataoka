import { useEffect, useRef, useState } from 'react'
import bookImage from '../asset/01_hero/books.jpg'
import breakImage from '../asset/01_hero/break.jpg'
import floorImage from '../asset/01_hero/floor.jpg'
import flowerImage from '../asset/01_hero/flower.jpg'
import heroMainImage from '../asset/01_hero/hero_main.jpg'
import tableChairsImage from '../asset/01_hero/table_chairs.jpg'

const slideshowImages = [breakImage, flowerImage, tableChairsImage, bookImage, floorImage]

const mainImage = heroMainImage

const SLIDE_INTERVAL_MS = 4500
const ZOOM_DURATION_MS = 7000

// スクロール量に応じた3段階の演出の区切り。
// フェーズ1→2（タイトル→メイン画像）は Akito Coffee と同じ 100px で切り替わる。
// フェーズ2→3（メイン画像→About）は、Akito側では「about」が別の独立したセクションとして
// 十分下に配置されているため、マウスホイール1回分の操作では届かない距離になっている。
// それに合わせて、ここも1回分のホイール操作では超えない距離（300px）を確保している。
// About表示後もすぐ次のセクションに進まないよう、表示された状態で留まる区間（AFTER）を追加している。
const PHASE1_THRESHOLD_PX = 100
const PHASE2_THRESHOLD_PX = 300
const AFTER_ABOUT_PX = 400
export const HERO_SCROLL_PX = PHASE2_THRESHOLD_PX + AFTER_ABOUT_PX
export const HERO_PHASE1_END = PHASE1_THRESHOLD_PX / HERO_SCROLL_PX
export const HERO_PHASE2_END = PHASE2_THRESHOLD_PX / HERO_SCROLL_PX

function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [zoomStarted, setZoomStarted] = useState(false)
  const [zoomedIn, setZoomedIn] = useState(() => slideshowImages.map(() => false))

  useEffect(() => {
    const id = setTimeout(() => setZoomStarted(true), 50)
    return () => clearTimeout(id)
  }, [])

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

  // アクティブになったスライドはズームイン状態を記録しておく。
  // フェードアウトが終わるまでは巻き戻さず、消えきってからリセットすることで
  // 切り替わる瞬間に画像が「一瞬拡大して見える」チラつきを防ぐ。
  useEffect(() => {
    if (!zoomStarted) return
    setZoomedIn((prev) => {
      if (prev[slideIndex]) return prev
      const next = [...prev]
      next[slideIndex] = true
      return next
    })

    const prevIndex = (slideIndex - 1 + slideshowImages.length) % slideshowImages.length
    const resetTimer = setTimeout(() => {
      setZoomedIn((prev) => {
        if (!prev[prevIndex]) return prev
        const next = [...prev]
        next[prevIndex] = false
        return next
      })
    }, 1600)
    return () => clearTimeout(resetTimer)
  }, [slideIndex, zoomStarted])

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % slideshowImages.length)
    }, SLIDE_INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  // フェーズ1: タイトル＋スライドショー（ズームあり）
  // フェーズ2: hero_main.jpg固定（ズームなし、フェードのみ）、UIは全部消える
  // フェーズ3: hero_main.jpgのままAboutテキストがフェードイン
  const showTitle = progress < HERO_PHASE1_END
  const showAbout = progress >= HERO_PHASE2_END
  const showMain = progress >= HERO_PHASE1_END

  return (
    <section
      ref={sectionRef}
      id="hero-section"
      className="relative"
      style={{ height: `calc(100vh + ${HERO_SCROLL_PX}px)` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
        {slideshowImages.map((src, i) => {
          const isActive = zoomStarted && showTitle && i === slideIndex
          const scale = isActive || zoomedIn[i] ? 1 : 1.12
          return (
            <img
              key={src}
              src={src}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{
                opacity: isActive ? 0.45 : 0,
                transform: `scale(${scale})`,
                transition: `opacity 1500ms ease-in-out, transform ${ZOOM_DURATION_MS}ms ease-out`,
              }}
            />
          )
        })}
        <img
          src={mainImage}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            opacity: showMain ? 0.45 : 0,
            transition: 'opacity 600ms ease',
          }}
        />

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-[600ms] ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <h1 className="font-mincho text-4xl tracking-widest sm:text-6xl">COFFEE KATAOKA</h1>
          <p className="mt-4 text-sm tracking-[0.2em] text-paper/80">Kurosaki, Niigata</p>
        </div>

        <div
          className={`absolute inset-x-0 bottom-10 flex justify-center transition-opacity duration-[600ms] ease-in-out ${showTitle ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <div className="relative h-36 w-px">
            <span className="w-px bg-white animate-scroll-bar" />
          </div>
        </div>

        <div
          className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-[600ms] ease-in-out ${showAbout ? 'opacity-100' : 'opacity-0'
            }`}
        >
          <p className="text-xl font-bold tracking-[0.3em] text-paper/80">ABOUT OUR COFFEE &amp; SHOP</p>
          <p className="mx-auto mt-6 max-w-3xl text-sm text-left leading-loose text-paper/90">
            COFFEE KATAOKA は、新潟県新潟市黒埼にある
            農機具小屋を改装した自家焙煎のコーヒー屋です。
            この町は、お米や枝豆をはじめ、農業がとても身近にある地域。
            日々の風景の中に、生産者の姿が自然とあります。

            そんな土地に立っていると、コーヒーにとって大切な
            「根っこ（ルーツ）」を思わずにはいられません。
            誰が、どんな環境で育ててくれた豆なのか。
            そして歴史の中で、コーヒーがどんなふうに
            人々の暮らしに寄り添ってきたのか。

            COFFEE KATAOKA は、その“巡り”の一員として、
            ここ黒埼で焙煎した一杯を、
            みなさんの生活にそっと届けたいと思っています。
            その一杯が、あなたの温かい時間につながったら嬉しいです。
          </p>
        </div>
      </div>
    </section >
  )
}

export default Hero
