import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { Container } from "@mui/material";


 function Messages({ handleSendMsg }) {
  const [message, setMessage] = useState("");
  

  const sendChat = (event) => {
    event.preventDefault();
    if (message.length > 0) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        
      </div>
      <form className="input-container" onSubmit={(event) => sendChat(event)}>
        <input
          type="text"
          placeholder="type your message here"
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