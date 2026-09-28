import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { HERO_PHASE1_END } from './Hero'
import { CartIcon, CloseIcon, InstagramIcon, MenuIcon, NoteIcon, PlusIcon, UserIcon } from './icons'
import { useCart } from '../context/CartContext'

const navLinks = [
  { label: 'NEWS', href: '/news' },
  { label: 'ACCESS', href: '/access' },
  { label: 'CONTACT', href: '/contact' },
]

const snsLinks = [
  { label: 'Instagram', href: 'https://www.instagram.com/coffee_kataoka/', Icon: InstagramIcon },
  { label: 'note', href: 'https://note.com/imtatsuki', Icon: NoteIcon },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [overlay, setOverlay] = useState(false)
  const [hidden, setHidden] = useState(false)
  const lastScrollY = useRef(0)
  const location = useLocation()
  const isHome = location.pathname === '/'
  const { totalCount } = useCart()

  useEffect(() => {
    lastScrollY.current = window.scrollY

    const onScroll = () => {
      const y = window.scrollY
      let inHero = false
      if (isHome) {
        const el = document.getElementById('hero-section')
        if (el) {
          const rect = el.getBoundingClientRect()
          const scrollable = rect.height - window.innerHeight
          const progress = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
          inHero = progress < HERO_PHASE1_END
        }
      }

      setOverlay(inHero)
      if (inHero) {
        setHidden(false)
      } else {
        const diff = y - lastScrollY.current
        if (diff > 4) setHidden(true)
        else if (diff < -4 || y < 10) setHidden(false)
      }
      lastScrollY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [isHome])

  // メニュー開閉中にページ遷移した場合や、ヘッダーが隠れた場合は、
  // レンダー中に状態を合わせてメニューを閉じる。
  const closeKey = `${location.pathname}|${hidden}`
  const [prevCloseKey, setPrevCloseKey] = useState(closeKey)
  if (closeKey !== prevCloseKey) {
    setPrevCloseKey(closeKey)
    setOpen(false)
  }

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-in-out ${
        hidden ? 'pointer-events-none -translate-y-full' : 'translate-y-0'
      } ${overlay ? 'text-paper' : 'border-b border-line bg-paper text-ink'}`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 md:py-5">
        <div className="flex items-center">
          <nav className="hidden items-center gap-6 text-[11px] tracking-widest md:flex">
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href} className="group relative py-1">
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100 ${
                    overlay ? 'bg-paper' : 'bg-ink'
                  }`}
                />
              </Link>
            ))}
          </nav>
          <button
            type="button"
            aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden"
          >
            {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </button>
        </div>

        <Link to="/" aria-label="Coffee Kataoka" className="justify-self-center font-mincho text-5xl font-bold">
          K
        </Link>

        <div className="flex items-center justify-end gap-4">
          {snsLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="hidden transition-opacity hover:opacity-70 sm:inline-flex"
            >
              <Icon className="h-5 w-5" />
            </a>
          ))}
          <Link
            to="/mypage"
            aria-label="マイページ"
            className="hidden transition-opacity hover:opacity-70 sm:inline-flex"
          >
            <UserIcon className="h-5 w-5" />
          </Link>
          <Link to="/cart" aria-label="カート" className="relative inline-flex transition-opacity hover:opacity-70">
            <CartIcon className="h-5 w-5" />
            {totalCount > 0 && (
              <span
                className={`absolute -right-2 -top-2 inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
                  overlay ? 'bg-paper text-ink' : 'bg-ink text-paper'
                }`}
              >
                {totalCount}
              </span>
            )}
          </Link>
          <Link
            to="/onlineshop"
            className={`hidden items-center gap-1.5 border px-3 py-1.5 text-[11px] tracking-widest transition-colors md:inline-flex ${
              overlay ? 'border-paper hover:bg-paper hover:text-ink' : 'border-ink hover:bg-ink hover:text-paper'
            }`}
          >
            ONLINE SHOP
            <PlusIcon className="h-3 w-3" />
          </Link>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col bg-paper px-6 py-4 text-sm tracking-widest text-ink-soft md:hidden">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 last:border-none"
            >
              {link.label}
            </Link>
          ))}
          <Link to="/onlineshop" onClick={() => setOpen(false)} className="pt-3 font-medium text-ink">
            ONLINE SHOP
          </Link>
          <Link to="/mypage" onClick={() => setOpen(false)} className="pt-3 font-medium text-ink">
            MY PAGE
          </Link>
          <div className="mt-4 flex gap-4 border-t border-line pt-4">
            {snsLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

export default Header
