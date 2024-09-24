import { Modal, Button, Text, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useDeleteResourceMutation } from "@/shared/redux/rtk-apis/classworks/classworks.api";

import { IConfirmDeleteResourceModalProps } from "./ConfirmDeleteResourceModal.interface";

const ConfirmDeleteResourceModal: React.FC<IConfirmDeleteResourceModalProps> = ({
  resourceId,
  classroomId,
  isOpen,
  onClose,
}) => {
  const [deleteResource, { isLoading }] = useDeleteResourceMutation();

  const handleDelete = async () => {
    try {
      await deleteResource({ classroomId, resourceId }).unwrap();
      showNotification({
        title: "Success",
        message: "Resource deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Could not delete the resource. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Resource" centered>
      <Text>Are you sure you want to delete this resource? This action cannot be undone.</Text>
      <Group position="right">
        <Button color="red" onClick={handleDelete} mt="md" loading={isLoading}>
          Delete
        </Button>
        <Button color="blue" onClick={onClose} mt="md" ml="sm" disabled={isLoading}>
          Cancel
        </Button>
      </Group>
    </Modal>
  );
};

export default ConfirmDeleteResourceModal;
