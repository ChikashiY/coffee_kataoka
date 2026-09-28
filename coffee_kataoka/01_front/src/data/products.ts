export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  soldOut?: boolean
}

export const products: Product[] = [
  {
    id: 'blend',
    name: '片岡ブレンド (100g)',
    price: 1200,
    image: 'https://picsum.photos/seed/kataoka-product-01/600/600',
    description:
      '数種の豆をブレンドした、当店の定番。優しい甘みとコクのバランスを大切にした、毎日飲んでも飽きのこない味わいです。',
  },
  {
    id: 'ethiopia',
    name: 'エチオピア イルガチェフェ (100g)',
    price: 1600,
    image: 'https://picsum.photos/seed/kataoka-product-02/600/600',
    description: '華やかな柑橘系の香りと、すっきりとした後味が特徴のシングルオリジン。浅煎りでの提供です。',
  },
  {
    id: 'colombia',
    name: 'コロンビア ウォッシュド (100g)',
    price: 1400,
    image: 'https://picsum.photos/seed/kataoka-product-03/600/600',
    description: 'ナッツのような香ばしさとまろやかな酸味が楽しめる、バランスの取れた中煎り豆です。',
  },
  {
    id: 'dark-roast',
    name: '深煎りダークロースト (100g)',
    price: 1300,
    image: 'https://picsum.photos/seed/kataoka-product-04/600/600',
    description: 'しっかりとした苦みとコクが持ち味の深煎りブレンド。ミルクとの相性も抜群です。',
    soldOut: true,
  },
  {
    id: 'maple-spice',
    name: 'メープルスパイスブレンド【季節限定】(100g)',
    price: 1500,
    image: 'https://picsum.photos/seed/kataoka-product-05/600/600',
    description: 'メープルとスパイスの香りをまとわせた季節限定ブレンド。肌寒い季節にぴったりの一杯です。',
  },
  {
    id: 'decaf',
    name: 'デカフェブレンド (100g)',
    price: 1450,
    image: 'https://picsum.photos/seed/kataoka-product-06/600/600',
    description: 'カフェインを抑えながらも、コーヒー本来の風味をしっかり感じられるデカフェブレンドです。',
  },
  {
    id: 'gift-box',
    name: 'ギフトボックス「三種の贅沢」(3袋セット)',
    price: 4800,
    image: 'https://picsum.photos/seed/kataoka-product-07/600/600',
    description: '人気の豆を3種セットにしたギフトボックス。大切な方への贈り物にもおすすめです。',
    soldOut: true,
  },
  {
    id: 'drip-bag-set',
    name: 'ドリップバッグセット (10個入り)',
    price: 2200,
    image: 'https://picsum.photos/seed/kataoka-product-08/600/600',
    description: '道具を使わず手軽に本格的な一杯を楽しめる、ドリップバッグ10個入りのセットです。',
  },
]
