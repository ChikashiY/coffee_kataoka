interface PageBannerProps {
  title: string
  description?: string
}

function PageBanner({ title, description }: PageBannerProps) {
  return (
    <div className="border-b border-line bg-stone px-6 pb-14 pt-28 text-center sm:pt-32">
      <h1 className="font-mincho text-3xl tracking-widest sm:text-4xl">{title}</h1>
      {description && <p className="mx-auto mt-4 max-w-xl text-sm text-ink-soft">{description}</p>}
    </div>
  )
}

export default PageBanner
