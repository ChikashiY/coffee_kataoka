import PageBanner from '../components/PageBanner'
import { shops } from '../data/shops'

const shop = shops[0]

const items: { label: string; value: string }[] = [
  { label: '販売業者', value: shop.name },
  { label: '運営責任者', value: '片岡 太郎（代表）' },
  { label: '所在地', value: shop.address },
  { label: '電話番号', value: shop.tel },
  { label: 'メールアドレス', value: 'info@coffee-kataoka.example.com' },
  { label: '受付時間', value: `${shop.hours}（${shop.closedOn}を除く）` },
  { label: '販売価格', value: '各商品ページに税込価格で表示しています。' },
  { label: '商品代金以外の必要料金', value: '送料 660円（税込）。合計5,000円（税込）以上のご注文で送料無料。' },
  {
    label: 'お支払い方法',
    value: 'クレジットカード決済、コンビニ支払い、銀行振込',
  },
  { label: 'お支払い時期', value: 'クレジットカードは注文確定時。コンビニ支払い・銀行振込は注文確定後7日以内。' },
  {
    label: '商品の引き渡し時期',
    value: 'ご入金確認後、5営業日以内に発送いたします（天候・交通事情等により遅れる場合があります）。',
  },
  {
    label: '返品・交換について',
    value:
      '商品の性質上、お客様都合による返品・交換はお受けできません。不良品・注文と異なる商品が届いた場合は、商品到着後7日以内にお問い合わせフォームよりご連絡ください。当店負担にて交換・返金対応いたします。',
  },
  { label: '販売数量の制限', value: '在庫状況により、数量を制限させていただく場合があります。' },
]

function TokushohoPage() {
  return (
    <>
      <PageBanner title="LEGAL NOTICE" description="特定商取引法に基づく表記" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <dl className="divide-y divide-line border-y border-line">
            {items.map(({ label, value }) => (
              <div key={label} className="grid gap-1 py-5 sm:grid-cols-[160px_1fr] sm:gap-6">
                <dt className="text-xs tracking-widest text-ink-soft">{label}</dt>
                <dd className="text-sm leading-loose">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  )
}

export default TokushohoPage
