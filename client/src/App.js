import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import LoginForm from './pages/LoginForm/LoginForm'
import SignUp from "./pages/SignUp/SignUp";
import Main from "./pages/Main"
import Cookies from 'js-cookies';

import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
    const _userId = Cookies.getItem('userId');
    if (_userId) setUserId(_userId);
  }, []);


  return (


    <BrowserRouter>
      <Container>
        <Header socket={socket} userId={userId} setUserId={setUserId} />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet context={{ socket, userId }} />
        </Box>
      </Container>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Main />} />
      </Routes>

      
    </BrowserRouter>
  );
}

export default App;
