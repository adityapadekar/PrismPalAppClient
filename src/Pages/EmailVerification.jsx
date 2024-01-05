import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Text, useToast } from "@chakra-ui/react";
import api from "../Api/api";

export const EmailVerification = () => {
    const [verifying, setVerifying] = useState(true);
    const [error, setError] = useState(false);

    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    const token = query.get("token");
    const toast = useToast();
    const navigate = useNavigate();

    const verifyEmail = async () => {
        try {
            await api.get(`/user/email-verification/${id}/${token}`);
            toast({
                title: "Email Verified",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setVerifying(false);
        } catch (error) {
            setVerifying(false);
            setError(true);
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

    const handleClick = () => {
        navigate("/");
    };

    useEffect(() => {
        verifyEmail();
    }, []); // eslint-disable-line

    return (
        <Container maxW="xl" centerContent>
            <Box
                display="flex"
                flexDirection="column"
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
                    margin="0 0 15px 0"
                    fontFamily="Work sans"
                    align="center"
                >
                    Email Verification
                </Text>
                {verifying ? (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                    >
                        We are currently verifying your email. Please wait for
                        the confirmation.
                    </Text>
                ) : !error ? (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                    >
                        Your email has been successfully verified! Please
                        proceed to log in.
                    </Text>
                ) : (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                        color="red"
                    >
                        Email verification failed. Please consider signing up
                        again.
                    </Text>
                )}
                {error ? (
                    <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        onClick={handleClick}
                    >
                        SignUp
                    </Button>
                ) : (
                    <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        onClick={handleClick}
                        isLoading={verifying}
                    >
                        Login
                    </Button>
                )}
            </Box>
        </Container>
    );
};
