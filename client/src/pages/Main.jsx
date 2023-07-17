import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { Container } from "@mui/material";
import { allUsersRoute, host } from "../utilities/APIRoutes";
import MessageContainer from "../components/MessageContainer";
import Contacts from "../components/Contacts";
import Home from "../components/Home.jsx";

function Main() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(async () => {
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

   useEffect(async () => {
   if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setContacts(data.data);
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);

  const handleMessageChange = (message) => {
     setCurrentMessage(message);

  return (
    <>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeMessage={handleMessageChange} />
          {currentMessage === undefined ? (
            <Home />
          ) : (
            <MessageContainer currentMessage={currentMessage} socket={socket} />
          )}
        </div>
      </Container>
    </>
  );
}
}


export default Main;