import { useTranslation } from "react-i18next";
import { Suspense, lazy, useEffect, useRef, useState } from "react";
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

function LoginCore() {
    const { t } = useTranslation();
    const [step, setStep] = useState(1);
    const [pageSwitch, setPageSwitch] = useState(false);

    const forms = {
        "1" : LoginForm,
        "2" : SignupForm
    }

    const FormPicker = forms[step];

    const handlePageSwitch = () => {
        setStep(step == "1" ? "2" : "1");
    }

    return (
        <div className="w-full h-full flex justify-center items-center">
            <Suspense fallback={<div>Loading...</div>}>
                <FormPicker pageSwitch={handlePageSwitch}/>
            </Suspense>
        </div>
    );
}


export default LoginCore;