import React, { useState, useEffect } from "react";
import { Container } from "@mui/material";


 function Home() {
  const [userName, setUserName] = useState("");
  useEffect(async () => {
    setUserName(
      await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      ).username
    );
  }, []);
  return (
    <Container>
      
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Who do you want to chat with?</h3>
    </Container>
  );
}

export default Home;