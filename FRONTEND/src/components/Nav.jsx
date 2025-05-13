import React from "react";
import { Link, useLocation } from "react-router-dom";
import GSIcon from "../assets/icons/GS.png"

const Nav = () => {
const location = useLocation()

  return (
    <nav className="fixed top-0 left-0 right-0 px-4 p-2 text-xl text-white flex items-center justify-between bg-gradient-to-b from-gray-900 to-transparent">
        <div className="flex gap-4 items-center *:p-2 *:rounded-md *:transition-all *:duration-100 *:hover:bg-gray-800">
            <img className="w-13" src={GSIcon} alt="" />
            <Link className={`${location.pathname === "/home" && "text-[#ffdb8d] font-bold"}`} to="/home">Home</Link>
            <Link className={`${location.pathname === "/pricing" && "text-[#ffdb8d] font-bold"}`} to="/pricing">Pricing</Link>
            <Link className={`${location.pathname === "/about" && "text-[#ffdb8d] font-bold"}`} to="/about">About</Link>
            <Link className={`${location.pathname === "/contact" && "text-[#ffdb8d] font-bold"}`} to="/contact">Contact</Link>
        </div>
        <Link className="rounded-md p-2 bg-gray-600" to="/register">Register</Link>
    </nav>
  );
};

export default Nav;
