import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
    Input,
    Box,
    Tooltip,
    Button,
    Text,
    Avatar,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure,
    useToast,
    Spinner,
    Badge,
} from "@chakra-ui/react";

import { SearchIcon, BellIcon, ChevronDownIcon } from "@chakra-ui/icons";

import { ChatState } from "../../Context/chatContextProvider";

import api from "../../Api/api";

import { ProfileModal } from "./ProfileModal";
import { UserLoading } from "../Utils/UserLoading";
import { UserListItem } from "./UserListItem";

import { getSender } from "../../Utils/chatLogics";

export const SideDrawer = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        user,
        token,
        chats,
        setChats,
        setSelectedChat,
        notifications,
        setNotifications,
    } = ChatState();

    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);

    const history = useHistory();
    const toast = useToast();

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please enter something in search",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }

        try {
            setLoading(true);
            const result = await api.get(`/user/searchuser?search=${search}`, {
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

    const accessChat = async (chatPartnerId) => {
        try {
            setLoadingChat(true);

            const result = await api.post(
                `/chat/access-chat`,
                { chatPartnerId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const newChatId = result.data.result._id;

            if (chats && !chats.find((chat) => chat._id === newChatId)) {
                const updatedChats = [result.data.result, ...chats];
                setChats(updatedChats);
            }

            setSelectedChat(result.data.result);
            onClose();
            setLoadingChat(false);
        } catch (error) {
            setSelectedChat();
            setLoadingChat(false);
            toast({
                title: "Error fetching the chat",
                description: error.response?.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        localStorage.removeItem("token");
        history.push("/");
    };
    return (
        <>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                background="white"
                width="100%"
                padding="5px 10px 5px 10px"
                borderWidth="5px"
            >
                <Tooltip
                    label="Search users to chat"
                    hasArrow
                    placement="bottom-end"
                >
                    <Button variant={"ghost"} onClick={onOpen}>
                        <SearchIcon></SearchIcon>
                        <Text
                            display={{ base: "none", md: "flex" }}
                            paddingX={4}
                        >
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    PrismPal
                </Text>
                <div>
                    <Menu>
                        <MenuButton padding={1}>
                            <Badge width="60px">
                                {notifications.length}
                                <BellIcon fontSize="2xl" margin={1} />
                            </Badge>
                        </MenuButton>
                        <MenuList pl={2}>
                            {!notifications.length && "No New Messages"}
                            {notifications.map((notification) => (
                                <MenuItem
                                    key={notification._id}
                                    onClick={() => {
                                        setSelectedChat(notification.chat);
                                        setNotifications(
                                            notifications.filter(
                                                (n) => n !== notification
                                            )
                                        );
                                    }}
                                >
                                    {notification.chat.isGroupChat
                                        ? `New Message in ${notification.chat.chatName}`
                                        : `New Message from ${getSender(
                                              user,
                                              notification.chat.users
                                          )}`}
                                </MenuItem>
                            ))}
                        </MenuList>
                    </Menu>
                    <Menu>
                        <MenuButton
                            as={Button}
                            background="white"
                            rightIcon={<ChevronDownIcon />}
                        >
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.name}
                                src={user.profilePicture.url}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </div>
            </Box>

            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Search Users
                    </DrawerHeader>
                    <DrawerBody>
                        <Box display="flex" paddingBottom={2}>
                            <Input
                                placeholder="Search by name or email"
                                marginRight={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>Go</Button>
                        </Box>
                        {loading ? (
                            <UserLoading />
                        ) : (
                            searchResult?.map((item) => (
                                <UserListItem
                                    key={item._id}
                                    user={item}
                                    handleFunction={() => accessChat(item._id)}
                                />
                            ))
                        )}
                        {loadingChat && (
                            <Spinner marginLeft="auto" display="flex" />
                        )}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
};
