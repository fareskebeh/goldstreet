import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/Home"
import Nav from './components/Nav'
const App = () => {
  return (
    <Router>
      <Nav/>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
    </Router>
  )
}

export default App
