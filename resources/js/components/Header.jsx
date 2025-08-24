
function Header() {
    return (
        <nav className="bg-slate-500 flex flex-col border-red-700 border-2">
            <div className="flex p-5 pr-3 items-center justify-between">
                <div className="flex flex-1">
                    <button className="p-2 px-3 border-red-700 border-2 rounded-full"><i className="fa-solid fa-bars"></i></button>
                </div>

                <a href="#" className=""><i className="fa-solid fa-gamepad text-3xl"></i></a>
                
                <div className="flex flex-1 justify-end">
                    <a className="bg-gray-700 text-sm border-black border-2 p-4 py-2 rounded-full" href="#">Connexion</a>
                </div>
            </div>


        </nav>
    );
}


export default Header;