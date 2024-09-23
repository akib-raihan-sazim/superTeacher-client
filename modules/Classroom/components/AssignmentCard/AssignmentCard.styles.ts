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
  viewButton: {
    backgroundColor: "#151d35",
  },
  submissionButton: {
    backgroundColor: "#FAF9F6",
    color: "#151d35",
    border: "1px solid #151d35",
  },
}));
