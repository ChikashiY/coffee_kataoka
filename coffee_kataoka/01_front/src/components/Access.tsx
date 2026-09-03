import { shops } from '../data/shops'
import { InstagramIcon, LineIcon, XIcon } from './icons'

const snsIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LINE: LineIcon,
}

function Access() {
  return (
    <section id="access" className="scroll-mt-24 bg-stone px-6 py-24">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">ACCESS</h2>
        <div className="mt-12 grid gap-10 sm:grid-cols-2">
          {shops.map((shop) => (
            <div key={shop.id} className="bg-paper">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={shop.image} alt={shop.name} className="h-full w-full object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-mincho text-lg">{shop.name}</h3>
                <p className="mt-3 text-sm text-ink-soft">{shop.address}</p>
                <p className="mt-1 text-sm text-ink-soft">
                  {shop.hours}（{shop.closedOn}）
                </p>
                <div className="mt-4 flex gap-3">
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Access
