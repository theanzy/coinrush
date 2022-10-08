import React from "react";
import NavLink from "./Navlink";

const Sidepane = () => {
  return (
    <div className="w-2/12  bg-slate-800 text-white">
      <h2 className="p-5 text-2xl font-bold">Cryptoinfo</h2>
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
