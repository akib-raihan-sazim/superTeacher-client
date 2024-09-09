import { useRouter } from "next/router";

import { Button, Group, Modal, Text } from "@mantine/core";
import { notifications } from "@mantine/notifications";

import { useDeleteClassroomMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import { DeleteClassroomConfirmationProps } from "./DeleteClassroomConfirmation.interface";

const DeleteClassroomConfirmation = ({
  isOpen,
  onClose,
  classroomId,
}: DeleteClassroomConfirmationProps) => {
  const [deleteClassroom, { isLoading }] = useDeleteClassroomMutation();
  const router = useRouter();

  const handleDeleteClassroom = async () => {
    try {
      await deleteClassroom(classroomId).unwrap();
      notifications.show({
        title: "Success",
        message: "Classroom deleted successfully",
        color: "blue",
      });
      router.push("/dashboard");
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete classroom",
        color: "red",
      });
    } finally {
      onClose();
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} centered title="Confirm Deletion">
      <Text align="center" mb="lg">
        Are you sure you want to delete this classroom? This action cannot be undone.
      </Text>
      <Group position="center">
        <Button variant="default" onClick={onClose}>
          Cancel
        </Button>
        <Button color="red" onClick={handleDeleteClassroom} loading={isLoading}>
          Confirm
        </Button>
      </Group>
    </Modal>
  );
};

export default DeleteClassroomConfirmation;
