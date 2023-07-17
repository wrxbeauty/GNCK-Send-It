import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import Chatbox from "../components/Chatbox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false); // State for triggering fetching data again
  const { user } = ChatState(); // Accessing chat-related state using the ChatState hook

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />} {/* Render the SideDrawer component if the user is logged in */}
      <Box d="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats fetchAgain={fetchAgain} />} {/* Render the MyChats component if the user is logged in */}
        {user && (
          <Chatbox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
        )} {/* Render the Chatbox component if the user is logged in */}
      </Box>
    </div>
  );
};

export default Chatpage;
