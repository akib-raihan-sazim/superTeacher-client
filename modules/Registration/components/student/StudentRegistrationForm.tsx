import React from "react";

import { TextInput, Select, PasswordInput, Button, Box, Group, Stack } from "@mantine/core";
import { useForm, Controller } from "react-hook-form";

import { EEducationLevel } from "@/shared/typedefs";

import styles from "./StudentRegistraionForm.module.css";
import {
  CLASS_OPTIONS,
  DEGREE_OPTIONS,
  EDUCATION_LEVEL_OPTIONS,
  GENDER_OPTIONS,
} from "./StudentRegistrationForm.constants";
import {
  defaultValues,
  StudentRegistrationSchemaResolver,
} from "./StudentRegistrationForm.helpers";
import { IStudentRegistrationFormProps } from "./StudentRegistrationForm.type";
import { TStudentRegistrationFormData } from "./StudentRegistrationForm.types";

export function StudentRegistrationForm({ onSubmit }: IStudentRegistrationFormProps) {
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TStudentRegistrationFormData>({
    resolver: StudentRegistrationSchemaResolver,
    defaultValues,
  });

  const educationLevel = watch("educationLevel");

  const handleReset = () => {
    reset({
      ...defaultValues,
    });
  };

  return (
    <div className={styles["formBody"]}>
      <Box className={styles["container"]}>
        <form onSubmit={handleSubmit(onSubmit)} className={styles["form"]}>
          <div className={styles["title"]}>REGISTER AS A STUDENT</div>
          <Stack spacing="md">
            <div className={styles["group-name"]}>
              <div className={styles["fieldWrapper"]}>
                <TextInput
                  label="First Name"
                  placeholder="Enter your first name"
                  classNames={{ input: styles["input"], label: styles["label"] }}
                  {...register("firstName")}
                  error={errors.firstName?.message}
                  required
                />
              </div>
              <div className={styles["fieldWrapper"]}>
                <TextInput
                  label="Last Name"
                  placeholder="Enter your last name"
                  classNames={{ input: styles["input"], label: styles["label"] }}
                  {...register("lastName")}
                  error={errors.lastName?.message}
                  required
                />
              </div>
              <div className={styles["fieldWrapper"]}>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Gender"
                      placeholder="Select your gender"
                      classNames={{ input: styles["input"], label: styles["label"] }}
                      data={GENDER_OPTIONS}
                      error={errors.gender?.message}
                      required
                      {...field}
                    />
                  )}
                />
              </div>
            </div>

            <div className={styles["group-name"]}>
              <TextInput
                label="Address"
                placeholder="Enter your address"
                classNames={{
                  input: styles["input"],
                  label: styles["label"],
                  root: styles["addressField"],
                }}
                {...register("address")}
                error={errors.address?.message}
                required
              />
              <TextInput
                label="Phone Number"
                placeholder="Enter your phone number"
                classNames={{
                  input: styles["input"],
                  label: styles["label"],
                  root: styles["phoneField"],
                }}
                {...register("phoneNo")}
                error={errors.phoneNo?.message}
                required
              />
            </div>

            <Group grow align="flex-start">
              <Controller
                name="educationLevel"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Education Level"
                    placeholder="Select your education level"
                    classNames={{
                      input: styles["input"],
                      label: styles["label"],
                      item: styles["selectItem"],
                    }}
                    styles={{
                      input: {
                        color: "#333",
                      },
                      item: {
                        "&[data-selected]": {
                          color: "#333",
                        },
                      },
                    }}
                    data={EDUCATION_LEVEL_OPTIONS}
                    error={errors.educationLevel?.message}
                    required
                    {...field}
                    value={field.value || null}
                  />
                )}
              />
              {(educationLevel === EEducationLevel.SCHOOL ||
                educationLevel === EEducationLevel.COLLEGE) && (
                <Controller
                  name="medium"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="English/Bangla Medium"
                      placeholder="Select medium"
                      classNames={{ input: styles["input"], label: styles["label"] }}
                      data={[
                        { value: "english", label: "English" },
                        { value: "bangla", label: "Bangla" },
                      ]}
                      error={errors.medium?.message}
                      required
                      {...field}
                    />
                  )}
                />
              )}
              {educationLevel === EEducationLevel.UNIVERSITY && (
                <Controller
                  name="degreeType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Degree Type"
                      placeholder="Select degree type"
                      classNames={{ input: styles["input"], label: styles["label"] }}
                      data={[
                        { value: "Bachelors", label: "Bachelors" },
                        { value: "Masters", label: "Masters" },
                      ]}
                      error={errors.degreeType?.message}
                      required
                      {...field}
                    />
                  )}
                />
              )}
            </Group>

            {(educationLevel === EEducationLevel.SCHOOL ||
              educationLevel === EEducationLevel.COLLEGE) && (
              <Controller
                name="class"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Class"
                    placeholder="Select class"
                    classNames={{ input: styles["input"], label: styles["label"] }}
                    data={CLASS_OPTIONS}
                    error={errors.class?.message}
                    required
                    {...field}
                  />
                )}
              />
            )}

            {educationLevel === EEducationLevel.UNIVERSITY && (
              <>
                <Controller
                  name="degreeName"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Degree Name"
                      placeholder="Select degree name"
                      classNames={{ input: styles["input"], label: styles["label"] }}
                      data={DEGREE_OPTIONS}
                      error={errors.degreeName?.message}
                      required
                      {...field}
                    />
                  )}
                />
                <TextInput
                  label="Semester/Year"
                  placeholder="Enter semester or year"
                  classNames={{ input: styles["input"], label: styles["label"] }}
                  {...register("semesterYear")}
                  error={errors.semesterYear?.message}
                  required
                />
              </>
            )}

            <TextInput
              label="Email"
              placeholder="Enter your email"
              classNames={{ input: styles["input"], label: styles["label"] }}
              {...register("email")}
              error={errors.email?.message}
              required
            />

            <div className={styles["group-name"]}>
              <div className={styles["fieldWrapperPass"]}>
                <PasswordInput
                  label="Password"
                  placeholder="Enter your password"
                  classNames={{ input: styles["input"], label: styles["label"] }}
                  {...register("password")}
                  error={errors.password?.message}
                  required
                />
              </div>
              <div className={styles["fieldWrapperPass"]}>
                <PasswordInput
                  label="Confirm Password"
                  placeholder="Confirm your password"
                  classNames={{ input: styles["input"], label: styles["label"] }}
                  {...register("confirmPassword")}
                  error={errors.confirmPassword?.message}
                  required
                />
              </div>
            </div>
          </Stack>

          <Group className={styles["buttonGroup"]}>
            <Button type="reset" className={styles["buttonReset"]} onClick={handleReset}>
              Reset
            </Button>
            <Button type="submit" className={styles["buttonSubmit"]}>
              Submit
            </Button>
          </Group>

          <Box className={styles["link"]}>
            Already have an account? <a href="#">Login</a>
          </Box>
          <a href="#" className={styles["register"]}>
            Register
          </a>
        </form>
      </Box>
    </div>
  );
}
