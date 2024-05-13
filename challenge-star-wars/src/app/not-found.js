// 404.js

import Link from 'next/link';
import Layout from '@/app/layout';
import Image from 'next/image';

const Custom404 = () => {
  return (
    <Layout>
      <div className="text-center mt-40">
        <div className="flex justify-center items-center ">
          <h1 className="text-9xl font-bold mr-4">4</h1>
          <Image src="/images/404-error/death-star.png" alt="Death Star" width={150} height={150} className="mr-4" />
          <h1 className="text-9xl font-bold">4</h1>
        </div>
        <p className="text-lg mt-6 mb-4 font-bold mt-5 ">"Great shot kid. That was one in a million."</p>
        <p className="text-lg mt-6 mb-4 font-bold mt-5 mb-20">Parece que esta pagina no existe.</p>
        <Link legacyBehavior href="/">
          <a className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-white py-2 px-4 mb-40">Volvamos a casa</a>
        </Link>
      </div>
    </Layout>
  );
};

export default Custom404;
