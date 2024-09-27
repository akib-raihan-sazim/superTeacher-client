import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { TextInput, Select } from "react-hook-form-mantine";
import { z } from "zod";

import {
  CLASS_OPTIONS,
  DEGREE_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
} from "@/modules/Registration/components/student/StudentRegistrationForm.constants";
import { useEditUserMutation } from "@/shared/redux/rtk-apis/users/users.api";
import { EEducationLevel } from "@/shared/typedefs";

// Define Zod schema for form validation
const StudentUpdateProfileFormSchema = z.object({
  email: z.string().email("Invalid email address"),
  gender: z.string(),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  phoneNo: z.string().min(1, "Phone number is required"),
  educationLevel: z.string(),
  medium: z.string().optional(),
  class: z.string().optional(),
  degree: z.string().optional(),
  degreeName: z.string().optional(),
  semester: z.string().optional(),
});

type StudentProfileFormValues = z.infer<typeof StudentUpdateProfileFormSchema>;

interface StudentUpdateProfileFormProps {
  user: {
    id: number;
    email: string;
    gender: string;
    firstName: string;
    lastName: string;
    student?: {
      educationLevel: string;
      phoneNo: string;
      address: string;
      medium?: string;
      class?: string;
      degree?: string;
      degreeName?: string;
      semester?: string;
    };
  };
  onClose: () => void;
}

const StudentUpdateProfileForm: React.FC<StudentUpdateProfileFormProps> = ({ user, onClose }) => {
  const [editUser] = useEditUserMutation();
  const {
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm<StudentProfileFormValues>({
    defaultValues: {
      email: user.email,
      gender: user.gender,
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.student?.address || "",
      phoneNo: user.student?.phoneNo || "",
      educationLevel: user.student?.educationLevel || "",
      medium: user.student?.medium || "",
      class: user.student?.class || "",
      degree: user.student?.degree || "",
      degreeName: user.student?.degreeName || "",
      semester: user.student?.semester || "",
    },
    resolver: zodResolver(StudentUpdateProfileFormSchema),
  });

  const educationLevel = watch("educationLevel");

  useEffect(() => {
    const initialEducationLevel = user.student?.educationLevel || "";
    if (educationLevel !== initialEducationLevel) {
      setValue("medium", "");
      setValue("class", "");
      setValue("degree", "");
      setValue("degreeName", "");
      setValue("semester", "");
    }
  }, [educationLevel, user.student?.educationLevel, setValue]);

  const onSubmit: FormSubmitHandler<StudentProfileFormValues> = async (formData) => {
    try {
      // Prepare the data for the editUser mutation
      const editUserData = {
        firstName: formData.data.firstName,
        lastName: formData.data.lastName,
        email: formData.data.email,
        gender: formData.data.gender,
        student: {
          educationLevel: formData.data.educationLevel as EEducationLevel,
          phoneNo: formData.data.phoneNo,
          address: formData.data.address,
          medium: formData.data.medium,
          class: formData.data.class,
          degree: formData.data.degree,
          degreeName: formData.data.degreeName,
          semester: formData.data.semester,
        },
      };

      // Call the editUser mutation
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
  };

  const renderAdditionalFields = () => {
    if (educationLevel === EEducationLevel.SCHOOL || educationLevel === EEducationLevel.COLLEGE) {
      return (
        <>
          <Grid.Col xs={12} sm={6}>
            <Select
              {...inputProps}
              label="Medium"
              placeholder="Select medium"
              withAsterisk
              data={[
                { value: "english", label: "English" },
                { value: "bangla", label: "Bangla" },
              ]}
              control={control}
              name="medium"
              error={errors.medium?.message}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <Select
              {...inputProps}
              label="Class"
              placeholder="Select class"
              withAsterisk
              data={CLASS_OPTIONS}
              control={control}
              name="class"
              error={errors.class?.message}
            />
          </Grid.Col>
        </>
      );
    }

    if (educationLevel === EEducationLevel.UNIVERSITY) {
      return (
        <>
          <Grid.Col xs={12} sm={6}>
            <Select
              {...inputProps}
              label="Degree"
              placeholder="Select degree"
              withAsterisk
              data={[
                { value: "Bachelors", label: "Bachelors" },
                { value: "Masters", label: "Masters" },
              ]}
              control={control}
              name="degree"
              error={errors.degree?.message}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <Select
              {...inputProps}
              data={DEGREE_OPTIONS}
              label="Degree Name"
              placeholder="Select degree name"
              withAsterisk
              control={control}
              name="degreeName"
              error={errors.degreeName?.message}
            />
          </Grid.Col>
          <Grid.Col xs={12} sm={6}>
            <TextInput
              {...inputProps}
              label="Semester/Year"
              placeholder="Enter semester or year"
              withAsterisk
              control={control}
              name="semester"
              error={errors.semester?.message}
            />
          </Grid.Col>
        </>
      );
    }

    return null;
  };

  const inputProps = {
    size: "lg",
    labelProps: { style: { color: "#4CAF50" } },
    styles: { label: { marginBottom: "0.5rem" } },
  };

  return (
    <Form control={control} onSubmit={onSubmit}>
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
            label="Address"
            placeholder="Enter your address"
            withAsterisk
            control={control}
            name="address"
            error={errors.address?.message}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <TextInput
            {...inputProps}
            label="Phone number"
            placeholder="Enter your phone number"
            withAsterisk
            control={control}
            name="phoneNo"
            error={errors.phoneNo?.message}
          />
        </Grid.Col>
        <Grid.Col xs={12} sm={6}>
          <Select
            {...inputProps}
            label="Education level"
            placeholder="Select your education level"
            withAsterisk
            data={EDUCATION_LEVEL_OPTIONS}
            control={control}
            name="educationLevel"
            error={errors.educationLevel?.message}
          />
        </Grid.Col>
        {renderAdditionalFields()}
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
    </Form>
  );
};

export default StudentUpdateProfileForm;
