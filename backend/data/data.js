// sample data structure for representing chat conversations
const chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "Spider-Man",
        email: "spiderman@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "Spider-Man",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Hulk",
        email: "hulk@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Hulk",
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Captain America",
        email: "captainamerica@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Captain America",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Spider-Man",
        email: "spiderman@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
      {
        name: "Hulk",
        email: "hulk@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Avengers",
    groupAdmin: {
      name: "Hulk",
      email: "hulk@example.com",
    },
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Thor",
        email: "thor@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Thor",
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "Spider-Man",
        email: "spiderman@example.com",
      },
      {
        name: "Iron Man",
        email: "ironman@example.com",
      },
      {
        name: "Hulk",
        email: "hulk@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Marvel Heroes",
    groupAdmin: {
      name: "Hulk",
      email: "hulk@example.com",
    },
  },
];

module.exports = chats