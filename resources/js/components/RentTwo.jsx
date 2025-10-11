import { useTranslation } from "react-i18next";

function RentTwo() {
    const { t } = useTranslation();
    return(
        <div className="w-full h-full flex flex-col divide-y divide-black gap-10 border-black border-2">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentTwo.title")}</h1>
            </div>
        </div>
    )
}


export default RentTwo;