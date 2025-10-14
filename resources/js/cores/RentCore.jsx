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
        <div className="flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className=" w-full max-w-6xl flex flex-col gap-5">
                <div className="flex justify-center">
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