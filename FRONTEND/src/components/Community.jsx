import React from "react";
import BlurText from "../bits/BlurText";
import ShinyText from "../bits/ShinyText";
import CommunityImageMb from "../assets/communityMb.jpg"
import { motion } from "framer-motion";

const Community = () => {
  return (
    <div className="p-2 relative sm:p-30 lg:p-35 text-white">
      <motion.div initial={{opacity:0, x:-40}} animate={{opacity:1, x:0}} transition={{duration:2}} className=" absolute -z-10 inset-0 overflow-hidden">
        <img style={{    maskImage: 'linear-gradient(to right, transparent, black 40%)',}} className=" w-auto h-full object-contain float-right rounded-4xl border-3 border-neutral-700" src={CommunityImageMb} alt="" />
      </motion.div>
      <BlurText text="Our Telegram Community"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl sm:mb-8 font-bold text-white mb-2"/>
      <ShinyText text="We have a Telegram community in which we post trading insights and signals, we offer multiple payment plans for subscription" disabled={false} speed={3} className='text-2xl sm:text-2xl md:text-3xl lg:text-4xl w-[50%] sm:w-auto' />

    </div>
  );
};

export default Community;
