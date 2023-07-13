import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import SendIcon from "@mui/icons-material/Send";
import OutlinedInput from "@mui/material/OutlinedInput";

import "./App.css";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data) => {
      setChat((prev) => [...prev, data.message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, chat]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("message-from-client", { message });
    setMessage("");
  }

  return (
    <div>
      <Container>
        <Box sx={{ marginBottom: 5 }}>
          {chat.map((message, index) => (
            <Typography key={index}>{message}</Typography>
          ))}
        </Box>

        <Box component="form" onSubmit={handleForm}>
          <OutlinedInput
            size="small"
            label="Write your message"
            value={message}
            placeholder="Write your message"
            onChange={(e) => setMessage(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton type="submit" edge="end">
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            }
          />
        </Box>
      </Container>
    </div>
  );
}

export default App;
