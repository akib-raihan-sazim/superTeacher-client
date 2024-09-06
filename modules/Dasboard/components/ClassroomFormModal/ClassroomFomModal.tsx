import React from "react";

import { Box, Button, Group, Modal, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import { useForm } from "react-hook-form";
import { TextInput, Select, MultiSelect, TimeInput } from "react-hook-form-mantine";

import { DaysOfTheWeekOptions, Subjects } from "./ClassroomFormModal.constants";
import {
  ClassroomFormData,
  ClassroomFormDefaultValues,
  ClassroomFormSchemaResolver,
} from "./ClassroomFormModal.helpers";
import { useClassroomFormModalStyles } from "./ClassroomFormModal.styles";
import { ClassroomFormModalProps } from "./ClassroomFormModal.types";

const ClassroomFormModal: React.FC<ClassroomFormModalProps> = ({ opened, onClose }) => {
  const theme = useMantineTheme();
  const styles = useClassroomFormModalStyles(theme);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<ClassroomFormData>({
    resolver: ClassroomFormSchemaResolver,
    defaultValues: ClassroomFormDefaultValues,
  });

  const onSubmit = (data: ClassroomFormData) => {
    // TODO integrate create classroom api endpoint
    console.log(data);
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} size="md" centered>
      <Box mx="lg">
        <Text size="lg" style={styles.title}>
          Create a Classroom
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
            <Button type="submit" size="sm" style={styles.button}>
              Create
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default ClassroomFormModal;
