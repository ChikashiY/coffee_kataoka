import Products from '../components/Products'
import PageBanner from '../components/PageBanner'

function OnlineShopPage() {
  return (
    <>
      <PageBanner
        title="ONLINE SHOP"
        description="黒埼で焙煎した豆やドリップバッグを、全国どこからでもお届けします。"
      />
      <Products />
    </>
  )
}

export default OnlineShopPage
