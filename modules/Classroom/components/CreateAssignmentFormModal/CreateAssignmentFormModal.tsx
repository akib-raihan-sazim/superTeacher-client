import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Modal,
  Box,
  Text,
  SimpleGrid,
  TextInput,
  Textarea,
  FileInput,
  Button,
  Group,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";

import {
  useCreateAssignmentMutation,
  useUpdateAssignmentMutation,
} from "@/shared/redux/rtk-apis/assignments/assignments.api";

import {
  assignmentFormSchema,
  assignmentFormSchemaEdit,
  TAssignmentFormValues,
} from "./CreateAssignmentFormModal.helpers";
import { IAssignmentFormModalProps } from "./CreateAssignmentFormModal.interface";
import { formStyles, inputStyles } from "./CreateAssignmentFormModal.styles";

const CreateAssignmentFormModal: React.FC<IAssignmentFormModalProps> = ({
  opened,
  onClose,
  classroomId,
  assignment,
}) => {
  const isUpdateAssignment = Boolean(assignment);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
  } = useForm<TAssignmentFormValues>({
    resolver: zodResolver(isUpdateAssignment ? assignmentFormSchemaEdit : assignmentFormSchema),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createAssignment] = useCreateAssignmentMutation();
  const [updateAssignment] = useUpdateAssignmentMutation();

  useEffect(() => {
    if (opened && assignment) {
      setValue("title", assignment.title);
      setValue("description", assignment.description);
      setValue("dueDate", new Date(assignment.dueDate));
    } else if (!isUpdateAssignment) {
      reset();
    }
  }, [opened, assignment, setValue, reset, isUpdateAssignment]);

  const onSubmit = async (data: TAssignmentFormValues) => {
    setIsLoading(true);
    try {
      if (isUpdateAssignment) {
        await updateAssignment({
          classroomId: classroomId,
          assignmentId: assignment!.id,
          data: {
            file: data.file,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
          },
        }).unwrap();

        showNotification({
          title: "Success",
          message: "Assignment updated successfully!",
          color: "blue",
        });
      } else {
        await createAssignment({
          classroomId,
          data: {
            file: data.file,
            title: data.title,
            description: data.description,
            dueDate: data.dueDate,
          },
        }).unwrap();

        showNotification({
          title: "Success",
          message: "Assignment created successfully!",
          color: "blue",
        });
      }

      reset();
      onClose();
    } catch (error) {
      showNotification({
        title: isUpdateAssignment ? "Update failed" : "Creation failed",
        message: isUpdateAssignment ? "Failed to update assignment" : "Failed to create assignment",
        color: "red",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleCancel} size="md" centered>
      <Box mx="xl">
        <Text mb={20} fw={700} tt="uppercase" size="lg" c="#4CAF50">
          {isUpdateAssignment ? "Edit Assignment" : "Create Assignment"}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid>
            <TextInput
              size="md"
              label="Title"
              placeholder="Enter a title"
              error={errors.title?.message}
              styles={inputStyles}
              {...register("title")}
            />
            <Textarea
              size="md"
              label="Description"
              placeholder="Enter a description"
              error={errors.description?.message}
              styles={inputStyles}
              {...register("description")}
            />
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
                    styles={inputStyles}
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
            <Controller
              name="dueDate"
              control={control}
              render={({ field: { onChange, value, ...rest }, fieldState: { error } }) => (
                <DateInput
                  {...rest}
                  value={value ? new Date(value) : null}
                  onChange={(val) => onChange(val)}
                  label="Due Date"
                  placeholder="Select due date"
                  error={error?.message}
                  styles={formStyles}
                  popoverProps={{ withinPortal: true }}
                />
              )}
            />
          </SimpleGrid>
          <Group mt="xl" mb="sm">
            <Button size="sm" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              style={{ backgroundColor: "#4CAF50", color: "white" }}
              loading={isLoading}
            >
              {isUpdateAssignment ? "Update" : "Create"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateAssignmentFormModal;
