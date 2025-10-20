import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ArcadeCard from "./ArcadeCard";

function RentTwo() {
    const { t } = useTranslation();
    
    const test = [
        { id: 1, title: "Card One", description: "Navigate the maze, munch on dots, and outsmart the ghosts in this timeless arcade classic by Namco!", price: "50/day" },
        { id: 2, title: "Card Two", description: "Navigate the maze, munch on dots, and outsmart the ghosts in this timeless arcade classic by Namco!", price: "75/day" },
        { id: 3, title: "Card Three", description: "Navigate the maze, munch on dots, and outsmart the ghosts in this timeless arcade classic by Namco!", price: "100/day" },
    ];

    const [machines, setMachines] = useState([]);

    useEffect(() => {
        fetch('/api/machines')
            .then(response => response.json())
            .then(data => {
                setMachines(data);
            })
            .catch((err) => {
                console.error("Error: ", err);
            });
    }, []);

    if (!machines[0]) {
        return <div className="w-full min-h-screen flex flex-col gap-10">
                <div className="h-15 w-full bg-gray-300 rounded mb-1 animate-pulse"></div>
                <div className="bg-gray-500 rounded-lg grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div key={i} className="rounded-lg p-2 py-3 bg-gray-400 animate-pulse">
                            <div className="h-64 w-full bg-gray-300 rounded mb-2"></div>
                            <div className="space-y-5">
                                <div className="h-6 w-3/4 bg-gray-300 rounded mb-1"></div>
                                <div className="h-4 w-full bg-gray-200 rounded mb-1"></div>
                                <div className="h-4 w-1/3 bg-gray-300 rounded"></div>
                            </div>
                        </div>
                    ))}
                </div>
        </div>;
    }

    return(
        <div className="w-full flex flex-col gap-10">
            <div className="flex flex-col gap-10">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentTwo.title")}</h1>
                <div id="arcadeList" className="grid grid-cols-1 [@media(min-width:500px)_and_(max-width:767px)]:grid-cols-2 md:grid-cols-3 gap-4">
                    {machines.map((item, i) => (
                        <ArcadeCard
                            key={i}
                            item={item}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}


export default RentTwo;