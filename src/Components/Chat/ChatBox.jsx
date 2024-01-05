import React from "react";
import { Box } from "@chakra-ui/react";
import { ChatState } from "../../Context/chatContextProvider";
import { SingleChat } from "../Miscellaneous/SingleChat";

export const ChatBox = ({ fetchAgain, setFetchAgain }) => {
    const { selectedChat } = ChatState();
    return (
        <>
            <Box
                display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
                alignItems="center"
                flexDirection="column"
                padding={3}
                background="white"
                width={{ base: "100%", md: "68%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <SingleChat
                    fetchAgain={fetchAgain}
                    setFetchAgain={setFetchAgain}
                />
            </Box>
        </>
    );
};
