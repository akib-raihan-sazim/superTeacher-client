import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { MultiSelect, TextInput, Select } from "react-hook-form-mantine";
import { z } from "zod";

import { Subjects } from "@/modules/Registration/components/teacher/TeacherRegistrationForm";
import { useEditUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { EditableUserFields } from "@/shared/redux/rtk-apis/users/users.types";

const TeacherUpdateProfileFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  gender: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  majorSubject: z.string().min(1, "Major subject is required"),
  highestEducationLevel: z.string(),
  subjectsToTeach: z.array(z.string()).min(1, "Select at least one subject to teach"),
});

type TeacherProfileFormValues = z.infer<typeof TeacherUpdateProfileFormSchema>;

interface TeacherUpdateProfileFormProps {
  user: {
    id: number;
    email: string;
    gender: string;
    firstName: string;
    lastName: string;
    teacher?: {
      majorSubject: string;
      highestEducationLevel: string;
      subjectsToTeach: string[];
    };
  };
  onClose: () => void;
}

const TeacherUpdateProfileForm: React.FC<TeacherUpdateProfileFormProps> = ({ user, onClose }) => {
  const [editUser] = useEditUserMutation();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TeacherProfileFormValues>({
    defaultValues: {
      email: user.email,
      gender: user.gender,
      firstName: user.firstName,
      lastName: user.lastName,
      majorSubject: user.teacher?.majorSubject || "",
      highestEducationLevel: user.teacher?.highestEducationLevel || "",
      subjectsToTeach: user.teacher?.subjectsToTeach || [],
    },
    resolver: zodResolver(TeacherUpdateProfileFormSchema),
  });

  const onSubmit = handleSubmit(async (formData: TeacherProfileFormValues) => {
    try {
      const editUserData: EditableUserFields = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        teacher: {
          majorSubject: formData.majorSubject,
          highestEducationLevel: formData.highestEducationLevel,
          subjectsToTeach: formData.subjectsToTeach,
        },
      };

      await editUser(editUserData).unwrap();

      notifications.show({
        color: "green",
        title: "Success",
        message: "Profile updated successfully",
        autoClose: 3000,
      });
      onClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to update profile",
        autoClose: 3000,
      });
    }
  });

  const inputProps = {
    size: "lg",
    labelProps: { style: { color: "#4CAF50" } },
    styles: { label: { marginBottom: "0.5rem" } },
  };

  return (
    <form onSubmit={onSubmit}>
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
          />
        </Grid.Col>
      </Grid>
      <Group
        position="center"
        mt="lg"
        pt="sm"
        sx={{
          "@media (min-width: 1024px)": {
            gap: "15rem",
          },
          "@media (min-width: 768px) and (max-width: 1023px)": {
            gap: "10rem",
          },
          "@media (max-width: 767px)": {
            gap: "2rem",
          },
        }}
      >
        <Button size="sm" style={{ background: "#9e9e9e" }} onClick={() => reset()}>
          Reset
        </Button>
        <Button type="submit" size="sm" style={{ background: "#4caf50" }}>
          Submit
        </Button>
      </Group>
    </form>
  );
};

export default TeacherUpdateProfileForm;
