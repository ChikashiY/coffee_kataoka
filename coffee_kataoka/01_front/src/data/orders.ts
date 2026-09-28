export interface OrderItem {
  name: string
  quantity: number
  price: number
}

export interface Order {
  id: string
  date: string
  status: '発送済み' | '準備中' | 'キャンセル'
  items: OrderItem[]
  total: number
}

export const orders: Order[] = [
  {
    id: 'ORD-20260912-001',
    date: '2026.09.12',
    status: '発送済み',
    items: [
      { name: '片岡ブレンド (100g)', quantity: 2, price: 1200 },
      { name: 'ドリップバッグセット (10個入り)', quantity: 1, price: 2200 },
    ],
    total: 4600,
  },
  {
    id: 'ORD-20260806-004',
    date: '2026.08.06',
    status: '発送済み',
    items: [{ name: 'エチオピア イルガチェフェ (100g)', quantity: 1, price: 1600 }],
    total: 1600,
  },
  {
    id: 'ORD-20260921-007',
    date: '2026.09.21',
    status: '準備中',
    items: [{ name: 'ギフトボックス「三種の贅沢」(3袋セット)', quantity: 1, price: 4800 }],
    total: 4800,
  },
]
