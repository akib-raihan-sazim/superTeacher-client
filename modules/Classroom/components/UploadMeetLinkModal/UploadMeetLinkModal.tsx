import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button, TextInput, Text, Group } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useForm } from "react-hook-form";

import { useUploadMeetLinkMutation } from "@/shared/redux/rtk-apis/classrooms/classrooms.api";

import { meetlinkSchema, TMeetlinkFormValues } from "./UploadMeetLinkModal.helpers";
import { IUploadMeetlinkModalProps } from "./UploadMeetLinkModal.interface";
import { inputStyles, formStyles } from "./UploadMeetLinkModal.styles";

const UploadMeetlinkModal: React.FC<IUploadMeetlinkModalProps> = ({
  opened,
  onClose,
  classroomId,
}) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TMeetlinkFormValues>({
    resolver: zodResolver(meetlinkSchema),
    mode: "onBlur",
  });
  const [uploadMeetLink] = useUploadMeetLinkMutation();

  const onSubmit = async (data: TMeetlinkFormValues) => {
    try {
      await uploadMeetLink({ classroomId, meetlink: data.meetlink }).unwrap();
      showNotification({
        title: "Success",
        message: "Meet link added successfully",
        color: "blue",
      });

      reset();
      onClose();
    } catch (error) {
      showNotification({
        title: "Error",
        message: "Failed to upload meet link",
        color: "red",
      });
    }
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={handleCancel} centered>
      <Text mb={20} fw={700} tt="uppercase" size="lg" c="#4CAF50">
        Upload Meet Link
      </Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          label="Meet Link URL"
          placeholder="Enter meet link"
          {...control.register("meetlink")}
          error={errors.meetlink?.message}
          styles={inputStyles}
          withAsterisk
        />
        <Group mt="xl" mb="sm" position="right">
          <Button size="sm" color="gray" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit" size="sm" style={formStyles.submitButton}>
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default UploadMeetlinkModal;
