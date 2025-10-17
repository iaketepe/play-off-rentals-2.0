import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

function RentTwo() {
    const { t } = useTranslation();
    
    
    const elem = ['Test Arcade','Test Description','50/Day'];
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
        console.log(data);
        setMachines(data);
    })
    .catch((err) => {
        console.error("Error: ", err);
    });
  }, []);


    


    return(
        <div className="w-full h-full flex flex-col gap-10 border-black border-2">
            <div className="flex flex-col gap-10">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentTwo.title")}</h1>
                <div id="arcadeList" className=" border-2 border-black m-auto grid grid-cols-1 md:grid-cols-3 gap-4">
                    {machines.map((item, i) => (
                        <div
                        key={i}
                        className="rounded-lg p-2 py-3 bg-slate-500"
                        >
                            <img src={item.image_path} className="bg-black w-full h-[262px] rounded-md" alt={item.name} />
                            <div className="p-3">
                                <h2 className="text-xl font-bold">{item.name}</h2>
                                <p>{item.description}</p>
                                <p>{item.cost}/Day</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}


export default RentTwo;