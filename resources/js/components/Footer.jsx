import { useTranslation } from "react-i18next";


function Footer() {
    const { t } = useTranslation();

    return (
        <footer className="bg-slate-500 w-full flex justify-center">
            <div className="flex flex-col w-full max-w-[55em] p-2 gap-5 sm:flex-row sm:p-5"> 
                <div className="border flex flex-col basis-full sm:basis-2/3 space-y-3 p-5">
                    <h5 className="text-lg font-semibold">{t("footer.contactInformation.title")}</h5>
                    <div className="flex flex-col flex-1 justify-center">
                        <div>
                            <h6 className="font-semibold">{t("footer.contactInformation.location")}</h6>
                            <p>
                                {t("footer.contactInformation.office.street")}
                                <br></br>
                                {t("footer.contactInformation.office.city")}
                                <br></br>
                                {t("footer.contactInformation.office.email")}
                                <br></br>
                                {t("footer.contactInformation.office.phoneNumber")}
                            </p>
                        </div>
                    </div>
                    <h6 className="font-semibold">&copy; {t("footer.contactInformation.copyright")}</h6>
                </div>
                <div className="bg-white text-black flex flex-col basis-full sm:basis-1/3 min-w-[18em] p-5 rounded-xl">
                    <h5 className="text-lg font-semibold text-center">{t("footer.hoursOfOperation.title")}</h5>
                    <table className="w-full">
                        <thead>
                            <tr>
                                <th className="text-left">{t("footer.hoursOfOperation.table.labels.day")}</th>
                                <th className="text-right">{t("footer.hoursOfOperation.table.labels.open")}</th>
                                <th className="text-right">{t("footer.hoursOfOperation.table.labels.closed")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.monday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.monday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.monday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.tuesday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.tuesday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.tuesday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.wednesday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.wednesday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.wednesday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.thursday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.thursday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.thursday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.friday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.friday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.friday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.saturday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.saturday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.saturday.closed")}</td>
                            </tr>
                            <tr>
                                <td>{t("footer.hoursOfOperation.table.days.sunday.title")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.sunday.open")}</td>
                                <td className="text-right">{t("footer.hoursOfOperation.table.days.sunday.closed")}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </footer>
    );
}

export default Footer;