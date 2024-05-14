import Link from 'next/link';

const Banner = () => {
    return (
        <div className="banner flex flex-col items-center justify-center" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '20px', paddingBottom: '5px', height: "140px" }}>
            {/* Logo de Star Wars */}
            <Link href="/" legacyBehavior>
                <a>
                    <img src="/images/SW-logo/star-wars-logo.png" alt="Logo de Star Wars" className="w-52 xl:w-80 2xl:w-90 h-auto mt-4 mb-4" />
                </a>
            </Link>
        </div>
    );
};

export default Banner;
