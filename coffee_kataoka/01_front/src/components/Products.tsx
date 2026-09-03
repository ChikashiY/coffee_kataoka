import { products } from '../data/products'
import ProductCard from './ProductCard'

function Products() {
  return (
    <section id="products" className="scroll-mt-24 px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">ONLINE STORE</h2>
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Products
