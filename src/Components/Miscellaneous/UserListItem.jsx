import { Box, Text, Avatar } from "@chakra-ui/react";

export const UserListItem = ({ user, handleFunction }) => {
    return (
        <Box
            onClick={handleFunction}
            cursor="pointer"
            background="#E8E8E8"
            _hover={{
                background: "#38B2AC",
                color: "white",
            }}
            width="100%"
            display="flex"
            alignItems="center"
            color="black"
            paddingX={3}
            paddingY={2}
            marginBottom={2}
            borderRadius="lg"
        >
            <Avatar
                marginRight={2}
                size="sm"
                cursor="pointer"
                name={user.name}
                src={user.profilePicture.url}
            />
            <Box overflow="hidden">
                <Text overflow="hidden" isTruncated>
                    {user.name}
                </Text>
                <Text fontSize="xs" isTruncated>
                    <b>Username : </b>
                    {user.username}
                </Text>
                <Text fontSize="xs" isTruncated>
                    <b>Email : </b>
                    {user.email}
                </Text>
            </Box>
        </Box>
    );
};
