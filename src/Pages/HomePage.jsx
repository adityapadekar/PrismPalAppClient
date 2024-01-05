import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
    Container,
    Box,
    Text,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";

import { Login } from "../Components/Authentication/Login";
import { SignUp } from "../Components/Authentication/SignUp";

export const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        if (user && token) {
            navigate("/chats");
        }
    }, [navigate]);
    return (
        <>
            <Container maxW="xl" centerContent>
                <Box
                    display="flex"
                    justifyContent="center"
                    padding={3}
                    background="white"
                    width="100%"
                    margin="40px 0 15px 0"
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Text fontSize="4xl" fontFamily="Work sans" align="center">
                        PrismPal
                    </Text>
                </Box>
                <Box
                    background="white"
                    width="100%"
                    padding={4}
                    borderRadius="lg"
                    borderWidth="1px"
                >
                    <Tabs isFitted variant="soft-rounded">
                        <TabList marginBottom="1em">
                            <Tab>Login</Tab>
                            <Tab>Sign Up</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <Login />
                            </TabPanel>
                            <TabPanel>
                                <SignUp />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Container>
        </>
    );
};
