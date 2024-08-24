import { useState } from "react";

import { Button } from "@mantine/core";

import useStyles from "./ActionButton.styles";
import { IActionButtonProps } from "./ActionButton.types";

export function ActionButton({ label, onClick }: IActionButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { classes } = useStyles(isHovered);

  return (
    <Button
      className={classes.button}
      size="lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
