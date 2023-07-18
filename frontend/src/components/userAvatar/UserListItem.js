// represents an item in a user list. It displays the user's avatar, name, and email.

import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ handleFunction }) => {
  // Access user information from the ChatState context
  const { user } = ChatState();

  return (
    <Box
      onClick={handleFunction} // Click event handler
      cursor="pointer" // Cursor style
      bg="#E8E8E8" // Background color
      _hover={{
        background: "#38B2AC", // Background color on hover
        color: "white", // Text color on hover
      }}
      w="100%" // Width
      d="flex" // Flex display
      alignItems="center" // Vertical alignment
      color="black" // Text color
      px={3} // Horizontal padding
      py={2} // Vertical padding
      mb={2} // Bottom margin
      borderRadius="lg" // Rounded corner
    >
      <Avatar
        mr={2} // Right margin
        size="sm" // Avatar size
        cursor="pointer" // Cursor style
        name={user.name} // User name (for fallback text)
        src={user.pic} // User avatar image source
      />
      <Box>
        <Text>{user.name}</Text> {/* Display user's name */}
        <Text fontSize="xs">
          <b>Email : </b>
          {user.email} {/* Display user's email */}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;
