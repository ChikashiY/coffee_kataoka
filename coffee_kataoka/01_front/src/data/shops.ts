import storeViewImage from '../asset/09_access/store_view.jpg'

export interface Shop {
  id: string
  name: string
  address: string
  tel: string
  hours: string
  closedOn: string
  image: string
  sns: { label: string; href: string }[]
}

export const shops: Shop[] = [
  {
    id: 'main',
    name: 'COFFEE KATAOKA',
    address: '新潟県新潟市西区鳥原1687-2',
    tel: '025-000-0000',
    hours: '10:00–17:00',
    closedOn: '金曜定休',
    image: storeViewImage,
    sns: [],
  },
]
