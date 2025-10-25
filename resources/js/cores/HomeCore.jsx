import mainArcade from '../../imgs/HomeArcade.webp';
import { useEffect } from 'react';
import { useTranslation } from "react-i18next";

function HomeCore() {

    const { t } = useTranslation();


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const status = params.get('redirect_status');
        if (status === 'succeeded') {
        console.log('Payment successful!');
        }
        window.history.replaceState({}, document.title, '/');
    }, []);


    return (
        <div className="w-full h-full flex flex-col">
            <section className="h-[clamp(10rem,8vw+6rem,20rem)] flex justify-center items-center">
                <div className="text-center">
                    <h1 className="text-4xl font-semibold">{t("homeCore.title")}</h1>
                    <h2 className="text-3xl font-light">{t("homeCore.subtitle")}</h2>
                </div>
            </section>

            <section className="w-full p-4 flex justify-center items-center">
                <div className="flex flex-col w-full max-w-[80rem] gap-10 lg:flex-row">
                    <img src={mainArcade} className="aspect-[4/3] w-full min-w-0 max-w-[40rem] m-auto rounded-lg lg:m-0" alt="Stream of Arcade Machines"/>
                    <div className="basis-1/2 space-y-5">
                        <h3 className='text-3xl font-semibold'>{t("homeCore.aboutUs")}</h3>
                        
                        <p className='max-h-[20rem] overflow-y-auto lg:max-h-[25rem]'>
                            {t("homeCore.welcomeText").split("\n").map((line, index) => (
                                <span key={index}>
                                    {line}
                                    <br />
                                </span>
                            ))}
                        </p>

                    </div>
                </div>
            </section>
        </div>
    )
}



export default HomeCore;