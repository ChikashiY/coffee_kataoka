import Hero from '../components/Hero'
import News from '../components/News'
import Products from '../components/Products'

function HomePage() {
  return (
    <>
      <Hero />
      <News limit={3} />
      <Products limit={4} />
    </>
  )
}

export default HomePage
