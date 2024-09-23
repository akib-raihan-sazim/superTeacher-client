import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button, Group, FileInput, Box, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm, Controller } from "react-hook-form";

import { useSubmitAssignmentMutation } from "@/shared/redux/rtk-apis/assignments/assignments.api";

import {
  assignmentSubmissionSchema,
  TAssignmentSubmissionValues,
} from "./AssignmentSubmissionModal.helpers";

interface IAssignmentSubmissionModalProps {
  opened: boolean;
  onClose: () => void;
  assignmentId: number;
  userId: number;
}

const AssignmentSubmissionModal: React.FC<IAssignmentSubmissionModalProps> = ({
  opened,
  onClose,
  assignmentId,
  userId,
}) => {
  const [submitAssignment, { isLoading }] = useSubmitAssignmentMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TAssignmentSubmissionValues>({
    resolver: zodResolver(assignmentSubmissionSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: TAssignmentSubmissionValues) => {
    try {
      await submitAssignment({
        assignmentId,
        userId,
        file: data.file,
      }).unwrap();

      showNotification({
        title: "Success",
        message: "Assignment submitted successfully",
        color: "green",
      });

      reset();
      onClose();
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to submit assignment",
        color: "red",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Submit Assignment" centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="file"
          control={control}
          render={({ field: { onChange, value, ...rest } }) => (
            <Box>
              <TextInput
                size="md"
                label="Upload file"
                placeholder="Select a file"
                value={value?.name || ""}
                onClick={() => document.getElementById("hidden-file-input")?.click()}
                readOnly
                error={errors.file?.message}
              />
              <FileInput
                id="hidden-file-input"
                style={{ display: "none" }}
                onChange={(file) => onChange(file)}
                {...rest}
              />
            </Box>
          )}
        />
        <Group position="right">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" loading={isLoading}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AssignmentSubmissionModal;
