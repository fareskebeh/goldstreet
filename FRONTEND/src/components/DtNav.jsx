import React, { useState } from "react";
import GS from "../assets/GS.png";
import { Link, useLocation } from "react-router-dom";
import { HiChevronRight } from "react-icons/hi";

const DtNav = ({ user }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-0 right-0 left-0 bg-gradient-to-b from-black to-transparent flex z-20 p-4 justify-between">
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed top-0 right-0 bottom-0 left-0 z-0"
        />
      )}
      <img draggable="false" className="w-10 mr-2" src={GS} alt="" />

      <div className="flex *:transition-all duration-400 items-center gap-8 text-xl">
        <Link
          to="/home"
          className={
            location.pathname === "/home"
              ? "text-white font-bold"
              : "text-[#808080]"
          }
        >
          Home
        </Link>

        <Link
          to="/community"
          className={
            location.pathname === "/community"
              ? "text-white font-bold"
              : "text-[#808080]"
          }
        >
          Community
        </Link>

        <Link
          to="/pricing"
          className={
            location.pathname === "/pricing"
              ? "text-white font-bold"
              : "text-[#808080]"
          }
        >
          Pricing
        </Link>
        <Link
          to="/contact-us"
          className={
            location.pathname === "/contact-us"
              ? "text-white font-bold"
              : "text-[#808080]"
          }
        >
          Contact Us
        </Link>
      </div>

      {user ? (
        <div className="relative">
          <img
            onClick={() => setOpen(!open)}
            src={user.pfp}
            className=" w-10 rounded-full cursor-pointer"
            alt=""
          />
          <div
            className={`text-nowrap ${
              open
                ? "visible opacity-100"
                : "-translate-y-1 invisible opacity-0"
            } transition-all duration-200 bg-neutral-800 border border-neutral-600 rounded-lg cursor-pointer p-4 absolute top-12 right-2`}
          >
            <p className="text-neutral-400">You're logged in as:</p>
            <Link className="">
              <div className="p-4 hover:bg-neutral-700/50 rounded-md transition duration-100 flex gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">
                    {user.username}
                  </p>
                  <p className="text-neutral-400">See your account info</p>
                </div>
                <button>
                  <HiChevronRight className="text-white" size={35} />
                </button>
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <Link to="/login" className="contents">
            <button
              className="cursor-pointer font-bold bg-white p-2 text-xl hover:scale-102 transition duration-100 rounded-lg"
              to="/login"
            >
              Log In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default DtNav;
