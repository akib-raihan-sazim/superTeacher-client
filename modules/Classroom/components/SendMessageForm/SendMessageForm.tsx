import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Group } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { Form, FormSubmitHandler, useForm } from "react-hook-form";
import { Textarea } from "react-hook-form-mantine";

import { useCreateMessageMutation } from "@/shared/redux/rtk-apis/messages/messages.api";

import { SendMessageFormSchema, SendMessageFormValues } from "./SendMessageForm.helpers";
import { ISendMessageFormProps, ISendMessageFormValues } from "./SendMessageForm.interface";

const SendMessageForm: React.FC<ISendMessageFormProps> = ({ classroomId }) => {
  const {
    control,
    reset,
    formState: { errors },
  } = useForm<ISendMessageFormValues>({
    defaultValues: {
      content: "",
    },
    resolver: zodResolver(SendMessageFormSchema),
  });

  const [createMessage] = useCreateMessageMutation();

  const onSubmit: FormSubmitHandler<SendMessageFormValues> = async (formPayload) => {
    try {
      await createMessage({
        content: formPayload.data.content,
        classroomId: classroomId,
      }).unwrap();

      notifications.show({
        color: "blue",
        title: "Success",
        message: "Message sent!",
      });
      reset();
    } catch (error) {
      notifications.show({
        color: "red",
        title: "Success",
        message: "Failed to send message",
      });
    }
  };

  return (
    <Form control={control} onSubmit={onSubmit}>
      <Textarea
        placeholder="Type your message here"
        size="lg"
        control={control}
        name="content"
        error={errors.content?.message}
      />
      <Group mt="md" position="right">
        <Button size="sm" color="blue" onClick={() => reset()}>
          Reset
        </Button>
        <Button size="sm" color="blue" type="submit">
          Post
        </Button>
      </Group>
    </Form>
  );
};

export default SendMessageForm;
