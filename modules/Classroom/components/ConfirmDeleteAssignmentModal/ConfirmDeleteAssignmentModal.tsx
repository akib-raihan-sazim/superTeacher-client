import { useState } from "react";

import { Modal, Button, Text, Loader, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useDeleteAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";

interface IConfirmDeleteAssignmentModalProps {
  assignmentId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmDeleteAssignmentModal: React.FC<IConfirmDeleteAssignmentModalProps> = ({
  assignmentId,
  isOpen,
  onClose,
}) => {
  const [deleteAssignment, { isLoading }] = useDeleteAssignmentMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteAssignment(assignmentId).unwrap();
      showNotification({
        title: "Success",
        message: "Assignment deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      setError("Failed to delete assignment");
      showNotification({
        title: "Error",
        message: "Could not delete the assignment. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Assignment" centered>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text>
            Are you sure you want to delete this assignment? This action cannot be undone.
          </Text>
          {error && <Text color="red">{error}</Text>}
          <Group position="right">
            <Button color="red" onClick={handleDelete} mt="md">
              Delete
            </Button>
            <Button color="blue" onClick={onClose} mt="md" ml="sm">
              Cancel
            </Button>
          </Group>
        </>
      )}
    </Modal>
  );
};

export default ConfirmDeleteAssignmentModal;
