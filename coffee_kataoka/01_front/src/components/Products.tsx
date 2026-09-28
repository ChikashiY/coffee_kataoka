import { Link } from 'react-router-dom'
import { products } from '../data/products'
import ProductCard from './ProductCard'

interface ProductsProps {
  limit?: number
}

function Products({ limit }: ProductsProps) {
  const items = limit ? products.slice(0, limit) : products

  return (
    <section id="products" className="scroll-mt-24 bg-paper px-6 py-24 transition-colors">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">ONLINE SHOP</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {limit && limit < products.length && (
          <div className="mt-10 text-center">
            <Link
              to="/onlineshop"
              className="inline-flex items-center gap-2 border border-ink px-6 py-2.5 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
            >
              MORE ITEMS
            </Link>
          </div>
        )}
      </div>
    </section>
  )
}

export default Products
