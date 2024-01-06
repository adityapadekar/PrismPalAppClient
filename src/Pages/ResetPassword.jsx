import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Container,
    Button,
    Box,
    Text,
    useToast,
    Input,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement,
    VStack,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../Api/api";

export const ResetPassword = () => {
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmpassword] = useState("");
    const [show, setShow] = useState(false);

    const query = new URLSearchParams(window.location.search);
    const token = query.get("token");

    const navigate = useNavigate();
    const toast = useToast();

    const handleClick = async () => {
        setLoading(true);
        if (!password || !confirmpassword) {
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

        if (password !== confirmpassword) {
            toast({
                title: "Passwords do not match",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }

        try {
            await api.post(`/user/reset-password/${token}`, {
                newPassword: password,
            });
            toast({
                title: "Password Reset Successfully",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setPassword("");
            setConfirmpassword("");
            setSuccess(true);
            setLoading(false);
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
                    Reset Password
                </Text>
                {success ? (
                    <Text
                        fontSize="lg"
                        margin="0 0 15px 0"
                        fontFamily="Work sans"
                        align="center"
                    >
                        Your password has been successfully reset. Please log in
                        using your new password.
                    </Text>
                ) : null}
                {!success ? (
                    <Box
                        background="white"
                        width="100%"
                        padding={4}
                        margin="0 0 15px 0"
                    >
                        <VStack spacing="5px">
                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup>
                                    <Input
                                        value={password}
                                        type={show ? "text" : "password"}
                                        placeholder="Enter Password"
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                    ></Input>
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            height="1.75rem"
                                            size="sm"
                                            onClick={() => setShow(!show)}
                                        >
                                            {show ? (
                                                <ViewOffIcon />
                                            ) : (
                                                <ViewIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl id="confirm_password" isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={confirmpassword}
                                        type={show ? "text" : "password"}
                                        placeholder="Confirm password"
                                        onChange={(e) =>
                                            setConfirmpassword(e.target.value)
                                        }
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button
                                            height="1.75rem"
                                            size="sm"
                                            onClick={() => setShow(!show)}
                                        >
                                            {show ? (
                                                <ViewOffIcon />
                                            ) : (
                                                <ViewIcon />
                                            )}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </VStack>
                    </Box>
                ) : null}

                {!success ? (
                    <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        onClick={handleClick}
                        isLoading={loading}
                    >
                        Reset Password
                    </Button>
                ) : (
                    <Button
                        colorScheme="blue"
                        width="100%"
                        style={{ marginTop: 15 }}
                        onClick={() => {
                            navigate("/");
                        }}
                    >
                        Login
                    </Button>
                )}
            </Box>
        </Container>
    );
};
