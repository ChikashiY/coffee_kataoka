import { useState, type FormEvent } from 'react'
import { Link, Navigate } from 'react-router-dom'
import PageBanner from '../components/PageBanner'
import { useCart } from '../context/CartContext'
import { CheckIcon } from '../components/icons'

const paymentOptions = [
  { id: 'credit', label: 'クレジットカード' },
  { id: 'konbini', label: 'コンビニ支払い' },
  { id: 'bank', label: '銀行振込' },
]

const SHIPPING_FEE = 660
const FREE_SHIPPING_THRESHOLD = 5000

function CheckoutPage() {
  const { items, totalPrice, clear } = useCart()
  const [payment, setPayment] = useState('credit')
  const [orderId, setOrderId] = useState<string | null>(null)

  const shipping = totalPrice >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE
  const total = totalPrice + shipping

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const id = `ORD-${Date.now().toString().slice(-8)}`
    setOrderId(id)
    clear()
  }

  if (orderId) {
    return (
      <>
        <PageBanner title="ORDER COMPLETE" />
        <section className="bg-paper px-6 py-24">
          <div className="mx-auto max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-ink">
              <CheckIcon className="h-6 w-6" />
            </div>
            <p className="mt-6 text-sm leading-loose text-ink-soft">
              ご注文ありがとうございます。
              <br />
              注文番号：{orderId}
              <br />
              内容を確認の上、発送準備を進めます。
            </p>
            <div className="mt-8 flex flex-col gap-3">
              <Link
                to="/mypage"
                className="border border-ink px-6 py-3 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                注文履歴を見る
              </Link>
              <Link
                to="/onlineshop"
                className="border border-line px-6 py-3 text-[11px] tracking-widest transition-colors hover:border-ink"
              >
                買い物を続ける
              </Link>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (items.length === 0) {
    return <Navigate to="/cart" replace />
  }

  return (
    <>
      <PageBanner title="CHECKOUT" description="お届け先とお支払い方法をご入力ください。" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto grid max-w-5xl gap-12 lg:grid-cols-[1fr_320px]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div>
              <h2 className="font-mincho text-lg tracking-widest">お届け先</h2>
              <div className="mt-6 space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs tracking-widest text-ink-soft">
                    お名前 <span className="text-ink">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="zip" className="block text-xs tracking-widest text-ink-soft">
                    郵便番号 <span className="text-ink">*</span>
                  </label>
                  <input
                    id="zip"
                    name="zip"
                    type="text"
                    required
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="address" className="block text-xs tracking-widest text-ink-soft">
                    ご住所 <span className="text-ink">*</span>
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
                <div>
                  <label htmlFor="tel" className="block text-xs tracking-widest text-ink-soft">
                    電話番号 <span className="text-ink">*</span>
                  </label>
                  <input
                    id="tel"
                    name="tel"
                    type="tel"
                    required
                    className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-mincho text-lg tracking-widest">お支払い方法</h2>
              <div className="mt-6 space-y-3">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex cursor-pointer items-center gap-3 border px-4 py-3 text-sm transition-colors ${
                      payment === option.id ? 'border-ink' : 'border-line hover:border-ink-soft'
                    }`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={option.id}
                      checked={payment === option.id}
                      onChange={() => setPayment(option.id)}
                      className="accent-black"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              className="w-full border border-ink bg-ink px-6 py-3 text-[11px] tracking-widest text-paper transition-colors hover:bg-paper hover:text-ink"
            >
              注文を確定する
            </button>
          </form>

          <aside className="h-fit border border-line bg-stone p-6">
            <h2 className="font-mincho text-lg tracking-widest">ご注文内容</h2>
            <ul className="mt-6 space-y-4 text-sm">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex justify-between gap-4">
                  <span className="text-ink-soft">
                    {product.name} × {quantity}
                  </span>
                  <span>¥{(product.price * quantity).toLocaleString('ja-JP')}</span>
                </li>
              ))}
            </ul>
            <dl className="mt-6 space-y-3 border-t border-line pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">小計</dt>
                <dd>¥{totalPrice.toLocaleString('ja-JP')}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">送料</dt>
                <dd>{shipping === 0 ? '無料' : `¥${shipping.toLocaleString('ja-JP')}`}</dd>
              </div>
              <div className="flex justify-between border-t border-line pt-3 font-medium">
                <dt>合計（税込）</dt>
                <dd>¥{total.toLocaleString('ja-JP')}</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>
    </>
  )
}

export default CheckoutPage
