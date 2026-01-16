import React, { useEffect, useState, useRef } from 'react';
import chatService from '../../services/chatService';
import userService from '../../services/userService';

const ChatWindow = ({ team }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [currentUser, setCurrentUser] = useState(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const fetchUser = async () => {
            const user = await userService.getCurrentUser();
            setCurrentUser(user);
        };
        fetchUser();
    }, []);

    useEffect(() => {
        if (team) {
            const fetchMessages = async () => {
                try {
                    const data = await chatService.getMessages(team.id);
                    setMessages(data);
                } catch (error) {
                    console.error("Failed to load messages");
                }
            };
            fetchMessages();
            // In a real app, you'd set up WebSocket subscription here
        }
    }, [team]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !team) return;

        try {
            await chatService.sendMessage({
                teamId: team.id,
                content: newMessage,
                type: 'TEXT'
            });
            setNewMessage("");
            // Optimistic update or wait for ws
            const tempMsg = {
                id: Date.now(),
                content: newMessage,
                sender: currentUser,
                createdAt: new Date().toISOString()
            };
            setMessages([...messages, tempMsg]);
        } catch (error) {
            console.error("Failed to send message");
        }
    };

    if (!team) {
        return (
            <div className="h-full flex items-center justify-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-300">
                <p className="text-gray-500">Select a team to start chatting</p>
            </div>
        );
    }

    return (
        <div className="bg-white rounded-xl shadow-md h-full flex flex-col">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-lg text-gray-800">#{team.name}</h3>
                <span className="text-xs text-gray-500">{team.members?.length} members</span>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((msg) => {
                    const isOwn = msg.sender?.id === currentUser?.id;
                    return (
                        <div key={msg.id} className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[70%] rounded-2xl px-4 py-2 ${isOwn ? 'bg-indigo-600 text-white rounded-br-none' : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}>
                                {!isOwn && <p className="text-xs font-bold mb-1 opacity-70">{msg.sender?.username}</p>}
                                <p className="text-sm">{msg.content}</p>
                                <p className={`text-[10px] mt-1 ${isOwn ? 'text-indigo-200' : 'text-gray-400'}`}>
                                    {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-gray-100 flex gap-2">
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                    type="submit"
                    className="bg-indigo-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-indigo-700 transition"
                >
                    ➤
                </button>
            </form>
        </div>
    );
};

export default ChatWindow;
