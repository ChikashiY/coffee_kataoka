export interface Shop {
  id: string
  name: string
  address: string
  hours: string
  closedOn: string
  image: string
  sns: { label: string; href: string }[]
}

export const shops: Shop[] = [
  {
    id: 'main',
    name: '本店・ロースタリー',
    address: '東京都渋谷区上原2-14-8',
    hours: '8:00–19:00',
    closedOn: '水曜定休',
    image: 'https://picsum.photos/seed/kataoka-shop-01/800/600',
    sns: [
      { label: 'Instagram', href: '#' },
      { label: 'X', href: '#' },
      { label: 'LINE', href: '#' },
    ],
  },
  {
    id: 'kamakura',
    name: '鎌倉店',
    address: '神奈川県鎌倉市御成町6-33',
    hours: '9:00–18:00',
    closedOn: '火曜定休',
    image: 'https://picsum.photos/seed/kataoka-shop-02/800/600',
    sns: [
      { label: 'Instagram', href: '#' },
      { label: 'LINE', href: '#' },
    ],
  },
]
