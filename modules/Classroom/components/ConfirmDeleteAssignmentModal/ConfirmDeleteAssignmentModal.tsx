import { Modal, Button, Text, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import { useDeleteAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";

import { IConfirmDeleteAssignmentModalProps } from "./ConfirmDeleteAssignmentModal.interface";

const ConfirmDeleteAssignmentModal: React.FC<IConfirmDeleteAssignmentModalProps> = ({
  assignmentId,
  classroomId,
  isOpen,
  onClose,
}) => {
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();

  const handleDelete = async () => {
    try {
      await deleteAssignment({ classroomId, assignmentId }).unwrap();
      showNotification({
        title: "Success",
        message: "Assignment deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      const errorMessage = (err as ApiError).data?.message;
      showNotification({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Assignment" centered>
      <>
        <Text>Are you sure you want to delete this assignment? This action cannot be undone.</Text>
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

export default ConfirmDeleteAssignmentModal;
