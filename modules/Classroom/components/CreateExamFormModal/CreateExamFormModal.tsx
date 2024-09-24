import { useState, useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Box, Text, SimpleGrid, TextInput, Button, Group } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { showNotification } from "@mantine/notifications";
import { Controller, useForm } from "react-hook-form";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import {
  useCreateExamMutation,
  useUpdateExamMutation,
} from "@/shared/redux/rtk-apis/exams/exams.api";

import { examFormSchema, TExamFormValues } from "./CreateExamFormModal.helpers";
import { ICreateExamFormModalProps } from "./CreateExamFormModal.interface";
import { formStyles, buttonStyles } from "./CreateExamFormModal.styles";

const CreateExamFormModal: React.FC<ICreateExamFormModalProps> = ({
  opened,
  onClose,
  classroomId,
  examId,
  examData,
  isEditMode = false,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<TExamFormValues>({
    resolver: zodResolver(examFormSchema),
    mode: "onBlur",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [createExam] = useCreateExamMutation();
  const [updateExam] = useUpdateExamMutation();

  useEffect(() => {
    if (isEditMode && examData) {
      reset(examData);
    }
  }, [isEditMode, examData, reset]);

  const onSubmit = async (data: TExamFormValues) => {
    setIsLoading(true);
    try {
      if (isEditMode && examId) {
        await updateExam({ examId, data }).unwrap();
        showNotification({
          title: "Success",
          message: "Exam updated successfully!",
          color: "blue",
        });
      } else {
        if (classroomId) {
          await createExam({ classroomId, data }).unwrap();
          showNotification({
            title: "Success",
            message: "Exam created successfully!",
            color: "blue",
          });
        }
      }
      reset();
      onClose();
    } catch (error) {
      showNotification({
        title: "Error",
        message: (error as ApiError).data?.message,
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
        <Text mb={20} fw={700} tt="uppercase" size="lg" c={formStyles.label.color}>
          {isEditMode ? "Edit Exam" : "Create Exam"}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid>
            <TextInput
              size="md"
              label="Title"
              placeholder="Enter a title"
              error={errors.title?.message}
              {...register("title")}
              styles={formStyles}
            />
            <TextInput
              size="md"
              label="Instructions"
              placeholder="Enter instructions"
              error={errors.instruction?.message}
              {...register("instruction")}
              styles={formStyles}
            />
            <Controller
              name="date"
              control={control}
              render={({ field: { onChange, value, ...rest }, fieldState: { error } }) => (
                <DateInput
                  {...rest}
                  value={value ? new Date(value) : null}
                  onChange={(val) => onChange(val)}
                  label="Exam Date"
                  placeholder="Select exam date"
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
            <Button type="submit" size="sm" loading={isLoading} style={buttonStyles}>
              {isEditMode ? "Update Exam" : "Create Exam"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default CreateExamFormModal;
