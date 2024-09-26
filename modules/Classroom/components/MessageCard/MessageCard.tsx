import { Card, Text, Flex, Badge } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";

import { IMessageCardProps } from "./MessageCard.interface";
import useStyles from "./MessageCard.styles";

dayjs.extend(relativeTime);

const MessageCard: React.FC<IMessageCardProps> = ({ message }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const { sender, content, createdAt } = message;
  const timeAgo = dayjs(createdAt).fromNow();
  const { classes } = useStyles({ userType: sender.userType });

  const userTypeLabel = sender.userType === "teacher" ? "Teacher" : "Student";

  return (
    <Card className={classes.card}>
      <Flex direction={"column"} pb={"md"}>
        <Text className={classes.sender}>
          <strong>{`${sender.firstName} ${sender.lastName}`}</strong>
          {user.userId === sender.id && (
            <Text component="span" className={classes.senderHint}>
              (you)
            </Text>
          )}
          <Badge c={"black"} style={{ background: "#F6F6F6", marginLeft: "8px" }}>
            {userTypeLabel}
          </Badge>
        </Text>
        <Text className={classes.time}>{timeAgo}</Text>
      </Flex>
      <Text>{content}</Text>
      {message.attachmentUrl && (
        <Text component="a" href={message.attachmentUrl} target="_blank">
          Attachment
        </Text>
      )}
    </Card>
  );
};

export default MessageCard;
