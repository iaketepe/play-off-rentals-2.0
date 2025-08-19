
function Header() {
    return (
        <nav className="bg-slate-500 p-5 flex items-center">
            <div className="flex flex-1">
                <i className="fa-solid fa-bars"></i>
            </div>

            <i className="fa-solid fa-gamepad text-3xl"></i>
            
            <div className="flex flex-1 justify-end space-x-3 ">
                <button className="text-md">Connexion</button>
            </div>
            
        </nav>
    );
}


export default Header;