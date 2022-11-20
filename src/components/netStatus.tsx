import { memo } from "react";
import live from "../assets/live-dot.json";
import error from "../assets/error-dot.json";
import Lottie, { LottieProps } from "react-lottie-player";
import { Box } from "@mui/material";

// Lottie Option
const defaultOptions: LottieProps = {
  loop: true,
  play: true,
  style: {
    width: "60px",
    height: "60px",
    margin: "0",
  },
};

const NetStatus = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Lottie {...defaultOptions} animationData={live} />
      <Lottie {...defaultOptions} animationData={error} />
    </Box>
  );
};

export default memo(NetStatus);
