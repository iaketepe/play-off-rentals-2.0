import { useState } from "react";
import { useTranslation } from "react-i18next";

function ArcadeCard({item}) {
    const { i18n } = useTranslation();

    const handleDescription = () => i18n.language === "en" ? item.description : item.description_fr;

    const handleCost = () => i18n.language === "en" ? `$${item.cost}/Day` : `${item.cost} $/Jour`;

    const [cardValue, setCardValue] = useState(() => {
        try {
            const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const existing = cart.find((c) => c.name === item.name);
            return existing ? existing.qty : 0;
        } catch (e) {
            console.error("Error reading Cart:", e);
            return 0;
        }
    });

    const handleAddToCart = (item_name, item_cost) => {
        try {
            const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const index = cart.findIndex(c => c.name === item_name);

            if (index > -1) {
                cart[index].qty++;
            } else {
                cart.push({ name: item_name, cost: item_cost, qty: 1 });
            }

            sessionStorage.setItem("cart", JSON.stringify(cart));
            setCardValue(cart[index > -1 ? index : cart.length - 1].qty);
        } catch (e) {
            console.error("Error on Add to Cart:", e);
        }
    };

    const handleRemoveFromCart = (item_name) => {
        try {
            let cart = JSON.parse(sessionStorage.getItem("cart")) || [];
            const index = cart.findIndex(c => c.name === item_name);

            if (index > -1) {
                if (cart[index].qty <= 1) {
                    cart.splice(index, 1);
                    setCardValue(0);
                } else {
                    cart[index].qty--;
                    setCardValue(cart[index].qty);
                }
                sessionStorage.setItem("cart", JSON.stringify(cart));
            }
        } catch (e) {
            console.error("Error on Remove from Cart:", e);
        }
    };


    return (
        <div className="bg-slate-500 text-white p-2 flex flex-col h-full rounded-lg" loading="lazy">
                <img src={item.image_path} className="bg-black w-full h-[262px] object-cover rounded-lg" alt={item.name} />
                <div className="p-3 flex flex-col flex-1 gap-3">
                    <div className="flex flex-col gap-3 flex-1 justify-between">
                        <div className="space-y-3">
                            <h2 className="text-xl font-bold">{item.name}</h2>
                            <p>{handleDescription()}</p>
                        </div>
                        <p>{handleCost()}</p>
                    </div>
                    <div className="w-full flex text-2xl justify-center">
                        <button onClick={() => handleRemoveFromCart(item.name)} className="border p-5 py-0 rounded-l-sm">-</button>
                        <label className="border p-5 py-0">{cardValue}</label>
                        <button onClick={() => handleAddToCart(item.name, item.cost)} className="border p-5 py-0 rounded-r-sm">+</button>
                    </div>
                </div>
        </div>
    )
}

export default ArcadeCard;