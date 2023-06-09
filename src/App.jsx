import { useState } from 'react'
import Whel from './components/Whel'
import Home from './components/Home'
import {
BrowserRouter as Router,
Routes,
Route
} from "react-router-dom"

function App() {
  
  
  return (
    <div className='p-0 m-0'>
     <Router>
      <Routes>
        <Route path="/" element={<Whel/>}/>
        <Route path="/homepage" element={<Home/>}/>
      </Routes>
     </Router>
      </div>
     
  )
}

export default App
