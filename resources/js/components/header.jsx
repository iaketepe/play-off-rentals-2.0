
function Header() {
    return (
        <nav className="bg-slate-500 flex flex-col">
            <div className="flex p-5 pr-3 items-center">
                <div className="flex flex-1">
                    <button><i className="fa-solid fa-bars"></i></button>
                </div>

                <a href="#"><i className="fa-solid fa-gamepad text-3xl"></i></a>
                
                <div className="flex flex-1 justify-end space-x-3 ">
                    <a className="bg-gray-700 text-sm border-black border-2 p-4 py-2 rounded-full" href="#">Connexion</a>
                </div>
            </div>

            <div className="border-red-700 border-2">
                <a href="">Rent</a>
                <a href="">FAQ</a>
                <a href="">Contact Us</a>
                <a href="">EN/FR</a>
            </div>
        </nav>
    );
}


export default Header;