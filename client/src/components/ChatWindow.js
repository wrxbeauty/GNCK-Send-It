import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
import Card from "@mui/material/Card";
import { useOutletContext, useParams } from 'react-router-dom';

export default function ChatWindow() {
  const { socket } = useOutletContext();
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [typing, setTyping] = useState(false);
  const { roomId } = useParams();

 

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data) => {
      setChat((prev) => [...prev, { message: data.message, sender: false }]);
    });

    socket.on("typing-started-from-server", () => {
      setTyping(true);
    });

    socket.on("typing-stopped-from-server", () => {
      setTyping(false);
    });

    return () => {
      socket.off("message");
    };
  }, [socket, chat]);

  function handleForm(e) {
    e.preventDefault();
    setChat((prev) => [...prev, { message: message, sender: true }]);
    socket.emit("message-from-client", { message, roomId });
    setMessage("");
  }

  const [typingTimeout, setTypingTimeout] = useState(null);

  function handleInput(e) {
    setMessage(e.target.value);
    socket.emit("typing-started", { roomId });

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const newTimeout = setTimeout(() => {
      socket.emit("typing-stopped", { roomId });
    }, 1000);

    setTypingTimeout(newTimeout);
  }

  return (
    <Card
      sx={{
        padding: 2,
        marginTop: 10,
        width: "100%",
        backgroundColor: "gray",
      }}
    >
      {
        roomId && <Typography>Room: {roomId}</Typography>}
     
      <Box sx={{ marginBottom: 5 }}>
        {chat.map((data, index) => (
          <Typography
            key={index}
            sx={{
              textAlign: data.sender ? "right" : "left",
              marginBottom: 1,
              
            }}
            
          >
        
            {data.message}
          </Typography>
        ))}
      </Box>
      

      <Box component="form" onSubmit={handleForm}>
        {typing && (
          <InputLabel sx={{ color: "white" }} shrink htmlFor="message-input">
            Typing...
          </InputLabel>
        )}
        <OutlinedInput
          sx={{ backgroundColor: "white" }}
          size="small"
          fullWidth
          id="message-input"
          label="Write your message"
          value={message}
          placeholder="Write your message"
          inputProps={{ "aria-label": "search google maps" }}
          onChange={handleInput}
          endAdornment={
            <InputAdornment position="end">
              <IconButton type="submit" edge="end">
                <SendIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Box>
    </Card>
  );
}
