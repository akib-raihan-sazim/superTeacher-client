import { Modal, Text, Group, Button } from "@mantine/core";

import { ConfirmUnenrollModalProps } from "./ConfirmUnenrollModal.interface";

const ConfirmUnenrollModal: React.FC<ConfirmUnenrollModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  studentName,
}) => (
  <Modal opened={isOpen} onClose={onClose} centered>
    <Text align="center" size="md" mb="md" tt={"uppercase"} c={"#4CAF50"}>
      Are you sure you want to remove <strong>{studentName}</strong> from the classroom ?
    </Text>
    <Group position="center" mt="md">
      <Button style={{ background: "#804185" }} onClick={onClose}>
        Cancel
      </Button>
      <Button style={{ background: "#804185" }} onClick={onConfirm}>
        Confirm
      </Button>
    </Group>
  </Modal>
);

export default ConfirmUnenrollModal;
