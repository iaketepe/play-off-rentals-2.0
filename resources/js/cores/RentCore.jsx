import React from 'react';
import RentOne from "../components/RentOne";
import RentTwo from "../components/RentTwo";
import RentThree from "../components/RentThree";



function RentCore () {
    const [step, setStep] = React.useState(1);


    const steps = {
        "1" : <RentOne/>,
        "2" : <RentTwo/>,
        "3" : <RentThree/>,
    };
 

    return (
        <div className="text-black flex flex-1 justify-center items-center">
            <div className="border-black border-2 w-full max-w-4xl h-full max-h-[30rem] divide-y border-black flex flex-col">
                <div className='flex flex-1'>
                    {steps[step]}
                </div>
                <div class="flex justify-between">
                    <button onClick={() => setStep(((step + 1) % 3) + 1)}>Prev</button>
                    <button onClick={() => setStep((step % 3) + 1)}>Next</button>
                </div>

            </div>
        </div>
    );

}

export default RentCore;