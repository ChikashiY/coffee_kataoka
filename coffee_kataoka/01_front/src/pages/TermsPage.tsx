import PageBanner from '../components/PageBanner'
import LegalSection from '../components/LegalSection'

function TermsPage() {
  return (
    <>
      <PageBanner title="TERMS OF SERVICE" description="利用規約" />
      <section className="bg-paper px-6 py-24">
        <div className="mx-auto max-w-2xl">
          <p className="text-sm leading-loose text-ink-soft">
            この利用規約（以下「本規約」といいます）は、COFFEE KATAOKA（以下「当店」といいます）が提供するオンラインショップ「COFFEE
            KATAOKA」（以下「本サービス」といいます）の利用条件を定めるものです。ご利用いただくお客様（以下「ユーザー」といいます）には、本規約に同意いただいた上でご利用いただきます。
          </p>

          <LegalSection title="第1条（適用）">
            <p>本規約は、ユーザーと当店との間の本サービスの利用に関わる一切の関係に適用されます。</p>
          </LegalSection>

          <LegalSection title="第2条（会員登録）">
            <p>
              本サービスの一部機能の利用を希望する方は、当店の定める方法により登録を行うものとします。登録情報に虚偽があった場合、当店は登録の取り消しや利用制限を行うことがあります。
            </p>
          </LegalSection>

          <LegalSection title="第3条（禁止事項）">
            <p>ユーザーは、本サービスの利用にあたり、以下の行為をしてはなりません。</p>
            <ul className="list-disc space-y-2 pl-5">
              <li>法令または公序良俗に違反する行為</li>
              <li>犯罪行為に関連する行為</li>
              <li>当店、他のユーザーまたは第三者の知的財産権、肖像権、プライバシー等の権利を侵害する行為</li>
              <li>当店のサーバーやネットワークの機能を破壊・妨害する行為、不正アクセス行為</li>
              <li>本サービスによって得られた情報を商業的に利用する行為</li>
              <li>その他、当店が不適切と判断する行為</li>
            </ul>
          </LegalSection>

          <LegalSection title="第4条（商品の購入）">
            <p>
              ユーザーが本サービスにおいて商品の購入手続きを完了した時点で、売買契約が成立するものとします。商品の代金、送料、支払方法等については、各商品ページおよび購入手続き画面の表示によります。
            </p>
          </LegalSection>

          <LegalSection title="第5条（本サービスの提供の停止等）">
            <p>
              当店は、システムの保守点検、天災地変その他不可抗力によりサービス提供が困難と判断した場合、ユーザーに事前の通知をすることなく本サービスの全部または一部の提供を停止または中断することができるものとします。
            </p>
          </LegalSection>

          <LegalSection title="第6条（免責事項）">
            <p>
              当店は、本サービスに事実上または法律上の瑕疵がないことを明示的にも黙示的にも保証しておりません。当店は、本サービスに起因してユーザーに生じたあらゆる損害について、当店の故意または重過失による場合を除き、一切の責任を負わないものとします。
            </p>
          </LegalSection>

          <LegalSection title="第7条（サービス内容の変更等）">
            <p>
              当店は、ユーザーへの事前の告知なく、本サービスの内容を変更、追加または廃止することがあり、ユーザーはこれを承諾するものとします。
            </p>
          </LegalSection>

          <LegalSection title="第8条（利用規約の変更）">
            <p>
              当店は、必要と判断した場合には、ユーザーに通知することなく本規約を変更することができるものとします。変更後の規約は、本ページに掲載した時点から効力を生じます。
            </p>
          </LegalSection>

          <LegalSection title="第9条（準拠法・裁判管轄）">
            <p>
              本規約の解釈にあたっては、日本法を準拠法とします。本サービスに関して紛争が生じた場合には、当店所在地を管轄する裁判所を専属的合意管轄とします。
            </p>
          </LegalSection>

          <p className="mt-10 text-right text-xs text-ink-soft">制定日：2026年9月28日</p>
        </div>
      </section>
    </>
  )
}

export default TermsPage
