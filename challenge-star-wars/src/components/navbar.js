import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="navbar flex justify-center items-center p-4 bg-transparent text-white">
            {/* Botones para ver películas y personajes */}
            <div className="flex space-x-4">
                <Link href="/films/films" legacyBehavior>
                    <a className="text-gray-300 text-opacity-50 hover:text-white font-bold"> PELÍCULAS </a>
                </Link>
                <Link href="/character/characters" legacyBehavior>
                    <a className="text-gray-300 text-opacity-50 hover:text-white font-bold"> PERSONAJES </a>
                </Link>
            </div>
            
            
        </div>
      
    );
};

export default Navbar;
