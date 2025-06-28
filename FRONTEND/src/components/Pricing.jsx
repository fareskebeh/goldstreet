import React from "react";
import { motion } from "framer-motion";
import ShinyText from "../bits/ShinyText";

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      perks: ["Core trade signals", "Telegram channel access"],
      price: "$9.99",
    },
    {
      name: "Committed",
      perks: ["In-depth analysis", "Private chat access"],
      price: "$29.99",
    },
    {
      name: "Legend",
      perks: [
        "All signals, real-time",
        "Direct contact with team",
        "Full market strategy",
      ],
      price: "$49.99",
    },
  ];

  return (
    <div className="flex text-white flex-col gap-2 p-2 sm:p-8">
      <motion.p
        initial={{ opacity: 1, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-4xl sm:text-4xl md:text-5xl font-bold"
      >
        Pricing
      </motion.p>
      <ShinyText
        text="Pick a plan that fits your growth mindset"
        disabled={false}
        speed={3}
        className="text-lg sm:text-2xl md:text-3xl"
      />
      <div className="flex gap-2 *:flex-1 sm:flex-row flex-col justify-between *:bg-black *:border-b-3 *:border-neutral-700 *:hover:-translate-y-2 *:cursor-pointer *:transition duration-300 *:active:-translate-y-2 *:rounded-lg">
        {plans.map((plan, index) => (
          <motion.div initial={{y:-10}} animate={{y:0}} transition={{duration: 0.3}} className="flex p-2 sm:p-4 sm:flex-col gap-2 items-start justify-between" key={index}>
            <div className="">
              <p className="text-xl sm:text-3xl font-bold">{plan.name}</p>
              {plan.perks.map((perk, index) => (
                <p key={index} className="text-neutral-500 text-xs sm:text-xl"> <span className="text-green-600 mr-2">✔</span> {perk}</p>
              ))}
            </div>
            <p className="p-2 bg-white sm:text-2xl rounded-lg flex justify-center text-black font-bold">
              {plan.price}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
