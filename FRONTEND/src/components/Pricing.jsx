import { motion } from "framer-motion";
import ShinyText from "../bits/ShinyText";
import { HiCheck } from "react-icons/hi";
import { Link } from "react-router-dom";

const Pricing = () => {
  const plan = {
    perks: [
      "Daily accurate scalping signals",
      "Trades breakdown",
      "Livestream trading",
    ],
    price: 0.99,
  };

  return (
    <div className="flex text-white flex-col items-center  gap-3 p-2 sm:p-8">
      <div className="space-y-2">
        <motion.p
          initial={{ opacity: 1, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-5xl sm:text-4xl md:text-5xl font-bold"
        >
          Pricing
        </motion.p>

        <ShinyText
          text="Our plan has been engineered to be affordable to anybody who wants to make money quickly"
          disabled={false}
          speed={3}
          className="text-2xl sm:text-2xl md:text-3xl"
        />
      </div>
      <motion.div
        initial={{ opacity: 0, scale: "95%" }}
        animate={{ opacity: 1, scale: "100%" }}
        transition={{ duration: 0.3 }}
        className="bg-black border flex flex-col gap-2 p-6 border-amber-400 rounded-2xl"
      >
        <p className="text-3xl sm:text-4xl font-bold">
          Gold Street Subscription
        </p>
        <div className="flex flex-col">
          {plan.perks.map((perk, index) => (
            <div key={index} className="flex items-center gap-2 text-xl sm:text-2xl">
              <HiCheck size={24} fill="#00ff00" />
              <p>{perk}</p>
            </div>
          ))}
        </div>
        <div className=" flex flex-col gap-2 items-start">
          <p className="text-xl sm:text-2xl cursor-default p-2 bg-gradient-to-br from-amber-400/70 font-bold via-amber-400/90 to-amber-400/70 inline-block rounded-lg">
            ${plan.price} per week
          </p>
          <div className="sm:text-2xl text-xl sm:flex items-center space-y-4 sm:space-y-0 gap-4 justify-start">
            <p className="underline">currently free until July 28th</p>
            <Link
              to="/register"
              className="p-2 hover:scale-102 active:scale-100 transition duration-100 bg-white text-black rounded-lg font-bold"
            >
              Claim your spot
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Pricing;
