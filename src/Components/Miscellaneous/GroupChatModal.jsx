import React, { useState } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    FormControl,
    Input,
    useToast,
    Box,
} from "@chakra-ui/react";
import { ChatState } from "../../Context/chatContextProvider";
import { UserListItem } from "./UserListItem";
import { UserBadgeItem } from "./UserBadgeItem";
import api from "../../Api/api";

export const GroupChatModal = ({ children }) => {
    const { token, chats, setChats } = ChatState();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [groupChatName, setGroupChatName] = useState();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const handleSearch = async (query) => {
        if (!query) {
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

    const handleSubmit = async () => {
        if (!groupChatName || !selectedUsers) {
            toast({
                title: "Please fill all the feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            const groupCharMembers = selectedUsers.map((user) => user._id);

            const result = await api.post(
                `/chat/create-group-chat`,
                {
                    groupChatName: groupChatName,
                    groupCharMembers: groupCharMembers,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setChats([result.data.result, ...chats]);
            onClose();
            setSearchResult([]);
            setSelectedUsers([]);
            toast({
                title: "New Group Chat Created!",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to Create the Chat!",
                description: error.response?.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };
    const handleGroup = (userToAdd) => {
        if (selectedUsers.length === 50) {
            toast({
                title: "Cannot add more than 50 users",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        if (selectedUsers.includes(userToAdd)) {
            toast({
                title: "User already added",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        setSelectedUsers([...selectedUsers, userToAdd]);
    };
    const handleDelete = (delUser) => {
        setSelectedUsers(
            selectedUsers.filter((sel) => sel._id !== delUser._id)
        );
    };
    return (
        <>
            <span onClick={onOpen}>{children}</span>
            <Modal onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent margin="20px">
                    <ModalHeader
                        fontSize="35px"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="center"
                    >
                        Create Group Chat
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                    >
                        <FormControl>
                            <Input
                                placeholder="Chat Name"
                                marginBottom={3}
                                onChange={(e) =>
                                    setGroupChatName(e.target.value)
                                }
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                placeholder="Add Users eg: John"
                                marginBottom={1}
                                onChange={(e) => handleSearch(e.target.value)}
                            />
                        </FormControl>
                        <Box w="100%" d="flex" flexWrap="wrap">
                            {selectedUsers.map((u) => (
                                <UserBadgeItem
                                    key={u._id}
                                    user={u}
                                    handleFunction={() => handleDelete(u)}
                                />
                            ))}
                        </Box>
                        {loading ? (
                            // <ChatLoading />
                            <div>Loading...</div>
                        ) : (
                            searchResult
                                ?.slice(0, 4)
                                .map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => handleGroup(user)}
                                    />
                                ))
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={handleSubmit} colorScheme="blue">
                            Create Chat
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};
