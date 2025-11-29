import { useState, Suspense, lazy } from 'react';
import { useTranslation } from "react-i18next";
import RentOne from '../components/RentOne';

function RentCore () {
    const [step, setStep] = useState(1);
    const { t } = useTranslation();

    const RentTwo = lazy(() => import("../components/RentTwo"));
    const RentThree = lazy(() => import("../components/RentThree"));

    const steps = {
        "1" : RentOne,
        "2" : RentTwo,
        "3" : RentThree,
    };

    const StepComponent = steps[step];
 

    return (
        <div className="flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className=" w-full max-w-6xl flex flex-col gap-5">
                <div className="flex justify-center">
                    <Suspense fallback={<div>Loading...</div>}>
                        <StepComponent/>
                    </Suspense>
                </div>
                <div className="flex justify-between">
                    <button onClick={() => setStep((step - 1) > 1 ? step - 1 : 1)} className="bg-gray-700 text-white text-center p-3 py-2 border-2 border-black rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-600">{t("rentCore.prev")}</button>
                    <button onClick={() => setStep((step + 1) < 3 ? step + 1 : 3)} className="bg-gray-700 text-white text-center p-3 py-2 border-2 border-black rounded-lg transition-colors duration-300 ease-in-out hover:bg-gray-600">{t("rentCore.next")}</button>
                </div>
            </div>
        </div>
    );

}

export default RentCore;