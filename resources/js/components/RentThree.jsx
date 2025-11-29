import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from "./PaymentForm";

function RentThree() {
    const { t, i18n } = useTranslation();
    const [rentalDays, setRentalDays] = useState(1);
    const cart = useRef(JSON.parse(sessionStorage.getItem("cart")) || []);
    const [subtotal, setSubTotal] = useState(cart.current.reduce((sum, item) => sum + item.cost * (item.qty || 1) * rentalDays, 0));
    const [serviceFee, setServiceFee] = useState(Math.round(Math.max(25, subtotal * 0.07) * 100) / 100);
    const [HST, setHST] = useState(Math.round(subtotal * 0.13 * 100) / 100);
    const [total, setTotal] = useState(Math.round((subtotal + serviceFee + HST) * 100) / 100);

    useEffect(() => {
        const newSubTotal = cart.current.reduce((sum, item) => sum + item.cost * (item.qty || 1) * rentalDays, 0);
        const newServiceFee = Math.round(Math.max(25, newSubTotal * 0.07) * 100) / 100;
        const newHST = Math.round(newSubTotal * 0.13 * 100) / 100;
        const newTotal = Math.round((newSubTotal + newServiceFee + newHST) * 100) / 100;

        setSubTotal(newSubTotal);
        setServiceFee(newServiceFee);
        setHST(newHST);
        setTotal(newTotal);
    }, [rentalDays]);

    

    const [stripePromise, setStripePromise] = useState(null);
    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        fetch(`/api/payment?amount=${encodeURIComponent(total)}`, {
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
        return <div className="w-full h-full flex flex-col gap-10">
                <div className="h-15 w-full bg-gray-300 rounded mb-1 animate-pulse"></div>
                <div className="bg-gray-500 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="rounded-lg p-2 py-3 bg-gray-400 animate-pulse">
                            <div className="h-64 w-full bg-gray-300 rounded mb-2"></div>
                            <div className="space-y-5">
                                <div className="h-6 w-3/4 bg-gray-300 rounded mb-1"></div>
                                <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
                                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>;
    }

    return(
        <div className="w-full h-full flex flex-col gap-10">
            <div className="flex flex-col gap-10">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentThree.title")}</h1>
                <span className="text-xs text-center">{t("rentThree.sideNote")}</span>
                <div className="flex flex-col">
                    <span className="text-xl font-semibold">{t("rentThree.cart")}</span>
                    <div className="flex flex-1 flex-col gap-5 sm:flex-row">
                        <div className="basis-1/2 flex flex-col flex-1">
                            <div className="flex-1 overflow-y-auto">
                                {cart.current.map(item => (
                                    <div
                                    key={item.name}
                                    className="p-2">
                                        <span className="flex justify-between">{item.name} <span className="text-black">${item.cost}</span></span>
                                        <span>Quantity: {item.qty}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col justify-between p-2 border-t-2 border-black">
                                <div className="flex justify-between">
                                    <span>{t("rentThree.payBreakdown.subtotal")}</span>
                                    <span>${subtotal}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t("rentThree.payBreakdown.serviceFee")}</span>
                                    <span>${serviceFee}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t("rentThree.payBreakdown.tax")}</span>
                                    <span>${HST}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>{t("rentThree.payBreakdown.total")}</span>
                                    <span>${total}</span>
                                </div>
                            </div>
                        </div>
                        <div className="basis-1/2 flex flex-col">
                            {clientSecret && (
                                <Elements stripe={stripePromise} options={{ clientSecret, locale: i18n.language }}>
                                    <PaymentForm setRentalDays={setRentalDays} subtotal={subtotal}/>
                                </Elements >
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default RentThree;