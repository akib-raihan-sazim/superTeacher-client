import { useRouter } from "next/router";

import { Modal, Text, Title } from "@mantine/core";
import { LuGraduationCap } from "react-icons/lu";
import { TbBooks } from "react-icons/tb";

import styles from "./RegisterModal.module.css";
import { IRegisterModalProps } from "./RegisterModal.type";

const RegisterModal = ({ opened, close }: IRegisterModalProps) => {
  const router = useRouter();
  const handleRoleClick = (role: "student" | "teacher") => {
    close();
    router.push(`/registration/${role}`);
  };
  return (
    <Modal opened={opened} onClose={close} centered>
      <Title className={styles["title"]} mb="lg">
        Choose your role
      </Title>
      <div className={styles["flexContainer"]}>
        <div className={styles["roleBox"]} onClick={() => handleRoleClick("student")}>
          <TbBooks size={20} />
          <Text weight={700}>Student</Text>
        </div>
        <div className={styles["roleBox"]} onClick={() => handleRoleClick("teacher")}>
          <LuGraduationCap size={20} />
          <Text weight={700}>Teacher</Text>
        </div>
      </div>
    </Modal>
  );
};

export default RegisterModal;
