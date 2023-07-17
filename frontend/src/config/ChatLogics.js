// Check if the current message has the same sender as the next message and is not sent by the logged-in user
export const isSameSenderMargin = (messages, m, i, userId) => {
  // console.log(i === messages.length - 1);

  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;// Return a margin value of 33 if the conditions are met
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0; // Return a margin value of 0 if the conditions are met
  else return "auto"; // Otherwise, return "auto" for automatic margin
};
// Check if the current message has a different sender than the next message and is not sent by the logged-in user
export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender._id !== m.sender._id ||
      messages[i + 1].sender._id === undefined) &&
    messages[i].sender._id !== userId
  );
};

// Return true if the conditions are met, indicating the same sender
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  ); // Return true if the conditions are met, indicating the last message
};

// Check if the current message has the same sender as the previous message
export const isSameUser = (messages, m, i) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id; // Return true if the conditions are met, indicating the same sender as the previous message

};

// Get the name of the sender based on the logged-in user and the other user(s) in the conversation
export const getSender = (loggedUser, users) => {
  return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

// Get the full details of the sender (object) based on the logged-in user and the other user(s) in the conversation
export const getSenderFull = (loggedUser, users) => {
  return users[0]._id === loggedUser._id ? users[1] : users[0];
};
