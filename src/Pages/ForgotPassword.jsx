import React, { useState } from "react";
import {
    Container,
    Button,
    Box,
    Text,
    useToast,
    Input,
    FormControl,
    FormLabel,
} from "@chakra-ui/react";
import api from "../Api/api";

export const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const toast = useToast();

    const handleClick = async () => {
        setLoading(true);
        setSuccess(false);
        if (!email) {
            toast({
                title: "Please the required feilds",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }
        try {
            await api.post("/user/forgot-password", { email });
            toast({
                title: "Email Verified",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setEmail("");
            setLoading(false);
            setSuccess(true);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description:
                    error.response?.data.msg ||
                    "Something went wrong. Please try again.",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };

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
                    Forgot Password
                </Text>
                {!success ? (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                    >
                        Enter the email associated with your account to receive
                        a password reset link.
                    </Text>
                ) : (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                    >
                        A password reset link has been sent to your email.
                        Please check your email.
                    </Text>
                )}
                <FormControl
                    id="email"
                    background="white"
                    width="100%"
                    padding={4}
                    isRequired
                >
                    <FormLabel>Email</FormLabel>
                    <Input
                        value={email}
                        type="text"
                        placeholder="Enter Username or Email"
                        onChange={(e) => setEmail(e.target.value)}
                    ></Input>
                </FormControl>
                <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={handleClick}
                    isLoading={loading}
                >
                    Send Reset Link
                </Button>
            </Box>
        </Container>
    );
};
