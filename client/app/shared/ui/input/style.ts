import { cva } from "~/styled-system/css";

export const container = cva({
  base: {
    textAlign: "start",
  },
});

export const inputBox = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    position: "relative",
    transitionDuration: "0.3s",
    fontWeight: 500,
  },
  variants: {
    variant: {
      border: {
        border: "grayBorder",
        padding: "15px",
        borderRadius: "10px",

        _hover: {
          border: "secondaryBorder",
          color: "secondary",
          scale: "1.01",
          transitionDuration: "0.3s",
        },
      },
    },
    correct: {
      true: {
        borderColor: "correct",
        color: "correct",
      },
      false: {
        borderColor: "error",
        color: "error",
      },
      undefined: {},
    },

    focus: {
      true: {
        color: "secondary",
      },
      false: {
        color: "gray",
      },
    },
  },

  compoundVariants: [
    {
      correct: true,
      focus: [true, false],
      variant: ["border"],
      css: {
        color: "correct",
        borderColor: "correct",
        _hover: {
          color: "correct",
          borderColor: "correct",
        },
      },
    },
    {
      correct: false,
      focus: [true, false],
      variant: ["border"],

      css: {
        color: "error",
        borderColor: "error",
        _hover: {
          color: "error",
          borderColor: "error",
        },
      },
    },
  ],
});

export const label = cva({
  base: {
    fontSize: "md",
    fontWeight: 400,
    marginLeft: "5px",
  },
});

export const input = cva({
  base: {
    width: "100%",
    outline: "none",
    fontSize: "inherit",
    fontWeight: "inherit",
    color: "inherit",
  },
});

export const error = cva({
  base: {
    color: "error",
    fontSize: "sm",
    display: "flex",
    alignItems: "center",
    gap: "2px",
    paddingLeft: "5px",
    paddingTop: "3px",
  },
});
