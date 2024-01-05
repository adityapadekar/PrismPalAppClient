import React, { useState } from "react";

import {
    FormControl,
    FormLabel,
    VStack,
    Input,
    InputGroup,
    InputRightElement,
    Button,
    useToast,
    Text,
} from "@chakra-ui/react";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import api from "../../Api/api";
import convertToBase64 from "../../Utils/convertToBase64";

export const SignUp = () => {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);

    const [name, setName] = useState("");
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();
    const [pic, setPic] = useState();
    const [loading, setLoading] = useState(false);

    const toast = useToast();

    const postDetails = async (pic) => {
        setLoading(true);
        if (pic === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
            return;
        }
        const result = await convertToBase64(pic);
        setPic(result);
        setLoading(false);
    };

    const submitHandler = async () => {
        setSuccess(false);
        setLoading(true);
        if (!name || !username || !email || !password || !confirmpassword) {
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

        if (password !== confirmpassword) {
            toast({
                title: "Passwords Do Not Match!",
                status: "warning",
                duration: 2000,
                isClosable: true,
                position: "top",
            });

            setLoading(false);
            return;
        }

        try {
            await api.post("/user/signup", {
                name,
                username,
                email,
                password,
                pic,
            });
            toast({
                title: "Registration Successful",
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top",
            });

            setName("");
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmpassword("");
            setPic("");
            setSuccess(true);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            toast({
                title: "Error Occured!",
                description: error.response?.data.msg,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top",
            });
        }
    };
    return (
        <VStack spacing="5px">
            <FormControl id="name" isRequired>
                <FormLabel>Name</FormLabel>
                <Input
                    value={name}
                    type="text"
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id="username" isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                    value={username}
                    type="text"
                    placeholder="Enter Username"
                    onChange={(e) => setUsername(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                    value={email}
                    type="email"
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                ></Input>
            </FormControl>
            <FormControl id="password" isRequired>
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
            <FormControl id="confirm_password" isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup size="md">
                    <Input
                        value={confirmpassword}
                        type={show ? "text" : "password"}
                        placeholder="Confirm password"
                        onChange={(e) => setConfirmpassword(e.target.value)}
                    />
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
            <FormControl id="pic">
                <FormLabel>Upload your Picture</FormLabel>
                <Input
                    value={pic}
                    type="file"
                    padding={1.5}
                    accept="image/*"
                    onChange={(e) => postDetails(e.target.files[0])}
                />
            </FormControl>
            <Button
                colorScheme="blue"
                width="100%"
                style={{ marginTop: 15 }}
                onClick={submitHandler}
                isLoading={loading}
            >
                Sign Up
            </Button>
            {success ? (
                <Text align="center" fontSize="14px" color="red">
                    *Please check your email for the verification link.*
                </Text>
            ) : null}
        </VStack>
    );
};
