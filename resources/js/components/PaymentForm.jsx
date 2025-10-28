import React, { useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';

function PaymentForm() {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (!stripe || !elements) return;
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: window.location.origin, // redirect after payment
        },
      });

      if (result.error) {
        console.error('Stripe error:', result.error);
      } else {
        console.log('Payment processing...');
      }
    } catch (error) {
        console.log(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between'>
      <PaymentElement options={{ layout : 'tabs' }} />
      <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white' disabled={!stripe} value={t("paymentForm.submit")}/>
    </form>
  )

}

export default PaymentForm;
