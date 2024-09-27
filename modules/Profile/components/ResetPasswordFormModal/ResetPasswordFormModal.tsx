import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Box, Text, SimpleGrid, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { PasswordInput } from "react-hook-form-mantine";
import { z } from "zod";

import { useResetPasswordMutation } from "@/shared/redux/rtk-apis/users/users.api";

const resetPasswordSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z.string().min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z.string().min(1, { message: "Confirm password is required" }),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type TResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface IResetPasswordFormModalProps {
  opened: boolean;
  onClose: () => void;
}

const ResetPasswordFormModal: React.FC<IResetPasswordFormModalProps> = ({ opened, onClose }) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<TResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: TResetPasswordFormValues) => {
    try {
      await resetPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      notifications.show({
        color: "green",
        title: "Success",
        message: "Password reset successfully",
        autoClose: 3000,
      });
      reset();
      onClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: "Failed to reset password. Please try again.",
        autoClose: 3000,
      });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  const formStyles = {
    label: {
      color: "#4CAF50",
    },
    input: {
      borderColor: "#4CAF50",
      color: "#4CAF50",
    },
  };

  const buttonStyles = {
    backgroundColor: "#4CAF50",
    color: "white",
  };

  return (
    <Modal opened={opened} onClose={handleCancel} size="md" centered>
      <Box mx="xl">
        <Text mb={20} fw={700} tt="uppercase" size="lg" c={formStyles.label.color}>
          Reset Password
        </Text>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SimpleGrid>
            <PasswordInput
              size="md"
              label="Old Password"
              placeholder="Enter your old password"
              control={control}
              name="oldPassword"
              error={errors.oldPassword?.message}
              styles={formStyles}
            />
            <PasswordInput
              size="md"
              label="New Password"
              placeholder="Enter your new password"
              control={control}
              name="newPassword"
              error={errors.newPassword?.message}
              styles={formStyles}
            />
            <PasswordInput
              size="md"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              control={control}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
              styles={formStyles}
            />
          </SimpleGrid>
          <Group mt="xl" mb="sm" position="right">
            <Button size="sm" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" size="sm" loading={isLoading} style={buttonStyles}>
              Reset Password
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordFormModal;
