import { useState, type FormEvent } from 'react'
import PageBanner from '../components/PageBanner'

function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setSubmitted(true)
  }

  return (
    <>
      <PageBanner
        title="CONTACT"
        description="ご注文・卸のご相談・その他お問い合わせは、下記フォームよりご連絡ください。"
      />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-xl">
          {submitted ? (
            <p className="border border-line bg-stone px-6 py-12 text-center text-sm leading-loose text-ink-soft">
              お問い合わせありがとうございます。
              <br />
              内容を確認の上、担当者よりご連絡いたします。
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div>
                <label htmlFor="name" className="block text-xs tracking-widest text-ink-soft">
                  お名前 <span className="text-ink">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-xs tracking-widest text-ink-soft">
                  メールアドレス <span className="text-ink">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-xs tracking-widest text-ink-soft">
                  件名
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-xs tracking-widest text-ink-soft">
                  お問い合わせ内容 <span className="text-ink">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={6}
                  required
                  className="mt-2 w-full border border-line bg-paper px-4 py-3 text-sm outline-none focus:border-ink"
                />
              </div>
              <button
                type="submit"
                className="w-full border border-ink px-6 py-3 text-[11px] tracking-widest transition-colors hover:bg-ink hover:text-paper"
              >
                送信する
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}

export default ContactPage
