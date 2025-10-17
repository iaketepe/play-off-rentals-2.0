import React, { useEffect, useState } from 'react';
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href, // redirect after payment
      },
    });

    if (error) {
      console.log(error.message);
    } else {
      console.log('Payment processing...');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-5'>
      <PaymentElement options={{ fields: { billingDetails: 'auto' }, wallets: 'auto' }} />
      <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full' disabled={!stripe} value="Submit"/>
    </form>
  );

}

export default PaymentForm;
