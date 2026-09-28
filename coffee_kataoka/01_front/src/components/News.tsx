import { Link } from 'react-router-dom'
import { newsItems } from '../data/news'

interface NewsProps {
  limit?: number
}

function News({ limit }: NewsProps) {
  const items = limit ? newsItems.slice(0, limit) : newsItems

  return (
    <section id="news" className="scroll-mt-24 bg-stone px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">NEWS</h2>
        <ul className="mt-12 divide-y divide-line border-t border-b border-line">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="shrink-0 text-sm text-ink-soft">{item.date}</span>
              <span className="text-sm sm:text-base">{item.title}</span>
            </li>
          ))}
        </ul>
        {limit && limit < newsItems.length && (
          <div className="mt-10 text-center">
            <Link
              to="/news"
              className="inline-flex items-center gap-2 border border-ink px-6 py-2.5 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
            >
              MORE NEWS
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default News
