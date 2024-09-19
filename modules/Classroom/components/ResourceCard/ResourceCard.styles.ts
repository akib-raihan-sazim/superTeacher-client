import { createStyles } from "@mantine/core";

export const useStyles = createStyles(() => ({
  card: {
    position: "relative",
  },
  actionIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  iconContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: "50%",
    padding: "8px",
    marginRight: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  downloadButton: {
    backgroundColor: "#151d35",
  },
}));
