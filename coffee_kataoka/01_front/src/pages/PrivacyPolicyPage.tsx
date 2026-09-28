import PageBanner from '../components/PageBanner'
import LegalSection from '../components/LegalSection'

function PrivacyPolicyPage() {
  return (
    <>
      <PageBanner title="PRIVACY POLICY" description="プライバシーポリシー" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm leading-loose text-ink-soft">
            COFFEE KATAOKA（以下「当店」といいます）は、お客様の個人情報の重要性を認識し、以下のとおりプライバシーポリシーを定め、個人情報の保護に努めます。
          </p>

          <LegalSection title="1. 取得する個人情報">
            <p>
              当店は、お問い合わせフォーム、オンラインショップでのご注文、会員登録などの際に、お名前、ご住所、電話番号、メールアドレス、お支払いに関する情報などをお客様よりご提供いただきます。
            </p>
          </LegalSection>

          <LegalSection title="2. 利用目的">
            <ul className="list-disc space-y-2 pl-5">
              <li>お問い合わせ対応のため</li>
              <li>商品の発送、決済処理、取引に関するご連絡のため</li>
              <li>メールマガジン・キャンペーン等のご案内のため（ご登録いただいた方に限ります）</li>
              <li>サイトの利用状況の分析、サービス改善のため</li>
            </ul>
          </LegalSection>

          <LegalSection title="3. 第三者提供について">
            <p>
              当店は、以下の場合を除き、お客様の同意なく個人情報を第三者に提供することはありません。
            </p>
            <ul className="list-disc space-y-2 pl-5">
              <li>法令に基づく場合</li>
              <li>商品の発送等、業務委託先に必要な範囲で提供する場合</li>
              <li>人の生命、身体または財産の保護のために必要な場合</li>
            </ul>
          </LegalSection>

          <LegalSection title="4. Cookie（クッキー）等の利用について">
            <p>
              当店では、サイトの利便性向上やアクセス状況の把握のため、Google
              アナリティクス等のアクセス解析ツールを利用しており、Cookieを使用してお客様のアクセス情報を収集する場合があります。これらの情報は匿名で収集されており、個人を特定するものではありません。Cookieの利用を望まない場合は、ブラウザの設定により無効化することが可能です。
            </p>
          </LegalSection>

          <LegalSection title="5. 個人情報の管理">
            <p>
              当店は、お客様の個人情報を正確かつ最新の状態に保ち、不正アクセス・紛失・破壊・改ざん・漏洩などを防止するため、適切なセキュリティ対策を実施します。
            </p>
          </LegalSection>

          <LegalSection title="6. 個人情報の開示・訂正・削除">
            <p>
              お客様がご自身の個人情報の開示、訂正、削除等をご希望される場合は、お問い合わせフォームよりご連絡ください。合理的な期間内に対応いたします。
            </p>
          </LegalSection>

          <LegalSection title="7. プライバシーポリシーの変更">
            <p>
              当店は、法令の変更やサービス内容の変更に応じて、本ポリシーを予告なく変更することがあります。変更後のプライバシーポリシーは、本ページに掲載した時点より効力を生じるものとします。
            </p>
          </LegalSection>

          <LegalSection title="8. お問い合わせ窓口">
            <p>
              本ポリシーに関するお問い合わせは、下記までご連絡ください。
              <br />
              COFFEE KATAOKA
              <br />
              お問い合わせフォーム：/contact
            </p>
          </LegalSection>

          <p className="mt-10 text-right text-xs text-ink-soft">制定日：2026年9月28日</p>
        </div>
      </section>
    </>
  )
}

export default PrivacyPolicyPage
