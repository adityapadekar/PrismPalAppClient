import React, { useState } from "react";

import { Box } from "@chakra-ui/react";

import { ChatState } from "../Context/chatContextProvider";

import { SideDrawer } from "../Components/Miscellaneous/SideDrawer";
import { MyChats } from "../Components/Chat/MyChats";
import { ChatBox } from "../Components/Chat/ChatBox";
export const ChatPage = () => {
    const { user, token } = ChatState();

    const [fetchAgain, setFetchAgain] = useState(false);

    return (
        <>
            <div className="w-full">
                {user && token && <SideDrawer />}
                <Box
                    display="flex"
                    justifyContent="space-between"
                    width="100%"
                    height="91.5vh"
                    padding="10px"
                >
                    {user && token && <MyChats fetchAgain={fetchAgain} />}
                    {user && token && (
                        <ChatBox
                            fetchAgain={fetchAgain}
                            setFetchAgain={setFetchAgain}
                        />
                    )}
                </Box>
            </div>
        </>
    );
};
