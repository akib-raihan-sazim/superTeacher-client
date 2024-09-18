import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  button: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    borderColor: "#4CAF50",
    borderWidth: "1px",
    borderStyle: "solid",
    "&:hover": {
      backgroundColor: theme.fn.darken("#4CAF50", 0.1),
    },
  },
  outlineButton: {
    backgroundColor: "transparent",
    color: "#4CAF50",
    borderColor: "#4CAF50",
    borderWidth: "1px",
    borderStyle: "solid",
  },
  flexContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: "16px",
    "@media (min-width: 768px)": {
      flexDirection: "row",
    },
  },
  innerBox: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    "@media (min-width: 768px)": {
      flexDirection: "row",
    },
  },
}));
