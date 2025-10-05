
import { useState } from 'react';
import { useTranslation } from "react-i18next";

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");

    return (
        <nav className="bg-slate-500 flex flex-col border-red-700 border-2 relative">
            <div className="flex p-5 pr-3 items-center justify-between">
                <div className="flex flex-1">
                    <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setIsOpen(false)} className="p-2 px-3 border-red-700 border-2 rounded-full"><i className="fa-solid fa-bars"></i></button>
                </div>

                <a href="/" className=""><i className="fa-solid fa-gamepad text-3xl"></i></a>
                
                <div className="flex flex-1 justify-end">
                    <a className="bg-gray-700 text-sm border-black border-2 p-4 py-2 rounded-full" href="#">{t("header.login")}</a>
                </div>
            </div>

            <div className={`absolute top-full w-full flex flex-col text-center bg-gray-800 transition-all duration-300 z-[3000] ${isOpen ? 'max-h-96 opacity-96' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a href="/rent" className="p-3"><div>{t("header.navList.rent")}</div></a>
                <a href="#" className="p-3"><div>{t("header.navList.faq")}</div></a>
                <a href="#" className="p-3"><div>{t("header.navList.contact")}</div></a>
                <button onClick={toggleLanguage} className="p-3"><div>{t("header.navList.lang")}</div></button>
            </div>
        </nav>
    );
}


export default Header;