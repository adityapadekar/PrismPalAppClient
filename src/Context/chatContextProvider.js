import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
    const [user, setUser] = useState();
    const [token, setToken] = useState();
    const [selectedChat, setSelectedChat] = useState();
    const [chats, setChats] = useState();
    const [notifications, setNotifications] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const currentPage = window.location.href.split("/")[3].split("?")[0];
        console.log(currentPage);
        if (currentPage === "email-verification") return;

        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        setUser(userInfo);
        setToken(token);

        if (!userInfo || !token) {
            navigate("/");
        }
    }, [navigate]);
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
