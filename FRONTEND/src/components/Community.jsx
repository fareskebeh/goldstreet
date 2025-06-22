import React from "react";
import BlurText from "../bits/BlurText";
import ShinyText from "../bits/ShinyText";

const Community = () => {
  return (
    <div className="p-2 sm:p-20 text-white">
      <BlurText text="Our Telegram Community"
        delay={150}
        animateBy="words"
        direction="top"
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl sm:mb-8 font-bold text-white mb-2"/>
      <ShinyText text="We have a Telegram community in which we post trading insights and signals, we offer multiple payment plans for subscription" disabled={false} speed={3} className='text-xl sm:text-2xl md:text-3xl lg:text-4xl w-[50%] sm:w-auto' />

    </div>
  );
};

export default Community;
