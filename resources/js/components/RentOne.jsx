


function RentOne() {
    return(
        <div className="w-full h-full flex flex-col divide-y divide-black gap-10 border-black border-2">
            <div className="space-x-5">
                <h1 className='inline text-black text-4xl font-semibold'>Confirm Your Location</h1>
                <span className="text-xl">(Click Next to confirm later...)</span>
            </div>
            <div className="flex flex-col flex-1 gap-5 divide-y divide-black">
                <input className="border-black border-2 p-3 rounded-lg max-w-" type="search" name="" id="" placeholder="Type to Search" />
                <div className="border-black border-2 m-auto w-full max-w-lg h-[20rem] rounded-lg">
                    Geolocation
                </div>
            </div>

        </div>

    )
}


export default RentOne;