import React, { useEffect, useState, useRef } from 'react';
import { useTranslation } from "react-i18next";
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import RentalPeriod from './RentalPeriod'; 

function PaymentForm({setRentalDays, subtotal}) {
  const { t } = useTranslation();
  const stripe = useStripe();
  const elements = useElements();

  const form = JSON.parse(sessionStorage.getItem("form")) || [];
  const addressRef = useRef();
  const [addressError, setAddressError] = useState("");

  const [submitError, setSubmitError] = useState("");
  

  const handleAddress = () => {
    return form["address"]; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!subtotal) {
        setSubmitError("Please add items to your cart before attempting to checkout.")
        return;
      } else {
        setSubmitError("");
      }
      if (!addressRef.current.value) {
        setAddressError("Please pick an address before continuing.");
        return;
      } else {
        setAddressError("");
      }

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
                  <label htmlFor="firstname" className='block'>{t("paymentForm.firstName")}</label>
                  <input type="text" id='firstname' className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
              </div>
              <div className='basis-1/2'>
                  <label htmlFor="lastname" className='block'>{t("paymentForm.lastName")}</label>
                  <input type="text" id='lastname' className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
              </div>
          </div>
          <div>
              <label htmlFor="email" className='block'>{t("paymentForm.email")}</label>
              <input type="email" id='email' className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
          </div>
          <div>
            <label htmlFor="rentalperiod" className='block'>{t("paymentForm.rentalPeriod")}</label>
            <RentalPeriod setRentalDays={setRentalDays} className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out'/>
          </div>
          <div>
              <label htmlFor="address" className='block'>{t("paymentForm.address")}</label>
              <input type="text" id='address' ref={addressRef} value={handleAddress()} className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' readOnly required/>
              {addressError && <p className='text-[#df1b41] text-[14.88px]'>{addressError}</p>} {/* Show error text if it exists */}
          </div>
      </div>
      <div className='flex-1 flex flex-col justify-between gap-5'>
        <PaymentElement options={{ layout : 'tabs' }} />
        <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white' disabled={!stripe} value={t("paymentForm.submit")}/>
        {submitError && <p className='text-[#df1b41] text-[14.88px] text-center'>{submitError}</p>} {/* Show error text if it exists */}
      </div>
    </form>
  )

}

export default PaymentForm;
