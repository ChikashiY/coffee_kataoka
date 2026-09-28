import { Link } from 'react-router-dom'

const legalLinks = [
  { label: 'プライバシーポリシー', to: '/privacy-policy' },
  { label: '利用規約', to: '/terms' },
  { label: '特定商取引法に基づく表記', to: '/tokushoho' },
]

function Footer() {
  return (
    <footer className="border-t border-line px-6 py-10 text-center">
      <p className="font-mincho text-sm tracking-widest">COFFEE KATAOKA</p>
      <nav className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-ink-soft">
        {legalLinks.map(({ label, to }) => (
          <Link key={label} to={to} className="hover:text-ink">
            {label}
          </Link>
        ))}
      </nav>
      <p className="mt-4 text-xs text-ink-soft">© {new Date().getFullYear()} Coffee Kataoka. All Rights Reserved.</p>
    </footer>
  )
}

export default Footer
