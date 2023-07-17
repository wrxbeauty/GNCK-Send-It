import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

// Create a new context for chat-related state
const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState(); // State for storing the currently selected chat
  const [user, setUser] = useState(); // State for storing user information
  const [notification, setNotification] = useState([]); // State for storing chat notifications
  const [chats, setChats] = useState(); // State for storing chat data

  const history = useHistory(); // Access the browser's history object

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo")); // Retrieve user information from local storage
    setUser(userInfo); // Set the user state with the retrieved information

    if (!userInfo) history.push("/"); // Custom hook for accessing chat-related state from the context
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook for accessing chat-related state from the context
export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;
