export interface Product {
  id: string
  name: string
  price: number
  image: string
  soldOut?: boolean
}

export const products: Product[] = [
  {
    id: 'blend',
    name: '片岡ブレンド (100g)',
    price: 1200,
    image: 'https://picsum.photos/seed/kataoka-product-01/600/600',
  },
  {
    id: 'ethiopia',
    name: 'エチオピア イルガチェフェ (100g)',
    price: 1600,
    image: 'https://picsum.photos/seed/kataoka-product-02/600/600',
  },
  {
    id: 'colombia',
    name: 'コロンビア ウォッシュド (100g)',
    price: 1400,
    image: 'https://picsum.photos/seed/kataoka-product-03/600/600',
  },
  {
    id: 'dark-roast',
    name: '深煎りダークロースト (100g)',
    price: 1300,
    image: 'https://picsum.photos/seed/kataoka-product-04/600/600',
    soldOut: true,
  },
  {
    id: 'maple-spice',
    name: 'メープルスパイスブレンド【季節限定】(100g)',
    price: 1500,
    image: 'https://picsum.photos/seed/kataoka-product-05/600/600',
  },
  {
    id: 'decaf',
    name: 'デカフェブレンド (100g)',
    price: 1450,
    image: 'https://picsum.photos/seed/kataoka-product-06/600/600',
  },
  {
    id: 'gift-box',
    name: 'ギフトボックス「三種の贅沢」(3袋セット)',
    price: 4800,
    image: 'https://picsum.photos/seed/kataoka-product-07/600/600',
    soldOut: true,
  },
  {
    id: 'drip-bag-set',
    name: 'ドリップバッグセット (10個入り)',
    price: 2200,
    image: 'https://picsum.photos/seed/kataoka-product-08/600/600',
  },
]
