import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from './components/Home'
import About from './components/About'
import Login from './components/Login'
import NotFound from './components/NotFound'
import Pricing from './components/Pricing'
import Register from './components/Register'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/home' element={<Home/>}/>
        <Route path='/' element={<Navigate to="/home"/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/pricing' element={<Pricing/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}

export default App
