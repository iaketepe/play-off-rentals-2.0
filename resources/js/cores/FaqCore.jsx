

function FaqCore() {
    return(
        <div className="border-2 border-black flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className="border-2 border-black w-full max-w-6xl flex flex-col gap-5">
                <div className="w-full h-full flex flex-col gap-10">
                    <h1 className='inline text-black text-4xl font-semibold'>FAQ</h1>
                    <div className="text-white flex flex-col gap-10">
                        <details className="border-red-500 bg-slate-500 border-2 p-5">
                            <summary>Q: ...</summary>
                        </details>

                    </div>
                </div>
            </div>
        </div>
    );
}   

export default FaqCore;