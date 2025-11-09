import { useTranslation } from "react-i18next";

function ContactCore() {

    const { t } = useTranslation();

    return(
        <div className=" border-black flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className=" border-black w-full max-w-6xl flex flex-col gap-5">
                <div className="w-full h-full flex flex-col gap-10">
                    <h1 className='inline text-black text-4xl font-semibold'>Contact</h1>
                    <div className="text-black flex flex-col gap-2 justify-center items-center">
                    </div>
                        <form  className='h-full flex flex-col justify-between gap-2'>
                            <div className='space-y-3 text-[#30313d]'>
                                <div className='flex gap-5 justify-between'>
                                    <div className='basis-1/2'>
                                        <label className='block'>{t("paymentForm.firstName")}</label>
                                        <input type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                                    </div>
                                    <div className='basis-1/2'>
                                        <label className='block'>{t("paymentForm.lastName")}</label>
                                        <input type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                                    </div>
                                </div>
                                <div>
                                    <label className='block'>{t("paymentForm.email")}</label>
                                    <input type="email" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                                </div>
                                <div>
                                    <label className='block'>{t("paymentForm.email")}</label>
                                    <input type="email" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                                </div>
                                <div>
                                    <label className='block'>{t("paymentForm.email")}</label>
                                    <textarea name="message" id="message" rows="4" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required></textarea>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col justify-between gap-5'>
                                <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white' value={t("paymentForm.submit")}/>
                            </div>
                        </form>
                </div>
            </div>
        </div>
    );
}

export default ContactCore;