import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Container } from "@mui/material";


function Messages({ handleSendMessage}) {
  const [message, setMessage] = useState("");


  const sendMessage = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMessage(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <div className="button-container">

      </div>
      <form className="input-container" onSubmit={(event) => sendMessage(event)}>
        <input
          type="text"
          placeholder="type here"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

export default Messages;