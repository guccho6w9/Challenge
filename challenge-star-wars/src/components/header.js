import Link from 'next/link';

const Banner = () => {
    return (
        <div className="banner flex flex-col items-center justify-center" style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', paddingTop: '20px', paddingBottom: '5px', height: "120px" }}>
            {/* Logo de Star Wars */}
            <Link href="/" legacyBehavior>
                <a>
                    <img src="/images/SW-logo/star-wars-logo.png" alt="Logo de Star Wars" className="w-52 h-auto mb-4" />
                </a>
            </Link>
        </div>
    );
};

export default Banner;
