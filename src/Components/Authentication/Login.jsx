import React, { useState } from "react";

import { useHistory } from "react-router-dom";

import {
    FormControl,
    FormLabel,
    VStack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import api from "../../Api/api";

export const Login = () => {
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);

    const [loginCredential, setLoginCredential] = useState();
    const [password, setPassword] = useState();

    const toast = useToast();
    const history = useHistory();

    const submitHandler = async () => {
        setLoading(true);
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

            setLoading(false);

            history.go("/chats");
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
                    type="text"
                    placeholder="Enter Username or Email"
                    onChange={(e) => setLoginCredential(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input
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
        </VStack>
    );
};
