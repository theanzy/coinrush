import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';
type LayoutProps = {
  children: React.ReactNode;
};
const Layout = (props: LayoutProps) => {
  return (
    <div className='custom-scrollbar flex min-h-screen w-auto flex-col text-sm md:text-base [&>*]:px-4 [&>*]:lg:px-24'>
      <Navbar />
      <div className='p-2'></div>
      {props.children}
      <Footer />
    </div>
  );
};

export default Layout;
