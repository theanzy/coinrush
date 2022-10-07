import React from "react";

type NavLinkProps = {
  link?: string;
  children: React.ReactNode;
};
const NavLink = ({ children }: NavLinkProps) => {
  return (
    <li className="p-2 hover:bg-slate-200 hover:text-black">
      <a>{children}</a>
    </li>
  );
};

const Sidepane = () => {
  return (
    <div className="w-3/12  bg-slate-800 text-white">
      <h2 className="p-3 text-xl font-bold">Cryptoinfo</h2>
      <ul>
        <NavLink link="somelink">Home</NavLink>
        <NavLink link="somelink">Cryptocurrencies</NavLink>
        <NavLink link="somelink">Exchanges</NavLink>
        <NavLink link="somelink">News</NavLink>
      </ul>
    </div>
  );
};

export default Sidepane;
