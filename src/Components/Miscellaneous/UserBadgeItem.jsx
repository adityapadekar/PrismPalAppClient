import React from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/react";

export const UserBadgeItem = ({ user, handleFunction, admin }) => {
    return (
        <Badge
            paddingX={2}
            paddingY={1}
            borderRadius="lg"
            margin={1}
            marginBottom={2}
            variant="solid"
            fontSize={12}
            colorScheme="purple"
            cursor="pointer"
            onClick={handleFunction}
        >
            {user.username}
            {admin?._id === user._id && <span> (Admin)</span>}
            <CloseIcon paddingLeft={1} />
        </Badge>
    );
};
