import { useTranslation } from "react-i18next";

function FaqCore() {
    const { t } = useTranslation();


    return(
        <div className=" border-black flex flex-col p-[clamp(.25rem,2vw,2.5rem)] items-center">
            <div className=" border-black w-full max-w-6xl flex flex-col gap-5">
                <div className="w-full h-full flex flex-col gap-10">
                    <h1 className='inline text-black text-4xl font-semibold'>FAQ</h1>
                    <div className="text-white flex flex-col gap-2">
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q1.question")}</summary>
                            <div className="bg-white text-black p-5 rounded-lg space-y-2">
                                <p>{t("faqCore.q1.answer")}</p>
                                <em className="text-sm font-semibold">{t("faqCore.q1.example")}</em>
                            </div>
                        </details>
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q2.question")}</summary>
                            <p className="bg-white text-black p-5 rounded-lg">{t("faqCore.q2.answer")}</p>
                        </details>
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q3.question")}</summary>
                            <p className="bg-white text-black p-5 rounded-lg">{t("faqCore.q3.answer")}</p>
                        </details>
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q4.question")}</summary>
                            <p className="bg-white text-black p-5 rounded-lg">{t("faqCore.q4.answer")}</p>
                        </details>
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q5.question")}</summary>
                            <p className="bg-white text-black p-5 rounded-lg">{t("faqCore.q5.answer")}</p>
                        </details>
                        <details className="bg-slate-500 border-black border-2 p-5 open:space-y-5">
                            <summary className="text-xl font-semibold">{t("faqCore.q6.question")}</summary>
                            <p className="bg-white text-black p-5 rounded-lg">{t("faqCore.q6.answer")}</p>
                        </details>

                    </div>
                </div>
            </div>
        </div>
    );
}   

export default FaqCore;