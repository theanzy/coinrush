import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className='flex w-full min-w-full flex-wrap items-center justify-between border-b bg-white py-4'>
      <div className='mr-6 flex flex-shrink-0 items-center text-gray-800'>
        <Link href='/'>
          <a className='text-xl font-bold tracking-tight'>Cryptoinfo</a>
        </Link>
      </div>
      <div className='block md:hidden'>
        <button
          className='flex items-center rounded border border-gray-900 px-3 py-2 text-gray-800 hover:border-white hover:text-blue-500'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <svg
            className='h-3 w-3 fill-current'
            viewBox='0 0 20 20'
            xmlns='http://www.w3.org/2000/svg'
          >
            <title>Menu</title>
            <path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
          </svg>
        </button>
      </div>
      <div
        className={`${
          showMenu ? 'block' : 'hidden'
        } md:items-center' w-full flex-grow md:flex md:w-auto`}
      >
        <div
          className='text-md mt-3 flex flex-col gap-5 md:mt-0 md:flex-grow md:flex-row 
        [&>a]:text-gray-800 hover:[&>a]:text-blue-500 md:[&>a]:mt-0 md:[&>a]:inline-block
        '
        >
          <Link href='/'>
            <a>Home</a>
          </Link>
          <Link href='/coins'>
            <a>Coins</a>
          </Link>
          <Link href='/exchanges'>
            <a>Exchanges</a>
          </Link>
          <Link href='/news'>
            <a>News</a>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
