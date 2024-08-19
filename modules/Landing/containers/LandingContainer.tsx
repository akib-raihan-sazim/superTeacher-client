import { useState } from "react";

import { Container } from "@mantine/core";

import { ActionButton } from "../components/ActionButton/ActionButton";
import { Description } from "../components/Description/Description";
import RegisterModal from "../components/RegisterModal/RegisterModal";
import { WelcomeTitle } from "../components/WelcomeTitle/WelcomeTitle";
import useStyles from "./LandingContainer.styles";

export function LandingContainer() {
  const { classes } = useStyles();
  const [registerModalOpened, setRegisterModalOpened] = useState(false);

  const handleRegisterClick = () => {
    setRegisterModalOpened(true);
  };

  const handleRegisterModalClose = () => {
    setRegisterModalOpened(false);
  };

  return (
    <Container className={classes.root} fluid>
      <WelcomeTitle />
      <Description />
      <div className={classes.buttonContainer}>
        <ActionButton label="Register" onClick={handleRegisterClick} />
        <ActionButton label="Login" />
      </div>
      <RegisterModal opened={registerModalOpened} close={handleRegisterModalClose} />
    </Container>
  );
}
