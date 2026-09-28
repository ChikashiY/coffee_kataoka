import { shops } from '../data/shops'
import { InstagramIcon, LineIcon, NoteIcon, XIcon } from './icons'

const snsIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LINE: LineIcon,
  Note: NoteIcon,
}

function Access() {
  return (
    <section id="access" className="scroll-mt-24 bg-stone px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 sm:grid-cols-2">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-paper">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-mincho text-lg">{shop.name}</h3>
                <dl className="mt-4 space-y-2 text-sm text-ink-soft">
                  <div className="flex gap-3">
                    <dt className="shrink-0">住所</dt>
                    <dd>{shop.address}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="shrink-0">TEL</dt>
                    <dd>{shop.tel}</dd>
                  </div>
                  <div className="flex gap-3">
                    <dt className="shrink-0">営業時間</dt>
                    <dd>
                      {shop.hours}（{shop.closedOn}）
                    </dd>
                  </div>
                </dl>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${shop.name} ${shop.address}`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 border border-ink px-5 py-2 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
                >
                  地図で見る
                </a>
                {shop.sns.length > 0 && (
                  <div className="mt-5 flex gap-3">
                    {shop.sns.map((sns) => {
                      const Icon = snsIcons[sns.label]
                      return (
                        <a
                          key={sns.label}
                          href={sns.href}
                          aria-label={`${shop.name} ${sns.label}`}
                          className="text-ink-soft transition-colors hover:text-ink"
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Access
