import React from "react";
import { motion } from "framer-motion";
import ShinyText from "../bits/ShinyText";

const ContactUs = () => {
  return (
    <div className="p-4 sm:p-6 md:p-8 text-white">
      <motion.p
        initial={{ y: -10 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-3xl pb-2 sm:text-4xl md:text-5xl font-bold"
      >
        Contact Us
      </motion.p>
      <p className="text-neutral-400 sm:text-xl">
        Email us at:{" "}
        <a href="mailto:goldstreetraders@gmail.com" className="text-xl text-white">goldstreetraders@gmail.com</a>
      </p>

      <div className="text-center py-4 text-sm text-neutral-500">
        <p>OR</p>
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-neutral-400 sm:text-xl pb-4">
          Find us on social media
        </p>
        <div className="*:rounded-full *:p-4 sm:*:hover:scale-105 flex gap-4">
          <a target="_blank" href="https://www.instagram.com/goldstreet.official?igsh=MWw2aGM3MmhxZmc5Mw==" className="cursor-pointer active:scale-100  transition duration-300 p-2 flex items-center gap-2 bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              fill="white"
              className="w-10 h-10"
              viewBox="0 0 24 24"
            >
              <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z"></path>
            </svg>
          </a>

          <a target="_blank" href="https://www.youtube.com/@GoldStreet-u8v" className="cursor-pointer active:scale-100  transition duration-300 p-2 flex items-center gap-2 bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              fill="#fff"
              className="w-10 h-10"
              y="0px"
              viewBox="0 0 50 50"
            >
              <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
            </svg>
          </a>

          <a target="_blank" href="https://www.tiktok.com/@gold.street0?_t=ZG-8xm0yuJNsO1&_r=1" className="cursor-pointer active:scale-100  transition duration-300 p-2 flex items-center gap-2 bg-neutral-800">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              fill="#fff"
              className="w-10 h-10"
              viewBox="0 0 50 50"
            >
              <path d="M41,4H9C6.243,4,4,6.243,4,9v32c0,2.757,2.243,5,5,5h32c2.757,0,5-2.243,5-5V9C46,6.243,43.757,4,41,4z M37.006,22.323 c-0.227,0.021-0.457,0.035-0.69,0.035c-2.623,0-4.928-1.349-6.269-3.388c0,5.349,0,11.435,0,11.537c0,4.709-3.818,8.527-8.527,8.527 s-8.527-3.818-8.527-8.527s3.818-8.527,8.527-8.527c0.178,0,0.352,0.016,0.527,0.027v4.202c-0.175-0.021-0.347-0.053-0.527-0.053 c-2.404,0-4.352,1.948-4.352,4.352s1.948,4.352,4.352,4.352s4.527-1.894,4.527-4.298c0-0.095,0.042-19.594,0.042-19.594h4.016 c0.378,3.591,3.277,6.425,6.901,6.685V22.323z"></path>
            </svg>
          </a>
        </div>

      </div>
    </div>
  );
};

export default ContactUs;
