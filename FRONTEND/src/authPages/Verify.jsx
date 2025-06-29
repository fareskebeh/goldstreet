import { useState,useEffect } from "react";
import db from "../client/db";
import { HiCheckCircle } from "react-icons/hi";

const Verify = () => {
    const[verified,setVerified] = useState(false)

  useEffect(() => {
    const { data: { subscription } } = db.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user?.email_confirmed_at) {
          setVerified(true)
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="h-screen flex items-center w-full">
      <div className="p-4 items-center flex flex-col gap-4">
        <p className="font-bold text-3xl text-white">Verifying your email</p>
        <p className="text-neutral-400">Please check your inbox</p>
        {
           verified ? <HiCheckCircle size={40} className="text-green-500"/> : <div className="verify-loader" />
        }  
      
      </div>
    </div>
  );
};

export default Verify;
