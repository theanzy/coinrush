import Link from 'next/link';
import React, { useState } from 'react';
import NavSearch from './SearchForm/NavSearch';
import { IoMenuOutline } from 'react-icons/io5';
import { MdOutlineClose } from 'react-icons/md';
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <nav className='flex w-full min-w-full items-center border-b bg-white py-4'>
      <div className='flex-0 block md:hidden'>
        <button
          className='borde flex items-center rounded px-3 py-2 text-[1.7rem] text-gray-800 hover:border-white hover:text-blue-500'
          onClick={() => setShowMenu((prev) => !prev)}
        >
          <IoMenuOutline />
        </button>
      </div>
      <div className='mr-6 flex flex-shrink-0 items-center text-gray-800'>
        <Link href='/'>
          <a className='text-xl font-bold tracking-tight'>Coinrush</a>
        </Link>
      </div>
      <div
        className={`${
          showMenu ? 'fixed top-0 left-0 z-30 h-screen bg-white' : 'hidden'
        } md:items-center' w-full flex-grow md:flex md:w-auto`}
      >
        {showMenu && (
          <div className='flex flex-row justify-center pt-4 md:hidden'>
            <button
              className='absolute left-0 flex items-center rounded px-3 py-2 text-[1.7rem] text-gray-800 hover:border-white hover:text-blue-500'
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <MdOutlineClose />
            </button>
            <div className='mr-6 flex flex-shrink-0 items-center py-2 text-gray-800'>
              <Link href='/'>
                <a className='text-xl font-bold tracking-tight'>Coinrush</a>
              </Link>
            </div>
          </div>
        )}
        <div
          className='text-md mt-3 flex flex-col md:mt-0 md:flex-grow md:flex-row [&>a]:py-5 [&>a]:pl-5 [&>a]:text-gray-800
        hover:[&>a]:bg-blue-500 hover:[&>a]:text-white md:[&>a]:mt-0 md:[&>a]:inline-block hover:[&>a]:md:bg-white hover:md:[&>a]:text-blue-500'
          onClick={() => setShowMenu(false)}
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
      <div className='ml-auto'>
        <NavSearch />
      </div>
    </nav>
  );
};

export default Navbar;
