import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";

function AccountCore() {
    const { t } = useTranslation();

    return(
        <div className=" border-black flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className=" border-black w-full max-w-6xl flex flex-col gap-5">
                <div className="w-full h-full flex flex-col gap-10">
                    <h1 className='inline text-black text-4xl font-semibold'>{t("accountCore.title")}</h1>
                    <div className="text-white flex flex-col gap-2">
                        <div></div>
                        <div></div>
                        <button className="text-black text-center w-full p-3 py-2 border-2 border-black rounded-full cursor-pointer transition-colors duration-300 ease-in-out hover:bg-red-700 hover:text-white">{t("accountCore.delete")}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountCore;