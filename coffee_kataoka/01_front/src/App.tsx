import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import ScrollToTop from './components/ScrollToTop'
import { CartProvider } from './context/CartContext'
import AccessPage from './pages/AccessPage'
import CartPage from './pages/CartPage'
import CheckoutPage from './pages/CheckoutPage'
import ContactPage from './pages/ContactPage'
import HomePage from './pages/HomePage'
import MyPage from './pages/MyPage'
import NewsPage from './pages/NewsPage'
import OnlineShopPage from './pages/OnlineShopPage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import ProductDetailPage from './pages/ProductDetailPage'
import TermsPage from './pages/TermsPage'
import TokushohoPage from './pages/TokushohoPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-paper text-ink">
          <ScrollToTop />
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/news" element={<NewsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/access" element={<AccessPage />} />
              <Route path="/onlineshop" element={<OnlineShopPage />} />
              <Route path="/onlineshop/:productId" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/tokushoho" element={<TokushohoPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
