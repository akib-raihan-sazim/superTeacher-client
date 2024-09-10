import { useRouter } from "next/router";

import { Card, Text, Group, Image, Badge } from "@mantine/core";

import { useAppSelector } from "@/shared/redux/hooks";
import { selectAuthenticatedUser } from "@/shared/redux/reducers/user.reducer";
import { EUserRole } from "@/shared/redux/rtk-apis/auth/auth.types";

import { ClassroomCardProps } from "./ClassroomCard.types";

const ClassroomCard = ({ classroom }: ClassroomCardProps) => {
  const user = useAppSelector(selectAuthenticatedUser);
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/classroom/${classroom.id}`);
  };

  return (
    <Card
      shadow="sm"
      padding="lg"
      my="md"
      radius="md"
      withBorder
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
    >
      <Card.Section>
        <Image src="/bg-8.png" height={160} alt="Classroom Image" />
      </Card.Section>
      <Group mt="md" mb="xs" style={{ display: "flex", justifyContent: "space-between" }}>
        <Text size="lg">{classroom.title}</Text>
        <Badge color="blue" variant="outline" w={130}>
          {classroom.subject}
        </Badge>
      </Group>
      <Text size="sm">
        <strong>Days:</strong> {classroom.days.join(", ")}
      </Text>
      <Text size="sm">
        <strong>Class Time:</strong>{" "}
        {new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
          timeZone: "UTC",
        }).format(new Date(classroom.classTime))}
      </Text>
      {user?.userType === EUserRole.STUDENT && classroom.teacher && (
        <Text size="sm" mt="md">
          <strong>Teacher:</strong> {classroom.teacher.user.firstName}{" "}
          {classroom.teacher.user.lastName}
        </Text>
      )}
    </Card>
  );
};

export default ClassroomCard;
