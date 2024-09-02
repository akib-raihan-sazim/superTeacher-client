import React from "react";

import { Card, Text, Group, Image, Badge } from "@mantine/core";

import { ClassroomCardProps } from "./ClassroomCard.types";

const ClassroomCard = ({ classroom }: ClassroomCardProps) => (
  <Card shadow="sm" padding="lg" my="md" radius="md" withBorder>
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
  </Card>
);

export default ClassroomCard;
