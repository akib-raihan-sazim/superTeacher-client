import { Card, Text, Flex, Badge, Group, Button } from "@mantine/core";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { FaDownload } from "react-icons/fa";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { useGetMessageDownloadUrlQuery } from "@/shared/redux/rtk-apis/messages/messages.api";

import { IMessageCardProps } from "./MessageCard.interface";
import useStyles from "./MessageCard.styles";

dayjs.extend(relativeTime);

const MessageCard: React.FC<IMessageCardProps> = ({ message, classroomId }) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const { sender, content, createdAt } = message;
  const timeAgo = dayjs(createdAt).fromNow();
  const { classes } = useStyles({ userType: sender.userType });

  const userTypeLabel = sender.userType === "teacher" ? "Teacher" : "Student";

  const {
    data: downloadUrl,
    isFetching,
    isError,
  } = useGetMessageDownloadUrlQuery(
    { classroomId, messageId: message.id },
    {
      refetchOnMountOrArgChange: true,
    },
  );

  const handleDownload = () => {
    if (downloadUrl) {
      window.open(downloadUrl, "_blank");
    } else {
      console.error("Download URL is undefined");
    }
  };

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
        <Group position="right">
          <Button
            rightIcon={<FaDownload />}
            className={classes.downloadButton}
            size="compact-sm"
            loading={isFetching}
            onClick={handleDownload}
            disabled={isError || (!downloadUrl && !isFetching)}
          >
            Download
          </Button>
        </Group>
      )}
    </Card>
  );
};

export default MessageCard;
