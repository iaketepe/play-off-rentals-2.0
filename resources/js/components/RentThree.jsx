import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";

function RentThree() {
    const { t } = useTranslation();
    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        // Fetch PaymentIntent client secret from your backend
        fetch('/api/payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => {
            setStripePromise(loadStripe(data.stripePublicKey));
            setClientSecret(data.clientSecret);
            console.log(data.clientSecret);
        });
    }, []);

    if (!clientSecret) {
        return <div></div>;
    }

    return(
        <div className="w-full h-full flex flex-col gap-10 border-black border-2">
            <div className="flex flex-col gap-10">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentThree.title")}</h1>
                <div className="flex flex-col flex-1 sm:flex-row gap-10">
                    <div className="border-2 border-red-500 w-[50%]"></div>
                    <div className="flex-1">
                        {clientSecret && (
                            <Elements stripe={stripePromise} options={{ clientSecret }}>
                                <PaymentForm />
                            </Elements>
                        )}
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RentThree;