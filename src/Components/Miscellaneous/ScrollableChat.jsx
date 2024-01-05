import React from "react";
import { Tooltip, Avatar } from "@chakra-ui/react";
import ScrollableFeed from "react-scrollable-feed";
import { ChatState } from "../../Context/chatContextProvider";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../../Utils/chatLogics";

export const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();
    return (
        <>
            <ScrollableFeed>
                {messages &&
                    messages.map((currentMessage, indexOfCurrentMessage) => {
                        return (
                            <div
                                style={{ display: "flex" }}
                                key={currentMessage._id}
                            >
                                {(isSameSender(
                                    messages,
                                    currentMessage,
                                    indexOfCurrentMessage,
                                    user._id
                                ) ||
                                    isLastMessage(
                                        messages,
                                        indexOfCurrentMessage,
                                        user._id
                                    )) && (
                                    <Tooltip
                                        label={currentMessage.sender?.name}
                                        placement="bottom-start"
                                        hasArrow
                                    >
                                        <Avatar
                                            marginTop="7px"
                                            marginRight={1}
                                            size="sm"
                                            cursor="pointer"
                                            name={currentMessage.sender?.name}
                                            src={
                                                currentMessage.sender
                                                    ?.profilePicture?.url
                                            }
                                        ></Avatar>
                                    </Tooltip>
                                )}

                                <span
                                    className={`${
                                        currentMessage.sender._id === user._id
                                            ? "bg-blue-100"
                                            : "bg-green-100"
                                    } rounded-2xl px-4 py-2 max-w-3/4 `}
                                    style={{
                                        marginLeft: isSameSenderMargin(
                                            messages,
                                            currentMessage,
                                            indexOfCurrentMessage,
                                            user._id
                                        ),
                                        marginTop: isSameUser(
                                            messages,
                                            currentMessage,
                                            indexOfCurrentMessage
                                        )
                                            ? 3
                                            : 10,
                                    }}
                                >
                                    {currentMessage.content}
                                </span>
                            </div>
                        );
                    })}
            </ScrollableFeed>
        </>
    );
};
