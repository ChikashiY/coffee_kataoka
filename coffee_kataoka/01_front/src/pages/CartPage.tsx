import { Link } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { useCart } from '../context/CartContext'
import { MinusIcon, PlusIcon, TrashIcon } from '../components/icons'

const SHIPPING_FEE = 660
const FREE_SHIPPING_THRESHOLD = 5000

function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const shipping = items.length === 0 || totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = totalPrice + shipping

  return (
    <>
      <PageBanner title="CART" description="ご注文内容をご確認の上、レジにお進みください。" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-5xl">
          {items.length === 0 ? (
            <div className="border border-line bg-stone px-6 py-16 text-center">
              <p className="text-sm text-ink-soft">カートに商品がありません。</p>
              <Link
                to="/onlineshop"
                className="mt-6 inline-flex items-center gap-2 border border-ink px-6 py-2.5 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                商品を見る
              </Link>
            </div>
          ) : (
            <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
              <ul className="divide-y divide-line border-y border-line">
                {items.map(({ product, quantity }) => (
                  <li key={product.id} className="flex gap-5 py-6">
                    <div className="h-24 w-24 shrink-0 overflow-hidden bg-stone">
                      <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex items-start justify-between gap-4">
                        <p className="text-sm">{product.name}</p>
                        <button
                          type="button"
                          onClick={() => removeItem(product.id)}
                          aria-label={`${product.name}をカートから削除`}
                          className="shrink-0 text-ink-soft transition-colors hover:text-ink"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-line">
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity - 1)}
                            aria-label="数量を減らす"
                            className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-ink"
                          >
                            <MinusIcon className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-8 text-center text-sm">{quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(product.id, quantity + 1)}
                            aria-label="数量を増やす"
                            className="flex h-8 w-8 items-center justify-center text-ink-soft hover:text-ink"
                          >
                            <PlusIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-sm text-ink-soft">
                          ¥{(product.price * quantity).toLocaleString('ja-JP')}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <aside className="h-fit border border-line bg-stone p-6">
                <h2 className="font-mincho text-lg tracking-widest">ご注文内容</h2>
                <dl className="mt-6 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">小計</dt>
                    <dd>¥{totalPrice.toLocaleString('ja-JP')}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-ink-soft">送料</dt>
                    <dd>{shipping === 0 ? '無料' : `¥${shipping.toLocaleString('ja-JP')}`}</dd>
                  </div>
                </dl>
                {shipping > 0 && (
                  <p className="mt-3 text-xs text-ink-soft">
                    あと¥{(FREE_SHIPPING_THRESHOLD - totalPrice).toLocaleString('ja-JP')}のご購入で送料無料
                  </p>
                )}
                <div className="mt-4 flex justify-between border-t border-line pt-4 text-sm">
                  <span>合計（税込）</span>
                  <span className="font-medium">¥{total.toLocaleString('ja-JP')}</span>
                </div>
                <Link
                  to="/checkout"
                  className="mt-6 flex items-center justify-center gap-2 border border-ink bg-ink px-6 py-3 text-[11px] tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
                >
                  レジに進む
                </Link>
                <Link
                  to="/onlineshop"
                  className="mt-3 flex items-center justify-center gap-2 border border-line px-6 py-3 text-[11px] tracking-widest transition-colors hover:border-ink"
                >
                  買い物を続ける
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default CartPage
