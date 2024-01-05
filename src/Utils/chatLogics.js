export const getSender = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1].name : users[0].name;
};

export const getSenderFull = (loggedUser, users) => {
    return users[0]?._id === loggedUser?._id ? users[1] : users[0];
};

export const isSameSenderMargin = (
    messages,
    currentMessage,
    indexOfCurrentMessage,
    userId
) => {
    if (
        indexOfCurrentMessage < messages.length - 1 &&
        messages[indexOfCurrentMessage + 1].sender._id ===
            currentMessage.sender._id &&
        messages[indexOfCurrentMessage].sender._id !== userId
    )
        return 33;
    else if (
        (indexOfCurrentMessage < messages.length - 1 &&
            messages[indexOfCurrentMessage + 1].sender._id !==
                currentMessage.sender._id &&
            messages[indexOfCurrentMessage].sender._id !== userId) ||
        (indexOfCurrentMessage === messages.length - 1 &&
            messages[indexOfCurrentMessage].sender._id !== userId)
    )
        return 0;
    else return "auto";
};

export const isSameSender = (
    messages,
    currentMessage,
    indexOfCurrentMessage,
    userId
) => {
    return (
        indexOfCurrentMessage < messages.length - 1 &&
        (messages[indexOfCurrentMessage + 1]?.sender._id !==
            currentMessage?.sender._id ||
            messages[indexOfCurrentMessage + 1]?.sender._id === undefined) &&
        messages[indexOfCurrentMessage]?.sender._id !== userId
    );
};

export const isLastMessage = (messages, indexOfCurrentMessage, userId) => {
    return (
        indexOfCurrentMessage === messages.length - 1 &&
        messages[messages.length - 1].sender._id !== userId &&
        messages[messages.length - 1].sender._id
    );
};

export const isSameUser = (messages, currentMessage, indexOfCurrentMessage) => {
    return (
        indexOfCurrentMessage > 0 &&
        messages[indexOfCurrentMessage - 1].sender._id ===
            currentMessage.sender._id
    );
};
