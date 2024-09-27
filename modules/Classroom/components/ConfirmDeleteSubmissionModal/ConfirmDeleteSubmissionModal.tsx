import { Modal, Button, Text, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useDeleteSubmissionMutation } from "@/shared/redux/rtk-apis/submissions/submissions.api";

interface IConfirmDeleteSubmissionModalProps {
  submissionId: number;
  classroomId: number;
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmDeleteSubmissionModal: React.FC<IConfirmDeleteSubmissionModalProps> = ({
  submissionId,
  classroomId,
  isOpen,
  onClose,
}) => {
  const [deleteSubmission, { isLoading }] = useDeleteSubmissionMutation();

  const handleDelete = async () => {
    try {
      await deleteSubmission({ classroomId, submissionId }).unwrap();
      showNotification({
        title: "Success",
        message: "Submission deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      showNotification({
        title: "Error",
        message: "Could not delete the submission. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Submission" centered>
      <Text>Are you sure you want to delete this submission? This action cannot be undone.</Text>
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

export default ConfirmDeleteSubmissionModal;
