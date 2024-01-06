import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    VStack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    HStack,
    Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import api from "../../Api/api";

export const Login = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginCredential, setLoginCredential] = useState("");
    const [password, setPassword] = useState("");

    const toast = useToast();
    const navigate = useNavigate();

    const submitHandler = async () => {
        setLoading(true);
        if (!loginCredential || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            setLoading(false);
            return;
        }
        try {
            const response = await api.post("/user/login", {
                loginCredential,
                password,
            });

            localStorage.setItem(
                "userInfo",
                JSON.stringify(response.data.result.user)
            );

            localStorage.setItem("token", response.data.result.token);

            toast({
                title: "Login Successful",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });

            setLoginCredential("");
            setPassword("");
            setLoading(false);

            navigate("/chats");
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
        <VStack spacing="5px">
            <FormControl id="username_or_email" isRequired>
                <FormLabel>Username/Email</FormLabel>
                <Input
                    value={loginCredential}
                    type="text"
                    placeholder="Enter Username or Email"
                    onChange={(e) => setLoginCredential(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id="login_password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
                        value={password}
                        type={show ? "text" : "password"}
                        placeholder="Enter Password"
                        onChange={(e) => setPassword(e.target.value)}
                    ></Input>
                    <InputRightElement width="4.5rem">
                        <Button
                            height="1.75rem"
                            size="sm"
                            onClick={() => setShow(!show)}
                        >
                            {show ? <ViewOffIcon /> : <ViewIcon />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Login
            </Button>

            <HStack justify="center">
                <Button
                    variant="text"
                    size="sm"
                    onClick={() => {
                        navigate("/forgot-password");
                    }}
                >
                    <Text
                        sx={{
                            textDecoration: "underline",
                            transition: "all 0.3s ease",
                            "&:hover": {
                                transform: "scale(1.1)",
                            },
                        }}
                    >
                        Forgot password?
                    </Text>
                </Button>
            </HStack>
        </VStack>
    );
};
