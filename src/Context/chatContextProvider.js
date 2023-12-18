import { createContext, useContext, useEffect, useState } from "react";

import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState();
    const [notifications, setNotifications] = useState([]);

    const history = useHistory();

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        setUser(userInfo);
        setToken(token);

        if (!userInfo || !token) {
            history.push("/");
        }
    }, [history]);
    return (
        <ChatContext.Provider
            value={{
                user,
                setUser,
                token,
                setToken,
                selectedChat,
                setSelectedChat,
                chats,
                setChats,
                notifications,
                setNotifications,
            }}
        >
            {children}
        </ChatContext.Provider>
    );
};

export const ChatState = () => {
    return useContext(ChatContext);
};

export default ChatProvider;
