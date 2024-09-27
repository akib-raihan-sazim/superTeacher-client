import React, { useState } from "react";

import { Anchor, Box, Button, Flex, Group, SimpleGrid, Text } from "@mantine/core";
import { useForm } from "react-hook-form";
import { TextInput, PasswordInput } from "react-hook-form-mantine";

import RegisterModal from "@/modules/Landing/components/RegisterModal/RegisterModal";

import { LoginFormSchemaResolver, loginFormDefaultValues } from "./LoginForm.helpers";
import { ILoginFormProps, ILoginFormValues } from "./LoginForm.types";
import PasswordResetModal from "./PasswordResetModal/PasswordResetModal";

const LoginForm: React.FC<ILoginFormProps> = ({ onSubmit }) => {
  const {
    formState: { errors },
    handleSubmit,
    control,
  } = useForm<ILoginFormValues>({
    defaultValues: loginFormDefaultValues,
    resolver: LoginFormSchemaResolver,
  });
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isPasswordResetModalOpen, setIsPasswordResetModalOpen] = useState(false);

  const openRegisterModal = () => {
    setIsRegisterModalOpen(true);
  };

  const closeRegisterModal = () => {
    setIsRegisterModalOpen(false);
  };

  const openPasswordResetModal = () => {
    setIsPasswordResetModalOpen(true);
  };

  const closePasswordResetModal = () => {
    setIsPasswordResetModalOpen(false);
  };

  return (
    <Flex justify="center" align="center" direction="column" style={{ minHeight: "100vh" }}>
      <Text my={20} fw={700} tt="uppercase" c="#4CAF50" size="xl">
        Login
      </Text>
      <Box maw={700} mx="auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid w={300}>
            <TextInput
              size="md"
              label="Email"
              styles={{
                label: {
                  color: "#4CAF50",
                },
              }}
              placeholder="Enter your email"
              withAsterisk
              control={control}
              name="email"
              error={errors.email?.message}
            />

            <PasswordInput
              size="md"
              label="Password"
              styles={{
                label: {
                  color: "#4CAF50",
                },
              }}
              placeholder="Enter your password"
              withAsterisk
              control={control}
              name="password"
              error={errors.password?.message}
            />
          </SimpleGrid>

          <Group my="md" pt="md" display={"flex"} style={{ justifyContent: "center" }}>
            <Button type="submit" size="md" style={{ background: "#4caf50" }}>
              Submit
            </Button>
          </Group>
        </form>

        <Text fw={400} ta="center" my="xs" size="md">
          <Anchor c="#4CAF50" onClick={openPasswordResetModal}>
            Forgot Password?
          </Anchor>
        </Text>

        <Text fw={400} c="#4CAF50" ta="center" size="md" mt="xl">
          Don&apos;t have an account?{" "}
          <Anchor c="white" onClick={openRegisterModal}>
            Register
          </Anchor>
        </Text>
        <RegisterModal opened={isRegisterModalOpen} close={closeRegisterModal} />
        <PasswordResetModal opened={isPasswordResetModalOpen} onClose={closePasswordResetModal} />
      </Box>
    </Flex>
  );
};

export default LoginForm;
