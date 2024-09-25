import { Modal, Button, Text, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import { useDeleteMeetLinkMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import { IConfirmDeleteMeetLinkModalProps } from "./ConfirmDeleteMeetLinkModal.interface";

const ConfirmDeleteMeetLinkModal: React.FC<IConfirmDeleteMeetLinkModalProps> = ({
  classroomId,
  isOpen,
  onClose,
}) => {
  const [deleteMeetLink, { isLoading }] = useDeleteMeetLinkMutation();

  const handleDelete = async () => {
    try {
      await deleteMeetLink(classroomId).unwrap();
      showNotification({
        title: "Success",
        message: "Meet link deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      const errorMessage = (err as ApiError).data?.message;
      showNotification({
        title: "Error",
        message: errorMessage || "Failed to delete meet link",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Meet Link" centered>
      <>
        <Text>Are you sure you want to delete this meet link? This action cannot be undone.</Text>
        <Group position="right" mt="md">
          <Button color="red" onClick={handleDelete} loading={isLoading}>
            Delete
          </Button>
          <Button color="blue" onClick={onClose} ml="sm">
            Cancel
          </Button>
        </Group>
      </>
    </Modal>
  );
};

export default ConfirmDeleteMeetLinkModal;
