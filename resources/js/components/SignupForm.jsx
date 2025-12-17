import { useTranslation } from "react-i18next";


function SignupForm({pageSwitch}) {
    const { t } = useTranslation();

    return (
            <div className="w-full max-w-[320px] h-full max-h-[25rem] p-5 border-black border-3 rounded-lg flex flex-col justify-between">
                <h1 className='inline text-black text-2xl font-semibold'>Sign Up</h1>
                <div>
                    <span className="block text-xs text-center">Need to Login? <button onClick={pageSwitch} className="underline">Click Here</button></span>
                    <div>
                        <label htmlFor="username" className='block'>{t("loginCore.username")}</label>
                        <input name="username" id="username" type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                    </div>
                    <div>
                        <label htmlFor="password" className='block'>{t("loginCore.password")}</label>
                        <input name="password" id="password" type="text" className='border border-[#e6e6e6] text-[#30313d] w-full p-2 rounded-sm shadow-sm focus:outline-none focus:ring-3 focus:ring-blue-200 focus:border-[#056fde] transition-colors duration-300 ease-in-out' required/>
                    </div>
                </div>
                <input type="submit" className='text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-gray-600 hover:text-white' value={t("loginCore.submit")}/>
            </div>
    )
}

export default SignupForm;