import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Outlet } from "react-router-dom";
import { io } from "socket.io-client";
import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  
   useEffect(() => {
    setSocket(io("http://localhost:5001"));
   }, []);
  
  
  return (
    <div>
      <Container>
         <Header />
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Outlet context={{ socket }} />
        </Box>
        
      </Container>
    </div>
  );
}

export default App;
