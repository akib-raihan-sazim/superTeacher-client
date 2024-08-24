import { createStyles } from "@mantine/core";

export default createStyles((theme, isHovered: boolean) => ({
  button: {
    backgroundColor: isHovered ? theme.colors.green[0] : "transparent",
    border: `2px solid ${theme.colors.green[0]}`,
    color: isHovered ? theme.colors["navy"] : theme.colors.green[0],
    "&:hover": {
      backgroundColor: theme.colors.green[0],
      color: theme.colors["navy"],
    },
  },
}));
