import { cva } from "~/styled-system/css";

export const input = cva({
  base: {
    width: "400px",
    color: "gray",
  },
});

export const form = cva({
  base: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "15px",
  },
});

export const lines = cva({
  base: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
  },
});
