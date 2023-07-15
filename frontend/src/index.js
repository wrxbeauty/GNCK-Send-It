import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
// import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import theme from "./chakra-theme";

ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      {/* <ChatProvider> */}
        <App />
      {/* </ChatProvider> */}
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);




