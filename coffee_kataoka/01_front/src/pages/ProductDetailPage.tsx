import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { products } from '../data/products'
import { useCart } from '../context/CartContext'
import { MinusIcon, PlusIcon } from '../components/icons'

function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)

  const product = products.find((item) => item.id === productId)

  if (!product) {
    return <Navigate to="/onlineshop" replace />
  }

  const handleAdd = () => {
    addItem(product, quantity)
    setAdded(true)
    window.setTimeout(() => setAdded(false), 1500)
  }

  return (
    <section className="bg-paper px-6 pb-24 pt-28 sm:pt-32">
      <div className="mx-auto max-w-5xl">
        <nav className="text-xs text-ink-soft">
          <Link to="/onlineshop" className="hover:text-ink">
            ONLINE SHOP
          </Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </nav>

        <div className="mt-8 grid gap-12 lg:grid-cols-2">
          <div className="relative aspect-square overflow-hidden bg-stone">
            <img src={product.image} alt={product.name} className="h-full w-full object-cover" />
            {product.soldOut && (
              <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-[10px] tracking-widest text-paper">
                SOLD OUT
              </span>
            )}
          </div>

          <div>
            <h1 className="font-mincho text-2xl tracking-widest">{product.name}</h1>
            <p className="mt-3 text-lg text-ink-soft">¥{product.price.toLocaleString('ja-JP')}（税込）</p>
            <p className="mt-8 text-sm leading-loose text-ink-soft">{product.description}</p>

            {product.soldOut ? (
              <p className="mt-10 border border-line bg-stone px-6 py-4 text-center text-sm text-ink-soft">
                この商品は現在SOLD OUTです。
              </p>
            ) : (
              <div className="mt-10">
                <p className="text-xs tracking-widest text-ink-soft">数量</p>
                <div className="mt-2 flex items-center gap-6">
                  <div className="flex items-center border border-line">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="数量を減らす"
                      className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
                    >
                      <MinusIcon className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-10 text-center text-sm">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => q + 1)}
                      aria-label="数量を増やす"
                      className="flex h-10 w-10 items-center justify-center text-ink-soft hover:text-ink"
                    >
                      <PlusIcon className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="text-sm text-ink-soft">
                    小計 ¥{(product.price * quantity).toLocaleString('ja-JP')}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleAdd}
                  className="mt-8 w-full border border-ink px-6 py-3 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
                >
                  カートに入れる
                </button>

                {added && (
                  <div className="mt-4 flex items-center justify-between border border-line bg-stone px-4 py-3 text-sm">
                    <span className="text-ink-soft">カートに追加しました</span>
                    <button
                      type="button"
                      onClick={() => navigate('/cart')}
                      className="text-[11px] tracking-widest underline underline-offset-4 hover:text-ink-soft"
                    >
                      カートを見る
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetailPage
