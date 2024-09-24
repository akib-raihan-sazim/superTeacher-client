import { createStyles } from "@mantine/core";

export const useMeetlinkStyles = createStyles((theme) => ({
  boxDetails: {
    backgroundColor: "white",
    color: "black",
    borderRadius: "8px",
    textAlign: "center",
    padding: 16,
    marginBottom: 12,
  },
  detailsContainer: {
    [theme.fn.smallerThan("md")]: {
      display: "none",
    },
  },
  icon: {
    fontSize: "14px",
  },
}));
