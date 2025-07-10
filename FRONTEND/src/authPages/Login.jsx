import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import db from "../client/db";
import { HiXCircle, HiCheckCircle } from "react-icons/hi";
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwVis, setPwVis] = useState(false);
  const [msg, setMsg] = useState(false);
  const [output, setOutput] = useState({
    message: "",
    state: "",
  });
  const [logging, setLogging] = useState(false);

  useEffect(() => {
    if (msg) {
      setTimeout(() => {
        setMsg(false);
      }, 3000);
    }
  }, [msg]);

  const login = async (e) => {
    e.preventDefault();
    setLogging(true)
    if (email.trim() === "" || password.trim() === "") {
      setOutput({
        ...output,
        message: "Missing required fields",
        state: "error",
      });
      setMsg(true);
      setLogging(false);
      return;
    }
    const { data, error } = await db.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setOutput({ ...output, message: error.message, state: "error" });
      setMsg(true);
      setLogging(false);
    } else {
      setOutput({ ...output, message: "Successful Login!", state: "success" });
      setMsg(true);
      setLogging(false);
      navigate("/home");
    }
  };

  return (
    <>
      <div className="pt-24 relative z-0 flex flex-col sm:items-center justify-center h-[100dvh] p-6">
        <div className="">
          <p className="text-white text-5xl font-bold">Log In to Gold Street</p>
          <p className="text-xl text-neutral-500">
            New User?{" "}
            <Link className="text-white font-bold" to="/register">
              Register
            </Link>{" "}
            instead.
          </p>

          <form onSubmit={login} className="flex flex-col gap-2 py-4">
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className=" text-2xl invalid:focus:border-red-700 invalid:bg-red-700/20  transition duration-300 outline-none text-white placeholder:text-neutral-600 p-3 border border-neutral-900 rounded-xl bg-black/40 focus:border-amber-500"
              type="email"
              placeholder="Email"
            />

            <div className="relative z-0">
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="focus:border-amber-500 transition duration-200 text-2xl w-full outline-none text-white placeholder:text-neutral-600 p-3 border border-neutral-900 rounded-xl bg-black/40"
                type={pwVis ? "text" : "password"}
                placeholder="Password"
              />
              <button
                onClick={() => setPwVis(!pwVis)}
                type="button"
                className={`sm:cursor-pointer transition duration-100 ${
                  pwVis ? "text-white" : "text-neutral-600"
                } absolute top-4.5 right-4`}
              >
                {pwVis ? (
                  <HiOutlineEye size={24} />
                ) : (
                  <HiOutlineEyeOff size={24} />
                )}
              </button>
            </div>

            <AnimatePresence>
              {msg && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  exit={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className={`flex items-center gap-2 text-nowrap 
                  ${output.state === "error" ? "text-red-500" : "text-green-500"} font-bold`}
                >
                  {output.state === "error" ? <HiXCircle /> : <HiCheckCircle />}
                  {output.message}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              className={`${
                logging ? "bg-neutral-500 pointer-events-none " : "bg-white"
              } sm:cursor-pointer sm:hover:scale-101 sm:active:scale-100 transition-all duration-100 p-4 sm:p-3 text-3xl flex justify-center font-bold rounded-xl`}
            >
              {logging ? <div className="m-3 loader" /> : "Log In"}
            </button>
          </form>
          {/*
          <Link className="text-xl text-neutral-400">Forgot Password</Link>
          */}
        </div>
      </div>
    </>
  );
};

export default Login;
