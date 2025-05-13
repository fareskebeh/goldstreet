import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/Home"
import Nav from './components/Nav'
import Pricing from './components/Pricing'
import About from './components/About'
import Contact from './components/Contact'
import Register from './components/Register'
import Login from './components/Login'

const App = () => {
  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/pricing' element={<Pricing/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/Contact' element={<Contact/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
        </Routes>
    </Router>
  )
}

export default App
