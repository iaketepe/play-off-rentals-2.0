
import { useTranslation } from "react-i18next";


function Footer() {

    const { t } = useTranslation();

    return (
        <footer className="bg-slate-500 border-red-700 border-2 w-full flex justify-center">
            <div className="flex flex-col w-full max-w-[55em] p-2 gap-5 sm:flex-row sm:p-5"> 
                <div className="flex flex-col basis-full sm:basis-2/3 space-y-3 p-5 border">
                    <h5 className="text-lg font-semibold">{t("footer.contactTitle")}</h5>
                    <div className="flex flex-col flex-1 justify-center">
                        <div>
                            <h6 className="font-semibold">{t("footer.location")}</h6>
                            <p>
                                {t("footer.contactInformation.streetName")}
                                <br></br>
                                {t("footer.contactInformation.cityToCountry")}
                                <br></br>
                                {t("footer.contactInformation.email")}
                                <br></br>
                                {t("footer.contactInformation.phoneNumber")}
                            </p>
                        </div>
                    </div>
                    <h6 className="font-semibold">&copy; {t("footer.copyright")}</h6>
                </div>
                <div className="text-black flex flex-col basis-full sm:basis-1/3 min-w-[18em] bg-white p-5 rounded-xl">
                    <h5 className="text-lg font-semibold text-center">Hours of Operation</h5>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">Day</th>
                                <th className="text-right">Open</th>
                                <th className="text-right">Closed</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Monday</td>
                                <td className="text-right">9am</td>
                                <td className="text-right">5pm</td>
                            </tr>
                            <tr>
                                <td>Tuesday</td>
                                <td className="text-right">9am</td>
                                <td className="text-right">5pm</td>
                            </tr>
                            <tr>
                                <td>Wednesday</td>
                                <td className="text-right">N/A</td>
                                <td className="text-right">N/A</td>
                            </tr>
                            <tr>
                                <td>Thursday</td>
                                <td className="text-right">N/A</td>
                                <td className="text-right">N/A</td>
                            </tr>
                            <tr>
                                <td>Friday</td>
                                <td className="text-right">9am</td>
                                <td className="text-right">5pm</td>
                            </tr>
                            <tr>
                                <td>Saturday</td>
                                <td className="text-right">9am</td>
                                <td className="text-right">5pm</td>
                            </tr>
                            <tr>
                                <td>Sunday</td>
                                <td className="text-right">9am</td>
                                <td className="text-right">5pm</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </footer>
    );
}

export default Footer;