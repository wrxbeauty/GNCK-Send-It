import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chatpage() {
    // Define state variable 'chats' and its setter function using useState()
    const [chats, setChats] = useState([]);

    // Define an asynchronous function 'fetchChats' to fetch chat data
    const fetchChats = async () => {
        try {
            // Send a GET request to '/api/chat' using axios and retrieve the response data
            const { data } = await axios.get('/api/chat');

            // Update the 'chats' state with the fetched chat data
            setChats(data);
        } catch (error) {
            // If an error occurs, log the error message to the console
            console.log('Error fetching chats:', error);
        }
    };

    // Use the useEffect() hook to fetch chats when the component mounts
    useEffect(() => {
        fetchChats();
    }, []);

    // Render the component's UI
    return (
        <div>
            {/* Map over the 'chats' array and render each chat */}
            {chats.map((chat) => (
                <div key={chat._id}>
                    {/* Render the chat name */}
                    <h3>{chat.chatName}</h3>
                    {/* Render additional chat details */}
                </div>
            ))}
        </div>
    );
}
