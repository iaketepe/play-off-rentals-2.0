import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";



function RentOne() {
    useEffect(() => {
        var map = L.map('map').setView([51.505, -0.09], 13);

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        //mapDiv.innerHTML = map;
    });
    


    return(
        <div className="w-full h-full flex flex-col divide-y divide-black gap-10 border-black border-2">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>Confirm Your Location</h1>
                <span className="text-xl">(Click Next to confirm later...)</span>
            </div>
            <div className="flex flex-col flex-1 gap-5 divide-y divide-black">
                <input className="border-black border-2 p-3 rounded-lg max-w-" type="search" name="" id="" placeholder="Type to Search" />
                <div id="map" className="border-black border-2 m-auto w-full max-w-lg h-[20rem] rounded-lg">
                    
                </div>
            </div>

        </div>

    )
}


export default RentOne;