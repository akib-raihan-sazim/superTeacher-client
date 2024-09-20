import { useState } from "react";

import { Modal, Button, Text, Loader, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

import { useDeleteExamMutation } from "@/shared/redux/rtk-apis/exams/exams.api";

import { IConfirmDeleteExamModalProps } from "./ConfirmDeleteExamModal.interface";

const ConfirmDeleteExamModal: React.FC<IConfirmDeleteExamModalProps> = ({
  examId,
  isOpen,
  onClose,
}) => {
  const [deleteExam, { isLoading }] = useDeleteExamMutation();
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async () => {
    try {
      await deleteExam({ examId: examId }).unwrap();
      showNotification({
        title: "Success",
        message: "Exam deleted successfully",
        color: "blue",
      });
      onClose();
    } catch (err) {
      setError("Failed to delete exam");
      showNotification({
        title: "Error",
        message: "Could not delete the exam. Please try again.",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={isOpen} onClose={onClose} title="Confirm Delete Exam" centered>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Text>Are you sure you want to delete this exam? This action cannot be undone.</Text>
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

export default ConfirmDeleteExamModal;
