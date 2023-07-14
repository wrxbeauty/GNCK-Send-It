import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Chatpage() {
    const [chats, setChats] = useState([]);

    const fetchChats = async () => {
        try {
            const { data } = await axios.get('/api/chat');
            setChats(data);
        } catch (error) {
            console.log('Error fetching chats:', error);
        }
    };

    useEffect(() => {
        fetchChats();
    }, []);

    return (
        <div>
            {chats.map((chat) => (
                <div key={chat._id}>
                    <h3>{chat.chatName}</h3>
                    {/* Render additional chat details */}
                </div>
            ))}
        </div>
    );
}
