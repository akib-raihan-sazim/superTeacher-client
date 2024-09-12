import { Box, Text, LoadingOverlay } from "@mantine/core";
import dayjs from "dayjs";

import { useGetClassroomMessagesQuery } from "@/shared/redux/rtk-apis/messages/messages.api";

import MessageCard from "../MessageCard/MessageCard";
import { IMessageListProps } from "./MessageList.interface";
import useStyles from "./MessageList.styles";

const MessageList: React.FC<IMessageListProps> = ({ classroomId }) => {
  const { data: messages, isLoading } = useGetClassroomMessagesQuery(classroomId);
  const { classes } = useStyles();

  if (!messages || messages.length === 0) {
    return (
      <Box className={classes.noMessagesBox}>
        <Text className={classes.noMessagesText}>This is where you share things with class</Text>
      </Box>
    );
  }

  const sortedMessages = [...messages].sort(
    (a, b) => dayjs(b.createdAt).unix() - dayjs(a.createdAt).unix(),
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
