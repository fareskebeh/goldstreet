import React, { useState } from "react";
import { HiMenu, HiX, HiChevronRight } from "react-icons/hi";
import GS from "../assets/GS.png";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

const MbNav = ({ user }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <div className="flex bg-gradient-to-b from-black to-transparent fixed z-[999] top-0 left-0 right-0 justify-between p-6">
      <Link to="/home" className="contents">
        <img className="w-10" src={GS} />
      </Link>

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
            className={`fixed bg-black/80 z-[899] top-0 left-0 right-0 bottom-0`}
          />
        )}
      </AnimatePresence>

      <div
        className={`${
          open ? "" : "translate-x-full"
        } transition duration-400 bg-transparent backdrop-blur-sm ${
          user ? "" : "w-70"
        }  flex flex-col justify-between p-6 fixed z-[999] top-0 right-0 bottom-0`}
      >
        <div className="text-white font-bold text-2xl flex justify-between">
          <p>Gold Street</p>
          <button onClick={() => setOpen(false)}>
            <HiX className="text-white" size={30} />
          </button>
        </div>

        <div className="*:text-white *:rounded-lg *:transition duration-300 text-2xl flex flex-col gap-2 *:p-4">
          <Link
            onClick={() => setOpen(false)}
            className={location.pathname === "/home" ? "bg-neutral-900" : ""}
            to="home"
          >
            Home
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={location.pathname === "/community" ? "bg-neutral-800/60" : ""}
            to="community"
          >
            Community
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={location.pathname === "/pricing" ? "bg-neutral-800/60" : ""}
            to="pricing"
          >
            Pricing
          </Link>
          <Link
            onClick={() => setOpen(false)}
            className={location.pathname === "/contact-us" ? "bg-neutral-800/60" : ""}
            to="contact-us"
          >
            Contact Us
          </Link>
        </div>

        {user ? (
          <div className="flex items-center gap-4">
            <div>
              <img className="w-15 rounded-full" src={user.pfp} alt="" />
            </div>
            <div>
              <p className="font-bold text-xl text-white">{user.username}</p>
              <p className="text-neutral-400">See your account details</p>
            </div>
            <HiChevronRight className="text-white" size={35} />
          </div>
        ) : (
          <div className="flex flex-col items-start gap-2">
            <p className="text-neutral-400">Already a member?</p>
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="contents"
            >
              <button className="text-2xl p-2 px-4 font-bold  bg-white rounded-lg">
                Log In
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default MbNav;
