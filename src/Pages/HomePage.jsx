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
    Image,
} from "@chakra-ui/react";
import { Login } from "../Components/Authentication/Login";
import { SignUp } from "../Components/Authentication/SignUp";
import warning from "../Assets/warning.svg";
// import axios from "axios";

export const HomePage = () => {
    const navigate = useNavigate();

    /** This portion is to wake up the render serder as the free version spins down afrer 15 minutes of inactivity */
    /** Start */
    // const wakeRenderServer = async () => {
    //     try {
    //         await axios.get("https://prismpalappserver.onrender.com");
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };
    /** END */

    useEffect(() => {
        /** Wake up the render server */
        // wakeRenderServer();
        /** END */

        const user = JSON.parse(localStorage.getItem("userInfo"));
        const token = localStorage.getItem("token");

        if (user && token) {
            navigate("/chats");
        }
    }, [navigate]);
    return (
        <>
            <Container maxW="3xl" centerContent>
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
                        <Text
                            fontSize="4xl"
                            fontFamily="Work sans"
                            align="center"
                        >
                            PrismPal
                        </Text>
                    </Box>
                    <Box
                        background="white"
                        width="100%"
                        padding={4}
                        borderRadius="lg"
                        borderWidth="1px"
                        margin="0 0 15px 0"
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
                <Box
                    width="100%"
                    margin="20px 0 20px 0"
                    padding={3}
                    background="#FFFFD1"
                    borderWidth="2px"
                    borderColor="#F5DD00"
                    borderRadius="lg"
                    display="flex"
                    alignItems={{ base: "flex-start", md: "center" }}
                >
                    <Image src={warning} width={16} marginRight={3}></Image>
                    <Box flex="1">
                        <Text fontSize="2xl" fontWeight="bold">
                            Warning
                        </Text>

                        <Text>
                            Please note that, as the server is deployed on a
                            free platform,{" "}
                            <span className="text-red-500">
                                it may spin down after 15 minutes of inactivity
                            </span>{" "}
                            on this free platform.
                            <span className="text-red-500">
                                {" "}
                                In that case, refresh the website
                            </span>{" "}
                            and ensure optimal performance.
                        </Text>
                    </Box>
                </Box>
            </Container>
        </>
    );
};
