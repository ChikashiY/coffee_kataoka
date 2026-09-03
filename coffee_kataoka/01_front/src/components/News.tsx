import { newsItems } from '../data/news'

function News() {
  return (
    <section id="news" className="scroll-mt-24 bg-stone px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">NEWS</h2>
        <ul className="mt-12 divide-y divide-line border-t border-b border-line">
          {newsItems.map((item) => (
            <li key={item.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="shrink-0 text-sm text-ink-soft">{item.date}</span>
              <span className="text-sm sm:text-base">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default News
