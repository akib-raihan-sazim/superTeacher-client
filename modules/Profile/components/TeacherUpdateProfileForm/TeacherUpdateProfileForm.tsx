import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { MultiSelect, TextInput, Select } from "react-hook-form-mantine";

import { Subjects } from "@/modules/Registration/components/teacher/TeacherRegistrationForm";
import { useEditUserMutation } from "@/shared/redux/rtk-apis/users/users.api";

import {
  TeacherProfileFormValues,
  getDefaultValues,
  TeacherUpdateDTO,
  createTeacherUpdateDTO,
  TeacherUpdateProfileFormResolver,
} from "./TeacherUpdateProfileForm.helpers";
import { ITeacherUpdateProfileFormProps } from "./TeacherUpdateProfileForm.interface";
import { useStyles, inputProps } from "./TeacherUpdateProfileForm.styles";

const TeacherUpdateProfileForm: React.FC<ITeacherUpdateProfileFormProps> = ({ user, onClose }) => {
  const { classes } = useStyles();
  const [editUser] = useEditUserMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<TeacherProfileFormValues>({
    defaultValues: getDefaultValues(user),
    resolver: TeacherUpdateProfileFormResolver,
    mode: "onChange",
  });

  const onSubmit = handleSubmit(async (formData: TeacherProfileFormValues) => {
    try {
      const editUserData: TeacherUpdateDTO = createTeacherUpdateDTO(formData);
      await editUser(editUserData).unwrap();

      notifications.show({
        color: "blue",
        title: "Success",
        message: "Profile updated successfully",
      });
      onClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to update profile",
      });
    }
  });

  return (
    <form onSubmit={onSubmit} className={classes.form}>
      <Grid gutter="xl">
        <Grid.Col xs={12} sm={6}>
          <TextInput
            {...inputProps}
            disabled
            label="Email"
            placeholder="Enter your email"
            withAsterisk
            control={control}
            name="email"
            classNames={{ label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Select
            {...inputProps}
            label="Gender"
            placeholder="Select your gender"
            withAsterisk
            data={["Male", "Female"]}
            control={control}
            name="gender"
            error={errors.gender?.message}
            classNames={{ root: classes.select, label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            {...inputProps}
            label="First name"
            placeholder="Enter your first name"
            withAsterisk
            control={control}
            name="firstName"
            error={errors.firstName?.message}
            classNames={{ label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            {...inputProps}
            label="Last name"
            placeholder="Enter your last name"
            withAsterisk
            control={control}
            name="lastName"
            error={errors.lastName?.message}
            classNames={{ label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            {...inputProps}
            label="Major Subject"
            placeholder="Enter your field of specialization"
            withAsterisk
            control={control}
            name="majorSubject"
            error={errors.majorSubject?.message}
            classNames={{ label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Select
            {...inputProps}
            label="Highest Education Level"
            placeholder="Select education level"
            withAsterisk
            data={["Bachelors", "Masters", "Diploma", "PhD"]}
            control={control}
            name="highestEducationLevel"
            error={errors.highestEducationLevel?.message}
            classNames={{ root: classes.select, label: classes.inputLabel }}
          />
        </Grid.Col>
        <Grid.Col xs={12}>
          <MultiSelect
            {...inputProps}
            label="Subjects to teach"
            placeholder="Pick your preferred subjects"
            withAsterisk
            searchable
            data={Subjects}
            control={control}
            name="subjectsToTeach"
            error={errors.subjectsToTeach?.message}
            classNames={{ root: classes.multiSelect, label: classes.inputLabel }}
          />
        </Grid.Col>
      </Grid>
      <Group position="center" mt="lg" pt="sm" className={classes.buttonGroup}>
        <Button size="sm" className={classes.resetButton} onClick={() => reset()}>
          Reset
        </Button>
        <Button
          type="submit"
          size="sm"
          className={classes.submitButton}
          disabled={!isValid || !isDirty}
        >
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default TeacherUpdateProfileForm;
