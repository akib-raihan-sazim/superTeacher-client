import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  tabsList: {
    marginTop: "1.25rem",
    borderBottom: "none",
  },
  tab: {
    color: "white",
    borderBottom: "3px solid white",
    transition: "border-bottom-color 0.2s ease",
    "&:hover": {
      backgroundColor: "transparent",
    },
    "&[data-active]": {
      backgroundColor: "transparent",
      borderBottomColor: "#4CAF50",
    },
  },
  tabTitle: {
    color: "white",
  },
}));
