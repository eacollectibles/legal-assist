import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle, Loader, Plus, CreditCard, DollarSign } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { PaymentRecord, CurrentUser } from './types';

interface PaymentsTabProps {
  currentUser: CurrentUser;
  payments: PaymentRecord[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentRecord[]>>;
  isLoadingPayments: boolean;
}

export default function PaymentsTab({ 
  currentUser, 
  payments, 
  setPayments, 
  isLoadingPayments 
}: PaymentsTabProps) {
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentFormData, setPaymentFormData] = useState({
    amount: '',
    serviceType: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState('');

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPaymentError('');

    if (!paymentFormData.amount || !paymentFormData.serviceType) {
      setPaymentError('Please fill in all required fields');
      return;
    }

    if (!paymentFormData.cardNumber || !paymentFormData.expiryDate || !paymentFormData.cvv) {
      setPaymentError('Please enter valid payment details');
      return;
    }

    setIsProcessingPayment(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      const paymentRecord: PaymentRecord = {
        _id: `${currentUser?.email}-${crypto.randomUUID()}`,
        paymentAmount: parseFloat(paymentFormData.amount),
        serviceType: paymentFormData.serviceType,
        paymentDate: new Date(),
        paymentStatus: 'Paid',
        transactionId: `TXN-${Date.now()}`,
      };

      await BaseCrudService.create('paymentrecords', paymentRecord);

      setPayments(prev => [paymentRecord, ...prev]);
      setPaymentSuccess(true);
      setPaymentFormData({
        amount: '',
        serviceType: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
      });
      setShowPaymentForm(false);

      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (error) {
      console.error('Failed to process payment:', error);
      setPaymentError('Payment processing failed. Please try again.');
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div>
      {paymentSuccess && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-heading font-bold text-green-900 mb-1">Payment Successful!</h3>
            <p className="font-paragraph text-green-800">Your payment has been processed successfully.</p>
          </div>
        </div>
      )}

      {/* Payment Form */}
      <div className="mb-12">
        {!showPaymentForm ? (
          <Button
            onClick={() => setShowPaymentForm(true)}
            className="bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Make a Payment
          </Button>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="font-heading text-2xl">Make a Payment</CardTitle>
              <CardDescription className="font-paragraph">
                Enter payment details to process your transaction
              </CardDescription>
            </CardHeader>
            <CardContent>
              {paymentError && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="font-paragraph text-red-800">{paymentError}</p>
                </div>
              )}

              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="amount" className="block font-paragraph font-semibold text-foreground mb-2">
                      Payment Amount *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/60" />
                      <Input
                        id="amount"
                        type="number"
                        step="0.01"
                        min="0"
                        value={paymentFormData.amount}
                        onChange={(e) => setPaymentFormData(prev => ({ ...prev, amount: e.target.value }))}
                        placeholder="0.00"
                        className="border-gray-300 pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="serviceType" className="block font-paragraph font-semibold text-foreground mb-2">
                      Service Type *
                    </label>
                    <Select 
                      value={paymentFormData.serviceType} 
                      onValueChange={(value) => setPaymentFormData(prev => ({ ...prev, serviceType: value }))}
                    >
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select service" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Small Claims Court">Small Claims Court</SelectItem>
                        <SelectItem value="Landlord & Tenant Board">Landlord & Tenant Board</SelectItem>
                        <SelectItem value="Human Rights Tribunal">Human Rights Tribunal</SelectItem>
                        <SelectItem value="Traffic Tickets">Traffic Tickets</SelectItem>
                        <SelectItem value="Mediation Services">Mediation Services</SelectItem>
                        <SelectItem value="Criminal Matters">Criminal Matters</SelectItem>
                        <SelectItem value="Bail Hearings">Bail Hearings</SelectItem>
                        <SelectItem value="Notary Public">Notary Public</SelectItem>
                        <SelectItem value="Commissioner of Oaths">Commissioner of Oaths</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-200">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cardNumber" className="block font-paragraph font-semibold text-foreground mb-2">
                        Card Number *
                      </label>
                      <Input
                        id="cardNumber"
                        type="text"
                        value={paymentFormData.cardNumber}
                        onChange={(e) => setPaymentFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="border-gray-300"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiryDate" className="block font-paragraph font-semibold text-foreground mb-2">
                          Expiry Date *
                        </label>
                        <Input
                          id="expiryDate"
                          type="text"
                          value={paymentFormData.expiryDate}
                          onChange={(e) => setPaymentFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                          placeholder="MM/YY"
                          maxLength={5}
                          className="border-gray-300"
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block font-paragraph font-semibold text-foreground mb-2">
                          CVV *
                        </label>
                        <Input
                          id="cvv"
                          type="text"
                          value={paymentFormData.cvv}
                          onChange={(e) => setPaymentFormData(prev => ({ ...prev, cvv: e.target.value }))}
                          placeholder="123"
                          maxLength={4}
                          className="border-gray-300"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    type="submit"
                    disabled={isProcessingPayment}
                    className="bg-primary hover:bg-primary/90 text-white font-semibold py-3 flex items-center gap-2"
                  >
                    {isProcessingPayment ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        Process Payment
                      </>
                    )}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => {
                      setShowPaymentForm(false);
                      setPaymentError('');
                    }}
                    variant="outline"
                    className="border-gray-300 text-foreground hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="font-heading text-2xl">Payment History</CardTitle>
          <CardDescription className="font-paragraph">
            View your past transactions and payment records
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingPayments ? (
            <div className="text-center py-12">
              <Loader className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
              <p className="font-paragraph text-foreground/80">Loading payment history...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-12 text-center">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="font-paragraph text-foreground/80 mb-4">
                No payment records yet. Make your first payment to get started.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {payments.map(payment => (
                <div key={payment._id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className="font-heading text-lg font-bold text-foreground">
                          {payment.serviceType}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-paragraph font-semibold ${
                          payment.paymentStatus === 'Paid'
                            ? 'bg-green-100 text-green-800'
                            : payment.paymentStatus === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {payment.paymentStatus}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="font-paragraph text-foreground/60">Amount</p>
                          <p className="font-paragraph font-semibold text-foreground text-lg">
                            ${payment.paymentAmount?.toFixed(2)}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-foreground/60">Transaction ID</p>
                          <p className="font-paragraph font-semibold text-foreground">
                            {payment.transactionId}
                          </p>
                        </div>
                        <div>
                          <p className="font-paragraph text-foreground/60">Date</p>
                          <p className="font-paragraph font-semibold text-foreground">
                            {payment.paymentDate instanceof Date
                              ? payment.paymentDate.toLocaleDateString()
                              : new Date(payment.paymentDate || '').toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
