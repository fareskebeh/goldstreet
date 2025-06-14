import React, { useState } from "react";
import { HiMenu, HiX, HiChevronRight } from "react-icons/hi";
import GS from "../assets/GS.png";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const MbNav = ({ user }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex justify-between p-6 bg-gray-900">
      <img className="w-10" src={GS} />
      <button onClick={() => setOpen(true)}>
        <HiMenu className="text-white" size={30} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            onClick={() => setOpen(false)}
            className={`fixed bg-[#0b111ed2] z-10 top-0 left-0 right-0 bottom-0`}
          />
        )}
      </AnimatePresence>

      <div
        className={`${
          open ? "" : "translate-x-100"
        } transition duration-400 bg-gray-900 ${user? "" : "w-70"} z-20 flex flex-col justify-between p-6 fixed top-0 right-0 bottom-0`}
      >
        <div className="text-white font-bold text-2xl flex justify-between">
            <p>Gold Street</p>
          <button onClick={() => setOpen(false)}>
            <HiX className="text-white" size={30} />
          </button>
        </div>

        

        <div className="*:text-white *:rounded-lg *:transition duration-300 text-2xl flex flex-col gap-2 *:p-4">
          <Link
            className={location.pathname === "/home" ? "bg-gray-700" : ""}
            to="home"
          >
            Home
          </Link>
          <Link
            className={location.pathname === "/about" ? "bg-gray-700" : ""}
            to="about"
          >
            About
          </Link>
          <Link
            className={location.pathname === "/pricing" ? "bg-gray-700" : ""}
            to="pricing"
          >
            Pricing
          </Link>
        </div>

        {user ? 
        (
            <div className="flex items-center gap-4">
                <div>
                    <img className="w-15 rounded-full" src={user.pfp} alt="" />
                </div>
                <div>
                    <p className="font-bold text-xl text-white">{user.username}</p>
                    <p className="text-gray-400">See your account details</p>
                </div>
                <HiChevronRight className="text-white" size={35}/>
            </div>
            
            
            ) : (
            
            <div className="flex flex-col items-start gap-2">
                <p className="text-gray-400">Already a member?</p>
                <button className="text-2xl p-2 px-4 font-bold text-white bg-gray-500 rounded-lg">Log In</button>        
            </div>
        )}

      </div>
    </div>
  );
};

export default MbNav;
