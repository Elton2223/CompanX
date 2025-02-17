import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Register from "./components/Register";
import { CookiesProvider } from 'react-cookie';
import Login from "./components/Login";

function App() {
  return (
    <CookiesProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  </CookiesProvider>
    
  );
}

export default App;
