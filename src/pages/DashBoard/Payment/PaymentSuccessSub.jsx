import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import useAxiousS from '../../../hooks/useAxiousS';

function PaymentSuccessSub() {
  const [paymentInfo, setPaymentInfo] = useState({});
  const axiosS = useAxiousS();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (sessionId) {
      axiosS.patch(`/payment-success-sub?session_id=${sessionId}`)
        .then(res => {
          console.log(res.data);
          setPaymentInfo({
            issueId: res.data.issueId,
            issueEmail: res.data.issueEmail,
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
            message: res.data.message
          });
        })
        .catch(err => {
          console.error('payment-success error', err);
        });
    }
  }, [sessionId]);

  return (
    <div className="p-6">
      <h2 className='text-3xl mb-4'>Payment Successful ✅</h2>

      {paymentInfo.message && <p className="mb-2">Note: {paymentInfo.message}</p>}

      <p><strong>Issue ID:</strong> {paymentInfo.issueId || '—'}</p>
      <p><strong>Tracking ID:</strong> {paymentInfo.trackingId || '—'}</p>
      <p><strong>Transaction ID:</strong> {paymentInfo.transactionId || '—'}</p>
      <p><strong>Payer Email:</strong> {paymentInfo.issueEmail || '—'}</p>
    </div>
  )
}

export default PaymentSuccessSub
