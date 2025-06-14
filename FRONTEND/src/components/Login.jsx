import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const Login = () => {
  const [pwVis, setPwVis] = useState(false);
  return (
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
        <form className="flex flex-col gap-3 py-4">
          <input
            className="text-2xl outline-none text-white placeholder:text-neutral-600 p-4 rounded-xl bg-neutral-900/80"
            type="text"
            placeholder="Username"
          />

            <div className="relative z-0">
            <input
              className="text-2xl w-full outline-none text-white placeholder:text-neutral-600 p-4 rounded-xl bg-neutral-900/80"
              type={pwVis ? "text" : "password"}
              placeholder="Password"
            />
            <button
              onClick={() => setPwVis(!pwVis)}
              type="button"
              className={`sm:cursor-pointer transition duration-100 ${
                pwVis ? "text-white" : "text-neutral-600"
              } absolute top-5.5 right-4`}
            >
              {pwVis ? (
                <HiOutlineEye size={24} />
              ) : (
                <HiOutlineEyeOff size={24} />
              )}
            </button>
            </div>

          <button
            type="submit"
            className="sm:cursor-pointer sm:hover:scale-101 sm:active:scale-100 transition duration-100 p-4 sm:p-3 text-3xl font-bold rounded-xl bg-white"
          >
            Log In
          </button>
        </form>
        <Link className="text-xl text-neutral-400">Forgot Password</Link>
      </div>
    </div>
  );
};

export default Login;
