import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import Lottie from "lottie-react";
import {
    Box,
    Text,
    useToast,
    IconButton,
    Spinner,
    FormControl,
    Input,
} from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { ChatState } from "../../Context/chatContextProvider";
import api from "../../Api/api";
import { getSender, getSenderFull } from "../../Utils/chatLogics";
import { ProfileModal } from "./ProfileModal";
import { UpdateGroupChatModal } from "./UpdateGroupChatModal";
import { ScrollableChat } from "./ScrollableChat";
import typingAnimation from "../../Animations/typing.json";

const ENDPOINT_URL = "https://prismpalappserver.onrender.com";
// const ENDPOINT_URL = "http://localhost:8080";

let socket, selectedChatCompare;

export const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const {
        user,
        token,
        selectedChat,
        setSelectedChat,
        notifications,
        setNotifications,
    } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [socketConnected, setSocketConnected] = useState(false);
    const [typing, setTyping] = useState(false);
    const [isTyping, setIsTyping] = useState(false);

    const toast = useToast();

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const response = await api.get(
                `/message/get-all-messages/${selectedChat._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages(response.data.result);
            setLoading(false);

            socket.emit("join chat", selectedChat._id);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: "Failed to Load Messages",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            socket.emit("stop typing", selectedChat._id);
            try {
                setNewMessage("");
                const response = await api.post(
                    "/message/send-message",
                    {
                        chatId: selectedChat._id,

                        content: newMessage,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                socket.emit("new message", response.data.result);

                setMessages([...messages, response.data.result]);
            } catch (error) {
                console.log(error);
                toast({
                    title: "Error Occured!",
                    description: "Failed to Send the Messages",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top",
                });
            }
        }
    };
    const typingHandler = (e) => {
        setNewMessage(e.target.value);

        if (!socketConnected) return;

        if (!typing) {
            setTyping(true);
            socket.emit("typing", selectedChat._id);
        }

        let lastTypingTime = new Date().getTime();
        let timerLength = 3000;
        setTimeout(() => {
            let timeNow = new Date().getTime();
            let timeDiff = timeNow - lastTypingTime;
            if (timeDiff >= timerLength && typing) {
                socket.emit("stop typing", selectedChat._id);
                setTyping(false);
            }
        }, timerLength);
    };

    useEffect(() => {
        socket = io(ENDPOINT_URL);
        socket.emit("setup", user);
        socket.on("connected", () => setSocketConnected(true));
        socket.on("typing", () => setIsTyping(true));
        socket.on("stop typing", () => setIsTyping(false));
    }, []); // eslint-disable-line

    useEffect(() => {
        fetchMessages();

        selectedChatCompare = selectedChat;
    }, [selectedChat]); // eslint-disable-line

    useEffect(() => {
        socket.on("message received", (newMessageRecieved) => {
            if (
                !selectedChatCompare ||
                selectedChatCompare._id !== newMessageRecieved.chat._id
            ) {
                if (!notifications.includes(newMessageRecieved)) {
                    setNotifications([newMessageRecieved, ...notifications]);
                    setFetchAgain(!fetchAgain);
                }
            } else {
                setMessages([...messages, newMessageRecieved]);
            }
        });
    });

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        paddingBottom={3}
                        paddingX={2}
                        width="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            icon={<ArrowBackIcon />}
                            onClick={() => setSelectedChat("")}
                        />
                        {messages &&
                            (!selectedChat.isGroupChat ? (
                                <>
                                    {getSender(user, selectedChat.users)}
                                    <ProfileModal
                                        user={getSenderFull(
                                            user,
                                            selectedChat.users
                                        )}
                                    />
                                </>
                            ) : (
                                <>
                                    {selectedChat.chatName.toUpperCase()}
                                    <UpdateGroupChatModal
                                        fetchMessages={fetchMessages}
                                        fetchAgain={fetchAgain}
                                        setFetchAgain={setFetchAgain}
                                    />
                                </>
                            ))}
                    </Text>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        padding={3}
                        background="#E8E8E8"
                        width="100%"
                        height="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                width={20}
                                height={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="flex flex-col overflow-y-scroll scrollbar-hide">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}
                        <FormControl
                            onKeyDown={(e) => sendMessage(e)}
                            isRequired
                            marginTop={3}
                        >
                            {isTyping ? (
                                <div>
                                    <Lottie
                                        animationData={typingAnimation}
                                        loop={true}
                                        autoplay={true}
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />
                                </div>
                            ) : null}
                            <Input
                                variant="filled"
                                background="#E0E0E0"
                                placeholder="Enter a message.."
                                onChange={(e) => typingHandler(e)}
                                value={newMessage}
                            ></Input>
                        </FormControl>
                    </Box>
                </>
            ) : (
                <>
                    <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        height="100%"
                    >
                        <Text
                            fontSize="3xl"
                            paddingBottom={3}
                            fontFamily="Work sans"
                        >
                            Your messages
                        </Text>
                    </Box>
                </>
            )}
        </>
    );
};
