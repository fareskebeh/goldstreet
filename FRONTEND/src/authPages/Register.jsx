import {useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import db from "../client/db";

const Register = () => {
  const [pwVis, setPwVis] = useState(false);
  const [credentials,setCredentials] = useState({
    username:"",
    email:"",
  })
  const [output,setOutput] = useState({
    message:"",
    state:""
  })
  const [passwords,setPasswords] = useState({
    first:"",
    second:""
  })

  const registerUser = async (e)=> {
    e.preventDefault()
    if(passwords.first!==passwords.second) {
      setOutput({...output, message: "Passwords do not match", state: "error"})
      return;
    }
    else {
      const {data,error} = await db.auth.signUp({
        email: credentials.email,
        password: passwords.first,
        options: {
          data: {
            username: credentials.username
          }
        }
      })

      if(error) {
        setOutput({...output, message:error.message, state:"error"})
      } else {
        setOutput({message: 'Successful Signup! Check your email to confirm', state:"success"})
      }
    }
  };

  return (
    <div className="pt-24 flex flex-col sm:items-center justify-center h-[100dvh] p-6">
      <div className="">
        <p className="text-white text-4xl font-bold">Register for Gold Street</p>
        <p className="text-xl text-neutral-500">
          Already a member?{" "}
          <Link className="text-white font-bold" to="/login">
            Log In
          </Link>{" "}
        </p>
        <form onSubmit={registerUser} className="flex flex-col gap-2 py-2">
          <input
            onChange={(e)=> setCredentials({...credentials, username: e.target.value})}
            value={credentials.username}
            className="text-2xl outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40 border border-neutral-900"
            type="text"
            placeholder="Username"
          />
          <input
            onChange={(e)=> setCredentials({...credentials, email: e.target.value})}
            value={credentials.email}
            className="invalid:bg-red-900/30 border transition duration-100 invalid:border-red-900 text-2xl outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40 border-neutral-900"
            type="email"
            placeholder="Email"
          />

          <div className="relative z-[0]">
          <input
            onChange={(e)=> setPasswords({...passwords, first:e.target.value})}
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
              onChange={(e)=> setPasswords({...passwords, second:e.target.value})}
              value={passwords.second}
              className="text-2xl w-full border border-neutral-900 outline-none text-white placeholder:text-neutral-600 p-3 rounded-xl bg-black/40"
              type={pwVis ? "text" : "password"}
              placeholder="Confirm Password"
            />
            

          <button
            type="submit"
            className="cursor-pointer sm:hover:scale-101 active:scale-100 transition duration-100 p-3 sm:p-3 text-2xl font-bold rounded-xl bg-white"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
