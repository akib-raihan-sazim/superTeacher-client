import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  formStyles: {
    label: {
      color: "#4CAF50",
    },
  },
  buttonStyles: {
    backgroundColor: "#4CAF50",
    color: "white",
  },
  titleText: {
    marginBottom: 20,
    fontWeight: 700,
    textTransform: "uppercase",
    fontSize: theme.fontSizes.lg,
    color: "#4CAF50",
  },
}));
