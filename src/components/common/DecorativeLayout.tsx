import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

export const RotatedBox = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "inline-block",
  [theme.breakpoints.down("sm")]: { transform: "rotate(0deg) !important" },
}));
export const OffsetBox = styled(Box)(({ theme }) => ({
  position: "relative",
  [theme.breakpoints.down("sm")]: { marginLeft: 0, marginTop: 0 },
}));
export const FloatingImage = styled(Box)(({ theme }) => ({
  position: "absolute",
  [theme.breakpoints.down("sm")]: { display: "none" },
}));
