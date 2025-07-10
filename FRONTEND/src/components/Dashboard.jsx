import React, { useEffect, useState } from "react";
import db from "../client/db";
import blankPfp from "../assets/blank.png";
import { AnimatePresence, motion } from "framer-motion";
import { HiCog, HiLogout, HiX } from "react-icons/hi";
import Manage from "./Manage";

const Dashboard = () => {
  const [msg, setMsg] = useState(null);
  const [popup, setPopup] = useState(false);
  const [manage, setManage] = useState(false);
  const [logging, setLogging] = useState(false);
  const [user, setUser] = useState(null);
  const [data, setData] = useState({
    uname: "",
    mail: "",
  });
  const logOut = async () => {
    setLogging(true);
    const { error } = await db.auth.signOut();
    if (error) {
      setMsg(error.message);
      setLogging(false);
    }
  };

  useEffect(() => {
    const getData = async () => {
      const { data: authData } = await db.auth.getUser();
      setUser(authData.user);

      const { data: profile, error } = await db
        .from("profiles")
        .select("telegram_handle")
        .eq("id", authData.user.id)
        .single();

      if (error) {
        setMsg("Failed to fetch profile: " + error.message);
        return;
      }

      setData({
        uname: profile.telegram_handle,
        mail: authData.user.email,
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
              initial={{ opacity: 0, y: 10 }}
              exit={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white text-2xl flex flex-col gap-8 w-70 border border-neutral-900 bg-black p-4 rounded-2xl"
            >
              <p>Are you sure you want to log out?</p>

              <div
                className={`flex justify-center gap-4 *:p-3
              
              *:text-xl *:rounded-xl *:cursor-pointer *:font-bold *:border`}
              >
                <button
                  onClick={() => logOut()}
                  className={`transition duration-100 ${
                    logging ? "bg-neutral-500" : "bg-white"
                  } text-black`}
                >
                  {logging ? <div className="loader mx-8"></div> : "Log Out"}
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

      <Manage
        user={user}
        manage={manage}
        setManage={setManage}
        uname={data.uname}
      />

      <div className="flex flex-col justify-center text-center gap-4 items-center p-4">
        <img className="w-35 rounded-full" src={blankPfp} alt="" />
        <div className="flex justify-center gap-4">
          <div>
            {data.uname ? (
              <>
                <div className="text-4xl mb-2 text-white font-bold">
                  {data.uname}
                </div>
                <div className="text-xl text-neutral-500">{data.mail}</div>
              </>
            ) : (
              <div className="verify-loader" />
            )}
          </div>
        </div>
        <div className="text-xl text-left rounded-xl p-2 flex flex-col items-start">
          <p className="text-2xl font-bold text-white">Instructions to join our VIP channel</p>
          <ol className="list-decimal ml-8 space-y-2 flex flex-col items-start text-neutral-400">
            <li>Open Telegram</li>
            <li>Search for our bot @goldie_gsbot</li>
            <li>Start the bot and verify using the <span className="font-bold text-white">/join</span> command</li>
            <li>Join the channel through the invite link and start winning</li>
          </ol>
          <p className="text-red-500">NOTE: The username should be the same as the one you have on Telegram </p>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => setManage(true)}
          className="flex  transition duration-150 gap-2 items-center cursor-pointer font-bold text-xl p-2 rounded-md bg-neutral-800 text-white"
        >
          <HiCog />
          Manage Profile
        </button>
        <button
          onClick={() => setPopup(true)}
          className="flex  transition duration-150 gap-2 items-center cursor-pointer font-bold text-xl p-2 rounded-md bg-white"
        >
          <HiLogout />
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
