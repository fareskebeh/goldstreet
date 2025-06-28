import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import Login from "./authPages/Login";
import Register from "./authPages/Register";
import NotFound from "./components/NotFound";
import Pricing from "./components/Pricing";
import MbNav from "./components/MbNav";
import DtNav from "./components/DtNav";
import SlideShow from "./slide/SlideShow";
import Community from "./components/Community"
import ContactUs from "./components/ContactUs"
import bg from "./assets/bg.jpg"
import db from "./client/db";

const App = () => {
  
  const [user, setUser] = useState(null);


  const [vp, setVp] = useState(null);

  useEffect(() => {
  const { data: { subscription } } = db.auth.onAuthStateChange((_event, session) => {
    setUser(session?.user || null);
  });

  return () => subscription.unsubscribe();
}, []);


  useEffect(() => {
    const adjVp = () => {
      setVp(window.innerWidth < 700 ? "small" : "wide");
    };
    window.addEventListener("resize", adjVp);
    adjVp();
    return () => window.removeEventListener("resize", adjVp);
  }, []);

  return (
    <Router>
      <div className="relative" >
      <div className="fixed inset-0 -z-20 brightness-30 bg-center bg-cover" style={{backgroundImage:`url('${bg}')`}}/>
      {vp === "small" ? <MbNav user={user} /> : <DtNav user={user} />}
        <Routes>
          <Route path="/" element={<SlideShow vp={vp}/>}>
            <Route index element={<Navigate to="home" />} />
            <Route path="home" element={<Home/>}/>
            <Route path="community" element={<Community/>}/>
            <Route path="pricing" element={<Pricing/>}/>
            <Route path="contact-us" element={<ContactUs/>}/>
          </Route>
          <Route path="/login" element={user? <Navigate to="/home"/> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/home"/> : <Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
    </Router>
  );
};

export default App;
