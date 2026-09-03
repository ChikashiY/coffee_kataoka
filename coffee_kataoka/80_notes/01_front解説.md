# Coffee Kataoka フロントエンド解説

このドキュメントでは、`coffee_kataoka/01_front` にある React + TypeScript + Vite + Tailwind CSS のコードを、React に慣れていない人向けに解説します。

特に次の内容を中心に説明します。

- React アプリが起動して画面に表示されるまでの流れ
- コンポーネントの分け方
- TypeScript によるデータの型定義
- Tailwind CSS のクラスの読み方
- ヘッダーの開閉とスクロールによる表示・非表示
- Hero セクションのスクロール演出
- `useState`、`useEffect`、`useRef` の役割
- 配列データを `map` で画面に表示する方法

---

## 1. プロジェクトの構成

主なファイルは次のように分かれています。

```text
01_front/
  index.html
  package.json
  vite.config.ts
  src/
    main.tsx
    App.tsx
    index.css
    components/
      Access.tsx
      Footer.tsx
      Header.tsx
      Hero.tsx
      News.tsx
      ProductCard.tsx
      Products.tsx
      icons.tsx
    data/
      news.ts
      products.ts
      shops.ts
```

大きく分けると、次の3種類です。

| 種類 | 役割 |
| --- | --- |
| 起動・設定ファイル | React や Tailwind を動かすための設定 |
| `components` | 画面に表示する部品 |
| `data` | 商品・ニュース・店舗などの表示データ |

表示部分とデータを分けているため、商品情報を変更するときは `data/products.ts`、レイアウトを変更するときは `components/Products.tsx` や `ProductCard.tsx` を見る、というように役割を判断できます。

---

## 2. 画面が表示されるまでの流れ

ブラウザで最初に読み込まれるのは `index.html` です。

```html
<div id="root"></div>
<script type="module" src="/src/main.tsx"></script>
```

`root` という空の `<div>` に、React が画面を描画します。

その後、`main.tsx` が読み込まれます。

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

### 2.1 `createRoot`

```tsx
createRoot(document.getElementById('root')!)
```

`document.getElementById('root')` で、HTML の次の要素を取得します。

```html
<div id="root"></div>
```

`createRoot` は、その HTML 要素を React の描画先として準備します。

続く `.render(...)` に渡したコンポーネントが、`root` の中に表示されます。

```tsx
.render(<App />)
```

### 2.2 `StrictMode`

```tsx
<StrictMode>
  <App />
</StrictMode>
```

`StrictMode` は、開発中に問題を見つけやすくするための仕組みです。

開発環境では、`useEffect` などの処理が複数回実行されたように見える場合があります。これは React が副作用の処理に問題がないか確認しているためです。本番ビルドで同じ処理がそのまま二重実行される、という意味ではありません。

### 2.3 CSS の読み込み

```tsx
import './index.css'
```

`main.tsx` で `index.css` を import しているため、アプリ全体に CSS と Tailwind CSS のスタイルが適用されます。

---

## 3. `App.tsx` はページ全体の組み立て役

`App.tsx` は、各コンポーネントをページのどこに配置するかを決めています。

```tsx
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
```

ページの構造は次のようになります。

```text
App
├── Header
├── main
│   ├── Hero
│   └── News
│       Products
│       Access
└── Footer
```

### 3.1 コンポーネントを配置する

```tsx
<Header />
<Hero />
<News />
<Products />
<Access />
<Footer />
```

大文字から始まるタグは、HTML の標準タグではなく React コンポーネントです。

例えば、次の2つは役割が違います。

```tsx
<header>...</header>
```

これは HTML 標準の要素です。

```tsx
<Header />
```

こちらは、このプロジェクトで定義した `Header` 関数コンポーネントです。

### 3.2 `main` と `div` の役割

```tsx
<main>
  <Hero />
  <div className="relative z-10 bg-paper">
    <News />
    <Products />
    <Access />
  </div>
</main>
```

`main` はページの主な内容を表す意味のある HTML 要素です。

内側の `div` には、次のクラスがあります。

- `relative`：この要素を基準にした配置を可能にする
- `z-10`：重なり順を設定する
- `bg-paper`：背景色をテーマの `paper` にする

Hero の `sticky` 表示と、後続セクションの重なり方を整えるために使われています。

---

## 4. React コンポーネントの基本

このプロジェクトのコンポーネントは、基本的に関数として定義されています。

```tsx
function News() {
  return (
    <section id="news">
      <h2>NEWS</h2>
    </section>
  )
}
```

関数が返している HTML に似た記法を JSX と呼びます。

### 4.1 JSX

JSX は、JavaScript または TypeScript の中に HTML に似た構造を書ける記法です。

```tsx
return (
  <section>
    <h2>NEWS</h2>
  </section>
)
```

ただし、厳密には HTML そのものではありません。例えば、CSS のクラスは `class` ではなく `className` と書きます。

```tsx
<div className="bg-stone">...</div>
```

### 4.2 `className`

React では、HTML の `class` 属性に相当するものを `className` と書きます。

```tsx
<section className="px-6 py-24">
```

`class` は JavaScript の予約語と関係するため、JSX では `className` が使われます。

### 4.3 コンポーネントの `export` と `import`

`News.tsx` の末尾では、コンポーネントを外部から使えるようにしています。

```tsx
export default News
```

`App.tsx` では、そのコンポーネントを読み込みます。

```tsx
import News from './components/News'
```

そして JSX 内で使います。

```tsx
<News />
```

---

## 5. データを `data` フォルダに分ける理由

商品情報は `Products.tsx` に直接書かず、`data/products.ts` に定義されています。

```tsx
export const products: Product[] = [
  {
    id: 'blend',
    name: '片岡ブレンド (100g)',
    price: 1200,
    image: 'https://picsum.photos/seed/kataoka-product-01/600/600',
  },
]
```

このように、次のような分担になります。

```text
data/products.ts
  商品の名前、価格、画像などを持つ

components/Products.tsx
  商品一覧のレイアウトを持つ

components/ProductCard.tsx
  1商品分の表示方法を持つ
```

データと見た目を分離すると、商品の追加や変更がしやすくなります。

---

## 6. TypeScript の型定義

`products.ts` には `Product` インターフェースがあります。

```tsx
export interface Product {
  id: string
  name: string
  price: number
  image: string
  soldOut?: boolean
}
```

これは、商品オブジェクトがどのようなプロパティを持つべきかを定義しています。

| プロパティ | 型 | 意味 |
| --- | --- | --- |
| `id` | `string` | 商品を識別する文字列 |
| `name` | `string` | 商品名 |
| `price` | `number` | 価格 |
| `image` | `string` | 画像 URL |
| `soldOut` | `boolean` | 売り切れかどうか |

### 6.1 `string`

```tsx
id: string
```

文字列が入ることを表します。

```tsx
id: 'blend'
name: '片岡ブレンド (100g)'
```

### 6.2 `number`

```tsx
price: number
```

数値が入ることを表します。

```tsx
price: 1200
```

### 6.3 `boolean`

```tsx
soldOut?: boolean
```

`true` または `false` が入る型です。

```tsx
soldOut: true
```

### 6.4 `?` の意味

```tsx
soldOut?: boolean
```

`?` が付いているプロパティは省略できます。

売り切れていない商品は、次のように `soldOut` 自体を省略できます。

```tsx
{
  id: 'blend',
  name: '片岡ブレンド (100g)',
  price: 1200,
  image: '...',
}
```

一方、売り切れの商品だけ `soldOut: true` を指定しています。

```tsx
{
  id: 'dark-roast',
  name: '深煎りダークロースト (100g)',
  price: 1300,
  image: '...',
  soldOut: true,
}
```

---

## 7. 配列のデータを画面に表示する

`Products.tsx` では、商品の配列を `map` で処理しています。

```tsx
{products.map((product) => (
  <ProductCard key={product.id} product={product} />
))}
```

`map` は、配列の要素を1つずつ取り出して処理するメソッドです。

イメージとしては次のような処理です。

```text
products[0] -> ProductCard
products[1] -> ProductCard
products[2] -> ProductCard
...
```

商品が8件あれば、`ProductCard` も8個生成されます。

### 7.1 `key` の役割

```tsx
key={product.id}
```

`key` は、React がリストの各要素を識別するために必要です。

今回は商品ごとに一意な `id` があるため、`product.id` を使っています。

### 7.2 props を渡す

```tsx
<ProductCard key={product.id} product={product} />
```

`product={product}` で、商品データを `ProductCard` に渡しています。

`ProductCard.tsx` 側では、次のように受け取ります。

```tsx
function ProductCard({ product }: { product: Product }) {
```

これは次の2つを同時に行っています。

1. props の中から `product` を取り出す
2. `product` が `Product` 型であると TypeScript に伝える

---

## 8. `ProductCard.tsx` の表示処理

1つの商品カードは、次のコンポーネントで表示されます。

```tsx
function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group">
      <div className="relative aspect-square overflow-hidden bg-stone">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.soldOut && (
          <span className="absolute left-3 top-3 bg-ink px-3 py-1 text-[10px] tracking-widest text-paper">
            SOLD OUT
          </span>
        )}
      </div>
      <p className="mt-4 text-sm">{product.name}</p>
      <p className="mt-1 text-sm text-ink-soft">¥{product.price.toLocaleString('ja-JP')}（税込）</p>
    </div>
  )
}
```

### 8.1 JSX 内の JavaScript

JSX の中で `{}` を使うと、JavaScript の値を埋め込めます。

```tsx
src={product.image}
alt={product.name}
```

商品データの画像 URL と商品名が、それぞれ HTML 属性に入ります。

```tsx
<p>{product.name}</p>
```

商品名が画面に表示されます。

### 8.2 価格の表示

```tsx
product.price.toLocaleString('ja-JP')
```

数値を日本向けの桁区切りに変換しています。

```tsx
4800.toLocaleString('ja-JP')
```

結果は次のようになります。

```text
4,800
```

### 8.3 売り切れラベル

```tsx
{product.soldOut && (
  <span>SOLD OUT</span>
)}
```

`product.soldOut` が `true` の場合だけ表示されます。

この書き方は、React でよく使う条件付きレンダリングです。

---

## 9. Tailwind CSS の導入

このプロジェクトでは Tailwind CSS v4 を使用しています。

`package.json` には次の依存関係があります。

```json
"dependencies": {
  "@tailwindcss/vite": "^4.3.3",
  "tailwindcss": "^4.3.3"
}
```

`vite.config.ts` では、Tailwind の Vite プラグインを登録しています。

```tsx
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

この設定によって、Vite が Tailwind CSS を処理できるようになります。

`index.css` の先頭では、Tailwind CSS を読み込んでいます。

```css
@import "tailwindcss";
```

---

## 10. Tailwind のクラス名の基本

Tailwind CSS では、CSS ファイルにクラスを1つずつ定義する代わりに、HTML や JSX の `className` にユーティリティクラスを書きます。

```tsx
<div className="mx-auto max-w-6xl px-6 py-24">
```

この1行には、複数の CSS 指定が含まれています。

| クラス | 役割 |
| --- | --- |
| `mx-auto` | 左右の margin を auto にして中央寄せ |
| `max-w-6xl` | 最大幅を制限 |
| `px-6` | 左右の padding |
| `py-24` | 上下の padding |

### 10.1 余白の指定

```tsx
px-6
```

`p` は padding、`x` は左右を表します。

```text
p  = padding
m  = margin
x  = left + right
 y = top + bottom
```

そのため、次のようになります。

```tsx
px-6 // 左右の padding
py-24 // 上下の padding
mt-12 // 上 margin
left-3 // 左位置
```

### 10.2 サイズ

```tsx
h-screen
w-full
h-full
```

- `h-screen`：画面の高さと同じ
- `w-full`：親要素の幅いっぱい
- `h-full`：親要素の高さいっぱい

### 10.3 背景色と文字色

```tsx
bg-paper
text-ink
text-ink-soft
bg-stone
```

これらは `index.css` の `@theme` で定義されたカスタムカラーです。

---

## 11. `index.css` のテーマ設定

`index.css` では、プロジェクト全体で使う色とフォントを定義しています。

```css
@theme {
  --color-paper: #ffffff;
  --color-ink: #111111;
  --color-ink-soft: #5c5c5c;
  --color-line: #e2e2e2;
  --color-stone: #f5f4f2;

  --font-sans: "Noto Sans JP", "Helvetica Neue", Arial, sans-serif;
  --font-mincho: "Shippori Mincho", "Noto Serif JP", serif;
}
```

この定義があることで、コンポーネント側で次のように書けます。

```tsx
<div className="bg-paper text-ink">
```

### 11.1 カスタムカラー

| Tailwind クラス | CSS 変数 | 色の用途 |
| --- | --- | --- |
| `bg-paper` | `--color-paper` | 白い背景 |
| `text-ink` | `--color-ink` | 基本の黒い文字 |
| `text-ink-soft` | `--color-ink-soft` | 補助的なグレー文字 |
| `border-line` | `--color-line` | 区切り線 |
| `bg-stone` | `--color-stone` | 薄いグレーの背景 |

### 11.2 フォント

```tsx
font-sans
font-mincho
```

- `font-sans`：本文やナビゲーション向けのゴシック体
- `font-mincho`：見出しやブランド名向けの明朝体

フォント本体は `index.html` で Google Fonts から読み込んでいます。

```html
<link
  href="https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@400;500;600;800&family=Noto+Sans+JP:wght@300;400;500;700&display=swap"
  rel="stylesheet"
/>
```

### 11.3 `@apply`

```css
html {
  @apply scroll-smooth;
}

body {
  @apply bg-paper text-ink font-sans antialiased;
}
```

`@apply` は、Tailwind のクラスを CSS の中で適用する記法です。

次のような CSS を、Tailwind のクラスで簡潔に書いています。

```css
body {
  background-color: #ffffff;
  color: #111111;
  font-family: ...;
  -webkit-font-smoothing: antialiased;
}
```

---

## 12. レスポンシブ対応

Tailwind では、画面幅ごとの指定をクラス名の接頭辞で表します。

`Products.tsx` の商品一覧は次の指定です。

```tsx
<div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
```

この意味は次のとおりです。

| 画面幅 | 列数 |
| --- | --- |
| 初期状態、主にスマートフォン | 2列 |
| `sm` 以上 | 3列 |
| `lg` 以上 | 4列 |

Tailwind のレスポンシブクラスは、基本的に「指定した幅以上」で適用されます。

### 12.1 モバイル用メニュー

`Header.tsx` では、PC 用ナビゲーションとモバイル用メニューボタンを切り替えています。

```tsx
<nav className="hidden items-center gap-6 ... md:flex">
```

- 通常は `hidden` で非表示
- `md` 以上では `flex` で表示

```tsx
<button className="md:hidden">
```

- `md` 未満では表示
- `md` 以上では非表示

---

## 13. `Header.tsx` の基本構造

ヘッダーでは、次の状態を管理しています。

```tsx
const [open, setOpen] = useState(false)
const [visible, setVisible] = useState(true)
```

- `open`：モバイルメニューが開いているか
- `visible`：ヘッダーを表示するか

ナビゲーション項目は配列で管理されています。

```tsx
const navLinks = [
  { label: 'NEWS', href: '#news' },
  { label: 'SUBSCRIPTION', href: '#' },
  { label: 'WHOLESALE&SUPPORT', href: '#' },
  { label: 'ACCESS', href: '#access' },
  { label: 'CONTACT', href: 'mailto:hello@coffee-kataoka.example' },
]
```

この配列を `map` して、PC 用とモバイル用のナビゲーションに利用しています。

---

## 14. `useState` の使い方

`useState` は、コンポーネント内で変化する値を管理する React Hook です。

```tsx
const [open, setOpen] = useState(false)
```

基本形は次のとおりです。

```tsx
const [現在の値, 値を変更する関数] = useState(初期値)
```

この例では次の意味になります。

- 現在の値：`open`
- 値を変更する関数：`setOpen`
- 初期値：`false`

### 14.1 ボタンクリックで状態を切り替える

```tsx
onClick={() => setOpen((v) => !v)}
```

`v` は現在の `open` の値です。

```text
open が false -> true
open が true  -> false
```

現在の状態を使って次の状態を計算する場合は、次の形式が安全です。

```tsx
setOpen((current) => !current)
```

### 14.2 状態によってアイコンを切り替える

```tsx
{open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
```

これは三項演算子です。

```text
条件 ? 条件が true の場合 : 条件が false の場合
```

メニューが開いているときは閉じるアイコン、閉じているときはメニューアイコンを表示します。

### 14.3 状態によってメニューを表示する

```tsx
{open && (
  <nav className="flex flex-col ...">
    ...
  </nav>
)}
```

`open` が `true` のときだけ、モバイル用ナビゲーションが JSX として生成されます。

---

## 15. ヘッダーのスクロール処理

ヘッダーのスクロール監視は、`Header.tsx` の `useEffect` で実行されています。

```tsx
useEffect(() => {
  const onScroll = () => {
    const show = window.scrollY < 40
    setVisible(show)
    if (!show) setOpen(false)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

### 15.1 `window.scrollY`

```tsx
window.scrollY
```

ページの上端から、現在どれだけ縦方向にスクロールしたかをピクセル単位で返します。

### 15.2 40px を境界にする

```tsx
const show = window.scrollY < 40
```

スクロール量が 40px 未満なら `true`、40px 以上なら `false` になります。

```text
scrollY = 0   -> show は true
scrollY = 20  -> show は true
scrollY = 40  -> show は false
scrollY = 200 -> show は false
```

その結果、現在の実装では次の動作になります。

- ページ最上部付近ではヘッダーを表示
- 40px 以上スクロールするとヘッダーを非表示
- 下方向にスクロールしても、上端付近まで戻らない限り再表示しない

### 15.3 スクロール時にメニューを閉じる

```tsx
if (!show) setOpen(false)
```

ヘッダーを非表示にするタイミングで、モバイルメニューも閉じています。

これにより、メニューを開いたままページをスクロールして、見えない位置にメニューだけ残る状態を防いでいます。

### 15.4 初回にも実行する

```tsx
onScroll()
```

イベントを登録するだけでは、スクロールイベントが発生するまで `visible` の値は変わりません。

そこで、`addEventListener` の登録直後に `onScroll()` を直接呼び、ページの初期状態も計算しています。

### 15.5 イベントリスナーを登録する

```tsx
window.addEventListener('scroll', onScroll, { passive: true })
```

ブラウザでスクロールが発生するたびに、`onScroll` が呼ばれます。

`passive: true` は、スクロールイベント内で `preventDefault()` を呼ばないことをブラウザへ伝える指定です。スクロール処理の最適化に役立ちます。

### 15.6 クリーンアップする

```tsx
return () => window.removeEventListener('scroll', onScroll)
```

コンポーネントが画面から取り除かれたときに、登録したイベントを解除します。

解除しないと、不要なイベントリスナーが残ったり、同じ処理が複数回実行されたりする可能性があります。

---

## 16. ヘッダーの Tailwind アニメーション

ヘッダー本体は次のクラスを持っています。

```tsx
<header
  className={`fixed inset-x-0 top-0 z-50 text-paper transition-all duration-500 ${
    visible ? 'translate-y-0 opacity-100' : 'pointer-events-none -translate-y-3 opacity-0'
  }`}
>
```

### 16.1 固定配置

```text
fixed
inset-x-0
 top-0
z-50
```

- `fixed`：画面を基準に固定する
- `inset-x-0`：左右を 0 にして横幅いっぱいにする
- `top-0`：画面上端に置く
- `z-50`：他の要素より前面に表示する

### 16.2 表示時

```tsx
'translate-y-0 opacity-100'
```

- `translate-y-0`：通常の位置
- `opacity-100`：完全に表示

### 16.3 非表示時

```tsx
'pointer-events-none -translate-y-3 opacity-0'
```

- `-translate-y-3`：少し上へ移動
- `opacity-0`：透明にする
- `pointer-events-none`：マウス操作の対象外にする

### 16.4 アニメーション

```tsx
transition-all duration-500
```

- `transition-all`：変化する CSS プロパティをアニメーションさせる
- `duration-500`：500ms かけて変化させる

単に `display: none` にするとアニメーションできません。そのため、透明度と位置を変更して、フェードしながら上へ移動する見た目にしています。

---

## 17. ページ内リンクと滑らかなスクロール

ヘッダーのリンクには、ページ内の ID を指定しているものがあります。

```tsx
<a href="#news">NEWS</a>
<a href="#access">ACCESS</a>
```

対応するセクションには `id` があります。

```tsx
<section id="news">
<section id="access">
```

`href="#news"` をクリックすると、同じページ内の `id="news"` の位置へ移動します。

### 17.1 `scroll-smooth`

`index.css` では、HTML 全体に次の Tailwind クラスを適用しています。

```css
html {
  @apply scroll-smooth;
}
```

これにより、ページ内リンクの移動が瞬間移動ではなく、滑らかにスクロールします。

### 17.2 `scroll-mt-24`

News、Products、Access のセクションには、次のクラスがあります。

```tsx
scroll-mt-24
```

`scroll-mt` は、スクロール位置の上側に余白を設ける指定です。

ヘッダーが固定表示されている場合、ページ内リンクで移動した先の見出しがヘッダーに隠れることがあります。その問題を防ぐために、スクロール停止位置へ上部余白を追加しています。

---

## 18. Hero の全体構造

今回の中心となる Hero は、次の構造です。

```tsx
<section ref={sectionRef} className="relative h-[200vh]">
  <div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
    <img />
    <img />
    <div>最初のタイトル</div>
    <div>About の文章</div>
  </div>
</section>
```

この構造が、スクロール中に画面の内容を固定したまま、画像と文章を切り替える仕組みの土台です。

---

## 19. Hero の `chapterImages`

Hero では、2枚の画像 URL を配列で管理しています。

```tsx
const chapterImages = [
  'https://picsum.photos/seed/kataoka-hero-01/1600/1000',
  'https://picsum.photos/seed/kataoka-hero-02/1600/1000',
]
```

次のように配列の番号で取り出します。

```tsx
chapterImages[0]
chapterImages[1]
```

- `chapterImages[0]`：最初の画像
- `chapterImages[1]`：About 用の2枚目の画像

2枚の画像を同じ場所に重ねて、opacity を切り替えることでクロスフェードを作っています。

---

## 20. `useRef` で Hero の DOM を参照する

Hero の先頭では、`useRef` を使っています。

```tsx
const sectionRef = useRef<HTMLDivElement>(null)
```

JSX の `<section>` に ref を渡します。

```tsx
<section ref={sectionRef} className="relative h-[200vh]">
```

これで、JavaScript からこの `<section>` の DOM 要素を参照できます。

### 20.1 `sectionRef.current`

```tsx
const el = sectionRef.current
if (!el) return
```

`current` に、実際の DOM 要素が入ります。

最初のレンダリング時点ではまだ要素が準備されていない場合があるため、`null` の可能性を確認しています。

```tsx
if (!el) return
```

この確認を入れることで、`null` に対して `getBoundingClientRect()` を呼んでしまうエラーを防ぎます。

---

## 21. Hero の高さ `h-[200vh]`

Hero の外側の section は、次のクラスを持っています。

```tsx
<section ref={sectionRef} className="relative h-[200vh]">
```

### 21.1 `vh` とは

`vh` は viewport height の略で、ブラウザの表示領域の高さを基準にした単位です。

```text
100vh = 画面の高さ1つ分
200vh = 画面の高さ2つ分
```

Hero を `200vh` にすることで、Hero の範囲自体を画面2枚分の高さにしています。

### 21.2 なぜ `200vh` にするのか

Hero の内側には `sticky` の要素があります。

親要素に十分な高さがあると、内側の要素をスクロール中に固定できます。

```text
Hero section: 画面2枚分の高さ
  └── sticky content: 画面1枚分の高さで固定
```

このため、ユーザーが Hero の中をスクロールしている間、同じ画面の中で画像と文章を切り替えられます。

---

## 22. Hero の `sticky`

Hero の内側は次のようになっています。

```tsx
<div className="sticky top-0 h-screen overflow-hidden bg-ink text-paper">
```

### 22.1 `sticky`

`sticky` は、通常の位置にいる間は通常のレイアウトとして振る舞い、スクロールして指定位置に達すると、その親要素の範囲内で固定される CSS の仕組みです。

### 22.2 `top-0`

```tsx
top-0
```

固定される位置を、画面上端から 0 に指定しています。

### 22.3 `h-screen`

```tsx
h-screen
```

内側の表示領域を、ブラウザ画面の高さ1つ分にしています。

### 22.4 `overflow-hidden`

```tsx
overflow-hidden
```

画像や子要素が表示領域からはみ出した場合に、はみ出した部分を隠します。

---

## 23. Hero のスクロール進捗を計算する

Hero のスクロール処理は、次の部分が中心です。

```tsx
const [progress, setProgress] = useState(0)

useEffect(() => {
  const onScroll = () => {
    const el = sectionRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const scrollable = rect.height - window.innerHeight
    const next = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
    setProgress(next)
  }
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

この処理は、現在のスクロール位置を `0` から `1` の範囲に変換しています。

```text
0   = Hero の開始地点
0.5 = Hero の中間地点
1   = Hero の終了地点
```

---

## 24. `getBoundingClientRect()`

```tsx
const rect = el.getBoundingClientRect()
```

`getBoundingClientRect()` は、要素が現在の画面上でどこにあるかを取得します。

今回の処理で主に使っているのは次の値です。

```tsx
rect.height
rect.top
```

- `rect.height`：Hero section の高さ
- `rect.top`：画面上端から見た Hero section の上端位置

ページを下へスクロールすると、Hero section の `top` は次のように変化します。

```text
ページ上部       rect.top = 0
少しスクロール後 rect.top = -100
さらにスクロール rect.top = -500
```

---

## 25. スクロール可能な距離を計算する

```tsx
const scrollable = rect.height - window.innerHeight
```

Hero section 全体の高さから、画面の高さを引いています。

今回、section が `200vh`、画面が `100vh` なので、スクロールできる距離はおよそ `100vh` です。

```text
Hero section の高さ - 画面の高さ
200vh - 100vh = 100vh
```

内側の sticky 要素が画面1枚分の高さしかないため、残りの高さがスクロール区間になります。

---

## 26. `progress` の計算式

実際の計算は次のコードです。

```tsx
const next = scrollable > 0
  ? Math.min(Math.max(-rect.top / scrollable, 0), 1)
  : 0
```

数式で書くと、次のイメージです。

$$
progress = clamp\left(\frac{-rect.top}{sectionHeight - viewportHeight}, 0, 1\right)
$$

### 26.1 `-rect.top`

`rect.top` は、スクロールするとマイナスになります。

```text
rect.top = -100
-rect.top = 100
```

マイナスを反転させることで、「Hero をどれくらい通過したか」を正の値で扱えます。

### 26.2 `/ scrollable`

```tsx
-rect.top / scrollable
```

通過した距離を、Hero のスクロール可能な距離で割ります。

これで、ピクセルの値を割合に変換できます。

```text
開始時       0 / scrollable = 0
中間地点     scrollable / 2 = 0.5
終了地点     scrollable / scrollable = 1
```

### 26.3 `Math.max(..., 0)`

```tsx
Math.max(-rect.top / scrollable, 0)
```

計算結果が `0` 未満にならないようにしています。

### 26.4 `Math.min(..., 1)`

```tsx
Math.min(Math.max(..., 0), 1)
```

計算結果が `1` を超えないようにしています。

このように、結果を必ず `0` から `1` の範囲に収めています。

このような処理は、値を範囲内に制限するため「clamp」と呼ばれる考え方です。

---

## 27. `showAbout` の判定

進捗を使って、About 画面を表示するかどうかを決めています。

```tsx
const showAbout = progress > 0.5
```

```text
progress <= 0.5 -> 最初の画面
progress >  0.5 -> About の画面
```

これは Boolean 値、つまり `true` または `false` になります。

`progress` が 0.5 を超えた後に、画像と文章の表示用クラスを切り替えます。

---

## 28. Hero の画像を重ねる

1枚目の画像です。

```tsx
<img
  src={chapterImages[0]}
  alt=""
  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
    showAbout ? 'opacity-0' : 'opacity-45'
  }`}
/>
```

2枚目の画像です。

```tsx
<img
  src={chapterImages[1]}
  alt=""
  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
    showAbout ? 'opacity-45' : 'opacity-0'
  }`}
/>
```

### 28.1 画像を同じ位置に置く

```tsx
absolute inset-0 h-full w-full object-cover
```

- `absolute`：通常のレイアウトから外して配置
- `inset-0`：上下左右を 0 にする
- `h-full`：親要素の高さいっぱい
- `w-full`：親要素の幅いっぱい
- `object-cover`：画像の比率を保ちながら領域を埋める

2枚とも同じ位置に置かれるため、画像が重なります。

### 28.2 opacity の切り替え

1枚目は次のように切り替わります。

```tsx
showAbout ? 'opacity-0' : 'opacity-45'
```

2枚目は逆です。

```tsx
showAbout ? 'opacity-45' : 'opacity-0'
```

その結果、次の状態になります。

| 状態 | 1枚目 | 2枚目 |
| --- | --- | --- |
| 最初の画面 | `opacity-45` | `opacity-0` |
| About 表示時 | `opacity-0` | `opacity-45` |

### 28.3 `transition-opacity`

```tsx
transition-opacity duration-700
```

opacity の変化を 700ms かけて行います。

JavaScript で画像を直接差し替えているのではなく、2枚の画像を重ねたまま opacity を変化させているため、フェードするように見えます。

---

## 29. Hero のテキスト切り替え

最初のタイトル部分です。

```tsx
<div
  className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
    progress < 0.4 ? 'opacity-100' : 'opacity-0'
  }`}
>
  <h1 className="font-mincho text-4xl tracking-widest sm:text-6xl">COFFEE KATAOKA</h1>
  <p className="mt-4 text-sm tracking-[0.2em] text-paper/80">Shibuya, Tokyo</p>
</div>
```

About 部分です。

```tsx
<div
  className={`absolute inset-0 flex flex-col items-center justify-center px-6 text-center transition-opacity duration-500 ${
    showAbout ? 'opacity-100' : 'opacity-0'
  }`}
>
  ...
</div>
```

### 29.1 タイトルの表示条件

```tsx
progress < 0.4 ? 'opacity-100' : 'opacity-0'
```

- `progress` が 0.4 未満：表示
- `progress` が 0.4 以上：透明

### 29.2 About の表示条件

```tsx
showAbout ? 'opacity-100' : 'opacity-0'
```

`showAbout` は `progress > 0.5` なので、次の条件です。

- `progress` が 0.5 より大きい：表示
- それ以外：透明

### 29.3 切り替え区間

コード上は次のような区間になります。

```text
progress 0.0 ～ 0.4 : タイトル表示
progress 0.4 ～ 0.5 : タイトルが消える。About はまだ透明
progress 0.5 ～ 1.0 : About 表示
```

画像の切り替えは 0.5 を境に行われ、タイトルは 0.4 から消え始めるため、完全に同時ではありません。

---

## 30. About の文章について

現在の `Hero.tsx` では、About の文章に新潟県新潟市黒埼の店舗背景が書かれています。

```tsx
<p className="mx-auto mt-6 max-w-xl text-sm leading-loose text-paper/90 sm:text-base">
  COFFEE KATAOKA は、新潟県新潟市黒埼にある
  農機具小屋を改装した自家焙煎のコーヒー屋です。
  この町は、お米や枝豆をはじめ、農業がとても身近にある地域。
  日々の風景の中に、生産者の姿が自然とあります。

  そんな土地に立っていると、コーヒーにとって大切な
  「根っこ（ルーツ）」を思わずにはいられません。
  誰が、どんな環境で育ててくれた豆なのか。
  そして歴史の中で、コーヒーがどんなふうに
  人々の暮らしに寄り添ってきたのか。

  COFFEE KATAOKA は、その“巡り”の一員として、
  ここ黒埼で焙煎した一杯を、
  みなさんの生活にそっと届けたいと思っています。
  その一杯が、あなたの温かい時間につながったら嬉しいです。
</p>
```

### 30.1 JSX 内の改行

JSX のテキスト内でソースコードを改行しても、HTML では通常の空白として扱われます。

そのため、文章中の空行を画面上の段落として確実に表示したい場合は、次のような書き方もできます。

```tsx
<p>
  1段落目の文章です。
  <br />
  <br />
  2段落目の文章です。
</p>
```

または、文章を配列にして段落ごとに表示する方法もあります。

```tsx
const paragraphs = [
  '1段落目の文章です。',
  '2段落目の文章です。',
]

<div>
  {paragraphs.map((paragraph) => (
    <p key={paragraph}>{paragraph}</p>
  ))}
</div>
```

現在のコードは文章の内容を JSX に直接書くシンプルな構成です。見た目上も段落間の余白を明確にしたい場合は、後者のように段落を分けると管理しやすくなります。

---

## 31. `absolute` と `relative` の関係

Hero では、親要素に `relative`、子要素に `absolute` が指定されています。

```tsx
<section className="relative h-[200vh]">
  <img className="absolute inset-0 ..." />
</section>
```

`absolute` の要素は、近くにある `relative` の親要素を基準に配置されます。

Hero 内では、画像と文章を同じ位置に重ねるために使っています。

```text
relative の Hero コンテナ
├── absolute の画像1
├── absolute の画像2
├── absolute のタイトル
└── absolute の About
```

画像とテキストが通常の縦並びにならず、同じ画面上で重なるのは、この配置指定があるためです。

---

## 32. `News.tsx` の仕組み

ニュース一覧は次のように表示されています。

```tsx
function News() {
  return (
    <section id="news" className="scroll-mt-24 bg-stone px-6 py-24">
      <div className="mx-auto max-w-3xl">
        <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">NEWS</h2>
        <ul className="mt-12 divide-y divide-line border-t border-b border-line">
          {newsItems.map((item) => (
            <li key={item.title} className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-8">
              <span className="shrink-0 text-sm text-ink-soft">{item.date}</span>
              <span className="text-sm sm:text-base">{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
```

### 32.1 ニュースデータ

```tsx
import { newsItems } from '../data/news'
```

`news.ts` からニュース配列を読み込んでいます。

```tsx
export interface NewsItem {
  date: string
  title: string
}
```

ニュース1件の型は、日付とタイトルを持ちます。

### 32.2 レスポンシブなニュース行

```tsx
flex flex-col gap-1 py-5 sm:flex-row sm:gap-8
```

- モバイルでは日付とタイトルを縦方向に並べる
- `sm` 以上では横方向に並べる

---

## 33. `Products.tsx` の仕組み

商品の一覧部分です。

```tsx
<section id="products" className="scroll-mt-24 px-6 py-24">
  <div className="mx-auto max-w-6xl">
    <h2 className="text-center font-mincho text-2xl tracking-widest sm:text-3xl">ONLINE STORE</h2>
    <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  </div>
</section>
```

`grid-cols-2 sm:grid-cols-3 lg:grid-cols-4` で、画面幅に応じて商品カードの列数を変えています。

---

## 34. `Access.tsx` の仕組み

店舗情報も配列から表示しています。

```tsx
{shops.map((shop) => (
  <div key={shop.id} className="bg-paper">
    ...
  </div>
))}
```

店舗データは `shops.ts` にあります。

```tsx
export interface Shop {
  id: string
  name: string
  address: string
  hours: string
  closedOn: string
  image: string
  sns: { label: string; href: string }[]
}
```

店舗ごとに SNS の数が違うため、SNS もさらに `map` しています。

```tsx
{shop.sns.map((sns) => {
  const Icon = snsIcons[sns.label]
  return (
    <a key={sns.label} href={sns.href} aria-label={`${shop.name} ${sns.label}`}>
      <Icon className="h-5 w-5" />
    </a>
  )
})}
```

### 34.1 コンポーネントを変数に入れる

```tsx
const Icon = snsIcons[sns.label]
```

`snsIcons` は、SNS 名とアイコンコンポーネントの対応表です。

```tsx
const snsIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  X: XIcon,
  LINE: LineIcon,
}
```

SNS のラベルに応じて、表示するアイコンを選んでいます。

```tsx
<Icon className="h-5 w-5" />
```

大文字で始まる変数を JSX タグとして使うことで、選択されたアイコンコンポーネントを表示できます。

---

## 35. `icons.tsx` の SVG コンポーネント

`icons.tsx` には、メニュー、閉じる、カート、ユーザーなどのアイコンが定義されています。

```tsx
interface IconProps {
  className?: string
}
```

`className` は省略可能な文字列です。

例えば、次のように使います。

```tsx
<MenuIcon className="h-5 w-5" />
```

コンポーネント側では受け取ったクラスを SVG に渡します。

```tsx
export function MenuIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      ...
    </svg>
  )
}
```

同じアイコンを複数箇所で使い回せるように、コンポーネント化しています。

---

## 36. `Footer.tsx` の現在年表示

Footer では、現在の年を JavaScript で取得しています。

```tsx
<p>© {new Date().getFullYear()} Coffee Kataoka. All Rights Reserved.</p>
```

`new Date()` は現在日時を表すオブジェクトを作ります。

```tsx
new Date().getFullYear()
```

で、現在の西暦年だけを取り出せます。

そのため、年が変わってもコードを手動で修正する必要がありません。

---

## 37. `transition` と `hover` の動き

このプロジェクトでは、スクロール以外にも CSS の hover アニメーションがあります。

### 37.1 商品画像の拡大

```tsx
<div className="group">
  <img className="transition-transform duration-500 group-hover:scale-105" />
</div>
```

親に `group` を付けると、子要素から `group-hover:` を使えます。

- カードにマウスを乗せる
- 画像が `scale-105` になる
- 500ms かけて拡大する

### 37.2 リンクの色や透明度

```tsx
className="transition-colors hover:opacity-70"
```

- `hover:opacity-70`：マウスを乗せたときに少し透明にする
- `transition-colors`：色の変化を滑らかにする

---

## 38. スクロール処理を実現しているコード一覧

今回のサイトでスクロールに関係するコードは、主に次のとおりです。

### Hero のスクロール演出

[Hero.tsx](../01_front/src/components/Hero.tsx)

```tsx
const sectionRef = useRef<HTMLDivElement>(null)
const [progress, setProgress] = useState(0)
```

```tsx
const rect = el.getBoundingClientRect()
const scrollable = rect.height - window.innerHeight
const next = scrollable > 0 ? Math.min(Math.max(-rect.top / scrollable, 0), 1) : 0
setProgress(next)
```

```tsx
<section className="relative h-[200vh]">
  <div className="sticky top-0 h-screen overflow-hidden">
```

```tsx
transition-opacity duration-700
transition-opacity duration-500
```

### ヘッダーの表示・非表示

[Header.tsx](../01_front/src/components/Header.tsx)

```tsx
const show = window.scrollY < 40
setVisible(show)
```

```tsx
fixed inset-x-0 top-0
transition-all duration-500
```

### ページ内リンクのスムーズスクロール

[index.css](../01_front/src/index.css)

```css
html {
  @apply scroll-smooth;
}
```

[Header.tsx](../01_front/src/components/Header.tsx)

```tsx
<a href="#news">NEWS</a>
<a href="#access">ACCESS</a>
```

[News.tsx](../01_front/src/components/News.tsx) など

```tsx
<section id="news" className="scroll-mt-24 ...">
```

---

## 39. スクロール時に React の中で起きていること

Hero のスクロールを例にすると、処理の流れは次のとおりです。

```text
1. ユーザーがページをスクロールする
   ↓
2. window の scroll イベントが発生する
   ↓
3. onScroll 関数が実行される
   ↓
4. Hero の現在位置を getBoundingClientRect() で取得する
   ↓
5. 位置を 0 ～ 1 の progress に変換する
   ↓
6. setProgress(next) で state を更新する
   ↓
7. Hero コンポーネントが再描画される
   ↓
8. progress に応じた Tailwind クラスが適用される
   ↓
9. CSS transition によって画像や文字がフェードする
```

重要なのは、スクロール位置を直接 CSS に渡しているのではなく、いったん React の state に保存している点です。

```tsx
setProgress(next)
```

この state が変更されると、React が JSX を再評価します。

```tsx
showAbout ? 'opacity-0' : 'opacity-45'
```

この条件が変化することで、適用される CSS クラスも変わります。

---

## 40. このコードで使われている React Hook のまとめ

| Hook | このプロジェクトでの用途 |
| --- | --- |
| `useState` | メニューの開閉、ヘッダーの表示、Hero の進捗を管理 |
| `useEffect` | スクロールイベントの登録と解除 |
| `useRef` | Hero の DOM 要素を参照 |

### `useState`

画面の状態を保存し、変更時に再描画します。

```tsx
const [progress, setProgress] = useState(0)
```

### `useEffect`

コンポーネントの表示以外の処理を行います。

```tsx
useEffect(() => {
  window.addEventListener('scroll', onScroll)
  return () => window.removeEventListener('scroll', onScroll)
}, [])
```

### `useRef`

DOM 要素への参照を保持します。

```tsx
const sectionRef = useRef<HTMLDivElement>(null)
```

---

## 41. `useEffect` の末尾にある `[]` の意味

```tsx
useEffect(() => {
  ...
}, [])
```

末尾の `[]` は依存配列です。

空の配列の場合、基本的にはコンポーネントが表示されたときに処理を設定し、破棄されるときにクリーンアップします。

今回のようにイベントリスナーを登録する処理では、コンポーネントの再描画ごとに登録し直す必要がないため、空の依存配列を使っています。

---

## 42. Vite の役割

`package.json` の scripts には次のコマンドがあります。

```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### `npm run dev`

開発サーバーを起動します。

```bash
npm run dev
```

コードを変更すると、Vite の HMR によってブラウザの表示が更新されます。

### `npm run build`

本番用ファイルを作成します。

```bash
npm run build
```

このプロジェクトでは、次の順に実行されます。

```text
tsc -b
  ↓
vite build
```

まず TypeScript のチェックを行い、その後 Vite が本番用にビルドします。

### `npm run lint`

ESLint でコードをチェックします。

```bash
npm run lint
```

### `npm run preview`

ビルド済みファイルをローカルで確認するためのサーバーを起動します。

---

## 43. ESLint の設定

`eslint.config.js` では、JavaScript、TypeScript、React Hooks、React Refresh 用のルールを読み込んでいます。

```tsx
extends: [
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  reactRefresh.configs.vite,
]
```

React Hooks のルールがあるため、`useEffect` の使い方や依存配列に問題があると警告・エラーとして検出される場合があります。

---

## 44. このプロジェクトを読むおすすめの順番

React に慣れていない場合は、次の順番で読むと理解しやすいです。

1. `src/main.tsx`
2. `src/App.tsx`
3. `src/components/Products.tsx`
4. `src/components/ProductCard.tsx`
5. `src/data/products.ts`
6. `src/components/Header.tsx`
7. `src/components/Hero.tsx`
8. `src/index.css`

### 最初に `main.tsx`

React アプリの起動方法を確認します。

### 次に `App.tsx`

ページ全体のコンポーネント構成を確認します。

### その後 `Products.tsx`

`map`、props、`key` の関係を確認できます。

### `Header.tsx`

`useState`、`useEffect`、クリックイベント、スクロールイベントがまとまっています。

### 最後に `Hero.tsx`

`useRef`、スクロール位置の計算、`sticky`、条件付きクラス、CSS transition が組み合わされています。

---

## 45. 変更するときの目安

### 商品を追加・変更したい場合

次を編集します。

```text
src/data/products.ts
```

### 商品カードの見た目を変更したい場合

次を編集します。

```text
src/components/ProductCard.tsx
```

### 商品一覧の列数や余白を変更したい場合

次を編集します。

```text
src/components/Products.tsx
```

### ヘッダーの表示位置やメニューを変更したい場合

次を編集します。

```text
src/components/Header.tsx
```

### ヘッダーを消すスクロール位置を変更したい場合

次の `40` を変更します。

```tsx
const show = window.scrollY < 40
```

例えば 80px にすると、80px 未満までヘッダーが表示されます。

```tsx
const show = window.scrollY < 80
```

### Hero の切り替え位置を変更したい場合

次の `0.5` を変更します。

```tsx
const showAbout = progress > 0.5
```

例えば 0.7 にすると、Hero の 70% 付近で About が表示されます。

```tsx
const showAbout = progress > 0.7
```

タイトルが消え始める位置は、次の `0.4` です。

```tsx
progress < 0.4 ? 'opacity-100' : 'opacity-0'
```

### Hero のスクロール区間を長くしたい場合

次の `200vh` を変更します。

```tsx
<section className="relative h-[200vh]">
```

例えば `300vh` にすると、Hero の sticky 表示をより長いスクロール区間で見せられます。

ただし、進捗計算は section の高さをもとに自動で計算されるため、通常は計算式を変更する必要はありません。

---

## 46. 注意しておきたい仮実装

現在のコードには、サイトの骨格を確認するための仮リンクや仮画像があります。

### `href="#"`

```tsx
<a href="#">SUBSCRIPTION</a>
```

`href="#"` は、実際のページではなくページ上部へ移動する仮リンクです。

本番で使う場合は、実際の URL やページ内 ID に置き換えます。

### `picsum.photos`

```tsx
https://picsum.photos/seed/kataoka-hero-01/1600/1000
```

画像には Lorem Picsum のランダム画像サービスを使っています。

本番公開する場合は、実際の店舗写真や商品写真の URL に置き換えることを検討します。

### SNS の `href: '#'

`shops.ts` の SNS リンクも、現在は `#` の仮リンクです。

実際の Instagram、X、LINE の URL を設定する必要があります。

---

## 47. まとめ

このサイトの特徴的な部分は、JavaScript と CSS の役割を組み合わせてスクロール演出を作っていることです。

```text
React
  useEffect でスクロールイベントを監視
  useRef で Hero の位置と高さを取得
  useState で progress を保存

Tailwind CSS
  h-[200vh] でスクロール区間を作る
  sticky で表示領域を固定する
  opacity-0 / opacity-45 で表示状態を切り替える
  transition-opacity でフェードさせる

HTML
  id と href="#..." でページ内リンクを作る

CSS
  scroll-smooth でページ内移動を滑らかにする
```

Hero のスクロール演出だけを短くまとめると、次の流れです。

```text
Hero を 200vh にする
  ↓
中身を sticky + h-screen にする
  ↓
スクロールイベントで現在位置を取得する
  ↓
現在位置を progress = 0 ～ 1 に変換する
  ↓
progress に応じてクラスを切り替える
  ↓
transition-opacity で画像と文章をフェードさせる
```

React で重要なのは、画面に表示される内容を直接書き換えるのではなく、状態を変更して再描画させることです。

```tsx
setProgress(next)
```

この状態変更を起点に、次の JSX の条件が変わります。

```tsx
showAbout ? 'opacity-0' : 'opacity-45'
```

その結果として、Tailwind のクラスが変わり、ブラウザが CSS transition を実行します。

この「状態を変更する → JSX が変わる → CSS で見た目が変わる」という流れが、今回の React 実装を理解するうえでの中心です。
