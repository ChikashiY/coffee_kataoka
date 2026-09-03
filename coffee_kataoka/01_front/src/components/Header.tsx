import { useEffect, useState } from 'react'
import { CartIcon, CloseIcon, MenuIcon, PlusIcon, UserIcon } from './icons'

const navLinks = [
  { label: 'NEWS', href: '#news' },
  { label: 'SUBSCRIPTION', href: '#' },
  { label: 'WHOLESALE&SUPPORT', href: '#' },
  { label: 'ACCESS', href: '#access' },
  { label: 'CONTACT', href: 'mailto:hello@coffee-kataoka.example' },
]

function Header() {
  const [open, setOpen] = useState(false)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const onScroll = () => {
      const show = window.scrollY < 40
      setVisible(show)
      if (!show) setOpen(false)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 text-paper transition-all duration-500 ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
      }`}
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center px-4 py-3 sm:px-6 md:py-5">
        <div className="flex items-center">
          <nav className="hidden items-center gap-6 text-[11px] tracking-widest md:flex">
            {navLinks.map((link) => (
              <a key={link.label} href={link.href} className="transition-colors hover:opacity-70">
                {link.label}
              </a>
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

        <a href="#" aria-label="Coffee Kataoka" className="justify-self-center font-mincho text-xl font-semibold">
          K
        </a>

        <div className="flex items-center justify-end gap-4">
          <a href="#" aria-label="アカウント" className="hidden sm:inline-flex">
            <UserIcon className="h-[18px] w-[18px]" />
          </a>
          <a href="#products" aria-label="カート">
            <CartIcon className="h-[18px] w-[18px]" />
          </a>
          <a
            href="#products"
            className="hidden items-center gap-1.5 border border-paper px-3 py-1.5 text-[11px] tracking-widest transition-colors hover:bg-paper hover:text-ink md:inline-flex"
          >
            ONLINE SHOP
            <PlusIcon className="h-3 w-3" />
          </a>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col bg-paper px-6 py-4 text-sm tracking-widest text-ink-soft md:hidden">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-line py-3 last:border-none"
            >
              {link.label}
            </a>
          ))}
          <a href="#products" onClick={() => setOpen(false)} className="pt-3 font-medium text-ink">
            ONLINE SHOP
          </a>
        </nav>
      )}
    </header>
  )
}

export default Header
