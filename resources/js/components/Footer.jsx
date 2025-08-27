
function Footer() {
    return (
        <footer className="bg-slate-500 border-red-700 border-2 w-full h-full min-h-[20em] flex">
            <div className="flex w-full max-w-[55em] p-5 gap-5 mx-auto border-black border-2">
                <div className="basis-2/3 border-blue-700 border-2">
                    <h5>Location Details</h5>
                </div>
                <div className="text-black basis-1/3 bg-white p-5 border-green-700 border-2 rounded-xl">
                    <h5 className="text-lg font-semibold text-center">Hours of Operation</h5>
                    <table className="w-full">
                        <thead>
                            <th className="text-left">Day</th>
                            <th className="text-right">Open</th>
                            <th className="text-right">Closed</th>
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