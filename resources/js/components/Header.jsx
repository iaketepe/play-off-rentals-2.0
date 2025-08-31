
import React from 'react';
import { useTranslation } from "react-i18next";

function Header() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");

    return (
        <nav className="bg-slate-500 flex flex-col border-red-700 border-2 relative">
            <div className="flex p-5 pr-3 items-center justify-between">
                <div className="flex flex-1">
                    <button onClick={() => setIsOpen(!isOpen)} className="p-2 px-3 border-red-700 border-2 rounded-full"><i className="fa-solid fa-bars"></i></button>
                </div>

                <a href="/" className=""><i className="fa-solid fa-gamepad text-3xl"></i></a>
                
                <div className="flex flex-1 justify-end">
                    <a className="bg-gray-700 text-sm border-black border-2 p-4 py-2 rounded-full" href="#">{t("header.login")}</a>
                </div>
            </div>

            <div className={`absolute top-full w-full flex flex-col text-center bg-gray-800 transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <div className="p-3"><a href="/rent">{t("header.navList.rent")}</a></div>
                <div className="p-3"><a href="#">{t("header.navList.faq")}</a></div>
                <div className="p-3"><a href="#">{t("header.navList.contact")}</a></div>
                <div className="p-3"><button onClick={toggleLanguage}>{t("header.navList.lang")}</button></div>
            </div>
        </nav>
    );
}


export default Header;