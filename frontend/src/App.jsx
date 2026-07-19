import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css'
import Login from'./pages/Login'
import Dashboard from "./pages/Dashboard";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
          <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>

      
    </>
  )
}

export default App
