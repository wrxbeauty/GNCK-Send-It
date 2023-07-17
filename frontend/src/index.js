import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <ChakraProvider>
    {/* Wrap the app with BrowserRouter for routing */}
    <BrowserRouter>
      {/* Wrap the app with ChatProvider to provide chat context */}
      <ChatProvider>
        {/* Render the App component */}

        <App />
      </ChatProvider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);
