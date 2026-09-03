import Access from './components/Access'
import Footer from './components/Footer'
import Header from './components/Header'
import Hero from './components/Hero'
import News from './components/News'
import Products from './components/Products'

function App() {
  return (
    <div className="min-h-screen bg-paper text-ink">
      <Header />
      <main>
        <Hero />
        <div className="relative z-10 bg-paper">
          <News />
          <Products />
          <Access />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
