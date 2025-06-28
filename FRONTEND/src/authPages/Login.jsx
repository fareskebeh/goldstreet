import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import db from "../client/db"
import { HiXCircle, HiCheckCircle } from "react-icons/hi";

const Login = () => {
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [pwVis, setPwVis] = useState(false);
  const [output,setOutput] = useState({
    message:"",
    errorMessage: false
  })

  const login = async(e) => {
    e.preventDefault()
    const {data,error} = await db.auth.signInwithPassword({
      username,
      password
    });
    if(error) {

    }
  }


  return (
    <div className="pt-24 relative z-0 flex flex-col sm:items-center justify-center h-[100dvh] p-6">
      
      <p className={`flex items-center gap-2 absolute text-xl ${output.errorMessage ? "bg-red-500" : "bg-green-500"} rounded-xl text-white font-bold bottom-20 p-2 left-1/2 -translate-x-1/2`}>
        {output.errorMessage? <HiXCircle/> : <HiCheckCircle/>}
        {output.message}
      </p>

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
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            className="text-2xl outline-none text-white placeholder:text-neutral-600 p-3 border border-neutral-900 rounded-xl bg-black/40"
            type="text"
            placeholder="Username"
          />

            <div className="relative z-0">
            <input
              onChange={(e)=>setPassword(e.target.value)}
              value={password}
              className="text-2xl w-full outline-none text-white placeholder:text-neutral-600 p-3 border border-neutral-900 rounded-xl bg-black/40"
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
