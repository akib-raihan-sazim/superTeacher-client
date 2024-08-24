import { Modal, Text, Title } from "@mantine/core";
import { LuGraduationCap } from "react-icons/lu";
import { TbBooks } from "react-icons/tb";

import styles from "./RegisterModal.module.css";
import { IRegisterModalProps } from "./RegisterModal.type";

const RegisterModal = ({ opened, close }: IRegisterModalProps) => (
  <Modal opened={opened} onClose={close} centered>
    <Title className={styles["title"]} mb="lg">
      Choose your role
    </Title>
    <div className={styles["flexContainer"]}>
      <div className={styles["roleBox"]}>
        <TbBooks size={20} />
        <Text weight={700}>Student</Text>
      </div>
      <div className={styles["roleBox"]}>
        <LuGraduationCap size={20} />
        <Text weight={700}>Teacher</Text>
      </div>
    </div>
  </Modal>
);

export default RegisterModal;
