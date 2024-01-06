import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Button, Box, Text, Image } from "@chakra-ui/react";
import pageNotFound from "../Assets/pageNotFound.svg";

export const PageNotFound = () => {
    const navigate = useNavigate();

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
                    fontSize={{ base: "3xl", md: "5xl" }}
                    fontWeight="bold"
                    s
                    margin="0 0 15px 0"
                    fontFamily="Work sans"
                    align="center"
                >
                    Page Not Found
                </Text>

                <Image src={pageNotFound} alt="Page Not Found" />

                <Button
                    colorScheme="blue"
                    width="100%"
                    style={{ marginTop: 15 }}
                    onClick={() => {
                        navigate("/");
                    }}
                >
                    Go Back
                </Button>
            </Box>
        </Container>
    );
};
