import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import db from "../client/db";
import { useNavigate } from "react-router-dom";

const ConfirmPopup = ({ setDelPop }) => {
  const [msg, setMsg] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const sentence = "delete my profile";
  const [confirmer, setConfirmer] = useState("");

  const delPoint = import.meta.env.VITE_DELETE_ENDPOINT;
  const navigate = useNavigate();
   
  useEffect(()=> {
        console.log(delPoint)
    },[])

  const deleteAcc = async () => {
    setDeleting(true);
    const { data: sessionData } = await db.auth.getSession();
    const access = sessionData?.session?.access_token;

   

    if (!confirmer) {
      setMsg("*This field is required");
      setDeleting(false);
      return;
    }
    if (confirmer !== sentence) {
      setMsg("Sentence doesn't match the one above");
      setDeleting(false);
      return;
    }
    const res = await fetch(delPoint, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${access}`,
      },
    });

    if (res.ok) {
      await db.auth.signOut();
      navigate("/");
    } else {
      const error = await res.json();
      setMsg(error.message);
      setDeleting(false )
    }
  };

  return (
    <div>
      <motion.div
        initial={{ opacity: 0 }}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="absolute flex justify-center items-center inset-0 z-500 bg-black/70"
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          exit={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="text-white text-2xl flex flex-col gap-2 w-80 border border-neutral-900 bg-black p-4 rounded-2xl"
        >
          <p>Are you sure you want to delete your account?</p>
          <div className="text-base">
            <p>
              Type <strong>delete my profile</strong> in the box below to
              confirm
            </p>
            <input
              onChange={(e) => setConfirmer(e.target.value)}
              value={confirmer}
              className={`border outline-none ${
                confirmer !== sentence ? "border-red-500" : "border-neutral-800"
              } focus:border-amber-400 transition duration-200 text-xl p-2 my-2 w-full rounded-xl`}
              type="text"
              name=""
              id=""
            />
            <p className="text-neutral-400">
              NOTE: This action is irreversible!!
            </p>
          </div>
          <div
            className={`flex justify-center gap-4 *:p-3
                          
                          *:text-xl *:rounded-xl *:cursor-pointer *:font-bold`}
          >
            <button
              onClick={() => deleteAcc()}
              className={`transition duration-100 ${
                deleting ? "bg-red-500/70" : "bg-red-500"
              } text-white`}
            >
              {deleting ? <div className="loader mx-8"></div> : "Delete"}
            </button>
            <button
              onClick={() => setDelPop(false)}
              className="bg-neutral-800 border-neutral-700"
            >
              Cancel
            </button>
          </div>
          {msg ? <p className="text-red-500 font-bold">{msg}</p> : ""}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ConfirmPopup;
