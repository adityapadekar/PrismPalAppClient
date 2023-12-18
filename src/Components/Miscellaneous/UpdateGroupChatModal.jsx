import React, { useState } from "react";

import {
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    FormControl,
    Input,
    ModalFooter,
    Button,
    Box,
    Spinner,
    useToast,
} from "@chakra-ui/react";

import { ViewIcon } from "@chakra-ui/icons";

import { ChatState } from "../../Context/chatContextProvider";

import api from "../../Api/api";

import { UserBadgeItem } from "./UserBadgeItem";
import { UserListItem } from "./UserListItem";

export const UpdateGroupChatModal = ({
    fetchMessages,
    fetchAgain,
    setFetchAgain,
}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { selectedChat, setSelectedChat, user, token } = ChatState();

    const [groupChatName, setGroupChatName] = useState();
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [renameloading, setRenameLoading] = useState(false);

    const toast = useToast();

    const handleSearch = async (query) => {
        if (!query) {
            setSearchResult([]);
            return;
        }

        try {
            setLoading(true);
            const result = await api.get(`/user/searchuser?search=${query}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setSearchResult(result.data.result);
            setLoading(false);
        } catch (error) {
            setSearchResult([]);
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleRemove = async (chatUser) => {
        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can remove someone!",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            setLoading(true);

            const result = await api.patch(
                "/chat/remove-from-group-chat",
                {
                    chatId: selectedChat._id,
                    usersToBeRemoved: chatUser._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat(result.data.result);
            setFetchAgain(!fetchAgain);
            fetchMessages();
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };
    const handleLeave = async () => {
        try {
            setLoading(true);

            await api.patch(
                "/chat/leave-group-chat",
                {
                    chatId: selectedChat._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat();
            setFetchAgain(!fetchAgain);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleRename = async () => {
        if (!groupChatName) {
            toast({
                title: "Please enter group name",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            setRenameLoading(true);
            const result = await api.patch(
                "/chat/rename-group-chat",
                {
                    chatId: selectedChat._id,
                    chatName: groupChatName,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat(result.data?.result);
            setFetchAgain(!fetchAgain);
            setGroupChatName("");
            setRenameLoading(false);
            toast({
                title: "Group Chat Renamed",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            setRenameLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const handleAddUser = async (userToBeAdded) => {
        if (selectedChat.users.length === 50) {
            toast({
                title: "Cannot add more than 50 users",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        if (selectedChat.users.find((u) => u._id === userToBeAdded._id)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        if (selectedChat.groupAdmin._id !== user._id) {
            toast({
                title: "Only admins can add someone",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        try {
            setLoading(true);
            const result = await api.patch(
                "/chat/add-to-group-chat",
                {
                    chatId: selectedChat._id,
                    userToBeAdded: userToBeAdded._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedChat(result.data.result);
            setFetchAgain(!fetchAgain);
            setLoading(false);
            toast({
                title: "User Added",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    return (
        <>
            <IconButton
                display={{ base: "flex" }}
                icon={<ViewIcon />}
                onClick={onOpen}
            />
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        {selectedChat.chatName}
                    </ModalHeader>

                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <Box
                            width="100%"
                            display="flex"
                            flexWrap="wrap"
                            paddingBottom={3}
                        >
                            {selectedChat.users.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    admin={selectedChat.groupAdmin}
                                    handleFunction={() => handleRemove(u)}
                                />
                            ))}
                        </Box>
                        <FormControl display="flex">
                            <Input
                                placeholder="Chat Name"
                                marginBottom={3}
                                value={groupChatName}
                                onChange={(e) =>
                                    setGroupChatName(e.target.value)
                                }
                            />
                            <Button
                                variant="solid"
                                colorScheme="teal"
                                marginLeft={1}
                                isLoading={renameloading}
                                onClick={handleRename}
                            >
                                Update
                            </Button>
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add User to group"
                                marginBottom={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>

                        {loading ? (
                            <Spinner size="lg" />
                        ) : (
                            searchResult?.map((u) => (
                                <UserListItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleAddUser(u)}
                                />
                            ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={() => handleLeave()} colorScheme="red">
                            Leave Group
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
