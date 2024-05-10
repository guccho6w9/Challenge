import Link from 'next/link';

const Navbar = () => {
    return (
        <div className="navbar flex justify-center items-center p-4 bg-transparent text-white">
            {/* Botones para ver películas y personajes */}
            <div className="flex space-x-4">
                <Link href="/films/films" legacyBehavior>
                    <a className="hover:text-gray-300"> Películas </a>
                </Link>
                <Link href="/character/characters" legacyBehavior>
                    <a className="hover:text-gray-300"> Personajes </a>
                </Link>
            </div>
            
            
        </div>
      
    );
};

export default Navbar;
