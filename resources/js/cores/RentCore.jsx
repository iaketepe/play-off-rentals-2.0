import React from 'react';
import RentOne from "../components/RentOne";
import RentTwo from "../components/RentTwo";
import RentThree from "../components/RentThree";
import { useTranslation } from "react-i18next";


function RentCore () {
    const [step, setStep] = React.useState(1);
    const { t } = useTranslation();


    const steps = {
        "1" : <RentOne/>,
        "2" : <RentTwo/>,
        "3" : <RentThree/>,
    };
 

    return (
        <div className="flex flex-col flex-1 text-black p-10 justify-center items-center border-purple-800 border-2">
            <div className=" w-full max-w-4xl flex flex-col gap-5">
                <div className="">
                    {steps[step]}
                </div>
                <div className="flex justify-between">
                    <button onClick={() => setStep(((step + 1) % 3) + 1)}>{t("rentCore.prev")}</button>
                    <button onClick={() => setStep((step % 3) + 1)}>{t("rentCore.next")}</button>
                </div>
            </div>
        </div>
    );

}

export default RentCore;