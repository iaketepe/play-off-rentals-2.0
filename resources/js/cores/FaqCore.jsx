

function FaqCore() {
    return(
        <div className="border-2 border-black flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className="border-2 border-black w-full max-w-6xl flex flex-col gap-5">
                <div className="w-full h-full flex flex-col gap-10">
                    <h1 className='inline text-black text-4xl font-semibold'>FAQ</h1>
                    <div className="text-white flex flex-col gap-10">
                        <details className="border-red-500 bg-slate-500 border-2 p-5 space-y-5">
                            <summary className="text-xl font-semibold">How is Pricing Calculated?</summary>
                            <p className="bg-white text-black p-5 rounded-lg">Pricing is based on:

the subtotal of the machines,

multiplied by the number of rental days,

plus tax, and

a service fee (either $25 or 7%, whichever is higher).

💡 Example: If your machines total $200 for 3 days, your base cost is $600 + tax + service fee.</p>
                        </details>

                    </div>
                </div>
            </div>
        </div>
    );
}   

export default FaqCore;