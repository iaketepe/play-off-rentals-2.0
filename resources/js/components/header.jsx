
function Header() {
    return (
        <nav className="bg-slate-500 p-5 px-4 flex items-center">
            <div className="flex flex-1">
                <a href="#"><i className="fa-solid fa-bars"></i></a>
            </div>

            <a href="#"><i className="fa-solid fa-gamepad text-3xl"></i></a>
            
            <div className="flex flex-1 justify-end space-x-3 ">
                <a className="bg-gray-700 text-sm border-black border-2 p-4 py-2 rounded-full" href="#">Connexion</a>
            </div>
        </nav>
    );
}


export default Header;