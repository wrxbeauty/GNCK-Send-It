import React, { useState, useEffect } from 'react';
import './App.css';
import SignUp from './components/SignUp/SignUp';
import LoginForm from './components/LoginForm/LoginForm';
import ChatWindow from './components/ChatWindow';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


import Header from "./components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  return (
    <div className="App">
      <Container>
        <Header />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet context={{ socket }} />
        </Box>

      </Container>

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginForm />}></Route>
          <Route path='/signup' element={<SignUp />}></Route>
          <Route path='/main' element={<ChatWindow />}></Route>
        </Routes>
      </BrowserRouter>


    </div>
  );
}

export default App;
