import "./App.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { io } from "socket.io-client";
import { useEffect, useState } from "react";

function App() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([""]);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (data) => {
      setChat([...chat, data.messagegit])
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  function handleForm(e) {
    e.preventDefault();
    socket.emit("message-from-client", { message });
    setMessage("");
  }

  return (
    <div>
      <Box component="form" onSubmit={handleForm}>
        <TextField
          id="standard-basic"
          label="Write your message"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="text" type="submit">
          Send
        </Button>
      </Box>
    </div>
  );
}

export default App;
