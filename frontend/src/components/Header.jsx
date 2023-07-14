import React from 'react';
import { BrowserRouter, Link } from "react-router-dom";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import { v4 as uuidv4 } from "uuid";

function Header() {
  const roomId = uuidv4();
  
  return (
    <Card sx={{ marginTop: 5, backgroundColor: 'gray' }} raised>
      <BrowserRouter>
      <Link to="/">
        <Button sx={{ color: "white" }} variant="text">
          Home
        </Button>
      </Link>
      <Link to="/chats">
        <Button sx={{ color: "white" }} variant="text">
          Chats
        </Button>
      </Link>
      <Link to={`/room/${roomId}`}>
        <Button sx={{ color: "white" }} variant="text">
          Room1
        </Button>
      </Link>
      </BrowserRouter>  
    </Card>
  );
}

export default Header;