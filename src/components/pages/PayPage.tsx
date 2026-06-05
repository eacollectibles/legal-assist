import { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PaymentForm, { type PaymentType, type PaymentFormDefaults } from '@/components/payments/PaymentForm';
import EtransferOption from '@/components/payments/EtransferOption';

/**
 * Public payment page at /pay.
 *
 * Anyone with the link can pay — used when the firm sends an invoice or
 * retainer request and wants the client to be able to pay without logging
 * in. The page reads optional query params so the firm can send pre-filled
 * deep links generated from the paralegal Payments page:
 *
 *   /pay
 *     ?type=invoice_payment           // 'trust_deposit' | 'invoice_payment' | 'consultation'
 *     &amount=500                     // dollars (string)
 *     &file=POA-2026-001              // matter reference / invoice id
 *     &client=<clientId>              // optional, links the payment to a client record
 *     &name=William%20Worth           // optional cardholder/client name
 *     &email=client@example.com       // optional, email used for receipt
 *     &note=Final%20payment           // optional free-text note
 */
export default function PayPage() {
  const [defaults, setDefaults] = useState<PaymentFormDefaults>({});

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    const t = params.get('type');
    const allowedTypes: PaymentType[] = ['trust_deposit', 'invoice_payment', 'consultation'];
    setDefaults({
      paymentType: allowedTypes.includes(t as PaymentType) ? (t as PaymentType) : undefined,
      amountDollars: params.get('amount') || undefined,
      matterReference: params.get('file') || undefined,
      clientId: params.get('client') || undefined,
      clientName: params.get('name') || undefined,
      buyerEmail: params.get('email') || undefined,
      note: params.get('note') || undefined,
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 w-full">
        <section className="max-w-3xl mx-auto px-4 md:px-8 py-12 md:py-16">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-3">
            Pay Legal Assist
          </h1>
          <p className="font-paragraph text-foreground/70 mb-8">
            Use this page to make a secure payment by credit or debit card. Payments are
            processed by Square. Funds are deposited into Legal Assist&rsquo;s trust account
            and are released to the firm only as work is performed and billed, in accordance
            with Law Society of Ontario By-Law 9.
          </p>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-8 shadow-sm">
            <PaymentForm defaults={defaults} />
          </div>

          {/* F-G: Interac e-Transfer as an alternative payment method.
              Lower processing fee ($0.50 vs Square's 2.9% + $0.30).
              Reference number maps the incoming auto-deposit back
              to the right matter for manual reconciliation. */}
          <EtransferOption
            amountDollars={Number(defaults.amountDollars) || 0}
            fileId={defaults.matterReference}
            clientId={defaults.clientId}
            clientName={defaults.clientName}
          />

          <p className="mt-6 text-xs text-foreground/50">
            Legal Assist Paralegal Services &middot; Operated by Jean-Francois Demers, Licensed Paralegal
            (Law Society of Ontario), Licence No. P22020.
          </p>
        </section>
      </main>
      <Footer />
    </div>
  );
}
