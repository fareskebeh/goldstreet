import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { HiX } from "react-icons/hi";
import db from "../client/db";
import ConfirmPopup from "./ConfirmPopup";

const Manage = ({ manage, setManage, uname, user }) => {
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState(null);
  const [unameTo, setUnameTo] = useState(uname || "");
  const [unsaved, setUnsaved] = useState(false);
  const [uValid, setUValid] = useState(true);
  const [delPop, setDelPop] = useState(false);

  useEffect(() => {
    if (manage) setUnameTo(uname);
  }, [manage, uname]);

  const save = async () => {
    if (!user?.id) {
      setMsg("User not found.");
      return;
    }

    if (unameTo === "") {
      setUValid(false);
      return;
    }

    if (unameTo === uname) {
      setManage(false);
      return;
    }

    setSaving(true);
    try {
      const { data, error } = await db
        .from("profiles")
        .update({ telegram_handle: unameTo })
        .eq("id", user.id)
        .select();

      if (error) {
        setMsg(error.message);
      } else if (data && data.length) {
        setMsg("Profile updated successfully!");
        setManage(false);
      } else {
        setMsg("Update matched no records. Check RLS or user.id.");
      }
    } catch (err) {
      setMsg("Unexpected error occurred.");
    } finally {
      setSaving(false);
    }
  };

  const cancel = () => {
    if (unameTo !== uname) {
      setUnsaved(true);
    } else {
      setManage(false);
    }
  };

  return (
    <div>
      <AnimatePresence>
        {manage && (
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
              className="text-white scrollbar-hide text-2xl flex flex-col gap-8 w-[90%] sm:w-[70%] md:w-[50%] max-h-[80%] overflow-y-auto border border-neutral-800 bg-black p-4 rounded-2xl"
            >
              <div className="text-3xl font-bold flex justify-between items-center">
                <p>Manage your profile</p>
                <HiX onClick={cancel} className="cursor-pointer" />
              </div>

              <hr />

              <div className="flex flex-col gap-2">
                <p className="font-bold">Telegram handle</p>
                <input
                  className="focus:border-amber-500 outline-none transition duration-200 bg-neutral-900 p-2 rounded-lg border border-neutral-800"
                  onChange={(e) => setUnameTo(e.target.value)}
                  value={unameTo}
                  type="text"
                />
                <p
                  className={`${
                    uValid ? "opacity-0" : "opacity-100"
                  } text-base transition duration-200 text-red-500`}
                >
                  {uValid ? "" : "*This field is required"}
                </p>
              </div>

              <hr />

              <div className="flex flex-col gap-2">
                <p className="font-bold">Payment plan</p>
                <div className="px-4 py-8 text-neutral-500 flex justify-center items-center border-dashed border-2 rounded-lg border-neutral-500">
                  <p>Coming soon!!</p>
                </div>
              </div>

              <hr />

              <div className="bg-red-900/20 p-2 border flex flex-col gap-4 border-red-600/30 rounded-lg">
                <p className="font-bold">Danger zone</p>
                <button
                  onClick={() => setDelPop(true)}
                  className="rounded-lg bg-red-500 p-2 font-bold hover:bg-red-500/90 cursor-pointer transition duration-150 text-xl"
                >
                  Delete Account
                </button>
                <p className="text-lg w-[70%] text-red-300">
                  Completely removes your account from our database and
                  effectively cancels out your subscription
                </p>
              </div>

              <div className="flex justify-center gap-4 *:p-3 *:text-xl *:rounded-xl *:cursor-pointer *:font-bold *:border">
                <button
                  onClick={save}
                  className={`transition duration-100 ${
                    saving ? "bg-neutral-500" : "bg-white"
                  } text-black`}
                >
                  {saving ? <div className="loader mx-8" /> : "Save"}
                </button>
                <button
                  onClick={cancel}
                  className="bg-neutral-800 border-neutral-700"
                >
                  Cancel
                </button>
              </div>
              {msg && <p className="text-red-500 text-xl font-bold">{msg}</p>}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {unsaved && (
          <motion.div
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="absolute flex justify-center items-center inset-0 z-40 bg-black/50"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              exit={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="text-white p-4 text-xl border bg-black border-neutral-800 rounded-xl flex flex-col gap-4"
            >
              <p>You have unsaved changes</p>
              <div className="flex *:flex-1 *:p-2 gap-2 *:cursor-pointer *:font-bold *:rounded-lg">
                <button
                  onClick={() => {
                    setManage(false);
                    setUnsaved(false);
                    setUnameTo(uname);
                    setMsg(null);
                  }}
                  className="bg-red-500/70"
                >
                  Discard
                </button>
                <button
                  onClick={() => setUnsaved(false)}
                  className="bg-neutral-800"
                >
                  Back
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {delPop && <ConfirmPopup setDelPop={setDelPop} />}
      </AnimatePresence>
    </div>
  );
};

export default Manage;
