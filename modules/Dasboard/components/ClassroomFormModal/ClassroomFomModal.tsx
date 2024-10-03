import { useEffect } from "react";

import { Box, Button, Group, Modal, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { useForm } from "react-hook-form";
import { TextInput, Select, MultiSelect, TimeInput } from "react-hook-form-mantine";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import {
  useCreateClassroomMutation,
  useUpdateClassroomMutation,
} from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import { DaysOfTheWeekOptions, Subjects } from "./ClassroomFormModal.constants";
import {
  ClassroomFormData,
  ClassroomFormDefaultValues,
  ClassroomFormSchemaResolver,
} from "./ClassroomFormModal.helpers";
import { useClassroomFormModalStyles } from "./ClassroomFormModal.styles";
import { ClassroomFormModalProps } from "./ClassroomFormModal.types";

dayjs.extend(utc);

const ClassroomFormModal: React.FC<ClassroomFormModalProps> = ({ opened, onClose, classroom }) => {
  const theme = useMantineTheme();
  const styles = useClassroomFormModalStyles(theme);
  const [createClassroom] = useCreateClassroomMutation();
  const [updateClassroom] = useUpdateClassroomMutation();

  const {
    handleSubmit,
    formState: { errors, isValid, isDirty },
    control,
    reset,
  } = useForm<ClassroomFormData>({
    resolver: ClassroomFormSchemaResolver,
    defaultValues: ClassroomFormDefaultValues,
  });

  useEffect(() => {
    if (classroom) {
      reset({
        title: classroom.title,
        subject: classroom.subject,
        class_time: dayjs.utc(classroom.classTime).format("hh:mm"),
        days: classroom.days,
      });
    } else {
      reset(ClassroomFormDefaultValues);
    }
  }, [classroom, reset]);

  const onSubmit = async (data: ClassroomFormData) => {
    const classTime = dayjs().format(`YYYY-MM-DD[T]${data.class_time}:00[Z]`);
    const payload = { ...data, classTime };

    try {
      if (classroom) {
        await updateClassroom({ classroomId: classroom.id, data: payload }).unwrap();
        notifications.show({
          title: "Success",
          message: "Classroom updated successfully!",
          color: "blue",
        });
      } else {
        await createClassroom(payload).unwrap();
        notifications.show({
          title: "Success",
          message: "Classroom created successfully!",
          color: "blue",
        });
      }
      reset();
      onClose();
    } catch (error) {
      const errorMessage =
        (error as ApiError)?.data?.message || "Failed to save classroom. Please try again.";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} size="md" centered>
      <Box mx="lg">
        <Text size="lg" style={styles.title}>
          {classroom ? "Edit Classroom" : "Create a Classroom"}
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid>
            <TextInput
              control={control}
              styles={styles.inputLabel}
              name="title"
              size="sm"
              label="Title"
              placeholder="Enter a title"
              withAsterisk
              error={errors.title?.message}
            />
            <Select
              size="sm"
              label="Subject"
              styles={styles.inputLabel}
              placeholder="Pick a subject"
              withAsterisk
              data={Subjects}
              control={control}
              name="subject"
              error={errors.subject?.message}
            />
            <TimeInput
              size="sm"
              label="Class Time"
              styles={styles.inputLabel}
              withAsterisk
              control={control}
              name="class_time"
              error={errors.class_time?.message}
            />
            <MultiSelect
              size="sm"
              label="Days Of The Week"
              styles={styles.inputLabel}
              placeholder="Pick your preferred days"
              withAsterisk
              searchable
              data={DaysOfTheWeekOptions}
              control={control}
              name="days"
              error={errors.days?.message}
            />
          </SimpleGrid>
          <Group style={styles.buttonGroup}>
            <Button size="sm" style={styles.button} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              disabled={!isValid || !isDirty}
              style={{
                backgroundColor: isValid && isDirty ? "#4caf50" : "#f5f5f5",
                color: isValid && isDirty ? "white" : "#9e9e9e",
                cursor: !isValid || !isDirty ? "not-allowed" : "pointer",
              }}
            >
              {classroom ? "Update" : "Create"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default ClassroomFormModal;
