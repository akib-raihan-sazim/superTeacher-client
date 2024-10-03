import { Modal, Box, Text, SimpleGrid, Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { useForm } from "react-hook-form";
import { PasswordInput } from "react-hook-form-mantine";

import { ApiError } from "@/modules/Login/containers/LoginContainer.types";
import { useResetPasswordMutation } from "@/shared/redux/rtk-apis/users/users.api";

import {
  ResetPasswordFormResolver,
  TResetPasswordFormValues,
} from "./ResetPasswordFormModal.helpers";
import { IResetPasswordFormModalProps } from "./ResetPasswordFormModal.interface";
import { useStyles } from "./ResetPasswordFormModal.styles";

const ResetPasswordFormModal: React.FC<IResetPasswordFormModalProps> = ({ opened, onClose }) => {
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { classes } = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<TResetPasswordFormValues>({
    resolver: ResetPasswordFormResolver,
    mode: "onChange",
  });

  const onSubmit = async (data: TResetPasswordFormValues) => {
    try {
      await resetPassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      }).unwrap();

      notifications.show({
        color: "blue",
        title: "Success",
        message: "Password reset successfully",
      });
      reset();
      onClose();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Error",
        message: (error as ApiError).data?.message,
      });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleCancel} size="md" centered>
      <Box mx="xl">
        <Text mb={20} fw={700} tt="uppercase" size="lg" c={"#4CAF50"}>
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
              className={classes.formStyles}
            />
            <PasswordInput
              size="md"
              label="New Password"
              placeholder="Enter your new password"
              control={control}
              name="newPassword"
              error={errors.newPassword?.message}
              className={classes.formStyles}
            />
            <PasswordInput
              size="md"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              control={control}
              name="confirmPassword"
              error={errors.confirmPassword?.message}
              className={classes.formStyles}
            />
          </SimpleGrid>
          <Group mt="xl" mb="sm" position="right">
            <Button size="sm" color="gray" onClick={handleCancel}>
              Cancel
            </Button>
            <Button
              type="submit"
              size="sm"
              loading={isLoading}
              className={classes.buttonStyles}
              disabled={!isValid}
            >
              Reset Password
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
};

export default ResetPasswordFormModal;
