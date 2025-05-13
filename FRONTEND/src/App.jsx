import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Home from "./components/Home"

const App = () => {
  return (
    <Router>
    <div>
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
    </div>
    </Router>
  )
}

export default App
