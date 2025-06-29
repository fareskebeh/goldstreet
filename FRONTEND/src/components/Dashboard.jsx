import React, { useEffect, useState } from "react";
import db from "../client/db";
import blankPfp from "../assets/blank.png";
import { AnimatePresence, motion } from "framer-motion";

const Dashboard = () => {
  const [msg, setMsg] = useState(null);
  const [popup, setPopup] = useState(false);
  const[logging,setLogging]= useState(false)
  const [data, setData] = useState({
    uname: "",
    mail: "",
  });
  const logOut = async () => {
    setLogging(true);
    const { error } = await db.auth.signOut();
    if (error) {
      setMsg(error.message);
      setLogging(false)
    }
  };


  useEffect(() => {
    const getData = async () => {
      const {
        data: { user },
      } = await db.auth.getUser();
      setData({
        ...data,
        uname: user.user_metadata.username,
        mail: user.user_metadata.email,
      });
    };
    getData();
  }, []);

  return (
    <div className="pt-22 h-[100dvh] relative">
      <AnimatePresence>
        {popup && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex justify-center items-center bg-black/70"
          >
            <motion.div
              initial={{opacity:0, y:10}}
              exit={{opacity:0, y:10}}
              animate={{opacity:1, y:0}}
              transition={{duration:0.2}}
              className="text-white text-2xl flex flex-col gap-8 w-70 border border-neutral-900 bg-black p-4 rounded-2xl"
            >
              <p>Are you sure you want to log out?</p>

              <div className={`flex justify-center gap-4 *:p-3
              
              *:text-xl *:rounded-xl *:cursor-pointer *:font-bold *:border`}>
                <button onClick={()=>logOut()} className={`transition duration-100 ${logging ? "bg-neutral-500" : "bg-white"} text-black`}>
                  {
                    logging ? <div className="loader mx-8"></div> : "Log Out"
                  }
                </button>
                <button
                  onClick={() => setPopup(false)}
                  className="bg-neutral-800 border-neutral-700"
                >
                  Cancel
                </button>
              </div>
                {msg ? <p className="text-red-500 font-bold">{msg}</p> : ""}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col justify-center text-center gap-4 items-center p-4">
        <img className="w-40 rounded-full" src={blankPfp} alt="" />
        <div>
          <p className="text-4xl mb-2 text-white font-bold">
            {data ? data.uname : "Loading..."}
          </p>
          <p className="text-xl text-neutral-500">
            {data ? data.mail : "Loading..."}
          </p>
        </div>
        <div className="text-neutral-400 border-2 text-xl border-dashed rounded-xl p-18 border-neutral-400">
          <p>New features are coming to the dashboard...</p>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => setPopup(true)}
          className="cursor-pointer font-bold text-xl p-2 rounded-md bg-white"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
