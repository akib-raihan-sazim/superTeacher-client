import { createStyles } from "@mantine/core";

export const useStyles = createStyles((theme) => ({
  form: {
    width: "100%",
  },
  inputLabel: {
    color: "#4CAF50",
    marginBottom: "0.5rem",
  },
  select: {
    "& .mantine-Select-input": {
      "&[data-selected]": {
        color: theme.black,
        "&::placeholder": {
          color: theme.black,
        },
      },
    },
    "& .mantine-Select-item[data-selected]": {
      "&, &:hover": {
        backgroundColor: theme.colors.gray[2],
        color: theme.black,
      },
    },
  },
  multiSelect: {
    "& .mantine-MultiSelect-input": {
      "&[data-selected]": {
        color: theme.black,
        "&::placeholder": {
          color: theme.black,
        },
      },
    },
    "& .mantine-MultiSelect-item[data-selected]": {
      "&, &:hover": {
        backgroundColor: theme.colors.gray[2],
        color: theme.black,
      },
    },
  },
  buttonGroup: {
    "@media (min-width: 1024px)": {
      gap: "15rem",
    },
    "@media (min-width: 768px) and (max-width: 1023px)": {
      gap: "10rem",
    },
    "@media (max-width: 767px)": {
      gap: "2rem",
    },
  },
  resetButton: {
    backgroundColor: "#9e9e9e",
    "&:hover": {
      backgroundColor: "#8e8e8e",
    },
  },
  submitButton: {
    backgroundColor: "#4caf50",
    "&:hover": {
      backgroundColor: "#45a049",
    },
  },
}));

export const inputProps = {
  size: "lg",
};
