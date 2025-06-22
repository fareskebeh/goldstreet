import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import Pricing from "./components/Pricing";
import Register from "./components/Register";
import MbNav from "./components/MbNav";
import DtNav from "./components/DtNav";
import noPfp from "./assets/blank.png";
import SlideShow from "./slide/SlideShow";
import Community from "./components/Community"
import ContactUs from "./components/ContactUs"

const App = () => {
  //this line is here so that i can test how the app would look like with/without a user
  const [user, setUser] = useState(null);

  const [vp, setVp] = useState(null);

  useEffect(() => {
    const adjVp = () => {
      setVp(window.innerWidth < 500 ? "small" : "wide");
    };
    window.addEventListener("resize", adjVp);
    adjVp();
    return () => window.removeEventListener("resize", adjVp);
  }, []);

  return (
    <Router>
      {vp === "small" ? <MbNav user={user} /> : <DtNav user={user} />}
        <Routes>
          <Route path="/" element={<SlideShow vp={vp}/>}>
            <Route path="/home" element={<Home/>}/>
            <Route path="/community" element={<Community/>}/>
            <Route path="/pricing" element={<Pricing/>}/>
            <Route path="/contact-us" element={<ContactUs/>}/>
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
    </Router>
  );
};

export default App;
