import { useEffect, useState } from "react";

import { Box, Text, LoadingOverlay } from "@mantine/core";
import { io, Socket } from "socket.io-client";

import { WS_BASE_URL } from "@/shared/constants/env.constants";
import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetClassroomMessagesQuery } from "@/shared/redux/rtk-apis/messages/messages.api";
import { IMessage } from "@/shared/redux/rtk-apis/messages/messages.interface";

import MessageCard from "../MessageCard/MessageCard";
import { IMessageListProps } from "./MessageList.interface";
import useStyles from "./MessageList.styles";

const MessageList: React.FC<IMessageListProps> = ({ classroomId }) => {
  const {
    data: initialMessages,
    isLoading,
    isSuccess,
  } = useGetClassroomMessagesQuery(classroomId, {
    skip: !classroomId,
    refetchOnMountOrArgChange: true,
  });
  const { classes } = useStyles();
  const [messages, setMessages] = useState<IMessage[]>([]);
  const user = useAppSelector(selectAuthenticatedUser);

  useEffect(() => {
    if (isSuccess && initialMessages) {
      setMessages(initialMessages);
    }
  }, [initialMessages, isSuccess]);

  useEffect(() => {
    const socket: Socket = io(WS_BASE_URL);

    socket.emit("joinClassroom", { classroomId, userId: user.userId });

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [newMessage, ...prevMessages]);
    });

    return () => {
      socket.disconnect();
    };
  }, [classroomId, user.userId]);

  if (!messages || messages.length === 0) {
    return (
      <Box className={classes.noMessagesBox}>
        <Text className={classes.noMessagesText}>This is where you share things with class</Text>
      </Box>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <Box style={{ position: "relative" }}>
      <LoadingOverlay visible={isLoading} overlayBlur={2} />
      {sortedMessages.map((message) => (
        <MessageCard key={message.id} message={message} />
      ))}
    </Box>
  );
};

export default MessageList;
