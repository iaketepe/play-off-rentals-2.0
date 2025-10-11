import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";



function RentOne() {
    const [coordinates, setCoordinates] = useState([45.409, -75.7171]);
    const mapDOM = useRef(null);
    const map = useRef(null);

    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const searchBarDOM = useRef(null);
    const timer = useRef(null);
    const abortController = useRef(null);

    const { t } = useTranslation();
    

    useEffect(() => {
        if(!map.current) {
            map.current = L.map(mapDOM.current).setView(coordinates, 13);

            L.circle([45.409, -75.7171], {radius: 10000,color: '#1f89bb'}).addTo(map.current);

            fetch('/map/tiles/metadata')
            .then(response => response.json())
            .then(data => {
                L.tileLayer(data.urlHotline, {
                    maxZoom: 19,
                    attribution: data.attribution
                }).addTo(map.current);
            })
            .catch((err) => {
                console.error("Error on map startup:", err)
            });
        }

        map.current.setView(coordinates, 13);

    }, [coordinates]);

    const handleMapSearching = (lat, lon) => {
        setCoordinates([lat,lon]);
    }

    const handleSearchInput = (e) => {
        clearTimeout(timer.current);

        if (abortController.current) {
            abortController.current.abort();
        }

        if (!e.target.value) {
            setSearchResults([]);
            setIsOpen(false);
            return;
        }


        timer.current = setTimeout(() => {
            const controller = new AbortController();
            abortController.current = controller;

            fetch(`/map/locations?query=${encodeURIComponent(searchBarDOM.current.value)}`, {
                signal: controller.signal
            })
            .then(response => response.json())
            .then(data => {
                setSearchResults(Array.isArray(data) ? data : []);
                setIsOpen(true);
                
            })
            .catch(err => {
                if(err.name === "AbortError") return;
                console.error("Error fetching locations:", err)
            });
        },400)
    }
    


    return(
        <div className="w-full max-w-4xl h-full flex flex-col gap-10">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>{t("rentOne.title")}</h1>
                <span className="text-xl">{t("rentOne.sideNote")}</span>
            </div>
            <div className="flex flex-col flex-1 gap-5">
                <div className="w-full relative">
                    <input id="searchbar" ref={searchBarDOM} onInput={(e) => {handleSearchInput(e)}} onFocus={() => {if (searchResults.length > 0) setIsOpen(true);}} onBlur={() => setIsOpen(false)}  className="border-black border-2 p-3 rounded-lg w-full" type="search" name="" placeholder={t("rentOne.search")} />
                    <div className={`bg-white absolute top-full flex flex-col rounded-b-lg w-full z-[2000] ${isOpen ? 'block' : 'hidden'}`}>
                        {searchResults.map((item, i) => (
                            <div
                            key={i}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                                handleMapSearching(item.lat,item.lon);
                                setIsOpen(false);
                            }}
                            className="border-black border-2 p-3 rounded-lg w-full flex"
                            >
                            <span className="font-semibold truncate min-w-0">{item.display_place} <span className="text-xs text-gray-500 truncate min-w-0">{item.display_address}</span></span>
                            </div>
                        ))}
                    </div>
                </div>
                <div id="map" ref={mapDOM} className="border-black border-2 m-auto w-full max-w-lg h-[20rem] rounded-lg">
                    
                </div>
            </div>

        </div>

    )
}


export default RentOne;