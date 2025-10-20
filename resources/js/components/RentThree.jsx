import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";

function RentThree() {
    const { t } = useTranslation();

    const cart = useRef(JSON.parse(sessionStorage.getItem("cart")) || []);
    const total = useRef(cart.current.reduce((sum, item) => sum + item.cost * (item.qty || 1), 0));

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        // Fetch PaymentIntent client secret from your backend
        fetch(`/api/payment?amount=${encodeURIComponent(total.current)}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        })
        .then(res => res.json())
        .then(data => {
            setStripePromise(loadStripe(data.stripePublicKey));
            setClientSecret(data.clientSecret);
        });
    }, []);

    if (!clientSecret || !stripePromise) {
        return <div className="min-h-screen w-full bg-gray-100 animate-pulse"></div>;
    }

    return(
        <div className="w-full h-full flex flex-col gap-10 border-black border-2">
            <div className="flex flex-col gap-10">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentThree.title")}</h1>
                <div className="flex flex-col">
                    <h3 className="text-xl font-semibold">Cart</h3>
                    <div className="flex flex-1 flex-col gap-5 sm:flex-row">
                        <div className="basis-1/2 flex flex-col flex-1 border-2 border-red-500">
                            <div className="flex-1 overflow-y-auto">
                                {cart.current.map(item => (
                                    <div
                                    key={item.name}
                                    className="p-2">
                                        <span className="flex justify-between">{item.name} <span className="text-black">Price: {item.cost}</span></span>
                                        <span>Quantity: {item.qty}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-between p-2">
                                <span>Total Cost: </span>
                                <span>${total.current}</span>
                            </div>
                        </div>
                        <div className="basis-1/2">
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret }}>
                                    <PaymentForm />
                                </Elements>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RentThree;