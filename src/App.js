import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./components/Register";
import { CookiesProvider } from 'react-cookie';
import Login from "./components/Login";
import { Home } from "./components/Home";

function App() {
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
    
  );
}

export default App;
