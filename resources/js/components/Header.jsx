
import { useState } from 'react';
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faGamepad } from '@fortawesome/free-solid-svg-icons';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const { t, i18n } = useTranslation();

    const toggleLanguage = () => i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");

    return (
        <nav className="bg-slate-500 flex flex-col relative">
            <div className="flex p-[clamp(0.75rem,2vw,1.25rem)] pr-2 items-center justify-between">
                <div className="flex flex-1">
                    <button onClick={() => setIsOpen(!isOpen)} onBlur={() => setTimeout(() => setIsOpen(false), 150)} aria-label="Page Dropdown Menu" className="p-1 px-2 rounded-full hover:bg-gray-600 transition-colors duration-300 ease-in-out"><FontAwesomeIcon icon={faBars}/></button>
                </div>

                <a href="/" aria-label="Go to Home"><FontAwesomeIcon icon={faGamepad} className="scale-200 rounded-lg transform transition duration-300 ease-in-out hover:scale-240"/></a>
                
                <div className="flex flex-1 justify-end">
                    <a href="#" aria-label="Go to Login/Signup" className="bg-gray-700 text-xs p-4 py-2 rounded-full border-black border-2 hover:bg-gray-600 transition-colors duration-300 ease-in-out">{t("header.login")}</a>
                </div>
            </div>

            <div className={`bg-gray-800 absolute top-full w-full flex flex-col text-center transition-all duration-300 z-[3000] ${isOpen ? 'max-h-96 opacity-96' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                <a href="/rent" className="p-3 hover:underline"><div>{t("header.navList.rent")}</div></a>
                <a href="/faq" className="p-3 hover:underline"><div>{t("header.navList.faq")}</div></a>
                <a href="/contact" className="p-3 hover:underline"><div>{t("header.navList.contact")}</div></a>
                <button onClick={toggleLanguage} className="p-3 hover:underline"><div>{t("header.navList.lang")}</div></button>
            </div>
        </nav>
    );
}


export default Header;