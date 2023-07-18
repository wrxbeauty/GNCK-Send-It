//displays a badge for a user in a group chat

import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

const UserBadgeItem = ({ user, handleFunction, admin }) => {
  return (
    <Badge
      px={2} // Horizontal padding
      py={1} // Vertical padding
      borderRadius="lg" // Rounded corner
      m={1} // Margin
      mb={2} // Bottom margin
      variant="solid" // Solid style variant
      fontSize={12} // Font size
      colorScheme="purple" // Color scheme
      cursor="pointer" // Cursor style
      onClick={handleFunction} // Click event handler
    >
      {user.name} {/* Display user's name */}
      {admin === user._id && <span> (Admin)</span>} {/* Display "(Admin)" if the user is an admin */}
      <CloseIcon pl={1} /> {/* Close icon */}
    </Badge>
  );
};

export default UserBadgeItem;
