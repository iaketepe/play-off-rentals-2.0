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
    <form onSubmit={handleSubmit} className='h-full flex flex-col justify-between gap-2'>
      <div className='space-y-3 text-[#30313d]'>
          <div className='flex gap-5 justify-between'>
              <div className='basis-1/2'>
                  <label className='block'>First Name: </label>
                  <input type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
              </div>
              <div className='basis-1/2'>
                  <label className='block'>Last Name: </label>
                  <input type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
              </div>
          </div>
          <div>
              <label className='block'>Address</label>
              <input type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
          </div>
          <div>

          </div>
      </div>
      <div className='flex-1 flex flex-col justify-between gap-5'>
        <PaymentElement options={{ layout : 'tabs' }} />
        <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white' disabled={!stripe} value={t("paymentForm.submit")}/>
      </div>
    </form>
  )

}

export default PaymentForm;
