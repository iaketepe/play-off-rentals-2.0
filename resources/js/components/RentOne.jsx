import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import XMLHTTPRequest from 'axios';



function RentOne() {

    const searchbar = document.getElementById("searchbar");
    let timer;
    let coordinates = [51.505, -0.09];
    const mapRef = useRef(null);
    const mapObjectRef = useRef(null);
    

    /*searchbar.addEventListener("input", function () {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fetch(`/locations/search?query=${encodeURIComponent(searchbar.value)}`)
            .then(response => response.json())
            .then(data => {
                console.log("Locations:", data);
                const searchResults = document.createElement("div");
                for 
                
            })
            .catch(err => console.error("Error fetching locations:", err));
        },500)
    });

    searchbar.addEventListener("click", function() {
        coordinates = [51.505, -0.09]; //fetch('/map/coordinates') ?? [51.505, -0.09];
    }); */

    useEffect(() => {
        if(!mapObjectRef.current) {
            mapObjectRef.current = L.map(mapRef.current).setView(coordinates, 13);

            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            }).addTo(mapObjectRef.current);
        }


        //mapDiv.innerHTML = map;
    });
    


    return(
        <div className="w-full h-full flex flex-col divide-y divide-black gap-10 border-black border-2">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>Confirm Your Location</h1>
                <span className="text-xl">(Click Next to confirm later...)</span>
            </div>
            <div className="flex flex-col flex-1 gap-5 divide-y divide-black">
                <div className="w-full">
                    <input id="searchbar" className="border-black border-2 p-3 rounded-lg w-full" type="search" name="" placeholder="Type to Search" />
                </div>
                <div id="map" ref={mapRef} className="border-black border-2 m-auto w-full max-w-lg h-[20rem] rounded-lg">
                    
                </div>
            </div>

        </div>

    )
}


export default RentOne;