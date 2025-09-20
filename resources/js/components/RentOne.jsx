import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef, useState } from "react";



function RentOne() {

    let timer;
    let coordinates = [51.505, -0.09];
    const searchBarDOM = useRef(null);
    const mapDOM = useRef(null);
    const map = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [isOpen, setIsOpen] = useState(false);

    

    /*searchbar.addEventListener("click", function() {
        coordinates = [51.505, -0.09]; //fetch('/map/coordinates') ?? [51.505, -0.09];
    }); */

    useEffect(() => {
        if(!map.current) {
            map.current = L.map(mapDOM.current).setView(coordinates, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(map.current);
        }

        searchBarDOM.current.addEventListener("input", function () {
            clearTimeout(timer);
            if (searchBarDOM.current.value !== "") {
                timer = setTimeout(() => {
                    fetch(`/locations/search?query=${encodeURIComponent(searchBarDOM.current.value)}`)
                    .then(response => response.json())
                    .then(data => {
                        console.log("Locations:", data);
                        //const searchResults = document.createElement("div");
                        setSearchResults(data);
                        setIsOpen(true);
                        
                    })
                    .catch(err => console.error("Error fetching locations:", err));
                },500)
            }

        });
    });
    


    return(
        <div className="w-full h-full flex flex-col divide-y divide-black gap-10 border-black border-2">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>Confirm Your Location</h1>
                <span className="text-xl">(Click Next to confirm later...)</span>
            </div>
            <div className="flex flex-col flex-1 gap-5 divide-y divide-black">
                <div className="w-full relative">
                    <input id="searchbar" ref={searchBarDOM} onFocus={() => {if (searchResults.length > 0) setIsOpen(true);}} onBlur={() => setIsOpen(false)}  className="border-black border-2 p-3 rounded-lg w-full" type="search" name="" placeholder="Type to Search" />
                    <div className={`bg-white absolute top-full flex flex-col rounded-b-lg w-full z-[2000] ${isOpen ? 'block' : 'hidden'}`}>
                        {searchResults.map((item, i) => (
                            <div
                            key={i}
                            className="border-black border-2 p-3 rounded-lg w-full"
                            >
                            <span className="font-semibold">{item.display_place}</span>
                            <span className="text-xs text-gray-500">{item.display_address}</span>
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