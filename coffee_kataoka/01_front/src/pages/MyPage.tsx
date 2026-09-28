import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { orders } from '../data/orders'
import { products } from '../data/products'
import { HeartIcon } from '../components/icons'

const tabs = [
  { id: 'orders', label: '注文履歴' },
  { id: 'favorites', label: 'お気に入り' },
  { id: 'profile', label: '会員情報' },
] as const

type TabId = (typeof tabs)[number]['id']

const mockUser = {
  name: '片岡 太郎',
  email: 'taro.kataoka@example.com',
  memberSince: '2024.03',
  rank: 'GOLD MEMBER',
  points: 1280,
}

const favoriteIds = ['ethiopia', 'gift-box', 'drip-bag-set']

function MyPage() {
  const [tab, setTab] = useState<TabId>('orders')
  const favorites = products.filter((product) => favoriteIds.includes(product.id))

  return (
    <>
      <PageBanner title="MY PAGE" description="ご注文状況の確認や会員情報の変更はこちらから。" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <div className="flex flex-col items-center gap-2 border border-line bg-stone px-6 py-8 text-center">
            <p className="text-[11px] tracking-widest text-ink-soft">{mockUser.rank}</p>
            <p className="font-mincho text-xl">{mockUser.name} 様</p>
            <p className="text-sm text-ink-soft">{mockUser.email}</p>
            <p className="mt-2 text-sm">
              保有ポイント <span className="font-medium">{mockUser.points.toLocaleString('ja-JP')}pt</span>
            </p>
          </div>

          <nav className="mt-10 flex justify-center gap-8 border-b border-line text-[11px] tracking-widest">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`-mb-px border-b-2 px-1 py-4 transition-colors ${
                  tab === t.id ? 'border-ink text-ink' : 'border-transparent text-ink-soft hover:text-ink'
                }`}
              >
                {t.label}
              </button>
            ))}
          </nav>

          <div className="mt-10">
            {tab === 'orders' && (
              <ul className="divide-y divide-line border-y border-line">
                {orders.map((order) => (
                  <li key={order.id} className="py-6">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-ink-soft">{order.date}</span>
                        <span className="text-sm">{order.id}</span>
                      </div>
                      <span
                        className={`px-3 py-1 text-[10px] tracking-widest ${
                          order.status === '発送済み'
                            ? 'bg-ink text-paper'
                            : order.status === '準備中'
                              ? 'border border-ink text-ink'
                              : 'border border-line text-ink-soft'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <ul className="mt-4 space-y-1 text-sm text-ink-soft">
                      {order.items.map((item) => (
                        <li key={item.name}>
                          {item.name} × {item.quantity}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-3 text-sm">
                      合計 <span className="font-medium">¥{order.total.toLocaleString('ja-JP')}</span>
                    </p>
                  </li>
                ))}
              </ul>
            )}

            {tab === 'favorites' && (
              <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3">
                {favorites.map((product) => (
                  <div key={product.id} className="group">
                    <div className="relative aspect-square overflow-hidden bg-stone">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute right-3 top-3 text-ink">
                        <HeartIcon className="h-4 w-4" />
                      </span>
                    </div>
                    <p className="mt-4 text-sm">{product.name}</p>
                    <p className="mt-1 text-sm text-ink-soft">¥{product.price.toLocaleString('ja-JP')}（税込）</p>
                  </div>
                ))}
              </div>
            )}

            {tab === 'profile' && (
              <form className="mx-auto max-w-md space-y-6">
                <div>
                  <label htmlFor="profile-name" className="block text-xs tracking-widest text-ink-soft">
                    お名前
                  </label>
                  <input
                    id="profile-name"
                    type="text"
                    defaultValue={mockUser.name}
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="profile-email" className="block text-xs tracking-widest text-ink-soft">
                    メールアドレス
                  </label>
                  <input
                    id="profile-email"
                    type="email"
                    defaultValue={mockUser.email}
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <p className="text-xs text-ink-soft">ご登録日：{mockUser.memberSince}</p>
                <button
                  type="button"
                  className="w-full border border-ink px-6 py-3 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
                >
                  変更を保存する
                </button>
              </form>
            )}
          </div>

          <div className="mt-14 text-center">
            <Link to="/onlineshop" className="text-[11px] tracking-widest text-ink-soft hover:text-ink">
              ONLINE SHOPへ戻る
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default MyPage
