import React, { useEffect, useState } from "react";

import { Box, useToast, Button, Text, Stack } from "@chakra-ui/react";

import { AddIcon } from "@chakra-ui/icons";

import { ChatState } from "../../Context/chatContextProvider";

import api from "../../Api/api";

import { ChatLoading } from "../Utils/ChatLoading";
import { GroupChatModal } from "../Miscellaneous/GroupChatModal";

import { getSender } from "../../Utils/chatLogics";

export const MyChats = ({ fetchAgain }) => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, token, chats, setChats } =
        ChatState();

    const toast = useToast();

    const fetchChats = async () => {
        try {
            const result = await api.get(`/chat/get-chat`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setChats(result.data.result);
        } catch (error) {
            console.log(error);
            toast({
                title: "Error Occured!",
                description: error.response?.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
        fetchChats();
    }, [fetchAgain]); // eslint-disable-line
    return (
        <>
            <Box
                display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
                flexDir="column"
                alignItems="center"
                padding={3}
                background="white"
                width={{ base: "100%", md: "31%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Box
                    paddingBottom={3}
                    paddingX={3}
                    fontSize={{ base: "20px", md: "24px" }}
                    fontFamily="Work sans"
                    display="flex"
                    width="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    Chats
                    <GroupChatModal>
                        <Button
                            display="flex"
                            fontSize={{ base: "17px", md: "10px", lg: "16px" }}
                            rightIcon={<AddIcon />}
                        >
                            Create Group
                        </Button>
                    </GroupChatModal>
                </Box>
                <Box
                    display="flex"
                    flexDirection="column"
                    padding={3}
                    background="#F8F8F8"
                    width="100%"
                    height="100%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {chats ? (
                        <Stack overflowY="scroll">
                            {chats.map((chat) => (
                                <Box
                                    onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    background={
                                        selectedChat === chat
                                            ? "#38B2AC"
                                            : "#E8E8E8"
                                    }
                                    color={
                                        selectedChat === chat
                                            ? "white"
                                            : "black"
                                    }
                                    paddingX={3}
                                    paddingY={2}
                                    borderRadius="lg"
                                    key={chat._id}
                                >
                                    <Text>
                                        {!chat.isGroupChat
                                            ? getSender(loggedUser, chat.users)
                                            : chat.chatName}
                                    </Text>
                                    {chat.latestMessage && (
                                        <Text fontSize="xs">
                                            <b>
                                                {chat.latestMessage.sender.name}{" "}
                                                :{" "}
                                            </b>
                                            {chat.latestMessage.content.length >
                                            50
                                                ? chat.latestMessage.content.substring(
                                                      0,
                                                      51
                                                  ) + "..."
                                                : chat.latestMessage.content}
                                        </Text>
                                    )}
                                </Box>
                            ))}
                        </Stack>
                    ) : (
                        <ChatLoading />
                    )}
                </Box>
            </Box>
        </>
    );
};
