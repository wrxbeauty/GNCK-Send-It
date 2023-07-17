import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './pages/LoginForm/LoginForm'
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main"
import "./App.css";

function App() {
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
