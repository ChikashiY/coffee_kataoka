import { Link } from 'react-router-dom'
import type { Product } from '../data/products'

function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/onlineshop/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-stone shadow-sm transition-shadow duration-500 group-hover:shadow-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.soldOut && (
          <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-[10px] tracking-widest text-paper">
            SOLD OUT
          </span>
        )}
      </div>
      <p className="mt-4 text-sm">{product.name}</p>
      <p className="mt-1 text-sm text-ink-soft">¥{product.price.toLocaleString('ja-JP')}（税込）</p>
    </Link>
  )
}

export default ProductCard
