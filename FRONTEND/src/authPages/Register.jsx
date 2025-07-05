import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import ReCAPTCHA from "react-google-recaptcha";
import db from "../client/db";
import { motion, AnimatePresence } from "framer-motion";
import { HiXCircle, HiCheckCircle } from "react-icons/hi";

const Register = () => {
  const navigate = useNavigate();
  const [pwVis, setPwVis] = useState(false);
  const [credentials, setCredentials] = useState({
    username: "",
    email: "",
  });
  const [output, setOutput] = useState({
    message: "",
    state: "",
  });
  const [passwords, setPasswords] = useState({
    first: "",
    second: "",
  });
  const [logging, setLogging] = useState(false);
  const [captcha, setCaptcha] = useState(null);
  const [msg, setMsg] = useState(false);

  useEffect(() => {
    let timeoutId;

    if (msg) {
      timeoutId = setTimeout(() => {
        setMsg(false);
      }, 3000);
    }
    return () => clearTimeout(timeoutId);
  }, [msg]);

  const registerUser = async (e) => {
    e.preventDefault();
    setLogging(true)
    if (
      credentials.email.trim() === "" ||
      credentials.username.trim() === "" ||
      passwords.first.trim() === ""
    ) {
      setOutput({
        ...output,
        message: "Missing required fields!",
        state: "error",
      });
      setMsg(true);
      setLogging(false);
      return;
    }
    if (passwords.first.length < 8) {
      setOutput({
        ...output,
        message: "Password must be at least 8 characters long",
      });
      setMsg(true);
      setLogging(false);
      return;
    }

    if (passwords.first !== passwords.second) {
      setOutput({
        ...output,
        message: "Passwords do not match",
        state: "error",
      });
      setMsg(true);
      setLogging(false);
      return;
    }
    if (!captcha) {
      setOutput({
        ...output,
        message: "Please verify the ReCAPTCHA box",
        state: "error",
      });
      setMsg(true);
      setLogging(false);
      return;
    }
    const { data, error } = await db.auth.signUp({
      email: credentials.email,
      password: passwords.first,
      options: {
        data: {
          username: credentials.username,
        },
        emailRedirectTo: import.meta.env.VITE_VERIFY_ROUTE
      },
    });

    if (error) {
      setOutput({ ...output, message: error.message, state: "error" });
      setMsg(true);
      setLogging(false);
    } else {
      setOutput({
        message: "Successful Signup! Check your email to confirm",
        state: "success",
      });
      setMsg(true);
      navigate("/verify")
    }
  };

  return (
    <div className="pt-24 flex flex-col sm:items-center justify-center h-[100dvh] p-6">
      <div className="">
        <p className="text-white text-4xl font-bold">
          Register for Gold Street
        </p>
        <p className="text-xl text-neutral-500">
          Already a member?{" "}
          <Link className="text-white font-bold" to="/login">
            Log In
          </Link>{" "}
        </p>
        <form
          onSubmit={registerUser}
          className="flex flex-col items-center gap-2 py-2"
        >
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
            value={credentials.username}
            className="text-2xl outline-none w-full text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40 border border-neutral-900"
            type="text"
            placeholder="Your telegram handle"
          />
          <input
            onChange={(e) =>
              setCredentials({ ...credentials, email: e.target.value })
            }
            value={credentials.email}
            className="invalid:bg-red-900/30 w-full border transition duration-100 invalid:border-red-900 text-2xl outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40 border-neutral-900"
            type="email"
            placeholder="Email"
          />

          <div className="relative w-full z-[0]">
            <input
              onChange={(e) =>
                setPasswords({ ...passwords, first: e.target.value })
              }
              value={passwords.first}
              className="text-2xl w-full outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40 border border-neutral-900"
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

          <input
            onChange={(e) =>
              setPasswords({ ...passwords, second: e.target.value })
            }
            value={passwords.second}
            className="text-2xl w-full border border-neutral-900 outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40"
            type={pwVis ? "text" : "password"}
            placeholder="Confirm Password"
          />
          <ReCAPTCHA
            theme="dark"
            sitekey={import.meta.env.VITE_RECAPTCHA_SITE}
            onChange={(token) => setCaptcha(token)}
          />
          <AnimatePresence>
            {msg && (
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                exit={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex gap-2 items-center text-nowrap text-base 
    ${output.state === "error" ? "text-red-500" : "text-green-500"} font-bold`}
              >
                {output.state === "error" ? <HiXCircle /> : <HiCheckCircle />}
                {output.message}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="flex justify-center w-full cursor-pointer sm:hover:scale-101 active:scale-100 transition duration-100 p-3 sm:p-3 text-2xl font-bold rounded-xl bg-white"
          >
            {logging ? <div className="loader m-2"></div> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
