import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  HiChevronDown,
  HiChevronUp,
  HiChevronRight,
  HiChevronLeft,
} from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";
import {useSwipeable} from "react-swipeable"

const SlideShow = ({ vp }) => {
  const handlers = useSwipeable({
    onSwipedDown: ()=> slide("bwd") ,
    onSwipedUp: ()=> slide("fwd") ,
    trackMouse: false,
  })
  const pages = ["/home", "/community", "/pricing", "/contact-us"];
  const location = useLocation();
  const navigate = useNavigate();

  const slide = (direction) => {
    const curr = pages.indexOf(location.pathname);
    if (direction === "fwd") {
      if (curr >= 0 && curr < pages.length - 1) {
        navigate(pages[curr + 1]);
      }
    } else {
      if (curr > 0) {
        navigate(pages[curr - 1]);
      }
    }
  };

  return (
    <div 
      {...handlers}
      className={`h-screen pt-22 px-4 sm:pt-0 flex items-center ${
        vp === "small" ? "flex-col" : ""
      } justify-between`}
    >
      {vp === "small" ? (
        <div>
          <button
            onClick={() => slide("bwd")}
            className={`${
              location.pathname === "/home" ? "invisible" : ""
            } text-neutral-700`}
          >
            <HiChevronUp size={40} />
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => slide("bwd")}
            className={`${
              location.pathname === "/home" ? "invisible" : ""
            } text-white cursor-pointer hover:-translate-x-1 transition duration-300 active:-translate-x-2`}
          >
            <HiChevronLeft size={80} />
          </button>
        </div>
      )}
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      {vp === "small" ? (
        <div>
          <button
            onClick={() => slide("fwd")}
            className={`${
              location.pathname === "/contact-us" ? "invisible" : ""
            } text-neutral-700`}
          >
            <HiChevronDown size={40} />
          </button>
        </div>
      ) : (
        <div>
          <button
            onClick={() => slide("fwd")}
className={`${
              location.pathname === "/contact-us" ? "invisible" : ""
            } text-white cursor-pointer hover:translate-x-1 transition duration-300 active:translate-x-2`}          >
            <HiChevronRight size={80} />
          </button>
        </div>
      )}
    </div>
  );
};

export default SlideShow;
